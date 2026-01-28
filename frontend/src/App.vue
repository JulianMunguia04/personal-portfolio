<script setup>
  import { useRoute } from 'vue-router'

  const route = useRoute()
</script>

<template>
  <nav v-if="route.path == '/'">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/projects">Projects</router-link> |
    <router-link to="/contact">Contact</router-link>
  </nav>

  <router-view />
  <div>Test Root</div>
</template>

<style scoped>

</style>
