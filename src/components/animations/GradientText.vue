<template>
  <span class="vb-gradient" :style="{ '--g': gradient }"><slot/></span>
</template>
<script setup>
const props = defineProps({ gradient: { type: String, default: 'linear-gradient(90deg,#06b6d4,#6366f1)' }});
</script>
<style scoped>
.vb-gradient{background:var(--g);-webkit-background-clip:text;background-clip:text;color:transparent}
</style>
