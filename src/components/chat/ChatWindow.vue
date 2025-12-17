<template>
  <div class="chat-container flex flex-col" :style="{ height: height }">
    <!-- Chat Header -->
    <div class="chat-header bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl shadow-lg">
      <div class="flex items-center gap-4">
        <div class="relative">
          <div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center text-2xl font-bold">
            {{ recipientImage }}
          </div>
          <div class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-white"></div>
        </div>
        <div>
          <p class="font-bold text-lg">{{ recipientName }}</p>
          <p class="text-xs text-blue-100 flex items-center gap-1">
            <span class="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
            Online
          </p>
        </div>
      </div>
      
      <div class="flex gap-2">
        <button class="hover:bg-white/20 p-2 rounded-lg transition" title="Start call">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 00-.948.684l-.5 1.5a1 1 0 00.502 1.21 2.04 2.04 0 101.515 3.71A2.04 2.04 0 003 5z"/></svg>
        </button>
        <button class="hover:bg-white/20 p-2 rounded-lg transition" title="Settings">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.948c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.948zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/></svg>
        </button>
      </div>
    </div>

    <!-- Messages Container -->
    <div ref="messagesContainer" class="chat-messages flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-gray-50">
      <!-- Empty State -->
      <div v-if="!chatMessages || chatMessages.length === 0" class="h-full flex items-center justify-center">
        <div class="text-center">
          <div class="text-5xl mb-3">💬</div>
          <p class="text-gray-600 font-medium">Start your conversation</p>
          <p class="text-gray-500 text-sm mt-1">Say hello to get started</p>
        </div>
      </div>

      <!-- Messages List -->
      <div
        v-for="msg in chatMessages"
        :key="msg.id"
        :class="[
          'flex gap-3 mb-4 items-end',
          msg.sender === currentUserType ? 'justify-end' : 'justify-start'
        ]"
      >
        <!-- Received Message -->
        <div v-if="msg.sender !== currentUserType" class="flex gap-3 items-end">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {{ recipientImage }}
          </div>
          <div>
            <div class="message-received">
              {{ msg.content }}
            </div>
            <p class="text-xs text-gray-500 mt-1 ml-2">{{ formatTime(msg.timestamp) }}</p>
          </div>
        </div>

        <!-- Sent Message -->
        <div v-else class="flex gap-3 justify-end items-end">
          <div>
            <div class="message-sent">
              {{ msg.content }}
            </div>
            <p class="text-xs text-gray-500 mt-1 mr-2 text-right">{{ formatTime(msg.timestamp) }}</p>
          </div>
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            You
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Input -->
    <div class="chat-input-container border-t border-gray-200 bg-white px-6 py-4 rounded-b-2xl shadow-lg">
      <form @submit.prevent="handleSendMessage" class="flex items-center gap-3">
        <!-- Attachment Button -->
        <button 
          type="button"
          class="text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition"
          title="Attach file"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8m0 8l-6-6m6 6l6-6" />
          </svg>
        </button>

        <!-- Input Field -->
        <input
          v-model="chatInput"
          type="text"
          @keypress.enter="handleSendMessage"
          placeholder="Type a message..."
          class="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
        />

        <!-- Emoji Button -->
        <button 
          type="button"
          class="text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition"
          title="Add emoji"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2zm-6 4a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 01-1 1H8a1 1 0 01-1-1v-1zm4-1a1 1 0 100 2h2a1 1 0 100-2h-2z" clip-rule="evenodd" />
          </svg>
        </button>

        <!-- Send Button -->
        <button
          type="submit"
          class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2.5 rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
          :disabled="!chatInput.trim()"
          title="Send message"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  recipientName: { type: String, required: true },
  recipientImage: { type: String, default: '👨‍⚕️' },
  height: { type: String, default: '32rem' }
})

const appStore = useAppStore()
const authStore = useAuthStore()

const chatInput = ref('')
const messagesContainer = ref(null)

const currentUserType = computed(() => authStore.user?.type || 'patient')

// Initialize chatMessages safely
const chatMessages = computed(() => appStore.chatMessages || [])

const formatTime = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const handleSendMessage = () => {
  if (chatInput.value.trim()) {
    if (appStore.sendMessage) {
      appStore.sendMessage(chatInput.value, currentUserType.value)
    } else {
      console.warn('sendMessage not available on appStore')
    }
    chatInput.value = ''
    scrollToBottom()

    if (currentUserType.value === 'patient') {
      setTimeout(() => {
        if (appStore.sendMessage) {
          appStore.sendMessage(
            "Thanks for your message. I'll get back to you shortly.",
            'doctor'
          )
        }
        scrollToBottom()
      }, 1000)
    }
  }
}

watch(() => chatMessages.value?.length || 0, scrollToBottom)
</script>

<style scoped>
.chat-container {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  background: linear-gradient(to right, rgb(37, 99, 235), rgb(147, 51, 234));
  color: white;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, white, rgb(249, 250, 251));
}

.chat-input-container {
  border-top: 1px solid rgb(229, 231, 235);
  background-color: white;
  padding: 1rem 1.5rem;
  border-radius: 0 0 1rem 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.message-sent {
  max-width: 20rem;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  border-bottom-right-radius: 0;
  background: linear-gradient(to right, rgb(37, 99, 235), rgb(29, 78, 216));
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.message-received {
  max-width: 20rem;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  border-bottom-left-radius: 0;
  background-color: rgb(229, 231, 235);
  color: rgb(17, 24, 39);
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>