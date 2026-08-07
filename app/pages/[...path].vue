<script setup lang="ts">
import { C } from '~/utils/portfolio'

definePageMeta({ key: 'main' })

const { t, locale } = useI18n()
const route = useRoute()
const { public: { siteUrl } } = useRuntimeConfig()

const { fileList, filesMap, loadContent, filesReady } = usePortfolioFiles()
const { isMobile } = useBreakpoint()
const { themeName, cycle: cycleTheme } = useTheme()
const { togglePlay: audioToggle, album: audioAlbum } = useAudioPlayer()
const { activeFile, openTabs, showNetrw, loaded, openFile } = usePortfolioNavigation({ fileList, loadContent, isMobile, filesReady })

const activeMeta = computed(() => filesMap.value[activeFile.value])
const pageTitle = computed(() => activeMeta.value?.title ? `${activeMeta.value.title} · ${t('meta.title')}` : t('meta.title'))
const pageDescription = computed(() => activeMeta.value?.description ?? t('meta.description'))
const canonicalUrl = computed(() => `${siteUrl}${route.path}`)

useHead({
  htmlAttrs: { lang: () => locale.value },
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:type', content: () => activeMeta.value?.title ? 'article' : 'website' },
    { property: 'og:url', content: canonicalUrl },
    { name: 'twitter:card', content: 'summary' }
  ],
  link: [{ rel: 'canonical', href: canonicalUrl }]
})
useScrambleHover()

useKeyboardShortcuts({
  'Space': () => { if (audioAlbum.value) audioToggle() },
  'Ctrl+KeyE': () => { showNetrw.value = !showNetrw.value }
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
      overflow: 'hidden'
    }"
  >
    <VimTabs
      :open-tabs="openTabs"
      :active-file="activeFile"
      :is-mobile="isMobile"
      @tab-click="openFile($event)"
    />
    <div :style="{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }">
      <NetrwExplorer
        :active-file="activeFile"
        :visible="showNetrw"
        :file-list="fileList"
        :open-tabs="openTabs"
        :is-mobile="isMobile"
        @select="openFile"
        @close="showNetrw = false"
      />

      <div :style="{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }">
        <EditorPane
          :file="activeFile"
          :files-map="filesMap"
        />
      </div>
    </div>
    <PlayerBar />
    <StatusLine
      v-if="!isMobile"
      :file="activeFile"
      :files-map="filesMap"
    />
    <TmuxBar
      :is-mobile="isMobile"
      :show-netrw="showNetrw"
      :theme-name="themeName"
      @toggle-netrw="showNetrw = !showNetrw"
      @cycle-theme="cycleTheme()"
    />
  </div>
</template>
