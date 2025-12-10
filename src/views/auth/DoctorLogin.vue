<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Doctor Login</h2>
        <p class="text-gray-600 mt-2">Welcome back to your practice</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
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

        <div class="flex items-center justify-between">
          <label class="flex items-center gap-2">
            <input type="checkbox" class="w-4 h-4" />
            <span class="text-sm text-gray-600">Remember me</span>
          </label>
          <a href="#" class="text-sm text-purple-600 hover:underline">Forgot password?</a>
        </div>

        <button 
          type="submit" 
          class="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 font-semibold transition disabled:opacity-50"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>

        <p class="text-center text-gray-600 text-sm">
          New to Ona Daktari? 
          <router-link to="/doctor/register" class="text-purple-600 hover:underline">Register here</router-link>
        </p>
      </form>

      <div class="mt-6 pt-6 border-t border-gray-200">
        <button class="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
          <span>🔍</span>
          <span class="text-sm font-medium text-gray-700">Sign in with Google</span>
        </button>
      </div>

      <!-- Info Box -->
      <div class="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
        <p class="text-sm text-purple-900">
          <span class="font-semibold">Demo Credentials:</span><br/>
          Email: doctor@example.com<br/>
          Password: password123
        </p>
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
  email: '',
  password: ''
})

const showPassword = ref(false)
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  
  try {
    await authStore.login(formData.value.email, formData.value.password, 'doctor')
    router.push('/doctor/dashboard')
  } catch (err) {
    console.error('Login failed:', err)
    alert('Login failed. Please check your credentials.')
  } finally {
    isLoading.value = false
  }
}
</script>