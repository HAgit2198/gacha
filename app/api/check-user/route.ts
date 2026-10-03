import { type NextRequest, NextResponse } from "next/server"

const SPREADSHEET_ID = "12ma-roMakKWnIPQjP8e83wujptbKI8p-Pn2Vmw_9b3M"
const SHEET_NAME = "顧客ID"
const API_KEY = "AIzaSyCMPwy12n9zl0qLHF-43bDQeikKEuKHUpA"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()



    // New layout: A=email, B=name, C=coins
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(SHEET_NAME)}!A:C?key=${API_KEY}`

    const response = await fetch(url)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Sheets API error:", response.status, errorText)

      let errorMessage = "スプレッドシートの読み取りに失敗しました。"
      if (response.status === 400) {
        errorMessage = "APIキーが無効です。正しいGoogle Sheets APIキーを設定してください。"
      } else if (response.status === 403) {
        errorMessage =
          "スプレッドシートへのアクセスが拒否されました。スプレッドシートを「リンクを知っている全員」に共有設定してください。"
      }

      return NextResponse.json(
        {
          error: errorMessage,
          exists: false,
        },
        { status: 500 },
      )
    }

    const data = await response.json()
    const rows = data.values || []

    // Skip header row (index 0) and search for email in A column
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i]
      if (row[0] && row[0].trim().toLowerCase() === email.trim().toLowerCase()) {
        return NextResponse.json({
          exists: true,
          name: row[1] || "",
          coins: Number.parseInt(row[2]) || 0,
        })
      }
    }

    return NextResponse.json({ exists: false })
  } catch (error) {
    console.error("[v0] Error checking user:", error)
    return NextResponse.json({ error: "サーバーエラーが発生しました", exists: false }, { status: 500 })
  }
}
