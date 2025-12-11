<template><div class="vb-beams"><slot/></div></template>
<script setup></script>
<style scoped>.vb-beams{position:relative;overflow:hidden}.vb-beams::before{content:'';position:absolute;left:-20%;top:0;height:100%;width:150%;background:linear-gradient(90deg,rgba(255,255,255,.02),rgba(99,102,241,.06),transparent);transform:skewX(-18deg);animation:slide 6s linear infinite}@keyframes slide{0%{transform:translateX(-100%) skewX(-18deg)}100%{transform:translateX(100%) skewX(-18deg)}}</style>
