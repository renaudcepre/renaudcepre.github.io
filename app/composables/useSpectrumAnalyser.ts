// Module-level — tracks which audio elements are already connected to the
// AudioContext to avoid creating duplicate MediaElementSourceNodes.
const connectedElements = new WeakSet<HTMLAudioElement>()

export function useSpectrumAnalyser() {
  if (import.meta.server) {
    return {
      bands: readonly(ref<number[]>([])),
      connect: (_el: HTMLAudioElement, _playing: Ref<boolean>) => {}
    }
  }

  const bands = ref<number[]>(new Array(32).fill(0))

  let audioCtx: AudioContext | null = null
  let analyser: AnalyserNode | null = null
  let rafId = 0

  function connect(el: HTMLAudioElement, playing: Ref<boolean>) {
    if (!audioCtx) {
      audioCtx = new AudioContext()
      analyser = audioCtx.createAnalyser()
      analyser.fftSize = 256
      analyser.smoothingTimeConstant = 0.8
      analyser.connect(audioCtx.destination)
    }

    if (!connectedElements.has(el)) {
      const source = audioCtx.createMediaElementSource(el)
      source.connect(analyser!)
      connectedElements.add(el)
    }

    audioCtx.resume()

    const dataArray = new Uint8Array(analyser!.frequencyBinCount)

    function loop() {
      if (!playing.value) {
        bands.value = new Array(32).fill(0)
        return
      }

      analyser!.getByteFrequencyData(dataArray)

      const binCount = dataArray.length // 128
      const bandCount = 32
      const result = new Array(bandCount)

      // Logarithmic grouping: map 128 bins to 32 bands
      for (let i = 0; i < bandCount; i++) {
        const lowBin = Math.round(Math.pow(binCount, i / bandCount))
        const highBin = Math.round(Math.pow(binCount, (i + 1) / bandCount))
        const lo = Math.max(0, lowBin)
        const hi = Math.max(lo + 1, Math.min(highBin, binCount))
        let sum = 0
        for (let j = lo; j < hi; j++) {
          sum += dataArray[j]
        }
        result[i] = (sum / (hi - lo)) / 255
      }

      bands.value = result
      rafId = requestAnimationFrame(loop)
    }

    watch(playing, (val) => {
      if (val) {
        audioCtx?.resume()
        cancelAnimationFrame(rafId)
        rafId = requestAnimationFrame(loop)
      }
    }, { immediate: true })
  }

  return {
    bands: readonly(bands),
    connect
  }
}
