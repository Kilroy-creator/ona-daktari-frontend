import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import Landing from '@/views/Landing.vue'
import PatientLogin from '@/views/auth/PatientLogin.vue'
import PatientRegister from '@/views/auth/PatientRegister.vue'
import DoctorLogin from '@/views/auth/DoctorLogin.vue'
import DoctorRegister from '@/views/auth/DoctorRegister.vue'

import PatientDashboard from '@/views/patient/PatientDashboard.vue'
import DoctorDashboard from '@/views/doctor/DoctorDashboard.vue'

const routes = [
  { path: '/', name: 'Landing', component: Landing },

  // Patient Auth
  { path: '/patient/login', component: PatientLogin },
  { path: '/patient/register', component: PatientRegister },
  { path: '/patient/dashboard', component: PatientDashboard, meta: { requiresAuth: true } },

  // Doctor Auth
  { path: '/doctor/login', component: DoctorLogin },
  { path: '/doctor/register', component: DoctorRegister },
  { path: '/doctor/dashboard', component: DoctorDashboard, meta: { requiresAuth: true } },

  // PUBLIC PAGES YOU REQUESTED
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

// Route Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.token) {
    if (to.path.includes('doctor')) {
      next('/doctor/login')
    } else {
      next('/patient/login')
    }
  } else {
    next()
  }
})

export default router
