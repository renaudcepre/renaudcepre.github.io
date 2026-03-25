export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxtjs/i18n'
  ],

  ssr: false,

  devtools: {
    enabled: false
  },

  i18n: {
    langDir: 'locales',
    locales: [
      { code: 'en', file: 'en.json', name: 'English' },
      { code: 'fr', file: 'fr.json', name: 'Français' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root'
    }
  },

  app: {
    buildAssetsDir: 'assets',
    head: {
      meta: [
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
  },

  fonts: {
    families: [
      { name: 'JetBrainsMono Nerd Font', local: 'JetBrainsMono Nerd Font' }
    ]
  }
})
