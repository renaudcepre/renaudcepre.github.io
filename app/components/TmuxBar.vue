<script setup lang="ts">
import { C, FONT } from '~/utils/portfolio'

defineProps<{
  isMobile: boolean
  showNetrw?: boolean
  themeName?: string
}>()

const emit = defineEmits<{
  toggleNetrw: []
  cycleTheme: []
}>()

const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const { quote } = useQuote()
const currentTime = ref('')

onMounted(() => {
  const update = () => {
    currentTime.value = new Date().toLocaleTimeString(locale.value, { hour: '2-digit', minute: '2-digit' })
  }
  update()
  const interval = setInterval(update, 60_000)
  onUnmounted(() => clearInterval(interval))
})
</script>

<template>
  <div
    :style="{
      height: isMobile ? '32px' : '19px',
      background: C.green,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0',
      fontFamily: FONT,
      fontSize: '11px',
      flexShrink: 0,
      color: C.bg
    }"
  >
    <div :style="{ display: 'flex', alignItems: 'center', height: '100%' }">
      <button
        v-if="isMobile"
        type="button"
        :aria-label="$t('a11y.toggleExplorer')"
        :aria-expanded="!!showNetrw"
        :style="{
          border: 'none',
          font: 'inherit',
          background: C.statusBg,
          color: C.green,
          padding: '0 12px',
          fontWeight: 700,
          fontSize: '18px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer'
        }"
        @click="emit('toggleNetrw')"
      >≡</button>
      <a
        href="https://github.com/renaudcepre"
        target="_blank"
        rel="noopener"
        :style="{
          padding: '0 8px',
          color: C.bg,
          textDecoration: 'none'
        }"
      >github.com/renaudcepre</a>
    </div>
    <span
      v-if="!isMobile"
      aria-hidden="true"
      :style="{
        color: C.bg,
        fontStyle: 'italic',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        flex: 1,
        textAlign: 'center',
        padding: '0 12px'
      }"
    >{{ quote }}</span>
    <div :style="{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px' }">
      <NuxtLink
        :to="switchLocalePath(locale === 'en' ? 'fr' : 'en')"
        :aria-label="$t('a11y.switchLanguage')"
        :style="{ cursor: 'pointer', color: C.bg, textDecoration: 'none', fontWeight: 700 }"
      >{{ locale === 'en' ? 'FR' : 'EN' }}</NuxtLink>
      <button
        type="button"
        :aria-label="$t('a11y.cycleTheme', { theme: themeName })"
        :style="{
          border: 'none',
          font: 'inherit',
          background: 'transparent',
          color: C.bg,
          padding: 0,
          cursor: 'pointer'
        }"
        :title="$t('tmux.themePrefix') + themeName + ' ' + $t('tmux.shortcut')"
        @click="emit('cycleTheme')"
      >{{ themeName }}</button>
      <span aria-hidden="true">
        <ClientOnly>{{ currentTime }}</ClientOnly>
      </span>
    </div>
  </div>
</template>
