<template>
  <div class="border-t border-gray-200 bg-white p-4">
    <form @submit.prevent="sendMessage" class="flex items-center gap-3">
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
        v-model="message" 
        type="text" 
        placeholder="Type a message..." 
        class="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
        @keypress.enter="sendMessage"
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
        :disabled="!message.trim()"
        title="Send message"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')

const emit = defineEmits(['send-message'])

const sendMessage = () => {
  if (message.value.trim()) {
    emit('send-message', message.value)
    message.value = ''
  }
}

defineExpose({
  sendMessage
})
</script>

<style scoped>
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button {
  transition: all 0.3s ease;
}

button:not(:disabled):active {
  transform: scale(0.95);
}
</style>