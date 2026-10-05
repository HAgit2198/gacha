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

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email: rawEmail, rarity, count } = body
    const email = String(rawEmail ?? "").trim().toLowerCase()
    // rarity: "N" | "R" | "SR" | "UR" | "EPILOGUE"
    // GASは 顧客マスター N列のコンプ状況を更新する
    // action=saveCompletion, rarity=N/R/SR/UR/EPILOGUE

    const params = new URLSearchParams({
      action: "saveCompletion",
      email,
      rarity,
      count: String(count ?? 0),
    })

    try {
      const response = await fetchWithRedirect(`${APPS_SCRIPT_URL}?${params.toString()}`, {
        method: "GET",
      })
      const text = await response.text()
      return Response.json({ success: true })
    } catch {
      return Response.json({ success: false })
    }
  } catch (error) {
    return Response.json({ success: false })
  }
}
