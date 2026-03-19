<script setup lang="ts">
import { C, FONT } from '~/utils/portfolio'

const props = defineProps<{
  file: string
  filesMap: Record<string, { lang: string, content: string }>
}>()

const data = computed(() => props.filesMap[props.file])
const isImage = computed(() => data.value?.lang === 'img')
const isAnsi = computed(() => data.value?.lang === 'ansi')
const lines = computed(() => isImage.value ? [] : (data.value?.content.split('\n') ?? []))
const emptyRows = computed(() => isImage.value ? 0 : Math.max(0, 40 - lines.value.length))
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
      lineHeight: isAnsi ? '13px' : '21px',
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

    <!-- Code / text mode -->
    <template v-else>
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
</template>
