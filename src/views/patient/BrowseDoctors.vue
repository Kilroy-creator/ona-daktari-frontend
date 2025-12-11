<template>
  <div class="relative">
    <!-- DotGrid Background -->
    <DotGrid />

    <div class="relative z-10">
      <ScrollReveal :delay="0">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Find a Specialist</h2>
      </ScrollReveal>

      <!-- Search and Filter -->
      <div class="mb-8 space-y-4">
        <ScrollReveal :delay="100">
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
        </ScrollReveal>

        <!-- Specialty Filter with ScrollVelocity -->
        <ScrollReveal :delay="200">
          <ScrollVelocity :velocity="0.5">
            <div class="flex gap-2 pb-2">
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
          </ScrollVelocity>
        </ScrollReveal>
      </div>

      <!-- Doctor Cards with Animations -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ScrollReveal 
          v-for="(doctor, index) in filteredDoctors" 
          :key="doctor.id"
          :delay="index * 100"
        >
          <TiltCard>
            <ScrollFloat :speed="0.3">
              <AnimatedContent>
                <doctor-card 
                  :doctor="doctor"
                  @book="handleBookDoctor"
                />
              </AnimatedContent>
            </ScrollFloat>
          </TiltCard>
        </ScrollReveal>
      </div>

      <div v-if="filteredDoctors.length === 0" class="text-center py-12">
        <p class="text-gray-600">No doctors found matching your search</p>
      </div>
    </div>

    <!-- Booking Modal with DarkVeil -->
    <DarkVeil v-model="showBookingModal">
      <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-6">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">Book Appointment</h3>

        <AnimatedContent v-if="selectedDoctor">
          <div class="space-y-4">
            <!-- Doctor Info Card -->
            <div class="bg-blue-50 p-4 rounded-lg">
              <p class="font-semibold text-gray-900">{{ selectedDoctor.name }}</p>
              <p class="text-gray-600 text-sm">{{ selectedDoctor.specialty }}</p>
              <p class="text-green-600 font-semibold mt-2">
                KES <CountUp :end-value="selectedDoctor.price" :duration="1000" />/session
              </p>
            </div>

            <!-- Date Input with TrueFocus -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <TrueFocus>
                <input 
                  v-model="bookingData.date" 
                  type="date" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </TrueFocus>
            </div>

            <!-- Time Input with TrueFocus -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
              <TrueFocus>
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
              </TrueFocus>
            </div>

            <!-- Reason Input with TrueFocus -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
              <TrueFocus>
                <textarea 
                  v-model="bookingData.reason"
                  placeholder="Describe your symptoms or reason for visit..."
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  rows="3"
                ></textarea>
              </TrueFocus>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3 pt-4">
              <button
                @click="showBookingModal = false"
                class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <MagnetButton>
                <button
                  @click="handleConfirmBooking"
                  class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Book Appointment
                </button>
              </MagnetButton>
            </div>
          </div>
        </AnimatedContent>
      </div>
    </DarkVeil>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import DoctorCard from '@/components/patient/DoctorCard.vue'

// Import animation components
import ScrollReveal from '@/components/animations/ScrollReveal.vue'
import AnimatedContent from '@/components/animations/AnimatedContent.vue'
import CountUp from '@/components/animations/CountUp.vue'
import ScrollFloat from '@/components/animations/ScrollFloat.vue'
import TiltCard from '@/components/animations/TiltCard.vue'
import DotGrid from '@/components/animations/DotGrid.vue'
import ScrollVelocity from '@/components/animations/ScrollVelocity.vue'
import DarkVeil from '@/components/animations/DarkVeil.vue'
import TrueFocus from '@/components/animations/TrueFocus.vue'
import MagnetButton from '@/components/animations/MagnetButton.vue'

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