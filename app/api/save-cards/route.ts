import { APPS_SCRIPT_URL } from "@/lib/apps-script-config"

export const runtime = "edge"

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
    const body = await request.json()
    const { email, drawnCards } = body
    // drawnCards: 今回引いたカードIDの配列（重複あり）
    // カードキーシートのB列に追記（既存値に追加）
    const cardsStr = Array.isArray(drawnCards) ? drawnCards.join(",") : String(drawnCards || "")

    const params = new URLSearchParams({
      action: "appendCards",
      email,
      cards: cardsStr,
    })

    const response = await fetchWithRedirect(`${APPS_SCRIPT_URL}?${params.toString()}`, {
      method: "GET",
    })

    const text = await response.text()
    try {
      JSON.parse(text)
    } catch {
      // 非JSONでも成功扱い
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("[v0] Error saving cards:", error)
    return Response.json({ success: false, error: "サーバーエラー" })
  }
}
