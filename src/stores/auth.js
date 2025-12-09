import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useAuthStore = defineStore('auth', () => {
const user = ref(null)
const userType = ref(null)


function login(payload) {
user.value = { email: payload.email, name: payload.email.split('@')[0] }
userType.value = payload.type
}


function register(payload) {
user.value = { email: payload.email, name: payload.name }
userType.value = payload.type
}


function logout() {
user.value = null
userType.value = null
}


return { user, userType, login, register, logout }
})