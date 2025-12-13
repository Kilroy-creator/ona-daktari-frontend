<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
    <div class="max-w-7xl mx-auto">
      
      <!-- Back Button -->
      <button 
        @click="$router.back()"
        class="mb-6 flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition text-gray-700 font-semibold"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </button>

      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
          Health & Wellness
        </h1>
        <p class="text-gray-600 text-lg">Daily tips, health articles, and wellness guidance</p>
      </div>

      <!-- Articles Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="tip in tips" 
          :key="tip.title"
          class="group p-6 bg-white rounded-2xl shadow-lg border-2 border-purple-100 hover:shadow-2xl hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-1"
        >
          <div :class="`inline-flex p-3 rounded-xl bg-gradient-to-br ${tip.color} text-white mb-4 group-hover:scale-110 transition-transform text-4xl`">
            {{ tip.icon }}
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-2">{{ tip.title }}</h3>
          <p class="text-gray-700 text-sm mb-4">{{ tip.text }}</p>

          <button class="px-4 py-2 text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl text-sm font-semibold transition shadow-md hover:shadow-lg">
            Read More
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const tips = [
  {
    icon: "💧",
    color: "from-blue-500 to-blue-600",
    title: "Stay Hydrated",
    text: "Drink at least 6-8 glasses of water daily to maintain healthy body function."
  },
  {
    icon: "🏃‍♂️",
    color: "from-red-500 to-pink-600",
    title: "Exercise Regularly",
    text: "Engage in at least 30 minutes of physical activity daily."
  },
  {
    icon: "🍎",
    color: "from-green-500 to-emerald-600",
    title: "Healthy Eating",
    text: "Eat a balanced diet rich in vegetables, fruits, and whole grains."
  },
  {
    icon: "💤",
    color: "from-indigo-500 to-purple-600",
    title: "Good Sleep",
    text: "Aim for 7–9 hours of quality sleep each night."
  },
  {
    icon: "🧘‍♂️",
    color: "from-purple-500 to-pink-600",
    title: "Stress Management",
    text: "Practice mindfulness, meditation, or breathing exercises."
  },
  {
    icon: "🩺",
    color: "from-orange-500 to-red-600",
    title: "Regular Checkups",
    text: "Visit your doctor for routine medical checkups and screenings."
  }
]
</script>

<style scoped>
.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>