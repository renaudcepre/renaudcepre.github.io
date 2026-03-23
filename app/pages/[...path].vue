<script setup lang="ts">
import { C } from '~/utils/portfolio'

definePageMeta({ key: 'main' })

const { fileList, filesMap, loadContent } = usePortfolioFiles()
const { isMobile } = useBreakpoint()
const { themeName, cycle: cycleTheme } = useTheme()
const { togglePlay: audioToggle, album: audioAlbum } = useAudioPlayer()
const { activeFile, openTabs, showNetrw, loaded, openFile } = usePortfolioNavigation({ fileList, loadContent, isMobile })
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
