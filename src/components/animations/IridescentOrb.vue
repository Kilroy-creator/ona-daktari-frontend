<template>
  <div class="orb-container">
    <div class="iridescent-orb"></div>
  </div>
</template>

<style scoped>
.orb-container {
  position: relative;
  width: 300px;
  height: 300px;
}

.iridescent-orb {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    #667eea,
    #764ba2,
    #f093fb,
    #4facfe,
    #00f2fe,
    #667eea
  );
  animation: rotate 10s linear infinite;
  filter: blur(40px);
  opacity: 0.6;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
