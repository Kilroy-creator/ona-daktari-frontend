<template>
  <transition name="veil">
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center"
      @click="$emit('update:modelValue', false)"
    >
      <div @click.stop>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  modelValue: Boolean
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.veil-enter-active, .veil-leave-active {
  transition: all 0.3s ease;
}
.veil-enter-from, .veil-leave-to {
  opacity: 0;
  backdrop-filter: blur(0);
}
</style>