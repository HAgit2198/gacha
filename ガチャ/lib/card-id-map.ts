// Compact card ID mapping for spreadsheet storage
// Full ID -> Short ID (2-3 chars per card)
// n = N(origins), r = R(elements), s = SR(beyond), x = SSR(questpia)

const PREFIXES: Record<string, string> = {
  origins: "n",
  elements: "r",
  beyond: "s",
  questpia: "x",
}

const REVERSE_PREFIXES: Record<string, string> = {
  n: "origins",
  r: "elements",
  s: "beyond",
  x: "questpia",
}

// Convert full ID (e.g. "origins_5") to compact (e.g. "n5")
export function toCompact(fullId: string): string {
  const parts = fullId.split("_")
  const world = parts[0]
  const num = parts[1]
  const prefix = PREFIXES[world]
  if (!prefix) return fullId // fallback
  return `${prefix}${num}`
}

// Convert compact ID (e.g. "n5") to full (e.g. "origins_5")
export function toFull(compactId: string): string {
  const prefix = compactId.charAt(0)
  const num = compactId.substring(1)
  const world = REVERSE_PREFIXES[prefix]
  if (!world) return compactId // fallback
  return `${world}_${num}`
}

// Convert owned characters map to compact comma-separated string
// e.g. { origins_1: true, elements_3: true } -> "n1,r3"
export function ownedToCompact(owned: Record<string, boolean>): string {
  return Object.keys(owned)
    .filter((k) => owned[k])
    .map(toCompact)
    .join(",")
}

// Convert compact comma-separated string to owned characters map
// e.g. "n1,r3" -> { origins_1: true, elements_3: true }
export function compactToOwned(compact: string): Record<string, boolean> {
  if (!compact || compact.trim() === "") return {}
  const ids = compact.split(",").map((s) => s.trim()).filter(Boolean)
  const owned: Record<string, boolean> = {}
  for (const id of ids) {
    // Check if it's already a full ID (legacy format)
    if (id.includes("_")) {
      owned[id] = true
    } else {
      owned[toFull(id)] = true
    }
  }
  return owned
}
