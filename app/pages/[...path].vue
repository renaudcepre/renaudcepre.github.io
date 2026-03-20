<script setup lang="ts">
import { C } from '~/utils/portfolio'

definePageMeta({ key: 'main' })

const route = useRoute()
const router = useRouter()
const { fileList, filesMap, loadContent } = usePortfolioFiles()

const fileFromRoute = computed(() => {
  const segments = route.params.path
  if (!segments || (Array.isArray(segments) && segments.length === 0)) return 'README.md'
  return Array.isArray(segments) ? segments.join('/') : segments
})

const activeFile = ref(fileFromRoute.value)
const openTabs = ref([fileFromRoute.value])
const showNetrw = ref(true)
const loaded = ref(false)

async function openFile(name: string) {
  activeFile.value = name
  if (!openTabs.value.includes(name)) {
    openTabs.value = [...openTabs.value, name]
  }
  await loadContent(name)
  router.replace('/' + name)
}

// Sync depuis l'URL (navigation externe, lien partagé)
watch(fileFromRoute, async (name) => {
  if (name === activeFile.value) return
  await openFile(name)
})

// Chargement initial une fois la liste disponible
watch(fileList, async (list) => {
  if (!list.length) return
  const target = fileFromRoute.value
  await loadContent(list.includes(target) ? target : 'README.md')
  if (!list.includes(target)) activeFile.value = 'README.md'
}, { immediate: true })

onMounted(() => {
  loaded.value = true

  const handler = (e: KeyboardEvent) => {
    if (e.key === 'e' && e.ctrlKey) {
      e.preventDefault()
      showNetrw.value = !showNetrw.value
    }
  }

  window.addEventListener('keydown', handler)

  onUnmounted(() => {
    window.removeEventListener('keydown', handler)
  })
})
</script>

<template>
  <div
    :style="{
      width: '100%',
      height: '100vh',
      background: C.bg,
      color: C.fg,
      display: 'flex',
      flexDirection: 'column',
      opacity: loaded ? 1 : 0,
      transition: 'opacity 0.3s',
      overflow: 'hidden',
    }"
  >
    <VimTabs
      :open-tabs="openTabs"
      :active-file="activeFile"
      @tab-click="openFile($event)"
    />
    <div :style="{ display: 'flex', flex: 1, overflow: 'hidden' }">
      <Netrw
        :active-file="activeFile"
        :visible="showNetrw"
        :file-list="fileList"
        @select="openFile"
      />
      <div :style="{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }">
        <EditorPane :file="activeFile" :files-map="filesMap" />
      </div>
    </div>
    <StatusLine :file="activeFile" :files-map="filesMap" />
    <TmuxBar />
  </div>
</template>
