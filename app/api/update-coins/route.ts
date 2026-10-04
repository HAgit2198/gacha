import { NextResponse } from "next/server"
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

export async function POST(request: Request) {
  try {
    const { email, spent } = await request.json()

    // 新構造：コイン獲得シートのF列（ガチャ使用）に消費枚数を追加
    // action=spendCoins で GAS側が該当メールのF列に spent を加算
    const params = new URLSearchParams({
      action: "spendCoins",
      email,
      amount: String(spent || 0),
    })

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    try {
      const response = await fetchWithRedirect(`${APPS_SCRIPT_URL}?${params.toString()}`, {
        method: "GET",
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      return NextResponse.json({ success: true, synced: response.ok })
    } catch {
      clearTimeout(timeoutId)
      return NextResponse.json({ success: true, warning: "Sync timed out" })
    }
  } catch (error) {
    return NextResponse.json({ success: true, warning: "Sync unavailable" })
  }
}
