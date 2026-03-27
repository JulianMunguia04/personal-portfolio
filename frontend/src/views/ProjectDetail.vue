<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from "markdown-it"
import DOMPurify from "dompurify"

const route = useRoute()
const projectName = route.params.projectName

const project = ref(null)
const renderedHtml = ref("")
const loadingProject = ref(true)
const loadingReadme = ref(false)
const readmeError = ref(null)

const md = new MarkdownIt()

// Helper: Rewrite relative image paths in markdown to GitHub raw URLs
function prefixRelativeImages(markdown, owner, repo, branch = 'main') {
  const baseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/`

  // 1️⃣ Markdown images: ![alt](./path)
  markdown = markdown.replace(/!\[([^\]]*)]\(\.\/([^\)]+)\)/g, (_, alt, path) => {
    return `![${alt}](${baseUrl}${path})`
  })

  // 2️⃣ HTML images: <img src="./path" ...>
  markdown = markdown.replace(/<img src="\.\//g, `<img src="${baseUrl}`)

  return markdown
}

onMounted(async () => {
  // --- Fetch project ---
  try {
    const res = await fetch(`${import.meta.env.VITE_EXPRESS_API_URL}/api/projects`)
    const data = await res.json()

    project.value = data.find(p =>
      p.name.toLowerCase().replace(/\s+/g, '-') === projectName
    )
  } catch (err) {
    console.error("Failed to fetch projects:", err)
  } finally {
    loadingProject.value = false
  }

  // --- Fetch README if project exists ---
  if (project.value?.githubOwner && project.value?.githubRepo) {
    loadingReadme.value = true
    try {
      const readmeRes = await fetch(
        `${import.meta.env.VITE_EXPRESS_API_URL}/api/readme/${project.value.githubOwner}/${project.value.githubRepo}`
      )
      const readmeData = await readmeRes.json()

      // Rewrite all relative image paths to GitHub raw URLs
      const markdownWithImages = prefixRelativeImages(
        readmeData.markdown,
        project.value.githubOwner,
        project.value.githubRepo
      )

      renderedHtml.value = DOMPurify.sanitize(md.render(markdownWithImages))
    } catch (err) {
      console.error("Failed to fetch README:", err)
      readmeError.value = "Could not load README."
    } finally {
      loadingReadme.value = false
    }
  }
})
</script>

<template>
  <div>
    <!-- Loading project -->
    <div v-if="loadingProject">Loading project...</div>

    <!-- Project details -->
    <div v-else-if="project">
      <h1>{{ project.name }}</h1>
      <p>{{ project.shortDescription }}</p>

      <ul>
        <li v-for="tech in project.technologies" :key="tech">{{ tech }}</li>
      </ul>

      <!-- README section -->
      <div v-if="loadingReadme">Loading README...</div>
      <div v-else-if="readmeError">{{ readmeError }}</div>
      <div v-else-if="renderedHtml" class="readme-container" v-html="renderedHtml"></div>
    </div>

    <!-- Project not found -->
    <div v-else>
      Project not found.
    </div>
  </div>
</template>

<style scoped>
.readme-container {
  max-width: 800px;
  margin-top: 3rem;
  line-height: 1.6;
}

.readme-container h1,
.readme-container h2 {
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.3em;
}

.readme-container pre {
  background: #1e1e1e;
  color: white;
  padding: 1rem;
  overflow-x: auto;
}

.readme-container img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1rem 0;
}
</style>