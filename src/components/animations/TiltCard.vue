<template>
  <div
    ref="card"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    :style="cardStyle"
    class="transition-transform duration-300 ease-out"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  maxTilt: { type: Number, default: 10 },
  scale: { type: Number, default: 1.02 }
})

const card = ref(null)
const tiltX = ref(0)
const tiltY = ref(0)
const isHovering = ref(false)

const cardStyle = computed(() => ({
  transform: isHovering.value
    ? `perspective(1000px) rotateX(${tiltY.value}deg) rotateY(${tiltX.value}deg) scale(${props.scale})`
    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
}))

const handleMouseMove = (e) => {
  if (!card.value) return
  isHovering.value = true
  
  const rect = card.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  tiltX.value = ((x - centerX) / centerX) * props.maxTilt
  tiltY.value = ((centerY - y) / centerY) * props.maxTilt
}

const handleMouseLeave = () => {
  isHovering.value = false
  tiltX.value = 0
  tiltY.value = 0
}
</script>

// ============================================
// FILE: src/components/animations/DotGrid.vue
// ============================================


<style scoped>
.dot-grid {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.3;
}
</style>
