<template>
  <div class="min-h-screen flex relative overflow-hidden">
    <!-- Galaxy Background -->
    <Galaxy
      :mouse-repulsion="true"
      :mouse-interaction="true"
      :density="1.5"
      :glow-intensity="0.5"
      :saturation="0.8"
      :hue-shift="240"
      class="absolute inset-0 z-0"
    />

    <!-- Aurora Background -->
    <Aurora />

    <!-- Particles -->
    <Particles :count="50" />

    <!-- Left Side Panel with IridescentOrb -->
    <div class="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
      <div class="absolute inset-0 flex items-center justify-center">
        <IridescentOrb />
      </div>

      <div class="relative z-10 text-white text-center max-w-md">
        <ScrollReveal :delay="0">
          <RotatingText
            :texts="['Ona Daktari', 'Doctor Hub', 'Smart Practice']"
            mainClassName="px-3 bg-blue-300 text-black overflow-hidden py-1 justify-center rounded-lg inline-block mb-6"
            :staggerFrom="'last'"
            :initial="{ y: '100%' }"
            :animate="{ y: 0 }"
            :exit="{ y: '-120%' }"
            :staggerDuration="0.025"
            splitLevelClassName="overflow-hidden pb-1"
            :transition="{ type: 'spring', damping: 30, stiffness: 400 }"
            :rotationInterval="2000"
          />
        </ScrollReveal>

        <ScrollReveal :delay="200">
          <SplitText text="Doctor Portal" class="text-4xl font-bold mb-6" />
        </ScrollReveal>

        <ScrollReveal :delay="400">
          <p class="text-lg text-blue-100 mb-8">
            Manage appointments, consult patients, and stay connected.
          </p>
        </ScrollReveal>

        <ScrollReveal :delay="600">
          <div class="grid grid-cols-3 gap-6 text-center">
            <div>
              <div class="text-3xl font-bold text-blue-300">
                <CountUp :endValue="50" :duration="2000" />+
              </div>
              <div class="text-sm text-blue-200 mt-1">Doctors</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-purple-300">
                <CountUp :endValue="5000" :duration="2000" />+
              </div>
              <div class="text-sm text-blue-200 mt-1">Patients</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-pink-300">
                <CountUp :endValue="2500" :duration="2000" />+
              </div>
              <div class="text-sm text-blue-200 mt-1">Appointments</div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>

    <!-- Right Side - Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
      <FadeContent>
        <div class="w-full max-w-md">
          <div class="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
            <!-- Error Alert -->
            <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <div class="flex items-center gap-3">
                <span class="text-2xl">⚠️</span>
                <div class="flex-1">
                  <p class="font-semibold text-red-900 text-sm">{{ isLogin ? 'Login' : 'Registration' }} Failed</p>
                  <p class="text-xs text-red-700">{{ errorMessage }}</p>
                </div>
              </div>
            </div>

            <!-- Toggle Between Login/Register -->
            <div class="flex gap-2 mb-8 bg-gray-100 p-1 rounded-lg">
              <button
                @click="isLogin = true"
                :class="[
                  'flex-1 py-2 rounded-lg font-medium transition',
                  isLogin ? 'bg-white text-blue-600 shadow' : 'text-gray-600'
                ]"
              >
                Login
              </button>
              <button
                @click="isLogin = false"
                :class="[
                  'flex-1 py-2 rounded-lg font-medium transition',
                  !isLogin ? 'bg-white text-blue-600 shadow' : 'text-gray-600'
                ]"
              >
                Register
              </button>
            </div>

            <!-- Login Form -->
            <AnimatedContent v-if="isLogin">
              <form @submit.prevent="handleLogin" class="space-y-5">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <TrueFocus>
                    <input
                      v-model="loginForm.email"
                      type="email"
                      placeholder="doctor@email.com"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                      required
                    />
                  </TrueFocus>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <TrueFocus>
                    <div class="relative">
                      <input
                        v-model="loginForm.password"
                        :type="showPasswordLogin ? 'text' : 'password'"
                        placeholder="••••••••"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        required
                      />
                      <button
                        type="button"
                        @click="showPasswordLogin = !showPasswordLogin"
                        class="absolute right-3 top-3 text-gray-500 text-sm"
                      >
                        {{ showPasswordLogin ? 'Hide' : 'Show' }}
                      </button>
                    </div>
                  </TrueFocus>
                </div>

                <div class="flex items-center justify-between">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" class="rounded text-blue-600 focus:ring-blue-500" />
                    <span class="text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="#" class="text-sm text-blue-600 hover:text-blue-700">Forgot password?</a>
                </div>

                <MagnetButton class="w-full">
                  <button
                    type="submit"
                    class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="isLoading"
                  >
                    {{ isLoading ? 'Signing in...' : 'Sign In' }}
                  </button>
                </MagnetButton>

                <div class="relative my-6">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-300"></div>
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span class="px-4 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    class="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    <svg class="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span class="text-sm font-medium">Google</span>
                  </button>

                  <button
                    type="button"
                    class="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span class="text-sm font-medium">GitHub</span>
                  </button>
                </div>

                <!-- Link to Patient Login -->
                <div class="text-center mt-4">
                  <p class="text-sm text-gray-600">
                    Not a doctor? 
                    <router-link to="/patient/login" class="text-blue-600 hover:text-blue-700 font-semibold">
                      Login as Patient
                    </router-link>
                  </p>
                </div>
              </form>
            </AnimatedContent>

            <!-- Register Form -->
            <AnimatedContent v-else>
              <form @submit.prevent="handleRegister" class="space-y-5 max-h-[60vh] overflow-y-auto">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <TrueFocus>
                    <input
                      v-model="formData.name"
                      type="text"
                      placeholder="Dr. John Smith"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                      required
                    />
                  </TrueFocus>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <TrueFocus>
                    <input
                      v-model="formData.email"
                      type="email"
                      placeholder="doctor@email.com"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                      required
                    />
                  </TrueFocus>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <TrueFocus>
                    <input
                      v-model="formData.phone"
                      type="tel"
                      placeholder="+254 7xx xxx xxx"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                      required
                    />
                  </TrueFocus>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                  <TrueFocus>
                    <select
                      v-model="formData.specialty"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
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
                  </TrueFocus>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                  <TrueFocus>
                    <input
                      v-model.number="formData.experience"
                      type="number"
                      placeholder="5"
                      min="0"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                      required
                    />
                  </TrueFocus>
                </div>
                <div>
  <label class="block text-sm font-medium text-gray-700 mb-2">
    Medical License Number
  </label>
  <TrueFocus>
    <input
      v-model="formData.license_number"
      type="text"
      placeholder="e.g., KMP-12345"
      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
      required
    />
  </TrueFocus>
  <p class="text-xs text-gray-500 mt-1">
    Enter your official medical license number
  </p>
