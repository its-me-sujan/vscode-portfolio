<script setup>
import TitleBar from '@/components/shell/TitleBar.vue'
import ActivityBar from '@/components/shell/ActivityBar.vue'
import Sidebar from '@/components/shell/Sidebar.vue'
import ResizeHandle from '@/components/shell/ResizeHandle.vue'
import TabBar from '@/components/shell/TabBar.vue'
import EditorArea from '@/components/shell/EditorArea.vue'
import Terminal from '@/components/shell/Terminal.vue'
import StatusBar from '@/components/shell/StatusBar.vue'
import CommandPalette from '@/components/overlays/CommandPalette.vue'
import CopilotChat from '@/components/overlays/CopilotChat.vue'
import { useLayoutStore } from '@/stores/layout.js'
import { useThemeStore } from '@/stores/theme.js'
import { useKeybindings } from '@/composables/useKeybindings.js'

const layout = useLayoutStore()
useThemeStore() // ensures theme attribute is applied
useKeybindings()

function onSidebarResize(dx) {
  layout.sidebarWidth = Math.min(480, Math.max(180, layout.sidebarWidth + dx))
}
function onTerminalResize(dy) {
  layout.terminalHeight = Math.min(500, Math.max(120, layout.terminalHeight + dy))
}
</script>

<template>
  <div class="flex h-full w-full flex-col bg-bg text-fg">
    <TitleBar />
    <div class="flex min-h-0 flex-1">
      <ActivityBar />
      <template v-if="layout.sidebarOpen">
        <Sidebar />
        <ResizeHandle direction="horizontal" @resize="onSidebarResize" />
      </template>
      <main class="flex min-w-0 flex-1 flex-col">
        <TabBar />
        <EditorArea />
        <template v-if="layout.terminalOpen">
          <ResizeHandle direction="vertical" @resize="onTerminalResize" />
          <Terminal />
        </template>
      </main>
    </div>
    <StatusBar />
    <CommandPalette />
    <CopilotChat />
  </div>
</template>
