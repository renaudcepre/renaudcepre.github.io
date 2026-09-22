export function useKeyboardShortcuts(shortcuts: Record<string, () => void>) {
  onMounted(() => {
    const handler = (e: KeyboardEvent) => {
      // Buttons now exist (a11y pass): Space must not also fire a shortcut
      // while it activates the focused control.
      const target = e.target as HTMLElement
      if (target?.closest?.('input, textarea, button, a, select, [contenteditable]')) return

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
