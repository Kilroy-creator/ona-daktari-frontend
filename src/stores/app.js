import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // State
  const theme = ref(localStorage.getItem('theme') || 'light')
  const sidebarOpen = ref(true)
  const notifications = ref([])

  const doctors = ref([
    {
      id: 1,
      name: 'Dr. Sarah Kipchoge',
      specialty: 'Cardiology',
      rating: 4.8,
      reviews: 234,
      price: 1500,
      emoji: '👩‍⚕️',
      availability: 12,
      isVerified: true,
      bio: 'Experienced cardiologist with 15+ years of practice.',
      chatMessages: []
    },
    {
      id: 2,
      name: 'Dr. James Mwangi',
      specialty: 'Orthopedics',
      rating: 4.9,
      reviews: 189,
      price: 1200,
      emoji: '👨‍⚕️',
      availability: 8,
      isVerified: true,
      bio: 'Specialist in joint and bone disorders.',
      chatMessages: []
    },
    {
      id: 3,
      name: 'Dr. Emily Achieng',
      specialty: 'Pediatrics',
      rating: 4.7,
      reviews: 156,
      price: 1000,
      emoji: '👩‍⚕️',
      availability: 15,
      isVerified: true,
      bio: 'Caring pediatrician with expertise in child health.',
      chatMessages: []
    },
    {
      id: 4,
      name: 'Dr. Peter Kariuki',
      specialty: 'Neurology',
      rating: 4.9,
      reviews: 201,
      price: 2000,
      emoji: '👨‍⚕️',
      availability: 5,
      isVerified: true,
      bio: 'Expert neurologist specializing in complex cases.',
      chatMessages: []
    }
  ])

  const medicines = ref([
    { id: 1, name: 'Paracetamol 500mg', price: 50, category: 'Pain Relief', stock: 100 },
    { id: 2, name: 'Amoxicillin 250mg', price: 150, category: 'Antibiotics', stock: 45 },
    { id: 3, name: 'Vitamin C 1000mg', price: 200, category: 'Vitamins', stock: 200 },
    { id: 4, name: 'Ibuprofen 400mg', price: 100, category: 'Pain Relief', stock: 78 },
    { id: 5, name: 'Cetirizine 10mg', price: 75, category: 'Allergy Relief', stock: 120 },
    { id: 6, name: 'Omeprazole 20mg', price: 200, category: 'Digestive Health', stock: 90 }
  ])

  // Functions for doctors chat
  const sendMessage = (doctorId, content, sender) => {
    const doctor = doctors.value.find(d => d.id === doctorId)
    if (!doctor) return
    doctor.chatMessages.push({
      id: Date.now(),
      sender,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })
  }

  // Other functions (theme, sidebar, notifications) remain unchanged
  const setTheme = (newTheme) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const toggleSidebar = () => sidebarOpen.value = !sidebarOpen.value

  const addNotification = (notification) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = { id, type: 'info', duration: 3000, ...notification }
    notifications.value.push(newNotification)
    if (newNotification.duration > 0) {
      setTimeout(() => removeNotification(id), newNotification.duration)
    }
    return id
  }

  const removeNotification = (id) => {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  const clearNotifications = () => notifications.value = []

  const notifySuccess = (message, duration = 3000) => addNotification({ type: 'success', message, duration })
  const notifyError = (message, duration = 5000) => addNotification({ type: 'error', message, duration })
  const notifyInfo = (message, duration = 3000) => addNotification({ type: 'info', message, duration })
  const notifyWarning = (message, duration = 4000) => addNotification({ type: 'warning', message, duration })

  // Computed
  const getSpecialties = computed(() => [...new Set(doctors.value.map(d => d.specialty))])
  const getMedicineCategories = computed(() => [...new Set(medicines.value.map(m => m.category))])
  const getTopRatedDoctors = computed(() => [...doctors.value].sort((a, b) => b.rating - a.rating).slice(0, 3))
  const getAvailableDoctorsCount = computed(() => doctors.value.filter(d => d.availability > 0).length)

  // Searches & getters
  const searchDoctors = (query) => {
    if (!query) return doctors.value
    const lower = query.toLowerCase()
    return doctors.value.filter(d =>
      d.name.toLowerCase().includes(lower) ||
      d.specialty.toLowerCase().includes(lower) ||
      d.bio.toLowerCase().includes(lower)
    )
  }

  const getDoctorsBySpecialty = (specialty) => doctors.value.filter(d => d.specialty === specialty)
  const getDoctorById = (id) => doctors.value.find(d => d.id === id)
  const searchMedicines = (query) => {
    if (!query) return medicines.value
    const lower = query.toLowerCase()
    return medicines.value.filter(m =>
      m.name.toLowerCase().includes(lower) || m.category.toLowerCase().includes(lower)
    )
  }
  const getMedicinesByCategory = (category) => medicines.value.filter(m => m.category === category)
  const getMedicineById = (id) => medicines.value.find(m => m.id === id)

  return {
    theme,
    sidebarOpen,
    notifications,
    doctors,
    medicines,
    sendMessage,
    setTheme,
    toggleSidebar,
    addNotification,
    removeNotification,
    clearNotifications,
    notifySuccess,
    notifyError,
    notifyInfo,
    notifyWarning,
    searchDoctors,
    getDoctorsBySpecialty,
    getDoctorById,
    searchMedicines,
    getMedicinesByCategory,
    getMedicineById,
    getSpecialties,
    getMedicineCategories,
    getTopRatedDoctors,
    getAvailableDoctorsCount
  }
})
