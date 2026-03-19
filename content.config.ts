import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    portfolio: defineCollection({
      type: 'data',
      source: 'portfolio/**/*.yaml',
      schema: z.object({
        filename: z.string(),
        lang: z.enum(['py', 'md', 'img', 'ansi', 'txt']),
        order: z.number(),
        path: z.string()
      })
    })
  }
})
