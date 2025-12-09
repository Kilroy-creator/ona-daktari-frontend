<template>
<div class="min-h-screen bg-gray-50">
<div class="max-w-7xl mx-auto px-4 py-8">
<h1 class="text-3xl font-bold mb-6">Find a Specialist</h1>
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
<div v-for="doc in filteredDoctors" :key="doc.id" class="bg-white p-6 rounded-lg">
<div class="text-4xl mb-3">{{ doc.image }}</div>
<h3 class="text-xl font-semibold">{{ doc.name }}</h3>
<p class="text-gray-600">{{ doc.specialty }}</p>
<p class="text-green-600 font-semibold">KES {{ doc.price }}/session</p>
<button @click="$emit('select', doc)" class="w-full bg-blue-600 text-white py-2 mt-4 rounded">Book Now</button>
</div>
</div>
</div>
</div>
</template>


<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'
const app = useAppStore()
const filteredDoctors = computed(() => app.filteredDoctors)
</script>