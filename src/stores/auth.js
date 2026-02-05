// src/stores/auth.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const useAuthStore = defineStore('auth', () => {
  // ─── STATE ────────────────────────────────
  const user = ref(null)
  const token = ref(null)
  const userType = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const validationErrors = ref({})
  const chatMessages = ref([])

  // ─── INITIALIZE FROM LOCALSTORAGE ─────────
  const initializeAuth = () => {
    try {
      const savedToken = localStorage.getItem('token')
      const savedUserType = localStorage.getItem('userType')
      const savedUser = localStorage.getItem('user')

      if (savedToken && savedUser) {
        token.value = savedToken
        userType.value = savedUserType
        user.value = JSON.parse(savedUser)
        console.log('✅ Auth restored from localStorage')
      }
    } catch (e) {
      console.error('❌ Failed to restore session:', e)
      clearAuth()
    }
  }

  // ─── CLEAR AUTH ───────────────────────────
  const clearAuth = () => {
    user.value = null
    token.value = null
    userType.value = null
    error.value = null
    validationErrors.value = {}
    localStorage.removeItem('token')
    localStorage.removeItem('userType')
    localStorage.removeItem('user')
  }

  // ─── API CALL HELPER ──────────────────────
  const apiCall = async (endpoint, method = 'POST', data = null) => {
    const url = `${API_BASE_URL}${endpoint}`
    console.log(`\n🔗 ${method} ${url}`)

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }

    if (token.value) {
      options.headers['Authorization'] = `Bearer ${token.value}`
    }

    if (data) {
      options.body = JSON.stringify(data)
      console.log('📤 Request payload:', data)
    }

    try {
      console.log('⏳ Sending request...')
      const response = await fetch(url, options)
      console.log('📥 Response status:', response.status, response.statusText)

      // Get the raw response text first
      let rawText = await response.text()
      console.log('📄 Raw response (first 500 chars):', rawText.substring(0, 500))

      // Strip HTML comments (like <!-- config/cors.php -->)
      if (rawText.includes('<!--') && rawText.includes('-->')) {
        const commentEnd = rawText.indexOf('-->') + 3
        const cleanText = rawText.substring(commentEnd).trim()
        console.log('⚠️ Stripped HTML comment from response')
        console.log('🧹 Clean response:', cleanText.substring(0, 200))
        rawText = cleanText
      }

      // Check if response is HTML (Laravel error page)
      if (rawText.trim().startsWith('<!DOCTYPE') || rawText.trim().startsWith('<html')) {
        console.error('🔴 Server returned HTML instead of JSON!')
        console.error('📄 Full HTML response:', rawText.substring(0, 1000))
        
        // Extract error message if possible
        const titleMatch = rawText.match(/<title>(.*?)<\/title>/i)
        const h1Match = rawText.match(/<h1[^>]*>(.*?)<\/h1>/i)
        
        let errorMsg = 'Server configuration error. '
        
        if (titleMatch) {
          errorMsg += `Error: ${titleMatch[1]}. `
        }
        if (h1Match) {
          errorMsg += h1Match[1].replace(/<[^>]*>/g, '')
        }
        
        // Check for common Laravel errors
        if (rawText.includes('configuration is cached')) {
          errorMsg = 'Laravel configuration is cached. Run: php artisan config:clear'
        } else if (rawText.includes('Route [') && rawText.includes('not defined')) {
          errorMsg = 'API route not found. Check your Laravel routes/api.php'
        } else if (rawText.includes('SQLSTATE')) {
          errorMsg = 'Database connection error. Check your .env database settings'
        } else if (rawText.includes('Class') && rawText.includes('not found')) {
          errorMsg = 'Laravel class not found. Run: composer dump-autoload'
        }
        
        throw new Error(errorMsg)
      }

      // Try to parse as JSON
      let responseData = {}
      try {
        responseData = JSON.parse(rawText)
        console.log('✅ Parsed JSON response:', responseData)
      } catch (parseError) {
        console.error('❌ Failed to parse JSON:', parseError.message)
        console.error('📄 Response text:', rawText)
        throw new Error('Server returned invalid JSON. Response: ' + rawText.substring(0, 100))
      }

      if (!response.ok) {
        // Handle validation errors
        if (responseData.errors) {
          console.error('❌ Validation Errors:', responseData.errors)
          validationErrors.value = responseData.errors
        }
        
        const errorMsg = responseData.message || `HTTP ${response.status}: ${response.statusText}`
        throw new Error(errorMsg)
      }

      validationErrors.value = {}
      return responseData
    } catch (err) {
      console.error('❌ API Call Failed:', err.message)
      
      // Network error
      if (err.message === 'Failed to fetch') {
        console.error('🔴 Network Error: Cannot connect to server')
        console.error('   Check if Laravel is running: php artisan serve')
        console.error('   Expected URL:', url)
        throw new Error('Cannot connect to server. Is Laravel running on port 8001?')
      }
      
      throw err
    }
  }

  // ─── LOGIN ────────────────────────────────
  const login = async (email, password, role = 'patient') => {
    loading.value = true
    error.value = null
    validationErrors.value = {}

    try {
      console.log(`\n🔐 Attempting ${role} login...`)
      console.log(`📧 Email: ${email}`)
      
      let endpoint = ''
      if (role === 'patient') endpoint = '/patient/login'
      else if (role === 'doctor') endpoint = '/doctors/login'
      else throw new Error('Invalid role')

      const response = await apiCall(endpoint, 'POST', { email, password })

      // Check response structure
      console.log('📦 Full response:', response)

      // Handle different response structures
      let payload = response
      if (response.data) {
        payload = response.data
      }

      console.log('📦 Payload:', payload)

      if (!payload?.token || !payload?.user) {
        console.error('❌ Invalid response structure:', response)
        throw new Error('Invalid response from server - missing token or user data')
      }

      token.value = payload.token
      user.value = payload.user
      userType.value = role

      localStorage.setItem('token', payload.token)
      localStorage.setItem('userType', role)
      localStorage.setItem('user', JSON.stringify(payload.user))

      console.log(`✅✅✅ ${role.toUpperCase()} LOGIN SUCCESSFUL ✅✅✅`)
      console.log('👤 User:', payload.user)
      return payload
    } catch (err) {
      error.value = err.message
      console.error(`\n❌ ${role.toUpperCase()} LOGIN FAILED: ${err.message}`)
      throw err
    } finally {
      loading.value = false
    }
  }

  // ─── REGISTER PATIENT ─────────────────────
  const registerPatient = async (formData) => {
    loading.value = true
    error.value = null
    validationErrors.value = {}

    try {
      console.log(`\n📝 Registering patient...`)
      
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        gender: formData.gender?.toLowerCase() || null,
        date_of_birth: formData.date_of_birth || null,
        password: formData.password,
        password_confirmation: formData.password_confirmation
      }

      console.log('📦 Sending payload:', { ...payload, password: '***', password_confirmation: '***' })

      const response = await apiCall('/patient/register', 'POST', payload)

      console.log('📦 Full response:', response)

      // Handle different response structures
      let data = response
      if (response.data) {
        data = response.data
      }

      console.log('📦 Data:', data)

      if (data?.token && data?.user) {
        token.value = data.token
        user.value = data.user
        userType.value = 'patient'

        localStorage.setItem('token', data.token)
        localStorage.setItem('userType', 'patient')
        localStorage.setItem('user', JSON.stringify(data.user))
        
        console.log('✅ Auto-login successful')
      }

      console.log(`✅✅✅ PATIENT REGISTRATION SUCCESSFUL ✅✅✅`)
      return data
    } catch (err) {
      error.value = err.message
      console.error(`\n❌ Registration failed: ${err.message}`)
      if (validationErrors.value && Object.keys(validationErrors.value).length > 0) {
        console.error('📋 Validation Errors:', validationErrors.value)
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  // ─── REGISTER DOCTOR ─────────────────────
  const registerDoctor = async (formData) => {
    loading.value = true
    error.value = null
    validationErrors.value = {}

    try {
      console.log('\n📝 Registering doctor...')
      
      const payload = {
        name: formData.full_name || formData.name,
        email: formData.email,
        phone: formData.phone || null,
        specialty: formData.specialization || formData.specialty || null,
        experience: formData.experience || 0,
        password: formData.password,
        password_confirmation: formData.password_confirmation || formData.confirmPassword
      }

      console.log('📦 Sending payload:', { ...payload, password: '***', password_confirmation: '***' })

      const response = await apiCall('/doctors/register', 'POST', payload)

      console.log('📦 Full response:', response)

      // Handle different response structures
      let data = response
      if (response.data) {
        data = response.data
      }

      console.log('📦 Data:', data)

      if (data?.token && data?.user) {
        token.value = data.token
        user.value = data.user
        userType.value = 'doctor'

        localStorage.setItem('token', data.token)
        localStorage.setItem('userType', 'doctor')
        localStorage.setItem('user', JSON.stringify(data.user))
        
        console.log('✅ Auto-login successful')
      }

      console.log(`✅✅✅ DOCTOR REGISTRATION SUCCESSFUL ✅✅✅`)
      return data
    } catch (err) {
      error.value = err.message
      console.error(`\n❌ Registration failed: ${err.message}`)
      if (validationErrors.value && Object.keys(validationErrors.value).length > 0) {
        console.error('📋 Validation Errors:', validationErrors.value)
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  // ─── CHAT ────────────────────────────────
  const sendMessage = (content, sender) => {
    chatMessages.value.push({
      id: Date.now(),
      content,
      sender,
      timestamp: new Date()
    })
  }

  // ─── LOGOUT ──────────────────────────────
  const logout = () => {
    clearAuth()
    console.log('🚪 Logged out')
  }

  // ─── GET CURRENT USER ─────────────────────
  const getCurrentUser = () => user.value
  const isAuthenticated = () => !!(token.value && user.value)

  // ─── INITIALIZE STORE ────────────────────
  initializeAuth()

  // ─── RETURN STORE ────────────────────────
  return {
    user,
    token,
    userType,
    loading,
    error,
    validationErrors,
    chatMessages,
    login,
    registerPatient,
    registerDoctor,
    logout,
    getCurrentUser,
    isAuthenticated,
    sendMessage,
    apiCall,
    initializeAuth
  }
})