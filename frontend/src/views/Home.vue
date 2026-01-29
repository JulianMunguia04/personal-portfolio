<template>
  <main :class="{ show: loaded }">
    Welcome
  </main>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  const loaded = ref(false)
  const showWaitTime = 1400

  onMounted(() => {
    setTimeout(() => {
      loaded.value = true
    }, showWaitTime)
  })
</script>

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
