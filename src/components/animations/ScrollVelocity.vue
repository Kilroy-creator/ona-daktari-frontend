<template>
  <div class="overflow-hidden">
    <div
      ref="content"
      :style="{ transform: `translateX(${offset}px)` }"
      class="whitespace-nowrap transition-transform duration-100"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  velocity: { type: Number, default: 1 }
})

const content = ref(null)
const offset = ref(0)
let lastScroll = 0
let scrollHandler = null

onMounted(() => {
  scrollHandler = () => {
    const currentScroll = window.scrollY
    const delta = currentScroll - lastScroll
    offset.value -= delta * props.velocity
    lastScroll = currentScroll
  }
  
  window.addEventListener('scroll', scrollHandler, { passive: true })
})

onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
})
</script>