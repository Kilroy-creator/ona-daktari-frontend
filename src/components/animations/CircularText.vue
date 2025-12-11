<template>
  <div class="vb-circle" :style="{ '--txt': `'${text}'` }" role="img" aria-label="circular text">
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <defs>
        <path id="circlePath" d="M50,50 m-30,0 a30,30 0 1,1 60,0 a30,30 0 1,1 -60,0"/>
      </defs>
      <text font-size="6">
        <textPath href="#circlePath" startOffset="0">
          {{ text }} •
        </textPath>
      </text>
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({ text: { type: String, default: 'Ona Daktari •' }});
const { text } = props;
</script>

<style scoped>
.vb-circle{width:120px;height:120px}
svg{width:100%;height:100%}
</style>
