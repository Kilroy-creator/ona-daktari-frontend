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
          msg.sender === currentUserType ? 'justify-end' : 'justify-start'
        ]"
      >
        <div
          :class="[
            'message-bubble',
            msg.sender === currentUserType ? 'message-sent' : 'message-received'
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
import { ref, nextTick, watch, computed } from 'vue';
import { Send } from 'lucide-vue-next';
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';

const props = defineProps({
  recipientName: { type: String, required: true },
  recipientImage: { type: String, default: '👤' },
  height: { type: String, default: '24rem' }
});

const appStore = useAppStore();
const authStore = useAuthStore();

const chatInput = ref('');
const messagesContainer = ref(null);

// Fix: userType from authStore
const currentUserType = computed(() => authStore.user?.type || 'patient');

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const handleSendMessage = () => {
  if (chatInput.value.trim()) {
    // Send message
    appStore.sendMessage(chatInput.value, currentUserType.value);
    chatInput.value = '';
    scrollToBottom();

    // Auto-reply only if user is a patient
    if (currentUserType.value === 'patient') {
      setTimeout(() => {
        appStore.sendMessage(
          "Thanks for your message. I'll get back to you shortly.",
          'doctor'
        );
        scrollToBottom();
      }, 1000);
    }
  }
};

// Auto-scroll when new messages come in
watch(() => appStore.chatMessages.length, scrollToBottom);
</script>

<style scoped>
.chat-container {
  @apply bg-white rounded-xl shadow-lg p-4 flex flex-col;
}

.chat-header {
  @apply flex items-center gap-3 pb-3 border-b;
}

.chat-messages {
  @apply flex-1 overflow-y-auto py-4 space-y-3;
}

.message-bubble {
  @apply max-w-xs px-4 py-2 rounded-lg text-sm;
}

.message-sent {
  @apply bg-blue-600 text-white;
}

.message-received {
  @apply bg-gray-200 text-gray-800;
}

.chat-input-container {
  @apply flex items-center gap-3 pt-3 border-t;
}
</style>
