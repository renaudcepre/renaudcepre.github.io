<script setup lang="ts">
import { C, FONT } from '~/utils/portfolio'

const props = defineProps<{
  file: string
  filesMap: Record<string, { lang: string, content: string }>
}>()

const data = computed(() => props.filesMap[props.file])
const lineCount = computed(() => data.value ? data.value.content.split('\n').length : 0)
const LANG_LABELS: Record<string, string> = {
  py: 'python',
  md: 'markdown',
  img: 'image',
  ansi: 'ansi',
  txt: 'text',
  audio: 'antres',
  video: 'video'
}
const langLabel = computed(() => LANG_LABELS[data.value?.lang ?? ''] ?? data.value?.lang ?? '')
</script>

<template>
  <div
    :style="{
      height: '21px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 0,
      fontFamily: FONT,
      fontSize: '12px',
      flexShrink: 0,
      background: C.statusBg
    }"
  >
    <div :style="{ display: 'flex', alignItems: 'center', height: '100%' }">
      <span
        :style="{
          background: C.blue,
          color: C.bg,
          padding: '0 8px',
          fontWeight: 700,
          height: '100%',
          display: 'flex',
          alignItems: 'center'
        }"
      >NORMAL</span>
      <span
        :style="{
          background: C.visual,
          color: C.fg,
          padding: '0 8px',
          height: '100%',
          display: 'flex',
          alignItems: 'center'
        }"
      >{{ file }}</span>
      <span :style="{ color: C.comment, padding: '0 6px' }">[+]</span>
    </div>
    <div :style="{ display: 'flex', alignItems: 'center', height: '100%', gap: '4px', color: C.comment, padding: '0 8px' }">
      <span><span :style="{ color: C.yellow }">^E</span> explorer</span>
      <span :style="{ color: C.gutter }">│</span>
      <span><span :style="{ color: C.yellow }">^R</span> render</span>
      <span :style="{ color: C.gutter }">│</span>
      <span><span :style="{ color: C.yellow }">^T</span> theme</span>
    </div>

    <div :style="{ display: 'flex', alignItems: 'center', height: '100%' }">
      <span :style="{ color: C.comment, padding: '0 8px' }">{{ langLabel }}</span>
      <span
        :style="{
          background: C.visual,
          color: C.fg,
          padding: '0 8px',
          height: '100%',
          display: 'flex',
          alignItems: 'center'
        }"
      >{{ lineCount }}L</span>
      <span
        :style="{
          background: C.blue,
          color: C.bg,
          padding: '0 8px',
          fontWeight: 700,
          height: '100%',
          display: 'flex',
          alignItems: 'center'
        }"
      >1:1</span>
    </div>
  </div>
</template>
