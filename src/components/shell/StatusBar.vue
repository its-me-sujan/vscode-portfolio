<script setup>
import { computed } from 'vue'
import { GitBranch, Wifi, Bell, TerminalSquare, Palette, Check } from 'lucide-vue-next'
import { useTabsStore } from '@/stores/tabs.js'
import { useLayoutStore } from '@/stores/layout.js'
import { usePaletteStore } from '@/stores/palette.js'
import { useThemeStore, THEMES } from '@/stores/theme.js'

const tabs = useTabsStore()
const layout = useLayoutStore()
const palette = usePaletteStore()
const theme = useThemeStore()

const currentThemeLabel = computed(
  () => THEMES.find((t) => t.id === theme.current)?.label ?? 'Theme',
)
</script>

<template>
  <div
    class="flex h-6 shrink-0 items-center justify-between bg-statusbar px-3 text-[11px] text-white"
  >
    <div class="flex items-center gap-3">
      <span class="flex items-center gap-1">
        <GitBranch :size="12" />
        main
      </span>
      <span class="flex items-center gap-1">
        <Check :size="12" />
        0 ↑ 0 ↓
      </span>
      <button
        class="flex items-center gap-1 rounded px-1 hover:bg-white/20"
        @click="layout.toggleTerminal"
      >
        <TerminalSquare :size="12" />
        Terminal
      </button>
    </div>
    <div class="flex items-center gap-3">
      <button
        class="flex items-center gap-1 rounded px-1 hover:bg-white/20"
        @click="palette.show('theme')"
      >
        <Palette :size="12" />
        {{ currentThemeLabel }}
      </button>
      <span>{{ tabs.activeSection?.language ?? 'Plain' }}</span>
      <span>UTF-8</span>
      <span>LF</span>
      <Wifi :size="12" />
      <Bell :size="12" />
    </div>
  </div>
</template>
