// カードキー文字列（GAS getUser の cardKeys）から ownedCharacters とワールド別枚数を構築
// カードキーは "n1,n3,n3,r2,..." のようなカンマ区切り（重複あり）
export function parseCardKeys(cardKeys: string) {
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
