<template>
  <div class="relative min-h-screen overflow-hidden bg-black text-white">
    <!-- Background Animations -->
    <Aurora class="absolute inset-0 -z-40" />
    <Particles class="absolute inset-0 -z-30" />
    <Beams class="absolute inset-0 -z-20 opacity-40" />
    <BlobCursor />
    <DotGrid class="absolute inset-0 -z-10 opacity-10" />

    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10 h-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">

        <!-- Logo -->
        <div class="flex items-center gap-2 min-w-fit">
          <div class="w-8 h-8 flex-shrink-0">
            <LoopLogo class="w-full h-full" />
          </div>
          <span class="hidden sm:block text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ona Daktari
          </span>
        </div>

        <!-- Desktop Nav -->
        <div class="hidden md:flex gap-8 items-center">
          <a href="#about" class="text-gray-300 hover:text-white transition text-sm">About</a>
          <a href="#features" class="text-gray-300 hover:text-white transition text-sm">Features</a>
          <router-link to="/patient/login" class="text-gray-300 hover:text-white transition text-sm">Patient</router-link>
          <router-link to="/doctor/login" class="text-gray-300 hover:text-white transition text-sm">Doctor</router-link>
          <button @click="$router.push('/patient/register')" class="get-started-btn">
            Get Started
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button class="md:hidden text-white" @click="mobileMenuOpen = !mobileMenuOpen">
          <svg class="w-6 h-6" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition name="fade">
        <div v-if="mobileMenuOpen" class="md:hidden bg-black/95 p-4 border-t border-white/10 space-y-2">
          <a href="#about" class="block py-2 text-gray-300 hover:text-white">About</a>
          <a href="#features" class="block py-2 text-gray-300 hover:text-white">Features</a>
          <router-link to="/patient/login" class="block py-2 text-gray-300 hover:text-white">Patient</router-link>
          <router-link to="/doctor/login" class="block py-2 text-gray-300 hover:text-white">Doctor</router-link>
          <button @click="$router.push('/patient/register')" class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition font-medium">
            Get Started
          </button>
        </div>
      </transition>
    </nav>

    <!-- HERO SECTION -->
    <section class="relative w-full pt-20 pb-16">
      <Spotlight class="absolute -top-30 -right-40 w-96 h-76 bg-blue-500/20 rounded-full blur-3xl" />

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <!-- Left Content -->
          <div class="space-y-6">
            <h1 class="text-5xl md:text-6xl font-bold leading-tight">
              <span class="block text-white">Connect With</span>
              <span class="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Specialist Doctors
              </span>
              <span class="block text-white">Anytime, Anywhere</span>
            </h1>

            <p class="text-base text-gray-300 max-w-md">
              Book appointments with verified specialists, consult instantly, and manage your health from home.
            </p>

            <div class="flex flex-col sm:flex-row gap-3 pt-4">
              <button 
                @click="$router.push('/patient/register')"
                class="get-started-btn"
              >
                Book Appointment
              </button>
              <button 
                @click="$router.push('/doctor/register')"
                class="border-2 border-purple-500 text-purple-400 px-6 py-2 rounded-lg hover:bg-purple-500/20 transition font-semibold text-sm"
              >
                Join as Doctor
              </button>
            </div>
          </div>

          <!-- Right Visual -->
           <div class="relative flex justify-center items-center h-64 md:h-80">
            <IridescentOrb class="absolute w-56 h-56 blur-2xl opacity-60" />
            <div class="relative z-10 text-center">
              <img src="/doctor.png" alt="Doctor" class="w-32 h-32 object-contain animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS SECTION -->
    <section class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid md:grid-cols-4 gap-6 bg-white/10 p-8 rounded-2xl border border-white/10 backdrop-blur">
        <ScrollReveal threshold="0.5">
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-400 mb-1">
              <CountUp :endValue="500" :duration="2000" />+
            </div>
            <p class="text-sm text-gray-300">Happy Patients</p>
          </div>
        </ScrollReveal>

        <ScrollReveal threshold="0.5">
          <div class="text-center">
            <div class="text-3xl font-bold text-green-400 mb-1">
              <CountUp :endValue="25" :duration="2000" />+
            </div>
            <p class="text-sm text-gray-300">Verified Doctors</p>
          </div>
        </ScrollReveal>

        <ScrollReveal threshold="0.5">
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-400 mb-1">
              <CountUp :endValue="1500" :duration="2000" />+
            </div>
            <p class="text-sm text-gray-300">Appointments</p>
          </div>
        </ScrollReveal>

        <ScrollReveal threshold="0.5">
          <div class="text-center">
            <div class="text-3xl font-bold text-pink-400 mb-1">
              <CountUp :endValue="98" :duration="2000" />%
            </div>
            <p class="text-sm text-gray-300">Satisfaction</p>
          </div>
        </ScrollReveal>
      </div>
    </section>

    
    <!-- FEATURES SECTION -->
    <section id="features" class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="text-3xl font-bold text-center text-white mb-12">
        Why Choose Ona Daktari?
      </h2>

      <div class="grid md:grid-cols-3 gap-6">
        <div v-for="(feature, idx) in features" :key="idx" class="p-6 bg-white/10 backdrop-blur border border-white/10 rounded-2xl hover:bg-white/20 transition">
          <img :src="`/${feature.icon}`" :alt="feature.title" class="w-12 h-12 mb-3 object-contain" />
          <h3 class="text-lg font-bold text-white mb-2">{{ feature.title }}</h3>
          <p class="text-sm text-gray-400">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS SECTION -->
    <section class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="text-3xl font-bold text-center text-white mb-12">
        How It Works
      </h2>

      <div class="grid md:grid-cols-4 gap-6">
        <div v-for="(step, idx) in steps" :key="idx" class="text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">
            {{ idx + 1 }}
          </div>
          <h3 class="text-base font-bold text-white mb-1">{{ step.title }}</h3>
          <p class="text-xs text-gray-400">{{ step.description }}</p>
        </div>
      </div>
    </section>

    <!-- CTA SECTION -->
    <section class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 overflow-hidden">
        <Beams class="absolute inset-0 opacity-10" />
        
        <div class="relative z-10 text-center">
          <h2 class="text-3xl font-bold text-white mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p class="text-base text-white/90 mb-6 max-w-2xl mx-auto">
            Join thousands of patients and doctors using Ona Daktari today.
          </p>

          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              @click="$router.push('/patient/register')"
              class="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition font-semibold text-sm"
            >
              Get Started Now
            </button>
            <button 
              @click="$router.push('/')"
              class="border-2 border-white text-white px-6 py-2 rounded-lg hover:bg-white/10 transition font-semibold text-sm"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="relative border-t border-white/10 mt-16 bg-black/50 backdrop-blur">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <!-- Brand -->
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8">
                <LoopLogo class="w-full h-full" />
              </div>
              <span class="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Ona Daktari
              </span>
            </div>
            <p class="text-sm text-gray-400">
              Connecting patients with healthcare professionals anytime, anywhere.
            </p>
          </div>

          <!-- Quick Links -->
          <div class="space-y-4">
            <h3 class="font-semibold text-white">Quick Links</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#about" class="text-gray-400 hover:text-white transition">About Us</a></li>
              <li><a href="#features" class="text-gray-400 hover:text-white transition">Features</a></li>
              <li><router-link to="/patient/login" class="text-gray-400 hover:text-white transition">Patient Login</router-link></li>
              <li><router-link to="/doctor/login" class="text-gray-400 hover:text-white transition">Doctor Login</router-link></li>
            </ul>
          </div>

          <!-- For Users -->
          <div class="space-y-4">
            <h3 class="font-semibold text-white">For Users</h3>
            <ul class="space-y-2 text-sm">
              <li><router-link to="/patient/register" class="text-gray-400 hover:text-white transition">Patient Register</router-link></li>
              <li><router-link to="/doctor/register" class="text-gray-400 hover:text-white transition">Doctor Register</router-link></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">How It Works</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Contact Support</a></li>
            </ul>
          </div>

          <!-- Connect -->
          <div class="space-y-4">
            <h3 class="font-semibold text-white">Connect With Us</h3>
            <div class="flex gap-4">
              <a href="#" class="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-400 flex items-center justify-center transition">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7a10.6 10.6 0 01-9-5.5z"/></svg>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-white/10 hover:bg-purple-600 flex items-center justify-center transition">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="border-t border-white/10 pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2024 Ona Daktari. All rights reserved.</p>
            <div class="flex gap-6 mt-4 md:mt-0">
              <a href="#" class="hover:text-white transition">Privacy Policy</a>
              <a href="#" class="hover:text-white transition">Terms of Service</a>
              <a href="#" class="hover:text-white transition">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from "vue";

