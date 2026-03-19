<script setup lang="ts">
import { tokPy, tokMd } from '~/utils/portfolio'
import type { Token } from '~/utils/portfolio'

const props = defineProps<{
  line: string
  lang: 'py' | 'md'
}>()

const tokens = computed<Token[]>(() => {
  return props.lang === 'py' ? tokPy(props.line) : tokMd(props.line)
})
</script>

<template>
  <span
    v-for="(tok, i) in tokens"
    :key="i"
    :style="{
      color: tok.c,
      fontWeight: tok.b ? 700 : 400,
      fontStyle: tok.i ? 'italic' : 'normal',
    }"
  >{{ tok.t }}</span>
</template>
