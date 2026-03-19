import { useState, useEffect, useCallback } from "react";

const C = {
    bg: "#0e1019", fg: "#c8c8c8", comment: "#5c6370",
    keyword: "#c678dd", string: "#98c379", func: "#61afef",
    type: "#e5c07b", number: "#d19a66", operator: "#56b6c2",
    red: "#e06c75", green: "#98c379", yellow: "#e5c07b",
    blue: "#61afef", magenta: "#c678dd", cyan: "#56b6c2",
    white: "#abb2bf", gray: "#4b5263", gutter: "#3b4048",
    statusBg: "#21252b", statusFg: "#9da5b4",
    visual: "#3e4452", cursor: "#528bff", border: "#2c313a",
    netrw: "#13161e", tabBg: "#1a1d26", tabActive: "#0e1019",
};

const FILES = {
    "README.md": {
        lang: "md",
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
  contact.py ....... Get in touch`,
    },
    "about.py": {
        lang: "py",
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


me = Developer()`,
    },
    "skills.py": {
        lang: "py",
        content: `"""Technical stack & expertise."""


LANGUAGES: dict[str, str] = {
    "Python":     "████████████████████  Expert",
    "C/C++":      "████████████░░░░░░░░  Familiar",
    "TypeScript": "██████████░░░░░░░░░░  Proficient",
    "SQL":        "████████████████░░░░  Advanced",
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
]`,
    },
    "music.py": {
        lang: "py",
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


antres = Artist()`,
    },
    "contact.py": {
        lang: "py",
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
    print(reach_out("your next project"))`,
    },
};

const FILE_LIST = ["README.md", "about.py", "skills.py", "music.py", "contact.py"];

const PY_KW = new Set(["class","def","return","import","from","for","in","if","else","elif","while","with","as","try","except","raise","pass","not","and","or","is","yield","lambda","finally","del","global","assert"]);
const PY_BI = new Set(["str","int","float","bool","list","dict","tuple","set","type","print","field","dataclass"]);

function tokPy(line) {
    const toks = [];
    const re = /(""".*?"""|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|#.*$|@\w+|\b\d+(?:\.\d+)?\b|\b[a-zA-Z_]\w*\b|[^\s\w]|\s+)/g;
    let m;
    while ((m = re.exec(line)) !== null) {
        const t = m[0];
        let c = C.fg;
        if (t.startsWith("#")) c = C.comment;
        else if (t.startsWith('"') || t.startsWith("'")) c = C.string;
        else if (t.startsWith("@")) c = C.yellow;
        else if (/^\d/.test(t)) c = C.number;
        else if (PY_KW.has(t)) c = C.keyword;
        else if (t === "self") c = C.red;
        else if (t === "None" || t === "True" || t === "False") c = C.number;
        else if (PY_BI.has(t)) c = C.yellow;
        else if (/^[a-zA-Z_]\w*$/.test(t)) {
            if (line.slice(re.lastIndex).match(/^\s*\(/)) c = C.func;
            else c = C.fg;
        } else if (/^[=+\-*/<>:!|&^~%]$/.test(t)) c = C.operator;
        toks.push({ t, c });
    }
    return toks;
}

function tokMd(line) {
    if (line.startsWith("# ")) return [{ t: line, c: C.red, b: true }];
    if (line.startsWith("## ")) return [{ t: line, c: C.yellow, b: true }];
    if (line.startsWith("> ")) return [{ t: line, c: C.comment, i: true }];
    if (line.startsWith("```")) return [{ t: line, c: C.string }];
    if (line.startsWith("$ ")) return [{ t: "$ ", c: C.green }, { t: line.slice(2), c: C.fg }];
    if (line.startsWith("  ") && line.includes("..")) {
        const parts = line.split(/(\.\.\.*)/);
        return parts.map(p => ({ t: p, c: p.startsWith(".") ? C.comment : C.func }));
    }
    const toks = [];
    const re = /(`[^`]+`|[^`]+)/g;
    let mm;
    while ((mm = re.exec(line)) !== null) {
        toks.push({ t: mm[0], c: mm[0].startsWith("`") ? C.string : C.fg });
    }
    return toks;
}

function RenderLine({ line, lang }) {
    const tokens = lang === "py" ? tokPy(line) : tokMd(line);
    return <>
        {tokens.map((tok, i) => (
            <span key={i} style={{
                color: tok.c,
                fontWeight: tok.b ? 700 : 400,
                fontStyle: tok.i ? "italic" : "normal",
            }}>{tok.t}</span>
        ))}
    </>;
}

