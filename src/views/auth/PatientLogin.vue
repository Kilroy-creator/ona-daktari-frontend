<template>
<div class="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
<div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
<h2 class="text-3xl font-bold text-gray-900">Patient Login</h2>
<div class="space-y-4 mt-6">
<input v-model="local.email" type="email" placeholder="your@email.com" class="w-full px-4 py-2 border rounded-lg" />
<div class="relative">
<input :type="showPassword ? 'text' : 'password'" v-model="local.password" placeholder="••••••" class="w-full px-4 py-2 border rounded-lg" />
<button class="absolute right-3 top-2.5" @click="showPassword = !showPassword">{{ showPassword ? 'Hide' : 'Show' }}</button>
</div>
<button @click="login" class="w-full bg-blue-600 text-white py-2 rounded-lg">Login</button>
</div>
</div>
</div>
</template>


<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const local = ref({ email: '', password: '' })
const showPassword = ref(false)


function login(){
if(local.value.email && local.value.password){
auth.login({ email: local.value.email, type: 'patient' })
// route to patient dashboard
window.location.href = '/patient'
}
}
</script>