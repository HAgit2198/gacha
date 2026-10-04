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

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    let data: Record<string, unknown>
    try {
      const response = await fetchWithRedirect(`${APPS_SCRIPT_URL}?${params.toString()}`, {
        method: "GET",
        signal: controller.signal,
      })
      clearTimeout(timeoutId)

      const text = await response.text()
      try {
        data = JSON.parse(text)
      } catch {
        console.error("[v0] GAS returned non-JSON:", text.slice(0, 200))
        return NextResponse.json({ exists: false, error: "GASからの応答が不正です" }, { status: 500 })
      }
    } catch (err) {
      clearTimeout(timeoutId)
      console.error("[v0] GAS fetch error:", err)
      return NextResponse.json({ exists: false, error: "GASへの接続に失敗しました" }, { status: 500 })
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
