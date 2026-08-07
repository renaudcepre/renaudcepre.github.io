import { getPortfolioRoutes } from './server/utils/portfolioRoutes'

const SITE_URL = 'https://renaudcepre.github.io'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxtjs/i18n'
  ],

  devtools: {
    enabled: false
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

  runtimeConfig: {
    public: {
      siteUrl: SITE_URL
    }
  },

  compatibilityDate: '2025-03-19',

  nitro: {
    prerender: {
      routes: ['/', '/sitemap.xml', ...getPortfolioRoutes()],
      crawlLinks: false,
      failOnError: false
    }
  },

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
  }
})