const Aurora = defineAsyncComponent(() => import("@/components/animations/Aurora.vue"));
const Particles = defineAsyncComponent(() => import("@/components/animations/Particles.vue"));
const BlobCursor = defineAsyncComponent(() => import("@/components/animations/BlobCursor.vue"));
const DotGrid = defineAsyncComponent(() => import("@/components/animations/DotGrid.vue"));
const LoopLogo = defineAsyncComponent(() => import("@/components/animations/LoopLogo.vue"));
const Beams = defineAsyncComponent(() => import("@/components/animations/Beams.vue"));
const Spotlight = defineAsyncComponent(() => import("@/components/animations/Spotlight.vue"));
const IridescentOrb = defineAsyncComponent(() => import("@/components/animations/IridescentOrb.vue"));
const CountUp = defineAsyncComponent(() => import("@/components/animations/CountUp.vue"));
const ScrollReveal = defineAsyncComponent(() => import("@/components/animations/ScrollReveal.vue"));

const mobileMenuOpen = ref(false);

const features = [
  { icon: "medical-appointment.png", title: "Quick Bookings", description: "Book appointments instantly with verified doctors." },
  { icon: "message.png", title: "Direct Chat", description: "Talk to your doctor anytime." },
  { icon: "drugstore.png", title: "E-Pharmacy", description: "Order prescriptions seamlessly." },
  { icon: "shield.png", title: "Secure & Safe", description: "Industry-grade encrypted health data." },
  { icon: "rating.png", title: "Verified Doctors", description: "Licensed and certified medical professionals." },
  { icon: "smartphone-call.png", title: "24/7 Available", description: "Access healthcare whenever you need it." }
];

const steps = [
  { title: "Create Account", description: "Sign up in seconds." },
  { title: "Find a Doctor", description: "Search specialists with ease." },
  { title: "Book & Consult", description: "Schedule or chat instantly." },
  { title: "Get Better", description: "Follow treatment and reorder meds." }
];
</script>

<style scoped>
/* Get Started Button Hover Effect */
.get-started-btn {
  @apply bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium relative overflow-hidden transition-all duration-300;
  position: relative;
}

.get-started-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.get-started-btn:hover::before {
  left: 100%;
}

.get-started-btn:hover {
  @apply shadow-lg shadow-blue-500/50 scale-105;
}

/* Smooth scroll */
html { scroll-behavior: smooth; }

/* Fade transition for mobile menu */
.fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; max-height: 0; }
.fade-enter-to, .fade-leave-from { opacity: 1; max-height: 500px; }
</style>