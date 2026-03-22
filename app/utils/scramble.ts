export function isScrambleProtected(node: Node): boolean {
  let el = node.parentElement
  while (el) {
    if (el.hasAttribute('data-no-scramble')) return true
    el = el.parentElement
  }
  return false
}
