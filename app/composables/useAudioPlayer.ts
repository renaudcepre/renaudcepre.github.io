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

interface PlayerState {
  album: Album | null
  trackIndex: number
  playing: boolean
  currentTime: number
  duration: number
}

let audio: HTMLAudioElement | null = null

export function useAudioPlayer() {
  const state = useState<PlayerState>('audio-player', () => ({
    album: null,
    trackIndex: -1,
    playing: false,
    currentTime: 0,
    duration: 0,
  }))

  function getAudio() {
    if (import.meta.server) return null
    if (!audio) {
      audio = new Audio()
      audio.addEventListener('timeupdate', () => {
        state.value.currentTime = audio!.currentTime
        if (isFinite(audio!.duration)) state.value.duration = audio!.duration
      })
      audio.addEventListener('ended', () => {
        // Auto next
        if (state.value.album && state.value.trackIndex < state.value.album.tracks.length - 1) {
          playTrack(state.value.album, state.value.trackIndex + 1)
        } else {
          state.value.playing = false
        }
      })
    }
    return audio
  }

  function baseDir(album: Album) {
    const slug = album.title.toLowerCase().replace(/\s+/g, '_')
    return `/portfolio/audio/${slug}`
  }

  function playTrack(album: Album, index: number) {
    const a = getAudio()
    if (!a) return

    // Toggle pause if same track
    if (state.value.album?.title === album.title && state.value.trackIndex === index && state.value.playing) {
      a.pause()
      state.value.playing = false
      return
    }

    // Resume if same track paused
    if (state.value.album?.title === album.title && state.value.trackIndex === index && !state.value.playing) {
      a.play()
      state.value.playing = true
      return
    }

    state.value.album = album
    state.value.trackIndex = index
    state.value.currentTime = 0
    state.value.duration = 0
    a.src = `${baseDir(album)}/${album.tracks[index].file}`
    a.play()
    state.value.playing = true
  }

  function togglePlay() {
    const a = getAudio()
    if (!a || !state.value.album) return
    if (state.value.playing) {
      a.pause()
    } else {
      a.play()
    }
    state.value.playing = !state.value.playing
  }

  function seek(ratio: number) {
    const a = getAudio()
    if (!a || !state.value.duration) return
    a.currentTime = ratio * state.value.duration
  }

  function skipNext() {
    if (!state.value.album) return
    const next = state.value.trackIndex + 1
    if (next < state.value.album.tracks.length) {
      playTrack(state.value.album, next)
    }
  }

  function skipPrev() {
    if (!state.value.album) return
    const a = getAudio()
    // If more than 3s in, restart track
    if (a && a.currentTime > 3) {
      a.currentTime = 0
      return
    }
    const prev = state.value.trackIndex - 1
    if (prev >= 0) {
      playTrack(state.value.album, prev)
    }
  }

  return { state, playTrack, togglePlay, seek, skipNext, skipPrev }
}
