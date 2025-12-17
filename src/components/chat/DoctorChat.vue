<template>
  <div class="messaging-container">
    <!-- Sidebar - Patients List -->
    <div class="patients-sidebar">
      <!-- Header -->
      <div class="patients-header">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">👥 Patients</h2>
          <p class="text-xs text-gray-500 mt-1">{{ patients.length }} Active Patients</p>
        </div>
        <button class="filter-btn" title="Filter patients" @click="showFilters = !showFilters">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
      </div>

      <!-- Search Bar -->
      <div class="search-container">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search patients..." 
          class="search-input"
        />
      </div>

      <!-- Filter Options -->
      <div v-if="showFilters" class="filter-options">
        <label class="filter-option">
          <input type="checkbox" v-model="filters.unreadOnly" />
          <span>Unread messages only</span>
        </label>
        <label class="filter-option">
          <input type="checkbox" v-model="filters.urgent" />
          <span>Urgent cases</span>
        </label>
      </div>

      <!-- Patients List -->
      <div class="patients-list">
        <div
          v-for="patient in filteredPatients"
          :key="patient.id"
          @click="selectPatient(patient)"
          :class="['patient-item', { active: selectedPatient?.id === patient.id }]"
        >
          <!-- Avatar -->
          <div class="patient-avatar" :style="{ backgroundImage: `linear-gradient(135deg, ${patient.color[0]}, ${patient.color[1]})` }">
            {{ patient.initials }}
          </div>

          <!-- Patient Info -->
          <div class="patient-info">
            <div class="patient-header">
              <div class="patient-name-section">
                <p class="patient-name">{{ patient.name }}</p>
                <span v-if="patient.isUrgent" class="urgent-badge">🚨 URGENT</span>
              </div>
              <p class="patient-time">{{ patient.lastMessageTime }}</p>
            </div>
            <p class="patient-preview">{{ patient.lastMessage }}</p>
            <p class="patient-condition">{{ patient.condition }}</p>
          </div>

          <!-- Unread Badge -->
          <div v-if="patient.unread > 0" class="unread-badge">
            {{ patient.unread }}
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredPatients.length === 0" class="empty-state">
          <p class="text-gray-500">No patients found</p>
        </div>
      </div>
    </div>

    <!-- Chat Area -->
    <div class="chat-area">
      <!-- No Patient Selected -->
      <div v-if="!selectedPatient" class="no-chat-selected">
        <div class="text-center">
          <div class="text-6xl mb-4 animate-bounce">👨‍⚕️</div>
          <h2 class="text-3xl font-bold text-gray-900">Select a patient</h2>
          <p class="text-gray-600 mt-3">Choose a patient from the list to review and respond to messages</p>
          <div class="mt-8 space-y-4">
            <div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p class="text-sm font-semibold text-blue-900">📊 Quick Stats</p>
              <p class="text-xs text-blue-700 mt-2">{{ patients.length }} active patients • {{ totalUnread }} unread messages</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Window -->
      <div v-else class="chat-window">
        <!-- Chat Header -->
        <div class="chat-header-bar">
          <div class="chat-header-content">
            <button @click="selectedPatient = null" class="back-btn" title="Back">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div class="chat-patient-info">
              <div class="patient-avatar-small" :style="{ backgroundImage: `linear-gradient(135deg, ${selectedPatient.color[0]}, ${selectedPatient.color[1]})` }">
                {{ selectedPatient.initials }}
              </div>
              <div>
                <p class="font-bold text-gray-100">{{ selectedPatient.name }}</p>
                <p class="text-xs text-blue-100">📋 {{ selectedPatient.condition }}</p>
              </div>
            </div>
          </div>

          <div class="chat-actions">
            <button class="action-btn" title="Prescriptions">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
            <button class="action-btn" title="Patient records">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button class="action-btn" title="Schedule call">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 00-.948.684l-.5 1.5a1 1 0 00.502 1.21 2.04 2.04 0 101.515 3.71A2.04 2.04 0 003 5z" />
              </svg>
            </button>
            <button class="action-btn" title="More options">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.5 1.5H19V10h1.5V0h-10v1.5zm0 17H0v-1.5h10.5V19zM0 9.5h1.5v9H0v-9zm19-9v10h1.5V.5H19z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Patient Info Banner -->
        <div class="patient-info-banner">
          <div class="info-item">
            <span class="info-label">Age:</span>
            <span class="info-value">{{ selectedPatient.age }} years</span>
          </div>
          <div class="info-item">
            <span class="info-label">Last Visit:</span>
            <span class="info-value">{{ selectedPatient.lastVisit }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Contact:</span>
            <span class="info-value">{{ selectedPatient.phone }}</span>
          </div>
          <div v-if="selectedPatient.isUrgent" class="info-item urgent">
            <span class="info-label">Status:</span>
            <span class="info-value">🚨 URGENT</span>
          </div>
        </div>

        <!-- Messages -->
        <div ref="messagesContainer" class="messages-container">
          <div
            v-for="msg in selectedPatient.messages"
            :key="msg.id"
            :class="['message-group', { 'sent-group': msg.sender === 'doctor' }]"
          >
            <!-- Avatar for patient messages -->
            <div v-if="msg.sender !== 'doctor'" class="message-avatar" :style="{ backgroundImage: `linear-gradient(135deg, ${selectedPatient.color[0]}, ${selectedPatient.color[1]})` }">
              {{ selectedPatient.initials }}
            </div>

            <!-- Message Bubble -->
            <div :class="['message-bubble', { 'sent': msg.sender === 'doctor', 'received': msg.sender !== 'doctor' }]">
              <p>{{ msg.content }}</p>
              <p class="message-time">{{ msg.time }}</p>
            </div>

            <!-- Avatar for doctor messages -->
            <div v-if="msg.sender === 'doctor'" class="message-avatar doctor-avatar">
              👨‍⚕️
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isTyping" class="message-group">
            <div class="message-avatar" :style="{ backgroundImage: `linear-gradient(135deg, ${selectedPatient.color[0]}, ${selectedPatient.color[1]})` }">
              {{ selectedPatient.initials }}
            </div>
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="input-area">
          <button class="input-btn" title="Attach file">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8m0 8l-6-6m6 6l6-6" />
            </svg>
          </button>

          <div class="input-wrapper">
            <textarea
              v-model="messageInput"
              placeholder="Type your response..."
              @keypress.ctrl.enter="sendMessage"
              class="message-input"
              rows="2"
            ></textarea>
            <span v-if="messageInput" class="char-count">{{ messageInput.length }}/1000</span>
          </div>

          <div class="input-actions">
            <button class="input-btn" title="Prescribe">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button @click="sendMessage" class="send-btn" :disabled="!messageInput.trim()" title="Send (Ctrl+Enter)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const searchQuery = ref('')
const messageInput = ref('')
const selectedPatient = ref(null)
const messagesContainer = ref(null)
const isTyping = ref(false)
const showFilters = ref(false)

const filters = ref({
  unreadOnly: false,
  urgent: false
})

const patients = ref([
  {
    id: 1,
    name: 'John Doe',
    initials: 'JD',
    color: ['#3b82f6', '#2563eb'],
    age: 35,
    condition: 'Hypertension & Regular Checkup',
    lastMessage: 'I have been experiencing some chest discomfort',
    lastMessageTime: '2:30 PM',
    lastVisit: '2 months ago',
    phone: '+254 712 345 678',
    unread: 2,
    isUrgent: false,
    messages: [
      { id: 1, sender: 'patient', content: 'I have been experiencing some chest discomfort', time: '2:15 PM' },
      { id: 2, sender: 'doctor', content: 'Thank you for reporting this. Can you describe the discomfort in more detail? Is it sharp, dull, or pressure-like?', time: '2:18 PM' },
      { id: 3, sender: 'patient', content: 'It feels like pressure, especially when I climb stairs', time: '2:22 PM' },
      { id: 4, sender: 'doctor', content: 'That\'s important information. Have you noticed this happening at specific times or activities?', time: '2:25 PM' },
      { id: 5, sender: 'patient', content: 'Yes, mainly during physical activity', time: '2:30 PM' }
    ]
  },
  {
    id: 2,
    name: 'Sarah Williams',
    initials: 'SW',
    color: ['#ec4899', '#db2777'],
    age: 28,
    condition: 'Seasonal Allergies',
    lastMessage: 'The medication you prescribed is working well',
    lastMessageTime: '1:45 PM',
    lastVisit: '3 weeks ago',
    phone: '+254 722 456 789',
    unread: 0,
    isUrgent: false,
    messages: [
      { id: 1, sender: 'patient', content: 'The medication you prescribed is working well', time: '1:30 PM' },
      { id: 2, sender: 'doctor', content: 'Great to hear! Continue the current dosage for another 2 weeks.', time: '1:35 PM' },
      { id: 3, sender: 'patient', content: 'Will do. Should I avoid any foods?', time: '1:40 PM' },
      { id: 4, sender: 'doctor', content: 'Try to avoid dairy products if you notice increased symptoms. Take care!', time: '1:45 PM' }
    ]
  },
  {
    id: 3,
    name: 'Michael Johnson',
    initials: 'MJ',
    color: ['#f59e0b', '#f97316'],
    age: 52,
    condition: 'Diabetes Type 2 - URGENT',
    lastMessage: 'My blood sugar levels are consistently high',
    lastMessageTime: '11:20 AM',
    lastVisit: '1 week ago',
    phone: '+254 733 567 890',
    unread: 3,
    isUrgent: true,
    messages: [
      { id: 1, sender: 'patient', content: 'My blood sugar levels are consistently high', time: '11:00 AM' },
      { id: 2, sender: 'doctor', content: 'What range have you been seeing? This needs immediate attention.', time: '11:05 AM' },
      { id: 3, sender: 'patient', content: 'Between 250-300 mg/dL', time: '11:10 AM' },
      { id: 4, sender: 'doctor', content: 'This is concerning. I\'m scheduling an urgent appointment for you today.', time: '11:15 AM' },
      { id: 5, sender: 'patient', content: 'What should I do in the meantime?', time: '11:20 AM' }
    ]
  },
  {
    id: 4,
    name: 'Emily Chen',
    initials: 'EC',
    color: ['#10b981', '#059669'],
    age: 31,
    condition: 'Migraine Management',
    lastMessage: 'All tests came back normal',
    lastMessageTime: 'Yesterday',
    lastVisit: '1 month ago',
    phone: '+254 741 234 567',
    unread: 0,
    isUrgent: false,
    messages: [
      { id: 1, sender: 'patient', content: 'All tests came back normal', time: 'Yesterday 3:00 PM' },
      { id: 2, sender: 'doctor', content: 'Excellent! Let\'s continue with the current treatment plan.', time: 'Yesterday 3:15 PM' }
    ]
  }
])

const totalUnread = computed(() => {
  return patients.value.reduce((sum, patient) => sum + patient.unread, 0)
})

const filteredPatients = computed(() => {
  let filtered = patients.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(patient =>
      patient.name.toLowerCase().includes(query) ||
      patient.condition.toLowerCase().includes(query)
    )
  }

  if (filters.value.unreadOnly) {
    filtered = filtered.filter(patient => patient.unread > 0)
  }

  if (filters.value.urgent) {
    filtered = filtered.filter(patient => patient.isUrgent)
  }

  return filtered.sort((a, b) => b.unread - a.unread)
})

