<template>
  <div class="min-h-screen flex relative overflow-hidden">
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
          <SplitText text="Doctor Portal" class="text-4xl font-bold mb-6" />
        </ScrollReveal>

        <ScrollReveal :delay="400">
          <p class="text-lg text-blue-100 mb-8">
            Manage appointments, consult patients, and stay connected with your healthcare platform.
          </p>
        </ScrollReveal>

        <ScrollReveal :delay="600">
          <div class="grid grid-cols-3 gap-6 text-center">
            <div>
              <div class="text-3xl font-bold">
                <CountUp :end-value="500" :duration="2000" />+
              </div>
              <div class="text-sm text-blue-200 mt-1">Doctors</div>
            </div>

            <div>
              <div class="text-3xl font-bold">
                <CountUp :end-value="10000" :duration="2000" />+
              </div>
              <div class="text-sm text-blue-200 mt-1">Patients</div>
            </div>

            <div>
              <div class="text-3xl font-bold">
                <CountUp :end-value="12000" :duration="2000" />+
              </div>
              <div class="text-sm text-blue-200 mt-1">Consultations</div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>

    <!-- Right Side - Doctor Login Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
      <FadeContent>
        <div class="w-full max-w-md">
          <div class="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8">

            <!-- Fixed Title (No toggle here because this is login only) -->
            <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">
              Doctor Login
            </h2>

            <AnimatedContent>
              <form @submit.prevent="handleLogin" class="space-y-5">

                <!-- Email -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <TrueFocus>
                    <input
                      v-model="formData.email"
                      type="email"
                      placeholder="doctor@email.com"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      required
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
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
                    class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                    :disabled="isLoading"
                  >
                    {{ isLoading ? 'Logging in...' : 'Sign In' }}
                  </button>
                </MagnetButton>

                <p class="text-center text-sm text-gray-600">
                  New doctor?
                  <router-link to="/doctor/register" class="text-blue-600 hover:text-blue-700">Register here</router-link>
                </p>

              </form>
            </AnimatedContent>

            <!-- Google Login -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <button class="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <span>🔍</span>
                <span class="text-sm font-medium text-gray-700">Sign in with Google</span>
              </button>
            </div>

            <!-- Demo Credentials -->
            <div class="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p class="text-sm text-blue-900">
                <span class="font-semibold">Demo Credentials:</span><br />
                Email: doctor@example.com<br />
                Password: password123
              </p>
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
