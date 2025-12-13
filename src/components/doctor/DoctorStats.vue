<template>
  <div>
    <!-- Primary Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <!-- Pending Requests -->
      <div class="group relative cursor-pointer h-full">
        <div class="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition duration-300 opacity-0 group-hover:opacity-100"></div>
        <div class="relative bg-gradient-to-br from-yellow-50 via-yellow-50 to-orange-50 backdrop-blur-sm border border-yellow-300/50 rounded-2xl p-8 overflow-hidden group-hover:border-yellow-500/60 transition hover:shadow-2xl hover:shadow-yellow-200/30">
          <div class="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition duration-300"></div>
          <div class="relative">
            <p class="text-yellow-700 text-sm font-semibold mb-3">⏳ Pending Requests</p>
            <h3 class="text-5xl font-bold text-yellow-600">{{ pendingCount }}</h3>
            <p class="text-yellow-600 text-xs mt-2 font-medium">Awaiting action</p>
            <div class="mt-4 h-2 bg-yellow-200 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" style="width: 45%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Patients -->
      <div class="group relative cursor-pointer h-full">
        <div class="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition duration-300 opacity-0 group-hover:opacity-100"></div>
        <div class="relative bg-gradient-to-br from-green-50 via-green-50 to-emerald-50 backdrop-blur-sm border border-green-300/50 rounded-2xl p-8 overflow-hidden group-hover:border-green-500/60 transition hover:shadow-2xl hover:shadow-green-200/30">
          <div class="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition duration-300"></div>
          <div class="relative">
            <p class="text-green-700 text-sm font-semibold mb-3">👥 Total Patients</p>
            <h3 class="text-5xl font-bold text-green-600">{{ patientsCount }}</h3>
            <p class="text-green-600 text-xs mt-2 font-medium">All time</p>
            <div class="mt-4 h-2 bg-green-200 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style="width: 78%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Messages -->
      <div class="group relative cursor-pointer h-full">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition duration-300 opacity-0 group-hover:opacity-100"></div>
        <div class="relative bg-gradient-to-br from-blue-50 via-blue-50 to-cyan-50 backdrop-blur-sm border border-blue-300/50 rounded-2xl p-8 overflow-hidden group-hover:border-blue-500/60 transition hover:shadow-2xl hover:shadow-blue-200/30">
          <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition duration-300"></div>
          <div class="relative">
            <p class="text-blue-700 text-sm font-semibold mb-3">💬 Messages</p>
            <h3 class="text-5xl font-bold text-blue-600">{{ messagesCount }}</h3>
            <p class="text-blue-600 text-xs mt-2 font-medium">Unread</p>
            <div class="mt-4 h-2 bg-blue-200 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style="width: 35%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Rating -->
      <div class="group relative cursor-pointer h-full">
        <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition duration-300 opacity-0 group-hover:opacity-100"></div>
        <div class="relative bg-gradient-to-br from-purple-50 via-purple-50 to-pink-50 backdrop-blur-sm border border-purple-300/50 rounded-2xl p-8 overflow-hidden group-hover:border-purple-500/60 transition hover:shadow-2xl hover:shadow-purple-200/30">
          <div class="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition duration-300"></div>
          <div class="relative">
            <p class="text-purple-700 text-sm font-semibold mb-3">⭐ Rating</p>
            <div class="flex items-center gap-2">
              <h3 class="text-5xl font-bold text-purple-600">{{ ratingCount }}</h3>
              <span class="text-3xl animate-bounce">⭐</span>
            </div>
            <p class="text-purple-600 text-xs mt-2 font-medium">/ 5.0 Rating</p>
            <div class="mt-4 h-2 bg-purple-200 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style="width: 96%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Secondary Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <!-- Completed -->
      <div class="group relative">
        <div class="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-lg group-hover:blur-xl transition duration-300 opacity-0 group-hover:opacity-100"></div>
        <div class="relative bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl p-8 group-hover:border-green-500/40 transition hover:shadow-xl hover:shadow-green-200/20">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-700 text-sm font-semibold mb-3">✓ Completed</p>
              <h4 class="text-4xl font-bold text-green-600">{{ completedCount }}</h4>
              <p class="text-green-600 text-xs mt-1 font-medium">Appointments</p>
            </div>
            <div class="text-6xl opacity-20">✓</div>
          </div>
        </div>
      </div>

      <!-- Success Rate -->
      <div class="group relative">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-lg group-hover:blur-xl transition duration-300 opacity-0 group-hover:opacity-100"></div>
        <div class="relative bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/50 rounded-2xl p-8 group-hover:border-blue-500/40 transition hover:shadow-xl hover:shadow-blue-200/20">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-blue-700 text-sm font-semibold mb-3">📊 Success Rate</p>
              <h4 class="text-4xl font-bold text-blue-600">{{ successRateCount }}%</h4>
              <p class="text-blue-600 text-xs mt-1 font-medium">Patient Satisfaction</p>
            </div>
            <div class="text-6xl opacity-20">📊</div>
          </div>
        </div>
      </div>

      <!-- Next Appointment -->
      <div class="group relative">
        <div class="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-2xl blur-lg group-hover:blur-xl transition duration-300 opacity-0 group-hover:opacity-100"></div>
        <div class="relative bg-gradient-to-br from-red-50 to-pink-50 border border-red-200/50 rounded-2xl p-8 group-hover:border-red-500/40 transition hover:shadow-xl hover:shadow-red-200/20">
          <div>
            <p class="text-red-700 text-sm font-semibold mb-3">📅 Next Appointment</p>
            <h4 class="text-2xl font-bold text-red-600 mb-1">{{ stats.nextAppointment }}</h4>
            <p class="text-red-600 text-xs font-medium">Today</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  stats: {
    type: Object,
    required: true
  }
})

const pendingCount = ref(0)
const patientsCount = ref(0)
const messagesCount = ref(0)
const ratingCount = ref(0)
const completedCount = ref(0)
const successRateCount = ref(0)

const animateCounter = (current, target, duration = 2000, decimals = 0) => {
  const steps = duration / 50
  const increment = (target - current.value) / steps
  let step = 0
  const interval = setInterval(() => {
    step++
    current.value += increment
    if (step >= steps) {
      current.value = target
      clearInterval(interval)
    }
  }, 50)
}

// Rounded versions for display
const roundedPending = computed(() => Math.round(pendingCount.value))
const roundedPatients = computed(() => Math.round(patientsCount.value))
const roundedMessages = computed(() => Math.round(messagesCount.value))
const roundedRating = computed(() => ratingCount.value.toFixed(1)) // keep 1 decimal
const roundedCompleted = computed(() => Math.round(completedCount.value))
const roundedSuccessRate = computed(() => Math.round(successRateCount.value))

onMounted(() => {
  animateCounter(pendingCount, props.stats.pendingRequests)
  animateCounter(patientsCount, props.stats.totalPatients)
  animateCounter(messagesCount, props.stats.unreadMessages)
  animateCounter(ratingCount, props.stats.rating, 2000) // allow decimal
  animateCounter(completedCount, props.stats.completedAppointments)
  animateCounter(successRateCount, props.stats.successRate)
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
  animation: bounce 1s infinite;
}
</style>