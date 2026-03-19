<script setup lang="ts">
import { C, FONT } from '~/utils/portfolio'

const props = defineProps<{
  activeFile: string
  visible: boolean
  fileList: string[]
}>()

const emit = defineEmits<{
  select: [name: string]
}>()

const hoveredEntry = ref<string | null>(null)
const currentDir = ref('')

const netrwPath = computed(() => `~/portfolio/${currentDir.value}`)

const netrwLines = computed(() => [
  { t: '" ============================================', c: C.comment },
  { t: `"   netrw v173: ${netrwPath.value}`, c: C.comment },
  { t: '"   Sorted by      name', c: C.comment },
  { t: '"   Sort sequence:  [\\/]$,\\<core\\%', c: C.comment },
  { t: '"   Quick Help: <F1>:help  -:go up', c: C.comment },
  { t: '" ============================================', c: C.comment }
])

const entries = computed(() => {
  const dirs = new Set<string>()
  const files: string[] = []
  const prefix = currentDir.value

  for (const f of props.fileList) {
    if (!f.startsWith(prefix)) continue
    const rest = f.slice(prefix.length)
    const slashIdx = rest.indexOf('/')
    if (slashIdx !== -1) {
      dirs.add(rest.slice(0, slashIdx + 1))
    } else {
      files.push(rest)
    }
  }

  return [
    ...Array.from(dirs).sort(),
    ...files.sort()
  ]
})

function handleClick(entry: string) {
  if (entry === '../') {
    const parts = currentDir.value.slice(0, -1).split('/')
    parts.pop()
    currentDir.value = parts.length ? parts.join('/') + '/' : ''
  } else if (entry.endsWith('/')) {
    currentDir.value += entry
  } else {
    emit('select', currentDir.value + entry)
  }
}

function entryColor(entry: string): string {
  if (entry === '../' || entry.endsWith('/')) return C.cyan
  const fullPath = currentDir.value + entry
  return fullPath === props.activeFile ? C.bg : C.fg
}

function entryBackground(entry: string): string {
  const fullPath = currentDir.value + entry
  if (fullPath === props.activeFile) return C.blue
  if (hoveredEntry.value === entry) return C.visual
  return 'transparent'
}
</script>

<template>
  <div
    v-if="visible"
    :style="{
      width: '280px',
      background: C.netrw,
      borderRight: `1px solid ${C.border}`,
      fontFamily: FONT,
      fontSize: '13px',
      lineHeight: '21px',
      overflowY: 'auto',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
    }"
  >
    <div
      v-for="(l, i) in netrwLines"
      :key="i"
      :style="{ padding: '0 10px', color: l.c, whiteSpace: 'pre' }"
    >
      {{ l.t }}
    </div>
    <div
      :style="{
        padding: '0 10px',
        cursor: 'pointer',
        whiteSpace: 'pre',
        color: C.cyan,
        background: hoveredEntry === '../' ? C.visual : 'transparent',
      }"
      @click="handleClick('../')"
      @mouseenter="hoveredEntry = '../'"
      @mouseleave="hoveredEntry = null"
    >
      ../
    </div>
    <div
      v-for="entry in entries"
      :key="entry"
      :style="{
        padding: '0 10px',
        cursor: 'pointer',
        whiteSpace: 'pre',
        color: entryColor(entry),
        background: entryBackground(entry),
      }"
      @click="handleClick(entry)"
      @mouseenter="hoveredEntry = entry"
      @mouseleave="hoveredEntry = null"
    >
      {{ entry }}
    </div>
    <div
      v-for="i in 30"
      :key="`pad${i}`"
      :style="{ padding: '0 10px', color: C.blue, whiteSpace: 'pre' }"
    >
      ~
    </div>
  </div>
</template>
