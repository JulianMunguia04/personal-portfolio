<template>
  <nav :class="{ show: loaded }">
    <router-link class="router-link" to="/">
      <i class="pi pi-home nav-icons"></i>

      <div class="hint-box">
        Home
      </div>
    </router-link>
    <router-link class="router-link" to="/projects">
      <i class="pi pi-folder nav-icons"></i>

      <div class="hint-box">
        Projects
      </div>
    </router-link>
    <router-link class="router-link" to="/technologies">
      <i class="pi pi-cog nav-icons"></i>

      <div class="hint-box">
        Technologies
      </div>
    </router-link>
    <router-link class="router-link" to="/experience">
      <i class="pi pi-building nav-icons"></i>

      <div class="hint-box">
        Experience
      </div>
    </router-link>
    <router-link class="router-link" to="/contact">
      <i class="pi pi-send nav-icons"></i>

      <div class="hint-box">
        Contact
      </div>
    </router-link>
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
  width: auto;
  padding-left: 5%;
  padding-right: 5%;
  height: 8vh;
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
  margin-top: 1vh;
}

.show {
  transform: translate(-50%, 0);
  opacity: 1;
}

.nav-margin {
  margin-top: 8vh;
}

.router-link {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 1rem;
  position: relative;

  width: 6.5vh; 
  height: 6.5vh;   
  border-radius: 50%;
  transition-duration: 0.15s;
  border: 1px solid rgba(150, 150, 150, 1);;
}

.nav-icons {
  font-size: 2.5vh;
  color: white;
  pointer-events: none;
}
.router-link:hover{
  background-color: #3f3f3fff;
  transform: scale(1.3) translateY(10%);
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
  transition-delay: 0.15s; 
}

.router-link:hover .hint-box {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
  transition-delay: 0s; 
  border: 1px solid rgb(204, 204, 204);
}
</style>
