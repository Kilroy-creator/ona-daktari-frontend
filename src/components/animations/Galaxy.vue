<template>
  <div class="galaxy-background">
    <div class="stars"></div>
    <div class="stars2"></div>
    <div class="stars3"></div>
  </div>
</template>

<style scoped>
.galaxy-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  overflow: hidden;
}

.stars, .stars2, .stars3 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: repeat;
}

.stars {
  background-image: radial-gradient(2px 2px at 20px 30px, #eee, transparent),
                    radial-gradient(2px 2px at 60px 70px, #fff, transparent),
                    radial-gradient(1px 1px at 50px 50px, #ddd, transparent);
  background-size: 200px 200px;
  animation: zoom 20s infinite;
}

.stars2 {
  background-image: radial-gradient(1px 1px at 100px 150px, #fff, transparent),
                    radial-gradient(1px 1px at 200px 50px, #ddd, transparent);
  background-size: 250px 250px;
  animation: zoom 40s infinite;
}

.stars3 {
  background-image: radial-gradient(1px 1px at 50px 100px, #fff, transparent),
                    radial-gradient(1px 1px at 150px 200px, #ddd, transparent);
  background-size: 300px 300px;
  animation: zoom 60s infinite;
}

@keyframes zoom {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}
</style>