<template>
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      v-for="(particle, index) in particles"
      :key="index"
      class="particle"
      :style="particleStyle(particle)"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  count: { type: Number, default: 30 }
})

const particles = ref([])

onMounted(() => {
  particles.value = Array.from({ length: props.count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }))
})

const particleStyle = (particle) => ({
  left: `${particle.x}%`,
  top: `${particle.y}%`,
  width: `${particle.size}px`,
  height: `${particle.size}px`,
  animationDuration: `${particle.duration}s`,
  animationDelay: `${particle.delay}s`
})
</script>

<style scoped>
.particle {
  position: absolute;
  background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
  border-radius: 50%;
  animation: float-particle infinite ease-in-out;
}

@keyframes float-particle {
  0%, 100% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  50% {
    transform: translateY(-100px) translateX(50px);
  }
}
</style>
