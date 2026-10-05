import { type NextRequest, NextResponse } from "next/server"
import { APPS_SCRIPT_URL } from "@/lib/apps-script-config"

async function fetchWithRedirect(url: string, options: RequestInit, maxRedirects = 5): Promise<Response> {
  let currentUrl = url
  let currentOptions = { ...options, redirect: "manual" as RequestRedirect }
  for (let i = 0; i < maxRedirects; i++) {
    const response = await fetch(currentUrl, currentOptions)
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location")
      if (location) {
        currentUrl = location
        currentOptions = { redirect: "manual" as RequestRedirect }
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
    let lastError = "GASへの接続に失敗しました"

    for (let attempt = 1; attempt <= MAX_ATTEMPTS && data === null; attempt++) {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000)
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
          lastError = "GASからの応答が不正です"
        }
      } catch (err) {
        console.error(`[v0] GAS fetch error (attempt ${attempt}):`, err)
        lastError = "GASへの接続に失敗しました"
      } finally {
        clearTimeout(timeoutId)
      }

      // 合計25秒を超えそうなら再試行しない
      if (data === null && attempt < MAX_ATTEMPTS) {
        if (Date.now() - startedAt > 25000) break
        await new Promise((resolve) => setTimeout(resolve, 500 * attempt))
      }
    }

    if (data === null) {
      return NextResponse.json({ exists: false, error: lastError }, { status: 500 })
    }

    if (!data.exists) {
      return NextResponse.json({ exists: false })
    }

    console.log("[v0] check-user GAS result:", data)
    return NextResponse.json(data)

  } catch (error) {
    console.error("[v0] check-user error:", error)
    return NextResponse.json({ exists: false, error: "サーバーエラー" }, { status: 500 })
  }
}
