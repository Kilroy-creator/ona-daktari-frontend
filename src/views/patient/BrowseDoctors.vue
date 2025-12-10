<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Find a Specialist</h2>

    <!-- Search and Filter -->
    <div class="mb-8 space-y-4">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1 relative">
          <svg class="absolute left-3 top-3 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search doctors by name or specialty..." 
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <!-- Specialty Filter -->
      <div class="flex gap-2 overflow-x-auto pb-2">
        <button 
          v-for="specialty in specialties" 
          :key="specialty"
          @click="selectedSpecialty = specialty"
          :class="[
            'px-4 py-2 rounded-full whitespace-nowrap transition',
            selectedSpecialty === specialty 
              ? 'bg-blue-600 text-white' 
              : 'bg-white border border-gray-300 hover:bg-gray-50'
          ]"
        >
          {{ specialty }}
        </button>
      </div>
    </div>

    <!-- Doctor Cards -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <doctor-card 
        v-for="doctor in filteredDoctors" 
        :key="doctor.id"
        :doctor="doctor"
        @book="handleBookDoctor"
      />
    </div>

    <div v-if="filteredDoctors.length === 0" class="text-center py-12">
      <p class="text-gray-600">No doctors found matching your search</p>
    </div>

    <!-- Booking Modal -->
    <modal
      v-model="showBookingModal"
      title="Book Appointment"
      confirm-text="Book"
      @confirm="handleConfirmBooking"
      @cancel="selectedDoctor = null"
    >
      <div v-if="selectedDoctor" class="space-y-4">
        <div class="bg-blue-50 p-4 rounded-lg">
          <p class="font-semibold text-gray-900">{{ selectedDoctor.name }}</p>
          <p class="text-gray-600 text-sm">{{ selectedDoctor.specialty }}</p>
          <p class="text-green-600 font-semibold mt-2">KES {{ selectedDoctor.price }}/session</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
          <input 
            v-model="bookingData.date" 
            type="date" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
          <select 
            v-model="bookingData.time"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select Time</option>
            <option>09:00 AM</option>
            <option>10:00 AM</option>
            <option>11:00 AM</option>
            <option>02:00 PM</option>
            <option>03:00 PM</option>
            <option>04:00 PM</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
          <textarea 
            v-model="bookingData.reason"
            placeholder="Describe your symptoms or reason for visit..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            rows="3"
          ></textarea>
        </div>
      </div>
    </modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import DoctorCard from '@/components/patient/DoctorCard.vue'
import Modal from '@/components/common/Modal.vue'

const appStore = useAppStore()

const searchQuery = ref('')
const selectedSpecialty = ref('All')
const selectedDoctor = ref(null)
const showBookingModal = ref(false)

const bookingData = ref({
  date: '',
  time: '',
  reason: ''
})

const specialties = computed(() => {
  return ['All', ...appStore.getSpecialties]
})

const filteredDoctors = computed(() => {
  let doctors = appStore.doctors

  if (selectedSpecialty.value !== 'All') {
    doctors = doctors.filter(doc => doc.specialty === selectedSpecialty.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    doctors = doctors.filter(doc =>
      doc.name.toLowerCase().includes(query) ||
      doc.specialty.toLowerCase().includes(query)
    )
  }

  return doctors
})

const handleBookDoctor = (doctor) => {
  selectedDoctor.value = doctor
  showBookingModal.value = true
  bookingData.value = { date: '', time: '', reason: '' }
}

const handleConfirmBooking = () => {
  if (!bookingData.value.date || !bookingData.value.time) {
    alert('Please select date and time')
    return
  }

  appStore.notifySuccess(`Appointment booked with ${selectedDoctor.value.name}`)
  showBookingModal.value = false
  selectedDoctor.value = null
}
</script>