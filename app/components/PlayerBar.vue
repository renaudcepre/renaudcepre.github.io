<script setup lang="ts">
import { C, FONT } from '~/utils/portfolio'

const { album, trackIndex, playing, currentTime, duration, togglePlay, seek, skipNext, skipPrev } = useAudioPlayer()

const track = computed(() => {
  if (!album.value || trackIndex.value < 0) return null
  return album.value.tracks[trackIndex.value]
})

const progress = computed(() => {
  if (!duration.value) return 0
  return (currentTime.value / duration.value) * 100
})

function formatTime(s: number) {
  if (!s || !isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

function onSeek(e: MouseEvent) {
  const bar = e.currentTarget as HTMLElement
  const rect = bar.getBoundingClientRect()
  const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
  seek(ratio)
}
</script>

<template>
  <div
    v-if="track"
    :style="{
      height: '24px',
      background: C.statusBg,
      display: 'flex',
      alignItems: 'center',
      fontFamily: FONT,
      fontSize: '11px',
      flexShrink: 0,
      color: C.fg,
      userSelect: 'none',
    }"
  >
    <!-- Controls -->
    <span
      :style="{
        background: C.green,
        color: C.bg,
        padding: '0 6px',
        fontWeight: 700,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        fontSize: '9px',
        gap: '6px',
      }"
    >
      <span :style="{ cursor: 'pointer' }" @click="skipPrev">⏮</span>
      <span :style="{ cursor: 'pointer', fontSize: '11px' }" @click="togglePlay">{{ playing ? '⏸' : '▶' }}</span>
      <span :style="{ cursor: 'pointer' }" @click="skipNext">⏭</span>
    </span>

    <!-- Track info -->
    <span :style="{ padding: '0 8px', whiteSpace: 'nowrap' }">
      <span :style="{ color: C.green }">{{ track.title }}</span>
      <span v-if="album" :style="{ color: C.comment }"> · {{ album.title }}</span>
    </span>

    <!-- Progress bar -->
    <div
      :style="{
        flex: 1,
        height: '3px',
        background: C.visual,
        cursor: 'pointer',
        position: 'relative',
        margin: '0 8px',
        borderRadius: '1px',
      }"
      @click="onSeek"
    >
      <div
        :style="{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: progress + '%',
          background: C.green,
          borderRadius: '1px',
        }"
      />
    </div>

    <!-- Time -->
    <span :style="{ color: C.comment, padding: '0 8px', whiteSpace: 'nowrap' }">
      {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
    </span>
  </div>
</template>
