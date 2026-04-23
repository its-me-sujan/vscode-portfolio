import { defineStore } from 'pinia'
import { ref } from 'vue'
import { GREETING } from '@/data/copilotReplies.js'

export const useCopilotStore = defineStore('copilot', () => {
  const open = ref(false)
  const messages = ref([{ id: 'greeting', role: 'bot', text: GREETING, at: Date.now() }])
  const typing = ref(false)

  function show() {
    open.value = true
  }
  function hide() {
    open.value = false
  }
  function toggle() {
    open.value = !open.value
  }

  function pushUser(text) {
    messages.value.push({ id: `u-${Date.now()}`, role: 'user', text, at: Date.now() })
  }

  function pushBot(text) {
    messages.value.push({ id: `b-${Date.now()}`, role: 'bot', text, at: Date.now() })
  }

  return { open, messages, typing, show, hide, toggle, pushUser, pushBot }
})
