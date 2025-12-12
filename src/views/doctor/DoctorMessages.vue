<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 mb-6">💬 Patient Messages</h2>

    <div class="grid md:grid-cols-3 gap-6">
      <!-- Conversations List -->
      <div class="md:col-span-1">
        <div class="bg-white rounded-xl shadow border border-gray-200">
          <div class="p-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
            <h3 class="font-semibold text-gray-900">Patients</h3>
          </div>

          <div class="max-h-96 overflow-y-auto divide-y">
            <button 
              v-for="patient in patients"
              :key="patient.id"
              @click="selectPatient(patient)"
              :class="[
                'w-full p-4 text-left flex items-center gap-3 hover:bg-gray-50 transition',
                selectedPatient === patient.id ? 'bg-purple-100 border-l-4 border-purple-600' : ''
              ]"
            >
              <div class="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                {{ patient.patientName.charAt(0) }}
              </div>

              <div class="flex-1 min-w-0">
                <p class="font-semibold text-gray-900 truncate">
                  {{ patient.patientName }}
                </p>
                <p class="text-sm text-gray-600 truncate">
                  {{ patient.lastMessage }}
                </p>
              </div>

              <span
                v-if="patient.unread"
                class="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full"
              >
                {{ patient.unread }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Chat Window -->
      <div class="md:col-span-2">
        <div v-if="selectedPatient" class="bg-white rounded-xl shadow border border-gray-200 h-96 flex flex-col overflow-hidden">

          <!-- Header -->
          <div class="border-b p-4 flex items-center gap-3 bg-gradient-to-r from-purple-50 to-purple-100">
            <div class="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
              {{ getSelectedPatient.patientName.charAt(0) }}
            </div>
            <div>
              <p class="font-semibold text-gray-900">{{ getSelectedPatient.patientName }}</p>
              <p class="text-xs text-gray-600">
                Last appointment: {{ getSelectedPatient.lastAppointment }}
              </p>
            </div>
          </div>

          <!-- Messages -->
          <div
            ref="messageContainer"
            class="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
          >
            <chat-message 
              v-for="msg in currentMessages"
              :key="msg.id"
              :content="msg.content"
              :sender="msg.sender"
              :sender-name="msg.senderName"
              :timestamp="msg.timestamp"
              :is-current-user="msg.sender === 'doctor'"
            />
          </div>

          <!-- Input -->
          <chat-input @send-message="handleSendMessage" />
        </div>

        <div v-else class="bg-white rounded-xl shadow border border-gray-200 h-96 flex items-center justify-center">
          <p class="text-gray-600">Select a patient to view messages</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import ChatMessage from '@/components/chat/ChatMessage.vue'
import ChatInput from '@/components/chat/ChatInput.vue'

const selectedPatient = ref(null)
const messageContainer = ref(null)

const patients = ref([
  {
    id: 1,
    patientName: 'John Doe',
    lastMessage: 'Thanks for the prescription!',
    unread: 2,
    lastAppointment: 'Dec 10, 2025',
    messages: [
      { id: 1, sender: 'patient', senderName: 'John', content: 'Hello doctor, how are you?', timestamp: new Date() },
      { id: 2, sender: 'doctor', senderName: 'You', content: 'Hello John, I am doing well. How can I help?', timestamp: new Date() }
    ]
  },
  {
    id: 2,
    patientName: 'Jane Smith',
    lastMessage: 'When can I schedule my next appointment?',
    unread: 1,
    lastAppointment: 'Dec 5, 2025',
    messages: [
      { id: 1, sender: 'patient', senderName: 'Jane', content: 'Doctor, I still have pain', timestamp: new Date() },
      { id: 2, sender: 'doctor', senderName: 'You', content: 'Let me adjust your medication', timestamp: new Date() }
    ]
  },
  {
    id: 3,
    patientName: 'Peter Johnson',
    lastMessage: 'I am feeling much better now, thank you',
    unread: 0,
    lastAppointment: 'Nov 28, 2025',
    messages: []
  }
])

// Select a patient
const selectPatient = (patient) => {
  selectedPatient.value = patient.id
  patient.unread = 0

  nextTick(() => scrollToBottom())
}

const getSelectedPatient = computed(() => {
  return patients.value.find(p => p.id === selectedPatient.value) || {}
})

const currentMessages = computed(() => {
  const patient = patients.value.find(p => p.id === selectedPatient.value)
  return patient ? patient.messages : []
})

// Auto-scroll to bottom
const scrollToBottom = () => {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight
  }
}

const handleSendMessage = (content) => {
  const patient = patients.value.find(p => p.id === selectedPatient.value)
  if (!patient) return

  patient.messages.push({
    id: patient.messages.length + 1,
    sender: 'doctor',
    senderName: 'You',
    content,
    timestamp: new Date()
  })

  nextTick(() => scrollToBottom())

  // Simulated patient reply
  setTimeout(() => {
    patient.messages.push({
      id: patient.messages.length + 1,
      sender: 'patient',
      senderName: patient.patientName,
      content: 'Thank you for your response, doctor.',
      timestamp: new Date()
    })

    nextTick(() => scrollToBottom())
  }, 1500)
}
</script>

<style scoped>
/* Optional smooth scrolling */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: #c4b5fd;
  border-radius: 10px;
}
</style>
