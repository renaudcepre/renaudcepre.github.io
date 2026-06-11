interface Options {
  fileList: Readonly<Ref<string[]>>
  loadContent: (name: string) => Promise<void>
  isMobile: Readonly<Ref<boolean>>
}

export function usePortfolioNavigation({ fileList, loadContent, isMobile }: Options) {
  const route = useRoute()
  const router = useRouter()
  const localePath = useLocalePath()

  const fileFromRoute = computed(() => {
    const segments = route.params.path
    if (!segments || (Array.isArray(segments) && segments.length === 0)) return 'hello-world.html'
    return Array.isArray(segments) ? segments.join('/') : segments
  })

  const activeFile = ref(fileFromRoute.value)
  const openTabs = ref([fileFromRoute.value])
  const showNetrw = ref(!isMobile.value)
  const loaded = ref(false)

  async function openFile(name: string) {
    activeFile.value = name
    if (!openTabs.value.includes(name)) {
      openTabs.value = [...openTabs.value, name]
    }
    await loadContent(name)
    router.replace(localePath('/' + name))
    if (isMobile.value) showNetrw.value = false
  }

  // Sync from URL (external navigation, shared link, locale switch)
  watch(fileFromRoute, async (name) => {
    if (name === activeFile.value) return
    await openFile(name)
  })

  // Reload current file when locale changes (paths differ between locales)
  // and fall back to hello-world.html if it doesn't exist in the new locale.
  watch(fileList, async (list) => {
    if (!list.length) return
    const target = activeFile.value
    if (list.includes(target)) {
      await loadContent(target)
    } else {
      activeFile.value = 'hello-world.html'
      openTabs.value = openTabs.value.map(t => list.includes(t) ? t : 'hello-world.html')
      await loadContent('hello-world.html')
      router.replace(localePath('/hello-world.html'))
    }
  }, { immediate: true })

  // Restore sidebar when switching back to desktop
  watch(isMobile, (val) => {
    if (!val) showNetrw.value = true
  })

  onMounted(() => { loaded.value = true })

  return { activeFile, openTabs, showNetrw, loaded, openFile }
}
