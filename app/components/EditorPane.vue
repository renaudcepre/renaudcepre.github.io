<script setup lang="ts">
import { C, FONT, FILES } from '~/utils/portfolio'

const props = defineProps<{
  file: string
}>()

const data = computed(() => FILES[props.file])
const lines = computed(() => data.value?.content.split('\n') ?? [])
const emptyRows = computed(() => Math.max(0, 40 - lines.value.length))
</script>

<template>
  <div
    v-if="data"
    :style="{
      flex: 1,
      overflowY: 'auto',
      overflowX: 'auto',
      background: C.bg,
      fontFamily: FONT,
      fontSize: '13px',
      lineHeight: '21px',
      position: 'relative',
    }"
  >
    <div
      :style="{
        position: 'sticky',
        top: '8px',
        float: 'right',
        marginRight: '12px',
        padding: '2px 8px',
        fontSize: '10px',
        lineHeight: '14px',
        background: C.visual,
        color: C.comment,
        borderRadius: '3px',
        userSelect: 'none',
        zIndex: 10,
        letterSpacing: '0.5px',
      }"
    >
      READ ONLY
    </div>
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
  </div>
</template>
