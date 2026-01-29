<script setup>
  import { useRoute } from 'vue-router'
  import Navbar from '@/components/Navbar.vue'

  const route = useRoute()
</script>

<template>
  <Navbar/>
  <div class="video-bg">
    <video autoplay muted loop playsinline>
      <source src="/background.mp4" type="video/mp4" />
    </video>
  </div>

  <router-view />
</template>

<style>
.video-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  opacity: 40%;
}

.video-bg video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
