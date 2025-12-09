<template>
<div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
<div class="grid md:grid-cols-2 gap-12 items-center">
<div>
<h1 class="text-5xl font-bold text-gray-900 mb-6">Connect With Specialist Doctors</h1>
<p class="text-xl text-gray-600 mb-8">Book appointments, consult with specialists, and manage your health from home.</p>
<div class="flex gap-4">
<button @click="$router.push('/patient/register')" class="bg-blue-600 text-white px-6 py-3 rounded-lg">Book Now</button>
<button @click="$router.push('/doctor/register')" class="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg">Join as Doctor</button>
</div>
</div>
<div class="text-6xl text-center">👨‍⚕️💊🏥</div>
</div>
</section>
</div>
</template>