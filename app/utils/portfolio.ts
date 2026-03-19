export const C = {
  bg: '#0e1019',
  fg: '#c8c8c8',
  comment: '#5c6370',
  keyword: '#c678dd',
  string: '#98c379',
  func: '#61afef',
  type: '#e5c07b',
  number: '#d19a66',
  operator: '#56b6c2',
  red: '#e06c75',
  green: '#98c379',
  yellow: '#e5c07b',
  blue: '#61afef',
  magenta: '#c678dd',
  cyan: '#56b6c2',
  white: '#abb2bf',
  gray: '#4b5263',
  gutter: '#3b4048',
  statusBg: '#21252b',
  statusFg: '#9da5b4',
  visual: '#3e4452',
  cursor: '#528bff',
  border: '#2c313a',
  netrw: '#13161e',
  tabBg: '#1a1d26',
  tabActive: '#0e1019'
}

export const FONT = "'JetBrains Mono', 'Cascadia Mono', 'SF Mono', 'Consolas', monospace"

export interface Token {
  t: string
  c: string
  bg?: string
  b?: boolean
  i?: boolean
}

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
    else if (t.startsWith('"') || t.startsWith("'")) c = C.string
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

const ANSI_FG: Record<number, string> = {
  30: '#000000', 31: '#e06c75', 32: '#98c379', 33: '#e5c07b',
  34: '#61afef', 35: '#c678dd', 36: '#56b6c2', 37: '#abb2bf',
  90: '#5c6370', 91: '#e06c75', 92: '#98c379', 93: '#e5c07b',
  94: '#61afef', 95: '#c678dd', 96: '#56b6c2', 97: '#ffffff'
}

function ansi256(n: number): string {
  if (n < 16) return ANSI_16[n]
  if (n >= 232) {
    const v = 8 + (n - 232) * 10
    const h = v.toString(16).padStart(2, '0')
    return `#${h}${h}${h}`
  }
  const idx = n - 16
  const vals = [0, 95, 135, 175, 215, 255]
  const r = vals[Math.floor(idx / 36)]
  const g = vals[Math.floor((idx % 36) / 6)]
  const b = vals[idx % 6]
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
    const codes = m[1].split(';').map(Number)
    let i = 0
    while (i < codes.length) {
      const code = codes[i]
      if (code === 0 || Number.isNaN(code)) { fg = C.fg; bg = undefined; bold = false }
      else if (code === 1) bold = true
      else if (code === 38 && codes[i + 1] === 5) { fg = ansi256(codes[i + 2] ?? 0); i += 2 }
      else if (code === 48 && codes[i + 1] === 5) { bg = ansi256(codes[i + 2] ?? 0); i += 2 }
      else if (code === 39) fg = C.fg
      else if (code === 49) bg = undefined
      else if (ANSI_FG[code]) fg = ANSI_FG[code]
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
  const re = /(`[^`]+`|[^`]+)/g
  let mm
  while ((mm = re.exec(line)) !== null) {
    toks.push({ t: mm[0], c: mm[0].startsWith('`') ? C.string : C.fg })
  }
  return toks
}
