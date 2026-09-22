export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig().public

  // One <url> per locale, each listing every locale as an alternate, which is
  // what Google expects for a fully mirrored site.
  const byFilename = new Map<string, string[]>()
  for (const { filename, locale } of getPortfolioEntries()) {
    if (isHiddenFilename(filename)) continue
    const locales = byFilename.get(filename) ?? []
    if (!locales.includes(locale)) locales.push(locale)
    byFilename.set(filename, locales)
  }

  const blocks: string[] = []
  for (const [filename, locales] of byFilename) {
    const alternates = [
      ...locales.map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${siteUrl}/${l}/${filename}"/>`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/en/${filename}"/>`
    ].join('\n')

    for (const locale of locales) {
      blocks.push(`  <url>\n    <loc>${siteUrl}/${locale}/${filename}</loc>\n${alternates}\n  </url>`)
    }
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${blocks.join('\n')}
</urlset>
`

  setHeader(event, 'content-type', 'application/xml')
  return body
})
