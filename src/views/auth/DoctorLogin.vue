<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center p-4">
    <div class="form-container fade-enter-active">
      <div class="form-header">
        <h2 class="form-title">Doctor Login</h2>
        <p class="form-subtitle">Welcome back</p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="form-group">
        <div>
          <label class="form-label">Email</label>
          <input
            v-model="formData.email"
            type="email"
            placeholder="doctor@email.com"
            class="input-field"
            required
          />
        </div>
        
        <div>
          <label class="form-label">Password</label>
          <div class="relative">
            <input
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="input-field"
              required
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-2.5 text-gray-500"
            >
              <EyeOff v-if="showPassword" :size="20" />
              <Eye v-else :size="20" />
            </button>
          </div>
        </div>
        
        <button type="submit" class="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 font-semibold w-full">
          Login
        </button>
        
        <p class="text-center text-gray-600">
          Don't have an account?
          <router-link to="/doctor/register" class="text-purple-600 hover:underline">
            Register
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Eye, EyeOff } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const showPassword = ref(false);
const formData = ref({
  email: '',
  password: '',
});

const handleSubmit = () => {
  if (formData.value.email && formData.value.password) {
    authStore.login({ 
      email: formData.value.email, 
      name: formData.value.email.split('@')[0] 
    }, 'doctor');
    router.push('/doctor/dashboard');
  }
};
</script>