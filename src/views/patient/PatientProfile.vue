<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Back Button -->
      <button @click="$router.push('/patient/dashboard')" class="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </button>

      <!-- Profile Header -->
      <div class="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
        <div class="relative h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        <div class="relative px-8 pb-8">
          <div class="flex items-end gap-6 -mt-16">
            <div class="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold border-4 border-white shadow-xl">
              {{ profile.name.charAt(0) }}
            </div>
            <div class="mb-4">
              <h1 class="text-3xl font-bold text-gray-900">{{ profile.name }}</h1>
              <p class="text-gray-600">{{ profile.email }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Information -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Personal Information -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span>👤</span> Personal Information
          </h2>
          <div class="space-y-4">
            <div>
              <label class="text-sm font-semibold text-gray-600">Full Name</label>
              <input v-model="profile.name" type="text" class="w-full mt-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition" />
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-600">Email</label>
              <input v-model="profile.email" type="email" class="w-full mt-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition" />
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-600">Phone</label>
              <input v-model="profile.phone" type="tel" class="w-full mt-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition" />
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-600">Date of Birth</label>
              <input v-model="profile.dateOfBirth" type="date" class="w-full mt-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition" />
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-600">Gender</label>
              <select v-model="profile.gender" class="w-full mt-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Medical Information -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span>🏥</span> Medical Information
          </h2>
          <div class="space-y-4">
            <div>
              <label class="text-sm font-semibold text-gray-600">Blood Type</label>
              <select v-model="profile.bloodType" class="w-full mt-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition">
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-600">Height (cm)</label>
              <input v-model="profile.height" type="number" class="w-full mt-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition" />
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-600">Weight (kg)</label>
              <input v-model="profile.weight" type="number" class="w-full mt-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition" />
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-600">Allergies</label>
              <textarea v-model="profile.allergies" rows="3" class="w-full mt-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"></textarea>
            </div>
          </div>
        </div>

        <!-- Emergency Contact -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span>🚨</span> Emergency Contact
          </h2>
          <div class="space-y-4">
            <div>
              <label class="text-sm font-semibold text-gray-600">Contact Name</label>
              <input v-model="profile.emergencyContact.name" type="text" class="w-full mt-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition" />
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-600">Relationship</label>
              <input v-model="profile.emergencyContact.relationship" type="text" class="w-full mt-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition" />
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-600">Phone Number</label>
              <input v-model="profile.emergencyContact.phone" type="tel" class="w-full mt-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition" />
            </div>
          </div>
        </div>

        <!-- Insurance Information -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span>🛡️</span> Insurance Information
          </h2>
          <div class="space-y-4">
            <div>
              <label class="text-sm font-semibold text-gray-600">Insurance Provider</label>
              <input v-model="profile.insurance.provider" type="text" class="w-full mt-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition" />
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-600">Policy Number</label>
              <input v-model="profile.insurance.policyNumber" type="text" class="w-full mt-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition" />
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-600">Group Number</label>
              <input v-model="profile.insurance.groupNumber" type="text" class="w-full mt-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition" />
            </div>
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="mt-8 flex justify-end">
        <button @click="saveProfile" class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-400/50 transition transform hover:scale-105">
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const profile = ref({
  name: 'Test Patient',
  email: 'test@patient.com',
  phone: '0712345678',
  dateOfBirth: '1993-05-15',
  gender: 'male',
  bloodType: 'O+',
  height: 175,
  weight: 70,
  allergies: 'None',
  emergencyContact: {
    name: 'Jane Doe',
    relationship: 'Spouse',
    phone: '0723456789'
  },
  insurance: {
    provider: 'AAR Insurance',
    policyNumber: 'POL123456',
    groupNumber: 'GRP7890'
  }
})

const saveProfile = () => {
  alert('Profile saved successfully!')
  console.log('Saved profile:', profile.value)
}
</script>