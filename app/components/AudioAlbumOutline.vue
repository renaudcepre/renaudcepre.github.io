<script setup lang="ts">
import { C, FONT } from '~/utils/portfolio'
import type { Album } from '~/types/audio'

// Server-rendered stand-in for AudioPlayer, which can only run in the browser
// (it probes each track with `new Audio()`). Without this the album pages ship
// an empty document: no heading, no track list, nothing to index.
const props = defineProps<{
  content: string
}>()

const album = computed<Album | null>(() => {
  try {
    return JSON.parse(props.content)
  } catch {
    return null
  }
})
</script>

<template>
  <div
    v-if="album"
    :style="{
      padding: '24px 32px',
      fontFamily: FONT,
      fontSize: '13px',
      lineHeight: '21px',
      color: C.fg,
      maxWidth: '700px'
    }"
  >
    <div :style="{ color: C.blue, marginBottom: '4px' }">
      <span aria-hidden="true">╭─</span> <h1 :style="{ display: 'inline', fontSize: 'inherit', color: C.green, fontWeight: 700 }">{{ album.title }}</h1> <span :style="{ color: C.comment }">─ {{ album.type }}, {{ album.year }}</span>
    </div>
    <div aria-hidden="true" :style="{ color: C.blue }">
      │
    </div>
    <div
      v-for="(track, i) in album.tracks"
      :key="track.file"
      :style="{ display: 'flex', alignItems: 'center', gap: '8px' }"
    >
      <span aria-hidden="true" :style="{ color: C.blue }">│</span>
      <span aria-hidden="true" :style="{ width: '24px', textAlign: 'center', color: C.comment }">·</span>
      <span :style="{ width: '24px', textAlign: 'right', color: C.gutter }">{{ String(i + 1).padStart(2, '0') }}</span>
      <span :style="{ flex: 1 }">{{ track.title }}</span>
    </div>
    <div aria-hidden="true" :style="{ color: C.blue, marginTop: '4px' }">
      │
    </div>
    <div :style="{ color: C.blue }">
      <span aria-hidden="true">╰─</span><template v-if="album.link"> <a
        :href="album.link"
        target="_blank"
        rel="noopener"
        :style="{ color: C.cyan, textDecoration: 'none', borderBottom: '1px dashed ' + C.cyan + '55' }"
      >{{ album.link.replace('https://', '') }}</a></template>
    </div>
  </div>
</template>
