<script setup lang="ts">
import { C, FONT } from '~/utils/portfolio'

defineProps<{
  isMobile: boolean
  showNetrw?: boolean
  themeName?: string
}>()

const emit = defineEmits<{
  toggleNetrw: []
  cycleTheme: []
}>()

const { quote } = useQuote()
const currentTime = ref('')

onMounted(() => {
  const update = () => {
    currentTime.value = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }
  update()
  const interval = setInterval(update, 60_000)
  onUnmounted(() => clearInterval(interval))
})
</script>

<template>
  <div
    :style="{
      height: isMobile ? '32px' : '19px',
      background: C.green,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0',
      fontFamily: FONT,
      fontSize: '11px',
      flexShrink: 0,
      color: C.bg
    }"
  >
    <div :style="{ display: 'flex', alignItems: 'center', height: '100%' }">
      <span
        v-if="isMobile"
        :style="{
          background: C.statusBg,
          color: C.green,
          padding: '0 12px',
          fontWeight: 700,
          fontSize: '18px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer'
        }"
        @click="emit('toggleNetrw')"
      >≡</span>
      <a
        href="https://github.com/renaudcepre"
        target="_blank"
        rel="noopener"
        :style="{
          padding: '0 8px',
          color: C.bg,
          textDecoration: 'none'
        }"
      >github.com/renaudcepre</a>
    </div>
    <span
      v-if="!isMobile"
      :style="{
        color: C.bg,
        fontStyle: 'italic',
        opacity: 0.7,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        flex: 1,
        textAlign: 'center',
        padding: '0 12px'
      }"
    >{{ quote }}</span>
    <div :style="{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px' }">
      <span
        :style="{ cursor: 'pointer', opacity: 0.7 }"
        :title="'Theme: ' + themeName + ' (Ctrl+;)'"
        @click="emit('cycleTheme')"
      >{{ themeName }}</span>
      <ClientOnly>{{ currentTime }}</ClientOnly>
    </div>
  </div>
</template>
