import { onBeforeUnmount, onMounted } from 'vue'
import { useTabsStore } from '@/stores/tabs.js'
import { useLayoutStore } from '@/stores/layout.js'
import { usePaletteStore } from '@/stores/palette.js'
import { useCopilotStore } from '@/stores/copilot.js'

export function useKeybindings() {
  const tabs = useTabsStore()
  const layout = useLayoutStore()
  const palette = usePaletteStore()
  const copilot = useCopilotStore()

  function handler(e) {
    const mod = e.ctrlKey || e.metaKey

    // Command palette: Ctrl+P / Ctrl+Shift+P
    if (mod && (e.key === 'p' || e.key === 'P')) {
      e.preventDefault()
      palette.show('all')
      return
    }
    // Toggle sidebar: Ctrl+B
    if (mod && !e.shiftKey && (e.key === 'b' || e.key === 'B')) {
      e.preventDefault()
      layout.toggleSidebar()
      return
    }
    // Toggle terminal: Ctrl+`  (some keyboards fire `Backquote`)
    if (mod && (e.key === '`' || e.code === 'Backquote')) {
      e.preventDefault()
      layout.toggleTerminal()
      return
    }
    // Copilot: Ctrl+Shift+C
    if (mod && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
      e.preventDefault()
      copilot.toggle()
      return
    }
    // Reopen closed tab: Ctrl+Shift+T
    if (mod && e.shiftKey && (e.key === 'T' || e.key === 't')) {
      e.preventDefault()
      tabs.reopenLastClosed()
      return
    }
    // Esc: close topmost overlay
    if (e.key === 'Escape') {
      if (palette.open) {
        palette.hide()
        e.preventDefault()
      } else if (copilot.open) {
        copilot.hide()
        e.preventDefault()
      } else if (layout.terminalOpen) {
        layout.toggleTerminal()
        e.preventDefault()
      }
    }
  }

  onMounted(() => window.addEventListener('keydown', handler))
  onBeforeUnmount(() => window.removeEventListener('keydown', handler))
}
