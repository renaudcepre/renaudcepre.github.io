export function useBreakpoint(bp = 768) {
  const isMobile = ref(false)
  onMounted(() => {
    const check = () => { isMobile.value = window.innerWidth < bp }
    check()
    window.addEventListener('resize', check)
    onUnmounted(() => window.removeEventListener('resize', check))
  })
  return { isMobile }
}
