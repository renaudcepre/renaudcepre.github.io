export function usePortfolioFiles() {
  const { data, error: fetchError } = useAsyncData('portfolio-files', () =>
    queryCollection('portfolio').order('order', 'ASC').all()
  )

  if (import.meta.dev) {
    watch(fetchError, (err) => {
      if (err) console.error('[usePortfolioFiles] Failed to load portfolio collection:', err)
    })
  }

  const fileList = computed(() => data.value?.map(f => f.filename) ?? [])

  const fileContents = ref<Record<string, string>>({})

  const filesMap = computed(() => {
    const map: Record<string, { lang: string, content: string }> = {}
    for (const f of data.value ?? []) {
      map[f.filename] = { lang: f.lang, content: fileContents.value[f.filename] ?? '' }
    }
    return map
  })

  async function loadContent(filename: string) {
    if (fileContents.value[filename]) return
    const entry = data.value?.find(f => f.filename === filename)
    if (!entry) return
    if (entry.lang === 'img' || entry.lang === 'video') {
      fileContents.value = { ...fileContents.value, [filename]: entry.path }
      return
    }
    try {
      const content = await $fetch<string>(entry.path, { responseType: 'text' })
      fileContents.value = { ...fileContents.value, [filename]: content }
    } catch (err) {
      console.error(`[usePortfolioFiles] Failed to load content for "${filename}":`, err)
    }
  }

  return { fileList, filesMap, loadContent }
}
