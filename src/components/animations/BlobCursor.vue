<template><div ref="b" class="vb-blob" /></template>
<script setup>
import { onMounted, ref } from 'vue'
const b = ref(null)
onMounted(()=> {
  const blob = b.value
  blob.style.position = 'fixed'; blob.style.pointerEvents='none'; blob.style.zIndex='9999';
  blob.style.width='48px'; blob.style.height='48px'; blob.style.borderRadius='50%'; blob.style.background='rgba(99,102,241,.12)';
  window.addEventListener('mousemove', e => {
    blob.style.transform = `translate(${e.clientX-24}px, ${e.clientY-24}px)`
  })
})
</script>
<style scoped>.vb-blob{transition:transform .08s linear}</style>
