import { C, setTheme, cycleTheme, type ThemeName } from '~/utils/portfolio'

const STORAGE_KEY = 'portoide-theme'

export function useTheme() {
  const themeName = useState<ThemeName>('theme-name', () => 'catppuccin')

  const init = () => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeName | null
    if (saved && ['one-dark', 'catppuccin', 'gruvbox', 'light', 'hyperkitch'].includes(saved)) {
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
    const { ansi: _, ...colors } = C
    for (const [key, value] of Object.entries(colors)) {
      root.style.setProperty(`--c-${key}`, value as string)
    }
  }

  onMounted(() => { init() })
  useKeyboardShortcuts({ 'Ctrl+Semicolon': () => cycle() })

  return { themeName, cycle }
}
