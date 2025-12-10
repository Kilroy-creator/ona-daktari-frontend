<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
    <!-- Navigation -->
    <nav class="sticky top-0 z-50 bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <span class="text-3xl">🏥</span>
          <div class="text-2xl font-bold text-blue-600">Ona Daktari</div>
        </div>
        
        <div class="hidden md:flex gap-6 items-center">
          <router-link to="#about" class="text-gray-700 hover:text-blue-600 transition">About</router-link>
          <router-link to="#features" class="text-gray-700 hover:text-blue-600 transition">Features</router-link>
          <router-link to="/patient/login" class="text-gray-700 hover:text-blue-600 transition">Patient Login</router-link>
          <router-link to="/doctor/login" class="text-gray-700 hover:text-blue-600 transition">Doctor Login</router-link>
          <router-link to="/patient/register" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">Get Started</router-link>
        </div>

        <button class="md:hidden" @click="mobileMenuOpen = !mobileMenuOpen">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t p-4 space-y-2">
        <router-link to="#about" class="block py-2 hover:text-blue-600 transition">About</router-link>
        <router-link to="#features" class="block py-2 hover:text-blue-600 transition">Features</router-link>
        <router-link to="/patient/login" class="block py-2 hover:text-blue-600 transition">Patient Login</router-link>
        <router-link to="/doctor/login" class="block py-2 hover:text-blue-600 transition">Doctor Login</router-link>
        <router-link to="/patient/register" class="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-center">Get Started</router-link>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Doctor, <span class="text-blue-600">Anytime, Anywhere</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8">
            Book appointments with specialist doctors, consult instantly, and manage your health from the comfort of your home.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <router-link to="/patient/register" class="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 font-semibold transition text-center">
              Book Appointment
            </router-link>
            <router-link to="/doctor/register" class="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 font-semibold transition text-center">
              Join as Doctor
            </router-link>
          </div>
        </div>
        <div class="text-center">
          <div class="text-8xl mb-4">👨‍⚕️</div>
          <div class="text-6xl">💊</div>
          <div class="text-8xl">🏥</div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="bg-blue-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-4 gap-8">
          <div class="text-center">
            <p class="text-4xl font-bold mb-2">50K+</p>
            <p class="text-blue-100">Happy Patients</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-bold mb-2">2.5K+</p>
            <p class="text-blue-100">Verified Doctors</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-bold mb-2">150K+</p>
            <p class="text-blue-100">Appointments</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-bold mb-2">98%</p>
            <p class="text-blue-100">Satisfaction</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 class="text-4xl font-bold text-center text-gray-900 mb-16">Why Choose Ona Daktari?</h2>
      
      <div class="grid md:grid-cols-3 gap-8">
        <div class="p-8 bg-white border-2 border-blue-200 rounded-lg hover:shadow-xl transition">
          <div class="text-5xl mb-4">⏱️</div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Quick Bookings</h3>
          <p class="text-gray-600">Book appointments in minutes with instant confirmation from verified specialists.</p>
        </div>

        <div class="p-8 bg-white border-2 border-green-200 rounded-lg hover:shadow-xl transition">
          <div class="text-5xl mb-4">💬</div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Direct Chat</h3>
          <p class="text-gray-600">Communicate with your doctor anytime for quick consultations and follow-ups.</p>
        </div>

        <div class="p-8 bg-white border-2 border-purple-200 rounded-lg hover:shadow-xl transition">
          <div class="text-5xl mb-4">💊</div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">E-Pharmacy</h3>
          <p class="text-gray-600">Get prescriptions delivered to your doorstep conveniently and securely.</p>
        </div>

        <div class="p-8 bg-white border-2 border-orange-200 rounded-lg hover:shadow-xl transition">
          <div class="text-5xl mb-4">🔒</div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Secure & Safe</h3>
          <p class="text-gray-600">Your health data is encrypted and protected with industry-standard security.</p>
        </div>

        <div class="p-8 bg-white border-2 border-red-200 rounded-lg hover:shadow-xl transition">
          <div class="text-5xl mb-4">⭐</div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Verified Doctors</h3>
          <p class="text-gray-600">All doctors are fully licensed and verified to ensure quality care.</p>
        </div>

        <div class="p-8 bg-white border-2 border-indigo-200 rounded-lg hover:shadow-xl transition">
          <div class="text-5xl mb-4">📱</div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">24/7 Available</h3>
          <p class="text-gray-600">Book and consult with doctors at your convenience, anytime you need.</p>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="bg-gray-50 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-bold text-center text-gray-900 mb-16">How It Works</h2>
        
        <div class="grid md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">1</div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Create Account</h3>
            <p class="text-gray-600">Sign up as a patient or doctor in seconds</p>
          </div>

          <div class="text-center">
            <div class="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">2</div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Find a Doctor</h3>
            <p class="text-gray-600">Browse specialists and check their availability</p>
          </div>

          <div class="text-center">
            <div class="w-20 h-20 bg-purple-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">3</div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Book & Consult</h3>
            <p class="text-gray-600">Schedule appointment or chat instantly with doctor</p>
          </div>

          <div class="text-center">
            <div class="w-20 h-20 bg-orange-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">4</div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Get Better</h3>
            <p class="text-gray-600">Follow treatment and order medicines online</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-bold mb-6">Ready to Take Control of Your Health?</h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of patients and doctors using Ona Daktari to improve healthcare access and delivery.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/patient/register" class="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-center">
            Get Started Now
          </router-link>
          <router-link to="/about" class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition text-center">
            Learn More
          </router-link>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer-component />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Footer from '@/components/common/Footer.vue'

const mobileMenuOpen = ref(false)
</script>