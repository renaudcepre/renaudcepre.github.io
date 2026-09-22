<script setup lang="ts">
import { C, FONT } from '~/utils/portfolio'
import { formatTime } from '~/utils/format'

const { album, trackIndex, playing, currentTime, duration, togglePlay, seek, skipNext, skipPrev } = useAudioPlayer()

const track = computed(() => {
  if (!album.value || trackIndex.value < 0) return null
  return album.value.tracks[trackIndex.value]
})

const progress = computed(() => {
  if (!duration.value) return 0
  return (currentTime.value / duration.value) * 100
})

function onInputSeek(e: Event) {
  const target = e.target as HTMLInputElement
  seek(Number(target.value) / 100)
}
</script>

<template>
  <div
    v-if="track"
    role="region"
    :aria-label="$t('a11y.audioPlayer')"
    :style="{
      height: '24px',
      background: C.statusBg,
      display: 'flex',
      alignItems: 'center',
      fontFamily: FONT,
      fontSize: '11px',
      flexShrink: 0,
      color: C.fg,
      userSelect: 'none'
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
        gap: '6px'
      }"
    >
      <button
        type="button"
        data-no-scramble
        :aria-label="$t('a11y.previousTrack')"
        :style="{
          border: 'none',
          font: 'inherit',
          background: 'transparent',
          color: C.bg,
          padding: 0,
          cursor: 'pointer'
        }"
        @click="skipPrev"
      >⏮</button>
      <button
        type="button"
        data-no-scramble
        :aria-label="playing ? $t('a11y.pause') : $t('a11y.play')"
        :style="{
          border: 'none',
          font: 'inherit',
          fontSize: '11px',
          background: 'transparent',
          color: C.bg,
          padding: 0,
          cursor: 'pointer'
        }"
        @click="togglePlay"
      >{{ playing ? '⏸' : '▶' }}</button>
      <button
        type="button"
        data-no-scramble
        :aria-label="$t('a11y.nextTrack')"
        :style="{
          border: 'none',
          font: 'inherit',
          background: 'transparent',
          color: C.bg,
          padding: 0,
          cursor: 'pointer'
        }"
        @click="skipNext"
      >⏭</button>
    </span>

    <!-- Track info -->
    <span :style="{ padding: '0 8px', whiteSpace: 'nowrap' }">
      <span :style="{ color: C.green }">{{ track.title }}</span>
      <span
        v-if="album"
        :style="{ color: C.statusFg }"
      > · {{ album.title }}</span>
    </span>

    <!-- Progress bar -->
    <input
      type="range"
      min="0"
      max="100"
      step="0.1"
      class="player-seek"
      :value="progress"
      :aria-label="$t('a11y.seek')"
      :aria-valuetext="formatTime(currentTime)"
      :style="{
        appearance: 'none',
        flex: 1,
        height: '3px',
        margin: '0 8px',
        borderRadius: '1px',
        cursor: 'pointer',
        background: `linear-gradient(to right, ${C.green} ${progress}%, ${C.visual} ${progress}%)`
      }"
      @input="onInputSeek"
    >

    <!-- Time -->
    <span :style="{ color: C.statusFg, padding: '0 8px', whiteSpace: 'nowrap' }">
      {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
    </span>
  </div>
</template>

<style scoped>
/* Hide the native thumb so the range input reads as a plain 3px progress bar. */
.player-seek::-webkit-slider-thumb {
  appearance: none;
  width: 0;
  height: 0;
}

.player-seek::-moz-range-thumb {
  width: 0;
  height: 0;
  border: none;
}
</style>
