const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*<>/'
const TOTAL_STEPS = 8
const STEP_MS = 30

export function useScrambleReveal() {
  let running = false

  function reveal(container: HTMLElement | null) {
    if (!container || running) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    running = true

    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT)
    const nodes: { node: Text, original: string }[] = []
    let node
    while ((node = walker.nextNode())) {
      if (node.textContent?.trim()) {
        nodes.push({ node: node as Text, original: node.textContent! })
      }
    }

    if (!nodes.length) {
      running = false
      return
    }

    // Each character gets a random step to lock in
    const lockSteps = nodes.map(({ original }) =>
      Array.from({ length: original.length }, () =>
        Math.floor(Math.random() * TOTAL_STEPS * 0.5) + Math.floor(TOTAL_STEPS * 0.3),
      ),
    )

    let step = 0
    const interval = setInterval(() => {
      step++

      for (let n = 0; n < nodes.length; n++) {
        const { node, original } = nodes[n]
        const locks = lockSteps[n]

        node.textContent = original
          .split('')
          .map((ch, i) => {
            if (ch.trim() === '') return ch
            if (step >= locks[i]) return ch
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      }

      if (step >= TOTAL_STEPS) {
        clearInterval(interval)
        // Ensure everything is restored
        for (const { node, original } of nodes) {
          node.textContent = original
        }
        running = false
      }
    }, STEP_MS)
  }

  return { reveal }
}
