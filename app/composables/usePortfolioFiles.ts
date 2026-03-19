export function usePortfolioFiles() {
  const { data } = useAsyncData('portfolio-files', () =>
    queryCollection('portfolio').order('order', 'ASC').all()
  )

  const fileList = computed(() => data.value?.map(f => f.filename) ?? [])

  const filesMap = computed(() => {
    const map: Record<string, { lang: string, content: string }> = {}
    for (const f of data.value ?? []) {
      map[f.filename] = { lang: f.lang, content: f.content }
    }
    return map
  })

  return { fileList, filesMap }
}
