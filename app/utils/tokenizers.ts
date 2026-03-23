import { C } from '~/utils/themes'
import type { Token } from '~/utils/types'

const PY_KW = new Set(['class', 'def', 'return', 'import', 'from', 'for', 'in', 'if', 'else', 'elif', 'while', 'with', 'as', 'try', 'except', 'raise', 'pass', 'not', 'and', 'or', 'is', 'yield', 'lambda', 'finally', 'del', 'global', 'assert'])
const PY_BI = new Set(['str', 'int', 'float', 'bool', 'list', 'dict', 'tuple', 'set', 'type', 'print', 'field', 'dataclass'])

export function tokPy(line: string): Token[] {
  const toks: Token[] = []
  const re = /(""".*?"""|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|#.*$|@\w+|\b\d+(?:\.\d+)?\b|\b[a-zA-Z_]\w*\b|[^\s\w]|\s+)/g
  let m
  while ((m = re.exec(line)) !== null) {
    const t = m[0]
    let c = C.fg
    if (t.startsWith('#')) c = C.comment
    else if (t.startsWith('"') || t.startsWith('\'')) c = C.string
    else if (t.startsWith('@')) c = C.yellow
    else if (/^\d/.test(t)) c = C.number
    else if (PY_KW.has(t)) c = C.keyword
    else if (t === 'self') c = C.red
    else if (t === 'None' || t === 'True' || t === 'False') c = C.number
    else if (PY_BI.has(t)) c = C.yellow
    else if (/^[a-zA-Z_]\w*$/.test(t)) {
      if (line.slice(re.lastIndex).match(/^\s*\(/)) c = C.func
      else c = C.fg
    } else if (/^[=+\-*/<>:!|&^~%]$/.test(t)) c = C.operator
    toks.push({ t, c })
  }
  return toks
}

const ANSI_16 = [
  '#000000', '#800000', '#008000', '#808000', '#000080', '#800080', '#008080', '#c0c0c0',
  '#808080', '#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff', '#00ffff', '#ffffff'
]

function getAnsiFg(): Record<number, string> {
  return C.ansi as unknown as Record<number, string>
}

function ansi256(n: number): string {
  if (n < 16) return ANSI_16[n] ?? '#000000'
  if (n >= 232) {
    const v = 8 + (n - 232) * 10
    const h = v.toString(16).padStart(2, '0')
    return `#${h}${h}${h}`
  }
  const idx = n - 16
  const vals = [0, 95, 135, 175, 215, 255]
  const r = vals[Math.floor(idx / 36)] ?? 0
  const g = vals[Math.floor((idx % 36) / 6)] ?? 0
  const b = vals[idx % 6] ?? 0
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

export function tokAnsi(line: string): Token[] {
  const toks: Token[] = []
  const re = /\\e\[([0-9;]*)m/g
  let fg = C.fg
  let bg: string | undefined
  let bold = false
  let lastIdx = 0
  let m

  while ((m = re.exec(line)) !== null) {
    if (m.index > lastIdx) {
      toks.push({ t: line.slice(lastIdx, m.index), c: fg, bg, b: bold || undefined })
    }
    const codes = (m[1] ?? '').split(';').map(Number)
    let i = 0
    while (i < codes.length) {
      const code = codes[i]!
      if (code === 0 || Number.isNaN(code)) {
        fg = C.fg
        bg = undefined
        bold = false
      } else if (code === 1) {
        bold = true
      } else if (code === 38 && codes[i + 1] === 5) {
        fg = ansi256(codes[i + 2] ?? 0)
        i += 2
      } else if (code === 48 && codes[i + 1] === 5) {
        bg = ansi256(codes[i + 2] ?? 0)
        i += 2
      } else if (code === 39) {
        fg = C.fg
      } else if (code === 49) {
        bg = undefined
      } else if (getAnsiFg()[code]) {
        fg = getAnsiFg()[code]!
      }
      i++
    }
    lastIdx = re.lastIndex
  }

  if (lastIdx < line.length) {
    toks.push({ t: line.slice(lastIdx), c: fg, bg, b: bold || undefined })
  }
  return toks.length ? toks : [{ t: line, c: C.fg }]
}

export function tokTxt(line: string): Token[] {
  return [{ t: line, c: C.fg }]
}

export function tokJson(line: string): Token[] {
  const toks: Token[] = []
  // eslint-disable-next-line no-useless-escape
  const re = /("(?:[^"\\]|\\.)*"\s*:\s*|"(?:[^"\\]|\\.)*"|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[{}\[\]:,]|\s+)/g
  let m
  while ((m = re.exec(line)) !== null) {
    const t = m[0]
    if (t.match(/^".*":\s*$/)) toks.push({ t, c: C.cyan })
    else if (t.startsWith('"')) toks.push({ t, c: C.string })
    else if (/^-?\d/.test(t)) toks.push({ t, c: C.number })
    else if (t === 'true' || t === 'false' || t === 'null') toks.push({ t, c: C.keyword })
    // eslint-disable-next-line no-useless-escape
    else if (/^[{}\[\]]$/.test(t)) toks.push({ t, c: C.yellow })
    else toks.push({ t, c: C.fg })
  }
  return toks
}

export function tokHtml(line: string): Token[] {
  const toks: Token[] = []
  const re = /(<!--[\s\S]*?-->|<\/?\w[\w-]*|\/?>|"[^"]*"|'[^']*'|[a-zA-Z][\w-]*(?==)|&\w+;|[^<>"'&]+|[<>"'&])/g
  let m
  while ((m = re.exec(line)) !== null) {
    const t = m[0]
    if (t.startsWith('<!--')) toks.push({ t, c: C.comment })
    else if (t.startsWith('</') || t.startsWith('<')) toks.push({ t, c: C.red })
    else if (t === '/>' || t === '>') toks.push({ t, c: C.red })
    else if ((t.startsWith('"') || t.startsWith('\'')) && t.length > 1) toks.push({ t, c: C.string })
    else if (/^[a-zA-Z][\w-]*$/.test(t) && line.charAt(m.index + t.length) === '=') toks.push({ t, c: C.yellow })
    else if (t.startsWith('&') && t.endsWith(';')) toks.push({ t, c: C.number })
    else toks.push({ t, c: C.fg })
  }
  return toks
}

export function tokMd(line: string): Token[] {
  if (line.startsWith('# ')) return [{ t: line, c: C.red, b: true }]
  if (line.startsWith('## ')) return [{ t: line, c: C.yellow, b: true }]
  if (line.startsWith('> ')) return [{ t: line, c: C.comment, i: true }]
  if (line.startsWith('```')) return [{ t: line, c: C.string }]
  if (line.startsWith('$ ')) return [{ t: '$ ', c: C.green }, { t: line.slice(2), c: C.fg }]
  if (line.startsWith('  ') && line.includes('..')) {
    const parts = line.split(/(\.\.\.*)/g)
    return parts.map(p => ({ t: p, c: p.startsWith('.') ? C.comment : C.func }))
  }
  const toks: Token[] = []
  // eslint-disable-next-line no-useless-escape
  const re = /(!\[[^\]]*\]\([^)]*\)|\[([^\]]*)\]\(([^)]+)\)|`[^`]+`|[^`\[!]+|[!](?!\[)|[`\[])/g
  let mm
  while ((mm = re.exec(line)) !== null) {
    if (mm[0].startsWith('![')) {
      toks.push({ t: mm[0], c: C.magenta })
    } else if (mm[0].startsWith('[') && mm[3]) {
      toks.push({ t: mm[0], c: C.func, href: mm[3] })
    } else if (mm[0].startsWith('`')) {
      toks.push({ t: mm[0], c: C.string })
    } else {
      toks.push({ t: mm[0], c: C.fg })
    }
  }
  return toks
}
