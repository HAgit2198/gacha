import { APPS_SCRIPT_URL } from "@/lib/apps-script-config"

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

// カードキー文字列からownedCharactersとワールド別枚数を構築
// カードキーは "n1,n3,n3,r2,..." のようなカンマ区切り（重複あり）
function parseCardKeys(cardKeys: string) {
  if (!cardKeys || cardKeys.trim() === "") {
    return { ownedCharacters: {}, worldCounts: { n: 0, r: 0, sr: 0, ur: 0 } }
  }

  const prefixMap: Record<string, string> = {
    n: "origins",
    r: "elements",
    s: "beyond",
    x: "questpia",
  }

  const worldCounts: Record<string, number> = { n: 0, r: 0, sr: 0, ur: 0 }
  const ownedCharacters: Record<string, boolean> = {}

  const ids = cardKeys.split(/[,\n]/).map(s => s.trim()).filter(Boolean)

  for (const id of ids) {
    const prefix = id.charAt(0).toLowerCase()
    const num = id.substring(1)
    const world = prefixMap[prefix]
    if (!world) continue

    // ownedCharacters は重複なし（所持フラグ）
    const fullId = `${world}_${num}`
    ownedCharacters[fullId] = true

    // ワールド別枚数カウント（重複あり）
    if (prefix === "n") worldCounts.n++
    else if (prefix === "r") worldCounts.r++
    else if (prefix === "s") worldCounts.sr++
    else if (prefix === "x") worldCounts.ur++
  }

  return { ownedCharacters, worldCounts }
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
