const quotes = [
  { quote: 'Premature optimization is the root of all evil.' },
  { quote: 'Code is like a joke. If you have to explain it, it\'s not that good.' },
  { quote: 'Complexity kills.' },
  { quote: 'Keep it simple, stupid.' },
  { quote: 'Bugs are just features waiting to be discovered.' },
  { quote: 'Music is math.', author: 'BOC' },
  { quote: 'Music Has the Right to Children.', author: 'BOC' },
  { quote: 'I\'m doing a (free) operating system, just a hobby...', author: 'Linus Torvalds' },
  { quote: 'Your code is *****.', author: 'Linus Torvalds' },
  { quote: 'Wake up, sfgljkfzwrkuim make up, apiuofhisau table.', author: 'Serj Tankian' }
]

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*'
const SCRAMBLE_DURATION = 1500
const SCRAMBLE_INTERVAL = 30
const CYCLE_INTERVAL = 10_000

function formatQuote(q: typeof quotes[number]) {
  return q.author ? `"${q.quote}" — ${q.author}` : `"${q.quote}"`
}

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

export function useQuote() {
  const display = ref('')
  let frameId: ReturnType<typeof setInterval> | null = null
  let cycleId: ReturnType<typeof setInterval> | null = null
  let lastIndex = -1

  function pickRandom(): string {
    let idx: number
    do { idx = Math.floor(Math.random() * quotes.length) } while (idx === lastIndex && quotes.length > 1)
    lastIndex = idx
    return formatQuote(quotes[idx])
  }

  function scrambleTo(target: string) {
    if (frameId) clearInterval(frameId)

    const totalSteps = Math.floor(SCRAMBLE_DURATION / SCRAMBLE_INTERVAL)
    const locked = new Array(target.length).fill(false)
    let step = 0

    // Each character gets a random step at which it locks in
    const lockStep = Array.from({ length: target.length }, () =>
      Math.floor(Math.random() * totalSteps * 0.6) + Math.floor(totalSteps * 0.3)
    )

    frameId = setInterval(() => {
      step++
      const chars = []
      for (let i = 0; i < target.length; i++) {
        if (target[i] === ' ') {
          chars.push(' ')
        } else if (locked[i]) {
          chars.push(target[i])
        } else if (step >= lockStep[i]) {
          locked[i] = true
          chars.push(target[i])
        } else {
          chars.push(randomChar())
        }
      }
      display.value = chars.join('')

      if (step >= totalSteps) {
        display.value = target
        if (frameId) clearInterval(frameId)
        frameId = null
      }
    }, SCRAMBLE_INTERVAL)
  }

  onMounted(() => {
    scrambleTo(pickRandom())
    cycleId = setInterval(() => scrambleTo(pickRandom()), CYCLE_INTERVAL)
  })

  onUnmounted(() => {
    if (frameId) clearInterval(frameId)
    if (cycleId) clearInterval(cycleId)
  })

  return { quote: display }
}
