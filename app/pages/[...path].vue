<script setup lang="ts">
import { C } from '~/utils/portfolio'

definePageMeta({ key: 'main' })

const { t, locale, locales } = useI18n()
const route = useRoute()
const { public: { siteUrl } } = useRuntimeConfig()

const { fileList, filesMap, loadContent, filesReady } = usePortfolioFiles()
const { isMobile } = useBreakpoint()
const { themeName, cycle: cycleTheme } = useTheme()
const { togglePlay: audioToggle, album: audioAlbum } = useAudioPlayer()
const { activeFile, openTabs, showNetrw, loaded, openFile } = usePortfolioNavigation({ fileList, loadContent, isMobile, filesReady })

const activeMeta = computed(() => filesMap.value[activeFile.value])
const pageTitle = computed(() => activeMeta.value?.title ? `${activeMeta.value.title} · ${t('meta.title')}` : t('meta.title'))
const pageDescription = computed(() => activeMeta.value?.description || t('meta.description'))
const ogImage = `${siteUrl}/og.png`

// Built from the active file rather than route.path: /en and /en/hello-world.html
// serve the same page, and only the second one should be the canonical.
const canonicalUrl = computed(() => `${siteUrl}/${locale.value}/${activeFile.value}`)
const isHiddenFile = computed(() => isHiddenFilename(activeFile.value))

const alternates = computed(() => {
  const codes = locales.value.map(l => typeof l === 'string' ? l : l.code)
  return [...codes, 'x-default'].map(code => ({
    rel: 'alternate',
    hreflang: code,
    href: `${siteUrl}/${code === 'x-default' ? 'en' : code}/${activeFile.value}`
  }))
})

useHead({
  htmlAttrs: { lang: () => locale.value },
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    { name: 'robots', content: () => isHiddenFile.value ? 'noindex, follow' : 'index, follow' },
    { property: 'og:site_name', content: () => t('meta.title') },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:type', content: () => activeMeta.value?.title ? 'article' : 'website' },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:locale', content: () => locale.value === 'fr' ? 'fr_FR' : 'en_US' },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: () => t('meta.ogImageAlt') },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: () => [{ rel: 'canonical', href: canonicalUrl.value }, ...alternates.value]
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
