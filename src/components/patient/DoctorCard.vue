<template>
  <div class="doctor-card">
    <div class="text-5xl mb-3">{{ doctor.image }}</div>
    <h3 class="text-xl font-semibold">{{ doctor.name }}</h3>
    <p class="text-gray-600 text-sm mb-3">{{ doctor.specialty }}</p>
    <div class="flex items-center gap-2 mb-3">
      <Star class="text-yellow-400" :size="18" fill="currentColor" />
      <span class="font-semibold">{{ doctor.rating }}</span>
      <span class="text-gray-600 text-sm">({{ doctor.reviews }})</span>
    </div>
    <p class="text-green-600 font-semibold mb-4">KES {{ doctor.price }}/session</p>
    <p class="text-gray-600 text-sm mb-4">{{ doctor.availability }} slots available</p>
    <button 
      @click="$emit('book', doctor)"
      class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold transition"
    >
      Book Now
    </button>
  </div>
</template>

<script setup>
import { Star } from 'lucide-vue-next';

defineProps({
  doctor: {
    type: Object,
    required: true
  }
});

defineEmits(['book']);
</script>