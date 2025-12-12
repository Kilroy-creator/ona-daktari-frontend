<template>
  <div class="space-y-10 p-6">

    <!-- Page Header -->
    <div class="text-center">
      <h1 class="text-4xl font-bold text-purple-700">Find a Doctor</h1>
      <p class="text-gray-600 mt-2">Search, browse and book appointments with certified specialists.</p>
    </div>

    <!-- Search + Filters -->
    <div class="bg-white p-6 rounded-2xl shadow-md border border-purple-100 flex flex-col md:flex-row gap-4">
      <input 
        v-model="search"
        type="text"
        placeholder="Search by name..."
        class="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
      />

      <select 
        v-model="selectedSpecialty"
        class="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
      >
        <option value="">All Specialties</option>
        <option v-for="spec in specialties" :key="spec">{{ spec }}</option>
      </select>
    </div>

    <!-- Doctors Grid -->
    <div class="grid md:grid-cols-3 gap-6">
      <div 
        v-for="doctor in filteredDoctors" 
        :key="doctor.id"
        class="bg-white p-6 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition cursor-pointer"
      >
        <div class="flex items-center gap-4 mb-4">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {{ doctor.name.charAt(0) }}
          </div>
          <div>
            <p class="text-xl font-bold text-gray-900">{{ doctor.name }}</p>
            <p class="text-purple-600 font-semibold">{{ doctor.specialty }}</p>
          </div>
        </div>

        <p class="text-gray-700 text-sm">{{ doctor.bio }}</p>

        <div class="flex items-center justify-between mt-4">
          <span class="bg-yellow-100 px-3 py-1 rounded-full text-sm font-bold text-yellow-700">
            ⭐ {{ doctor.rating }}
          </span>

          <router-link 
            :to="`/doctor/${doctor.id}`"
            class="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl shadow hover:opacity-90 transition text-sm font-semibold"
          >
            View Profile
          </router-link>
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
    const matchesSearch = d.name.toLowerCase().includes(search.value.toLowerCase());
    const matchesSpecialty = selectedSpecialty.value ? d.specialty === selectedSpecialty.value : true;
    return matchesSearch && matchesSpecialty;
  })
})
</script>
