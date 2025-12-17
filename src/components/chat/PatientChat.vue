<template>
  <div class="messaging-container">
    <!-- Sidebar - Contacts List -->
    <div class="contacts-sidebar">
      <!-- Header -->
      <div class="contacts-header">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">💬 Messages</h2>
          <p class="text-xs text-gray-500 mt-1">{{ contacts.length }} Contacts</p>
        </div>
        <button class="new-chat-btn" title="Start new chat">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m7-7H5" />
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
          placeholder="Search doctors..." 
          class="search-input"
        />
      </div>

      <!-- Contacts List -->
      <div class="contacts-list">
        <div
          v-for="contact in filteredContacts"
          :key="contact.id"
          @click="selectContact(contact)"
          :class="['contact-item', { active: selectedContact?.id === contact.id }]"
        >
          <!-- Avatar -->
          <div class="contact-avatar">
            {{ contact.avatar }}
          </div>

          <!-- Contact Info -->
          <div class="contact-info">
            <div class="contact-header">
              <p class="contact-name">{{ contact.name }}</p>
              <p class="contact-time">{{ contact.lastMessageTime }}</p>
            </div>
            <p class="contact-preview">{{ contact.lastMessage }}</p>
          </div>

          <!-- Unread Badge -->
          <div v-if="contact.unread > 0" class="unread-badge">
            {{ contact.unread }}
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredContacts.length === 0" class="empty-state">
          <p class="text-gray-500">No doctors found</p>
        </div>
      </div>
    </div>

    <!-- Chat Area -->
    <div class="chat-area">
      <!-- No Contact Selected -->
      <div v-if="!selectedContact" class="no-chat-selected">
        <div class="text-center">
          <div class="text-6xl mb-4 animate-bounce">💬</div>
          <h2 class="text-3xl font-bold text-gray-900">Select a doctor</h2>
          <p class="text-gray-600 mt-3">Choose a doctor from the list to start your conversation</p>
          <div class="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
            <p class="text-sm text-gray-700">✨ Your doctors will respond with helpful guidance and medical advice</p>
          </div>
        </div>
      </div>

      <!-- Chat Window -->
      <div v-else class="chat-window">
        <!-- Chat Header -->
        <div class="chat-header-bar">
          <div class="chat-header-content">
            <button @click="selectedContact = null" class="back-btn" title="Back">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div class="chat-contact-info">
              <div class="contact-avatar-small">{{ selectedContact.avatar }}</div>
              <div>
                <p class="font-bold text-gray-100">{{ selectedContact.name }}</p>
                <p class="text-xs text-blue-100 flex items-center gap-1">
                  <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Online & Available
                </p>
              </div>
            </div>
          </div>

          <div class="chat-actions">
            <button class="action-btn" title="Call">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 00-.948.684l-.5 1.5a1 1 0 00.502 1.21 2.04 2.04 0 101.515 3.71A2.04 2.04 0 003 5z" />
              </svg>
            </button>
            <button class="action-btn" title="Video call">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button class="action-btn" title="More options">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.5 1.5H19V10h1.5V0h-10v1.5zm0 17H0v-1.5h10.5V19zM0 9.5h1.5v9H0v-9zm19-9v10h1.5V.5H19z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Messages -->
        <div ref="messagesContainer" class="messages-container">
          <div
            v-for="msg in selectedContact.messages"
            :key="msg.id"
            :class="['message-group', { 'sent-group': msg.sender === 'user' }]"
          >
            <!-- Avatar for received messages -->
            <div v-if="msg.sender !== 'user'" class="message-avatar">
              {{ selectedContact.avatar }}
            </div>

            <!-- Message Bubble -->
            <div :class="['message-bubble', { 'sent': msg.sender === 'user', 'received': msg.sender !== 'user' }]">
              <p>{{ msg.content }}</p>
              <p class="message-time">{{ msg.time }}</p>
            </div>

            <!-- Avatar for sent messages -->
            <div v-if="msg.sender === 'user'" class="message-avatar user-avatar">
              You
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isTyping" class="message-group">
            <div class="message-avatar">{{ selectedContact.avatar }}</div>
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
            <input
              v-model="messageInput"
              type="text"
              placeholder="Type your message..."
              @keypress.enter="sendMessage"
              class="message-input"
            />
            <span v-if="messageInput" class="char-count">{{ messageInput.length }}/500</span>
          </div>

          <button class="input-btn" title="Emoji">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2zm-6 4a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 01-1 1H8a1 1 0 01-1-1v-1zm4-1a1 1 0 100 2h2a1 1 0 100-2h-2z" clip-rule="evenodd" />
            </svg>
          </button>

          <button @click="sendMessage" class="send-btn" :disabled="!messageInput.trim()">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const searchQuery = ref('')
const messageInput = ref('')
const selectedContact = ref(null)
const messagesContainer = ref(null)
const isTyping = ref(false)

const autoResponses = [
  "Hello! Thanks for reaching out. How may I help you today?",
  "I'm here to assist with any health concerns or questions you might have.",
  "Feel free to share what's on your mind, and I'll do my best to help. If needed, we can schedule a call for a more detailed consultation."
]

