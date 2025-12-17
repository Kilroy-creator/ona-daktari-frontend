<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <!-- Pending Requests -->
    <div class="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20 hover:border-yellow-500/40 transition">
      <div class="flex items-center justify-between mb-4">
        <div class="p-3 bg-yellow-500/20 rounded-xl">
          <img src="/pending.png" alt="Pending" class="w-6 h-6" />
        </div>
        <span class="text-yellow-400 text-sm font-semibold">Pending Requests</span>
      </div>
      <div class="text-4xl font-bold text-white mb-2">
        {{ animatedPending }}
      </div>
      <p class="text-gray-400 text-sm">Awaiting action</p>
      <div class="mt-4 w-full bg-yellow-500/20 rounded-full h-2">
        <div class="bg-yellow-500 h-2 rounded-full transition-all duration-1000" :style="{ width: '60%' }"></div>
      </div>
    </div>

    <!-- Total Patients -->
    <div class="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20 hover:border-green-500/40 transition">
      <div class="flex items-center justify-between mb-4">
        <div class="p-3 bg-green-500/20 rounded-xl">
         <img src="/multiple-users-silhouette.png" alt="Patients" class="w-6 h-6" />
        </div>
        <span class="text-green-400 text-sm font-semibold">Total Patients</span>
      </div>
      <div class="text-4xl font-bold text-white mb-2">
        {{ animatedPatients }}
      </div>
      <p class="text-gray-400 text-sm">All time</p>
      <div class="mt-4 w-full bg-green-500/20 rounded-full h-2">
        <div class="bg-green-500 h-2 rounded-full transition-all duration-1000" :style="{ width: '85%' }"></div>
      </div>
    </div>

    <!-- Messages -->
    <div class="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition">
      <div class="flex items-center justify-between mb-4">
        <div class="p-3 bg-blue-500/20 rounded-xl">
          <img src="/message.png" alt="Messages" class="w-6 h-6" />
        </div>
        <span class="text-blue-400 text-sm font-semibold">Messages</span>
      </div>
      <div class="text-4xl font-bold text-white mb-2">
        {{ animatedMessages }}
      </div>
      <p class="text-gray-400 text-sm">Unread</p>
      <div class="mt-4 w-full bg-blue-500/20 rounded-full h-2">
        <div class="bg-blue-500 h-2 rounded-full transition-all duration-1000" :style="{ width: '40%' }"></div>
      </div>
    </div>

    <!-- Rating -->
    <div class="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition">
      <div class="flex items-center justify-between mb-4">
        <div class="p-3 bg-purple-500/20 rounded-xl">
          <img src="/rating.png" alt="Rating" class="w-6 h-6" />
        </div>
        <span class="text-purple-400 text-sm font-semibold">Rating</span>
      </div>
      <div class="text-4xl font-bold text-white mb-2">
        {{ animatedRating }}
      </div>
      <p class="text-gray-400 text-sm">/ 5.0 Rating</p>
      <div class="mt-4 w-full bg-purple-500/20 rounded-full h-2">
        <div class="bg-purple-500 h-2 rounded-full transition-all duration-1000" :style="{ width: '96%' }"></div>
      </div>
    </div>

    <!-- Completed Appointments -->
    <div class="bg-gradient-to-br from-green-500/10 to-teal-500/10 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20 hover:border-green-500/40 transition">
      <div class="flex items-center justify-between mb-4">
        <div class="p-3 bg-green-500/20 rounded-xl">
          <img src="/medical-appointment.png" alt="Completed" class="w-6 h-6" />
        </div>
        <span class="text-green-400 text-sm font-semibold">Completed</span>
      </div>
      <div class="text-4xl font-bold text-white mb-2">
        {{ animatedCompleted }}
      </div>
      <p class="text-gray-400 text-sm">Appointments</p>
      <div class="mt-4 w-full bg-green-500/20 rounded-full h-2">
        <div class="bg-green-500 h-2 rounded-full transition-all duration-1000" :style="{ width: '100%' }"></div>
      </div>
    </div>

    <!-- Success Rate -->
    <div class="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition">
      <div class="flex items-center justify-between mb-4">
        <div class="p-3 bg-blue-500/20 rounded-xl">
          <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <span class="text-blue-400 text-sm font-semibold">Success Rate</span>
      </div>
      <div class="text-4xl font-bold text-white mb-2">
        {{ animatedSuccess }}%
      </div>
      <p class="text-gray-400 text-sm">Patient Satisfaction</p>
      <div class="mt-4 w-full bg-blue-500/20 rounded-full h-2">
        <div class="bg-blue-500 h-2 rounded-full transition-all duration-1000" :style="{ width: stats.successRate + '%' }"></div>
      </div>
    </div>

    <!-- Next Appointment -->
    <div class="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20 hover:border-red-500/40 transition lg:col-span-2">
      <div class="flex items-center justify-between mb-4">
        <div class="p-3 bg-red-500/20 rounded-xl">
          <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <span class="text-red-400 text-sm font-semibold">Next Appointment</span>
      </div>
      <div class="text-3xl font-bold text-white mb-2">
        {{ stats.nextAppointment }}
      </div>
      <p class="text-gray-400 text-sm">Today</p>
      <div class="mt-4 flex gap-3">
        <button class="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition text-sm font-semibold">
          View Details
        </button>
        <button class="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition text-sm font-semibold">
          Start Consultation
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
  stats: {
    type: Object,
    required: true,
    default: () => ({
      pendingRequests: 0,
      totalPatients: 0,
      unreadMessages: 0,
      rating: 0,
      completedAppointments: 0,
      successRate: 0,
      nextAppointment: 'No upcoming appointments'
    })
  }
})

// Animated values
const animatedPending = ref(0)
const animatedPatients = ref(0)
const animatedMessages = ref(0)
const animatedRating = ref(0)
const animatedCompleted = ref(0)
const animatedSuccess = ref(0)

// Animation function
const animateValue = (target, endValue, decimals = 0) => {
  const duration = 2000
  const startTime = Date.now()
  const startValue = 0

  const step = () => {
    const currentTime = Date.now()
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const currentValue = startValue + (endValue - startValue) * easeOutQuart

    target.value = decimals > 0 
      ? currentValue.toFixed(decimals)
      : Math.floor(currentValue)

    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      target.value = decimals > 0 ? endValue.toFixed(decimals) : endValue
    }
  }

  requestAnimationFrame(step)
}

// Start animations on mount
onMounted(() => {
  animateValue(animatedPending, props.stats.pendingRequests, 0)
  animateValue(animatedPatients, props.stats.totalPatients, 0)
  animateValue(animatedMessages, props.stats.unreadMessages, 0)
  animateValue(animatedRating, props.stats.rating, 1)
  animateValue(animatedCompleted, props.stats.completedAppointments, 0)
  animateValue(animatedSuccess, props.stats.successRate, 0)
})

// Watch for stats changes
watch(() => props.stats, (newStats) => {
  animateValue(animatedPending, newStats.pendingRequests, 0)
  animateValue(animatedPatients, newStats.totalPatients, 0)
  animateValue(animatedMessages, newStats.unreadMessages, 0)
  animateValue(animatedRating, newStats.rating, 1)
  animateValue(animatedCompleted, newStats.completedAppointments, 0)
  animateValue(animatedSuccess, newStats.successRate, 0)
}, { deep: true })
</script>