<template>
  <div class="vb-profile">
    <div class="avatar">{{ avatar }}</div>
    <div><h3>{{ name }}</h3><p class="muted">{{ subtitle }}</p></div>
  </div>
</template>
<script setup>
const props = defineProps({ name:{type:String,default:'Dr Name'}, subtitle:{type:String,default:'Cardiology'}, avatar:{type:String,default:'👩‍⚕️'} })
</script>
<style scoped>.vb-profile{display:flex;gap:12px;align-items:center;padding:12px;border-radius:10px;background:linear-gradient(180deg,#fff,#fbfdff)}</style>
