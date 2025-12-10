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
      bio: 'Experienced cardiologist with 15+ years of practice.'
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
      bio: 'Specialist in joint and bone disorders.'
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
      bio: 'Caring pediatrician with expertise in child health.'
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
      bio: 'Expert neurologist specializing in complex cases.'
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

  // Setters
  const setTheme = (newTheme) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  // Notifications
  const addNotification = (notification) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = {
      id,
      type: 'info',
      duration: 3000,
      ...notification
    }
    
    notifications.value.push(newNotification)
    
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }
    
    return id
  }

  const removeNotification = (id) => {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  const clearNotifications = () => {
    notifications.value = []
  }

  // Success notification
  const notifySuccess = (message, duration = 3000) => {
    return addNotification({
      type: 'success',
      message,
      duration
    })
  }

  // Error notification
  const notifyError = (message, duration = 5000) => {
    return addNotification({
      type: 'error',
      message,
      duration
    })
  }

  // Info notification
  const notifyInfo = (message, duration = 3000) => {
    return addNotification({
      type: 'info',
      message,
      duration
    })
  }

  // Warning notification
  const notifyWarning = (message, duration = 4000) => {
    return addNotification({
      type: 'warning',
      message,
      duration
    })
  }

  // Search doctors
  const searchDoctors = (query) => {
    if (!query) return doctors.value

    const lowerQuery = query.toLowerCase()
    return doctors.value.filter(doc =>
      doc.name.toLowerCase().includes(lowerQuery) ||
      doc.specialty.toLowerCase().includes(lowerQuery) ||
      doc.bio.toLowerCase().includes(lowerQuery)
    )
  }

  // Filter doctors by specialty
  const getDoctorsBySpecialty = (specialty) => {
    return doctors.value.filter(doc => doc.specialty === specialty)
  }

  // Get single doctor
  const getDoctorById = (id) => {
    return doctors.value.find(doc => doc.id === id)
  }

  // Search medicines
  const searchMedicines = (query) => {
    if (!query) return medicines.value

    const lowerQuery = query.toLowerCase()
    return medicines.value.filter(med =>
      med.name.toLowerCase().includes(lowerQuery) ||
      med.category.toLowerCase().includes(lowerQuery)
    )
  }

  // Get medicines by category
  const getMedicinesByCategory = (category) => {
    return medicines.value.filter(med => med.category === category)
  }

  // Get single medicine
  const getMedicineById = (id) => {
    return medicines.value.find(med => med.id === id)
  }

  // Get unique specialties
  const getSpecialties = computed(() => {
    return [...new Set(doctors.value.map(doc => doc.specialty))]
  })

  // Get unique medicine categories
  const getMedicineCategories = computed(() => {
    return [...new Set(medicines.value.map(med => med.category))]
  })

  // Get top rated doctors
  const getTopRatedDoctors = computed(() => {
    return [...doctors.value].sort((a, b) => b.rating - a.rating).slice(0, 3)
  })

  // Get available doctors count
  const getAvailableDoctorsCount = computed(() => {
    return doctors.value.filter(doc => doc.availability > 0).length
  })

  return {
    theme,
    sidebarOpen,
    notifications,
    doctors,
    medicines,
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