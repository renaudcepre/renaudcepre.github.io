<script setup lang="ts">
import { marked, Renderer } from 'marked'
import { C, FONT } from '~/utils/portfolio'

const mdRenderer = new Renderer()

mdRenderer.heading = function ({ tokens, depth }) {
  const colors = [C.green, C.magenta, C.cyan, C.yellow, C.blue, C.func]
  const color = colors[depth - 1] || C.fg
  const content = this.parser.parseInline(tokens)
  return `<div class="md-heading md-h${depth}" style="color:${color}">${content}</div>`
}

mdRenderer.image = function ({ href, text }) {
  return `<img src="${href}" alt="${text || ''}" />`
}

mdRenderer.blockquote = function ({ tokens }) {
  const inner = this.parser.parse(tokens)
  return `<div class="md-blockquote"><span class="md-bq-border">│</span><div>${inner}</div></div>`
}

mdRenderer.code = function ({ text, lang }) {
  const langLabel = lang || 'text'
  return `<div class="md-codeblock"><div class="md-codeblock-header"><span style="color:${C.blue}">╭─</span> <span style="color:${C.cyan}">${langLabel}</span></div><pre><code>${text}</code></pre><div class="md-codeblock-footer"><span style="color:${C.blue}">╰─</span></div></div>`
}

mdRenderer.link = function ({ href, tokens }) {
  const content = this.parser.parseInline(tokens)
  return `<a href="${href}" style="color:${C.cyan};text-decoration:none;border-bottom:1px dashed ${C.cyan}55">${content}</a>`
}

mdRenderer.list = function ({ items, ordered }) {
  const body = items.map((item: any) => this.listitem(item)).join('')
  return `<div class="md-list ${ordered ? 'md-list-ordered' : ''}">${body}</div>`
}

mdRenderer.listitem = function (item) {
  const content = this.parser.parseInline(item.tokens[0]?.tokens || item.tokens)
  return `<div class="md-list-item"><span class="md-bullet">▸</span><span>${content}</span></div>`
}

mdRenderer.paragraph = function ({ tokens }) {
  return `<p>${this.parser.parseInline(tokens)}</p>`
}

mdRenderer.codespan = function ({ text }) {
  return `<code>${text}</code>`
}

mdRenderer.hr = function () {
  return `<div class="md-hr">─────────────────────────────────────────</div>`
}

mdRenderer.strong = function ({ tokens }) {
  return `<span style="color:${C.yellow};font-weight:700">${this.parser.parseInline(tokens)}</span>`
}

mdRenderer.em = function ({ tokens }) {
  return `<span style="color:${C.comment};font-style:italic">${this.parser.parseInline(tokens)}</span>`
}

const props = defineProps<{
  file: string
  filesMap: Record<string, { lang: string, content: string }>
}>()

const data = computed(() => props.filesMap[props.file])
const isImage = computed(() => data.value?.lang === 'img')
const isVideo = computed(() => data.value?.lang === 'video')
const isAnsi = computed(() => data.value?.lang === 'ansi')
const isMd = computed(() => data.value?.lang === 'md')
const lines = computed(() => (isImage.value || isVideo.value) ? [] : (data.value?.content.split('\n') ?? []))
const emptyRows = computed(() => (isImage.value || isVideo.value) ? 0 : Math.max(0, 40 - lines.value.length))

const renderedMode = useState('md-rendered-mode', () => false)

onMounted(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'r' && e.ctrlKey && isMd.value) {
      e.preventDefault()
      renderedMode.value = !renderedMode.value
    }
  }
  window.addEventListener('keydown', handler)
  onUnmounted(() => window.removeEventListener('keydown', handler))
})

const renderedHtml = computed(() => {
  if (!isMd.value || !data.value?.content) return ''
  let html = marked(data.value.content, { renderer: mdRenderer }) as string
  const fileDir = props.file.includes('/')
    ? 'portfolio/' + props.file.split('/').slice(0, -1).join('/')
    : 'portfolio'
  html = html.replace(/<img([^>]*?)src="([^"]+)"([^>]*)>/g, (_match, pre, src, post) => {
    if (src.startsWith('http') || src.startsWith('/')) return _match
    return `<img${pre}src="/${fileDir}/${src}"${post}>`
  })
  return html
})

const router = useRouter()

