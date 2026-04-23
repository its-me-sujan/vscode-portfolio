<script setup>
import {
  Files,
  Search,
  GitBranch,
  Bug,
  Puzzle,
  Sparkles,
  Settings,
  User,
} from 'lucide-vue-next'
import { useLayoutStore } from '@/stores/layout.js'
import { useCopilotStore } from '@/stores/copilot.js'
import { usePaletteStore } from '@/stores/palette.js'

const layout = useLayoutStore()
const copilot = useCopilotStore()
const palette = usePaletteStore()

const top = [
  { id: 'explorer', label: 'Explorer', icon: Files },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'git', label: 'Source Control', icon: GitBranch },
  { id: 'debug', label: 'Run and Debug', icon: Bug },
  { id: 'extensions', label: 'Extensions', icon: Puzzle },
  { id: 'copilot', label: 'Open Copilot (Ctrl+Shift+C)', icon: Sparkles },
]

const bottom = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
]

function handleClick(id) {
  if (id === 'copilot') {
    copilot.show()
  } else if (id === 'settings') {
    palette.show('theme')
  } else {
    if (layout.activeActivity === id && layout.sidebarOpen) {
      layout.toggleSidebar()
    } else {
      layout.setActivity(id)
    }
  }
}
</script>

<template>
  <aside
    class="flex w-12 shrink-0 flex-col items-center justify-between border-r border-border bg-activitybar py-1"
  >
    <div class="flex flex-col items-center">
      <button
        v-for="item in top"
        :key="item.id"
        :title="item.label"
        class="relative grid h-12 w-12 place-items-center text-muted hover:text-fg"
        :class="[
          layout.activeActivity === item.id && layout.sidebarOpen && item.id !== 'copilot'
            ? 'text-fg'
            : '',
        ]"
        @click="handleClick(item.id)"
      >
        <span
          v-if="layout.activeActivity === item.id && layout.sidebarOpen && item.id !== 'copilot'"
          class="absolute left-0 top-1 h-10 w-0.5 bg-accent"
        />
        <component :is="item.icon" :size="22" />
      </button>
    </div>
    <div class="flex flex-col items-center">
      <button
        v-for="item in bottom"
        :key="item.id"
        :title="item.label"
        class="grid h-12 w-12 place-items-center text-muted hover:text-fg"
        @click="handleClick(item.id)"
      >
        <component :is="item.icon" :size="20" />
      </button>
    </div>
  </aside>
</template>
