<template>
  <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
    <!-- Doctor Avatar with ScrollFloat -->
    <div class="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <ScrollFloat :speed="0.2">
        <div class="w-32 h-32 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-blue-600 shadow-xl">
          {{ doctor.name.charAt(0) }}
        </div>
      </ScrollFloat>
      
      <!-- Status Badge -->
      <div class="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
        <span class="w-2 h-2 bg-white rounded-full animate-pulse"></span>
        Available
      </div>
    </div>

    <!-- Doctor Info -->
    <div class="p-6">
      <h3 class="text-xl font-bold text-gray-900 mb-1">{{ doctor.name }}</h3>
      <p class="text-blue-600 font-medium mb-3">{{ doctor.specialty }}</p>
      
      <!-- Stats with CountUp -->
      <div class="flex items-center gap-4 mb-4 text-sm text-gray-600">
        <div class="flex items-center gap-1">
          <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="font-semibold">
            <CountUp :end-value="doctor.rating || 4.8" :duration="1500" />
          </span>
        </div>
        <div class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <CountUp :end-value="doctor.patients || 250" :duration="2000" />+ patients
        </div>
      </div>

      <!-- Experience -->
      <div class="mb-4 text-sm text-gray-600">
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>
            <CountUp :end-value="doctor.experience || 12" :duration="1500" /> years experience
          </span>
        </div>
      </div>

      <!-- Price -->
      <div class="mb-4">
        <p class="text-2xl font-bold text-green-600">
          KES <CountUp :end-value="doctor.price" :duration="1500" />
          <span class="text-sm font-normal text-gray-500">/session</span>
        </p>
      </div>

      <!-- Action Buttons with MagicBento Effect -->
      <div class="flex gap-2">
        <MagnetButton class="flex-1">
          <button
            @click="$emit('book', doctor)"
            class="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book Now
          </button>
        </MagnetButton>
        
        <button
          class="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          title="View Profile"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import CountUp from '@/components/animations/CountUp.vue'
import ScrollFloat from '@/components/animations/ScrollFloat.vue'
import MagnetButton from '@/components/animations/MagnetButton.vue'

defineProps({
  doctor: {
    type: Object,
    required: true
  }
})

defineEmits(['book'])
</script>