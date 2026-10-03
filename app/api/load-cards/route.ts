export const runtime = "edge"

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx72qBkU_UAbj0fzbGrLWNVF6zPgt822318Vd1Hwi4vUWlVDgWKm3CyU_rREpI3PTJW/exec"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    console.log("[v0] Loading cards from spreadsheet:", { email })

    const response = await fetch(`${APPS_SCRIPT_URL}?action=loadCards&email=${encodeURIComponent(email)}`, {
      method: "GET",
      redirect: "follow",
    })

    if (!response.ok) {
      console.warn("[v0] Failed to load cards from spreadsheet:", response.status)
      return Response.json({ success: false, ownedCharacters: {} })
    }

    const data = await response.json()
    console.log("[v0] Cards loaded successfully:", data)

    let ownedCharacters = {}
    if (data.ownedCharacters) {
      try {
        ownedCharacters = typeof data.ownedCharacters === "string" 
          ? JSON.parse(data.ownedCharacters) 
          : data.ownedCharacters
      } catch (e) {
        console.error("[v0] Error parsing ownedCharacters:", e)
      }
    }

    return Response.json({ success: true, ownedCharacters })
  } catch (error) {
    console.error("[v0] Error loading cards:", error)
    return Response.json({ success: false, ownedCharacters: {} })
  }
}
