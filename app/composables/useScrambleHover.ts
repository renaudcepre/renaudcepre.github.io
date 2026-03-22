import { isScrambleProtected } from '~/utils/scramble'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*<>/'
const RADIUS_X = 120
const RADIUS_Y = 20

export function useScrambleHover() {
  if (import.meta.server) return

  const active = new Map<Text, { original: string, scrambled: boolean[], timer: ReturnType<typeof setInterval> | null }>()

  function restoreNode(node: Text, entry: { original: string, scrambled: boolean[], timer: ReturnType<typeof setInterval> | null }) {
    if (entry.timer) clearInterval(entry.timer)

    const locked = new Array(entry.original.length).fill(false)
    const toRestore = entry.scrambled
      .map((s, i) => (s ? i : -1))
      .filter(i => i >= 0)
      .sort(() => Math.random() - 0.5)

    let step = 0
    const total = 5
    const perStep = Math.ceil(toRestore.length / total)

    entry.timer = setInterval(() => {
      step++
      for (let i = 0; i < perStep && (step - 1) * perStep + i < toRestore.length; i++) {
        locked[toRestore[(step - 1) * perStep + i]] = true
      }

      node.textContent = entry.original
        .split('')
        .map((ch, idx) => {
          if (ch.trim() === '' || locked[idx] || !entry.scrambled[idx]) return ch
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')

      if (step >= total) {
        clearInterval(entry.timer!)
        node.textContent = entry.original
        active.delete(node)
      }
    }, 40)
  }

  function processNode(node: Text, mx: number, my: number) {
    if (isScrambleProtected(node)) return
    const text = active.has(node) ? active.get(node)!.original : node.textContent || ''
    if (!text.trim()) return

    const range = document.createRange()
    const scrambled = new Array(text.length).fill(false)
    let anyHit = false

    for (let i = 0; i < text.length; i++) {
      if (text[i].trim() === '') continue
      range.setStart(node, i)
      range.setEnd(node, i + 1)
      const rect = range.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (mx - cx) / RADIUS_X
      const dy = (my - cy) / RADIUS_Y
      if (dx * dx + dy * dy < 1) {
        scrambled[i] = true
        anyHit = true
      }
    }

    if (!anyHit) return

    const entry = active.get(node)
    if (entry) {
      if (entry.timer) clearInterval(entry.timer)
      // Merge new scrambled chars with existing
      for (let i = 0; i < scrambled.length; i++) {
        if (scrambled[i]) entry.scrambled[i] = true
      }
    } else {
      active.set(node, { original: text, scrambled, timer: null })
    }

    const current = active.get(node)!
    node.textContent = current.original
      .split('')
      .map((ch, idx) => {
        if (ch.trim() === '' || !current.scrambled[idx]) return ch
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      })
      .join('')

    // Schedule restore
    current.timer = setTimeout(() => {
      restoreNode(node, current)
    }, 100) as unknown as ReturnType<typeof setInterval>
  }

  function getTextNodes(el: Element): Text[] {
    const nodes: Text[] = []
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
    let node
    while ((node = walker.nextNode())) {
      if (node.textContent?.trim()) nodes.push(node as Text)
    }
    return nodes
  }

  function findLineAncestor(el: Element): Element {
    let current = el
    while (current.parentElement) {
      const display = getComputedStyle(current).display
      if (display === 'block' || display === 'flex' || display === 'list-item') return current
      current = current.parentElement
    }
    return current
  }

  let lastTime = 0
  function onMouseMove(e: MouseEvent) {
    const now = Date.now()
    if (now - lastTime < 50) return
    lastTime = now

    const el = document.elementFromPoint(e.clientX, e.clientY)
    if (!el || el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable) return

    const line = findLineAncestor(el)
    const textNodes = getTextNodes(line)
    textNodes.forEach(node => processNode(node, e.clientX, e.clientY))
  }

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    document.addEventListener('mousemove', onMouseMove, { passive: true })
  })

  onUnmounted(() => {
    document.removeEventListener('mousemove', onMouseMove)
    active.forEach((entry, node) => {
      if (entry.timer) clearInterval(entry.timer)
      node.textContent = entry.original
    })
  })
}
