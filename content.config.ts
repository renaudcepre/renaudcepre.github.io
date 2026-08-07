import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    portfolio: defineCollection({
      type: 'data',
      source: 'portfolio/**/*.yaml',
      schema: z.object({
        filename: z.string(),
        lang: z.enum(['py', 'md', 'img', 'ansi', 'txt', 'video', 'audio', 'html']),
        order: z.number(),
        path: z.string(),
        locale: z.enum(['en', 'fr', '*']).default('*'),
        title: z.string().optional(),
        description: z.string().optional()
      })
    })
  }
})
