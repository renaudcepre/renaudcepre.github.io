import { readFile } from 'node:fs/promises'
import { join, normalize } from 'node:path'

const PUBLIC_DIR = join(process.cwd(), 'public')

// During static prerendering, public/ assets aren't copied to .output/public
// yet (that happens after the prerender pass), so an internal $fetch of a
// raw public path 404s. Reading straight from the source public/ dir sidesteps that.
export default defineEventHandler(async (event) => {
  const path = getQuery(event).path
  if (typeof path !== 'string' || !path.startsWith('/portfolio/')) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid path' })
  }

  const filePath = normalize(join(PUBLIC_DIR, path))
  if (!filePath.startsWith(PUBLIC_DIR)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid path' })
  }

  try {
    return await readFile(filePath, 'utf-8')
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }
})
