<template>
  <div class="vb-cardloop">
    <div v-for="(i,idx) in icons" :key="idx" class="vb-logo" :style="{ '--i': idx }">{{ i }}</div>
  </div>
</template>
<script setup>
const props = defineProps({ icons: { type: Array, default: () => ['🏥','💊','🩺'] } })
</script>
<style scoped>
.vb-cardloop{display:flex;gap:6px;align-items:center}
.vb-logo{animation:loop 4s linear infinite}@keyframes loop{0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)}}
</style>
