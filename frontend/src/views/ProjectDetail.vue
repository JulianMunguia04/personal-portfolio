<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const projectName = route.params.projectName // slug from URL
const project = ref(null)

onMounted(async () => {
  const res = await fetch(`${import.meta.env.VITE_EXPRESS_API_URL}/api/projects`)
  const data = await res.json()

  // Match the project by slug
  project.value = data.find(p =>
    p.name.toLowerCase().replace(/\s+/g, '-') === projectName
  )
})
</script>

<template>
  <div v-if="project">
    <h1>{{ project.name }}</h1>
    <p>{{ project.shortDescription }}</p>
    <ul>
      <li v-for="tech in project.technologies" :key="tech">{{ tech }}</li>
    </ul>
  </div>
  <div v-else>
    Loading project...
  </div>
</template>