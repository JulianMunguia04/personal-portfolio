<template>
  <main :class="{ show: loaded }">
    <Raindrops/>
    <h1 :class="{ showH1: showH1 }">
      Julian Munguia's <br>Personal Portfolio
    </h1>
  </main>

</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import Raindrops from '@/components/Raindrops.vue'

  const loaded = ref(false)
  const showWaitTime = 1000

  const showH1 = ref(false)
  const showH1WaitTime = 2000

  onMounted(() => {
    setTimeout(() => {
      loaded.value = true
    }, showWaitTime)

    setTimeout(() => {
      showH1.value = true
    }, showH1WaitTime)
  })

</script>

<style scoped>
  main{
    opacity: 0;
    transition: all 0.6s ease;
    width: 100vw;
    display:flex;
    justify-content:center;
    position: relative;
  }
  .show {
    transform: translateY(0);
    opacity: 1;
  }
  .showH1{
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  h1{
    opacity: 0;
    transition: all 0.6s ease;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -70%);
  }
</style>
