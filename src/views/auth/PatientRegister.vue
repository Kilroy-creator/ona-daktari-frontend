<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
      
      <!-- Header -->
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Patient Registration</h2>
        <p class="text-gray-600 mt-2">Create your Ona Daktari account</p>
      </div>

      <!-- Error Message -->
      <div v-if="authStore.error" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-600 text-sm">{{ authStore.error }}</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleRegister" class="space-y-4">

        <!-- Full Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input 
            v-model="formData.name"
            type="text"
            placeholder="John Doe"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input 
            v-model="formData.email"
            type="email"
            placeholder="your@email.com"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <!-- Phone -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input 
            v-model="formData.phone"
            type="tel"
            placeholder="+254 712 345 678"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <!-- Gender -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <select
            v-model="formData.gender"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <!-- Date of Birth -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
          <input 
            v-model="formData.date_of_birth"
            type="date"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div class="relative">
            <input 
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
              minlength="6"
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

        <!-- Confirm Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
          <div class="relative">
            <input 
              v-model="formData.password_confirmation"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
              minlength="6"
            />
            <button 
              type="button" 
              @click="showConfirmPassword = !showConfirmPassword" 
              class="absolute right-3 top-2.5 text-gray-500"
            >
              {{ showConfirmPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
        </div>

        <!-- Submit -->
        <button 
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold transition disabled:opacity-50 mt-6"
          :disabled="authStore.loading"
        >
          {{ authStore.loading ? 'Creating account...' : 'Register' }}
        </button>

        <!-- Toggle Login Link -->
        <p class="text-center text-gray-600 mt-4">
          Already have an account?
          <router-link to="/patient/login" class="text-blue-600 hover:underline font-medium">
            Login
          </router-link>
        </p>
      </form>

      <!-- Google Button -->
      <div class="mt-6 pt-6 border-t border-gray-200">
        <button 
          type="button"
          class="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          <span>🔍</span>
          <span class="text-sm font-medium text-gray-700">Sign up with Google</span>
        </button>
      </div>

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
  gender: '',
  date_of_birth: '',
  password: '',
  password_confirmation: '',
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const handleRegister = async () => {
  // Clear previous errors
  authStore.error = null

  // Validate passwords match
  if (formData.value.password !== formData.value.password_confirmation) {
    authStore.error = 'Passwords do not match'
    return
  }

  // Validate password length
  if (formData.value.password.length < 6) {
    authStore.error = 'Password must be at least 6 characters'
    return
  }

  try {
    console.log('Registering with data:', formData.value)
    await authStore.registerPatient(formData.value)
    
    // Success - redirect to login or dashboard
    alert('Registration successful! Please login.')
    router.push('/patient/login')
  } catch (err) {
    console.error('Registration failed:', err)
    // Error is already set in authStore.error
  }
}
</script>