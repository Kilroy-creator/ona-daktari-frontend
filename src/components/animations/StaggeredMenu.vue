<template><div><button v-for="(i,idx) in items" :key="idx" :style="{ transitionDelay: (idx*60)+'ms'}">{{ i }}</button></div></template>
<script setup>const props=defineProps({items:{type:Array,default:()=>[]}})</script>
<style scoped>button{opacity:0;transform:translateX(-8px);animation:in .35s forwards}@keyframes in{to{opacity:1;transform:none}}</style>
