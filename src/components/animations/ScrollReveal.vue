<template>
  <div ref="element" :class="{ 'opacity-0': !isVisible }">
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  delay: { type: Number, default: 0 },
  duration: { type: Number, default: 600 },
  distance: { type: String, default: '50px' },
  origin: { type: String, default: 'bottom' }
})

const element = ref(null)
const isVisible = ref(false)

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          isVisible.value = true
          element.value.style.transition = `all ${props.duration}ms ease`
          element.value.style.opacity = '1'
          element.value.style.transform = 'translate(0, 0)'
        }, props.delay)
        observer.disconnect()
      }
    },
    { threshold: 0.1 }
  )

  if (element.value) {
    const transforms = {
      bottom: `translateY(${props.distance})`,
      top: `translateY(-${props.distance})`,
      left: `translateX(-${props.distance})`,
      right: `translateX(${props.distance})`
    }
    element.value.style.transform = transforms[props.origin]
    observer.observe(element.value)
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>