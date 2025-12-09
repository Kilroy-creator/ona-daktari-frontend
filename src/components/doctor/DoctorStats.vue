<template>
  <div class="grid md:grid-cols-4 gap-4 mb-8">
    <!-- Pending Appointments -->
    <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg border border-yellow-200 hover:shadow-lg transition">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-gray-600 text-sm font-medium">Pending Requests</p>
          <p class="text-3xl font-bold text-yellow-600 mt-2">{{ stats.pending }}</p>
          <p class="text-xs text-gray-500 mt-1">Awaiting action</p>
        </div>
        <div class="text-4xl">⏳</div>
      </div>
    </div>

    <!-- Total Patients -->
    <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200 hover:shadow-lg transition">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-gray-600 text-sm font-medium">Total Patients</p>
          <p class="text-3xl font-bold text-green-600 mt-2">{{ stats.totalPatients }}</p>
          <p class="text-xs text-gray-500 mt-1">All time</p>
        </div>
        <div class="text-4xl">👥</div>
      </div>
    </div>

    <!-- Messages -->
    <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 hover:shadow-lg transition">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-gray-600 text-sm font-medium">Messages</p>
          <p class="text-3xl font-bold text-blue-600 mt-2">{{ stats.messages }}</p>
          <p class="text-xs text-gray-500 mt-1">Unread</p>
        </div>
        <div class="text-4xl">💬</div>
      </div>
    </div>

    <!-- Rating -->
    <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200 hover:shadow-lg transition">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-gray-600 text-sm font-medium">Rating</p>
          <div class="flex items-center gap-1 mt-2">
            <span v-for="i in 5" :key="i" class="text-lg">
              {{ i <= Math.floor(stats.rating) ? '⭐' : '☆' }}
            </span>
          </div>
          <p class="text-sm font-bold text-purple-600 mt-1">{{ stats.rating }} / 5.0</p>
        </div>
        <div class="text-4xl">🌟</div>
      </div>
    </div>
  </div>

  <!-- Secondary Stats Row (Optional) -->
  <div v-if="showSecondaryStats" class="grid md:grid-cols-3 gap-4 mb-8">
    <!-- Completed Appointments -->
    <div class="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-600 text-sm font-medium">Completed</p>
          <p class="text-2xl font-bold text-gray-900 mt-2">{{ stats.completed }}</p>
        </div>
        <div class="text-3xl text-green-600">✓</div>
      </div>
    </div>

    <!-- Appointment Success Rate -->
    <div class="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-600 text-sm font-medium">Success Rate</p>
          <p class="text-2xl font-bold text-gray-900 mt-2">{{ stats.successRate }}%</p>
        </div>
        <div class="text-3xl">📊</div>
      </div>
    </div>

    <!-- Next Appointment -->
    <div class="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-600 text-sm font-medium">Next Appointment</p>
          <p class="text-lg font-bold text-gray-900 mt-2">{{ stats.nextAppointment }}</p>
        </div>
        <div class="text-3xl">📅</div>
      </div>
    </div>
  </div>

  <!-- Micro Stats (Optional) -->
  <div v-if="showMicroStats" class="flex flex-wrap gap-4 mb-8">
    <div class="bg-white px-4 py-3 rounded-lg border border-gray-200 text-sm">
      <p class="text-gray-600">Average Response Time</p>
      <p class="text-lg font-bold text-gray-900">{{ stats.avgResponseTime }}</p>
    </div>
    
    <div class="bg-white px-4 py-3 rounded-lg border border-gray-200 text-sm">
      <p class="text-gray-600">Patient Retention</p>
      <p class="text-lg font-bold text-gray-900">{{ stats.patientRetention }}%</p>
    </div>
    
    <div class="bg-white px-4 py-3 rounded-lg border border-gray-200 text-sm">
      <p class="text-gray-600">Referrals This Month</p>
      <p class="text-lg font-bold text-gray-900">{{ stats.referrals }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Object,
    required: true,
    validator: (obj) => {
      const required = ['pending', 'totalPatients', 'messages', 'rating']
      return required.every(key => key in obj)
    },
    default: () => ({
      pending: 3,
      totalPatients: 156,
      messages: 7,
      rating: 4.8,
      completed: 245,
      successRate: 96,
      nextAppointment: 'Today 2:00 PM',
      avgResponseTime: '< 2 hours',
      patientRetention: 92,
      referrals: 12
    })
  },
  showSecondaryStats: {
    type: Boolean,
    default: true
  },
  showMicroStats: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
</style>