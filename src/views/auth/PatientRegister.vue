<template>
  <div class="min-h-screen bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center p-4">
    <div class="form-container fade-enter-active">
      <div class="form-header">
        <h2 class="form-title">Create Account</h2>
        <p class="form-subtitle">Join Ona Daktari as a Patient</p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="form-group">
        <div>
          <label class="form-label">Full Name</label>
          <input
            v-model="formData.name"
            type="text"
            placeholder="John Doe"
            class="input-field"
            required
          />
        </div>
        
        <div>
          <label class="form-label">Email</label>
          <input
            v-model="formData.email"
            type="email"
            placeholder="your@email.com"
            class="input-field"
            required
          />
        </div>
        
        <div>
          <label class="form-label">Phone</label>
          <input
            v-model="formData.phone"
            type="tel"
            placeholder="+254 7xx xxx xxx"
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
        
        <button type="submit" class="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-semibold w-full">
          Create Account
        </button>
        
        <p class="text-center text-gray-600">
          Already have an account?
          <router-link to="/patient/login" class="text-green-600 hover:underline">
            Login
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
  name: '',
  email: '',
  phone: '',
  password: '',
});

const handleSubmit = () => {
  if (formData.value.email && formData.value.password && formData.value.name) {
    authStore.register({ 
      email: formData.value.email, 
      name: formData.value.name,
      phone: formData.value.phone
    }, 'patient');
    router.push('/patient/dashboard');
  }
};
</script>