export function useKeyboardShortcuts(shortcuts: Record<string, () => void>) {
  onMounted(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      const parts: string[] = []
      if (e.ctrlKey) parts.push('Ctrl')
      if (e.altKey) parts.push('Alt')
      if (e.shiftKey) parts.push('Shift')
      parts.push(e.code)
      const key = parts.join('+')

      const fn = shortcuts[key]
      if (fn) {
        e.preventDefault()
        fn()
      }
    }

    window.addEventListener('keydown', handler)
    onUnmounted(() => window.removeEventListener('keydown', handler))
  })
}
