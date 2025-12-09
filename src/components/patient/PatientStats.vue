<template>
  <div class="grid md:grid-cols-4 gap-4 mb-8">
    <!-- Upcoming Appointments -->
    <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 hover:shadow-lg transition cursor-pointer" @click="$emit('navigate', 'appointments')">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-gray-600 text-sm font-medium">Upcoming Appointments</p>
          <p class="text-3xl font-bold text-blue-600 mt-2">{{ stats.appointments }}</p>
          <p class="text-xs text-gray-500 mt-1">View all</p>
        </div>
        <div class="text-4xl">📅</div>
      </div>
    </div>

    <!-- Available Doctors -->
    <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200 hover:shadow-lg transition cursor-pointer" @click="$emit('navigate', 'doctors')">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-gray-600 text-sm font-medium">Available Doctors</p>
          <p class="text-3xl font-bold text-green-600 mt-2">{{ stats.doctors }}</p>
          <p class="text-xs text-gray-500 mt-1">Book now</p>
        </div>
        <div class="text-4xl">👨‍⚕️</div>
      </div>
    </div>

    <!-- Unread Messages -->
    <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200 hover:shadow-lg transition cursor-pointer" @click="$emit('navigate', 'chat')">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-gray-600 text-sm font-medium">Unread Messages</p>
          <p class="text-3xl font-bold text-purple-600 mt-2">{{ stats.messages }}</p>
          <p class="text-xs text-gray-500 mt-1">Check messages</p>
        </div>
        <div class="text-4xl">💬</div>
      </div>
    </div>

    <!-- Active Prescriptions -->
    <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200 hover:shadow-lg transition cursor-pointer" @click="$emit('navigate', 'pharmacy')">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-gray-600 text-sm font-medium">Active Prescriptions</p>
          <p class="text-3xl font-bold text-orange-600 mt-2">{{ stats.prescriptions }}</p>
          <p class="text-xs text-gray-500 mt-1">Order medicines</p>
        </div>
        <div class="text-4xl">💊</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Object,
    required: true,
    validator: (obj) => {
      return 'appointments' in obj && 'doctors' in obj && 'messages' in obj && 'prescriptions' in obj
    },
    default: () => ({
      appointments: 0,
      doctors: 0,
      messages: 0,
      prescriptions: 0
    })
  }
})

defineEmits(['navigate'])
</script>

<style scoped>
</style>