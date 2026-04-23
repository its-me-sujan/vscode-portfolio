<script setup>
import {
  X,
  FileCode2,
  FileJson,
  FileText,
  FileType,
  FileCode,
  FileBadge,
} from 'lucide-vue-next'
import { useTabsStore } from '@/stores/tabs.js'
import { SECTIONS } from '@/data/sections.js'

const tabs = useTabsStore()

function iconFor(ext) {
  switch (ext) {
    case 'vue':
      return FileCode2
    case 'json':
      return FileJson
    case 'md':
      return FileText
    case 'ts':
      return FileType
    case 'yaml':
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
    case 'vue':
      return 'text-emerald-400'
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
  <div class="flex h-9 shrink-0 items-center overflow-x-auto border-b border-border bg-activitybar/70">
    <button
      v-for="id in tabs.openTabs"
      :key="id"
      class="group flex h-full shrink-0 items-center gap-2 border-r border-border px-3 text-sm transition-colors"
      :class="
        tabs.activeTab === id
          ? 'bg-tabActive text-fg border-t-2 border-t-accent'
          : 'bg-tab text-muted hover:text-fg'
      "
      @click="tabs.setActive(id)"
    >
      <component
        :is="iconFor(SECTIONS[id].icon)"
        :size="14"
        :class="iconColor(SECTIONS[id].icon)"
      />
      <span>{{ SECTIONS[id].title }}</span>
      <span
        class="grid h-4 w-4 place-items-center rounded opacity-0 hover:bg-panel group-hover:opacity-100"
        :class="tabs.activeTab === id ? 'opacity-100' : ''"
        @click.stop="tabs.closeTab(id)"
      >
        <X :size="12" />
      </span>
    </button>
  </div>
</template>
