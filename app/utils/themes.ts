import { reactive } from 'vue'

export type ThemeColors = {
  [K in keyof typeof THEMES['gruvbox']]: K extends 'ansi' ? Record<number, string> : string
}

export type ThemeName = keyof typeof THEMES

export const THEMES = {
  'one-dark': {
    bg: '#0e1019', fg: '#c8c8c8', comment: '#5c6370', keyword: '#c678dd',
    string: '#98c379', func: '#61afef', type: '#e5c07b', number: '#d19a66',
    operator: '#56b6c2', red: '#e06c75', green: '#98c379', yellow: '#e5c07b',
    blue: '#61afef', magenta: '#c678dd', cyan: '#56b6c2', white: '#abb2bf',
    gray: '#4b5263', gutter: '#3b4048', statusBg: '#21252b', statusFg: '#9da5b4',
    visual: '#3e4452', cursor: '#528bff', border: '#2c313a', netrw: '#13161e',
    tabBg: '#1a1d26', tabActive: '#0e1019',
    codeBg: '#181a24', codeFg: '#abb2bf', codeBlockBg: '#0a0c14',
    codeBlockBorder: '#61afef44', bqBorder: '#56b6c2', bqText: '#5c6370',
    bullet: '#c678dd', olNum: '#d19a66', hr: '#3e4452',
    thBg: '#181a24', thFg: '#e5c07b', trEvenBg: '#12141c',
    ansi: {
      30: '#000000', 31: '#e06c75', 32: '#98c379', 33: '#e5c07b',
      34: '#61afef', 35: '#c678dd', 36: '#56b6c2', 37: '#abb2bf',
      90: '#5c6370', 91: '#e06c75', 92: '#98c379', 93: '#e5c07b',
      94: '#61afef', 95: '#c678dd', 96: '#56b6c2', 97: '#ffffff'
    }
  },
  'catppuccin': {
    bg: '#1e1e2e', fg: '#cdd6f4', comment: '#6c7086', keyword: '#cba6f7',
    string: '#a6e3a1', func: '#89b4fa', type: '#f9e2af', number: '#fab387',
    operator: '#94e2d5', red: '#f38ba8', green: '#a6e3a1', yellow: '#f9e2af',
    blue: '#89b4fa', magenta: '#cba6f7', cyan: '#94e2d5', white: '#bac2de',
    gray: '#585b70', gutter: '#45475a', statusBg: '#181825', statusFg: '#a6adc8',
    visual: '#45475a', cursor: '#b4befe', border: '#313244', netrw: '#181825',
    tabBg: '#181825', tabActive: '#1e1e2e',
    codeBg: '#181825', codeFg: '#a6e3a1', codeBlockBg: '#11111b',
    codeBlockBorder: '#89b4fa44', bqBorder: '#94e2d5', bqText: '#6c7086',
    bullet: '#cba6f7', olNum: '#fab387', hr: '#45475a',
    thBg: '#181825', thFg: '#f9e2af', trEvenBg: '#181825',
    ansi: {
      30: '#45475a', 31: '#f38ba8', 32: '#a6e3a1', 33: '#f9e2af',
      34: '#89b4fa', 35: '#cba6f7', 36: '#94e2d5', 37: '#bac2de',
      90: '#6c7086', 91: '#f38ba8', 92: '#a6e3a1', 93: '#f9e2af',
      94: '#89b4fa', 95: '#cba6f7', 96: '#94e2d5', 97: '#cdd6f4'
    }
  },
  'gruvbox': {
    bg: '#282828', fg: '#ebdbb2', comment: '#928374', keyword: '#fb4934',
    string: '#b8bb26', func: '#83a598', type: '#fabd2f', number: '#d3869b',
    operator: '#8ec07c', red: '#fb4934', green: '#b8bb26', yellow: '#fabd2f',
    blue: '#83a598', magenta: '#d3869b', cyan: '#8ec07c', white: '#ebdbb2',
    gray: '#665c54', gutter: '#504945', statusBg: '#1d2021', statusFg: '#a89984',
    visual: '#504945', cursor: '#fe8019', border: '#3c3836', netrw: '#1d2021',
    tabBg: '#1d2021', tabActive: '#282828',
    codeBg: '#1d2021', codeFg: '#b8bb26', codeBlockBg: '#1a1a1a',
    codeBlockBorder: '#83a59844', bqBorder: '#8ec07c', bqText: '#928374',
    bullet: '#d3869b', olNum: '#fe8019', hr: '#504945',
    thBg: '#1d2021', thFg: '#fabd2f', trEvenBg: '#1d2021',
    ansi: {
      30: '#282828', 31: '#fb4934', 32: '#b8bb26', 33: '#fabd2f',
      34: '#83a598', 35: '#d3869b', 36: '#8ec07c', 37: '#ebdbb2',
      90: '#928374', 91: '#fb4934', 92: '#b8bb26', 93: '#fabd2f',
      94: '#83a598', 95: '#d3869b', 96: '#8ec07c', 97: '#ebdbb2'
    }
  }
} as const

const THEME_NAMES: ThemeName[] = ['one-dark', 'catppuccin', 'gruvbox']

export const C: ThemeColors = reactive({ ...THEMES['catppuccin'] }) as ThemeColors

export function setTheme(name: ThemeName) {
  Object.assign(C, THEMES[name])
}

export function cycleTheme(): ThemeName {
  const current = THEME_NAMES.find(n => THEMES[n].bg === C.bg) ?? 'catppuccin'
  const idx = THEME_NAMES.indexOf(current)
  const next = THEME_NAMES[(idx + 1) % THEME_NAMES.length] as ThemeName
  setTheme(next)
  return next
}

export function currentThemeName(): ThemeName {
  return THEME_NAMES.find(n => THEMES[n].bg === C.bg) ?? 'catppuccin'
}

export const FONT = '\'JetBrainsMono Nerd Font\', \'JetBrains Mono\', \'Cascadia Mono\', \'SF Mono\', \'Consolas\', monospace'
