<template>
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="dot-grid"></div>
  </div>
</template>

<style scoped>
.dot-grid {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.3;
}
</style>