<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <!-- Navbar -->
    <nav class="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-purple-500/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 class="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Doctor Portal
            </h1>
          </div>

          <div class="hidden md:flex items-center gap-8">
            <a href="#" @click.prevent="activeTab = 'appointments'" 
               :class="activeTab === 'appointments' ? 'text-purple-400' : 'text-gray-300 hover:text-purple-400 transition'">
              Appointments
            </a>

            <a href="#" @click.prevent="activeTab = 'messages'" 
               :class="activeTab === 'messages' ? 'text-purple-400' : 'text-gray-300 hover:text-purple-400 transition'">
              Messages
            </a>

            <a href="#" @click.prevent="activeTab = 'patients'" 
               :class="activeTab === 'patients' ? 'text-purple-400' : 'text-gray-300 hover:text-purple-400 transition'">
              Patients
            </a>
          </div>

          <div class="flex items-center gap-4">
            <div class="relative p-2 text-gray-300 hover:text-purple-400 transition cursor-pointer">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span v-if="user.unreadMessages > 0" class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>

            <div class="flex items-center gap-3 pl-4 border-l border-purple-500/20">
              <div class="text-right hidden sm:block">
                <p class="text-sm font-semibold text-white">{{ user.name }}</p>
                <p class="text-xs text-gray-400">{{ user.specialty }}</p>
              </div>
              <button @click="showDropdown = !showDropdown" class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-bold hover:shadow-lg hover:shadow-purple-500/50 transition">
                {{ user.name.charAt(0) }}
              </button>

              <div v-if="showDropdown" class="absolute top-16 right-4 bg-slate-800 border border-purple-500/30 rounded-lg shadow-xl p-2 min-w-48 z-50">
                <button @click="activeTab = 'profile'" class="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-purple-500/20 rounded transition">Profile</button>
                <a href="#" class="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-500/20 rounded transition">Settings</a>
                <button @click="logout" class="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 rounded transition">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Welcome Section -->
      <div class="relative mb-12 overflow-hidden rounded-2xl">
        <div class="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
        <div class="relative p-8 md:p-12">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                Welcome back, {{ user.name }}! 
                 <img src="/doctor.png" alt="Doctor" class="w-8 h-9" />
              </h2>
              <p class="text-gray-300">Manage your appointments and patient communications</p>
            </div>
            <div class="hidden md:block">
              <svg class="w-24 h-24 text-purple-300 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Doctor Stats Component -->
      <DoctorStats v-if="doctorStats" :stats="doctorStats" class="mb-12" />

      <!-- Tab Navigation -->
      <div class="flex gap-4 mb-8 border-b border-purple-500/20">
        <button 
          @click="activeTab = 'appointments'"
          :class="['px-4 py-3 font-semibold transition flex items-center gap-2', activeTab === 'appointments' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-purple-300']"
        >
          <img src="/medical-appointment.png" alt="Appointments" class="w-5 h-5" />
          Appointments
        </button>
        <button 
          @click="activeTab = 'messages'"
          :class="['px-4 py-3 font-semibold transition flex items-center gap-2', activeTab === 'messages' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-purple-300']"
        >
          <img src="/chat.png" alt="Messages" class="w-5 h-5" />
          Messages
        </button>
        <button 
          @click="activeTab = 'profile'"
          :class="['px-4 py-3 font-semibold transition flex items-center gap-2', activeTab === 'profile' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-purple-300']"
        >
          <img src="/profile.png" alt="Profile" class="w-5 h-5" />
          Profile
        </button>
      </div>

      <!-- Appointments Tab -->
      <div v-if="activeTab === 'appointments'" class="mb-12">
        <Appointments :appointments="appointments" @confirm="confirmAppointment" @decline="declineAppointment" />
      </div>

      <!-- Messages Tab -->
      <div v-if="activeTab === 'messages'" class="mb-12">
        <DoctorMessages :messages="messages" @send="sendMessage" />
      </div>

      <!-- Profile Tab -->
      <div v-if="activeTab === 'profile'" class="mb-12">
        <DoctorProfile :profile="user" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import DoctorStats from '@/components/doctor/DoctorStats.vue'
import AppointmentRequest from '@/components/doctor/AppointmentRequest.vue'
import DoctorProfile from '@/components/doctor/DoctorProfile.vue'
import Appointments from '@/views/doctor/Appointments.vue'
import DoctorMessages from '@/views/doctor/DoctorMessages.vue'

const router = useRouter()
const authStore = useAuthStore()

const activeTab = ref('appointments')
const showDropdown = ref(false)

// Initialize user with data from authStore or defaults
const user = ref({
  name: authStore.user?.name || 'Test Doctor',
  specialty: authStore.user?.specialty || 'Cardiology',
  email: authStore.user?.email || 'test@doctor.com',
  phone: authStore.user?.phone || '0700000001',
  experience: authStore.user?.experience || 5,
  rating: 4.8,
  bio: 'Experienced cardiologist with over 5 years of practice',
  certifications: ['Board Certified Cardiologist', 'Heart Disease Specialist'],
  totalPatients: 156,
  completedAppointments: 245,
  successRate: 96,
  pendingRequests: 2,
  unreadMessages: 7
})

// Initialize doctor stats
const doctorStats = ref({
  pendingRequests: 2,
  totalPatients: 156,
  unreadMessages: 7,
  rating: 4.8,
  completedAppointments: 245,
  successRate: 96,
  nextAppointment: 'Today 2:00 PM'
})

const appointments = ref([
  { 
    id: 1, 
    name: 'John Doe', 
    specialty: 'Patient',
    date: '2025-12-10', 
    time: '10:00', 
    status: 'Pending', 
    reason: 'Heart palpitations',
    patientImage: '🧑‍⚕️'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    specialty: 'Patient',
    date: '2025-12-11', 
    time: '14:00', 
    status: 'Confirmed', 
    reason: 'Follow-up consultation',
    patientImage: '👩‍⚕️'
  }
])

const messages = ref([
  { id: 1, sender: 'John Doe', content: 'I have been experiencing chest pain', timestamp: '10:30 AM', type: 'received' },
  { id: 2, sender: 'You', content: 'Please schedule an appointment to discuss this further', timestamp: '10:35 AM', type: 'sent' },
  { id: 3, sender: 'John Doe', content: 'When can I schedule?', timestamp: '10:40 AM', type: 'received' }
])

const confirmAppointment = (id) => {
  const apt = appointments.value.find(a => a.id === id)
  if (apt) apt.status = 'Confirmed'
}

const declineAppointment = (id) => {
  appointments.value = appointments.value.filter(a => a.id !== id)
}

const sendMessage = (message) => {
  messages.value.push({
    id: messages.value.length + 1,
    sender: 'You',
    content: message,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    type: 'sent'
  })
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('userType')
  
  if (authStore) {
    authStore.logout()
  }

  router.push('/doctor/login')
}
</script>

<style scoped>
.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>