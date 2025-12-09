<template>
<div>
<HeaderNav />
<router-view />
<Footer />
</div>
</template>


<script setup>
import HeaderNav from '@/components/common/HeaderNav.vue'
import Footer from '@/components/common/Footer.vue'
</script>