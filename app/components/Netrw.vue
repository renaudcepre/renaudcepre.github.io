<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { C, FONT } from '~/utils/portfolio'

const props = defineProps<{
  activeFile: string
  visible: boolean
  fileList: string[]
  openTabs: string[]
  isMobile: boolean
}>()

const emit = defineEmits<{
  select: [name: string]
  close: []
}>()

const hoveredEntry = ref<string | null>(null)
const expandedDirs = ref<Record<string, boolean>>({})
const sidebarWidth = ref(280)

function startResize(e: MouseEvent) {
  e.preventDefault()
  const startX = e.clientX
  const startWidth = sidebarWidth.value

  function onMove(e: MouseEvent) {
    sidebarWidth.value = Math.max(160, Math.min(600, startWidth + e.clientX - startX))
  }
  function onUp() {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onUp)
  }
  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onUp)
}

interface TreeNode {
  name: string
  path: string
  isDir: boolean
  children?: TreeNode[]
  depth: number
}

function isHidden(filePath: string): boolean {
  const name = filePath.split('/').pop() || ''
  return name.startsWith('.')
}

const tree = computed<TreeNode[]>(() => {
  const root: TreeNode[] = []
  const visibleFiles = props.fileList.filter(f => !isHidden(f) || props.openTabs.includes(f))

  for (const filePath of [...visibleFiles].sort()) {
    const parts = filePath.split('/')
    let current = root
    let currentPath = ''

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const isLast = i === parts.length - 1
      currentPath += (i > 0 ? '/' : '') + part

      if (isLast) {
        current.push({ name: part, path: filePath, isDir: false, depth: i })
      } else {
        let dir = current.find(n => n.isDir && n.name === part)
        if (!dir) {
          dir = { name: part, path: currentPath, isDir: true, children: [], depth: i }
          current.push(dir)
        }
        current = dir.children!
      }
    }
  }

  return root
})

function flatten(nodes: TreeNode[]): TreeNode[] {
  const result: TreeNode[] = []
  for (const node of nodes) {
    result.push(node)
    if (node.isDir && node.children && expandedDirs.value[node.path]) {
      result.push(...flatten(node.children))
    }
  }
  return result
}

const flatTree = computed(() => flatten(tree.value))

function toggleDir(path: string) {
  expandedDirs.value[path] = !expandedDirs.value[path]
}

function handleClick(node: TreeNode) {
  if (node.isDir) {
    toggleDir(node.path)
  } else {
    emit('select', node.path)
  }
}

function entryColor(node: TreeNode): string {
  if (node.isDir) return C.cyan
  if (isHidden(node.path)) return C.gutter
  return node.path === props.activeFile ? C.bg : C.fg
}

function entryBg(node: TreeNode): string {
  if (node.path === props.activeFile) return C.blue
  if (hoveredEntry.value === node.path) return C.visual
  return 'transparent'
}

function indent(node: TreeNode): string {
  if (node.depth === 0) return ''
  return '·'.repeat(node.depth * 2) + ' '
}

