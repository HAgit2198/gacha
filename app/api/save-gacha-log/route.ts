import { type NextRequest, NextResponse } from "next/server"

// カードIDを短縮形式に変換
// origins_1 -> n1, elements_17 -> r17, beyond_6 -> s6, questpia_3 -> u3
function convertCardId(cardId: string): string {
  const prefixMap: Record<string, string> = {
    origins:  "n",
    elements: "r",
    beyond:   "s",
    questpia: "u",  // UR
  }
  const parts = cardId.split("_")
  if (parts.length === 2) {
    const prefix = prefixMap[parts[0]] || parts[0].charAt(0)
    return `${prefix}${parts[1]}`
  }
  return cardId
}

export async function POST(request: NextRequest) {
  try {
    const { email: rawEmail, name, gachaCount, drawnCards, consumedCoins } = await request.json()
    const email = String(rawEmail ?? "").trim().toLowerCase()

    if (!email || !drawnCards) {
      return NextResponse.json({ success: true })
    }

    const gasUrl = process.env.GAS_WEBHOOK_URL
    if (!gasUrl) {
      console.warn("[v0] GAS_WEBHOOK_URL not set, skipping gacha log")
      return NextResponse.json({ success: true })
    }

    const cardArray: string[] = Array.isArray(drawnCards)
      ? drawnCards
      : String(drawnCards).split(",")

    const coinsPerCard = Math.floor((consumedCoins || 0) / Math.max(cardArray.length, 1))

    // 各カードを1行ずつI列に追記（action=saveGachaLog）
    const results = await Promise.allSettled(
      cardArray.map(async (cardId: string) => {
        const shortId = convertCardId(cardId.trim())
        const params = new URLSearchParams({
          action: "saveGachaLog",
          email,
          name: name || "",
          gachaCount: String(gachaCount),
          drawnCards: shortId,
          consumedCoins: String(coinsPerCard),
        })
        return fetch(`${gasUrl}?${params.toString()}`, { method: "GET" })
      })
    )

    const successCount = results.filter(r => r.status === "fulfilled").length
    console.log("[v0] Gacha log saved:", { email, total: cardArray.length, success: successCount })

    return NextResponse.json({ success: true, savedCount: successCount })
  } catch (error) {
    console.error("[v0] Error saving gacha log:", error)
    return NextResponse.json({ success: true })
  }
}
