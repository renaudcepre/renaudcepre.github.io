export function useBreakpoint(bp = 768) {
  const isMobile = ref(window.innerWidth < bp)
  const check = () => {
    isMobile.value = window.innerWidth < bp
  }
  window.addEventListener('resize', check)
  onUnmounted(() => window.removeEventListener('resize', check))
  return { isMobile }
}