function fileIcon(name: string): string | null {
  const ext = name.slice(name.lastIndexOf('.'))
  const icons: Record<string, string> = {
    '.md': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect x="1" y="1" width="6" height="8" fill="#a0a0a0"/><polygon points="7,1 7,3 9,3" fill="#a0a0a0"/><rect x="7" y="3" width="2" height="6" fill="#a0a0a0"/><rect x="1" y="1" width="8" height="2" fill="none" stroke="#000" stroke-width="0.5"/><rect x="3" y="4" width="4" height="1" fill="#000"/><rect x="3" y="6" width="4" height="1" fill="#000"/></svg>`,
    '.py': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect x="1" y="3" width="2" height="2" fill="#a0a0a0"/><rect x="3" y="5" width="2" height="2" fill="#a0a0a0"/><rect x="5" y="3" width="2" height="2" fill="#000"/><rect x="7" y="5" width="2" height="2" fill="#000"/></svg>`,
    '.txt': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect x="1" y="1" width="6" height="8" fill="#a0a0a0"/><polygon points="7,1 7,3 9,3" fill="#a0a0a0"/><rect x="7" y="3" width="2" height="6" fill="#a0a0a0"/><rect x="3" y="4" width="4" height="1" fill="#000"/><rect x="3" y="6" width="3" height="1" fill="#000"/><rect x="3" y="8" width="4" height="1" fill="#000"/></svg>`,
    '.ansi': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect x="1" y="1" width="2" height="2" fill="#000"/><rect x="3" y="1" width="2" height="2" fill="#a0a0a0"/><rect x="5" y="1" width="2" height="2" fill="#000"/><rect x="7" y="1" width="2" height="2" fill="#a0a0a0"/><rect x="1" y="3" width="2" height="2" fill="#a0a0a0"/><rect x="3" y="3" width="2" height="2" fill="#000"/><rect x="5" y="3" width="2" height="2" fill="#a0a0a0"/><rect x="7" y="3" width="2" height="2" fill="#000"/><rect x="1" y="5" width="2" height="2" fill="#000"/><rect x="3" y="5" width="2" height="2" fill="#a0a0a0"/><rect x="5" y="5" width="2" height="2" fill="#000"/><rect x="7" y="5" width="2" height="2" fill="#a0a0a0"/><rect x="1" y="7" width="2" height="2" fill="#a0a0a0"/><rect x="3" y="7" width="2" height="2" fill="#000"/><rect x="5" y="7" width="2" height="2" fill="#a0a0a0"/><rect x="7" y="7" width="2" height="2" fill="#000"/></svg>`,
    '.antres': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect x="5" y="1" width="2" height="6" fill="#000"/><rect x="3" y="1" width="2" height="2" fill="#a0a0a0"/><rect x="7" y="1" width="2" height="2" fill="#a0a0a0"/><circle cx="4" cy="8" r="1.5" fill="#a0a0a0"/><circle cx="4" cy="8" r="1.5" stroke="#000" stroke-width="0.5" fill="#a0a0a0"/></svg>`,
    '.webp': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect x="1" y="1" width="8" height="8" fill="#a0a0a0" stroke="#000" stroke-width="0.5"/><polygon points="2,8 5,4 8,8" fill="#000"/><circle cx="7" cy="3" r="1" fill="#000"/></svg>`,
    '.webm': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect x="1" y="2" width="8" height="6" fill="#a0a0a0" stroke="#000" stroke-width="0.5"/><polygon points="4,4 4,7 7,5.5" fill="#000"/></svg>`
  }
  const svg = icons[ext]
  if (!svg) return null
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

// expand only top-level dirs by default
watch(() => props.fileList, (list) => {
  const expanded: Record<string, boolean> = {}
  for (const f of list) {
    const parts = f.split('/')
    if (parts.length > 1) {
      expanded[parts[0]] = true
    }
  }
  expandedDirs.value = expanded
}, { immediate: true })
</script>

<template>
  <div
    v-if="visible"
    :style="isMobile ? {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: '50',
      background: C.netrw,
      fontFamily: FONT,
      fontSize: '13px',
      lineHeight: '36px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column'
    } : {
      width: sidebarWidth + 'px',
      background: C.netrw,
      flexShrink: '0',
      position: 'relative',
      overflow: 'hidden'
    }"
  >
    <div
      :style="{
        fontFamily: FONT,
        fontSize: '13px',
        lineHeight: '21px',
        overflowY: 'auto',
        overflowX: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }"
    >
      <div
        v-if="isMobile"
        :style="{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '8px 12px',
          borderBottom: `1px solid ${C.border}`
        }"
      >
        <span
          :style="{
            cursor: 'pointer',
            color: C.fg,
            fontSize: '20px',
            lineHeight: '1',
            padding: '4px 8px'
          }"
          @click="emit('close')"
        >✕</span>
      </div>
      <div :style="{ padding: '0 10px', color: C.comment, whiteSpace: 'pre' }">
        " ==========================================
      </div>
      <div :style="{ padding: '0 10px', color: C.comment, whiteSpace: 'pre' }">
        "   rcepre / portfolio
      </div>
      <div :style="{ padding: '0 10px', color: C.comment, whiteSpace: 'pre' }">
        "   last release: 2025
      </div>
      <div :style="{ padding: '0 10px', color: C.comment, whiteSpace: 'pre' }">
        " ==========================================
      </div>
      <div
        v-for="node in flatTree"
        :key="node.path"
        :style="{
          padding: '0 10px',
          paddingLeft: '10px',
          cursor: 'pointer',
          whiteSpace: 'pre',
          color: entryColor(node),
          background: entryBg(node),
          userSelect: 'none'
        }"
        @click="handleClick(node)"
        @mouseenter="hoveredEntry = node.path"
        @mouseleave="hoveredEntry = null"
      >
        <span :style="{ color: C.gutter }">{{ indent(node) }}</span><span v-if="node.isDir">{{ expandedDirs[node.path] ? '▾ ' : '▸ ' }}</span><img
          v-if="!node.isDir && fileIcon(node.name)"
          :src="fileIcon(node.name)!"
          :style="{ width: '10px', height: '10px', marginRight: '4px', verticalAlign: 'middle', imageRendering: 'pixelated', display: 'inline-block' }"
        >{{ node.name }}{{ node.isDir ? '/' : '' }}
      </div>
    </div>
    <!-- Resize handle -->
    <div
      v-if="!isMobile"
      data-resize-handle
      :style="{
        position: 'absolute',
        top: 0,
        right: '-4px',
        width: '9px',
        height: '100%',
        zIndex: 10
      }"
      @mousedown="startResize"
    />
  </div>
</template>
