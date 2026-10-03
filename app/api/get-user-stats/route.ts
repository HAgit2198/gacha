import { APPS_SCRIPT_URL } from "@/lib/apps-script-config"

export const runtime = "edge"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "getUserStats", email }),
      redirect: "follow",
    })

    const text = await response.text()
    try {
      const data = JSON.parse(text)
      return Response.json({ success: true, stats: data })
    } catch {
      return Response.json({ success: false })
    }
  } catch (error) {
    return Response.json({ success: false })
  }
}
