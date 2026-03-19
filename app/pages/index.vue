<script setup lang="ts">
import { C } from '~/utils/portfolio'

const activeFile = ref('README.md')
const openTabs = ref(['README.md'])
const showNetrw = ref(true)
const loaded = ref(false)

function openFile(name: string) {
  activeFile.value = name
  if (!openTabs.value.includes(name)) {
    openTabs.value = [...openTabs.value, name]
  }
}

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
      @tab-click="activeFile = $event"
    />
    <div :style="{ display: 'flex', flex: 1, overflow: 'hidden' }">
      <Netrw
        :active-file="activeFile"
        :visible="showNetrw"
        @select="openFile"
      />
      <div :style="{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }">
        <EditorPane :file="activeFile" />
      </div>
    </div>
    <StatusLine :file="activeFile" />
    <TmuxBar />
  </div>
</template>
