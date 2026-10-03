import { APPS_SCRIPT_URL } from "@/lib/apps-script-config"
import { ownedToCompact } from "@/lib/card-id-map"

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
    const { email, ownedCharacters } = body

    // Convert to compact format: "n1,n2,r3,s5,x10"
    const compactCards = ownedToCompact(ownedCharacters)
    
    const params = new URLSearchParams({
      action: "saveCards",
      email,
      cards: compactCards,
    })
    
    const response = await fetchWithRedirect(`${APPS_SCRIPT_URL}?${params.toString()}`, {
      method: "GET",
    })

    if (!response.ok) {
      return Response.json({ success: false, error: "保存に失敗しました" })
    }

    const data = await response.json()
    return Response.json({ success: true })
  } catch (error) {
    console.error("[v0] Error saving cards:", error)
    return Response.json({ success: false, error: "サーバーエラー" })
  }
}
