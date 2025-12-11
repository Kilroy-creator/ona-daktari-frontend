<template>
  <div class="relative min-h-screen">
    <!-- FloatingLines Background -->
    <FloatingLines />

    <div class="relative z-10 p-6 max-w-7xl mx-auto">
      <!-- Header with Aurora -->
      <div class="relative mb-8 overflow-hidden rounded-2xl">
        <Aurora />
        <div class="relative z-10 p-8 text-white">
          <ScrollReveal>
            <h1 class="text-4xl font-bold mb-2">Welcome back, John!</h1>
            <p class="text-blue-100">Your health dashboard</p>
          </ScrollReveal>
        </div>
      </div>

      <!-- Shortcuts with MagicBento -->
      <ScrollReveal :delay="100">
        <div class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <MagicBento>
            <div class="shortcut-card">
              <svg class="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 class="font-semibold text-gray-900">Book Appointment</h3>
              <p class="text-sm text-gray-600 mt-1">Schedule with a doctor</p>
            </div>
            
            <div class="shortcut-card">
              <svg class="w-8 h-8 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 class="font-semibold text-gray-900">Medical Records</h3>
              <p class="text-sm text-gray-600 mt-1">View your history</p>
            </div>
            
            <div class="shortcut-card">
              <svg class="w-8 h-8 text-purple-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <h3 class="font-semibold text-gray-900">Chat with Doctor</h3>
              <p class="text-sm text-gray-600 mt-1">Get instant support</p>
            </div>
            
            <div class="shortcut-card">
              <svg class="w-8 h-8 text-orange-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <h3 class="font-semibold text-gray-900">Reminders</h3>
              <p class="text-sm text-gray-600 mt-1">Medication alerts</p>
            </div>
          </MagicBento>
        </div>
      </ScrollReveal>

      <!-- Appointments Section with FolderHolder -->
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <!-- Upcoming Appointments -->
        <ScrollReveal :delay="200">
          <FolderHolder>
            <h3 class="text-lg font-bold text-gray-900 mb-4">Upcoming Appointments</h3>
            <AnimatedList>
              <div
                v-for="appointment in upcomingAppointments"
                :key="appointment.id"
                class="appointment-item mb-3 last:mb-0"
              >
                <div class="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {{ appointment.doctor.charAt(0) }}
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900">{{ appointment.doctor }}</p>
                      <p class="text-sm text-gray-600">{{ appointment.specialty }}</p>
                      <p class="text-sm text-blue-600 mt-1">{{ appointment.date }} at {{ appointment.time }}</p>
                    </div>
                  </div>
                  <MagnetButton>
                    <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                      Join
                    </button>
                  </MagnetButton>
                </div>
              </div>
            </AnimatedList>
          </FolderHolder>
        </ScrollReveal>

        <!-- Pending Actions -->
        <ScrollReveal :delay="300">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Pending Actions</h3>
            <AnimatedList>
              <div
                v-for="action in pendingActions"
                :key="action.id"
                class="action-item mb-3 last:mb-0"
              >
                <div class="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <svg class="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div class="flex-1">
                    <p class="font-medium text-gray-900">{{ action.title }}</p>
                    <p class="text-sm text-gray-600 mt-1">{{ action.description }}</p>
                  </div>
                </div>
              </div>
            </AnimatedList>
          </div>
        </ScrollReveal>
      </div>

      <!-- Health Stats -->
      <ScrollReveal :delay="400">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-6">Your Health Stats</h3>
          <div class="grid md:grid-cols-4 gap-6">
            <div class="text-center">
              <div class="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <p class="text-3xl font-bold text-gray-900">
                <CountUp :end-value="72" :duration="2000" />
              </p>
              <p class="text-sm text-gray-600 mt-1">Heart Rate (bpm)</p>
            </div>

            <div class="text-center">
              <div class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p class="text-3xl font-bold text-gray-900">
                <CountUp :end-value="120" :duration="2000" />/
                <CountUp :end-value="80" :duration="2000" />
              </p>
              <p class="text-sm text-gray-600 mt-1">Blood Pressure</p>
            </div>

            <div class="text-center">
              <div class="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                <svg class="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p class="text-3xl font-bold text-gray-900">
                <CountUp :end-value="98" :duration="2000" />%
              </p>
              <p class="text-sm text-gray-600 mt-1">Blood Oxygen</p>
            </div>

            <div class="text-center">
              <div class="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                <svg class="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p class="text-3xl font-bold text-gray-900">
                <CountUp :end-value="7" :duration="2000" />h
              </p>
              <p class="text-sm text-gray-600 mt-1">Sleep Duration</p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ScrollReveal from '@/components/animations/ScrollReveal.vue'
import FloatingLines from '@/components/animations/FloatingLines.vue'
import Aurora from '@/components/animations/Aurora.vue'
import MagicBento from '@/components/animations/MagicBento.vue'
import FolderHolder from '@/components/animations/FolderHolder.vue'
import AnimatedList from '@/components/animations/AnimatedList.vue'
import CountUp from '@/components/animations/CountUp.vue'
import MagnetButton from '@/components/animations/MagnetButton.vue'

const upcomingAppointments = ref([
  {
    id: 1,
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    date: 'Dec 15, 2025',
    time: '10:00 AM'
  },
  {
    id: 2,
    doctor: 'Dr. Michael Chen',
    specialty: 'General Physician',
    date: 'Dec 18, 2025',
    time: '2:30 PM'
  }
])

const pendingActions = ref([
  {
    id: 1,
    title: 'Complete Pre-Appointment Form',
    description: 'Fill out your medical history before your next visit'
  },
  {
    id: 2,
    title: 'Upload Lab Results',
    description: 'Share your recent blood test results'
  },
  {
    id: 3,
    title: 'Confirm Appointment',
    description: 'Confirm your appointment with Dr. Sarah Johnson'
  }
])
</script>

<style scoped>
.shortcut-card {
  cursor: pointer;
  text-align: center;
}

.appointment-item,
.action-item {
  transition: transform 0.2s ease;
}

.appointment-item:hover,
.action-item:hover {
  transform: translateX(5px);
}
</style>