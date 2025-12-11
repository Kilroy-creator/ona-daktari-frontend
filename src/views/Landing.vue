<template>
  <div class="relative min-h-screen overflow-hidden bg-black">
    <!-- Background Animations -->
    <Aurora class="absolute inset-0 -z-40" />
    <Particles class="absolute inset-0 -z-30" />
    <Beams class="absolute inset-0 -z-20 opacity-40" />
    <BlobCursor />
    <DotGrid class="absolute inset-0 -z-10 opacity-10" />

    <!-- Navigation -->
    <nav class="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">

        <!-- Logo -->
        <div class="flex items-center gap-3">
          <div class="relative w-10 h-10">
            <LoopLogo class="w-full h-full" />
            <CircularText text="Ona Daktari" class="absolute inset-0" />
          </div>

          <SplitText
            text="Ona Daktari"
            class="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          />
        </div>

        <!-- Desktop Nav -->
        <div class="hidden md:flex gap-6 items-center">
          <a href="#about" class="nav-link">About</a>
          <a href="#features" class="nav-link">Features</a>
          <router-link to="/patient/login" class="nav-link">Patient</router-link>
          <router-link to="/doctor/login" class="nav-link">Doctor</router-link>

          <MagnetButton
            @click="$router.push('/patient/register')"
            class="btn-primary"
          >
            Get Started
          </MagnetButton>
        </div>

        <!-- Mobile Menu Button -->
        <button class="md:hidden text-white" @click="mobileMenuOpen = !mobileMenuOpen">
          <svg class="w-6 h-6" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition name="fade">
        <div v-if="mobileMenuOpen" class="md:hidden bg-black/95 p-4 border-t border-white/10 space-y-2">
          <a href="#about" class="mobile-link">About</a>
          <a href="#features" class="mobile-link">Features</a>
          <router-link to="/patient/login" class="mobile-link">Patient</router-link>
          <router-link to="/doctor/login" class="mobile-link">Doctor</router-link>

          <MagnetButton
            @click="$router.push('/patient/register')"
            class="btn-primary w-full"
          >
            Get Started
          </MagnetButton>
        </div>
      </transition>
    </nav>

    <!-- HERO -->
    <section class="hero-container">
      <Spotlight class="spotlight-blue" />
      <Spotlight class="spotlight-purple" />

      <div class="grid md:grid-cols-2 gap-12 items-center relative z-20">

        <!-- Left -->
        <div>
          <RotatingText
            :words="['Healthcare', 'Wellness', 'Fitness']"
            class="hero-title"
          />

          <SplitText
            text="Connect With Specialist Doctors, Anytime, Anywhere"
            class="hero-subtitle"
          />

          <p class="hero-description">
            Book appointments with verified specialists, consult instantly, and manage your health from home.
          </p>

          <div class="hero-buttons">
            <MagnetButton
              @click="$router.push('/patient/register')"
              class="btn-primary-lg"
            >
              Book Appointment
            </MagnetButton>

            <MagnetButton
              @click="$router.push('/doctor/register')"
              class="btn-secondary-lg"
            >
              Join as Doctor
            </MagnetButton>
          </div>
        </div>

        <!-- Right -->
        <div class="relative flex justify-center items-center">
          <IridescentOrb class="orb" />

          <div class="relative z-10 text-center">
            <div class="text-8xl mb-4 animate-bounce">👨‍⚕️</div>
            <GradientText text="Premium Healthcare" class="text-3xl font-bold" />
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="stats-section">
      <div class="stats-grid">

        <ScrollReveal threshold="0.5">
          <div class="stat-box">
            <CountUp :endValue="500" class="stat-number text-blue-400" />
            <p class="stat-label">Happy Patients</p>
          </div>
        </ScrollReveal>

        <ScrollReveal threshold="0.5">
          <div class="stat-box">
            <CountUp :endValue="25" class="stat-number text-green-400" />
            <p class="stat-label">Verified Doctors</p>
          </div>
        </ScrollReveal>

        <ScrollReveal threshold="0.5">
          <div class="stat-box">
            <CountUp :endValue="1500" class="stat-number text-purple-400" />
            <p class="stat-label">Appointments</p>
          </div>
        </ScrollReveal>

        <ScrollReveal threshold="0.5">
          <div class="stat-box">
            <CountUp :endValue="98" class="stat-number text-pink-400" />
            <p class="stat-label">Satisfaction %</p>
          </div>
        </ScrollReveal>

      </div>
    </section>

    <!-- FEATURES -->
    <section id="features" class="features-section">
      <ScrollReveal threshold="0.3">
        <h2 class="features-title">
          <SplitText text="Why Choose Ona Daktari?" />
        </h2>
      </ScrollReveal>

      <div class="features-grid">
        <ScrollReveal
          v-for="(feature, idx) in features"
          :key="idx"
          threshold="0.3"
        >
          <AnimatedContent>
            <div class="feature-card">
              <div class="feature-icon">{{ feature.icon }}</div>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-text">{{ feature.description }}</p>
            </div>
          </AnimatedContent>
        </ScrollReveal>
      </div>
    </section>

    <!-- STEPS -->
    <section class="steps-section">
      <h2 class="steps-title">
        <SplitText text="How It Works" />
      </h2>

      <div class="steps-grid">
        <AnimatedList v-for="(step, idx) in steps" :key="idx" :index="idx">
          <div class="step-card">
            <div class="step-number">{{ idx + 1 }}</div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-text">{{ step.description }}</p>
          </div>
        </AnimatedList>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="cta-card">
        <Beams class="absolute inset-0 opacity-10" />

        <div class="relative z-10 text-center">
          <h2 class="cta-title">
            <SplitText text="Ready to Take Control of Your Health?" />
          </h2>

          <p class="cta-description">
            Join thousands of patients and doctors using Ona Daktari today.
          </p>

          <div class="cta-buttons">
            <MagnetButton
              @click="$router.push('/patient/register')"
              class="btn-primary-lg"
            >
              Get Started Now
            </MagnetButton>

            <MagnetButton
              @click="$router.push('/about')"
              class="btn-secondary-lg"
            >
              Learn More
            </MagnetButton>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <FooterComponent />
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from "vue";
import FooterComponent from "@/components/common/Footer.vue";

