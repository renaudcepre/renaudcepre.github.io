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
