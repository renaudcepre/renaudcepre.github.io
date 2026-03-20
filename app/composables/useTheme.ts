import { C, setTheme, cycleTheme, type ThemeName } from '~/utils/portfolio'

const STORAGE_KEY = 'portoide-theme'

export function useTheme() {
  const themeName = useState<ThemeName>('theme-name', () => 'catppuccin')

  const init = () => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeName | null
    if (saved && ['one-dark', 'catppuccin', 'gruvbox'].includes(saved)) {
      setTheme(saved)
      themeName.value = saved
    }
    updateCssVars()
  }

  const cycle = () => {
    const next = cycleTheme()
    themeName.value = next
    localStorage.setItem(STORAGE_KEY, next)
    updateCssVars()
  }

  const updateCssVars = () => {
    const root = document.documentElement
    root.style.setProperty('--c-bg', C.bg)
    root.style.setProperty('--c-gutter', C.gutter)
  }

  onMounted(() => {
    init()

    const handler = (e: KeyboardEvent) => {
      if (e.key === 't' && e.ctrlKey) {
        e.preventDefault()
        cycle()
      }
    }
    window.addEventListener('keydown', handler)
    onUnmounted(() => window.removeEventListener('keydown', handler))
  })

  return { themeName, cycle }
}
