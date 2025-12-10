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
            ? 'border-purple-600 text-purple-600' 
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
        <p class="text-gray-600">No {{ selectedStatus }} appointments</p>
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
              <div class="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-xl">
                {{ apt.patientName.charAt(0) }}
              </div>
              
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-gray-900">{{ apt.patientName }}</h3>
                <p class="text-gray-600 text-sm">{{ apt.age }} years • {{ apt.gender }}</p>
                
                <div class="flex items-center gap-2 mt-2 text-gray-600 text-sm">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{{ apt.date }} at {{ apt.time }}</span>
                </div>

                <p class="text-gray-600 text-sm mt-2">
                  <span class="font-semibold">Reason:</span> {{ apt.reason }}
                </p>

                <div v-if="apt.notes" class="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-600">
                  <span class="font-semibold">Notes:</span> {{ apt.notes }}
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-2 ml-4 items-end">
              <span :class="['px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap', getStatusBadgeClass(apt.status)]">
                {{ capitalize(apt.status) }}
              </span>
              
              <div class="flex gap-2">
                <button 
                  v-if="apt.status === 'pending'"
                  @click="openConfirmModal(apt)"
                  class="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
                >
                  ✓ Confirm
                </button>
                
                <button 
                  v-if="apt.status === 'confirmed' || apt.status === 'pending'"
                  @click="openRescheduleModal(apt)"
                  class="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                >
                  📅 Reschedule
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

          <!-- Patient Info Summary -->
          <div class="mt-4 pt-4 border-t border-gray-200 grid grid-cols-3 gap-4 text-sm">
            <div>
              <p class="text-gray-600">Phone</p>
              <p class="font-semibold text-gray-900">{{ apt.phone }}</p>
            </div>
            <div>
              <p class="text-gray-600">Type</p>
              <p class="font-semibold text-gray-900">{{ apt.type }}</p>
            </div>
            <div>
              <p class="text-gray-600">Fee</p>
              <p class="font-semibold text-green-600">KES {{ apt.fee }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirm Modal -->
    <modal
      v-model="showConfirmModal"
      title="Confirm Appointment"
      confirm-text="Confirm"
      @confirm="handleConfirm"
      @cancel="selectedAppointment = null"
    >
      <div v-if="selectedAppointment" class="space-y-4">
        <div class="bg-blue-50 p-4 rounded-lg">
          <p class="font-semibold text-gray-900">{{ selectedAppointment.patientName }}</p>
          <p class="text-gray-600">{{ selectedAppointment.date }} at {{ selectedAppointment.time }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Confirmation Notes (Optional)</label>
          <textarea 
            v-model="confirmNotes"
            placeholder="Add any notes for the patient..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            rows="3"
          ></textarea>
        </div>
      </div>
    </modal>

    <!-- Reschedule Modal -->
    <modal
      v-model="showRescheduleModal"
      title="Reschedule Appointment"
      confirm-text="Reschedule"
      @confirm="handleReschedule"
      @cancel="selectedAppointment = null"
    >
      <div v-if="selectedAppointment" class="space-y-4">
        <div class="bg-blue-50 p-4 rounded-lg">
          <p class="font-semibold text-gray-900">{{ selectedAppointment.patientName }}</p>
          <p class="text-gray-600">Current: {{ selectedAppointment.date }} at {{ selectedAppointment.time }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">New Date</label>
          <input 
            v-model="rescheduleData.date" 
            type="date" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">New Time</label>
          <select 
            v-model="rescheduleData.time"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select Time</option>
            <option>09:00 AM</option>
            <option>10:00 AM</option>
            <option>11:00 AM</option>
            <option>02:00 PM</option>
            <option>03:00 PM</option>
            <option>04:00 PM</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Reason for Rescheduling</label>
          <textarea 
            v-model="rescheduleData.reason"
            placeholder="Explain why you're rescheduling..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            rows="2"
          ></textarea>
        </div>
      </div>
    </modal>

    <!-- Details Modal -->
    <modal
      v-model="showDetailsModal"
      title="Appointment Details"
      confirm-text="Close"
      :show-footer="false"
      @cancel="selectedAppointment = null"
    >
      <div v-if="selectedAppointment" class="space-y-6">
        <!-- Patient Info -->
        <div>
          <h3 class="font-semibold text-gray-900 mb-3">Patient Information</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-600">Name</p>
              <p class="font-semibold text-gray-900">{{ selectedAppointment.patientName }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Email</p>
              <p class="font-semibold text-gray-900">{{ selectedAppointment.email }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Phone</p>
              <p class="font-semibold text-gray-900">{{ selectedAppointment.phone }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Age</p>
              <p class="font-semibold text-gray-900">{{ selectedAppointment.age }} years</p>
            </div>
          </div>
        </div>

        <!-- Appointment Info -->
        <div>
          <h3 class="font-semibold text-gray-900 mb-3">Appointment Details</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-600">Date</p>
              <p class="font-semibold text-gray-900">{{ selectedAppointment.date }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Time</p>
              <p class="font-semibold text-gray-900">{{ selectedAppointment.time }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Type</p>
              <p class="font-semibold text-gray-900">{{ selectedAppointment.type }}</p>
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
            <div>
              <p class="text-sm text-gray-600">Previous Notes</p>
              <p class="text-gray-900">{{ selectedAppointment.notes || 'No notes' }}</p>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import Modal from '@/components/common/Modal.vue'
import { capitalize } from '@/utils/helpers'

const appStore = useAppStore()

const selectedStatus = ref('all')
const selectedAppointment = ref(null)
const showConfirmModal = ref(false)
const showRescheduleModal = ref(false)
const showDetailsModal = ref(false)
const confirmNotes = ref('')
const rescheduleData = ref({ date: '', time: '', reason: '' })

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
    patientName: 'John Doe',
    email: 'john@example.com',
    phone: '+254 712 345 678',
    age: 35,
    gender: 'Male',
    date: '2025-12-15',
    time: '10:00 AM',
    reason: 'Heart checkup',
    type: 'In-person',
    fee: 1500,
    status: 'pending',
    notes: 'Patient mentioned experiencing chest pain occasionally'
  },
  {
    id: 2,
    patientName: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+254 722 456 789',
    age: 28,
    gender: 'Female',
    date: '2025-12-16',
    time: '02:00 PM',
    reason: 'Regular checkup',
    type: 'Virtual',
    fee: 1500,
    status: 'confirmed',
    notes: 'Follow-up from last month\'s consultation'
  },
  {
    id: 3,
    patientName: 'Peter Johnson',
    email: 'peter@example.com',
    phone: '+254 733 567 890',
    age: 45,
    gender: 'Male',
    date: '2025-12-10',
    time: '03:00 PM',
    reason: 'High blood pressure monitoring',
    type: 'In-person',
    fee: 1500,
    status: 'completed',
    notes: 'BP reading was normal, continue current medication'
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

const openConfirmModal = (apt) => {
  selectedAppointment.value = apt
  showConfirmModal.value = true
}

const openRescheduleModal = (apt) => {
  selectedAppointment.value = apt
  rescheduleData.value = { date: '', time: '', reason: '' }
  showRescheduleModal.value = true
}

const openDetailsModal = (apt) => {
  selectedAppointment.value = apt
  showDetailsModal.value = true
}

const handleConfirm = () => {
  if (selectedAppointment.value) {
    selectedAppointment.value.status = 'confirmed'
    appStore.notifySuccess('Appointment confirmed')
    showConfirmModal.value = false
    confirmNotes.value = ''
  }
}

const handleReschedule = () => {
  if (!rescheduleData.value.date || !rescheduleData.value.time) {
    alert('Please select new date and time')
    return
  }

  if (selectedAppointment.value) {
    selectedAppointment.value.date = rescheduleData.value.date
    selectedAppointment.value.time = rescheduleData.value.time
    appStore.notifySuccess('Appointment rescheduled')
    showRescheduleModal.value = false
  }
}
</script>