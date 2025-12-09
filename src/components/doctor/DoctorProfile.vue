<template>
  <div class="space-y-6">
    <!-- Profile Card -->
    <div class="bg-white p-8 rounded-lg shadow">
      <div class="flex items-start justify-between mb-6">
        <div class="flex gap-6">
          <div class="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-4xl">
            {{ doctorInitial }}
          </div>
          
          <div>
            <h2 class="text-3xl font-bold text-gray-900">{{ profile.name }}</h2>
            <p class="text-lg text-gray-600 mt-1">{{ profile.specialty }}</p>
            
            <div class="flex items-center gap-4 mt-3">
              <div class="flex items-center gap-1">
                <span class="text-yellow-400">⭐</span>
                <span class="font-semibold">{{ profile.rating }}</span>
                <span class="text-gray-600">({{ profile.reviews }} reviews)</span>
              </div>
              
              <span v-if="profile.isVerified" class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold flex items-center gap-1">
                ✓ Verified
              </span>
              <span v-else class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                Pending Verification
              </span>
            </div>
          </div>
        </div>

        <button 
          @click="isEditing = !isEditing"
          class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          {{ isEditing ? 'Cancel' : 'Edit Profile' }}
        </button>
      </div>

      <!-- Profile Info -->
      <div v-if="!isEditing" class="grid md:grid-cols-2 gap-6 pt-6 border-t">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <p class="text-gray-900">{{ profile.email }}</p>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <p class="text-gray-900">{{ profile.phone }}</p>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">License Number</label>
          <p class="text-gray-900">{{ profile.licenseNumber }}</p>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Hospital Affiliation</label>
          <p class="text-gray-900">{{ profile.hospitalAffiliation || 'N/A' }}</p>
        </div>
        
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <p class="text-gray-900">{{ profile.bio }}</p>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Hourly Rate</label>
          <p class="text-gray-900 font-semibold">KES {{ profile.hourlyRate }}/hour</p>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Total Patients</label>
          <p class="text-gray-900">{{ profile.totalPatients }}</p>
        </div>
      </div>

      <!-- Edit Form -->
      <form v-else @submit.prevent="handleSaveProfile" class="grid md:grid-cols-2 gap-6 pt-6 border-t">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input 
            v-model="editForm.email" 
            type="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input 
            v-model="editForm.phone" 
            type="tel"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Hospital Affiliation</label>
          <input 
            v-model="editForm.hospitalAffiliation"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Hourly Rate (KES)</label>
          <input 
            v-model.number="editForm.hourlyRate"
            type="number"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>
        
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <textarea 
            v-model="editForm.bio"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none"
            rows="4"
          ></textarea>
        </div>

        <div class="md:col-span-2 flex gap-3">
          <button 
            type="submit"
            class="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-semibold transition"
          >
            Save Changes
          </button>
          <button 
            type="button"
            @click="isEditing = false"
            class="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400 font-semibold transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

    <!-- Availability Card -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-2xl font-bold text-gray-900 mb-4">Availability</h3>
      
      <div class="space-y-4">
        <div v-for="day in daysOfWeek" :key="day" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <span class="font-semibold text-gray-900">{{ day }}</span>
          
          <div class="flex items-center gap-3">
            <input 
              type="time"
              v-model="availability[day].start"
              class="px-3 py-1 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span class="text-gray-500">to</span>
            <input 
              type="time"
              v-model="availability[day].end"
              class="px-3 py-1 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-purple-500"
            />
            
            <label class="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox"
                v-model="availability[day].available"
                class="w-4 h-4"
              />
              <span class="text-sm text-gray-600">Available</span>
            </label>
          </div>
        </div>
      </div>

      <button 
        @click="handleSaveAvailability"
        class="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 font-semibold transition"
      >
        Save Availability
      </button>
    </div>

    <!-- Stats Card -->
    <div class="grid md:grid-cols-3 gap-6">
      <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
        <p class="text-gray-600 text-sm font-medium mb-2">Completed Appointments</p>
        <p class="text-3xl font-bold text-blue-600">{{ stats.completed }}</p>
      </div>
      
      <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
        <p class="text-gray-600 text-sm font-medium mb-2">Active Patients</p>
        <p class="text-3xl font-bold text-green-600">{{ stats.activePatients }}</p>
      </div>
      
      <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
        <p class="text-gray-600 text-sm font-medium mb-2">Satisfaction Rate</p>
        <p class="text-3xl font-bold text-purple-600">{{ stats.satisfaction }}%</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  profile: {
    type: Object,
    required: true,
    default: () => ({
      name: 'Dr. James Mwangi',
      specialty: 'Orthopedics',
      email: 'doctor@example.com',
      phone: '+254 712 345 678',
      licenseNumber: 'MC/12345',
      bio: 'Experienced orthopedic specialist with 10+ years of practice.',
      hospitalAffiliation: 'Nairobi Hospital',
      hourlyRate: 1500,
      rating: 4.8,
      reviews: 89,
      isVerified: true,
      totalPatients: 156
    })
  },
  stats: {
    type: Object,
    default: () => ({
      completed: 245,
      activePatients: 34,
      satisfaction: 98
    })
  }
})

const emit = defineEmits(['save-profile', 'save-availability'])

const isEditing = ref(false)
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const editForm = ref({
  email: props.profile.email,
  phone: props.profile.phone,
  hospitalAffiliation: props.profile.hospitalAffiliation,
  hourlyRate: props.profile.hourlyRate,
  bio: props.profile.bio
})

const availability = ref({
  Monday: { start: '09:00', end: '17:00', available: true },
  Tuesday: { start: '09:00', end: '17:00', available: true },
  Wednesday: { start: '09:00', end: '17:00', available: true },
  Thursday: { start: '09:00', end: '17:00', available: true },
  Friday: { start: '09:00', end: '17:00', available: true },
  Saturday: { start: '10:00', end: '14:00', available: false },
  Sunday: { start: '00:00', end: '00:00', available: false }
})

const doctorInitial = computed(() => {
  return props.profile.name.charAt(0).toUpperCase()
})

const handleSaveProfile = () => {
  emit('save-profile', editForm.value)
  isEditing.value = false
}

const handleSaveAvailability = () => {
  emit('save-availability', availability.value)
}
</script>

<style scoped>
</style>