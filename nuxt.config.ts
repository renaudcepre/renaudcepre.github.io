import { getPortfolioRoutes } from './server/utils/portfolioRoutes'

const SITE_URL = 'https://renaudcepre.github.io'
const HOME = '/en/hello-world.html'

// GitHub Pages can't issue a redirect, and the one @nuxtjs/i18n prerenders for `/`
// is a bare meta-refresh with no title, no body and no link. This replaces it with
// a real document so crawlers and no-JS visitors get somewhere.
const ROOT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="refresh" content="0; url=${HOME}">
<title>Renaud — Python Developer</title>
<meta name="description" content="Portfolio of Renaud Cepre, Python developer: backend, testing and LLM evals, emergent simulations, electronic music.">
<link rel="canonical" href="${SITE_URL}${HOME}">
<link rel="alternate" hreflang="en" href="${SITE_URL}/en/hello-world.html">
<link rel="alternate" hreflang="fr" href="${SITE_URL}/fr/hello-world.html">
<link rel="alternate" hreflang="x-default" href="${SITE_URL}${HOME}">
<style>body{background:#1e1e2e;color:#cdd6f4;font-family:monospace;padding:2rem}a{color:#94e2d5}</style>
</head>
<body>
<h1>Renaud Cepre</h1>
<p><a href="${HOME}">English</a> · <a href="/fr/hello-world.html">Français</a></p>
</body>
</html>
`

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
      // /en and /fr render hello-world.html too: without them the locale roots
      // are a 404 on GitHub Pages, which is exactly where `/` used to send people.
      routes: ['/', '/en', '/fr', '/sitemap.xml', ...getPortfolioRoutes()],
      crawlLinks: false,
      failOnError: false
    }
  },

  hooks: {
    'nitro:init'(nitro) {
      nitro.hooks.hook('prerender:generate', (route) => {
        if (route.route === '/') route.contents = ROOT_HTML
      })
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