</div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <TrueFocus>
                    <div class="relative">
                      <input
                        v-model="formData.password"
                        :type="showPassword ? 'text' : 'password'"
                        placeholder="••••••••"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        required
                      />
                      <button
                        type="button"
                        @click="showPassword = !showPassword"
                        class="absolute right-3 top-3 text-gray-500 text-sm"
                      >
                        {{ showPassword ? 'Hide' : 'Show' }}
                      </button>
                    </div>
                  </TrueFocus>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <TrueFocus>
                    <input
                      v-model="formData.confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                      required
                    />
                  </TrueFocus>
                </div>

                <label class="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" class="mt-1 rounded text-blue-600 focus:ring-blue-500" v-model="formData.agreeTerms" required />
                  <span class="text-sm text-gray-600">
                    I agree to the <a href="#" class="text-blue-600 hover:text-blue-700">Terms of Service</a> and <a href="#" class="text-blue-600 hover:text-blue-700">Privacy Policy</a>
                  </span>
                </label>

                <MagnetButton class="w-full">
                  <button
                    type="submit"
                    class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="isLoading"
                  >
                    {{ isLoading ? 'Registering...' : 'Create Account' }}
                  </button>
                </MagnetButton>
              </form>
            </AnimatedContent>
          </div>
        </div>
      </FadeContent>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import Aurora from '@/components/animations/Aurora.vue'
import Particles from '@/components/animations/Particles.vue'
import IridescentOrb from '@/components/animations/IridescentOrb.vue'
import SplitText from '@/components/animations/SplitText.vue'
import FadeContent from '@/components/animations/FadeContent.vue'
import TrueFocus from '@/components/animations/TrueFocus.vue'
import MagnetButton from '@/components/animations/MagnetButton.vue'
import AnimatedContent from '@/components/animations/AnimatedContent.vue'
import ScrollReveal from '@/components/animations/ScrollReveal.vue'
import CountUp from '@/components/animations/CountUp.vue'
import Galaxy from '@/components/animations/Galaxy.vue'
import RotatingText from '@/components/animations/RotatingText.vue'

const router = useRouter()
const authStore = useAuthStore()

const isLogin = ref(true)
const errorMessage = ref('')

const loginForm = ref({
  email: '',
  password: ''
})

const formData = ref({
  name: '',
  email: '',
  phone: '',
  specialty: '',
  experience: 0,        // ✅ Match database
  license_number: '',   // ✅ Added license number field
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

const showPasswordLogin = ref(false)
const showPassword = ref(false)
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    console.log('🔐 Attempting doctor login...')
    
    await authStore.login(
      loginForm.value.email,
      loginForm.value.password,
      'doctor'
    )
    
    console.log('✅ Login successful, redirecting...')
    router.push('/doctor/dashboard')
  } catch (err) {
    console.error('❌ Login failed:', err)
    errorMessage.value = err.message || 'Login failed. Please check your credentials.'
  } finally {
    isLoading.value = false
  }
}

const handleRegister = async () => {
  if (formData.value.password !== formData.value.confirmPassword) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  if (!formData.value.agreeTerms) {
    errorMessage.value = 'Please agree to Terms of Service and Privacy Policy'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    console.log('📝 Attempting doctor registration...')
    
    await authStore.registerDoctor({
      full_name: formData.value.name,
      email: formData.value.email,
      phone: formData.value.phone,
      specialty: formData.value.specialty,      // ✅ Changed from specialization
      experience: formData.value.experience,    // ✅ Added experience
      password: formData.value.password,
      password_confirmation: formData.value.confirmPassword,
    })

    console.log('✅ Registration successful, redirecting...')
    router.push('/doctor/dashboard')
  } catch (err) {
    console.error('❌ Registration failed:', err)
    errorMessage.value = err.message || 'Registration failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>