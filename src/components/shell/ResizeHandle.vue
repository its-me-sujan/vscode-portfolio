<script setup>
const props = defineProps({
  direction: { type: String, default: 'horizontal' }, // 'horizontal' = resizes width
})
const emit = defineEmits(['resize'])

function onPointerDown(e) {
  const startX = e.clientX
  const startY = e.clientY
  e.preventDefault()

  function onMove(ev) {
    const dx = ev.clientX - startX
    const dy = ev.clientY - startY
    emit('resize', props.direction === 'horizontal' ? dx : -dy)
  }
  function onUp() {
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerup', onUp)
    document.body.style.cursor = ''
  }
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onUp)
  document.body.style.cursor = props.direction === 'horizontal' ? 'col-resize' : 'row-resize'
}
</script>

<template>
  <div
    class="relative z-10 shrink-0 bg-transparent transition hover:bg-accent/50"
    :class="
      direction === 'horizontal'
        ? 'w-1 cursor-col-resize'
        : 'h-1 cursor-row-resize'
    "
    :title="direction === 'horizontal' ? 'Drag to resize' : 'Drag to resize'"
    @pointerdown="onPointerDown"
  />
</template>
