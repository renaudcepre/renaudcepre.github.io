<script setup lang="ts">
import { C } from '~/utils/portfolio'

definePageMeta({ key: 'main' })

const route = useRoute()
const router = useRouter()
const { fileList, filesMap, loadContent } = usePortfolioFiles()
const { isMobile } = useBreakpoint()
const { themeName, cycle: cycleTheme } = useTheme()

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
  if (isMobile.value) showNetrw.value = false
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

// Restore sidebar quand on repasse en desktop
watch(isMobile, (val) => {
  if (!val) showNetrw.value = true
})

if (isMobile.value) showNetrw.value = false

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
      :is-mobile="isMobile"
      @tab-click="openFile($event)"
    />
    <div :style="{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }">
      <Netrw
        :active-file="activeFile"
        :visible="showNetrw"
        :file-list="fileList"
        :is-mobile="isMobile"
        @select="openFile"
        @close="showNetrw = false"
      />
      <div :style="{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }">
        <EditorPane :file="activeFile" :files-map="filesMap" />
      </div>
    </div>
    <StatusLine v-if="!isMobile" :file="activeFile" :files-map="filesMap" />
    <TmuxBar
      :is-mobile="isMobile"
      :show-netrw="showNetrw"
      :theme-name="themeName"
      @toggle-netrw="showNetrw = !showNetrw"
      @cycle-theme="cycleTheme()"
    />
  </div>
</template>
