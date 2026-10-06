import { type NextRequest, NextResponse } from "next/server"
import { APPS_SCRIPT_URL } from "@/lib/apps-script-config"
import { parseCardKeys } from "@/lib/card-keys"

// GAS は混雑時に応答まで30秒以上かかることがあるため、関数の実行時間に余裕を持たせる
export const maxDuration = 120

// 1回あたりの待ち時間と、再試行を含めた全体の上限
const ATTEMPT_TIMEOUT_MS = 40000
const TOTAL_BUDGET_MS = 100000

// 利用者に表示するエラー文（内部の仕組み名は出さない）
const USER_ERROR_MESSAGE = "ただいまアクセスが集中しています。もう一度ログインしてください"

async function fetchWithRedirect(url: string, options: RequestInit, maxRedirects = 5): Promise<Response> {
  let currentUrl = url
  let currentOptions = { ...options, redirect: "manual" as RequestRedirect }
  for (let i = 0; i < maxRedirects; i++) {
    const response = await fetch(currentUrl, currentOptions)
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location")
      if (location) {
        currentUrl = location
        currentOptions = { redirect: "manual" as RequestRedirect, signal: options.signal }
        continue
      }
    }
    return response
  }
  throw new Error("Too many redirects")
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    const normalizedEmail = email.trim().toLowerCase()

    const params = new URLSearchParams({
      action: "getUser",
      email: normalizedEmail,
    })

    // GASは起動直後などに一時的にHTMLエラーを返すことがあるため、読み取り専用のgetUserは再試行する
    const MAX_ATTEMPTS = 3
    const startedAt = Date.now()
    let data: Record<string, unknown> | null = null
    let lastError = "GAS fetch failed"

    for (let attempt = 1; attempt <= MAX_ATTEMPTS && data === null; attempt++) {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), ATTEMPT_TIMEOUT_MS)
      try {
        const response = await fetchWithRedirect(`${APPS_SCRIPT_URL}?${params.toString()}`, {
          method: "GET",
          signal: controller.signal,
        })
        const text = await response.text()
        try {
          data = JSON.parse(text)
        } catch {
          console.error(`[v0] GAS returned non-JSON (attempt ${attempt}):`, text.slice(0, 200))
          lastError = "GAS returned non-JSON"
        }
      } catch (err) {
        console.error(`[v0] GAS fetch error (attempt ${attempt}):`, err)
        lastError = "GAS fetch failed"
      } finally {
        clearTimeout(timeoutId)
      }

      // GASは起動直後に遅れてエラーページを返すことがあるので、間隔を空けて再試行する。
      // 遅くても成功する応答を途中で打ち切らないよう1回の待ち時間は長めにし、全体で100秒を超えるなら再試行しない
      if (data === null && attempt < MAX_ATTEMPTS) {
        const backoff = 2000 * attempt
        if (Date.now() - startedAt + backoff + ATTEMPT_TIMEOUT_MS > TOTAL_BUDGET_MS) break
        await new Promise((resolve) => setTimeout(resolve, backoff))
      }
    }

    if (data === null) {
      console.error("[v0] check-user giving up:", lastError)
      return NextResponse.json({ exists: false, error: USER_ERROR_MESSAGE }, { status: 500 })
    }

    if (!data.exists) {
      return NextResponse.json({ exists: false })
    }

    // 所持カードも同じ getUser の結果から返し、ログイン時の GAS 呼び出しを1回にする
    const cards = parseCardKeys(String(data.cardKeys || "").trim())
    return NextResponse.json({ ...data, cards })

  } catch (error) {
    console.error("[v0] check-user error:", error)
    return NextResponse.json({ exists: false, error: USER_ERROR_MESSAGE }, { status: 500 })
  }
}
