import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const CONTENT_DIR = join(process.cwd(), 'content/portfolio')
const LOCALES = ['en', 'fr']

interface PortfolioRouteEntry {
  filename: string
  locale: string
}

function listYamlFiles(dir: string): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) out.push(...listYamlFiles(full))
    else if (entry.endsWith('.yaml')) out.push(full)
  }
  return out
}

// The portfolio yaml files are flat key: value pairs (no nesting/lists), so a
// full YAML parser isn't needed here - this only has to survive that shape.
function parseSimpleYaml(text: string): Record<string, string> {
  const result: Record<string, string> = {}
  for (const line of text.split('\n')) {
    const match = line.match(/^([a-zA-Z_]+):\s*(.*)$/)
    if (!match?.[1] || match[2] === undefined) continue
    result[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, '')
  }
  return result
}

export function getPortfolioEntries(): PortfolioRouteEntry[] {
  const entries: PortfolioRouteEntry[] = []
  for (const file of listYamlFiles(CONTENT_DIR)) {
    const data = parseSimpleYaml(readFileSync(file, 'utf-8'))
    if (!data.filename) continue
    const locales = data.locale && data.locale !== '*' ? [data.locale] : LOCALES
    for (const locale of locales) entries.push({ filename: data.filename, locale })
  }
  return entries
}

export function getPortfolioRoutes(): string[] {
  return getPortfolioEntries().map(e => `/${e.locale}/${e.filename}`)
}
