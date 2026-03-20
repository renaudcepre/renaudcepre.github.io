<script setup lang="ts">
import { C, FONT } from '~/utils/portfolio'

const props = defineProps<{
  activeFile: string
  visible: boolean
  fileList: string[]
  isMobile: boolean
}>()

const emit = defineEmits<{
  select: [name: string]
  close: []
}>()

const hoveredEntry = ref<string | null>(null)
const expandedDirs = ref<Set<string>>(new Set())

interface TreeNode {
  name: string
  path: string
  isDir: boolean
  children?: TreeNode[]
  depth: number
}

const tree = computed<TreeNode[]>(() => {
  const root: TreeNode[] = []

  for (const filePath of [...props.fileList].sort()) {
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
    if (node.isDir && node.children && expandedDirs.value.has(node.path)) {
      result.push(...flatten(node.children))
    }
  }
  return result
}

const flatTree = computed(() => flatten(tree.value))

function toggleDir(path: string) {
  const s = new Set(expandedDirs.value)
  if (s.has(path)) {
    s.delete(path)
  } else {
    s.add(path)
  }
  expandedDirs.value = s
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

// expand all dirs on mount
onMounted(() => {
  const dirs = new Set<string>()
  for (const f of props.fileList) {
    const parts = f.split('/')
    let p = ''
    for (let i = 0; i < parts.length - 1; i++) {
      p += (i > 0 ? '/' : '') + parts[i]
      dirs.add(p)
    }
  }
  expandedDirs.value = dirs
})
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
      flexDirection: 'column',
    } : {
      width: '280px',
      background: C.netrw,
      borderRight: `1px solid ${C.border}`,
      fontFamily: FONT,
      fontSize: '13px',
      lineHeight: '21px',
      overflowY: 'auto',
      flexShrink: '0',
      display: 'flex',
      flexDirection: 'column',
    }"
  >
    <div
      v-if="isMobile"
      :style="{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '8px 12px',
        borderBottom: `1px solid ${C.border}`,
      }"
    >
      <span
        :style="{
          cursor: 'pointer',
          color: C.fg,
          fontSize: '20px',
          lineHeight: '1',
          padding: '4px 8px',
        }"
        @click="emit('close')"
      >✕</span>
    </div>
    <div :style="{ padding: '0 10px', color: C.comment, whiteSpace: 'pre' }"> " ==========================================</div>
    <div :style="{ padding: '0 10px', color: C.comment, whiteSpace: 'pre' }"> "   rcepre / portfolio</div>
    <div :style="{ padding: '0 10px', color: C.comment, whiteSpace: 'pre' }"> "   last release: 2025</div>
    <div :style="{ padding: '0 10px', color: C.comment, whiteSpace: 'pre' }"> " ==========================================</div>
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
        userSelect: 'none',
      }"
      @click="handleClick(node)"
      @mouseenter="hoveredEntry = node.path"
      @mouseleave="hoveredEntry = null"
    ><span :style="{ color: C.gutter }">{{ indent(node) }}</span>{{ node.isDir ? (expandedDirs.has(node.path) ? 'v ' : '> ') : '' }}{{ node.name }}{{ node.isDir ? '/' : '' }}</div>
    <div
      v-for="i in 30"
      :key="`pad${i}`"
      :style="{ padding: '0 10px', color: C.blue, whiteSpace: 'pre' }"
    >
      ~
    </div>
  </div>
</template>
