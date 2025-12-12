<template>
  <div>
    <h3 class="text-3xl font-bold text-gray-900 mb-8">❤️ Your Health Stats</h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <!-- Heart Rate -->
      <div class="group relative cursor-pointer h-full">
        <div class="absolute inset-0 bg-gradient-to-r from-red-300/20 to-pink-300/20 rounded-2xl blur-xl group-hover:blur-2xl transition duration-300 opacity-0 group-hover:opacity-100"></div>
        <div class="relative bg-gradient-to-br from-red-50 to-pink-50 border border-red-300/50 rounded-2xl p-6 text-center group-hover:border-red-500 group-hover:shadow-2xl group-hover:shadow-red-200/30 transition">
          <span class="text-6xl mb-3 block animate-pulse">❤️</span>
          <h5 class="text-4xl font-bold text-red-600">{{ heartRateCount }}</h5>
          <p class="text-sm text-red-700 mt-2 font-semibold">bpm</p>
          <div class="mt-4 h-2 bg-red-200 rounded-full overflow-hidden">
            <div class="h-full bg-red-600 rounded-full" style="width: 48%"></div>
          </div>
        </div>
      </div>

      <!-- Blood Pressure -->
      <div class="group relative cursor-pointer h-full">
        <div class="absolute inset-0 bg-gradient-to-r from-green-300/20 to-emerald-300/20 rounded-2xl blur-xl group-hover:blur-2xl transition duration-300 opacity-0 group-hover:opacity-100"></div>
        <div class="relative bg-gradient-to-br from-green-50 to-emerald-50 border border-green-300/50 rounded-2xl p-6 text-center group-hover:border-green-500 group-hover:shadow-2xl group-hover:shadow-green-200/30 transition">
          <span class="text-6xl mb-3 block">📊</span>
          <h5 class="text-3xl font-bold text-green-600">{{ stats.bloodPressure }}</h5>
          <p class="text-sm text-green-700 mt-2 font-semibold">Blood Pressure</p>
          <div class="mt-4 h-2 bg-green-200 rounded-full overflow-hidden">
            <div class="h-full bg-green-600 rounded-full" style="width: 64%"></div>
          </div>
        </div>
      </div>

      <!-- Blood Oxygen -->
      <div class="group relative cursor-pointer h-full">
        <div class="absolute inset-0 bg-gradient-to-r from-purple-300/20 to-indigo-300/20 rounded-2xl blur-xl group-hover:blur-2xl transition duration-300 opacity-0 group-hover:opacity-100"></div>
        <div class="relative bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-300/50 rounded-2xl p-6 text-center group-hover:border-purple-500 group-hover:shadow-2xl group-hover:shadow-purple-200/30 transition">
          <span class="text-6xl mb-3 block">⚡</span>
          <h5 class="text-4xl font-bold text-purple-600">{{ bloodOxygenCount }}%</h5>
          <p class="text-sm text-purple-700 mt-2 font-semibold">Blood Oxygen</p>
          <div class="mt-4 h-2 bg-purple-200 rounded-full overflow-hidden">
            <div class="h-full bg-purple-600 rounded-full" style="width: 98%"></div>
          </div>
        </div>
      </div>

      <!-- Sleep Duration -->
      <div class="group relative cursor-pointer h-full">
        <div class="absolute inset-0 bg-gradient-to-r from-orange-300/20 to-yellow-300/20 rounded-2xl blur-xl group-hover:blur-2xl transition duration-300 opacity-0 group-hover:opacity-100"></div>
        <div class="relative bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-300/50 rounded-2xl p-6 text-center group-hover:border-orange-500 group-hover:shadow-2xl group-hover:shadow-orange-200/30 transition">
          <span class="text-6xl mb-3 block animate-bounce">😴</span>
          <h5 class="text-4xl font-bold text-orange-600">{{ sleepCount }}</h5>
          <p class="text-sm text-orange-700 mt-2 font-semibold">Hours</p>
          <div class="mt-4 h-2 bg-orange-200 rounded-full overflow-hidden">
            <div class="h-full bg-orange-600 rounded-full" style="width: 58%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  stats: {
    type: Object,
    required: true
  }
})

const heartRateCount = ref(0)
const bloodOxygenCount = ref(0)
const sleepCount = ref(0)

const animateCounter = (current, target, duration = 2000) => {
  const increment = target / (duration / 50)
  const interval = setInterval(() => {
    current.value += increment
    if (current.value >= target) {
      current.value = target
      clearInterval(interval)
    }
  }, 50)
}

onMounted(() => {
  animateCounter(heartRateCount, props.stats.heartRate)
  animateCounter(bloodOxygenCount, props.stats.bloodOxygen)
  animateCounter(sleepCount, props.stats.sleepDuration)
})
</script>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>