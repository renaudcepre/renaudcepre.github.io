export const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*<>/'

export function isScrambleProtected(node: Node): boolean {
  let el = node.parentElement
  while (el) {
    if (el.hasAttribute('data-no-scramble')) return true
    el = el.parentElement
  }
  return false
}
