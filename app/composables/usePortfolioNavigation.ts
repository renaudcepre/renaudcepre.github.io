interface Options {
  fileList: Readonly<Ref<string[]>>
  loadContent: (name: string) => Promise<void>
  isMobile: Readonly<Ref<boolean>>
}

export function usePortfolioNavigation({ fileList, loadContent, isMobile }: Options) {
  const route = useRoute()
  const router = useRouter()

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
    router.replace('/' + name)
    if (isMobile.value) showNetrw.value = false
  }

  // Sync from URL (external navigation, shared link)
  watch(fileFromRoute, async (name) => {
    if (name === activeFile.value) return
    await openFile(name)
  })

  // Initial load once file list is available
  watch(fileList, async (list) => {
    if (!list.length) return
    const target = fileFromRoute.value
    await loadContent(list.includes(target) ? target : 'hello-world.html')
    if (!list.includes(target)) activeFile.value = 'hello-world.html'
  }, { immediate: true })

  // Restore sidebar when switching back to desktop
  watch(isMobile, (val) => {
    if (!val) showNetrw.value = true
  })

  onMounted(() => { loaded.value = true })

  return { activeFile, openTabs, showNetrw, loaded, openFile }
}
