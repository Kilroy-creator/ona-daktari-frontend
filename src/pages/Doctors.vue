<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
    <div class="max-w-7xl mx-auto">
      
      <!-- Back Button -->
      <button 
        @click="$router.back()"
        class="mb-6 flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition text-gray-700 font-semibold"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </button>

      <!-- Page Header -->
      <div class="text-center mb-10">
        <h1 class="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
          Find a Doctor
        </h1>
        <p class="text-gray-600 text-lg">Search, browse and book appointments with certified specialists</p>
      </div>

      <!-- Search + Filters -->
      <div class="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-100 mb-8">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1 relative">
            <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              v-model="search"
              type="text"
              placeholder="Search by name..."
              class="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
            />
          </div>

          <select 
            v-model="selectedSpecialty"
            class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition bg-white"
          >
            <option value="">All Specialties</option>
            <option v-for="spec in specialties" :key="spec">{{ spec }}</option>
          </select>
        </div>
      </div>

      <!-- Doctors Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="doctor in filteredDoctors" 
          :key="doctor.id"
          class="group bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-100 hover:shadow-2xl hover:border-purple-300 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
        >
          <div class="flex items-center gap-4 mb-4">
            <div class="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform">
              {{ doctor.name.charAt(0) }}
            </div>
            <div>
              <p class="text-xl font-bold text-gray-900">{{ doctor.name }}</p>
              <p class="text-purple-600 font-semibold">{{ doctor.specialty }}</p>
            </div>
          </div>

          <p class="text-gray-700 text-sm mb-4">{{ doctor.bio }}</p>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
              <span class="text-yellow-600">⭐</span>
              <span class="text-sm font-bold text-yellow-700">{{ doctor.rating }}</span>
            </div>

            <router-link 
              :to="`/doctor/${doctor.id}`"
              class="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl shadow-md hover:shadow-lg transition text-sm font-semibold"
            >
              View Profile
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const selectedSpecialty = ref('')

const specialties = [
  "Cardiology", "Dentistry", "Orthopedics", "Dermatology", "Neurology"
]

const doctors = ref([
  {
    id: 1,
    name: "Dr. James Mwangi",
    specialty: "Orthopedics",
    rating: 4.8,
    bio: "Experienced orthopedic specialist with 10+ years of expertise."
  },
  {
    id: 2,
    name: "Dr. Sarah Wanjiru",
    specialty: "Dermatology",
    rating: 4.6,
    bio: "Skin care and dermatology expert offering modern treatment options."
  },
  {
    id: 3,
    name: "Dr. Kelvin Otieno",
    specialty: "Cardiology",
    rating: 4.9,
    bio: "Heart specialist focused on preventive cardiology and patient wellness."
  }
])

const filteredDoctors = computed(() => {
  return doctors.value.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(search.value.toLowerCase())
    const matchesSpecialty = selectedSpecialty.value ? d.specialty === selectedSpecialty.value : true
    return matchesSearch && matchesSpecialty
  })
})
</script>