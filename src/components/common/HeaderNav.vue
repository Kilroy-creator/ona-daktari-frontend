<template>
  <nav class="bg-white shadow sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2">
        <span class="text-2xl">🏥</span>
        <h1 class="text-2xl font-bold" :class="titleColorClass">{{ title }}</h1>
      </router-link>
      
      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center gap-6">
        <!-- Navigation Links -->
        <div class="flex gap-4">
          <router-link 
            v-for="link in navLinks" 
            :key="link.path"
            :to="link.path"
            class="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            {{ link.label }}
          </router-link>
        </div>

        <!-- Right Side Items -->
        <div class="flex items-center gap-4 pl-4 border-l border-gray-200">
          <!-- Notifications -->
          <button class="relative p-2 text-gray-600 hover:text-blue-600 transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {{ notificationCount }}
            </span>
          </button>

          <!-- User Menu -->
          <div class="relative" @click="toggleUserMenu">
            <button class="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition">
              <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                {{ userInitial }}
              </div>
              <span class="font-semibold">{{ userName }}</span>
              <svg class="w-4 h-4" :class="{ 'rotate-180': userMenuOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            <!-- User Dropdown -->
            <div v-if="userMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
              <router-link 
                v-if="userType === 'patient'"
                to="/patient/dashboard" 
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 first:rounded-t-lg"
              >
                📊 Dashboard
              </router-link>
              <router-link 
                v-else
                to="/doctor/dashboard" 
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 first:rounded-t-lg"
              >
                📊 Dashboard
              </router-link>
              
              <router-link 
                v-if="userType === 'doctor'"
                to="/doctor/profile" 
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                👤 Profile
              </router-link>
              
              <button 
                @click="handleLogout" 
                class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 last:rounded-b-lg border-t"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button class="md:hidden text-gray-600" @click="mobileMenuOpen = !mobileMenuOpen">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200 bg-white">
      <div class="px-4 py-2 space-y-2">
        <router-link 
          v-for="link in navLinks" 
          :key="link.path"
          :to="link.path"
          class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
        >
          {{ link.label }}
        </router-link>
        
        <button 
          @click="handleLogout" 
          class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded transition border-t mt-2 pt-2"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const props = defineProps({
  title: {
    type: String,
    default: 'Ona Daktari'
  },
  userType: {
    type: String,
    enum: ['patient', 'doctor'],
    default: 'patient'
  },
  userName: {
    type: String,
    default: 'User'
  },
  notificationCount: {
    type: Number,
    default: 3
  },
  navLinks: {
    type: Array,
    default: () => [
      { path: '/', label: 'Home' },
      { path: '#', label: 'Services' },
      { path: '#', label: 'About' }
    ]
  }
})

const emit = defineEmits(['logout'])

const mobileMenuOpen = ref(false)
const userMenuOpen = ref(false)

const titleColorClass = computed(() => {
  return props.userType === 'patient' ? 'text-blue-600' : 'text-purple-600'
})

const userInitial = computed(() => {
  return props.userName.charAt(0).toUpperCase()
})

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

const handleLogout = async () => {
  authStore.logout()
  emit('logout')
  await router.push('/')
}
</script>

<style scoped>
</style>