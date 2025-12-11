import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const userType = ref(null)
  const token = ref(null)

  // ------------------------------------------------------------
  // Sanctum CSRF Cookie Loader (REQUIRED before login/register)
  // ------------------------------------------------------------
  async function loadSanctum() {
    await axios.get('/sanctum/csrf-cookie')
  }

  // ------------------------------------------------------------
  // UNIVERSAL LOGIN
  // ------------------------------------------------------------
  async function login(email, password, type) {
    await loadSanctum()

    let endpoint = null

    if (type === 'doctor') {
      endpoint = '/api/doctors/login'
    } else if (type === 'patient') {
      endpoint = '/api/patient/login'
    } else {
      throw new Error('Invalid user type for login')
    }

    const res = await axios.post(endpoint, { email, password })

    user.value = res.data.user
    userType.value = type
    token.value = res.data.token

    // Set token in axios defaults (auth header)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`

    return true
  }

  // ------------------------------------------------------------
  // REGISTER DOCTOR
  // ------------------------------------------------------------
  async function registerDoctor(data) {
    await loadSanctum()

    const res = await axios.post('/api/doctors/register', data)

    user.value = res.data.user
    userType.value = 'doctor'
    token.value = res.data.token

    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`

    return true
  }

  // ------------------------------------------------------------
  // REGISTER PATIENT
  // ------------------------------------------------------------
  async function registerPatient(data) {
    await loadSanctum()

    const res = await axios.post('/api/patient/register', data)

    user.value = res.data.user
    userType.value = 'patient'
    token.value = res.data.token

    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`

    return true
  }

  // ------------------------------------------------------------
  // LOGOUT
  // ------------------------------------------------------------
  function logout() {
    user.value = null
    userType.value = null
    token.value = null
    delete axios.defaults.headers.common['Authorization']
  }

  // ------------------------------------------------------------
  // EXPORT
  // ------------------------------------------------------------
  return {
    user,
    userType,
    token,
    login,
    registerDoctor,
    registerPatient,
    logout
  }
})
