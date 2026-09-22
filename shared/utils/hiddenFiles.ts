/**
 * Dotfiles in the portfolio tree are companion assets (a screenshot, a video)
 * reachable from a README. They are real routes so the README can link to them,
 * but they hold a single media element and are kept out of the index.
 */
export function isHiddenFilename(filename: string): boolean {
  return filename.split('/').some(part => part.startsWith('.'))
}
