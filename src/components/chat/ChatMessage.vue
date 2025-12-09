<template>
  <div :class="['flex gap-2 mb-3', { 'justify-end': isSender }]">
    <div v-if="!isSender" class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
      {{ senderInitial }}
    </div>
    
    <div class="max-w-xs">
      <div 
        :class="[
          'px-4 py-2 rounded-lg',
          isSender 
            ? 'bg-blue-600 text-white rounded-br-none' 
            : 'bg-gray-200 text-gray-900 rounded-bl-none'
        ]"
      >
        {{ content }}
      </div>
      <p :class="['text-xs mt-1', isSender ? 'text-right' : 'text-left', 'text-gray-500']">
        {{ formatTime(timestamp) }}
      </p>
    </div>

    <div v-if="isSender" class="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm">
      Me
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
  const d = new Date(date)
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
</style>