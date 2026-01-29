<script setup>
  import { useRoute } from 'vue-router'
  const route = useRoute()
</script>

<template>
  <nav>
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
    left:0;
    width:100%;
    height: 10vh;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); 
    background-color: rgb(21, 21, 21);
  }
  .nav-margin{
    margin:none;
    margin-top: 10vh;
  }
</style>
