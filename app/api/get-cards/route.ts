import { compactToOwned } from "@/lib/card-id-map"

export const runtime = "edge"

const SPREADSHEET_ID = "12ma-roMakKWnIPQjP8e83wujptbKI8p-Pn2Vmw_9b3M"
const SHEET_NAME = "顧客ID"
const API_KEY = "AIzaSyCMPwy12n9zl0qLHF-43bDQeikKEuKHUpA"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    // A=email, I=所持カードキー (index 8)
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(SHEET_NAME)}!A:I?key=${API_KEY}`

    const response = await fetch(url)

    if (!response.ok) {
      return Response.json({ success: false, ownedCharacters: {} })
    }

    const data = await response.json()
    const rows = data.values || []

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i]
      if (row[0] && row[0].trim().toLowerCase() === email.trim().toLowerCase()) {
        const cardsData = row[8] || ""

        if (cardsData) {
          // Compact format: "n1,n2,r3,s5,x10"
          const characters = compactToOwned(cardsData)
          return Response.json({ success: true, ownedCharacters: characters })
        }
        break
      }
    }

    return Response.json({ success: true, ownedCharacters: {} })
  } catch (error) {
    console.error("[v0] Error getting cards:", error)
    return Response.json({ success: false, ownedCharacters: {} })
  }
}
