import type { Track, Album } from '~/types/audio'

const album = ref<Album | null>(null)
const trackIndex = ref(-1)
const playing = ref(false)
const currentTime = ref(0)
const duration = ref(0)

let audio: HTMLAudioElement | null = null

function getAudio() {
  if (import.meta.server) return null
  if (!audio) {
    audio = new Audio()
    audio.addEventListener('timeupdate', () => {
      currentTime.value = audio!.currentTime
      if (isFinite(audio!.duration)) duration.value = audio!.duration
    })
    audio.addEventListener('ended', () => {
      if (album.value && trackIndex.value < album.value.tracks.length - 1) {
        _playTrack(album.value, trackIndex.value + 1)
      } else {
        playing.value = false
      }
    })
  }
  return audio
}

function baseDir(a: Album) {
  const slug = a.title.toLowerCase().replace(/\s+/g, '_')
  return `/portfolio/audio/${slug}`
}

function _playTrack(a: Album, index: number) {
  const el = getAudio()
  if (!el) return

  // Toggle pause if same track
  if (album.value?.title === a.title && trackIndex.value === index && playing.value) {
    el.pause()
    playing.value = false
    return
  }

  // Resume if same track paused
  if (album.value?.title === a.title && trackIndex.value === index && !playing.value) {
    el.play()
    playing.value = true
    return
  }

  album.value = a
  trackIndex.value = index
  currentTime.value = 0
  duration.value = 0
  el.src = `${baseDir(a)}/${a.tracks[index].file}`
  el.play()
  playing.value = true
}

export function useAudioPlayer() {
  function playTrack(a: Album, index: number) {
    _playTrack(a, index)
  }

  function togglePlay() {
    const el = getAudio()
    if (!el || !album.value) return
    if (playing.value) {
      el.pause()
    } else {
      el.play()
    }
    playing.value = !playing.value
  }

  function seek(ratio: number) {
    const el = getAudio()
    if (!el || !duration.value) return
    el.currentTime = ratio * duration.value
  }

  function skipNext() {
    if (!album.value) return
    const next = trackIndex.value + 1
    if (next < album.value.tracks.length) {
      _playTrack(album.value, next)
    }
  }

  function skipPrev() {
    if (!album.value) return
    const el = getAudio()
    if (el && el.currentTime > 3) {
      el.currentTime = 0
      return
    }
    const prev = trackIndex.value - 1
    if (prev >= 0) {
      _playTrack(album.value, prev)
    }
  }

  function getAudioElement(): HTMLAudioElement | null {
    return audio
  }

  return {
    album: readonly(album),
    trackIndex: readonly(trackIndex),
    playing: readonly(playing),
    currentTime: readonly(currentTime),
    duration: readonly(duration),
    playTrack,
    togglePlay,
    seek,
    skipNext,
    skipPrev,
    getAudioElement
  }
}
