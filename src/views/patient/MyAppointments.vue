<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 mb-6">My Appointments</h2>

    <!-- Filter Tabs -->
    <div class="flex gap-4 border-b mb-8 overflow-x-auto">
      <button 
        v-for="status in statusTabs" 
        :key="status.id"
        @click="selectedStatus = status.id"
        :class="[
          'px-4 py-2 font-semibold border-b-2 transition whitespace-nowrap',
          selectedStatus === status.id 
            ? 'border-blue-600 text-blue-600' 
            : 'border-transparent text-gray-600 hover:text-gray-900'
        ]"
      >
        {{ status.label }} ({{ getCountByStatus(status.id) }})
      </button>
    </div>

    <!-- Appointments List -->
    <div class="space-y-4">
      <div v-if="filteredAppointments.length === 0" class="bg-white p-8 rounded-lg text-center">
        <div class="text-5xl mb-4">📅</div>
        <p class="text-gray-600 mb-4">No {{ selectedStatus }} appointments</p>
        <router-link to="/patient/doctors" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 inline-block">
          Book an Appointment
        </router-link>
      </div>

      <div v-else class="grid gap-4">
        <div 
          v-for="apt in filteredAppointments" 
          :key="apt.id"
          class="bg-white p-6 rounded-lg border-l-4 hover:shadow-lg transition"
          :class="getStatusBorderColor(apt.status)"
        >
          <div class="flex justify-between items-start mb-4">
            <div class="flex gap-4 flex-1">
              <div class="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                {{ apt.doctorName.charAt(0) }}
              </div>
              
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-gray-900">{{ apt.doctorName }}</h3>
                <p class="text-gray-600 text-sm">{{ apt.specialty }}</p>
                
                <div class="flex items-center gap-2 mt-2 text-gray-600 text-sm">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{{ formatDate(apt.date) }} at {{ apt.time }}</span>
                </div>

                <p v-if="apt.reason" class="text-gray-600 text-sm mt-2">
                  <span class="font-semibold">Reason:</span> {{ apt.reason }}
                </p>
              </div>
            </div>

            <div class="flex flex-col gap-2 ml-4 items-end">
              <span :class="['px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap', getStatusBadgeClass(apt.status)]">
                {{ capitalize(apt.status) }}
              </span>
              
              <div class="flex flex-col gap-1">
                <button 
                  v-if="apt.status === 'confirmed'"
                  @click="openChatWithDoctor(apt)"
                  class="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                >
                  💬 Chat
                </button>

                <button 
                  v-if="apt.status === 'pending'"
                  @click="handleCancelAppointment(apt.id)"
                  class="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                >
                  ✕ Cancel
                </button>

                <button 
                  @click="openDetailsModal(apt)"
                  class="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition"
                >
                  📋 Details
                </button>
              </div>
            </div>
          </div>

          <!-- Appointment Summary -->
          <div class="mt-4 pt-4 border-t border-gray-200 grid grid-cols-3 gap-4 text-sm">
            <div>
              <p class="text-gray-600">Type</p>
              <p class="font-semibold text-gray-900">{{ apt.type }}</p>
            </div>
            <div>
              <p class="text-gray-600">Duration</p>
              <p class="font-semibold text-gray-900">{{ apt.duration }} minutes</p>
            </div>
            <div>
              <p class="text-gray-600">Fee</p>
              <p class="font-semibold text-green-600">KES {{ apt.fee }}</p>
            </div>
          </div>

          <!-- Status-specific info -->
          <div v-if="apt.status === 'completed'" class="mt-4 pt-4 border-t border-gray-200">
            <p class="text-sm text-gray-600 mb-2">Doctor's Notes:</p>
            <p class="text-gray-900">{{ apt.doctorNotes || 'No notes added' }}</p>
            <button v-if="apt.prescription" @click="viewPrescription(apt)" class="mt-2 text-blue-600 hover:underline text-sm">
              📄 View Prescription
            </button>
          </div>

          <div v-if="apt.status === 'cancelled'" class="mt-4 pt-4 border-t border-gray-200">
            <p class="text-sm text-red-600">
              <span class="font-semibold">Cancelled:</span> {{ apt.cancellationReason }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <modal
      v-model="showDetailsModal"
      title="Appointment Details"
      confirm-text="Close"
      :show-footer="false"
      @cancel="selectedAppointment = null"
    >
      <div v-if="selectedAppointment" class="space-y-6">
        <!-- Doctor Info -->
        <div>
          <h3 class="font-semibold text-gray-900 mb-3">Doctor Information</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-600">Name</p>
              <p class="font-semibold text-gray-900">{{ selectedAppointment.doctorName }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Specialty</p>
              <p class="font-semibold text-gray-900">{{ selectedAppointment.specialty }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Rating</p>
              <p class="font-semibold text-yellow-600">{{ selectedAppointment.rating }} ⭐</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Experience</p>
              <p class="font-semibold text-gray-900">{{ selectedAppointment.experience }} years</p>
            </div>
          </div>
        </div>

        <!-- Appointment Info -->
        <div>
          <h3 class="font-semibold text-gray-900 mb-3">Appointment Details</h3>
          <div class="space-y-3">
            <div>
              <p class="text-sm text-gray-600">Date & Time</p>
              <p class="font-semibold text-gray-900">{{ formatDate(selectedAppointment.date) }} at {{ selectedAppointment.time }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Type</p>
              <p class="font-semibold text-gray-900">{{ selectedAppointment.type }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Duration</p>
              <p class="font-semibold text-gray-900">{{ selectedAppointment.duration }} minutes</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Fee</p>
              <p class="font-semibold text-green-600">KES {{ selectedAppointment.fee }}</p>
            </div>
          </div>
        </div>

        <!-- Medical Info -->
        <div>
          <h3 class="font-semibold text-gray-900 mb-3">Medical Information</h3>
          <div class="space-y-3">
            <div>
              <p class="text-sm text-gray-600">Reason for Visit</p>
              <p class="text-gray-900">{{ selectedAppointment.reason }}</p>
            </div>
            <div v-if="selectedAppointment.doctorNotes">
              <p class="text-sm text-gray-600">Doctor's Notes</p>
              <p class="text-gray-900">{{ selectedAppointment.doctorNotes }}</p>
            </div>
          </div>
        </div>

        <!-- Location -->
        <div v-if="selectedAppointment.location">
          <h3 class="font-semibold text-gray-900 mb-3">Location</h3>
          <p class="text-gray-900">{{ selectedAppointment.location }}</p>
        </div>
      </div>
    </modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import Modal from '@/components/common/Modal.vue'
import { capitalize, formatDate } from '@/utils/helpers'

const router = useRouter()
const appStore = useAppStore()

const selectedStatus = ref('all')
const selectedAppointment = ref(null)
const showDetailsModal = ref(false)

const statusTabs = [
  { id: 'all', label: 'All Appointments' },
  { id: 'pending', label: 'Pending' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' }
]

const appointments = ref([
  {
    id: 1,
    doctorName: 'Dr. Sarah Kipchoge',
    specialty: 'Cardiology',
    rating: 4.8,
    experience: 15,
    date: '2025-12-15',
    time: '10:00 AM',
    type: 'In-person',
    duration: 30,
    fee: 1500,
    reason: 'Heart checkup',
    location: 'Nairobi Hospital, Westlands',
    status: 'confirmed',
    doctorNotes: '',
    prescription: false
  },
  {
    id: 2,
    doctorName: 'Dr. James Mwangi',
    specialty: 'Orthopedics',
    rating: 4.9,
    experience: 12,
    date: '2025-12-20',
    time: '02:00 PM',
    type: 'Virtual',
    duration: 20,
    fee: 1200,
    reason: 'Knee pain consultation',
    location: 'Video Call',
    status: 'pending',
    doctorNotes: '',
    prescription: false
  },
  {
    id: 3,
    doctorName: 'Dr. Emily Achieng',
    specialty: 'Pediatrics',
    rating: 4.7,
    experience: 8,
    date: '2025-12-05',
    time: '03:00 PM',
    type: 'In-person',
    duration: 45,
    fee: 1000,
    reason: 'Child checkup',
    location: 'Nairobi Hospital',
    status: 'completed',
    doctorNotes: 'Child is healthy. Continue vitamin supplements. Follow-up in 3 months.',
    prescription: true
  },
  {
    id: 4,
    doctorName: 'Dr. Peter Kariuki',
    specialty: 'Neurology',
    rating: 4.9,
    experience: 18,
    date: '2025-12-01',
    time: '11:00 AM',
    type: 'In-person',
    duration: 30,
    fee: 2000,
    reason: 'Migraine management',
    location: 'Aga Khan Hospital',
    status: 'cancelled',
    doctorNotes: '',
    prescription: false,
    cancellationReason: 'Doctor unavailable due to emergency'
  }
])

const filteredAppointments = computed(() => {
  if (selectedStatus.value === 'all') {
    return appointments.value
  }
  return appointments.value.filter(apt => apt.status === selectedStatus.value)
})

const getCountByStatus = (status) => {
  if (status === 'all') return appointments.value.length
  return appointments.value.filter(apt => apt.status === status).length
}

const getStatusBorderColor = (status) => {
  const colors = {
    pending: 'border-yellow-400',
    confirmed: 'border-green-400',
    completed: 'border-blue-400',
    cancelled: 'border-red-400'
  }
  return colors[status] || 'border-gray-400'
}

const getStatusBadgeClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const openDetailsModal = (apt) => {
  selectedAppointment.value = apt
  showDetailsModal.value = true
}

const openChatWithDoctor = (apt) => {
  appStore.notifyInfo('Opening chat with ' + apt.doctorName)
  // Navigate to chat or open chat modal
}

const handleCancelAppointment = (appointmentId) => {
  if (confirm('Are you sure you want to cancel this appointment?')) {
    const apt = appointments.value.find(a => a.id === appointmentId)
    if (apt) {
      apt.status = 'cancelled'
      apt.cancellationReason = 'Cancelled by patient'
      appStore.notifySuccess('Appointment cancelled')
    }
  }
}

const viewPrescription = (apt) => {
  appStore.notifyInfo('Loading prescription for ' + apt.doctorName)
}
</script>