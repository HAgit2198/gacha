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
        currentOptions = { redirect: "manual" as RequestRedirect, signal: options.signal }
        continue
      }
    }

    return response
  }

  throw new Error("Too many redirects")
}

// ワールド解放時に「開放」をスプレッドシートのrarity列に書き込む
// rarity はワールドの rank (N/R/SR/SSR) を渡す
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, rarity } = body
    // rarity: "N" | "R" | "SR" | "SSR"
    // save-completion と同じアクションを使い、count として特別値 -1 を送る
    // GAS 側で -1 を受け取った場合「開放」と書き込む

    const params = new URLSearchParams({
      action: "saveCompletion",
      email,
      rarity,
      count: "-1", // -1 = 「開放」を意味する特別値
    })

    const response = await fetchWithRedirect(`${APPS_SCRIPT_URL}?${params.toString()}`, {
      method: "GET",
    })

    if (!response.ok) {
      return Response.json({ success: false })
    }

    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ success: false })
  }
}
