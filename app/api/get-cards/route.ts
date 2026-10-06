import { APPS_SCRIPT_URL } from "@/lib/apps-script-config"
import { parseCardKeys } from "@/lib/card-keys"

export const runtime = "edge"

async function fetchWithRedirect(url: string, maxRedirects = 5): Promise<Response> {
  let currentUrl = url
  const options: RequestInit = { redirect: "manual" }
  for (let i = 0; i < maxRedirects; i++) {
    const response = await fetch(currentUrl, options)
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location")
      if (location) { currentUrl = location; continue }
    }
    return response
  }
  throw new Error("Too many redirects")
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    const normalizedEmail = email.trim().toLowerCase()

    // GAS の getUser から cardKeys を取得
    const params = new URLSearchParams({ action: "getUser", email: normalizedEmail })
    const response = await fetchWithRedirect(`${APPS_SCRIPT_URL}?${params.toString()}`)
    const text = await response.text()

    let data: Record<string, unknown>
    try {
      data = JSON.parse(text)
    } catch {
      return Response.json({ success: false, ownedCharacters: {}, worldCounts: { n: 0, r: 0, sr: 0, ur: 0 } })
    }

    if (!data.exists) {
      return Response.json({ success: false, ownedCharacters: {}, worldCounts: { n: 0, r: 0, sr: 0, ur: 0 } })
    }

    const cardKeys = String(data.cardKeys || "").trim()
    const { ownedCharacters, worldCounts } = parseCardKeys(cardKeys)

    return Response.json({
      success: true,
      ownedCharacters,
      worldCounts,
      // 各ワールドのコンプ判定（25枚で1ボリューム）
      completedWorlds: {
        n:  worldCounts.n  >= 25,
        r:  worldCounts.r  >= 25,
        sr: worldCounts.sr >= 25,
        ur: worldCounts.ur >= 25,
      }
    })
  } catch (error) {
    console.error("[v0] Error getting cards:", error)
    return Response.json({ success: false, ownedCharacters: {}, worldCounts: { n: 0, r: 0, sr: 0, ur: 0 } })
  }
}
