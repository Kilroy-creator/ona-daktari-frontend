<template>
  <transition
    :name="animation"
    @enter="onEnter"
    @leave="onLeave"
  >
    <slot />
  </transition>
</template>

<script setup>
defineProps({
  animation: { type: String, default: 'fade' }
})

const onEnter = (el) => {
  el.style.transition = 'all 0.3s ease'
}

const onLeave = (el) => {
  el.style.transition = 'all 0.3s ease'
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from {
  transform: translateY(20px);
  opacity: 0;
}
.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
