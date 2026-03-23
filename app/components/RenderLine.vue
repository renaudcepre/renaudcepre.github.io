<script setup lang="ts">
import { tokPy, tokMd, tokHtml, tokJson, tokAnsi, tokTxt } from '~/utils/portfolio'
import type { Token } from '~/utils/portfolio'

const tokenizers: Record<string, (line: string) => Token[]> = {
  py: tokPy,
  md: tokMd,
  html: tokHtml,
  audio: tokJson,
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

const router = useRouter()

function handleLinkClick(e: MouseEvent, href: string) {
  e.preventDefault()
  if (href.startsWith('http') || href.startsWith('mailto:')) {
    window.open(href, '_blank')
  } else {
    router.push('/' + href)
  }
}
</script>

<template>
  <template
    v-for="(tok, i) in tokens"
    :key="i"
  >
    <a
      v-if="tok.href"
      :href="tok.href"
      :style="{
        color: tok.c,
        fontWeight: tok.b ? 700 : 400,
        fontStyle: tok.i ? 'italic' : 'normal',
        textDecoration: 'underline',
        cursor: 'pointer'
      }"
      @click="handleLinkClick($event, tok.href)"
    >{{ tok.t }}</a>
    <span
      v-else
      :style="{
        color: tok.c,
        background: tok.bg,
        fontWeight: tok.b ? 700 : 400,
        fontStyle: tok.i ? 'italic' : 'normal'
      }"
    >{{ tok.t }}</span>
  </template>
</template>
