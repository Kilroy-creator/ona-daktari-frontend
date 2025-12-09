import { defineStore } from 'pinia'
import { ref, computed } from 'vue'


export const useAppStore = defineStore('app', () => {
const currentPage = ref('landing')
const mobileMenuOpen = ref(false)
const showPassword = ref(false)
const formData = ref({})


// example data arrays
const doctors = ref([
{ id: 1, name: 'Dr. Sarah Kipchoge', specialty: 'Cardiology', rating: 4.8, reviews: 234, price: 1500, image: '👩‍⚕️', availability: 12 },
{ id: 2, name: 'Dr. James Mwangi', specialty: 'Orthopedics', rating: 4.9, reviews: 189, price: 1200, image: '👨‍⚕️', availability: 8 }
])


const appointments = ref([])
const medicines = ref([])
const chatMessages = ref([])
const pendingAppointments = ref([])


const filteredDoctors = computed(() => {
const q = (formData.value.searchQuery || '').toLowerCase()
const specialty = formData.value.selectedSpecialty || 'All'
return doctors.value.filter(doc => {
const matchesSearch = doc.name.toLowerCase().includes(q) || doc.specialty.toLowerCase().includes(q)
const matchesSpecialty = specialty === 'All' || doc.specialty === specialty
return matchesSearch && matchesSpecialty
})
})


return {
currentPage, mobileMenuOpen, showPassword, formData,
doctors, appointments, medicines, chatMessages, pendingAppointments,
filteredDoctors
}
})