// Lazy-loaded animation components
const Aurora = defineAsyncComponent(() =>
  import("@/components/animations/Aurora.vue")
);
const Particles = defineAsyncComponent(() =>
  import("@/components/animations/Particles.vue")
);
const BlobCursor = defineAsyncComponent(() =>
  import("@/components/animations/BlobCursor.vue")
);
const DotGrid = defineAsyncComponent(() =>
  import("@/components/animations/DotGrid.vue")
);
const LoopLogo = defineAsyncComponent(() =>
  import("@/components/animations/LoopLogo.vue")
);
const CircularText = defineAsyncComponent(() =>
  import("@/components/animations/CircularText.vue")
);
const SplitText = defineAsyncComponent(() =>
  import("@/components/animations/SplitText.vue")
);
const RotatingText = defineAsyncComponent(() =>
  import("@/components/animations/RotatingText.vue")
);
const MagnetButton = defineAsyncComponent(() =>
  import("@/components/animations/MagnetButton.vue")
);
const Beams = defineAsyncComponent(() =>
  import("@/components/animations/Beams.vue")
);
const GradientText = defineAsyncComponent(() =>
  import("@/components/animations/GradientText.vue")
);
const Spotlight = defineAsyncComponent(() =>
  import("@/components/animations/Spotlight.vue")
);
const IridescentOrb = defineAsyncComponent(() =>
  import("@/components/animations/IridescentOrb.vue")
);
const CountUp = defineAsyncComponent(() =>
  import("@/components/animations/CountUp.vue")
);
const ScrollReveal = defineAsyncComponent(() =>
  import("@/components/animations/ScrollReveal.vue")
);
const AnimatedContent = defineAsyncComponent(() =>
  import("@/components/animations/AnimatedContent.vue")
);
const AnimatedList = defineAsyncComponent(() =>
  import("@/components/animations/AnimatedList.vue")
);

