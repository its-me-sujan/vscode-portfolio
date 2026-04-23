import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'
import { useLocalStorage } from '@vueuse/core'

const ZOOM_MIN = 0.5
const ZOOM_MAX = 2.0
const ZOOM_STEP = 0.1

function clampZoom(v) {
  return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round(v * 10) / 10))
}

export const useLayoutStore = defineStore('layout', () => {
  const sidebarOpen = ref(true)
  const terminalOpen = ref(false)
  const sidebarWidth = useLocalStorage('portfolio:sidebarWidth', 260)
  const terminalHeight = useLocalStorage('portfolio:terminalHeight', 220)
  const zoomLevel = useLocalStorage('portfolio:zoomLevel', 1.0)
  const activeActivity = ref('explorer')

  watchEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.zoom = String(zoomLevel.value)
    }
  })

  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value
  }
  function toggleTerminal() {
    terminalOpen.value = !terminalOpen.value
  }
  function setActivity(id) {
    activeActivity.value = id
    if (id && !sidebarOpen.value) sidebarOpen.value = true
  }
  function zoomIn() {
    zoomLevel.value = clampZoom(zoomLevel.value + ZOOM_STEP)
  }
  function zoomOut() {
    zoomLevel.value = clampZoom(zoomLevel.value - ZOOM_STEP)
  }
  function resetZoom() {
    zoomLevel.value = 1.0
  }
  async function toggleFullScreen() {
    if (typeof document === 'undefined') return
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen?.()
    } else {
      await document.exitFullscreen?.()
    }
  }

  return {
    sidebarOpen,
    terminalOpen,
    sidebarWidth,
    terminalHeight,
    zoomLevel,
    activeActivity,
    toggleSidebar,
    toggleTerminal,
    setActivity,
    zoomIn,
    zoomOut,
    resetZoom,
    toggleFullScreen,
  }
})
