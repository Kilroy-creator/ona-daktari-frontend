import { defineStore } from 'pinia'
import { ref } from 'vue'
import { API_BASE_URL } from '@/config/api'


export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const userType = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const validationErrors = ref({})
  const chatMessages = ref([])

  // ✅ Initialize from localStorage
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

  // ✅ Clear auth data
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

  // API Call Helper
  const apiCall = async (endpoint, method = 'POST', data = null) => {
    const url = `${API_BASE_URL}${endpoint}`
    console.log(`🔗 ${method} ${url}`)
    
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }

    if (token.value) {
      options.headers['Authorization'] = `Bearer ${token.value}`
    }

    if (data) {
      options.body = JSON.stringify(data)
    }

    try {
      const response = await fetch(url, options)
      
      // Try to parse response
      let responseData = {}
      try {
        responseData = await response.json()
      } catch (parseError) {
        console.warn('⚠️ Could not parse response as JSON')
      }
      
      if (!response.ok) {
        // Log validation errors if they exist
        if (responseData.errors) {
          console.error('❌ Validation Errors:', responseData.errors)
          validationErrors.value = responseData.errors
        }
        
        const errorMsg = responseData.message || `HTTP ${response.status}`
        throw new Error(errorMsg)
      }

      console.log(`✅ Success`)
      validationErrors.value = {}
      return responseData
    } catch (err) {
      console.error(`❌ API Error: ${err.message}`)
      throw err
    }
  }

  // Login Method
  const login = async (email, password, role = 'patient') => {
    loading.value = true
    error.value = null
    validationErrors.value = {}

    try {
      console.log(`\n🔐 Attempting ${role} login...\n`)
      
      let endpoint = ''
      
      if (role === 'patient') {
        endpoint = '/patient/login'
      } else if (role === 'doctor') {
        endpoint = '/doctors/login'
      } else {
        throw new Error('Invalid role')
      }

      const response = await apiCall(endpoint, 'POST', {
        email,
        password
      })

      // Store auth data
      if (!response.token || !response.user) {
        throw new Error('Invalid response from server')
      }

      token.value = response.token
      user.value = response.user
      userType.value = role

      localStorage.setItem('token', response.token)
      localStorage.setItem('userType', role)
      localStorage.setItem('user', JSON.stringify(response.user))

      console.log(`✅✅✅ ${role.toUpperCase()} LOGIN SUCCESSFUL ✅✅✅\n`)
      return response
    } catch (err) {
      error.value = err.message
      console.error(`\n❌ ${role.toUpperCase()} LOGIN FAILED: ${err.message}\n`)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Register Patient
  const registerPatient = async (formData) => {
    loading.value = true
    error.value = null
    validationErrors.value = {}

    try {
      console.log(`\n📝 Registering patient...\n`)
      
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        gender: formData.gender && formData.gender !== '' ? formData.gender.toLowerCase() : null,
        date_of_birth: formData.date_of_birth || null,
        password: formData.password,
        password_confirmation: formData.password_confirmation
      }
      
      console.log('📦 Sending payload:', {
        ...payload,
        password: '***',
        password_confirmation: '***'
      })
      
      const response = await apiCall('/patient/register', 'POST', payload)

      // Auto-login after registration
      if (response.token && response.user) {
        token.value = response.token
        user.value = response.user
        userType.value = 'patient'

        localStorage.setItem('token', response.token)
        localStorage.setItem('userType', 'patient')
        localStorage.setItem('user', JSON.stringify(response.user))
      }

      console.log(`✅ Patient registration successful\n`)
      return response
    } catch (err) {
      error.value = err.message
      console.error(`❌ Registration failed: ${err.message}\n`)
      console.error('Validation Errors:', validationErrors.value)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Register Doctor
  const registerDoctor = async (formData) => {
    loading.value = true
    error.value = null
    validationErrors.value = {}

    try {
      console.log('📝 Registering doctor...')
      
      const response = await apiCall('/doctors/register', 'POST', {
        name: formData.full_name || formData.name,
        email: formData.email,
        phone: formData.phone || null,
        specialty: formData.specialization || formData.specialty || null,  // ✅ Changed to 'specialty'
        experience: formData.experience || 0,                               // ✅ Added experience
        password: formData.password,
        password_confirmation: formData.password_confirmation || formData.confirmPassword
      })
      // Auto-login after registration
      if (response.token && response.user) {
        token.value = response.token
        user.value = response.user
        userType.value = 'doctor'

        localStorage.setItem('token', response.token)
        localStorage.setItem('userType', 'doctor')
        localStorage.setItem('user', JSON.stringify(response.user))
      }

      console.log(`✅ Doctor registration successful\n`)
      return response
    } catch (err) {
      error.value = err.message
      console.error(`❌ Registration failed: ${err.message}\n`)
      console.error('Validation Errors:', validationErrors.value)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Send Message
  const sendMessage = (content, sender) => {
    chatMessages.value.push({
      id: Date.now(),
      content,
      sender,
      timestamp: new Date()
    })
  }

  // Logout
  const logout = () => {
    clearAuth()
    console.log('🚪 Logged out')
  }

  // Get Current User
  const getCurrentUser = () => {
    return user.value
  }

  // Check if Authenticated
  const isAuthenticated = () => {
    return !!(token.value && user.value)
  }

  // Initialize on store creation
  initializeAuth()

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