function handleMdClick(e: MouseEvent) {
  const anchor = (e.target as HTMLElement).closest('a')
  if (!anchor) return
  const href = anchor.getAttribute('href')
  if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return
  e.preventDefault()
  const dir = props.file.includes('/') ? props.file.split('/').slice(0, -1).join('/') : ''
  const raw = dir ? `${dir}/${href}` : href
  const parts = raw.split('/')
  const resolved: string[] = []
  for (const p of parts) {
    if (p === '..') resolved.pop()
    else if (p !== '.') resolved.push(p)
  }
  router.push('/' + resolved.join('/'))
}
</script>

<template>
  <div
    v-if="data"
    :style="{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      background: C.bg,
      fontFamily: FONT,
      fontSize: '13px',
    }"
  >
    <!-- Mini tmux bar for markdown files -->
    <div
      v-if="isMd"
      :style="{
        height: '19px',
        background: C.blue,
        display: 'flex',
        alignItems: 'center',
        fontFamily: FONT,
        fontSize: '11px',
        flexShrink: 0,
        userSelect: 'none',
      }"
    >
      <span :style="{ background: C.statusBg, color: C.blue, padding: '0 6px', fontWeight: 700, height: '100%', display: 'flex', alignItems: 'center' }">[1]</span>
      <span
        :style="{
          padding: '0 6px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          fontWeight: !renderedMode ? 700 : 400,
          background: !renderedMode ? C.statusBg : 'transparent',
          color: !renderedMode ? C.blue : C.bg,
        }"
        @click="renderedMode = false"
      >0:raw{{ !renderedMode ? '*' : '' }}</span>
      <span
        :style="{
          padding: '0 6px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          fontWeight: renderedMode ? 700 : 400,
          background: renderedMode ? C.statusBg : 'transparent',
          color: renderedMode ? C.blue : C.bg,
        }"
        @click="renderedMode = true"
      >1:render{{ renderedMode ? '*' : '' }}</span>
    </div>

    <div
      :style="{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'auto',
        lineHeight: isAnsi ? '13px' : '21px',
      }"
    >
      <!-- Video mode -->
      <div
        v-if="isVideo"
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '24px',
        }"
      >
        <video
          :src="data.content.trim()"
          controls
          loop
          :style="{ maxWidth: '100%', maxHeight: '100%', borderRadius: '4px' }"
        />
      </div>

      <!-- Image mode -->
      <div
        v-else-if="isImage"
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '24px',
        }"
      >
        <img
          :src="data.content.trim()"
          :alt="file"
          :style="{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '4px' }"
        >
      </div>

      <!-- Rendered markdown mode -->
      <div
        v-else-if="isMd && renderedMode"
        class="md-rendered"
        :style="{
          padding: '24px 32px',
          maxWidth: '800px',
          color: C.fg,
          '--md-code-bg': C.codeBg,
          '--md-code-fg': C.codeFg,
          '--md-code-border': C.border,
          '--md-codeblock-bg': C.codeBlockBg,
          '--md-codeblock-border': C.codeBlockBorder,
          '--md-codeblock-fg': C.white,
          '--md-bq-border': C.bqBorder,
          '--md-bq-text': C.bqText,
          '--md-bullet': C.bullet,
          '--md-ol-num': C.olNum,
          '--md-hr': C.hr,
          '--md-border': C.border,
          '--md-th-bg': C.thBg,
          '--md-th-fg': C.thFg,
          '--md-tr-even': C.trEvenBg,
        } as any"
        v-html="renderedHtml"
        @click="handleMdClick"
      />

      <!-- Code / text mode -->
      <template v-else>
        <!-- ANSI: centered in pane -->
        <div
          v-if="isAnsi"
          :style="{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100%',
            padding: '24px',
          }"
        >
          <div>
            <div
              v-for="(line, i) in lines"
              :key="i"
              :style="{ display: 'flex', minHeight: '13px' }"
            >
              <span :style="{ whiteSpace: 'pre' }">
                <RenderLine :line="line" :lang="data.lang" />
              </span>
            </div>
          </div>
        </div>

        <!-- Code / plain text -->
        <template v-else>
          <div
            v-for="(line, i) in lines"
            :key="i"
            :style="{ display: 'flex', minHeight: '21px' }"
          >
            <span
              :style="{
                width: '48px',
                textAlign: 'right',
                paddingRight: '12px',
                color: C.gutter,
                userSelect: 'none',
                flexShrink: 0,
              }"
            >{{ i + 1 }}</span>
            <span :style="{ whiteSpace: 'pre' }">
              <RenderLine :line="line" :lang="data.lang" />
            </span>
          </div>
          <div
            v-for="i in emptyRows"
            :key="`e${i}`"
            :style="{ display: 'flex', minHeight: '21px' }"
          >
            <span
              :style="{
                width: '48px',
                textAlign: 'right',
                paddingRight: '12px',
                color: C.blue,
                userSelect: 'none',
                flexShrink: 0,
              }"
            >~</span>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<style>