const selectPatient = (patient) => {
  selectedPatient.value = patient
  patient.unread = 0
  nextTick(() => {
    scrollToBottom()
  })
}

const sendMessage = () => {
  if (!messageInput.value.trim() || !selectedPatient.value) return

  const doctorMessage = {
    id: Date.now(),
    sender: 'doctor',
    content: messageInput.value,
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  }

  selectedPatient.value.messages.push(doctorMessage)
  selectedPatient.value.lastMessage = messageInput.value
  selectedPatient.value.lastMessageTime = 'Just now'
  messageInput.value = ''

  nextTick(() => {
    scrollToBottom()
  })

  // Simulate patient response
  isTyping.value = true
  setTimeout(() => {
    if (selectedPatient.value) {
      const patientResponses = [
        'Thank you for your response doctor.',
        'I understand. I will follow your advice.',
        'Should I schedule a follow-up appointment?',
        'How long until I see improvement?',
        'What should I do if symptoms worsen?'
      ]

      const randomResponse = patientResponses[Math.floor(Math.random() * patientResponses.length)]
      
      const patientMessage = {
        id: Date.now() + 1,
        sender: 'patient',
        content: randomResponse,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      }

      isTyping.value = false
      selectedPatient.value.messages.push(patientMessage)
      
      nextTick(() => {
        scrollToBottom()
      })
    }
  }, 2000)
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}
</script>