const contacts = ref([
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    avatar: '👩‍⚕️',
    lastMessage: 'Your prescription is ready for pickup',
    lastMessageTime: '2:30 PM',
    unread: 2,
    messages: [
      { id: 1, sender: 'doctor', content: 'Hello! Thanks for reaching out. How may I help you today?', time: '2:15 PM' },
      { id: 2, sender: 'user', content: 'I have been experiencing some chest discomfort', time: '2:18 PM' },
      { id: 3, sender: 'doctor', content: 'I\'m here to assist with any health concerns or questions you might have.', time: '2:22 PM' },
      { id: 4, sender: 'user', content: 'When should I be concerned?', time: '2:25 PM' },
      { id: 5, sender: 'doctor', content: 'Feel free to share what\'s on your mind, and I\'ll do my best to help. If needed, we can schedule a call for a more detailed consultation.', time: '2:30 PM' }
    ]
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'General Physician',
    avatar: '👨‍⚕️',
    lastMessage: 'See you next week for your checkup',
    lastMessageTime: '1:45 PM',
    unread: 0,
    messages: [
      { id: 1, sender: 'doctor', content: 'Hello! Thanks for reaching out. How may I help you today?', time: '1:30 PM' },
      { id: 2, sender: 'user', content: 'I want to book my annual checkup', time: '1:35 PM' },
      { id: 3, sender: 'doctor', content: 'I\'m here to assist with any health concerns or questions you might have.', time: '1:38 PM' },
      { id: 4, sender: 'user', content: 'Next week works for me', time: '1:42 PM' },
      { id: 5, sender: 'doctor', content: 'Feel free to share what\'s on your mind, and I\'ll do my best to help. If needed, we can schedule a call for a more detailed consultation.', time: '1:45 PM' }
    ]
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Dermatologist',
    avatar: '👩‍⚕️',
    lastMessage: 'Remember to take your medications',
    lastMessageTime: '11:20 AM',
    unread: 0,
    messages: [
      { id: 1, sender: 'doctor', content: 'Hello! Thanks for reaching out. How may I help you today?', time: '11:00 AM' },
      { id: 2, sender: 'user', content: 'I have a skin rash on my arm', time: '11:05 AM' },
      { id: 3, sender: 'doctor', content: 'I\'m here to assist with any health concerns or questions you might have.', time: '11:10 AM' },
      { id: 4, sender: 'user', content: 'It started 3 days ago', time: '11:15 AM' },
      { id: 5, sender: 'doctor', content: 'Feel free to share what\'s on your mind, and I\'ll do my best to help. If needed, we can schedule a call for a more detailed consultation.', time: '11:20 AM' }
    ]
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Neurologist',
    avatar: '👨‍⚕️',
    lastMessage: 'All tests came back normal',
    lastMessageTime: 'Yesterday',
    unread: 0,
    messages: [
      { id: 1, sender: 'doctor', content: 'Hello! Thanks for reaching out. How may I help you today?', time: 'Yesterday 2:00 PM' }
    ]
  }
])

const filteredContacts = computed(() => {
  if (!searchQuery.value) return contacts.value
  return contacts.value.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    contact.specialty.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectContact = (contact) => {
  selectedContact.value = contact
  contact.unread = 0
  nextTick(() => {
    scrollToBottom()
  })
}

const sendMessage = () => {
  if (!messageInput.value.trim() || !selectedContact.value) return

  const userMessage = {
    id: Date.now(),
    sender: 'user',
    content: messageInput.value,
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  }

  selectedContact.value.messages.push(userMessage)
  selectedContact.value.lastMessage = messageInput.value
  selectedContact.value.lastMessageTime = 'Now'
  messageInput.value = ''

  nextTick(() => {
    scrollToBottom()
  })

  // Show typing indicator
  isTyping.value = true

  // Auto-reply with sequence
  setTimeout(() => {
    if (selectedContact.value) {
      const lastMessageIndex = selectedContact.value.messages.filter(m => m.sender === 'doctor').length - 1
      const responseIndex = Math.min(lastMessageIndex, autoResponses.length - 1)
      
      const autoReply = {
        id: Date.now() + 1,
        sender: 'doctor',
        content: autoResponses[responseIndex],
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      }

      isTyping.value = false
      selectedContact.value.messages.push(autoReply)
      
      nextTick(() => {
        scrollToBottom()
      })
    }
  }, 1500)
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
.contacts-sidebar {
  width: 380px;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #ffffff, #f9fafb);
}

.contacts-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid #e5e7eb;
}

.new-chat-btn {
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

.new-chat-btn:hover {
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

.contacts-list {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
}

.contact-item {
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

.contact-item:hover {
  background-color: #f0f1f3;
}

.contact-item.active {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(147, 51, 234, 0.1));
  border-left: 4px solid rgb(37, 99, 235);
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.1);
}

.contact-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgb(37, 99, 235), rgb(147, 51, 234));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
}

.contact-info {
  flex: 1;
  min-width: 0;
}

.contact-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.contact-name {
  font-weight: 600;
  color: #111827;
  font-size: 0.875rem;
}

.contact-time {
  font-size: 0.75rem;
  color: #9ca3af;
}

.contact-preview {
  font-size: 0.8125rem;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

.chat-contact-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.contact-avatar-small {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
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
  background: linear-gradient(135deg, rgb(37, 99, 235), rgb(147, 51, 234));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
}

.user-avatar {
  background: linear-gradient(135deg, rgb(34, 197, 94), rgb(59, 130, 246));
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.2);
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
  align-items: center;
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
  resize: none;
}

.message-input:focus {
  border-color: rgb(37, 99, 235);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.char-count {
  position: absolute;
  right: 1rem;
  font-size: 0.7rem;
  color: #9ca3af;
  pointer-events: none;
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
.contacts-list::-webkit-scrollbar,
.messages-container::-webkit-scrollbar {
  width: 6px;
}

.contacts-list::-webkit-scrollbar-track,
.messages-container::-webkit-scrollbar-track {
  background: transparent;
}

.contacts-list::-webkit-scrollbar-thumb,
.messages-container::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.contacts-list::-webkit-scrollbar-thumb:hover,
.messages-container::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .messaging-container {
    flex-direction: column;
  }

  .contacts-sidebar {
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

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>