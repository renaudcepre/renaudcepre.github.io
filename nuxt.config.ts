export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/fonts'
  ],

  ssr: false,

  devtools: {
    enabled: true
  },

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'Renaud — Senior Python Developer',
      meta: [
        { name: 'description', content: 'Portfolio — Neovim style' },
        { name: 'theme-color', content: '#0e1019' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-03-19',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
