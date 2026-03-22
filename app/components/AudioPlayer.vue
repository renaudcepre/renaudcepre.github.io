<script setup lang="ts">
import { C, FONT } from '~/utils/portfolio'

const props = defineProps<{
  content: string
}>()

interface Track {
  title: string
  file: string
}

interface Album {
  title: string
  year: number
  type: string
  link?: string
  tracks: Track[]
}

const albumData = computed<Album | null>(() => {
  if (!props.content) return null
  try { return JSON.parse(props.content) } catch { return null }
})

const { album: activeAlbum, trackIndex, playing, playTrack } = useAudioPlayer()

const durations = ref<Record<number, number>>({})
const hoveredTrack = ref(-1)

const baseDir = computed(() => {
  const slug = albumData.value?.title.toLowerCase().replace(/\s+/g, '_') ?? ''
  return `/portfolio/audio/${slug}`
})

function formatTime(s: number) {
  if (!s || !isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

function isActiveTrack(i: number) {
  return activeAlbum.value?.title === albumData.value?.title && trackIndex.value === i
}

// Preload durations
watch(albumData, (a) => {
  if (!a) return
  a.tracks.forEach((track, i) => {
    const el = new Audio()
    el.preload = 'metadata'
    el.src = `${baseDir.value}/${track.file}`
    el.addEventListener('loadedmetadata', () => {
      if (isFinite(el.duration)) {
        durations.value = { ...durations.value, [i]: el.duration }
      }
    })
  })
}, { immediate: true })
</script>

<template>
  <div
    v-if="albumData"
    :style="{
      padding: '24px 32px',
      fontFamily: FONT,
      fontSize: '13px',
      lineHeight: '21px',
      color: C.fg,
      maxWidth: '700px',
    }"
  >
    <!-- Header -->
    <div :style="{ color: C.blue, marginBottom: '4px' }">╭─ <span :style="{ color: C.green, fontWeight: 700 }">{{ albumData.title }}</span> <span :style="{ color: C.comment }">─ {{ albumData.type }}, {{ albumData.year }}</span></div>
    <div :style="{ color: C.blue }">│</div>

    <!-- Tracks -->
    <div
      v-for="(track, i) in albumData.tracks"
      :key="i"
      :style="{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        color: isActiveTrack(i) ? C.green : hoveredTrack === i ? C.fg : C.fg,
        gap: '8px',
      }"
      @click="playTrack(albumData!, i)"
      @mouseenter="hoveredTrack = i"
      @mouseleave="hoveredTrack = -1"
    >
      <span :style="{ color: C.blue }">│</span>
      <span data-no-scramble :style="{ width: '24px', textAlign: 'center', color: isActiveTrack(i) && playing ? C.green : hoveredTrack === i ? C.green : C.comment }">
        {{ isActiveTrack(i) && playing ? '⏸' : isActiveTrack(i) && !playing ? '▶' : hoveredTrack === i ? '▷' : '·' }}
      </span>
      <span :style="{ width: '24px', textAlign: 'right', color: C.gutter }">{{ String(i + 1).padStart(2, '0') }}</span>
      <span :style="{ flex: 1, color: isActiveTrack(i) ? C.green : hoveredTrack === i ? C.green : C.fg }">{{ track.title }}</span>
      <span :style="{ color: C.gutter, minWidth: '40px', textAlign: 'right' }">{{ durations[i] ? formatTime(durations[i]) : '' }}</span>
    </div>

    <!-- Footer -->
    <div :style="{ color: C.blue, marginTop: '4px' }">│</div>
    <div v-if="albumData.link" :style="{ color: C.blue }">╰─ <a :href="albumData.link" target="_blank" rel="noopener" :style="{ color: C.cyan, textDecoration: 'none', borderBottom: '1px dashed ' + C.cyan + '55' }">{{ albumData.link.replace('https://', '') }}</a></div>
    <div v-else :style="{ color: C.blue }">╰─</div>
  </div>
</template>
