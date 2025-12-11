<template>
  <button
    ref="button"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    :style="buttonStyle"
    class="relative transition-transform duration-200 ease-out"
  >
    <slot />
  </button>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  strength: { type: Number, default: 0.3 }
})

const button = ref(null)
const offsetX = ref(0)
const offsetY = ref(0)

const buttonStyle = computed(() => ({
  transform: `translate(${offsetX.value}px, ${offsetY.value}px)`
}))

const handleMouseMove = (e) => {
  if (!button.value) return
  
  const rect = button.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  
  offsetX.value = (e.clientX - centerX) * props.strength
  offsetY.value = (e.clientY - centerY) * props.strength
}

const handleMouseLeave = () => {
  offsetX.value = 0
  offsetY.value = 0
}
</script>