<template>
  <div class="relative">
    <div
      v-if="isFocused"
      class="absolute inset-0 -m-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 blur-sm animate-pulse"
    ></div>
    <div class="relative" @focusin="isFocused = true" @focusout="isFocused = false">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isFocused = ref(false)
</script>