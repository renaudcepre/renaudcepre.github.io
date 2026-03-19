<script setup lang="ts">
import { C, FONT } from '~/utils/portfolio'

const currentTime = ref('')

onMounted(() => {
  const update = () => {
    currentTime.value = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  }
  update()
  const interval = setInterval(update, 60_000)
  onUnmounted(() => clearInterval(interval))
})
</script>

<template>
  <div
    :style="{
      height: '19px',
      background: C.green,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0',
      fontFamily: FONT,
      fontSize: '11px',
      flexShrink: 0,
      color: C.bg,
    }"
  >
    <div :style="{ display: 'flex', alignItems: 'center', height: '100%' }">
      <span :style="{ background: '#2d4f2d', color: C.green, padding: '0 6px', fontWeight: 700 }">[0]</span>
      <span :style="{ padding: '0 6px', fontWeight: 700, background: '#1a3d1a', color: C.green }">0:nvim*</span>
      <span :style="{ padding: '0 6px' }">1:zsh</span>
      <span :style="{ padding: '0 6px' }">2:htop</span>
    </div>
    <div :style="{ padding: '0 8px' }">
      <ClientOnly>"renaud@dieulefit" {{ currentTime }}</ClientOnly>
    </div>
  </div>
</template>
