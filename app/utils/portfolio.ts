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

export interface FileData {
  lang: 'py' | 'md'
  content: string
}

export const FILES: Record<string, FileData> = {
  'README.md': {
    lang: 'md',
    content: `# Renaud -- Senior Python Developer

> Backend architect, electronic music producer,
> open source enthusiast.

\`\`\`bash
$ python -m about
<Developer: Renaud | Senior Python/Backend>

$ uptime
6+ years building scalable backend systems
\`\`\`

Based in Dieulefit, Drome, France.

## Navigate

  about.py ......... Who I am
  skills.py ........ Technical stack
  music.py ......... Antres 808
  contact.py ....... Get in touch`
  },
  'about.py': {
    lang: 'py',
    content: `"""Senior Python/Backend Developer."""


from dataclasses import dataclass, field


@dataclass
class Developer:
    name: str = "Renaud"
    location: str = "Dieulefit, Drome, France"
    role: str = "Senior Python/Backend Developer"
    experience: str = "6+ years"

    passions: list[str] = field(default_factory=lambda: [
        "Scalable backend architectures",
        "Electronic music production",
        "Open source tooling",
        "Local-first, privacy-respecting software",
    ])

    currently_building: dict[str, str] = field(
        default_factory=lambda: {
            "ProTest": "Modern Python testing framework",
            "Antres 808": "Electronic / bass music project",
            "Nabu": "AI-powered answer engine",
        }
    )

    def __repr__(self) -> str:
        return f"<{self.name} | {self.role}>"


me = Developer()`
  },
  'skills.py': {
    lang: 'py',
    content: `"""Technical stack & expertise."""


LANGUAGES: dict[str, str] = {
    "Python":     "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  Expert",
    "C/C++":      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591  Familiar",
    "TypeScript": "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591  Proficient",
    "SQL":        "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591\u2591  Advanced",
}

BACKEND: list[str] = [
    "FastAPI",
    "Celery",
    "Pydantic",
    "Alembic",
    "SQLAlchemy",
]

INFRASTRUCTURE: list[str] = [
    "Docker",
    "Kubernetes",
    "AWS (AmazonMQ, ECS, S3)",
    "RabbitMQ",
    "PostgreSQL",
    "Redis",
]

AI_AND_LLM: list[str] = [
    "LLM integration & RAG pipelines",
    "vLLM serving (Qwen, etc.)",
    "Pydantic AI",
    "ChromaDB",
    "LM Studio",
]

TOOLING: list[str] = [
    "Neovim",
    "Git",
    "Linux",
    "CI/CD (GitHub Actions)",
]`
  },
  'music.py': {
    lang: 'py',
    content: `"""Antres 808 -- Electronic music project."""


from dataclasses import dataclass, field


@dataclass
class Artist:
    name: str = "Antres 808"
    genres: list[str] = field(default_factory=lambda: [
        "Electronic",
        "Bass Music",
        "Electro Oriental",
    ])
    tools: list[str] = field(default_factory=lambda: [
        "u-he Diva",
        "Hardware synthesizers",
        "Ableton Live",
        "d&b audiotechnik systems",
    ])
    links: dict[str, str] = field(default_factory=lambda: {
        "soundcloud": "https://soundcloud.com/...",
        "bandcamp": "https://antres808.bandcamp.com",
    })

    def play(self) -> None:
        print("Now playing Antres 808...")


antres = Artist()`
  },
  'contact.py': {
    lang: 'py',
    content: `"""Get in touch."""


CONTACT: dict[str, str] = {
    "email": "your@email.com",
    "github": "https://github.com/...",
    "linkedin": "https://linkedin.com/in/...",
    "location": "Dieulefit, Drome, France",
}


def reach_out(subject: str) -> str:
    return f"Let's talk about {subject}!"


if __name__ == "__main__":
    print(reach_out("your next project"))`
  }
}

export const FILE_LIST = ['README.md', 'about.py', 'skills.py', 'music.py', 'contact.py']

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
