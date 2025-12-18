// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import Landing from '@/views/Landing.vue'
import PatientLogin from '@/views/auth/PatientLogin.vue'
import PatientRegister from '@/views/auth/PatientRegister.vue'
import DoctorLogin from '@/views/auth/DoctorLogin.vue'
import DoctorRegister from '@/views/auth/DoctorRegister.vue'

import PatientDashboard from '@/views/patient/PatientDashboard.vue'
import DoctorDashboard from '@/views/doctor/DoctorDashboard.vue'
import PatientProfile from '@/views/patient/PatientProfile.vue'
import HealthRecords from '@/views/patient/HealthRecords.vue'

const routes = [
  { 
    path: '/', 
    name: 'Landing', 
    component: Landing 
  },

  // Patient Auth - Multiple paths support
  { 
    path: '/patient/login', 
    name: 'PatientLogin', 
    component: PatientLogin 
  },
  { 
    path: '/login', 
    redirect: '/patient/login' 
  },
  { 
    path: '/patient/register', 
    name: 'PatientRegister', 
    component: PatientRegister 
  },
  { 
    path: '/patient-register', 
    redirect: '/patient/register' 
  },

  // Patient Routes (Protected)
  { 
    path: '/patient/dashboard', 
    name: 'PatientDashboard', 
    component: PatientDashboard, 
    meta: { requiresAuth: true } 
  },
  {
    path: '/patient/profile',
    name: 'PatientProfile',
    component: PatientProfile,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    redirect: '/patient/profile'
  },
  {
    path: '/patient/health-records',
    name: 'HealthRecords',
    component: HealthRecords,
    meta: { requiresAuth: true }
  },
  {
    path: '/health-records',
    redirect: '/patient/health-records'
  },
  {
    path: '/patient/appointments',
    name: 'PatientAppointments',
    component: () => import('@/views/patient/MyAppointments.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/patient/chat',
    name: 'PatientChat',
    component: () => import('@/components/chat/PatientChat.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/patient/pharmacy',
    name: 'PatientPharmacy',
    component: () => import('@/views/patient/Pharmacy.vue'),
    meta: { requiresAuth: true }
  },

  // Doctor Auth - Multiple paths support
  { 
    path: '/doctor/login', 
    name: 'DoctorLogin', 
    component: DoctorLogin 
  },
  { 
    path: '/doctor-login', 
    redirect: '/doctor/login' 
  },
  { 
    path: '/doctor/register', 
    name: 'DoctorRegister', 
    component: DoctorRegister 
  },
  { 
    path: '/doctor-register', 
    redirect: '/doctor/register' 
  },
  { 
    path: '/doctor/dashboard', 
    name: 'DoctorDashboard', 
    component: DoctorDashboard, 
    meta: { requiresAuth: true } 
  },

  // Public Pages
  {
    path: '/doctors',
    name: 'Doctors',
    component: () => import('@/pages/Doctors.vue')
  },
  {
    path: '/health',
    name: 'Health',
    component: () => import('@/pages/Health.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  try {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore?.token) {
      const loginPath = to.path.startsWith('/doctor') 
        ? '/doctor/login' 
        : '/patient/login'
      
      return next(loginPath)
    }
    
    next()
  } catch (error) {
    console.error('Router guard error:', error)
    next()
  }
})

export default router