<template>
  <div class="chat-container" :style="{ height: height }">
    <!-- Chat Header -->
    <div class="chat-header">
      <div class="text-3xl">{{ recipientImage }}</div>
      <div>
        <p class="font-semibold">{{ recipientName }}</p>
        <p class="text-xs text-gray-600">Online</p>
      </div>
    </div>

    <!-- Messages -->
    <div ref="messagesContainer" class="chat-messages">
      <div
        v-for="msg in appStore.chatMessages"
        :key="msg.id"
        :class="[
          'flex',
          msg.sender === authStore.userType ? 'justify-end' : 'justify-start'
        ]"
      >
        <div
          :class="[
            'message-bubble',
            msg.sender === authStore.userType ? 'message-sent' : 'message-received'
          ]"
        >
          {{ msg.content }}
        </div>
      </div>
    </div>

    <!-- Input -->
    <div class="chat-input-container">
      <input
        v-model="chatInput"
        type="text"
        @keypress.enter="handleSendMessage"
        placeholder="Type a message..."
        class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <button
        @click="handleSendMessage"
        class="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        :disabled="!chatInput.trim()"
      >
        <Send :size="20" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue';
import { Send } from 'lucide-vue-next';
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';

const props = defineProps({
  recipientName: {
    type: String,
    required: true
  },
  recipientImage: {
    type: String,
    default: '👤'
  },
  height: {
    type: String,
    default: '24rem'
  }
});

const appStore = useAppStore();
const authStore = useAuthStore();

const chatInput = ref('');
const messagesContainer = ref(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const handleSendMessage = () => {
  if (chatInput.value.trim()) {
    appStore.sendMessage(chatInput.value, authStore.userType);
    chatInput.value = '';
    scrollToBottom();
    
    // Auto-reply simulation
    if (authStore.isPatient) {
      setTimeout(() => {
        appStore.sendMessage('Thanks for your message. I\'ll get back to you shortly.', 'doctor');
        scrollToBottom();
      }, 1000);
    }
  }
};

// Watch for new messages to scroll
watch(() => appStore.chatMessages.length, () => {
  scrollToBottom();
});
</script>