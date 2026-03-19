<script setup lang="ts">
import { C, FONT, FILE_LIST } from '~/utils/portfolio'

defineProps<{
  activeFile: string
  visible: boolean
}>()

const emit = defineEmits<{
  select: [name: string]
}>()

const hoveredFile = ref<string | null>(null)

const netrwLines = [
  { t: '" ============================================', c: C.comment },
  { t: '"   netrw v173: ~/portfolio', c: C.comment },
  { t: '"   Sorted by      name', c: C.comment },
  { t: '"   Sort sequence:  [\\/]$,\\<core\\%', c: C.comment },
  { t: '"   Quick Help: <F1>:help  -:go up', c: C.comment },
  { t: '" ============================================', c: C.comment },
  { t: '../', c: C.cyan }
]

function fileBackground(file: string, isActive: boolean): string {
  if (isActive) return C.blue
  if (hoveredFile.value === file) return C.visual
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
      v-for="f in FILE_LIST"
      :key="f"
      :style="{
        padding: '0 10px',
        cursor: 'pointer',
        whiteSpace: 'pre',
        color: f === activeFile ? C.bg : C.fg,
        background: fileBackground(f, f === activeFile),
      }"
      @click="emit('select', f)"
      @mouseenter="hoveredFile = f"
      @mouseleave="hoveredFile = null"
    >
      {{ f }}
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
