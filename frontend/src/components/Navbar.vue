<template>
  <nav :class="{ show: loaded }">
    <router-link class="router-link" to="/">
      <i class="pi pi-home nav-icons"></i>

      <!-- Tooltip / hint -->
      <div class="hint-box">
        Home
      </div>
    </router-link>
    <router-link class="router-link" to="/about">About</router-link>
    <router-link class="router-link" to="/projects">Projects</router-link>
    <router-link class="router-link" to="/contact">Contact</router-link>
  </nav>

  <main class="nav-margin">
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
import { ref, onMounted } from 'vue'
import 'primeicons/primeicons.css'

const loaded = ref(false)
const showWaitTime = 100

onMounted(() => {
  setTimeout(() => {
    loaded.value = true
  }, showWaitTime)
})
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, -100%);
  width: 50%;
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  background: radial-gradient(circle, rgb(21, 21, 21), rgb(24, 24, 24));
  border: 1px solid rgb(204, 204, 204);
  border-radius: 3vh;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: all 0.6s ease;
}

.show {
  transform: translate(-50%, 0);
  opacity: 1;
}

.nav-margin {
  margin-top: 5vh;
}

.router-link {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 1rem;
  position: relative;

  width: 4vh; 
  height: 4vh;   
  border-radius: 50%;
  transition-duration: 0.15s;
}

.nav-icons {
  font-size: 2.5vh;
  color: white;
  pointer-events: none;
}
.router-link:hover{
  background-color: #3f3f3fff;
  transform: scale(1.1);
}

.hint-box {
  position: absolute;  /* <-- relative to parent */
  top: 100%;           /* below the parent */
  left: 50%;
  transform: translateX(-50%);
  background-color: #3f3f3fff;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.3rem;
  font-size: 0.8rem;
  white-space: nowrap;
  pointer-events: none;
  margin-top: 0.25rem;
}

.hint-box {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #3f3f3fff;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.3rem;
  font-size: 0.8rem;
  white-space: nowrap;
  pointer-events: none;

  opacity: 0;
  visibility: hidden; 
  transition: opacity 0.3s ease, transform 0.3s ease;
  transform: translateX(-50%) translateY(5px);
}

.router-link:hover .hint-box {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}
</style>
