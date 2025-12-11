<template>
  <div 
    ref="element"
    :style="{ transform: `translateY(${offset}px)` }"
    class="transition-transform duration-300 ease-out"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  speed: { type: Number, default: 0.5 },
  maxOffset: { type: Number, default: 20 }
})

const element = ref(null)
const offset = ref(0)
let scrollHandler = null

onMounted(() => {
  scrollHandler = () => {
    if (!element.value) return
    const rect = element.value.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const elementCenter = rect.top + rect.height / 2
    const scrollProgress = (viewportHeight / 2 - elementCenter) * props.speed
    offset.value = Math.max(-props.maxOffset, Math.min(props.maxOffset, scrollProgress))
  }
  
  window.addEventListener('scroll', scrollHandler, { passive: true })
  scrollHandler()
})

onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
})
</script>
