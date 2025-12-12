<template>
  <div class="space-y-10 p-6">

    <!-- Header -->
    <div class="text-center">
      <h1 class="text-4xl font-bold text-purple-700">Health & Wellness</h1>
      <p class="text-gray-600 mt-2">Daily tips, health articles, and wellness guidance.</p>
    </div>

    <!-- Articles Grid -->
    <div class="grid md:grid-cols-3 gap-6">

      <div 
        v-for="tip in tips" 
        :key="tip.title"
        class="p-6 bg-white rounded-2xl shadow-md border border-purple-100 hover:shadow-xl transition"
      >
        <div class="text-purple-600 text-4xl mb-3">
          {{ tip.icon }}
        </div>

        <h3 class="text-xl font-bold text-gray-900 mb-2">{{ tip.title }}</h3>

        <p class="text-gray-700 text-sm">{{ tip.text }}</p>

        <button 
          class="mt-4 px-4 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-xl text-sm font-semibold transition">
          Read More
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
const tips = [
  {
    icon: "💧",
    title: "Stay Hydrated",
    text: "Drink at least 6-8 glasses of water daily to maintain healthy body function."
  },
  {
    icon: "🏃‍♂️",
    title: "Exercise Regularly",
    text: "Engage in at least 30 minutes of physical activity daily."
  },
  {
    icon: "🍎",
    title: "Healthy Eating",
    text: "Eat a balanced diet rich in vegetables, fruits, and whole grains."
  },
  {
    icon: "💤",
    title: "Good Sleep",
    text: "Aim for 7–9 hours of quality sleep each night."
  },
  {
    icon: "🧘‍♂️",
    title: "Stress Management",
    text: "Practice mindfulness, meditation, or breathing exercises."
  },
  {
    icon: "🩺",
    title: "Regular Checkups",
    text: "Visit your doctor for routine medical checkups and screenings."
  }
]
</script>
