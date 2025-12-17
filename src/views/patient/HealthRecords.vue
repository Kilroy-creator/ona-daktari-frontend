<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Back Button -->
      <button @click="$router.push('/patient/dashboard')" class="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </button>

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Health Records
        </h1>
        <p class="text-gray-600">View and manage your medical history</p>
      </div>

      <!-- Tabs -->
      <div class="mb-8 flex gap-2 border-b border-gray-200">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-6 py-3 font-semibold transition border-b-2',
            activeTab === tab.id 
              ? 'text-blue-600 border-blue-600' 
              : 'text-gray-600 border-transparent hover:text-blue-600'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Medical History Tab -->
      <div v-if="activeTab === 'history'" class="space-y-6">
        <div v-for="record in medicalHistory" :key="record.id" class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-xl font-bold text-gray-900">{{ record.condition }}</h3>
              <p class="text-sm text-gray-600">{{ record.date }}</p>
            </div>
            <span :class="[
              'px-3 py-1 rounded-full text-xs font-bold',
              record.status === 'Active' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            ]">
              {{ record.status }}
            </span>
          </div>
          <p class="text-gray-700 mb-4">{{ record.description }}</p>
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <span class="font-semibold">Doctor:</span>
            <span>{{ record.doctor }}</span>
          </div>
        </div>
      </div>

      <!-- Prescriptions Tab -->
      <div v-if="activeTab === 'prescriptions'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="prescription in prescriptions" :key="prescription.id" class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-xl font-bold text-gray-900">{{ prescription.medication }}</h3>
              <p class="text-sm text-blue-600 font-semibold">{{ prescription.dosage }}</p>
            </div>
            <span :class="[
              'px-3 py-1 rounded-full text-xs font-bold',
              prescription.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            ]">
              {{ prescription.active ? 'Active' : 'Completed' }}
            </span>
          </div>
          <div class="space-y-2 text-sm text-gray-700">
            <p><span class="font-semibold">Frequency:</span> {{ prescription.frequency }}</p>
            <p><span class="font-semibold">Prescribed by:</span> {{ prescription.doctor }}</p>
            <p><span class="font-semibold">Date:</span> {{ prescription.date }}</p>
            <p><span class="font-semibold">Duration:</span> {{ prescription.duration }}</p>
          </div>
        </div>
      </div>

      <!-- Lab Results Tab -->
      <div v-if="activeTab === 'labs'" class="space-y-6">
        <div v-for="lab in labResults" :key="lab.id" class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-xl font-bold text-gray-900">{{ lab.testName }}</h3>
              <p class="text-sm text-gray-600">{{ lab.date }}</p>
            </div>
            <button class="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition font-semibold text-sm">
              Download PDF
            </button>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="result in lab.results" :key="result.parameter" :class="[
              'border-l-4 pl-3',
              result.status === 'Normal' ? 'border-green-500' : 'border-orange-500'
            ]">
              <p class="text-xs text-gray-600">{{ result.parameter }}</p>
              <p class="text-lg font-bold text-gray-900">{{ result.value }}</p>
              <p class="text-xs" :class="[
                result.status === 'Normal' ? 'text-green-600' : 'text-orange-600'
              ]">{{ result.status }}</p>
            </div>
          </div>
          <p class="mt-4 text-sm text-gray-600">
            <span class="font-semibold">Ordered by:</span> {{ lab.doctor }}
          </p>
        </div>
      </div>

      <!-- Vaccinations Tab -->
      <div v-if="activeTab === 'vaccinations'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="vaccine in vaccinations" :key="vaccine.id" class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span class="text-2xl">💉</span>
            </div>
            <div>
              <h3 class="font-bold text-gray-900">{{ vaccine.name }}</h3>
              <p class="text-sm text-gray-600">{{ vaccine.date }}</p>
            </div>
          </div>
          <div class="space-y-1 text-sm text-gray-700">
            <p><span class="font-semibold">Dose:</span> {{ vaccine.dose }}</p>
            <p><span class="font-semibold">Provider:</span> {{ vaccine.provider }}</p>
            <p v-if="vaccine.nextDose" class="text-blue-600 font-semibold mt-2">
              Next dose: {{ vaccine.nextDose }}
            </p>
          </div>
        </div>
      </div>

      <!-- Documents Tab -->
      <div v-if="activeTab === 'documents'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="doc in documents" :key="doc.id" class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-gray-900 text-sm">{{ doc.name }}</h3>
              <p class="text-xs text-gray-600">{{ doc.date }}</p>
            </div>
          </div>
          <div class="flex gap-2">
            <button class="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold">
              View
            </button>
            <button class="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('history')

