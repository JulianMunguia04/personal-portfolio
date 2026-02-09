<template>
  <main
    ref="projectsSection"
    class="projects"
    :class="{ show: showProjects }"
  >
    <h1>Projects</h1>
    <ProjectsOverview />
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ProjectsOverview from '@/components/ProjectsOverview.vue'

const projectsSection = ref(null)
const showProjects = ref(false)

let observer

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      showProjects.value = entry.isIntersecting
    },
    {
      threshold: 0.15,
    }
  )

  projectsSection.value && observer.observe(projectsSection.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.projects {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s ease;

  /* spacing, not height */
  padding-bottom: 4rem;
}

.projects.show {
  opacity: 1;
  transform: translateY(0);
}

.projects, h1{
  margin-bottom: 1vh;
}

h1 {
  margin-bottom: 1.25rem;
}
</style>