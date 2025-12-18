<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- Header -->
    <div class="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
      <div class="px-6 py-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg">
            💬
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Chat with Doctors</h2>
            <p class="text-gray-600 text-sm">Get instant medical advice from qualified professionals</p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-8">
      <div class="grid md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        <!-- Conversations List -->
        <div class="md:col-span-1">
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col overflow-hidden">
            <!-- List Header -->
            <div class="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <h3 class="font-bold text-lg text-gray-900 flex items-center gap-2">
                <span class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                  {{ conversations.length }}
                </span>
                Conversations
              </h3>
            </div>

            <!-- Search Bar -->
            <div class="p-4 border-b border-gray-200">
              <div class="relative">
                <svg class="absolute left-3 top-3 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  v-model="searchQuery"
                  type="text" 
                  placeholder="Search doctors..." 
                  class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                />
              </div>
            </div>

            <!-- Conversations List -->
            <div class="flex-1 overflow-y-auto">
              <div v-if="filteredConversations.length > 0" class="divide-y">
                <button 
                  v-for="conversation in filteredConversations"
                  :key="conversation.id"
                  @click="selectedConversation = conversation.id"
                  :class="[
                    'w-full p-4 text-left hover:bg-blue-50 transition-all duration-200 border-l-4 border-transparent',
                    selectedConversation === conversation.id 
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-600 shadow-sm' 
                      : 'hover:border-l-4 hover:border-blue-300'
                  ]"
                >
                  <div class="flex items-center gap-3">
                    <!-- Avatar -->
                    <div class="relative">
                      <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {{ conversation.doctorName.charAt(0) }}
                      </div>
                      <!-- Online Status -->
                      <div class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
                    </div>

                    <!-- Conversation Info -->
                    <div class="flex-1 min-w-0">
                      <div class="flex items-start justify-between gap-2">
                        <div class="flex-1">
                          <p class="font-bold text-gray-900 text-sm">{{ conversation.doctorName }}</p>
                          <p class="text-xs text-blue-600 font-semibold mt-0.5">{{ conversation.specialty }}</p>
                        </div>
                        <span class="text-xs text-gray-500 flex-shrink-0">{{ conversation.timestamp }}</span>
                      </div>
                      <p class="text-xs text-gray-600 truncate mt-2">{{ conversation.lastMessage }}</p>
                    </div>

                    <!-- Unread Badge -->
                    <div v-if="conversation.unread" class="flex-shrink-0">
                      <span class="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg animate-pulse">
                        {{ conversation.unread }}
                      </span>
                    </div>
                  </div>
                </button>
              </div>

              <!-- No Results -->
              <div v-else class="text-center py-8 text-gray-500">
                <div class="text-4xl mb-2">🔍</div>
                <p class="text-sm">No conversations found</p>
              </div>
            </div>

            <!-- Start New Chat Button -->
            <div class="p-4 border-t border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <button class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg hover:from-blue-700 hover:to-purple-700 font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                <span>+</span> New Chat
              </button>
            </div>
          </div>
        </div>

        <!-- Chat Window -->
        <div class="md:col-span-2">
          <!-- Chat Active -->
          <div v-if="selectedConversation && getSelectedDoctor" class="bg-white rounded-2xl shadow-lg border border-gray-100 h-full overflow-hidden flex flex-col">
            <ChatWindow 
              :recipient-name="getSelectedDoctor.doctorName"
              :recipient-image="getSelectedDoctor.recipientImage"
              :is-online="true"
            />
          </div>

          <!-- No Conversation Selected -->
          <div v-else class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col items-center justify-center p-8">
            <div class="text-center">
              <div class="text-7xl mb-4 animate-bounce">💬</div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Start a Conversation</h3>
              <p class="text-gray-600 mb-6 max-w-sm">Select a doctor from the list or start a new chat to get instant medical advice</p>
              
              <div class="space-y-3">
                <button class="w-full max-w-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                  <span>+</span> Start New Chat
                </button>
                <button class="w-full max-w-xs bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-xl hover:border-blue-500 hover:bg-blue-50 font-semibold transition-all">
                  View Available Doctors
                </button>
              </div>

              <!-- Quick Tips -->
              <div class="mt-8 pt-6 border-t border-gray-300 text-left">
                <p class="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">Quick Tips</p>
                <div class="space-y-2">
                  <div class="flex items-start gap-2">
                    <span class="text-lg">✓</span>
                    <span class="text-sm text-gray-600">Get instant responses from qualified doctors</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="text-lg">✓</span>
                    <span class="text-sm text-gray-600">Share medical history and documents securely</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="text-lg">✓</span>
                    <span class="text-sm text-gray-600">24/7 support from healthcare professionals</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ChatWindow from '@/components/chat/ChatWindow.vue'

const selectedConversation = ref(null)
const searchQuery = ref('')

const conversations = ref([
  {
    id: 1,
    doctorName: 'Dr. Sarah Kipchoge',
    specialty: 'Cardiology',
    recipientImage: '👩‍⚕️',
    lastMessage: 'That sounds like it could be tension headaches...',
    unread: 0,
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    doctorName: 'Dr. James Mwangi',
    specialty: 'Orthopedics',
    recipientImage: '👨‍⚕️',
    lastMessage: 'Let me prescribe something that might help.',
    unread: 1,
    timestamp: '1 day ago'
  },
  {
    id: 3,
    doctorName: 'Dr. Emily Achieng',
    specialty: 'Pediatrics',
    recipientImage: '👩‍⚕️',
    lastMessage: 'Please come in for a follow-up visit.',
    unread: 0,
    timestamp: '3 days ago'
  },
  {
    id: 4,
    doctorName: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    recipientImage: '👨‍⚕️',
    lastMessage: 'The treatment should start showing results soon.',
    unread: 2,
    timestamp: '5 hours ago'
  },
  {
    id: 5,
    doctorName: 'Dr. Grace Okonkwo',
    specialty: 'Neurology',
    recipientImage: '👩‍⚕️',
    lastMessage: 'Schedule a follow-up appointment please.',
    unread: 0,
    timestamp: 'Yesterday'
  }
])

const filteredConversations = computed(() => {
  if (!searchQuery.value) return conversations.value
  
  const query = searchQuery.value.toLowerCase()
  return conversations.value.filter(conv =>
    conv.doctorName.toLowerCase().includes(query) ||
    conv.specialty.toLowerCase().includes(query)
  )
})

const getSelectedDoctor = computed(() => {
  return conversations.value.find(c => c.id === selectedConversation.value)
})
</script>

<style scoped>
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>