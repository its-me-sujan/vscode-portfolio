<script setup>
import { nextTick, ref, useTemplateRef, watch } from 'vue'
import { X, Send, Sparkles, Plus } from 'lucide-vue-next'
import { useCopilotStore } from '@/stores/copilot.js'
import { useCopilotBot } from '@/composables/useCopilotBot.js'

const copilot = useCopilotStore()
const { ask } = useCopilotBot()

const input = ref('')
const inputRef = useTemplateRef('inputRef')
const scroller = useTemplateRef('scroller')

async function onSubmit() {
  const text = input.value
  if (!text.trim()) return
  input.value = ''
  await ask(text)
  nextTick(scrollToBottom)
}

function scrollToBottom() {
  const el = scroller.value
  if (el) el.scrollTop = el.scrollHeight
}

watch(
  () => copilot.open,
  (v) => {
    if (v) {
      nextTick(() => {
        inputRef.value?.focus()
        scrollToBottom()
      })
    }
  },
)

watch(
  () => copilot.messages.length,
  () => nextTick(scrollToBottom),
)

const suggestions = [
  "Tell me about their work",
  'What skills are in the stack?',
  "Show me some projects",
  'How do I get in touch?',
]
</script>

<template>
  <aside
    v-if="copilot.open"
    class="fixed right-0 top-8 bottom-6 z-40 flex w-[380px] max-w-[95vw] flex-col border-l border-border bg-panel shadow-2xl animate-slide-in-right"
  >
    <header class="flex items-center justify-between border-b border-border px-3 py-2">
      <div class="flex items-center gap-2">
        <Sparkles :size="14" class="text-accent" />
        <span class="text-sm font-semibold">Copilot Chat</span>
      </div>
      <div class="flex items-center gap-1">
        <button class="grid h-6 w-6 place-items-center rounded hover:bg-tab" title="New chat">
          <Plus :size="14" />
        </button>
        <button
          class="grid h-6 w-6 place-items-center rounded hover:bg-tab"
          title="Close"
          @click="copilot.hide"
        >
          <X :size="14" />
        </button>
      </div>
    </header>

    <div ref="scroller" class="flex-1 space-y-3 overflow-y-auto px-3 py-3 text-sm">
      <div
        v-for="m in copilot.messages"
        :key="m.id"
        class="flex"
        :class="m.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div
          class="max-w-[80%] rounded-lg px-3 py-2 leading-snug"
          :class="
            m.role === 'user'
              ? 'bg-accent/30 text-fg'
              : 'bg-tab text-fg/90'
          "
        >
          {{ m.text }}
        </div>
      </div>
      <div v-if="copilot.typing" class="flex justify-start">
        <div class="flex gap-1 rounded-lg bg-tab px-3 py-2">
          <span class="h-2 w-2 rounded-full bg-muted animate-typing" style="animation-delay: 0s" />
          <span class="h-2 w-2 rounded-full bg-muted animate-typing" style="animation-delay: 0.15s" />
          <span class="h-2 w-2 rounded-full bg-muted animate-typing" style="animation-delay: 0.3s" />
        </div>
      </div>
    </div>

    <div v-if="copilot.messages.length <= 1" class="flex flex-wrap gap-2 border-t border-border px-3 py-2">
      <button
        v-for="s in suggestions"
        :key="s"
        class="rounded-full border border-border bg-tab px-3 py-1 text-[11px] text-fg/80 hover:text-fg hover:border-accent"
        @click="ask(s)"
      >
        {{ s }}
      </button>
    </div>

    <form class="flex items-center gap-2 border-t border-border px-3 py-2" @submit.prevent="onSubmit">
      <input
        ref="inputRef"
        v-model="input"
        class="flex-1 rounded border border-border bg-tab px-2 py-1.5 text-sm outline-none focus:border-accent"
        placeholder="Send a message"
      />
      <button
        type="submit"
        class="grid h-8 w-8 place-items-center rounded border border-border bg-tab hover:border-accent"
        aria-label="Send"
      >
        <Send :size="14" />
      </button>
    </form>
  </aside>
</template>
