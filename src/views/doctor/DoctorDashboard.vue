<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header-nav 
      title="Doctor Dashboard"
      user-type="doctor"
      :user-name="doctorName"
      @logout="handleLogout"
    />

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Welcome Section -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900">Welcome, {{ doctorName }}! 👨‍⚕️</h1>
        <p class="text-gray-600 mt-2">Manage your appointments and patient communications</p>
      </div>

      <!-- Stats -->
      <doctor-stats :stats="dashboardStats" />

      <!-- Tabs -->
      <div class="flex gap-4 border-b mb-8 overflow-x-auto">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-4 py-2 font-semibold border-b-2 transition whitespace-nowrap',
            activeTab === tab.id 
              ? 'border-purple-600 text-purple-600' 
              : 'border-transparent text-gray-600 hover:text-gray-900'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Tab Content -->
      <div>
        <!-- Appointments Tab -->
        <div v-if="activeTab === 'appointments'" class="space-y-4">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Appointment Requests</h2>
          
          <div v-if="pendingAppointments.length === 0" class="bg-white p-8 rounded-lg text-center">
            <div class="text-5xl mb-4">✓</div>
            <p class="text-gray-600">No pending appointments</p>
          </div>

          <div v-else class="grid gap-4">
            <appointment-request 
              v-for="apt in pendingAppointments" 
              :key="apt.id"
              :appointment="apt"
              @confirm="handleConfirmAppointment"
              @decline="handleDeclineAppointment"
              @message="handleMessagePatient"
            />
          </div>
        </div>

        <!-- Messages Tab -->
        <div v-if="activeTab === 'messages'">
          <chat-window 
            doctor-name="Dr. James Mwangi"
            :is-online="true"
          />
        </div>

        <!-- Profile Tab -->
        <div v-if="activeTab === 'profile'">
          <doctor-profile 
            :profile="doctorProfile"
            :stats="profileStats"
            @save-profile="handleSaveProfile"
            @save-availability="handleSaveAvailability"
          />
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
import DoctorStats from '@/components/doctor/DoctorStats.vue'
import AppointmentRequest from '@/components/doctor/AppointmentRequest.vue'
import ChatWindow from '@/components/chat/ChatWindow.vue'
import DoctorProfile from '@/components/doctor/DoctorProfile.vue'

const router = useRouter()
const authStore = useAuthStore()
const appStore = useAppStore()

const activeTab = ref('appointments')
const doctorName = computed(() => authStore.user?.name || 'Doctor')

const tabs = [
  { id: 'appointments', label: '📅 Appointments' },
  { id: 'messages', label: '💬 Messages' },
  { id: 'profile', label: '👤 Profile' }
]

const pendingAppointments = ref([
  {
    id: 1,
    patientName: 'John Doe',
    specialty: 'Cardiology',
    date: '2025-12-10 10:00',
    reason: 'Heart palpitations',
    status: 'pending'
  },
  {
    id: 2,
    patientName: 'Jane Smith',
    specialty: 'Cardiology',
    date: '2025-12-11 14:30',
    reason: 'Regular checkup',
    status: 'pending'
  }
])

const doctorProfile = ref({
  name: 'Dr. James Mwangi',
  specialty: 'Cardiology',
  email: 'doctor@example.com',
  phone: '+254 712 345 678',
  licenseNumber: 'MC/12345',
  bio: 'Experienced cardiologist with 15+ years of practice.',
  hospitalAffiliation: 'Nairobi Hospital',
  hourlyRate: 1500,
  rating: 4.8,
  reviews: 89,
  isVerified: true,
  totalPatients: 156
})

const dashboardStats = computed(() => ({
  pending: pendingAppointments.value.filter(a => a.status === 'pending').length,
  totalPatients: 156,
  messages: 7,
  rating: 4.8,
  completed: 245,
  successRate: 96,
  nextAppointment: 'Today 2:00 PM',
  avgResponseTime: '< 2 hours',
  patientRetention: 92,
  referrals: 12
}))

const profileStats = computed(() => ({
  completed: 245,
  activePatients: 34,
  satisfaction: 98
}))

const handleConfirmAppointment = (appointmentId) => {
  const apt = pendingAppointments.value.find(a => a.id === appointmentId)
  if (apt) {
    apt.status = 'confirmed'
    appStore.notifySuccess('Appointment confirmed')
  }
}

const handleDeclineAppointment = ({ id, reason }) => {
  const apt = pendingAppointments.value.find(a => a.id === id)
  if (apt) {
    apt.status = 'declined'
    appStore.notifyInfo('Appointment declined')
  }
}

const handleMessagePatient = (appointmentId) => {
  activeTab.value = 'messages'
  appStore.notifyInfo('Opening patient chat...')
}

const handleSaveProfile = (data) => {
  Object.assign(doctorProfile.value, data)
  appStore.notifySuccess('Profile updated successfully')
}

const handleSaveAvailability = (availability) => {
  appStore.notifySuccess('Availability updated successfully')
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>