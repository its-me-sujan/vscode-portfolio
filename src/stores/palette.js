import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePaletteStore = defineStore('palette', () => {
  const open = ref(false)
  const query = ref('')
  const mode = ref('all') // 'all' | 'theme'

  function show(initialMode = 'all') {
    mode.value = initialMode
    query.value = ''
    open.value = true
  }
  function hide() {
    open.value = false
  }
  function toggle() {
    open.value ? hide() : show('all')
  }

  return { open, query, mode, show, hide, toggle }
})
