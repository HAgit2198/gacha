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
    const { email, rarity, count } = body
    // rarity: "N", "R", "SR", "SSR"
    // count: number of cards owned for this rarity (0-25)
    // If count === 25, GAS will write "コンプリート" else the number

    const params = new URLSearchParams({
      action: "saveCompletion",
      email,
      rarity,
      count: String(count),
    })

    const response = await fetchWithRedirect(`${APPS_SCRIPT_URL}?${params.toString()}`, {
      method: "GET",
    })

    if (!response.ok) {
      return Response.json({ success: false })
    }

    const data = await response.json()
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ success: false })
  }
}
