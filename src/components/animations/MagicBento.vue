<template>
  <div class="bento-grid">
    <slot />
  </div>
</template>

<style scoped>
.bento-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

.bento-grid > * {
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.3s ease;
}

.bento-grid > *:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  border-color: rgba(255,255,255,0.4);
}
</style>