<template>
  <div class="split-text-container">
    <span
      v-for="(char, index) in characters"
      :key="index"
      class="split-char"
      :style="{ animationDelay: `${index * 0.05}s` }"
    >
      {{ char === ' ' ? '\u00A0' : char }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: { type: String, required: true }
})

const characters = computed(() => props.text.split(''))
</script>

<style scoped>
.split-text-container {
  display: inline-block;
}

.split-char {
  display: inline-block;
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