const tabs = [
  { id: 'history', label: 'Medical History' },
  { id: 'prescriptions', label: 'Prescriptions' },
  { id: 'labs', label: 'Lab Results' },
  { id: 'vaccinations', label: 'Vaccinations' },
  { id: 'documents', label: 'Documents' }
]

const medicalHistory = ref([
  {
    id: 1,
    condition: 'Hypertension',
    date: 'Jan 15, 2024',
    status: 'Active',
    description: 'Diagnosed with stage 1 hypertension. Currently managed with lifestyle modifications and medication.',
    doctor: 'Dr. Sarah Johnson'
  },
  {
    id: 2,
    condition: 'Seasonal Allergies',
    date: 'Mar 10, 2023',
    status: 'Resolved',
    description: 'Experienced seasonal allergic rhinitis. Treated with antihistamines.',
    doctor: 'Dr. Michael Chen'
  }
])

const prescriptions = ref([
  {
    id: 1,
    medication: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    doctor: 'Dr. Sarah Johnson',
    date: 'Jan 15, 2024',
    duration: '90 days',
    active: true
  },
  {
    id: 2,
    medication: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    doctor: 'Dr. Sarah Johnson',
    date: 'Feb 20, 2024',
    duration: '30 days',
    active: true
  }
])

const labResults = ref([
  {
    id: 1,
    testName: 'Complete Blood Count (CBC)',
    date: 'Dec 1, 2024',
    doctor: 'Dr. Sarah Johnson',
    results: [
      { parameter: 'Hemoglobin', value: '14.5 g/dL', status: 'Normal' },
      { parameter: 'WBC', value: '7.2 K/uL', status: 'Normal' },
      { parameter: 'Platelets', value: '250 K/uL', status: 'Normal' },
      { parameter: 'RBC', value: '4.8 M/uL', status: 'Normal' }
    ]
  },
  {
    id: 2,
    testName: 'Lipid Panel',
    date: 'Nov 15, 2024',
    doctor: 'Dr. Sarah Johnson',
    results: [
      { parameter: 'Total Cholesterol', value: '195 mg/dL', status: 'Normal' },
      { parameter: 'HDL', value: '55 mg/dL', status: 'Normal' },
      { parameter: 'LDL', value: '120 mg/dL', status: 'Borderline' },
      { parameter: 'Triglycerides', value: '140 mg/dL', status: 'Normal' }
    ]
  }
])

const vaccinations = ref([
  {
    id: 1,
    name: 'Influenza Vaccine',
    date: 'Oct 15, 2024',
    dose: 'Annual',
    provider: 'Nairobi Health Clinic',
    nextDose: 'Oct 2025'
  },
  {
    id: 2,
    name: 'COVID-19 Booster',
    date: 'Sep 10, 2024',
    dose: 'Booster',
    provider: 'Nairobi Health Clinic',
    nextDose: null
  },
  {
    id: 3,
    name: 'Tetanus',
    date: 'Jan 5, 2023',
    dose: '1st',
    provider: 'Nairobi Health Clinic',
    nextDose: 'Jan 2033'
  }
])

const documents = ref([
  {
    id: 1,
    name: 'Discharge Summary - Hospital Visit',
    date: 'Nov 20, 2024',
    type: 'PDF'
  },
  {
    id: 2,
    name: 'X-Ray Report - Chest',
    date: 'Oct 5, 2024',
    type: 'PDF'
  },
  {
    id: 3,
    name: 'ECG Report',
    date: 'Sep 15, 2024',
    type: 'PDF'
  }
])
</script>

<style scoped>
.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>