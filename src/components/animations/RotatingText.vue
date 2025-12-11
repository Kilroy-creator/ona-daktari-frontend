<template>
  <div class="vb-rotator">
    <span v-for="(t,i) in items" :key="i" :class="{ active: i===idx }">{{ t }}</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({ items: { type: Array, default: () => ['Book','Chat','Diagnose','Track'] }, interval: { type: Number, default: 2000 }})
const idx = ref(0)
onMounted(()=> setInterval(()=> idx.value = (idx.value+1)%props.items.length, props.interval))
const items = props.items
</script>

<style scoped>
.vb-rotator{display:inline-block;height:1.1em;overflow:hidden;position:relative}
.vb-rotator span{position:absolute;left:0;right:0;opacity:0;transform:translateY(100%);transition:.4s}
.vb-rotator span.active{opacity:1;transform:translateY(0)}
</style>
