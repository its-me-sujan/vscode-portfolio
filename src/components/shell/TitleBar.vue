<script setup>
import { ref, useTemplateRef } from 'vue'
import { Minus, Square, X } from 'lucide-vue-next'
import { onClickOutside, onKeyStroke } from '@vueuse/core'
import { useTabsStore } from '@/stores/tabs.js'
import { useLayoutStore } from '@/stores/layout.js'
import { usePaletteStore } from '@/stores/palette.js'
import { useCopilotStore } from '@/stores/copilot.js'

const tabs = useTabsStore()
const layout = useLayoutStore()
const palette = usePaletteStore()
const copilot = useCopilotStore()

const openMenu = ref(null)
const navRef = useTemplateRef('navRef')

onClickOutside(navRef, () => (openMenu.value = null))
onKeyStroke('Escape', () => {
  if (openMenu.value) openMenu.value = null
})

function fakeClose() {
  tabs.showToast("You can't close a portfolio! 😄")
}

function run(fn) {
  openMenu.value = null
  fn()
}

function toggleMenu(label) {
  openMenu.value = openMenu.value === label ? null : label
}

function hoverMenu(label) {
  if (openMenu.value) openMenu.value = label
}

const menus = [
  {
    label: 'File',
    items: [
      { label: 'Open File...', hint: 'Ctrl+P', run: () => palette.show('all') },
      { label: 'Close Tab', run: () => tabs.closeTab(tabs.activeTab) },
      { label: 'Reopen Closed Tab', hint: 'Ctrl+Shift+T', run: () => tabs.reopenLastClosed() },
      { separator: true },
      { label: 'Exit', run: fakeClose },
    ],
  },
  {
    label: 'Edit',
    items: [
      { label: 'Undo', hint: 'Ctrl+Z', run: () => tabs.showToast('Nothing to undo — this portfolio is immutable.') },
      { label: 'Redo', hint: 'Ctrl+Shift+Z', run: () => tabs.showToast('Nothing to redo either. 😄') },
      { separator: true },
      { label: 'Find', hint: 'Ctrl+P', run: () => palette.show('all') },
    ],
  },
  {
    label: 'View',
    items: [
      { label: 'Command Palette...', hint: 'Ctrl+P', run: () => palette.show('all') },
      { separator: true },
      { label: 'Toggle Sidebar', hint: 'Ctrl+B', run: () => layout.toggleSidebar() },
      { label: 'Toggle Terminal', hint: 'Ctrl+`', run: () => layout.toggleTerminal() },
      { label: 'Toggle Full Screen', hint: 'F11', run: () => layout.toggleFullScreen() },
      { separator: true },
      { label: 'Zoom In', run: () => layout.zoomIn() },
      { label: 'Zoom Out', run: () => layout.zoomOut() },
      { label: 'Reset Zoom', run: () => layout.resetZoom() },
      { separator: true },
      { label: 'Color Theme...', run: () => palette.show('theme') },
    ],
  },
  {
    label: 'Go',
    items: [
      { label: 'Go to File...', hint: 'Ctrl+P', run: () => palette.show('all') },
      { label: 'Reopen Closed Editor', hint: 'Ctrl+Shift+T', run: () => tabs.reopenLastClosed() },
      { separator: true },
      { label: 'Back', run: () => tabs.showToast('No history — try the tabs above.') },
    ],
  },
  {
    label: 'Run',
    items: [
      { label: 'Start Portfolio', run: () => tabs.showToast('Portfolio is already running 🚀') },
      { label: 'Run Without Debugging', run: () => tabs.showToast('Running… (it was already running)') },
      { separator: true },
      { label: 'Toggle Copilot', hint: 'Ctrl+Shift+C', run: () => copilot.toggle() },
    ],
  },
  {
    label: 'Terminal',
    items: [
      {
        label: 'New Terminal',
        hint: 'Ctrl+`',
        run: () => {
          if (!layout.terminalOpen) layout.toggleTerminal()
        },
      },
      { label: 'Split Terminal', run: () => tabs.showToast("You've only got the one terminal here.") },
      { separator: true },
      { label: 'Run Task...', run: () => tabs.showToast('No tasks configured.') },
    ],
  },
  {
    label: 'Help',
    items: [
      { label: 'Welcome', run: () => tabs.openTab('home') },
      { label: 'View README', run: () => tabs.openTab('readme') },
      { separator: true },
      {
        label: 'Keyboard Shortcuts',
        run: () =>
          tabs.showToast('Ctrl+P palette · Ctrl+B sidebar · Ctrl+` terminal · Ctrl+Shift+C copilot'),
      },
      { label: 'About', run: () => tabs.showToast('VS Code–themed portfolio · Vue 3 + Vite + Tailwind') },
    ],
  },
]
</script>

<template>
  <div
    class="relative flex h-8 shrink-0 items-center justify-between border-b border-border bg-activitybar/80 px-2 text-xs text-muted select-none"
  >
    <div class="flex items-center gap-3">
      <div class="flex gap-1.5 lg:hidden">
        <span class="h-3 w-3 rounded-full bg-red-500/80" />
        <span class="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span class="h-3 w-3 rounded-full bg-green-500/80" />
      </div>
      <nav ref="navRef" class="hidden items-center gap-1 lg:flex">
        <div v-for="m in menus" :key="m.label" class="relative">
          <button
            class="rounded px-2 py-0.5 hover:bg-panel hover:text-fg"
            :class="openMenu === m.label && 'bg-panel text-fg'"
            @click="toggleMenu(m.label)"
            @mouseenter="hoverMenu(m.label)"
          >
            {{ m.label }}
          </button>
          <div
            v-if="openMenu === m.label"
            class="absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-md border border-border bg-panel py-1 text-fg shadow-xl animate-fade-in"
          >
            <template v-for="(item, i) in m.items" :key="i">
              <div v-if="item.separator" class="my-1 border-t border-border" />
              <button
                v-else
                class="flex w-full items-center justify-between gap-6 px-3 py-1 text-left hover:bg-accent/20"
                @click="run(item.run)"
              >
                <span>{{ item.label }}</span>
                <span v-if="item.hint" class="text-[11px] text-muted">{{ item.hint }}</span>
              </button>
            </template>
          </div>
        </div>
      </nav>
    </div>
    <div class="truncate font-mono text-[11px]">
      Your Name — Portfolio
    </div>
    <div class="flex items-center">
      <button class="grid h-8 w-10 place-items-center hover:bg-panel" aria-label="Minimize">
        <Minus :size="14" />
      </button>
      <button class="grid h-8 w-10 place-items-center hover:bg-panel" aria-label="Maximize">
        <Square :size="12" />
      </button>
      <button
        class="grid h-8 w-10 place-items-center hover:bg-red-500 hover:text-white"
        aria-label="Close"
        @click="fakeClose"
      >
        <X :size="14" />
      </button>
    </div>
  </div>
</template>