function Netrw({ activeFile, onSelect, visible }) {
    if (!visible) return null;
    const netrwLines = [
        { t: '" ============================================', c: C.comment },
        { t: '"   netrw v173: ~/portfolio', c: C.comment },
        { t: '"   Sorted by      name', c: C.comment },
        { t: '"   Sort sequence:  [\\/]$,\\<core\\%', c: C.comment },
        { t: '"   Quick Help: <F1>:help  -:go up', c: C.comment },
        { t: '" ============================================', c: C.comment },
        { t: "../", c: C.cyan },
    ];

    return (
        <div style={{
            width: 280, background: C.netrw, borderRight: `1px solid ${C.border}`,
            fontFamily: "'Cascadia Mono', 'SF Mono', 'Consolas', monospace",
            fontSize: 13, lineHeight: "21px",
            overflowY: "auto", flexShrink: 0, display: "flex", flexDirection: "column",
        }}>
            {netrwLines.map((l, i) => (
                <div key={i} style={{ padding: "0 10px", color: l.c, whiteSpace: "pre" }}>{l.t}</div>
            ))}
            {FILE_LIST.map((f) => {
                const isActive = f === activeFile;
                return (
                    <div key={f} onClick={() => onSelect(f)} style={{
                        padding: "0 10px", cursor: "pointer", whiteSpace: "pre",
                        color: isActive ? C.bg : C.fg,
                        background: isActive ? C.blue : "transparent",
                    }}
                         onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = C.visual; }}
                         onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                    >{f}</div>
                );
            })}
            {Array.from({ length: 30 }).map((_, i) => (
                <div key={`pad${i}`} style={{ padding: "0 10px", color: C.blue, whiteSpace: "pre" }}>~</div>
            ))}
        </div>
    );
}

function VimTabs({ openTabs, activeFile, onTabClick }) {
    return (
        <div style={{
            display: "flex", background: C.tabBg, minHeight: 21, maxHeight: 21,
            borderBottom: `1px solid ${C.border}`, flexShrink: 0,
            fontFamily: "'Cascadia Mono', 'SF Mono', 'Consolas', monospace",
            fontSize: 12, overflow: "hidden",
        }}>
            {openTabs.map((tab, i) => {
                const active = tab === activeFile;
                return (
                    <div key={tab} onClick={() => onTabClick(tab)} style={{
                        padding: "2px 10px", cursor: "pointer",
                        background: active ? C.tabActive : C.tabBg,
                        color: active ? C.fg : C.comment,
                        borderRight: `1px solid ${C.border}`,
                    }}>
                        {i + 1}:{tab}
                    </div>
                );
            })}
            <div style={{ flex: 1 }} />
        </div>
    );
}

function Editor({ file }) {
    const data = FILES[file];
    if (!data) return null;
    const lines = data.content.split("\n");
    const minRows = 40;

    return (
        <div style={{
            flex: 1, overflowY: "auto", overflowX: "auto", background: C.bg,
            fontFamily: "'Cascadia Mono', 'SF Mono', 'Consolas', monospace",
            fontSize: 13, lineHeight: "21px",
        }}>
            {lines.map((line, i) => (
                <div key={i} style={{ display: "flex", minHeight: 21 }}>
          <span style={{
              width: 48, textAlign: "right", paddingRight: 12,
              color: C.gutter, userSelect: "none", flexShrink: 0,
          }}>{i + 1}</span>
                    <span style={{ whiteSpace: "pre" }}>
            <RenderLine line={line} lang={data.lang} />
          </span>
                </div>
            ))}
            {Array.from({ length: Math.max(0, minRows - lines.length) }).map((_, i) => (
                <div key={`e${i}`} style={{ display: "flex", minHeight: 21 }}>
          <span style={{
              width: 48, textAlign: "right", paddingRight: 12,
              color: C.blue, userSelect: "none", flexShrink: 0,
          }}>~</span>
                </div>
            ))}
        </div>
    );
}

function TerminalPane({ visible }) {
    if (!visible) return null;
    const F = "'Cascadia Mono', 'SF Mono', 'Consolas', monospace";
    return (
        <div style={{
            height: 140, background: "#0a0c12", borderTop: `1px solid ${C.border}`,
            fontFamily: F, fontSize: 13, lineHeight: "21px",
            padding: "4px 10px", overflowY: "auto", flexShrink: 0,
        }}>
            <div>
                <span style={{ color: C.green, fontWeight: 700 }}>renaud@dieulefit</span>
                <span style={{ color: C.fg }}>:</span>
                <span style={{ color: C.blue }}>~/portfolio</span>
                <span style={{ color: C.fg }}> $ python -m about</span>
            </div>
            <div style={{ color: C.fg }}>&lt;Renaud | Senior Python/Backend Developer&gt;</div>
            <div style={{ marginTop: 4 }}>
                <span style={{ color: C.green, fontWeight: 700 }}>renaud@dieulefit</span>
                <span style={{ color: C.fg }}>:</span>
                <span style={{ color: C.blue }}>~/portfolio</span>
                <span style={{ color: C.fg }}>{" $ python -c \"from music import antres; antres.play()\""}</span>
            </div>
            <div style={{ color: C.fg }}>Now playing Antres 808...</div>
            <div style={{ marginTop: 4 }}>
                <span style={{ color: C.green, fontWeight: 700 }}>renaud@dieulefit</span>
                <span style={{ color: C.fg }}>:</span>
                <span style={{ color: C.blue }}>~/portfolio</span>
                <span style={{ color: C.fg }}> $ </span>
                <span style={{
                    display: "inline-block", width: 8, height: 16, background: C.fg,
                    verticalAlign: "middle", animation: "blink 1s step-end infinite",
                }} />
            </div>
        </div>
    );
}

