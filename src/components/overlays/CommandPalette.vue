<script setup>
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'
import { ChevronRight, File, Palette, Sparkles, TerminalSquare, PanelLeftClose, Download } from 'lucide-vue-next'
import { usePaletteStore } from '@/stores/palette.js'
import { useTabsStore } from '@/stores/tabs.js'
import { useLayoutStore } from '@/stores/layout.js'
import { useCopilotStore } from '@/stores/copilot.js'
import { useThemeStore, THEMES } from '@/stores/theme.js'
import { SECTIONS, SECTION_ORDER } from '@/data/sections.js'

const palette = usePaletteStore()
const tabs = useTabsStore()
const layout = useLayoutStore()
const copilot = useCopilotStore()
const theme = useThemeStore()

const inputRef = useTemplateRef('inputRef')
const highlight = ref(0)

const fileEntries = SECTION_ORDER.map((id) => ({
  kind: 'file',
  id,
  label: SECTIONS[id].title,
  hint: SECTIONS[id].language,
  icon: File,
  run: () => {
    tabs.openTab(id)
    palette.hide()
  },
}))

const commandEntries = [
  {
    kind: 'cmd',
    id: 'cmd-toggle-sidebar',
    label: 'View: Toggle Sidebar',
    hint: 'Ctrl+B',
    icon: PanelLeftClose,
    run: () => {
      layout.toggleSidebar()
      palette.hide()
    },
  },
  {
    kind: 'cmd',
    id: 'cmd-toggle-terminal',
    label: 'View: Toggle Terminal',
    hint: 'Ctrl+`',
    icon: TerminalSquare,
    run: () => {
      layout.toggleTerminal()
      palette.hide()
    },
  },
  {
    kind: 'cmd',
    id: 'cmd-open-copilot',
    label: 'Copilot: Open Chat',
    hint: 'Ctrl+Shift+C',
    icon: Sparkles,
    run: () => {
      copilot.show()
      palette.hide()
    },
  },
  {
    kind: 'cmd',
    id: 'cmd-change-theme',
    label: 'Preferences: Change Color Theme',
    hint: '',
    icon: Palette,
    run: () => {
      palette.show('theme')
    },
  },
  {
    kind: 'cmd',
    id: 'cmd-download-resume',
    label: 'Download Resume',
    hint: '',
    icon: Download,
    run: () => {
      tabs.openTab('resume')
      palette.hide()
    },
  },
]

const themeEntries = computed(() =>
  THEMES.map((t) => ({
    kind: 'theme',
    id: `theme-${t.id}`,
    label: t.label,
    hint: t.id,
    icon: Palette,
    run: () => {
      theme.setTheme(t.id)
      palette.hide()
    },
  })),
)

const entries = computed(() => {
  const pool = palette.mode === 'theme' ? themeEntries.value : [...fileEntries, ...commandEntries]
  const q = palette.query.trim().toLowerCase()
  if (!q) return pool
  return pool
    .map((e) => ({ e, score: e.label.toLowerCase().includes(q) ? e.label.length - q.length : -1 }))
    .filter((r) => r.score >= 0)
    .sort((a, b) => a.score - b.score)
    .map((r) => r.e)
})

watch(
  () => palette.open,
  (v) => {
    if (v) {
      highlight.value = 0
      nextTick(() => inputRef.value?.focus())
    }
  },
)

watch(
  () => palette.mode,
  () => {
    highlight.value = 0
  },
)

watch(
  () => palette.query,
  () => {
    highlight.value = 0
  },
)

function onKey(e) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    highlight.value = Math.min(entries.value.length - 1, highlight.value + 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    highlight.value = Math.max(0, highlight.value - 1)
  } else if (e.key === 'Enter') {
    e.preventDefault()
    entries.value[highlight.value]?.run()
  }
}

function placeholder() {
  return palette.mode === 'theme'
    ? 'Pick a color theme…'
    : 'Go to file or run command…'
}
</script>

<template>
  <div
    v-if="palette.open"
    class="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-20"
    @click.self="palette.hide"
  >
    <div class="w-[560px] max-w-[90vw] overflow-hidden rounded-md border border-border bg-panel shadow-2xl animate-fade-in">
      <div class="flex items-center gap-2 border-b border-border px-3 py-2">
        <ChevronRight :size="14" class="text-muted" />
        <input
          ref="inputRef"
          v-model="palette.query"
          class="flex-1 bg-transparent text-sm outline-none"
          :placeholder="placeholder()"
          @keydown="onKey"
        />
      </div>
      <ul class="max-h-80 overflow-y-auto py-1">
        <li
          v-for="(entry, i) in entries"
          :key="entry.id"
          class="flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm"
          :class="i === highlight ? 'bg-accent/30 text-fg' : 'text-fg/90'"
          @mouseenter="highlight = i"
          @click="entry.run"
        >
          <component :is="entry.icon" :size="14" class="text-muted" />
          <span class="flex-1 truncate">{{ entry.label }}</span>
          <span class="text-[11px] text-muted">{{ entry.hint }}</span>
        </li>
        <li v-if="!entries.length" class="px-3 py-4 text-center text-sm text-muted">
          No matching commands
        </li>
      </ul>
    </div>
  </div>
</template>
