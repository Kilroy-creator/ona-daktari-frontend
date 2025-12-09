<template>
  <div class="bg-white p-6 rounded-lg border-l-4 hover:shadow-lg transition" :class="statusBorderColor">
    <div class="flex justify-between items-start">
      <div class="flex gap-4 flex-1">
        <div class="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
          {{ doctorInitial }}
        </div>
        
        <div class="flex-1">
          <h3 class="text-xl font-semibold text-gray-900">{{ appointment.doctor }}</h3>
          <p class="text-gray-600 text-sm">{{ appointment.specialty }}</p>
          
          <div class="flex items-center gap-2 mt-2 text-gray-600 text-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ appointment.date }} at {{ appointment.time }}</span>
          </div>

          <p v-if="appointment.reason" class="text-gray-600 text-sm mt-2">
            <span class="font-semibold">Reason:</span> {{ appointment.reason }}
          </p>
        </div>
      </div>

      <div class="flex flex-col gap-2 ml-4 items-end">
        <span :class="['px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap', statusBadgeClass]">
          {{ appointment.status }}
        </span>
        
        <button 
          v-if="appointment.status === 'confirmed'" 
          @click="$emit('message')" 
          class="text-blue-600 hover:text-blue-700 text-sm font-semibold transition"
        >
          💬 Message
        </button>

        <button 
          v-if="appointment.status === 'pending'"
          @click="$emit('cancel')"
          class="text-red-600 hover:text-red-700 text-sm font-semibold transition"
        >
          ✕ Cancel
        </button>
      </div>
    </div>

    <!-- Fee Info -->
    <div v-if="appointment.fee" class="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
      <span class="text-gray-600">Consultation Fee:</span>
      <span class="text-lg font-bold text-green-600">KES {{ appointment.fee }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  appointment: {
    type: Object,
    required: true,
    validator: (apt) => {
      return apt.id && apt.doctor && apt.specialty && apt.date && apt.time && apt.status
    }
  }
})

defineEmits(['message', 'cancel'])

const doctorInitial = computed(() => {
  return props.appointment.doctor.charAt(0).toUpperCase()
})

const statusBorderColor = computed(() => {
  const statuses = {
    pending: 'border-yellow-400',
    confirmed: 'border-green-400',
    declined: 'border-red-400',
    completed: 'border-blue-400'
  }
  return statuses[props.appointment.status] || 'border-gray-400'
})

const statusBadgeClass = computed(() => {
  const statuses = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    declined: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800'
  }
  return statuses[props.appointment.status] || 'bg-gray-100 text-gray-800'
})
</script>

<style scoped>
</style>