<template>
  <!-- HERO SECTION -->
  <div
    ref="homeSection"
    class="home"
    :class="{ show: showHome }"
  >
    <Raindrops />

    <div class="hero_text" :class="{ showHero: showHero }">
      <h1>
        Julian Munguia <br />
        Personal Portfolio
      </h1>
      <div class="subtitle">
        Aspiring Software Engineer building production-level apps
      </div>
    </div>
  </div>

  <hr />

  <!-- PROJECTS SECTION -->
  <div
    ref="projectsSection"
    class="projects"
    :class="{ show: showProjects }"
  >
    <h1>Projects</h1>
    <ProjectsOverview />
  </div>

  <div class="test"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Raindrops from '@/components/Raindrops.vue'
import ProjectsOverview from '@/components/ProjectsOverview.vue'

const homeSection = ref(null)
const projectsSection = ref(null)

const showHome = ref(false)
const showHero = ref(false)
const showProjects = ref(false)

let observer

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.target === homeSection.value) {
          showHome.value = entry.isIntersecting

          if (entry.isIntersecting) {
            setTimeout(() => {
              showHero.value = true
            }, 300)
          } else {
            showHero.value = false
          }
        }

        if (entry.target === projectsSection.value) {
          showProjects.value = entry.isIntersecting
        }
      })
    },
    { threshold: 0.3 }
  )

  homeSection.value && observer.observe(homeSection.value)
  projectsSection.value && observer.observe(projectsSection.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<style scoped>
/* ---------------- HERO ---------------- */

.home {
  opacity: 0;
  transition: all 0.6s ease;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
}

.home.show {
  opacity: 1;
}

/* TEXT OVERLAY */
.hero_text {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -70%);
  opacity: 0;
  transition: all 0.6s ease;
  z-index: 2;
}

.hero_text.showHero {
  opacity: 1;
  transform: translate(-50%, -50%);
}

.hero-text, h1 {
  margin: 0;
  font-size: clamp(3rem, 6vw, 5rem);
  line-height: 1.08;
  font-weight: 700;
}

.subtitle {
  margin-top: 1.1rem;
  font-size: clamp(1.15rem, 2vw, 1.6rem);
  opacity: 0.85;
}

/* ---------------- DIVIDER ---------------- */

hr {
  width: 70%;
  border: none;
  border-top: 2px solid rgba(255, 255, 255, 0.2);
  margin: 3rem auto;
}

/* ---------------- PROJECTS ---------------- */

.projects {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s ease;
}

.projects.show {
  opacity: 1;
  transform: translateY(0);
}

.projects, h1{
  margin-bottom: 1vh;
  
}

/* ---------------- SPACER ---------------- */

.test {
  height: 200vh;
}
</style>