<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Patient Login</h2>
        <p class="text-gray-600 mt-2">Welcome back to Ona Daktari</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
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

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div class="relative">
            <input 
              v-model="formData.password" 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="••••••••" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
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
          <a href="#" class="text-sm text-blue-600 hover:underline">Forgot password?</a>
        </div>

        <button 
          type="submit" 
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold transition disabled:opacity-50"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>

        <p class="text-center text-gray-600">
          Don't have an account? 
          <router-link to="/patient/register" class="text-blue-600 hover:underline">Register</router-link>
        </p>
      </form>

      <div class="mt-6 pt-6 border-t border-gray-200">
        <button class="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
          <span>🔍</span>
          <span class="text-sm font-medium text-gray-700">Sign in with Google</span>
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
  email: '',
  password: ''
})

const showPassword = ref(false)
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  
  try {
    await authStore.login(formData.value.email, formData.value.password, 'patient')
    router.push('/patient/dashboard')
  } catch (err) {
    console.error('Login failed:', err)
    alert('Login failed. Please check your credentials.')
  } finally {
    isLoading.value = false
  }
}
</script>