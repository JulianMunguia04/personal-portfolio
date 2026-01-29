<script setup>
  import { useRoute } from 'vue-router'
  const route = useRoute()
  import { ref, onMounted } from 'vue'

  const loaded = ref(false)
  const showWaitTime = 100

  onMounted(() => {
    setTimeout(() => {
      loaded.value = true
    }, showWaitTime)
  })
</script>

<template>
  <nav :class="{ show: loaded }">
    <router-link class= "router-link" to="/">Home</router-link> |
    <router-link class= "router-link" to="/about">About</router-link> |
    <router-link class= "router-link" to="/projects">Projects</router-link> |
    <router-link class= "router-link" to="/contact">Contact</router-link>
  </nav>

  <main class="nav-margin">
  </main>
</template>

<style scoped>
  nav{
    position:fixed;
    top:0;
    margin: 5px;
    left: 50%;
    transform: translateX(-50%);
    width:50%;
    height: 5vh;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); 
    background-color: rgb(21, 21, 21);
    background: radial-gradient(circle, rgb(21, 21, 21), rgb(24, 24, 24));
    border: 1px solid rgb(204, 204, 204);
    border-radius: 3vh;
    display:flex;
    justify-content: center;
    

    transform: translate(-50%, -100%);
    opacity: 0;
    transition: all 0.6s ease;
  }
  .show {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  .nav-margin{
    margin:none;
    margin-top: 5vh;
  }
</style>