<style scoped>
.messaging-container {
  display: flex;
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
}

/* Sidebar */
.patients-sidebar {
  width: 400px;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #ffffff, #f9fafb);
}

.patients-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid #e5e7eb;
}

.filter-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(to right, rgb(37, 99, 235), rgb(147, 51, 234));
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-top: 5px;
}

.filter-btn:hover {
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
  transform: scale(1.05);
}

.search-container {
  padding: 0 1rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #f3f4f6;
  border-radius: 0.75rem;
  margin: 0 1rem;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 0.5rem 0;
  font-size: 0.875rem;
  color: #111827;
}

.search-input::placeholder {
  color: #9ca3af;
}

.filter-options {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
}

.filter-option input {
  cursor: pointer;
}

.patients-list {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
}

.patient-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  margin-bottom: 0.5rem;
}

.patient-item:hover {
  background-color: #f0f1f3;
}

.patient-item.active {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(147, 51, 234, 0.1));
  border-left: 4px solid rgb(37, 99, 235);
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.1);
}

.patient-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.patient-info {
  flex: 1;
  min-width: 0;
}

.patient-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.patient-name-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.patient-name {
  font-weight: 600;
  color: #111827;
  font-size: 0.875rem;
}

.urgent-badge {
  font-size: 0.65rem;
  background-color: #fee2e2;
  color: #991b1b;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-weight: 600;
}

