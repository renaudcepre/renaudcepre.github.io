<script setup lang="ts">
import { C, FONT } from '~/utils/portfolio'
import type { Album, Track } from '~/types/audio'
import { formatTime } from '~/utils/format'

const { t } = useI18n()

const props = defineProps<{
  content: string
}>()

const albumData = computed<Album | null>(() => {
  if (!props.content) return null
  try {
    return JSON.parse(props.content)
  } catch {
    return null
  }
})

const { album: activeAlbum, trackIndex, playing, playTrack } = useAudioPlayer()

const durations = ref<Record<number, number>>({})
const hoveredTrack = ref(-1)
const availableTracks = ref<number[]>([])
const preloadElements: HTMLAudioElement[] = []

const baseDir = computed(() => {
  const slug = albumData.value?.title.toLowerCase().replace(/\s+/g, '_') ?? ''
  return `/portfolio/audio/${slug}`
})

function isActiveTrack(i: number) {
  return activeAlbum.value?.title === albumData.value?.title && trackIndex.value === i
}

// Check which tracks have actual audio files available
watch(albumData, (a) => {
  // Cleanup previous elements
  preloadElements.forEach(el => { 
    el.src = ''
    el.removeEventListener('loadedmetadata', onMetadataLoaded)
    el.removeEventListener('error', onMetadataError)
  })
  preloadElements.length = 0
  availableTracks.value = []
  durations.value = {}
  
  if (!a) return
  
  a.tracks.forEach((track, i) => {
    const el = new Audio()
    el.preload = 'metadata'
    el.src = `${baseDir.value}/${track.file}`
    
    el.addEventListener('loadedmetadata', () => onMetadataLoaded(i, el))
    el.addEventListener('error', () => onMetadataError(i, el))
    
    preloadElements.push(el)
  })
}, { immediate: true })

function onMetadataLoaded(index: number, el: HTMLAudioElement) {
  if (isFinite(el.duration)) {
    durations.value = { ...durations.value, [index]: el.duration }
  }
  if (!availableTracks.value.includes(index)) {
    availableTracks.value = [...availableTracks.value, index]
  }
}

function onMetadataError(index: number, el: HTMLAudioElement) {
  // File doesn't exist or can't be loaded - remove from available if present
  availableTracks.value = availableTracks.value.filter(i => i !== index)
  // Clean up the failed element
  el.src = ''
}

// Filter tracks to only show those with available files
const filteredTracks = computed(() => {
  if (!albumData.value) return []
  // Sort available tracks to maintain original order
  const sortedAvailable = [...availableTracks.value].sort((a, b) => a - b)
  return albumData.value.tracks.filter((_, i) => sortedAvailable.includes(i))
})

// Check if album has any available tracks
const hasAvailableTracks = computed(() => {
  return filteredTracks.value.length > 0
})

// Get the original index for filtered tracks
function getOriginalIndex(filteredIndex: number): number {
  if (!albumData.value) return -1
  const sortedAvailable = [...availableTracks.value].sort((a, b) => a - b)
  return sortedAvailable[filteredIndex] ?? -1
}

onUnmounted(() => {
  preloadElements.forEach(el => { 
    el.src = ''
    el.removeEventListener('loadedmetadata', onMetadataLoaded)
    el.removeEventListener('error', onMetadataError)
  })
  preloadElements.length = 0
})
</script>

