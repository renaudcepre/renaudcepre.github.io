<script setup lang="ts">
import { tokPy, tokMd, tokAnsi, tokTxt } from '~/utils/portfolio'
import type { Token } from '~/utils/portfolio'

const tokenizers: Record<string, (line: string) => Token[]> = {
  py: tokPy,
  md: tokMd,
  ansi: tokAnsi,
  txt: tokTxt
}

const props = defineProps<{
  line: string
  lang: string
}>()

const tokens = computed<Token[]>(() => {
  const fn = tokenizers[props.lang] ?? tokTxt
  return fn(props.line)
})
</script>

<template>
  <span
    v-for="(tok, i) in tokens"
    :key="i"
    :style="{
      color: tok.c,
      background: tok.bg,
      fontWeight: tok.b ? 700 : 400,
      fontStyle: tok.i ? 'italic' : 'normal',
    }"
  >{{ tok.t }}</span>
</template>
