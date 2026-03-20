<script setup lang="ts">
import { marked } from 'marked'
import { C, FONT } from '~/utils/portfolio'

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

const renderedMode = ref(false)

watch(() => props.file, () => { renderedMode.value = false })

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
  let html = marked(data.value.content) as string
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
    <!-- Mini tmux bar pour les fichiers markdown -->
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
      <span :style="{ background: '#1a2d3d', color: C.blue, padding: '0 6px', fontWeight: 700, height: '100%', display: 'flex', alignItems: 'center' }">[1]</span>
      <span
        :style="{
          padding: '0 6px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          fontWeight: !renderedMode ? 700 : 400,
          background: !renderedMode ? '#1a2d3d' : 'transparent',
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
          background: renderedMode ? '#1a2d3d' : 'transparent',
          color: renderedMode ? C.blue : C.bg,
        }"
        @click="renderedMode = true"
      >1:✨render{{ renderedMode ? '*' : '' }}</span>
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
        :style="{ padding: '24px 32px', maxWidth: '800px', color: C.fg }"
        v-html="renderedHtml"
        @click="handleMdClick"
      />

      <!-- Code / text mode -->
      <template v-else>
        <!-- ANSI: centré dans le pane -->
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

        <!-- Code / texte normal -->
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 15px;
  line-height: 1.7;
}
.md-rendered h1, .md-rendered h2, .md-rendered h3 { color: #e06c75; margin: 1.5em 0 0.5em; font-weight: 600; }
.md-rendered h1 { font-size: 1.8em; border-bottom: 1px solid #3e4452; padding-bottom: 0.3em; }
.md-rendered h2 { font-size: 1.4em; border-bottom: 1px solid #3e4452; padding-bottom: 0.2em; }
.md-rendered h3 { font-size: 1.1em; color: #e5c07b; }
.md-rendered p { margin: 0.8em 0; }
.md-rendered a { color: #61afef; text-decoration: none; }
.md-rendered a:hover { text-decoration: underline; }
.md-rendered code { background: #21252b; color: #98c379; padding: 2px 6px; border-radius: 3px; font-family: 'JetBrains Mono', monospace; font-size: 0.88em; }
.md-rendered pre { background: #21252b; border: 1px solid #3e4452; border-radius: 6px; padding: 16px; overflow-x: auto; margin: 1em 0; }
.md-rendered pre code { background: none; padding: 0; font-size: 0.85em; color: #abb2bf; }
.md-rendered blockquote { border-left: 3px solid #56b6c2; margin: 0; padding: 4px 16px; color: #5c6370; font-style: italic; }
.md-rendered ul, .md-rendered ol { padding-left: 1.5em; margin: 0.5em 0; }
.md-rendered li { margin: 0.3em 0; }
.md-rendered img { max-width: 100%; border-radius: 6px; margin: 1em 0; display: block; }
.md-rendered video { max-width: 100%; border-radius: 6px; margin: 1em 0; display: block; }
.md-rendered hr { border: none; border-top: 1px solid #3e4452; margin: 1.5em 0; }
.md-rendered table { border-collapse: collapse; width: 100%; margin: 1em 0; }
.md-rendered th, .md-rendered td { border: 1px solid #3e4452; padding: 8px 12px; text-align: left; }
.md-rendered th { background: #21252b; color: #e5c07b; }
.md-rendered tr:nth-child(even) { background: #1a1d23; }
</style>
