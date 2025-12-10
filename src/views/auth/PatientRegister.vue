<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header-nav 
      title="Ona Daktari"
      user-type="patient"
      :user-name="userName"
      @logout="handleLogout"
    />

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Welcome Section -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900">Welcome back, {{ userName }}! 👋</h1>
        <p class="text-gray-600 mt-2">Manage your health and appointments in one place</p>
      </div>

      <!-- Stats -->
      <patient-stats 
        :stats="stats"
        @navigate="navigateToTab"
      />

      <!-- Tabs -->
      <div class="flex gap-4 border-b mb-8 overflow-x-auto">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-4 py-2 font-semibold border-b-2 transition whitespace-nowrap',
            activeTab === tab.id 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-600 hover:text-gray-900'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Tab Content -->
      <div>
        <!-- My Appointments Tab -->
        <div v-if="activeTab === 'appointments'" class="space-y-4">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Your Appointments</h2>
          
          <div v-if="appointments.length === 0" class="bg-white p-8 rounded-lg text-center">
            <div class="text-5xl mb-4">📅</div>
            <p class="text-gray-600 mb-4">No appointments yet</p>
            <button 
              @click="activeTab = 'doctors'"
              class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Book an Appointment
            </button>
          </div>

          <div v-else class="grid gap-4">
            <appointment-card 
              v-for="apt in appointments" 
              :key="apt.id"
              :appointment="apt"
              @message="handleMessage"
              @cancel="handleCancelAppointment"
            />
          </div>
        </div>

        <!-- Browse Doctors Tab -->
        <div v-if="activeTab === 'doctors'">
          <browse-doctors />
        </div>

        <!-- Chat Tab -->
        <div v-if="activeTab === 'chat'">
          <chat-window 
            doctor-name="Dr. Sarah Kipchoge"
            :is-online="true"
          />
        </div>

        <!-- Pharmacy Tab -->
        <div v-if="activeTab === 'pharmacy'">
          <pharmacy />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer-component />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import HeaderNav from '@/components/common/HeaderNav.vue'
import Footer from '@/components/common/Footer.vue'
import PatientStats from '@/components/patient/PatientStats.vue'
import AppointmentCard from '@/components/patient/AppointmentCard.vue'
import BrowseDoctors from '@/views/patient/BrowseDoctors.vue'
import ChatWindow from '@/components/chat/ChatWindow.vue'
import Pharmacy from '@/views/patient/Pharmacy.vue'

const router = useRouter()
const authStore = useAuthStore()
const appStore = useAppStore()

const activeTab = ref('appointments')
const userName = computed(() => authStore.user?.name || 'User')

const tabs = [
  { id: 'appointments', label: '📅 My Appointments' },
  { id: 'doctors', label: '👨‍⚕️ Find Doctors' },
  { id: 'chat', label: '💬 Chat with Doctors' },
  { id: 'pharmacy', label: '💊 Pharmacy' }
]

const appointments = ref([
  {
    id: 1,
    doctor: 'Dr. Sarah Kipchoge',
    specialty: 'Cardiology',
    date: 'Dec 15, 2025',
    time: '10:00 AM',
    status: 'confirmed',
    reason: 'Heart checkup',
    fee: 1500
  },
  {
    id: 2,
    doctor: 'Dr. James Mwangi',
    specialty: 'Orthopedics',
    date: 'Dec 20, 2025',
    time: '02:00 PM',
    status: 'pending',
    reason: 'Knee pain consultation',
    fee: 1200
  }
])

const stats = computed(() => ({
  appointments: appointments.value.length,
  doctors: appStore.doctors.length,
  messages: 3,
  prescriptions: 2
}))

const navigateToTab = (tabId) => {
  activeTab.value = tabId
}

const handleMessage = (appointmentId) => {
  activeTab.value = 'chat'
  appStore.notifyInfo('Opening chat...')
}

const handleCancelAppointment = (appointmentId) => {
  if (confirm('Are you sure you want to cancel this appointment?')) {
    appointments.value = appointments.value.filter(apt => apt.id !== appointmentId)
    appStore.notifySuccess('Appointment cancelled')
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>