.patient-time {
  font-size: 0.75rem;
  color: #9ca3af;
}

.patient-preview {
  font-size: 0.8125rem;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.patient-condition {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 0.125rem;
}

.unread-badge {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(to right, rgb(37, 99, 235), rgb(147, 51, 234));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

/* Chat Area */
.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

.no-chat-selected {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.03), rgba(147, 51, 234, 0.03));
}

.chat-window {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-header-bar {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, rgb(37, 99, 235), rgb(147, 51, 234));
  color: white;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.chat-header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.back-btn {
  display: none;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background 0.2s;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.chat-patient-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.patient-avatar-small {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: white;
  flex-shrink: 0;
}

.chat-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.patient-info-banner {
  padding: 1rem 1.5rem;
  background: linear-gradient(to right, rgba(37, 99, 235, 0.05), rgba(147, 51, 234, 0.05));
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-item.urgent {
  color: #991b1b;
}

.info-label {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 600;
  text-transform: uppercase;
}

.info-value {
  font-size: 0.875rem;
  color: #111827;
  font-weight: 500;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: linear-gradient(to bottom, #ffffff, #f9fafb);
}

.message-group {
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
  animation: slideUp 0.3s ease-out;
}

.sent-group {
  justify-content: flex-end;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-weight: bold;
}

.doctor-avatar {
  background: linear-gradient(135deg, rgb(34, 197, 94), rgb(59, 130, 246));
}

.message-bubble {
  max-width: 55%;
  padding: 0.875rem 1.125rem;
  border-radius: 1.25rem;
  font-size: 0.875rem;
  word-wrap: break-word;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.message-bubble p {
  margin: 0 0 0.25rem 0;
  line-height: 1.4;
}

.message-time {
  font-size: 0.7rem;
  margin: 0;
  opacity: 0.7;
}

.message-bubble.sent {
  background: linear-gradient(135deg, rgb(37, 99, 235), rgb(29, 78, 216));
  color: white;
  border-bottom-right-radius: 0.25rem;
}

.message-bubble.received {
  background-color: #e5e7eb;
  color: #111827;
  border-bottom-left-radius: 0.25rem;
}

.typing-indicator {
  display: flex;
  gap: 0.4rem;
  padding: 0.875rem 1.125rem;
  background-color: #e5e7eb;
  border-radius: 1.25rem;
  border-bottom-left-radius: 0.25rem;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #9ca3af;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    opacity: 0.5;
    transform: translateY(0);
  }
  30% {
    opacity: 1;
    transform: translateY(-10px);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.input-area {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  background-color: #ffffff;
  border-radius: 0 0 1rem 1rem;
}

.input-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  transition: all 0.2s;
  flex-shrink: 0;
}

.input-btn:hover {
  color: rgb(37, 99, 235);
  background-color: #f3f4f6;
  transform: scale(1.05);
}

.input-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: flex-end;
}

.message-input {
  flex: 1;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s;
  max-height: 120px;
  resize: vertical;
  font-family: inherit;
}

.message-input:focus {
  border-color: rgb(37, 99, 235);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.char-count {
  position: absolute;
  right: 1rem;
  bottom: 0.75rem;
  font-size: 0.7rem;
  color: #9ca3af;
  pointer-events: none;
}

.input-actions {
  display: flex;
  gap: 0.5rem;
}

.send-btn {
  background: linear-gradient(135deg, rgb(37, 99, 235), rgb(147, 51, 234));
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
  transform: scale(1.05);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-btn:active:not(:disabled) {
  transform: scale(0.95);
}

/* Scrollbar */
.patients-list::-webkit-scrollbar,
.messages-container::-webkit-scrollbar {
  width: 6px;
}

.patients-list::-webkit-scrollbar-track,
.messages-container::-webkit-scrollbar-track {
  background: transparent;
}

.patients-list::-webkit-scrollbar-thumb,
.messages-container::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.patients-list::-webkit-scrollbar-thumb:hover,
.messages-container::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .messaging-container {
    flex-direction: column;
  }

  .patients-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
    max-height: 200px;
  }

  .chat-area {
    flex: 1;
  }

  .back-btn {
    display: flex;
  }

  .message-bubble {
    max-width: 85%;
  }

  .no-chat-selected {
    display: none;
  }

  .chat-window {
    display: flex;
  }

  .patient-info-banner {
    gap: 1rem;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}
</style>