<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md max-h-screen overflow-y-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Doctor Registration</h2>
        <p class="text-gray-600 mt-2">Join our network of specialists</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input 
            v-model="formData.name" 
            type="text" 
            placeholder="Dr. John Smith" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" 
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input 
            v-model="formData.email" 
            type="email" 
            placeholder="doctor@email.com" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" 
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input 
            v-model="formData.phone" 
            type="tel" 
            placeholder="+254 7xx xxx xxx" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" 
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
          <select 
            v-model="formData.specialty" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            required
          >
            <option value="">Select Specialty</option>
            <option>Cardiology</option>
            <option>Neurology</option>
            <option>Orthopedics</option>
            <option>Pediatrics</option>
            <option>Dermatology</option>
            <option>Psychiatry</option>
            <option>General Practice</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">License Number</label>
          <input 
            v-model="formData.license" 
            type="text" 
            placeholder="MC/12345" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" 
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Hourly Rate (KES)</label>
          <input 
            v-model.number="formData.hourlyRate" 
            type="number" 
            placeholder="1500"
            min="100"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" 
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div class="relative">
            <input 
              v-model="formData.password" 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="••••••••" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" 
              required
            />
            <button 
              type="button" 
              @click="showPassword = !showPassword" 
              class="absolute right-3 top-2.5 text-gray-500"
            >
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
          <input 
            v-model="formData.confirmPassword" 
            type="password" 
            placeholder="••••••••" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" 
            required
          />
        </div>

        <div class="flex items-center gap-2">
          <input 
            v-model="formData.agreeTerms" 
            type="checkbox" 
            id="terms"
            class="w-4 h-4"
            required
          />
          <label for="terms" class="text-sm text-gray-600">
            I agree to the <a href="#" class="text-purple-600 hover:underline">Terms of Service</a>
          </label>
        </div>

        <button 
          type="submit" 
          class="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 font-semibold transition disabled:opacity-50"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Registering...' : 'Register' }}
        </button>

        <p class="text-center text-gray-600 text-sm">
          Already registered? 
          <router-link to="/doctor/login" class="text-purple-600 hover:underline">Login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const formData = ref({
  name: '',
  email: '',
  phone: '',
  specialty: '',
  license: '',
  hourlyRate: 1500,
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

const showPassword = ref(false)
const isLoading = ref(false)

const handleRegister = async () => {
  if (formData.value.password !== formData.value.confirmPassword) {
    alert('Passwords do not match')
    return
  }

  if (!formData.value.agreeTerms) {
    alert('Please agree to terms and conditions')
    return
  }

  isLoading.value = true
  
  try {
    await authStore.registerDoctor(formData.value)
    router.push('/doctor/dashboard')
  } catch (err) {
    console.error('Registration failed:', err)
    alert('Registration failed. Please try again.')
  } finally {
    isLoading.value = false
  }
}
</script>