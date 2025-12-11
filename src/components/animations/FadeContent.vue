<template>
  <div
    ref="element"
    :class="{ 'opacity-0': !isVisible }"
    class="transition-all duration-700 ease-out"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const element = ref(null)
const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
    if (element.value) {
      element.value.style.opacity = '1'
      element.value.style.transform = 'translateY(0)'
    }
  }, 100)
})
</script>