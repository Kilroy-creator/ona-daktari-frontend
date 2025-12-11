<template>
  <div class="folder-holder">
    <div class="folder-tab"></div>
    <div class="folder-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.folder-holder {
  position: relative;
  background: #fff;
  border-radius: 0 8px 8px 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow: hidden;
}

.folder-tab {
  position: absolute;
  top: -20px;
  left: 0;
  width: 100px;
  height: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px 8px 0 0;
}

.folder-content {
  padding: 1.5rem;
  padding-top: 2rem;
}
</style>