<template>
  <div
    v-if="albumData && hasAvailableTracks"
    :style="{
      padding: '24px 32px',
      fontFamily: FONT,
      fontSize: '13px',
      lineHeight: '21px',
      color: C.fg,
      maxWidth: '700px'
    }"
  >
    <!-- Header -->
    <div :style="{ color: C.blue, marginBottom: '4px' }">
      ╭─ <span :style="{ color: C.green, fontWeight: 700 }">{{ albumData.title }}</span> <span :style="{ color: C.comment }">─ {{ albumData.type }}, {{ albumData.year }}</span>
    </div>
    <div :style="{ color: C.blue }">
      │
    </div>

    <!-- Tracks - only show available ones -->
    <div
      v-for="(track, filteredIndex) in filteredTracks"
      :key="filteredIndex"
      :style="{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        color: isActiveTrack(getOriginalIndex(filteredIndex)) ? C.green : hoveredTrack === filteredIndex ? C.fg : C.fg,
        gap: '8px'
      }"
      @click="() => {
        const origIdx = getOriginalIndex(filteredIndex)
        if (origIdx !== -1) playTrack(albumData!, origIdx)
      }"
      @mouseenter="hoveredTrack = filteredIndex"
      @mouseleave="hoveredTrack = -1"
    >
      <span :style="{ color: C.blue }">│</span>
      <span
        data-no-scramble
        :style="{ width: '24px', textAlign: 'center', color: isActiveTrack(getOriginalIndex(filteredIndex)) && playing ? C.green : hoveredTrack === filteredIndex ? C.green : C.comment }"
      >
        {{ isActiveTrack(getOriginalIndex(filteredIndex)) && playing ? '⏸' : isActiveTrack(getOriginalIndex(filteredIndex)) && !playing ? '▶' : hoveredTrack === filteredIndex ? '▷' : '·' }}
      </span>
      <span :style="{ width: '24px', textAlign: 'right', color: C.gutter }">{{ String(filteredIndex + 1).padStart(2, '0') }}</span>
      <span
        :class="{ 'holo-text': isActiveTrack(getOriginalIndex(filteredIndex)) && playing }"
        :style="{ flex: 1, color: isActiveTrack(getOriginalIndex(filteredIndex)) ? C.green : hoveredTrack === filteredIndex ? C.green : C.fg }"
      >{{ track.title }}</span>
      <span :style="{ color: C.gutter, minWidth: '40px', textAlign: 'right' }">{{ durations[getOriginalIndex(filteredIndex)] ? formatTime(durations[getOriginalIndex(filteredIndex)]) : '' }}</span>
    </div>

    <!-- Footer -->
    <div :style="{ color: C.blue, marginTop: '4px' }">
      │
    </div>
    <div
      v-if="albumData.link"
      :style="{ color: C.blue }"
    >
      ╰─ <a
        :href="albumData.link"
        target="_blank"
        rel="noopener"
        :style="{ color: C.cyan, textDecoration: 'none', borderBottom: '1px dashed ' + C.cyan + '55' }"
      >{{ albumData.link.replace('https://', '') }}</a>
    </div>
    <div
      v-else
      :style="{ color: C.blue }"
    >
      ╰─
    </div>
  </div>
  
  <!-- Show message if album exists but has no available audio files -->
  <div
    v-else-if="albumData && !hasAvailableTracks"
    :style="{
      padding: '24px 32px',
      fontFamily: FONT,
      fontSize: '13px',
      lineHeight: '21px',
      color: C.comment,
      maxWidth: '700px'
    }"
  >
    <div :style="{ color: C.blue, marginBottom: '4px' }">
      ╭─ <span :style="{ color: C.green, fontWeight: 700 }">{{ albumData.title }}</span> <span :style="{ color: C.comment }">─ {{ albumData.type }}, {{ albumData.year }}</span>
    </div>
    <div :style="{ color: C.blue }">
      │
    </div>
    <div :style="{ color: C.comment, paddingLeft: '8px' }">
      │ {{ t('audio.noFilesAvailable') }}
    </div>
    <div :style="{ color: C.blue, marginTop: '4px' }">
      │
    </div>
    <div
      v-if="albumData.link"
      :style="{ color: C.blue }"
    >
      ╰─ <a
        :href="albumData.link"
        target="_blank"
        rel="noopener"
        :style="{ color: C.cyan, textDecoration: 'none', borderBottom: '1px dashed ' + C.cyan + '55' }"
      >{{ albumData.link.replace('https://', '') }}</a>
    </div>
    <div
      v-else
      :style="{ color: C.blue }"
    >
      ╰─
    </div>
  </div>
</template>
