<template>
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <svg class="w-full h-full">
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(59, 130, 246);stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:rgb(147, 51, 234);stop-opacity:0.1" />
        </linearGradient>
      </defs>
      <path
        v-for="(line, index) in lines"
        :key="index"
        :d="line.path"
        stroke="url(#lineGradient)"
        stroke-width="2"
        fill="none"
        class="animate-draw"
        :style="{ animationDelay: `${index * 0.5}s` }"
      />
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const lines = ref([])

onMounted(() => {
  lines.value = Array.from({ length: 5 }, (_, i) => ({
    path: `M ${i * 200} 0 Q ${i * 200 + 100} ${100 + i * 50} ${i * 200 + 200} ${i * 100}`
  }))
})
</script>

<style scoped>
@keyframes draw {
  from {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
  }
}

.animate-draw {
  animation: draw 3s ease-in-out infinite alternate;
}
</style>