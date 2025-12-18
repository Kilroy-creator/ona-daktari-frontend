<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- Header -->
    <div class="appointment-section">
    <div class="flex items-center gap-2 mb-4">
      <Calendar class="w-6 h-6 text-blue-500" />
      <h2 class="text-2xl font-bold">My Appointments</h2>
    </div>
    <p class="text-gray-600">Manage and schedule your healthcare visits</p>
  </div>

    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Status Tabs -->
      <div class="flex gap-2 overflow-x-auto pb-6 mb-8 scrollbar-hide">
        <button 
          v-for="status in statusTabs" 
          :key="status.id"
          @click="selectedStatus = status.id"
          :class="[
            'px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all duration-300 transform hover:scale-105',
            selectedStatus === status.id 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
              : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300'
          ]"
        >
          {{ status.label }}
          <span :class="['ml-2 px-2 py-1 rounded-full text-xs font-bold', 
            selectedStatus === status.id ? 'bg-white/30' : 'bg-gray-200 text-gray-800'
          ]">
            {{ getCountByStatus(status.id) }}
          </span>
        </button>
      </div>

      <!-- Appointments List -->
      <div class="space-y-5">
        <div v-if="filteredAppointments.length === 0" class="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-dashed border-gray-300">
          <div class="text-6xl mb-4">📭</div>
          <p class="text-2xl text-gray-600 font-semibold mb-2">No {{ selectedStatus }} appointments</p>
          <p class="text-gray-500">Schedule your first appointment to get started</p>
        </div>

        <div v-else>
          <div 
            v-for="apt in filteredAppointments" 
            :key="apt.id"
            class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-l-8"
            :class="getStatusBorderColor(apt.status)"
          >
            <div class="p-6">
              <!-- Top Section -->
              <div class="flex justify-between items-start mb-6">
                <div class="flex gap-4 flex-1">
                  <!-- Avatar -->
                  <div class="relative">
                    <div class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {{ apt.patientName.charAt(0) }}
                    </div>
                    <div :class="['absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white', getStatusDotColor(apt.status)]"></div>
                  </div>

                  <!-- Patient Info -->
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <h3 class="text-2xl font-bold text-gray-900">{{ apt.patientName }}</h3>
                      <span :class="['px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap', getStatusBadgeClass(apt.status)]">
                        {{ capitalize(apt.status) }}
                      </span>
                    </div>
                    <p class="text-gray-600 text-sm mb-3">{{ apt.age }} years • {{ apt.gender }}</p>

                    <!-- DateTime and Reason -->
                    <div class="space-y-2">
                      <div class="flex items-center gap-2 text-gray-700">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="font-semibold">{{ apt.date }} at {{ apt.time }}</span>
                      </div>
                      <div class="flex items-center gap-2 text-gray-700">
                        <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span><span class="font-semibold">Reason:</span> {{ apt.reason }}</span>
                      </div>
                    </div>

                    <!-- Notes -->
                    <div v-if="apt.notes" class="mt-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                      <p class="text-sm text-gray-700"><span class="font-semibold">Notes:</span> {{ apt.notes }}</p>
                    </div>
                  </div>
                </div>

                <!-- Right Actions -->
                <div class="flex flex-col gap-3 ml-6 items-end">
                  <div class="text-right">
                    <p class="text-gray-600 text-xs mb-1">Consultation Fee</p>
                    <p class="text-2xl font-bold text-green-600">KES {{ apt.fee }}</p>
                  </div>

                  <div class="flex flex-wrap gap-2 justify-end">
                    <button 
                      v-if="apt.status === 'pending'"
                      @click="openConfirmModal(apt)"
                      class="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm"
                      title="Confirm this appointment"
                    >
                      ✓ Confirm
                    </button>
                    
                    <button 
                      v-if="apt.status === 'confirmed' || apt.status === 'pending'"
                      @click="openRescheduleModal(apt)"
                      class="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm"
                      title="Reschedule appointment"
                    >
                      📅 Reschedule
                    </button>

                    <button 
                      @click="openDetailsModal(apt)"
                      class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:shadow-lg hover:bg-gray-700 font-semibold transition-all duration-300 text-sm"
                      title="View full details"
                    >
                      📋 Details
                    </button>
                  </div>
                </div>
              </div>

              <!-- Bottom Info Grid -->
              <div class="pt-6 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-blue-50 rounded-lg p-3">
                  <p class="text-xs text-gray-600 font-semibold mb-1">PHONE</p>
                  <p class="text-sm font-bold text-gray-900">{{ apt.phone }}</p>
                </div>
                <div class="bg-purple-50 rounded-lg p-3">
                  <p class="text-xs text-gray-600 font-semibold mb-1">EMAIL</p>
                  <p class="text-sm font-bold text-gray-900 truncate">{{ apt.email }}</p>
                </div>
                <div class="bg-green-50 rounded-lg p-3">
                  <p class="text-xs text-gray-600 font-semibold mb-1">TYPE</p>
                  <p class="text-sm font-bold text-gray-900">{{ apt.type }}</p>
                </div>
                <div class="bg-orange-50 rounded-lg p-3">
                  <p class="text-xs text-gray-600 font-semibold mb-1">STATUS</p>
                  <p class="text-sm font-bold capitalize" :class="getStatusTextColor(apt.status)">{{ apt.status }}</p>
                </div>
              </div>
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
      <div v-if="selectedAppointment" class="space-y-5">
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border border-blue-200">
          <p class="font-bold text-gray-900 text-lg mb-1">{{ selectedAppointment.patientName }}</p>
          <p class="text-gray-600 flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5H4v8a2 2 0 002 2h12a2 2 0 002-2V7h-2v1a1 1 0 11-2 0V7H7v1a1 1 0 11-2 0V7z"/></svg>
            {{ selectedAppointment.date }} at {{ selectedAppointment.time }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Confirmation Notes (Optional)</label>
          <textarea 
            v-model="confirmNotes"
            placeholder="Add any notes for the patient..."
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
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
      <div v-if="selectedAppointment" class="space-y-5">
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border border-blue-200">
          <p class="font-bold text-gray-900 text-lg mb-1">{{ selectedAppointment.patientName }}</p>
          <p class="text-gray-600 flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5H4v8a2 2 0 002 2h12a2 2 0 002-2V7h-2v1a1 1 0 11-2 0V7H7v1a1 1 0 11-2 0V7z"/></svg>
            Current: {{ selectedAppointment.date }} at {{ selectedAppointment.time }}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">New Date</label>
            <input 
              v-model="rescheduleData.date" 
              type="date" 
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">New Time</label>
            <select 
              v-model="rescheduleData.time"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Reason for Rescheduling</label>
          <textarea 
            v-model="rescheduleData.reason"
            placeholder="Explain why you're rescheduling..."
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
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
          <h3 class="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
            <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/></svg>
            Patient Information
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <p class="text-xs text-gray-600 font-bold mb-1">NAME</p>
              <p class="text-sm font-bold text-gray-900">{{ selectedAppointment.patientName }}</p>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <p class="text-xs text-gray-600 font-bold mb-1">EMAIL</p>
              <p class="text-sm font-bold text-gray-900 truncate">{{ selectedAppointment.email }}</p>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <p class="text-xs text-gray-600 font-bold mb-1">PHONE</p>
              <p class="text-sm font-bold text-gray-900">{{ selectedAppointment.phone }}</p>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <p class="text-xs text-gray-600 font-bold mb-1">AGE</p>
              <p class="text-sm font-bold text-gray-900">{{ selectedAppointment.age }} years</p>
            </div>
          </div>
        </div>

        <!-- Appointment Info -->
        <div>
          <h3 class="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
            <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5H4v8a2 2 0 002 2h12a2 2 0 002-2V7h-2v1a1 1 0 11-2 0V7H7v1a1 1 0 11-2 0V7z"/></svg>
            Appointment Details
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-purple-50 p-4 rounded-lg">
              <p class="text-xs text-gray-600 font-bold mb-1">DATE</p>
              <p class="text-sm font-bold text-gray-900">{{ selectedAppointment.date }}</p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg">
              <p class="text-xs text-gray-600 font-bold mb-1">TIME</p>
              <p class="text-sm font-bold text-gray-900">{{ selectedAppointment.time }}</p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg">
              <p class="text-xs text-gray-600 font-bold mb-1">TYPE</p>
              <p class="text-sm font-bold text-gray-900">{{ selectedAppointment.type }}</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <p class="text-xs text-gray-600 font-bold mb-1">FEE</p>
              <p class="text-sm font-bold text-green-600">KES {{ selectedAppointment.fee }}</p>
            </div>
          </div>
        </div>

        <!-- Medical Info -->
        <div>
          <h3 class="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
            <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/></svg>
            Medical Information
          </h3>
          <div class="space-y-4">
            <div class="bg-red-50 p-4 rounded-lg border border-red-100">
              <p class="text-xs text-gray-600 font-bold mb-1">REASON FOR VISIT</p>
              <p class="text-sm text-gray-900">{{ selectedAppointment.reason }}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p class="text-xs text-gray-600 font-bold mb-1">PREVIOUS NOTES</p>
              <p class="text-sm text-gray-900">{{ selectedAppointment.notes || 'No notes' }}</p>
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
import { Calendar } from 'lucide-vue-next'

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
    pending: 'border-yellow-500',
    confirmed: 'border-green-500',
    completed: 'border-blue-500',
    cancelled: 'border-red-500'
  }
  return colors[status] || 'border-gray-400'
}

const getStatusDotColor = (status) => {
  const colors = {
    pending: 'bg-yellow-400',
    confirmed: 'bg-green-400',
    completed: 'bg-blue-400',
    cancelled: 'bg-red-400'
  }
  return colors[status] || 'bg-gray-400'
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

const getStatusTextColor = (status) => {
  const colors = {
    pending: 'text-yellow-600',
    confirmed: 'text-green-600',
    completed: 'text-blue-600',
    cancelled: 'text-red-600'
  }
  return colors[status] || 'text-gray-600'
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