.md-rendered {
  font-family: 'JetBrains Mono', 'Cascadia Mono', 'SF Mono', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.9;
  letter-spacing: 0.01em;
}

/* Headings */
.md-rendered .md-heading {
  margin: 1.8em 0 0.6em;
  font-weight: 700;
}
.md-rendered .md-h1 { font-size: 1.5em; }
.md-rendered .md-h2 { font-size: 1.25em; }
.md-rendered .md-h3 { font-size: 1.1em; }
.md-rendered .md-h4, .md-rendered .md-h5, .md-rendered .md-h6 { font-size: 1em; }
.md-rendered .md-heading-hash {
  user-select: none;
  margin-right: 2px;
  font-weight: 400;
}

/* Paragraphs */
.md-rendered p { margin: 0.7em 0; }

/* Links */
.md-rendered a:hover { border-bottom-style: solid !important; }

/* Inline code */
.md-rendered code {
  background: var(--md-code-bg);
  color: var(--md-code-fg);
  padding: 2px 7px;
  border-radius: 3px;
  font-family: inherit;
  font-size: 0.95em;
  border: 1px solid var(--md-code-border);
}

/* Code blocks */
.md-rendered .md-codeblock {
  margin: 1.2em 0;
}
.md-rendered .md-codeblock-header {
  font-size: 11px;
  padding: 0 0 2px;
  user-select: none;
}
.md-rendered .md-codeblock-footer {
  font-size: 11px;
  padding: 2px 0 0;
  user-select: none;
}
.md-rendered .md-codeblock pre {
  background: var(--md-codeblock-bg);
  border-left: 2px solid var(--md-codeblock-border);
  padding: 12px 16px;
  overflow-x: auto;
  margin: 0;
}
.md-rendered .md-codeblock pre code {
  background: none;
  border: none;
  padding: 0;
  color: var(--md-codeblock-fg);
  font-size: 12px;
  line-height: 1.7;
}

/* Blockquotes */
.md-rendered .md-blockquote {
  display: flex;
  gap: 12px;
  margin: 0.8em 0;
}
.md-rendered .md-bq-border {
  color: var(--md-bq-border);
  user-select: none;
  flex-shrink: 0;
  line-height: 1.9;
}
.md-rendered .md-blockquote p {
  color: var(--md-bq-text);
  font-style: italic;
  margin: 0;
}

/* Lists */
.md-rendered .md-list {
  margin: 0.5em 0;
  padding-left: 0;
}
.md-rendered .md-list-item {
  display: flex;
  gap: 8px;
  margin: 0.2em 0;
}
.md-rendered .md-bullet {
  color: var(--md-bullet);
  user-select: none;
  flex-shrink: 0;
}
.md-rendered .md-list-ordered { counter-reset: md-counter; }
.md-rendered .md-list-ordered .md-bullet { display: none; }
.md-rendered .md-list-ordered .md-list-item::before {
  counter-increment: md-counter;
  content: counter(md-counter) ".";
  color: var(--md-ol-num);
  flex-shrink: 0;
  min-width: 1.5em;
}

/* HR */
.md-rendered .md-hr {
  color: var(--md-hr);
  margin: 1.5em 0;
  user-select: none;
  overflow: hidden;
  letter-spacing: -1px;
}

/* Images & video */
.md-rendered img {
  max-width: 100%;
  border-radius: 4px;
  margin: 1em 0;
  display: block;
  border: 1px solid var(--md-border);
}
.md-rendered video {
  max-width: 100%;
  border-radius: 4px;
  margin: 1em 0;
  display: block;
  border: 1px solid var(--md-border);
}

/* Tables */
.md-rendered table {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
  font-size: 12px;
}
.md-rendered th, .md-rendered td {
  border: 1px solid var(--md-border);
  padding: 6px 12px;
  text-align: left;
}
.md-rendered th {
  background: var(--md-th-bg);
  color: var(--md-th-fg);
  font-weight: 600;
}
.md-rendered tr:nth-child(even) { background: var(--md-tr-even); }
</style>
