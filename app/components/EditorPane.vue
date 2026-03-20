<script setup lang="ts">
import { marked } from 'marked'
import { C, FONT, tokAnsi } from '~/utils/portfolio'

const props = defineProps<{
  file: string
  filesMap: Record<string, { lang: string, content: string }>
}>()

const data = computed(() => props.filesMap[props.file])
const isImage = computed(() => data.value?.lang === 'img')
const isAnsi = computed(() => data.value?.lang === 'ansi')
const isMd = computed(() => data.value?.lang === 'md')
const lines = computed(() => isImage.value ? [] : (data.value?.content.split('\n') ?? []))
const emptyRows = computed(() => isImage.value ? 0 : Math.max(0, 40 - lines.value.length))

const renderedMode = ref(false)

watch(() => props.file, () => {
  renderedMode.value = false
})

function ansiToHtml(content: string): string {
  const lines = content.split('\n')
  const linesHtml = lines.map((line) => {
    const toks = tokAnsi(line)
    const spans = toks.map((tok) => {
      const s = [`color:${tok.c}`]
      if (tok.bg) s.push(`background:${tok.bg}`)
      if (tok.b) s.push('font-weight:700')
      return `<span style="${s.join(';')}">${tok.t.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</span>`
    }).join('')
    return `<div style="display:flex;min-height:13px;line-height:13px">${spans}</div>`
  }).join('')
  return `<div style="font-family:${FONT};font-size:13px;background:${C.bg};padding:12px;border-radius:4px;overflow-x:auto;margin:1em 0">${linesHtml}</div>`
}

const renderedHtml = computed(() => {
  if (!isMd.value || !data.value?.content) return ''
  let html = marked(data.value.content) as string
  // Remplace <img src="*.ansi"> par le rendu ANSI inline
  html = html.replace(/<img[^>]*src="([^"]+\.ansi)"[^>]*>/g, (_match, src) => {
    // src peut être relatif ex: "me.ansi" → chercher dans filesMap
    const filename = src.replace(/^.*\//, '') // prendre juste le nom de fichier
    const ansiFile = Object.entries(props.filesMap).find(([name]) => name.endsWith(filename))
    if (!ansiFile || !ansiFile[1].content) return `<code>${src}</code>`
    return ansiToHtml(ansiFile[1].content)
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
  // Résolution relative au fichier courant
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
    <div
      :style="{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'auto',
        lineHeight: isAnsi ? '13px' : '21px',
      }"
    >

    <!-- Image mode -->
    <div
      v-if="isImage"
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
        :style="{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          borderRadius: '4px',
        }"
      >
    </div>

    <!-- Rendered markdown mode -->
    <div
      v-else-if="isMd && renderedMode"
    >
      <div
        :style="{
          display: 'flex',
          minHeight: '21px',
          cursor: 'pointer',
        }"
        @click="renderedMode = false"
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
        />
        <span :style="{ color: C.yellow, fontStyle: 'italic', whiteSpace: 'pre' }">-- rendered · click to view source --</span>
      </div>
      <div
        class="md-rendered"
        :style="{
          padding: '8px 32px 24px',
          maxWidth: '800px',
          color: C.fg,
        }"
        v-html="renderedHtml"
        @click="handleMdClick"
      />
    </div>

    <!-- Code / text mode -->
    <template v-else>
      <!-- Hint render pour les fichiers markdown -->
      <div
        v-if="isMd"
        :style="{
          display: 'flex',
          minHeight: '21px',
          cursor: 'pointer',
        }"
        @click="renderedMode = true"
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
        />
        <span :style="{ color: C.yellow, fontStyle: 'italic', whiteSpace: 'pre' }">-- markdown · click to render --</span>
      </div>
      <div
        v-for="(line, i) in lines"
        :key="i"
        :style="{ display: 'flex', minHeight: isAnsi ? '13px' : '21px' }"
      >
        <span
          v-if="!isAnsi"
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
    </div>
  </div>
</template>

<style>
.md-rendered {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 15px;
  line-height: 1.7;
}

.md-rendered h1,
.md-rendered h2,
.md-rendered h3 {
  color: #e06c75;
  margin: 1.5em 0 0.5em;
  font-weight: 600;
}

.md-rendered h1 { font-size: 1.8em; border-bottom: 1px solid #3e4452; padding-bottom: 0.3em; }
.md-rendered h2 { font-size: 1.4em; border-bottom: 1px solid #3e4452; padding-bottom: 0.2em; }
.md-rendered h3 { font-size: 1.1em; color: #e5c07b; }

.md-rendered p { margin: 0.8em 0; }

.md-rendered a { color: #61afef; text-decoration: none; }
.md-rendered a:hover { text-decoration: underline; }

.md-rendered code {
  background: #21252b;
  color: #98c379;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.88em;
}

.md-rendered pre {
  background: #21252b;
  border: 1px solid #3e4452;
  border-radius: 6px;
  padding: 16px;
  overflow-x: auto;
  margin: 1em 0;
}

.md-rendered pre code {
  background: none;
  padding: 0;
  font-size: 0.85em;
  color: #abb2bf;
}

.md-rendered blockquote {
  border-left: 3px solid #56b6c2;
  margin: 0;
  padding: 4px 16px;
  color: #5c6370;
  font-style: italic;
}

.md-rendered ul,
.md-rendered ol { padding-left: 1.5em; margin: 0.5em 0; }

.md-rendered li { margin: 0.3em 0; }

.md-rendered img {
  max-width: 100%;
  border-radius: 6px;
  margin: 1em 0;
  display: block;
}

.md-rendered hr {
  border: none;
  border-top: 1px solid #3e4452;
  margin: 1.5em 0;
}

.md-rendered table {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
}

.md-rendered th,
.md-rendered td {
  border: 1px solid #3e4452;
  padding: 8px 12px;
  text-align: left;
}

.md-rendered th { background: #21252b; color: #e5c07b; }
.md-rendered tr:nth-child(even) { background: #1a1d23; }
</style>