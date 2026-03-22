<script setup lang="ts">
const BLOCKS = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█']

const props = withDefaults(defineProps<{
  bands: number[]
  color?: string
  opacity?: number
}>(), {
  color: '#98c379',
  opacity: 0.07,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const width = ref(0)
const height = ref(0)

let observer: ResizeObserver | null = null

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  observer = new ResizeObserver((entries) => {
    const entry = entries[0]
    if (!entry) return
    width.value = entry.contentRect.width
    height.value = entry.contentRect.height
  })
  observer.observe(canvas.parentElement!)
})

onUnmounted(() => {
  observer?.disconnect()
})

watch([() => props.bands, width, height], () => {
  draw()
})

function draw() {
  const canvas = canvasRef.value
  if (!canvas || !width.value || !height.value) return

  const dpr = window.devicePixelRatio || 1
  const w = width.value
  const h = height.value

  canvas.width = w * dpr
  canvas.height = h * dpr
  canvas.style.width = `${w}px`
  canvas.style.height = `${h}px`

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, w, h)

  const lineHeight = 21
  const fontSize = 13
  const maxRows = Math.floor((h / 3) / lineHeight)
  const bandCount = props.bands.length

  // Spread columns evenly across the full width
  const colWidth = w / bandCount
  const offsetX = colWidth / 2 // center first char in its column

  ctx.font = `${fontSize}px "JetBrains Mono", monospace`
  ctx.fillStyle = props.color
  ctx.textBaseline = 'bottom'

  for (let i = 0; i < bandCount; i++) {
    const val = props.bands[i] || 0
    const totalHeight = val * maxRows // in character units
    const fullBlocks = Math.floor(totalHeight)
    const partial = totalHeight - fullBlocks
    const x = offsetX + i * colWidth - fontSize * 0.3

    // Draw full blocks from bottom up
    for (let row = 0; row < fullBlocks && row < maxRows; row++) {
      const y = h - row * lineHeight
      ctx.fillText('█', x, y)
    }

    // Draw partial block at the top
    if (partial > 0 && fullBlocks < maxRows) {
      const blockIndex = Math.min(Math.round(partial * (BLOCKS.length - 1)), BLOCKS.length - 1)
      if (blockIndex > 0) {
        const y = h - fullBlocks * lineHeight
        ctx.fillText(BLOCKS[blockIndex], x, y)
      }
    }
  }
}
</script>

<template>
  <canvas
    ref="canvasRef"
    :style="{
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      opacity: props.opacity,
      width: '100%',
      height: '100%',
    }"
  />
</template>
