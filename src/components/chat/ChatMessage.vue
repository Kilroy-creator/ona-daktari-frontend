<template>
  <div :class="['flex gap-3 mb-4 items-end', { 'justify-end': isSender }]">
    <!-- Received Message (with sender avatar) -->
    <div v-if="!isSender" class="flex gap-3 items-end">
      <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
        {{ senderInitial }}
      </div>
      
      <div>
        <div class="message-received">
          {{ content }}
        </div>
        <p class="text-xs text-gray-500 mt-1 ml-2">{{ formatTime(timestamp) }}</p>
      </div>
    </div>

    <!-- Sent Message (with user avatar on right) -->
    <div v-else class="flex gap-3 items-end justify-end">
      <div>
        <div class="message-sent">
          {{ content }}
        </div>
        <p class="text-xs text-gray-500 mt-1 mr-2 text-right">{{ formatTime(timestamp) }}</p>
      </div>
      
      <div class="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
        You
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  senderName: {
    type: String,
    default: 'Doctor'
  },
  timestamp: {
    type: [String, Date],
    default: () => new Date()
  },
  isCurrentUser: {
    type: Boolean,
    default: false
  }
})

const isSender = computed(() => props.isCurrentUser)

const senderInitial = computed(() => {
  return props.senderName.charAt(0).toUpperCase()
})

const formatTime = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  })
}
</script>

<style scoped>
.message-sent {
  @apply max-w-xs px-4 py-3 rounded-2xl rounded-br-none bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium shadow-md;
}

.message-received {
  @apply max-w-xs px-4 py-3 rounded-2xl rounded-bl-none bg-gray-200 text-gray-900 text-sm font-medium shadow-md;
}
</style>