function StatusLine({ file }) {
    const data = FILES[file];
    const lines = data ? data.content.split("\n").length : 0;
    const F = "'Cascadia Mono', 'SF Mono', 'Consolas', monospace";

    return (
        <div style={{
            height: 21, display: "flex", alignItems: "center",
            justifyContent: "space-between", padding: 0,
            fontFamily: F, fontSize: 12, flexShrink: 0,
            background: C.statusBg,
        }}>
            <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <span style={{
            background: C.blue, color: C.bg, padding: "0 8px",
            fontWeight: 700, height: "100%", display: "flex",
            alignItems: "center",
        }}>NORMAL</span>
                <span style={{
                    background: C.visual, color: C.fg, padding: "0 8px",
                    height: "100%", display: "flex", alignItems: "center",
                }}>{file}</span>
                <span style={{ color: C.comment, padding: "0 6px" }}>[+]</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <span style={{ color: C.comment, padding: "0 8px" }}>
          {data?.lang === "py" ? "python" : "markdown"}
        </span>
                <span style={{
                    background: C.visual, color: C.fg, padding: "0 8px",
                    height: "100%", display: "flex", alignItems: "center",
                }}>{lines}L</span>
                <span style={{
                    background: C.blue, color: C.bg, padding: "0 8px",
                    fontWeight: 700, height: "100%", display: "flex",
                    alignItems: "center",
                }}>1:1</span>
            </div>
        </div>
    );
}

function TmuxBar() {
    return (
        <div style={{
            height: 19, background: C.green, display: "flex",
            alignItems: "center", justifyContent: "space-between",
            padding: "0 0", fontFamily: "'Cascadia Mono', 'SF Mono', 'Consolas', monospace",
            fontSize: 11, flexShrink: 0, color: C.bg,
        }}>
            <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
                <span style={{ background: "#2d4f2d", color: C.green, padding: "0 6px", fontWeight: 700 }}>[0]</span>
                <span style={{ padding: "0 6px", fontWeight: 700, background: "#1a3d1a", color: C.green }}>0:nvim*</span>
                <span style={{ padding: "0 6px" }}>1:zsh</span>
                <span style={{ padding: "0 6px" }}>2:htop</span>
            </div>
            <div style={{ padding: "0 8px" }}>
                "renaud@dieulefit" {new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
            </div>
        </div>
    );
}

export default function Portfolio() {
    const [activeFile, setActiveFile] = useState("README.md");
    const [openTabs, setOpenTabs] = useState(["README.md"]);
    const [showNetrw, setShowNetrw] = useState(true);
    const [showTerm, setShowTerm] = useState(true);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => { setLoaded(true); }, []);

    useEffect(() => {
        const handler = (e) => {
            if (e.key === "e" && e.ctrlKey) { e.preventDefault(); setShowNetrw(v => !v); }
            if (e.key === "`" && e.ctrlKey) { e.preventDefault(); setShowTerm(v => !v); }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    const openFile = useCallback((name) => {
        setActiveFile(name);
        setOpenTabs(prev => prev.includes(name) ? prev : [...prev, name]);
    }, []);

    return (
        <>
            <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        * { margin:0; padding:0; box-sizing:border-box; }
        ::-webkit-scrollbar { width:6px; height:6px; }
        ::-webkit-scrollbar-track { background:${C.bg}; }
        ::-webkit-scrollbar-thumb { background:${C.gutter}; }
      `}</style>
            <div style={{
                width: "100%", height: "100vh", background: C.bg, color: C.fg,
                display: "flex", flexDirection: "column",
                opacity: loaded ? 1 : 0, transition: "opacity 0.3s",
                overflow: "hidden",
            }}>
                <VimTabs openTabs={openTabs} activeFile={activeFile} onTabClick={setActiveFile} />
                <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
                    <Netrw activeFile={activeFile} onSelect={openFile} visible={showNetrw} />
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                        <Editor file={activeFile} />
                        <TerminalPane visible={showTerm} />
                    </div>
                </div>
                <StatusLine file={activeFile} />
                <TmuxBar />
            </div>
        </>
    );
}
