<script setup>
import { nextTick, ref, useTemplateRef, watch } from 'vue'
import { X, Plus, Trash2 } from 'lucide-vue-next'
import { useTabsStore } from '@/stores/tabs.js'
import { useLayoutStore } from '@/stores/layout.js'
import { useThemeStore } from '@/stores/theme.js'
import { useTerminalCommands } from '@/composables/useTerminalCommands.js'

const tabs = useTabsStore()
const layout = useLayoutStore()
const theme = useThemeStore()

const lines = ref([
  { kind: 'info', text: "Welcome to the portfolio terminal — type 'help' to get started." },
])
const history = ref([])
const historyIndex = ref(-1)
const input = ref('')
const scroller = useTemplateRef('scroller')
const inputRef = useTemplateRef('inputRef')

function clearTerminal() {
  lines.value = []
}

const { run } = useTerminalCommands({ tabs, theme, layout, clearTerminal })

function onSubmit() {
  const text = input.value
  const prompt = { kind: 'prompt', text }
  if (text.trim()) {
    history.value.push(text)
    historyIndex.value = history.value.length
  }
  lines.value.push(prompt)
  const output = run(text)
  for (const line of output) lines.value.push({ kind: 'out', text: line })
  input.value = ''
  nextTick(scrollToBottom)
}

function scrollToBottom() {
  const el = scroller.value
  if (el) el.scrollTop = el.scrollHeight
}

function onKeyDown(e) {
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (!history.value.length) return
    historyIndex.value = Math.max(0, historyIndex.value - 1)
    input.value = history.value[historyIndex.value] ?? ''
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    historyIndex.value = Math.min(history.value.length, historyIndex.value + 1)
    input.value = history.value[historyIndex.value] ?? ''
  }
}

watch(
  () => layout.terminalOpen,
  (open) => {
    if (open) nextTick(() => inputRef.value?.focus())
  },
)
</script>

<template>
  <div
    class="flex shrink-0 flex-col overflow-hidden border-t border-border bg-terminal text-xs text-fg"
    :style="{ height: layout.terminalHeight + 'px' }"
  >
    <div class="flex items-center justify-between border-b border-border bg-panel/60 px-3 py-1 text-[11px]">
      <div class="flex gap-4">
        <span class="border-b-2 border-accent pb-1 text-fg">TERMINAL</span>
        <span class="text-muted">PROBLEMS</span>
        <span class="text-muted">OUTPUT</span>
      </div>
      <div class="flex items-center gap-1">
        <button class="grid h-6 w-6 place-items-center rounded hover:bg-panel" title="New Terminal">
          <Plus :size="12" />
        </button>
        <button
          class="grid h-6 w-6 place-items-center rounded hover:bg-panel"
          title="Clear Terminal"
          @click="clearTerminal"
        >
          <Trash2 :size="12" />
        </button>
        <button
          class="grid h-6 w-6 place-items-center rounded hover:bg-panel"
          title="Close Terminal"
          @click="layout.toggleTerminal"
        >
          <X :size="12" />
        </button>
      </div>
    </div>
    <div
      ref="scroller"
      class="flex-1 overflow-y-auto px-3 py-2 font-mono leading-5"
      @click="inputRef?.focus()"
    >
      <div v-for="(line, i) in lines" :key="i">
        <template v-if="line.kind === 'prompt'">
          <span class="text-green-400">visitor@portfolio</span>
          <span class="text-muted">:</span>
          <span class="text-blue-400">~</span>
          <span class="text-muted">$ </span>
          <span>{{ line.text }}</span>
        </template>
        <template v-else-if="line.kind === 'info'">
          <span class="italic text-muted">{{ line.text }}</span>
        </template>
        <template v-else>
          <span>{{ line.text }}</span>
        </template>
      </div>
      <form class="flex items-center" @submit.prevent="onSubmit">
        <span class="text-green-400">visitor@portfolio</span>
        <span class="text-muted">:</span>
        <span class="text-blue-400">~</span>
        <span class="text-muted">$&nbsp;</span>
        <input
          ref="inputRef"
          v-model="input"
          class="border-0 bg-transparent font-mono caret-transparent outline-none"
          :style="{ width: input.length + 'ch' }"
          spellcheck="false"
          autocomplete="off"
          @keydown="onKeyDown"
        />
        <span class="inline-block h-3 w-1.5 bg-fg animate-blink" />
        <span class="flex-1" />
      </form>
    </div>
  </div>
</template>
