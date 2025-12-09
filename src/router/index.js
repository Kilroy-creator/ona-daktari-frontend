import { createRouter, createWebHistory } from 'vue-router'
import Landing from '@/views/Landing.vue'
import PatientLogin from '@/views/auth/PatientLogin.vue'
import PatientRegister from '@/views/auth/PatientRegister.vue'
import DoctorLogin from '@/views/auth/DoctorLogin.vue'
import DoctorRegister from '@/views/auth/DoctorRegister.vue'
import PatientDashboard from '@/views/patient/PatientDashboard.vue'
import DoctorDashboard from '@/views/doctor/DoctorDashboard.vue'


const routes = [
{ path: '/', name: 'Landing', component: Landing },
{ path: '/patient/login', component: PatientLogin },
{ path: '/patient/register', component: PatientRegister },
{ path: '/doctor/login', component: DoctorLogin },
{ path: '/doctor/register', component: DoctorRegister },
{ path: '/patient', component: PatientDashboard },
{ path: '/doctor', component: DoctorDashboard }
]


const router = createRouter({
history: createWebHistory(),
routes
})


export default router