import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const baseURL = API_URL.replace(/\/$/, '')

axios.defaults.baseURL = baseURL
axios.defaults.withCredentials = true
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'

console.log('API Base URL:', axios.defaults.baseURL)

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const userType = ref(null)
  const token = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function loadSanctum() {
    try {
      await axios.get('/sanctum/csrf-cookie')
    } catch (err) {
      console.error('Sanctum CSRF error:', err)
      throw new Error('Failed to initialize authentication')
    }
  }

  async function registerPatient(data) {
    loading.value = true
    error.value = null

    try {
      await loadSanctum()

      console.log('Sending patient registration data:', {
        name: data.full_name,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        date_of_birth: data.dob,
        password: data.password,
      })

      const res = await axios.post('/api/patient/register', {
        name: data.full_name,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        date_of_birth: data.dob,
        password: data.password,
        password_confirmation: data.password_confirmation,
      })

      user.value = res.data.user
      userType.value = 'patient'
      token.value = res.data.token

      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`

      localStorage.setItem('auth_token', token.value)
      localStorage.setItem('user_type', 'patient')
      localStorage.setItem('user', JSON.stringify(res.data.user))

      return res.data
    } catch (err) {
      console.error('Registration error details:', {
        status: err.response?.status,
        message: err.response?.data?.message,
        errors: err.response?.data?.errors,
        fullError: err.message,
      })

      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.errors || 
                          err.message || 
                          'Registration failed'
      
      error.value = errorMessage
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  async function registerDoctor(data) {
    loading.value = true
    error.value = null

    try {
      await loadSanctum()

      console.log('Sending doctor registration data:', {
        name: data.full_name,
        email: data.email,
        phone: data.phone,
        specialty: data.specialization,
        license_number: data.license_no,
        password: data.password,
      })

      const res = await axios.post('/api/doctors/register', {
        name: data.full_name,
        email: data.email,
        phone: data.phone,
        specialty: data.specialization,
        license_number: data.license_no,
        password: data.password,
        password_confirmation: data.password_confirmation,
      })

      user.value = res.data.user
      userType.value = 'doctor'
      token.value = res.data.token

      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`

      localStorage.setItem('auth_token', token.value)
      localStorage.setItem('user_type', 'doctor')
      localStorage.setItem('user', JSON.stringify(res.data.user))

      return res.data
    } catch (err) {
      console.error('Registration error details:', {
        status: err.response?.status,
        message: err.response?.data?.message,
        errors: err.response?.data?.errors,
        fullError: err.message,
      })

      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.errors || 
                          err.message || 
                          'Registration failed'
      
      error.value = errorMessage
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  async function login(email, password, type) {
    loading.value = true
    error.value = null

    try {
      await loadSanctum()

      const endpoint = type === 'doctor' ? '/api/doctors/login' : '/api/patient/login'

      console.log(`Logging in as ${type}:`, { email })

      const res = await axios.post(endpoint, { email, password })

      user.value = res.data.user
      userType.value = type
      token.value = res.data.token

      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`

      localStorage.setItem('auth_token', token.value)
      localStorage.setItem('user_type', type)
      localStorage.setItem('user', JSON.stringify(res.data.user))

      return res.data
    } catch (err) {
      console.error('Login error details:', {
        status: err.response?.status,
        message: err.response?.data?.message,
        fullError: err.message,
      })

      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Login failed'
      error.value = errorMessage
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  function restoreSession() {
    const savedToken = localStorage.getItem('auth_token')
    const savedUserType = localStorage.getItem('user_type')
    const savedUser = localStorage.getItem('user')

    if (savedToken && savedUserType && savedUser) {
      token.value = savedToken
      userType.value = savedUserType
      user.value = JSON.parse(savedUser)
      axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`
    }
  }

  async function logout() {
    try {
      if (token.value) {
        await axios.post('/api/auth/logout').catch(() => {})
      }
    } finally {
      user.value = null
      userType.value = null
      token.value = null
      error.value = null

      delete axios.defaults.headers.common['Authorization']

      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_type')
      localStorage.removeItem('user')
    }
  }

  restoreSession()

  return {
    user,
    userType,
    token,
    loading,
    error,
    login,
    registerPatient,
    registerDoctor,
    logout,
    restoreSession,
  }
})