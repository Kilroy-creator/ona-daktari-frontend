<template>
  <div class="bg-white p-6 rounded-lg border-l-4 border-orange-400 hover:shadow-lg transition">
    <div class="flex justify-between items-start mb-4">
      <div class="flex gap-4 flex-1">
        <div class="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
          {{ patientInitial }}
        </div>
        
        <div class="flex-1">
          <h3 class="text-xl font-semibold text-gray-900">{{ appointment.patientName }}</h3>
          <p class="text-gray-600 text-sm">{{ appointment.specialty }}</p>
          
          <div class="flex items-center gap-2 mt-2 text-gray-600 text-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ appointment.date }}</span>
          </div>

          <p v-if="appointment.reason" class="text-gray-600 text-sm mt-2">
            <span class="font-semibold">Reason:</span> {{ appointment.reason }}
          </p>
        </div>
      </div>

      <span :class="['px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ml-4', statusBadgeClass]">
        {{ appointment.status }}
      </span>
    </div>

    <!-- Action Buttons -->
    <div v-if="appointment.status === 'pending'" class="flex gap-3 mt-4">
      <button 
        @click="handleConfirm"
        class="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-semibold transition flex items-center justify-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Confirm
      </button>
      
      <button 
        @click="showDeclineModal = true"
        class="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 font-semibold transition flex items-center justify-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        Decline
      </button>
    </div>

    <!-- Status Buttons -->
    <div v-else class="mt-4 flex gap-2">
      <button 
        v-if="appointment.status === 'confirmed'"
        @click="handleMessage"
        class="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold transition"
      >
        💬 Message Patient
      </button>
      
      <button 
        v-else-if="appointment.status === 'declined'"
        disabled
        class="flex-1 bg-red-100 text-red-800 py-2 rounded-lg font-semibold opacity-50 cursor-not-allowed"
      >
        Declined
      </button>
    </div>

    <!-- Decline Modal -->
    <modal
      v-model="showDeclineModal"
      title="Decline Appointment"
      confirm-text="Decline"
      @confirm="handleDecline"
      @cancel="showDeclineModal = false"
    >
      <div class="space-y-4">
        <p class="text-gray-600">Are you sure you want to decline this appointment?</p>
        <textarea 
          v-model="declineReason"
          placeholder="Provide a reason (optional)"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none resize-none"
          rows="3"
        ></textarea>
      </div>
    </modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Modal from '../common/Modal.vue'

const props = defineProps({
  appointment: {
    type: Object,
    required: true,
    validator: (apt) => {
      return apt.id && apt.patientName && apt.specialty && apt.date && apt.status
    }
  }
})

const emit = defineEmits(['confirm', 'decline', 'message'])

const showDeclineModal = ref(false)
const declineReason = ref('')

const patientInitial = computed(() => {
  return props.appointment.patientName.charAt(0).toUpperCase()
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

const handleConfirm = () => {
  emit('confirm', props.appointment.id)
}

const handleDecline = () => {
  emit('decline', {
    id: props.appointment.id,
    reason: declineReason.value
  })
  showDeclineModal.value = false
  declineReason.value = ''
}

const handleMessage = () => {
  emit('message', props.appointment.id)
}
</script>

<style scoped>
</style>