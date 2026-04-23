<script setup>
import { ref } from 'vue'
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  FileCode2,
  FileJson,
  FileText,
  FileType,
  FileCode,
  FileBadge,
  MoreHorizontal,
} from 'lucide-vue-next'
import { useTabsStore } from '@/stores/tabs.js'
import { useLayoutStore } from '@/stores/layout.js'
import { SECTIONS, SECTION_ORDER, SOCIALS } from '@/data/sections.js'

const tabs = useTabsStore()
const layout = useLayoutStore()

const portfolioOpen = ref(true)
const socialsOpen = ref(true)

function iconFor(ext) {
  switch (ext) {
    case 'react':
      return FileCode2
    case 'json':
      return FileJson
    case 'md':
      return FileText
    case 'ts':
      return FileType
    case 'yaml':
      return FileCode
    case 'css':
      return FileCode
    case 'pdf':
      return FileBadge
    default:
      return FileText
  }
}

function iconColor(ext) {
  switch (ext) {
    case 'react':
      return 'text-sky-400'
    case 'json':
      return 'text-amber-400'
    case 'md':
      return 'text-blue-300'
    case 'ts':
      return 'text-blue-400'
    case 'yaml':
      return 'text-rose-300'
    case 'css':
      return 'text-violet-300'
    case 'pdf':
      return 'text-red-400'
    default:
      return 'text-muted'
  }
}
</script>

<template>
  <aside
    class="flex shrink-0 flex-col overflow-hidden bg-sidebar text-fg"
    :style="{ width: layout.sidebarWidth + 'px' }"
  >
    <div class="flex items-center justify-between px-4 py-2 text-[11px] uppercase tracking-widest text-muted">
      <span>Explorer</span>
      <button class="grid h-5 w-5 place-items-center rounded hover:bg-panel">
        <MoreHorizontal :size="14" />
      </button>
    </div>

    <div class="flex-1 overflow-y-auto pb-2">
      <!-- PORTFOLIO folder -->
      <button
        class="flex w-full items-center gap-1 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider hover:bg-panel"
        @click="portfolioOpen = !portfolioOpen"
      >
        <component :is="portfolioOpen ? ChevronDown : ChevronRight" :size="12" />
        <component :is="portfolioOpen ? FolderOpen : Folder" :size="14" class="text-amber-300" />
        <span>portfolio</span>
      </button>
      <ul v-if="portfolioOpen" class="pl-4">
        <li v-for="id in SECTION_ORDER" :key="id">
          <button
            class="flex w-full items-center gap-2 px-2 py-0.5 text-left text-sm hover:bg-panel"
            :class="tabs.activeTab === id ? 'bg-panel text-fg' : 'text-fg/80'"
            @click="tabs.openTab(id)"
          >
            <component
              :is="iconFor(SECTIONS[id].icon)"
              :size="14"
              :class="iconColor(SECTIONS[id].icon)"
            />
            <span>{{ SECTIONS[id].title }}</span>
          </button>
        </li>
      </ul>

    </div>

    <div class="border-t border-border px-3 py-2 text-[11px] text-muted">
      Portfolio v3.0 · Vue + Vite + Tailwind
    </div>
  </aside>
</template>
