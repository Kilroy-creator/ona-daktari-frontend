<template>
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="aurora-container">
      <div class="aurora aurora-1"></div>
      <div class="aurora aurora-2"></div>
      <div class="aurora aurora-3"></div>
    </div>
  </div>
</template>

<style scoped>
.aurora-container {
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(60px);
  opacity: 0.4;
}

.aurora {
  position: absolute;
  border-radius: 50%;
  mix-blend-mode: screen;
  animation: float 20s ease-in-out infinite;
}

.aurora-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  top: -10%;
  left: -10%;
  animation-delay: 0s;
}

.aurora-2 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  top: 40%;
  right: -10%;
  animation-delay: 7s;
}

.aurora-3 {
  width: 450px;
  height: 450px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  bottom: -10%;
  left: 30%;
  animation-delay: 14s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(50px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-50px, 50px) scale(0.9);
  }
}
</style>