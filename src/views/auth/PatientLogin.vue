<template>
  <div class="min-h-screen flex relative overflow-hidden bg-black text-white">

    <!-- Vuebits Animated Background -->
    <Aurora class="absolute inset-0 opacity-30" />
    <Beams class="absolute inset-0 opacity-20" />
    <Particles class="absolute inset-0" />

    <!-- Left Side -->
    <div class="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
      <div class="relative z-10 text-center max-w-md">

        <!-- Rotating Text -->
         <RotatingText
    :texts="['Ona Daktari', 'Your Health Partner', 'Smart Healthcare']"
    mainClassName="px-3 bg-green-300 text-black overflow-hidden py-1 justify-center rounded-lg inline-block mb-6"
    :staggerFrom="'last'"
    :initial="{ y: '100%' }"
    :animate="{ y: 0 }"
    :exit="{ y: '-120%' }"
    :staggerDuration="0.025"
    splitLevelClassName="overflow-hidden pb-1"
    :transition="{ type: 'spring', damping: 30, stiffness: 400 }"
    :rotationInterval="2000"
  />


        <p class="text-lg text-gray-300 mb-8">
          Connect with healthcare professionals anytime, anywhere.
        </p>

        <!-- Stats with CountUp -->
        <div class="grid grid-cols-3 gap-6 mt-12">
          <div class="text-center">
            <div class="text-4xl font-bold text-blue-400">
              <CountUp :end-val="5000" :duration="20" />50
            </div>
            <div class="text-sm text-gray-400 mt-2">Doctors</div>
          </div>

          <div class="text-center">
            <div class="text-4xl font-bold text-purple-400">
              <CountUp :end-val="10000" :duration="20" />500
            </div>
            <div class="text-sm text-gray-400 mt-2">Patients</div>
          </div>

          <div class="text-center">
            <div class="text-4xl font-bold text-pink-400">
              <CountUp :end-val="50000" :duration="20" />2500
            </div>
            <div class="text-sm text-gray-400 mt-2">Appointments</div>
          </div>
        </div>

      </div>
    </div>

    <!-- Right Side -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8">
      <div class="w-full max-w-md">

        <!-- Form Card -->
        <div class="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">

          <!-- Header -->
          <div class="text-center mb-8">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl">❤️</span>
            </div>
            <h2 class="text-3xl font-bold text-white mb-2">
              Welcome Back
            </h2>
            <p class="text-gray-300">Sign in to your patient account</p>
          </div>

          <!-- Tabs -->
          <div class="flex gap-2 mb-8 bg-white/20 p-1 rounded-lg">
            <button
              @click="isLogin = true"
              :class="[
                'flex-1 py-2 rounded-lg font-semibold transition',
                isLogin ? 'bg-white text-blue-600' : 'text-gray-200'
              ]"
            >
              Login
            </button>
            <button
              @click="isLogin = false"
              :class="[
                'flex-1 py-2 rounded-lg font-semibold transition',
                !isLogin ? 'bg-white text-blue-600' : 'text-gray-200'
              ]"
            >
              Register
            </button>
          </div>

          <!-- LOGIN FORM -->
          <form v-if="isLogin" @submit.prevent="handleLogin" class="space-y-5">

            <div>
              <label class="block text-sm text-gray-200 mb-2">Email</label>
              <input
                v-model="loginForm.email"
                type="email"
                placeholder="you@example.com"
                class="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label class="block text-sm text-gray-200 mb-2">Password</label>
              <input
                v-model="loginForm.password"
                type="password"
                placeholder="••••••••"
                class="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg"
            >
              {{ isLoading ? 'Signing in...' : 'Sign In' }}
            </button>

          </form>

          <!-- REGISTER FORM -->
          <form v-else @submit.prevent="handleRegister" class="space-y-4">
            <div>
              <label class="block text-sm text-gray-200 mb-2">Full Name</label>
              <input
                v-model="registerForm.name"
                type="text"
                class="w-full px-4 py-3 bg-white/20 text-white rounded-lg border border-white/30 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label class="block text-sm text-gray-200 mb-2">Email</label>
              <input
                v-model="registerForm.email"
                type="email"
                class="w-full px-4 py-3 bg-white/20 text-white rounded-lg border border-white/30"
                required
              />
            </div>

            <div>
              <label class="block text-sm text-gray-200 mb-2">Phone</label>
              <input
                v-model="registerForm.phone"
                type="tel"
                class="w-full px-4 py-3 bg-white/20 text-white rounded-lg border border-white/30"
                required
              />
            </div>

            <div>
              <label class="block text-sm text-gray-200 mb-2">Password</label>
              <input
                v-model="registerForm.password"
                type="password"
                class="w-full px-4 py-3 bg-white/20 text-white rounded-lg border border-white/30"
                required
              />
            </div>

            <div>
              <label class="block text-sm text-gray-200 mb-2">Confirm Password</label>
              <input
                v-model="registerForm.confirmPassword"
                type="password"
                class="w-full px-4 py-3 bg-white/20 text-white rounded-lg border border-white/30"
                required
              />
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg"
            >
              {{ isLoading ? 'Creating account...' : 'Create Account' }}
            </button>
          </form>
        </div>

        <p class="text-center text-gray-300 text-xs mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// FIXED IMPORTS
import { CountUp, RotatingText, Aurora, Beams, Particles } from '@/components/animations'

const router = useRouter()
const authStore = useAuthStore()

const isLogin = ref(true)
const isLoading = ref(false)

const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

const handleLogin = async () => {
  isLoading.value = true
  try {
    await authStore.login(loginForm.value.email, loginForm.value.password, 'patient')
    router.push('/patient/dashboard')
  } catch (err) {
    alert('Login failed: ' + err.message)
  } finally {
    isLoading.value = false
  }
}

const handleRegister = async () => {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert('Passwords do not match!')
    return
  }

  isLoading.value = true
  try {
    await authStore.registerPatient({
      full_name: registerForm.value.name,
      email: registerForm.value.email,
      phone: registerForm.value.phone,
      password: registerForm.value.password,
      password_confirmation: registerForm.value.confirmPassword
    })
    router.push('/patient/dashboard')
  } catch (err) {
    alert('Registration failed: ' + err.message)
  } finally {
    isLoading.value = false
  }
}
</script>
