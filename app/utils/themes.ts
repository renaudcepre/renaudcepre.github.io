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
  },
  'light': {
    bg: '#ffffff', fg: '#24292e', comment: '#6a737d', keyword: '#d73a49',
    string: '#032f62', func: '#6f42c1', type: '#e36209', number: '#005cc5',
    operator: '#d73a49', red: '#cb2431', green: '#22863a', yellow: '#b08800',
    blue: '#005cc5', magenta: '#6f42c1', cyan: '#3192aa', white: '#24292e',
    gray: '#959da5', gutter: '#e1e4e8', statusBg: '#f1f3f5', statusFg: '#586069',
    visual: '#c8e1ff', cursor: '#005cc5', border: '#e1e4e8', netrw: '#f6f8fa',
    tabBg: '#f1f3f5', tabActive: '#ffffff',
    codeBg: '#f6f8fa', codeFg: '#24292e', codeBlockBg: '#f0f2f4',
    codeBlockBorder: '#005cc544', bqBorder: '#3192aa', bqText: '#6a737d',
    bullet: '#6f42c1', olNum: '#e36209', hr: '#e1e4e8',
    thBg: '#f6f8fa', thFg: '#24292e', trEvenBg: '#f6f8fa',
    ansi: {
      30: '#24292e', 31: '#cb2431', 32: '#22863a', 33: '#b08800',
      34: '#005cc5', 35: '#6f42c1', 36: '#3192aa', 37: '#586069',
      90: '#959da5', 91: '#cb2431', 92: '#22863a', 93: '#b08800',
      94: '#005cc5', 95: '#6f42c1', 96: '#3192aa', 97: '#24292e'
    }
  },
  'hyperkitch': {
    bg: '#120024', fg: '#fff01f', comment: '#ff69b4', keyword: '#ff0055',
    string: '#00ff88', func: '#00e5ff', type: '#ffaa00', number: '#ff6fff',
    operator: '#ff0055', red: '#ff0040', green: '#39ff14', yellow: '#fff01f',
    blue: '#00bfff', magenta: '#ff00ff', cyan: '#00ffcc', white: '#ffffff',
    gray: '#884499', gutter: '#2a0044', statusBg: '#ff00aa', statusFg: '#ffffff',
    visual: '#44006688', cursor: '#ff0055', border: '#ff00ff55', netrw: '#0a0018',
    tabBg: '#1a0033', tabActive: '#120024',
    codeBg: '#0a0018', codeFg: '#39ff14', codeBlockBg: '#08001a',
    codeBlockBorder: '#ff00ff66', bqBorder: '#00ffcc', bqText: '#ff69b4',
    bullet: '#ff00ff', olNum: '#ffaa00', hr: '#ff00ff44',
    thBg: '#1a0033', thFg: '#fff01f', trEvenBg: '#0f001f',
    ansi: {
      30: '#120024', 31: '#ff0040', 32: '#39ff14', 33: '#fff01f',
      34: '#00bfff', 35: '#ff00ff', 36: '#00ffcc', 37: '#ffffff',
      90: '#884499', 91: '#ff0040', 92: '#39ff14', 93: '#fff01f',
      94: '#00bfff', 95: '#ff00ff', 96: '#00ffcc', 97: '#ffffff'
    }
  }
} as const

const THEME_NAMES: ThemeName[] = ['one-dark', 'catppuccin', 'gruvbox', 'light', 'hyperkitch']

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
