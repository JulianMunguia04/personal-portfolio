<script setup>
import { ref, computed, onMounted } from 'vue'

const projects = ref([])

const search_query = ref('')
const selected_technologies = ref([])
const technologies = ref([])
const show_filters = ref(false)

onMounted(async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_EXPRESS_API_URL}/api/projects`)
    console.log(`${import.meta.env.EXPRESS_API_URL}/api/projects`)
    const data = await res.json()

    projects.value = data

    // rebuild technology list dynamically
    const tech_set = new Set()
    projects.value.forEach(p =>
      p.technologies.forEach(t => tech_set.add(t))
    )

    technologies.value = Array.from(tech_set)

  } catch (err) {
    console.error("Failed to load projects:", err)
  }
})

const filtered_projects = computed(() => {
  return projects.value.filter(project => {
    const search = search_query.value.toLowerCase()

    const matches_search =
      project.name.toLowerCase().includes(search) ||
      project.shortDescription.toLowerCase().includes(search) ||
      project.technologies.some(t => t.includes(search))

    const matches_tech =
      selected_technologies.value.length === 0 ||
      selected_technologies.value.every(t =>
        project.technologies.includes(t)
      )

    return matches_search && matches_tech
  })
})

const toggle_technology = (tech) => {
  selected_technologies.value.includes(tech)
    ? selected_technologies.value = selected_technologies.value.filter(t => t !== tech)
    : selected_technologies.value.push(tech)
}

const project_slug = (name) =>
  name.toLowerCase().replace(/\s+/g, '-')
</script>

<template>
  <!-- SEARCH + FILTER BAR -->
  <div class="search-bar">
    <input
      v-model="search_query"
      type="text"
      placeholder="Search projects..."
    />

    <button @click="show_filters = !show_filters">
      Filter
    </button>

    <!-- FILTER DROPDOWN -->
    <div v-if="show_filters" class="filter-dropdown">
      <div
        v-for="tech in technologies"
        :key="tech"
        class="filter-option"
        @click="toggle_technology(tech)"
        :class="{ active: selected_technologies.includes(tech) }"
      >
        {{ tech }}
      </div>
    </div>
  </div>

  <!-- PROJECT GRID -->
  <div class="project-grid">
    <router-link
      v-for="project in filtered_projects"
      :key="project.id"
      :to="`/projects/${project_slug(project.name)}`"
      class="project-card"
    >
      <div class="image-wrapper">
        <img :src="project.photoLink" :alt="project.name" />
        <div class="overlay">
          <span>View Project →</span>
        </div>
      </div>

      <h3>{{ project.name }}</h3>
      <p>{{ project.shortDescription }}</p>
    </router-link>
  </div>
</template>

<style scoped>
/* SEARCH BAR */
.search-bar {
  position: relative;
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
  width: 50%;
}

.search-bar input {
  flex: 1;
  padding: 0.6rem 1rem;
  background: #0f0f0f;
  border: 1px solid #fff;
  color: white;
  border-radius: 8px;
  font-size: 0.9rem;
}

.search-bar input::placeholder {
  color: #aaa;
}

.search-bar button {
  padding: 0.6rem 1rem;
  background: #0f0f0f;
  border: 1px solid #fff;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}

/* FILTER DROPDOWN */
.filter-dropdown {
  position: absolute;
  top: 110%;
  right: 0;
  width: 220px;
  max-height: 240px;
  overflow-y: auto;
  background: #0f0f0f;
  border: 1px solid #fff;
  border-radius: 10px;
  padding: 0.5rem;
  z-index: 10;
}

.filter-option {
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  color: white;
  font-size: 0.85rem;
}

.filter-option:hover {
  background: #1a1a1a;
}

.filter-option.active {
  background: #fff;
  color: #000;
}

/* GRID */
.project-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

/* CARD */
.project-card {
  text-decoration: none;
  color: white;
  border: 1px solid #fff;
  padding: 5%;
  border-radius: 12px;
  background: radial-gradient(circle at top, #1a1a1a, #0f0f0f);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
}

.image-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

.image-wrapper img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

/* OVERLAY */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover img {
  transform: scale(1.05);
}

.project-card:hover .overlay {
  opacity: 1;
}

.overlay span {
  font-weight: 500;
}

.project-card h3 {
  margin: 0.75rem 0 0.25rem;
}

.project-card p {
  font-size: 0.9rem;
  color: #c8c8c8;
}
</style>