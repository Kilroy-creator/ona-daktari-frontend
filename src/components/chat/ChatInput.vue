<template>
  <div class="border-t p-4 bg-white">
    <form @submit.prevent="sendMessage" class="flex gap-2">
      <input 
        v-model="message" 
        type="text" 
        placeholder="Type a message..." 
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        @keypress.enter="sendMessage"
      />
      <button 
        type="submit" 
        class="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        :disabled="!message.trim()"
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
</style>