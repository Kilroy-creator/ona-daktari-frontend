import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()

  const login = async (email, password, userType) => {
    try {
      await authStore.login(email, password, userType)
      
      // Navigate based on user type
      const redirectPath = userType === 'patient' ? '/patient/dashboard' : '/doctor/dashboard'
      await router.push(redirectPath)
      
      return true
    } catch (err) {
      console.error('Login failed:', err)
      return false
    }
  }

  const register = async (formData, userType) => {
    try {
      if (userType === 'patient') {
        await authStore.registerPatient(formData)
      } else {
        await authStore.registerDoctor(formData)
      }
      
      // Navigate to dashboard
      const redirectPath = userType === 'patient' ? '/patient/dashboard' : '/doctor/dashboard'
      await router.push(redirectPath)
      
      return true
    } catch (err) {
      console.error('Registration failed:', err)
      return false
    }
  }

  const logout = async () => {
    try {
      authStore.logout()
      await router.push('/')
      return true
    } catch (err) {
      console.error('Logout failed:', err)
      return false
    }
  }

  const isAuthenticated = () => authStore.isAuthenticated
  const getUserType = () => authStore.userType
  const getUser = () => authStore.user

  return {
    login,
    register,
    logout,
    isAuthenticated,
    getUserType,
    getUser,
    authStore
  }
}