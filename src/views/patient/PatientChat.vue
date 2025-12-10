<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Chat with Doctors</h2>

    <div class="grid md:grid-cols-3 gap-6">
      <!-- Conversations List -->
      <div class="md:col-span-1">
        <div class="bg-white rounded-lg shadow">
          <div class="p-4 border-b border-gray-200">
            <h3 class="font-semibold text-gray-900">Conversations</h3>
          </div>

          <div class="divide-y">
            <button 
              v-for="conversation in conversations"
              :key="conversation.id"
              @click="selectedConversation = conversation.id"
              :class="[
                'w-full p-4 text-left hover:bg-gray-50 transition',
                selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
              ]"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {{ conversation.doctorName.charAt(0) }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-gray-900 truncate">{{ conversation.doctorName }}</p>
                  <p class="text-sm text-gray-600 truncate">{{ conversation.lastMessage }}</p>
                </div>
                <span v-if="conversation.unread" class="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                  {{ conversation.unread }}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Chat Window -->
      <div class="md:col-span-2">
        <chat-window 
          v-if="selectedConversation"
          :doctor-name="getSelectedDoctor.doctorName"
          :is-online="true"
        />
        <div v-else class="bg-white rounded-lg shadow h-96 flex items-center justify-center">
          <p class="text-gray-600">Select a conversation to start chatting</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ChatWindow from '@/components/chat/ChatWindow.vue'

const selectedConversation = ref(null)

const conversations = ref([
  {
    id: 1,
    doctorName: 'Dr. Sarah Kipchoge',
    specialty: 'Cardiology',
    lastMessage: 'That sounds like it could be tension headaches...',
    unread: 0,
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    doctorName: 'Dr. James Mwangi',
    specialty: 'Orthopedics',
    lastMessage: 'Let me prescribe something that might help.',
    unread: 1,
    timestamp: '1 day ago'
  },
  {
    id: 3,
    doctorName: 'Dr. Emily Achieng',
    specialty: 'Pediatrics',
    lastMessage: 'Please come in for a follow-up visit.',
    unread: 0,
    timestamp: '3 days ago'
  }
])

const getSelectedDoctor = computed(() => {
  return conversations.value.find(c => c.id === selectedConversation.value) || {}
})
</script>