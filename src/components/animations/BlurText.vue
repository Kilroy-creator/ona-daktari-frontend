<template>
  <span class="vb-blur-wrapper">
    <slot />
    <span aria-hidden class="vb-blur"></span>
  </span>
</template>

<script setup>
</script>

<style scoped>
.vb-blur-wrapper{position:relative;display:inline-block}
.vb-blur{position:absolute;inset:0;filter:blur(6px);opacity:.25;pointer-events:none;transition:opacity .3s}
.vb-blur-wrapper:hover .vb-blur{opacity:.6}
</style>
