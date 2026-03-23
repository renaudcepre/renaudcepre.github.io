<script setup lang="ts">
import { C, FONT } from '~/utils/portfolio'

defineProps<{
  openTabs: string[]
  activeFile: string
  isMobile: boolean
}>()

const emit = defineEmits<{
  tabClick: [name: string]
}>()
</script>

<template>
  <div
    :style="{
      display: 'flex',
      background: C.tabBg,
      minHeight: isMobile ? '32px' : '21px',
      maxHeight: isMobile ? '32px' : '21px',
      borderBottom: `1px solid ${C.border}`,
      flexShrink: 0,
      fontFamily: FONT,
      fontSize: '12px',
      overflowX: isMobile ? 'auto' : 'hidden'
    }"
  >
    <div
      v-for="(tab, i) in openTabs"
      :key="tab"
      :style="{
        padding: isMobile ? '4px 14px' : '2px 10px',
        cursor: 'pointer',
        background: tab === activeFile ? C.tabActive : C.tabBg,
        color: tab === activeFile ? C.fg : C.comment,
        borderRight: `1px solid ${C.border}`,
        whiteSpace: 'nowrap',
        flexShrink: 0
      }"
      @click="emit('tabClick', tab)"
    >
      {{ i + 1 }}:{{ tab }}
    </div>
    <div :style="{ flex: 1 }" />
  </div>
</template>
