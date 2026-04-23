import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { SECTIONS } from '@/data/sections.js'

export const useTabsStore = defineStore('tabs', () => {
  const openTabs = ref(['home'])
  const activeTab = ref('home')
  const closedStack = ref([])
  const toastMessage = ref('')
  let toastTimer = null

  const activeSection = computed(() => SECTIONS[activeTab.value] ?? null)

  function openTab(id) {
    if (!SECTIONS[id]) return
    if (!openTabs.value.includes(id)) openTabs.value.push(id)
    activeTab.value = id
  }

  function closeTab(id) {
    const idx = openTabs.value.indexOf(id)
    if (idx === -1) return
    if (openTabs.value.length === 1) {
      showToast("You can't close a portfolio! 😄")
      return
    }
    openTabs.value.splice(idx, 1)
    closedStack.value.push(id)
    if (activeTab.value === id) {
      activeTab.value = openTabs.value[Math.max(0, idx - 1)] || openTabs.value[0]
    }
  }

  function reopenLastClosed() {
    const id = closedStack.value.pop()
    if (id) openTab(id)
  }

  function setActive(id) {
    if (openTabs.value.includes(id)) activeTab.value = id
  }

  function showToast(msg) {
    toastMessage.value = msg
    if (toastTimer) clearTimeout(toastTimer)
    toastTimer = setTimeout(() => {
      toastMessage.value = ''
    }, 2200)
  }

  return {
    openTabs,
    activeTab,
    closedStack,
    toastMessage,
    activeSection,
    openTab,
    closeTab,
    reopenLastClosed,
    setActive,
    showToast,
  }
})
