<template><div class="vb-spot" ref="root"><slot/></div></template>
<script setup>
import { onMounted, ref } from 'vue'
const root = ref(null)
onMounted(()=>{
  const el = root.value
  el.style.position='relative'
  const spot = document.createElement('div')
  spot.style.position='absolute'; spot.style.left=0; spot.style.top=0; spot.style.right=0; spot.style.bottom=0;
  spot.style.background='radial-gradient(400px 200px at var(--x,50%) var(--y,50%), rgba(255,255,255,.08), transparent)';
  spot.style.pointerEvents='none'
  el.appendChild(spot)
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect()
    const x = ((e.clientX-r.left)/r.width)*100+'%'
    const y = ((e.clientY-r.top)/r.height)*100+'%'
    el.style.setProperty('--x', x); el.style.setProperty('--y', y)
  })
})
</script>
<style scoped>.vb-spot{overflow:visible}</style>
