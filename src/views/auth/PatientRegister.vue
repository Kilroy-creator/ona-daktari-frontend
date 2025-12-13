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
          <SplitText text="Patient Portal" class="text-4xl font-bold mb-6" />
        </ScrollReveal>

        <ScrollReveal :delay="400">
          <p class="text-lg text-blue-100 mb-8">
            Join thousands of patients accessing quality healthcare anytime, anywhere.
          </p>
        </ScrollReveal>

        <ScrollReveal :delay="600">
          <div class="grid grid-cols-3 gap-6 text-center">
            <div>
              <div class="text-3xl font-bold">
                <CountUp :endValue="500" :duration="2000" />+
              </div>
              <div class="text-sm text-blue-200 mt-1">Doctors</div>
            </div>
            <div>
              <div class="text-3xl font-bold">
                <CountUp :endValue="10000" :duration="2000" />+
              </div>
              <div class="text-sm text-blue-200 mt-1">Patients</div>
            </div>
            <div>
              <div class="text-3xl font-bold">
                <CountUp :endValue="50000" :duration="2000" />+
              </div>
              <div class="text-sm text-blue-200 mt-1">Appointments</div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>

    <!-- Right Side - Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-4 relative z-10">
      <FadeContent>
        <div class="w-full max-w-md">
          <div class="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-10">
            <!-- Header -->
            <div class="text-center mb-10">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-5">
                <span class="text-3xl">👤</span>
              </div>
              <h2 class="text-3xl font-bold text-gray-900">Patient Registration</h2>
              <p class="text-gray-600 mt-3">Create your Ona Daktari account</p>
            </div>

            <!-- Error Message -->
            <div v-if="authStore.error" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p class="text-red-600 text-sm">{{ authStore.error }}</p>
            </div>

            <!-- Form -->
            <AnimatedContent>
              <form @submit.prevent="handleRegister" class="space-y-5 max-h-[65vh] overflow-y-auto pr-2">

                <!-- Full Name -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <TrueFocus>
                    <input 
                      v-model="formData.name"
                      type="text"
                      placeholder="John Doe"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                      required
                    />
                  </TrueFocus>
                </div>

                <!-- Email -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <TrueFocus>
                    <input 
                      v-model="formData.email"
                      type="email"
                      placeholder="your@email.com"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                      required
                    />
                  </TrueFocus>
                </div>

                <!-- Phone -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <TrueFocus>
                    <input 
                      v-model="formData.phone"
                      type="tel"
                      placeholder="+254 712 345 678"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                  </TrueFocus>
                </div>

                <!-- Gender -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <TrueFocus>
                    <select
                      v-model="formData.gender"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition">
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </TrueFocus>
                </div>

                <!-- Date of Birth -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <TrueFocus>
                    <input 
                      v-model="formData.date_of_birth"
                      type="date"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                  </TrueFocus>
                </div>

                <!-- Password -->
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
                        minlength="6"
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

                <!-- Confirm Password -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <TrueFocus>
                    <div class="relative">
                      <input 
                        v-model="formData.password_confirmation"
                        :type="showConfirmPassword ? 'text' : 'password'"
                        placeholder="••••••••"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        required
                        minlength="6"
                      />
                      <button 
                        type="button" 
                        @click="showConfirmPassword = !showConfirmPassword" 
                        class="absolute right-3 top-3 text-gray-500 text-sm"
                      >
                        {{ showConfirmPassword ? 'Hide' : 'Show' }}
                      </button>
                    </div>
                  </TrueFocus>
                </div>

                <!-- Submit -->
                <MagnetButton class="w-full">
                  <button 
                    type="submit"
                    class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition disabled:opacity-50 mt-6"
                    :disabled="authStore.loading"
                  >
                    {{ authStore.loading ? 'Creating account...' : 'Register' }}
                  </button>
                </MagnetButton>

                <!-- Toggle Login Link -->
                <p class="text-center text-gray-600 mt-4">
                  Already have an account?
                  <router-link to="/patient/login" class="text-blue-600 hover:underline font-medium">
                    Login
                  </router-link>
                </p>
              </form>
            </AnimatedContent>

            <!-- Social Login -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <button 
                type="button"
                class="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span class="text-sm font-medium text-gray-700">Sign up with Google</span>
              </button>
            </div>

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
  }
}
</script>