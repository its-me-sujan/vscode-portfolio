import { defineStore } from 'pinia'
import { watchEffect } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export const THEMES = [
  { id: 'dark', label: 'Your Dark (Default)' },
  { id: 'catppuccin', label: 'Catppuccin Mocha' },
  { id: 'tokyo', label: 'Tokyo Night' },
  { id: 'gruvbox', label: 'Gruvbox Dark' },
  { id: 'nord', label: 'Nord' },
]

export const useThemeStore = defineStore('theme', () => {
  const current = useLocalStorage('portfolio:theme', 'dark')

  watchEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = current.value
    }
  })

  function setTheme(id) {
    if (THEMES.some((t) => t.id === id)) current.value = id
  }

  return { current, setTheme }
})
