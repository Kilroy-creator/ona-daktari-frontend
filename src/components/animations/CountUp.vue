<template>
  <span>{{ displayValue }}</span>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  endValue: { type: Number, required: true },
  duration: { type: Number, default: 2000 },
  startValue: { type: Number, default: 0 },
  suffix: { type: String, default: '' },
  prefix: { type: String, default: '' }
})

const displayValue = ref(props.startValue)

const animate = () => {
  const startTime = Date.now()
  const endTime = startTime + props.duration
  const range = props.endValue - props.startValue

  const update = () => {
    const now = Date.now()
    const progress = Math.min((now - startTime) / props.duration, 1)
    const easeOutQuad = 1 - (1 - progress) * (1 - progress)
    
    displayValue.value = Math.floor(props.startValue + (range * easeOutQuad))

    if (now < endTime) {
      requestAnimationFrame(update)
    } else {
      displayValue.value = props.endValue
    }
  }

  requestAnimationFrame(update)
}

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        animate()
        observer.disconnect()
      }
    },
    { threshold: 0.5 }
  )
  observer.observe(document.querySelector('span'))
})

watch(() => props.endValue, () => animate())
</script>