const mobileMenuOpen = ref(false);

const features = [
  { icon: "⏱️", title: "Quick Bookings", description: "Book appointments instantly with verified doctors." },
  { icon: "💬", title: "Direct Chat", description: "Talk to your doctor anytime." },
  { icon: "💊", title: "E-Pharmacy", description: "Order prescriptions seamlessly." },
  { icon: "🔒", title: "Secure & Safe", description: "Industry-grade encrypted health data." },
  { icon: "⭐", title: "Verified Doctors", description: "Licensed and certified medical professionals." },
  { icon: "📱", title: "24/7 Available", description: "Access healthcare whenever you need it." }
];

const steps = [
  { title: "Create Account", description: "Sign up in seconds." },
  { title: "Find a Doctor", description: "Search specialists with ease." },
  { title: "Book & Consult", description: "Schedule or chat instantly." },
  { title: "Get Better", description: "Follow treatment and reorder meds." }
];
</script>


<style scoped>
/* Layout styling */
.nav-link { @apply text-gray-300 hover:text-white transition; }
.mobile-link { @apply block py-2 text-gray-300 hover:text-white; }
.btn-primary { @apply bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg; }
.btn-primary-lg { @apply bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold; }
.btn-secondary-lg { @apply border-2 border-purple-500 text-purple-400 px-8 py-4 rounded-xl font-semibold; }

.hero-container { @apply relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20; }
.hero-title { @apply text-5xl md:text-6xl font-bold text-white mb-6; }
.hero-subtitle { @apply text-xl md:text-2xl text-gray-300 mb-8; }
.hero-description { @apply text-gray-400 mb-8 text-lg; }
.hero-buttons { @apply flex flex-col sm:flex-row gap-4; }

.orb { @apply absolute w-64 h-64 blur-2xl opacity-60; }

.stats-section { @apply relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16; }
.stats-grid { @apply grid md:grid-cols-4 gap-8 bg-white/10 p-12 rounded-2xl border border-white/10 backdrop-blur; }
.stat-box { @apply text-center; }
.stat-number { @apply text-4xl font-bold mb-2; }
.stat-label { @apply text-gray-300; }

.features-section { @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20; }
.features-title { @apply text-4xl font-bold text-center text-white mb-16; }
.features-grid { @apply grid md:grid-cols-3 gap-8; }
.feature-card { @apply p-8 bg-white/10 backdrop-blur border border-white/10 rounded-2xl; }
.feature-icon { @apply text-5xl mb-4; }
.feature-title { @apply text-2xl font-bold text-white mb-3; }
.feature-text { @apply text-gray-400; }

.steps-section { @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20; }
.steps-title { @apply text-4xl font-bold text-center text-white mb-16; }
.steps-grid { @apply grid md:grid-cols-4 gap-8; }
.step-card { @apply text-center; }
.step-number { @apply w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4; }
.step-title { @apply text-xl font-bold text-white mb-2; }
.step-text { @apply text-gray-400; }

.cta-section { @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20; }
.cta-card { @apply relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-20 overflow-hidden; }
.cta-title { @apply text-4xl font-bold text-white mb-6; }
.cta-description { @apply text-xl text-white/90 mb-8; }
.cta-buttons { @apply flex flex-col sm:flex-row gap-4 justify-center; }

.spotlight-blue { @apply absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl; }
.spotlight-purple { @apply absolute top-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl; }

/* Smooth scroll */
html { scroll-behavior: smooth; }
</style>
