<script setup>
  import { ref, onMounted } from 'vue'
  import HomeCard from '@/components/HomeCard.vue'
  import Raindrop from '@/components/Raindrop.vue'

  const loaded = ref(false)
  const showWaitTime = 1400

  onMounted(() => {
    setTimeout(() => {
      loaded.value = true
    }, showWaitTime)
  })
</script>

<template>
  <main :class="{ show: loaded }">
    <HomeCard/>
    
  </main>
</template>

<style scoped>
  main{
    opacity: 0;
    transition: all 0.6s ease;
  }
  .show {
    transform: translateY(0);
    opacity: 1;
  }
</style>
