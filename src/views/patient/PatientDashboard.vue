<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
    <!-- Navbar - FIXED -->
    <nav class="sticky top-0 z-50 backdrop-blur-xl bg-white/95 border-b border-purple-200/50 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <router-link to="/" class="flex items-center gap-3">
            <img src="/logo.png" alt="Ona Daktari" class="w-10 h-10 rounded-lg" />
            <h1 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ona Daktari
            </h1>
          </router-link>

          <div class="hidden md:flex items-center gap-8">
            <router-link to="/" class="text-gray-700 hover:text-purple-600 font-semibold transition">Home</router-link>
            <router-link to="/doctors" class="text-gray-700 hover:text-purple-600 font-semibold transition">Doctors</router-link>
            <router-link to="/health" class="text-gray-700 hover:text-purple-600 font-semibold transition">Health</router-link>
          </div>

          <div class="flex items-center gap-4">
            <div class="relative p-2 text-gray-700 hover:text-purple-600 transition cursor-pointer">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span v-if="unreadMessages > 0" class="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </div>

            <div class="flex items-center gap-3 pl-4 border-l border-purple-200">
              <div class="text-right hidden sm:block">
                <p class="text-sm font-bold text-gray-900">{{ user.name }}</p>
                <p class="text-xs text-gray-600">Patient</p>
              </div>
              <button @click="showDropdown = !showDropdown" class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold hover:shadow-lg hover:shadow-purple-400/50 transition">
                {{ user.name.charAt(0) }}
              </button>

              <div v-if="showDropdown" class="absolute top-14 right-4 bg-white border border-purple-200 rounded-xl shadow-xl p-2 min-w-56 z-50">
                <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 rounded-lg transition font-semibold">👤 Profile</router-link>
                <router-link to="/health-records" class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 rounded-lg transition font-semibold">📋 Health Records</router-link>
                <button @click="logout" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition font-semibold">🚪 Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

     <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Welcome Section -->
      <div class="relative mb-12 overflow-hidden rounded-3xl">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 backdrop-blur-3xl"></div>
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>

        <div class="relative p-8 md:p-12">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Welcome back, {{ user.name }}! 👋
              </h2>
              <p class="text-gray-700 text-lg font-medium">Track your wellness and manage appointments</p>
            </div>
            <div class="hidden lg:block text-9xl opacity-40 animate-bounce">❤️</div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
        <div class="mb-12">
        <h3 class="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <span>⚡</span> Quick Actions
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div 
            @click="activeView = 'browse-doctors'"
            class="group relative cursor-pointer transform hover:scale-105 transition">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-2xl blur-xl group-hover:blur-2xl transition duration-300 opacity-0 group-hover:opacity-100"></div>
            <div class="relative bg-white border-2 border-blue-200 rounded-2xl p-6 text-center group-hover:border-blue-500 group-hover:shadow-2xl transition">
              <img src="/medical-appointment.png" alt="Book" class="w-12 h-12 mx-auto mb-3 group-hover:scale-125 transition object-contain" />
              <h4 class="font-bold text-gray-900 text-sm">Book Appointment</h4>
              <p class="text-xs text-gray-600 mt-1">Schedule with a doctor</p>
            </div>
          </div>

          <div 
            @click="activeView = 'my-appointments'"
            class="group relative cursor-pointer transform hover:scale-105 transition">
            <div class="absolute inset-0 bg-gradient-to-r from-green-400/30 to-emerald-400/30 rounded-2xl blur-xl group-hover:blur-2xl transition duration-300 opacity-0 group-hover:opacity-100"></div>
            <div class="relative bg-white border-2 border-green-200 rounded-2xl p-6 text-center group-hover:border-green-500 group-hover:shadow-2xl transition">
              <span class="text-4xl mb-3 block group-hover:scale-125 transition">📋</span>
              <h4 class="font-bold text-gray-900 text-sm">My Appointments</h4>
              <p class="text-xs text-gray-600 mt-1">View scheduled appointments</p>
            </div>
          </div>

          <div 
            @click="activeView = 'chat'"
            class="group relative cursor-pointer transform hover:scale-105 transition">
            <div class="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-2xl blur-xl group-hover:blur-2xl transition duration-300 opacity-0 group-hover:opacity-100"></div>
            <div class="relative bg-white border-2 border-purple-200 rounded-2xl p-6 text-center group-hover:border-purple-500 group-hover:shadow-2xl transition">
              <img src="/message.png" alt="Chat" class="w-12 h-12 mx-auto mb-3 group-hover:scale-125 transition object-contain" />
              <h4 class="font-bold text-gray-900 text-sm">Chat with Doctor</h4>
              <p class="text-xs text-gray-600 mt-1">Get instant support</p>
            </div>
          </div>

          <div 
            @click="activeView = 'pharmacy'"
            class="group relative cursor-pointer transform hover:scale-105 transition">
            <div class="absolute inset-0 bg-gradient-to-r from-orange-400/30 to-red-400/30 rounded-2xl blur-xl group-hover:blur-2xl transition duration-300 opacity-0 group-hover:opacity-100"></div>
            <div class="relative bg-white border-2 border-orange-200 rounded-2xl p-6 text-center group-hover:border-orange-500 group-hover:shadow-2xl transition">
              <img src="/drugstore.png" alt="Pharmacy" class="w-12 h-12 mx-auto mb-3 group-hover:scale-125 transition object-contain" />
              <h4 class="font-bold text-gray-900 text-sm">E-Pharmacy</h4>
              <p class="text-xs text-gray-600 mt-1">Order medications</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Main Dashboard View -->
      <div v-if="activeView === 'dashboard'" class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <!-- Upcoming Appointments -->
        <div class="lg:col-span-2">
          <h3 class="text-2xl font-bold text-gray-900 mb-6">📅 Upcoming Appointments</h3>
          <AppointmentCard 
            v-for="apt in upcomingAppointments" 
            :key="apt.id" 
            :appointment="apt" 
          />
        </div>

        <!-- Pending Actions -->
        <div>
          <h3 class="text-2xl font-bold text-gray-900 mb-6">⚠️ Pending Actions</h3>
          <div class="space-y-3">
            <div v-for="action in pendingActions" :key="action.id" class="group relative cursor-pointer">
              <div class="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-xl blur-lg group-hover:blur-xl transition duration-300 opacity-0 group-hover:opacity-100"></div>
              <div class="relative bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 group-hover:border-yellow-400 group-hover:shadow-lg transition">
                <div class="flex gap-3">
                  <span class="text-2xl">{{ action.emoji }}</span>
                  <div>
                    <h5 class="font-bold text-gray-900 text-sm">{{ action.title }}</h5>
                    <p class="text-xs text-gray-700 mt-1">{{ action.desc }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Health Stats -->
      <PatientStats v-if="activeView === 'dashboard'" :stats="healthStats" class="mb-12" />

      <!-- Sub Views -->
      <BrowseDoctors v-if="activeView === 'browse-doctors'" @back="activeView = 'dashboard'" />
      <MyAppointments v-if="activeView === 'my-appointments'" @back="activeView = 'dashboard'" />
      <PatientChat v-if="activeView === 'chat'" @back="activeView = 'dashboard'" />
      <Pharmacy v-if="activeView === 'pharmacy'" @back="activeView = 'dashboard'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppointmentCard from '@/components/patient/AppointmentCard.vue'
import PatientStats from '@/components/patient/PatientStats.vue'
import BrowseDoctors from '@/views/patient/BrowseDoctors.vue'
import MyAppointments from '@/views/patient/MyAppointments.vue'
import PatientChat from '@/views/patient/PatientChat.vue'
import Pharmacy from '@/views/patient/Pharmacy.vue'

const router = useRouter()
const activeView = ref('dashboard')
const showDropdown = ref(false)
const unreadMessages = ref(1)

const user = ref({
  name: 'Test Patient',
  email: 'test@patient.com',
  age: 32,
  phone: '0712345678'
})

const upcomingAppointments = ref([
  { 
    id: 1, 
    doctor: 'Dr. Sarah Johnson', 
    specialty: 'Cardiologist', 
    date: 'Dec 15, 2025', 
    time: '10:00 AM',
    status: 'Confirmed',
    color: 'from-blue-500 to-blue-600' 
  },
  { 
    id: 2, 
    doctor: 'Dr. Michael Chen', 
    specialty: 'General Physician', 
    date: 'Dec 18, 2025', 
    time: '2:30 PM',
    status: 'Confirmed',
    color: 'from-purple-500 to-purple-600' 
  }
])

const healthStats = ref({
  heartRate: 72,
  bloodPressure: '120/80',
  bloodOxygen: 98,
  sleepDuration: 7,
  steps: 8234,
  calories: 2100
})

const pendingActions = ref([
  { id: 1, emoji: '⚠️', title: 'Complete Pre-Appointment Form', desc: 'Fill out your medical history' },
  { id: 2, emoji: '📤', title: 'Upload Lab Results', desc: 'Share your recent test results' },
  { id: 3, emoji: '✓', title: 'Confirm Appointment', desc: 'Confirm with Dr. Sarah Johnson' }
])

const logout = () => {
  router.push('/login')
}
</script>

<style scoped>
.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-bounce {
  animation: bounce 3s infinite;
}

@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;                 
}
</style>                                                               