<template>
  <transition-group
    name="list"
    tag="div"
    @enter="onEnter"
    @leave="onLeave"
  >
    <slot />
  </transition-group>
</template>

<script setup>
const onEnter = (el, done) => {
  el.style.opacity = '0'
  el.style.transform = 'translateX(-30px)'
  
  setTimeout(() => {
    el.style.transition = 'all 0.4s ease'
    el.style.opacity = '1'
    el.style.transform = 'translateX(0)'
    done()
  }, 50)
}

const onLeave = (el, done) => {
  el.style.transition = 'all 0.3s ease'
  el.style.opacity = '0'
  el.style.transform = 'translateX(30px)'
  setTimeout(done, 300)
}
</script>

<style scoped>
.list-enter-active, .list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.4s ease;
}
</style>