<template>
  <div class="vb-stepper">
    <div v-for="(s,i) in steps" :key="i" :class="['step', { active: i===active }]">
      <div class="dot">{{ i+1 }}</div><div class="label">{{ s }}</div>
    </div>
  </div>
</template>
<script setup>
const props=defineProps({ steps:{type:Array,default:()=>['1','2','3']}, active:{type:Number,default:0} })
</script>
<style scoped>.vb-stepper{display:flex;gap:16px}.step{opacity:.6}.step.active{opacity:1}.dot{width:28px;height:28px;border-radius:50%;background:#eef;display:flex;align-items:center;justify-content:center}</style>
