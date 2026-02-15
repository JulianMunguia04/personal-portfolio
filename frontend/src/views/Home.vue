<template>
  <!-- HERO SECTION -->
  <div
    ref="homeSection"
    class="home"
    :class="{ show: showHome }"
  >
    <Raindrops />

    <div class="hero_text" :class="{ showHero }">
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

  <hr />

  <!-- TECHNOLOGIES SECTION -->
  <div
    ref="techSection"
    class="tech"
    :class="{ show: showTech }"
  >
    <div class="tech-header">
      <h1>Technologies & Tools</h1>
      <p class="tech-subtitle">
        The tools I use to design, build, and deploy modern, scalable software —
        from frontend UI to backend systems and cloud infrastructure.
      </p>
    </div>

    <div class="tech-groups">
      <section
        v-for="group in techStack"
        :key="group.id"
        class="tech-group"
      >
        <h2 class="group-title">
          <span class="group-icon">{{ group.icon }}</span>
          {{ group.title }}
        </h2>

        <p class="group-description">
          {{ group.description }}
        </p>

        <div class="tech-items">
          <div
            v-for="tech in group.items"
            :key="tech.name"
            class="tech-card"
          >
            <div class="tech-header-row">
              <!-- optional logo -->
              <div
                v-if="tech.logo"
                class="tech-logo"
              >
                <img
                  :src="tech.logo"
                  :alt="`${tech.name} logo`"
                />
              </div>

              <h3 class="tech-name">{{ tech.name }}</h3>
            </div>

            <p class="tech-desc">{{ tech.description }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>

  <hr />

  <div
    ref="experiencePreview"
    class="experience-preview"
    :class="{ show: showExperiencePreview }"
  >
    <ExperiencePreview/>
  </div>

   <hr />

  <div class="credentials-preview">
    <Credentials />
  </div>

  <hr />

  <div>
    <Contact/>
  </div>

</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Raindrops from '@/components/Raindrops.vue'
import ProjectsOverview from '@/components/ProjectsOverview.vue'
import ExperiencePreview from '../components/ExperiencePreview.vue'
import Credentials from "@/components/CredentialsPreview.vue";
import Contact from "@/components/ContactPreview.vue";

const homeSection = ref(null)
const projectsSection = ref(null)
const techSection = ref(null)
const experiencePreview = ref(null)
const showExperiencePreview = ref(false)

const showHome = ref(false)
const showHero = ref(false)
const showProjects = ref(false)
const showTech = ref(false)

let observer

onMounted(() => {
  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.target === homeSection.value) {
          showHome.value = entry.isIntersecting
          showHero.value = entry.isIntersecting
        }

        if (entry.target === projectsSection.value) {
          showProjects.value = entry.isIntersecting
        }

        if (entry.target === techSection.value) {
          showTech.value = entry.isIntersecting
        }
        if (entry.target === experiencePreview.value) {
          showExperiencePreview.value = entry.isIntersecting
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -20% 0px'
    }
  )

  homeSection.value && observer.observe(homeSection.value)
  projectsSection.value && observer.observe(projectsSection.value)
  techSection.value && observer.observe(techSection.value)
  experiencePreview.value && observer.observe(experiencePreview.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

/* ---- scalable tech stack ---- */
const techStack = [
  {
    id: 'frontend',
    icon: '💻',
    title: 'Frontend',
    description: 'Building responsive, accessible, and interactive user interfaces.',
    items: [
      {
        name: 'React',
        description: 'Component-based UI development with hooks and state management.',
        logo: '/tech-logos/react.png'
      },
      {
        name: 'Vue 3',
        description: 'Composition API, Single File Components, and transitions.',
        logo: '/tech-logos/vue.png'
      },
      { name: 'TypeScript', 
        description: 'Type-safe JavaScript for scalable applications.',
        logo: '/tech-logos/typescript.png'
      },
    ]
  },
  {
    id: 'backend',
    icon: '🧠',
    title: 'Backend & APIs',
    description: 'Designing reliable APIs and real-time backend systems.',
    items: [
      { name: 'Node.js', description: 'REST APIs and real-time servers.' },
      { name: 'Socket.IO', description: 'Live multiplayer and real-time communication.' }
    ]
  },
  {
    id: 'databases',
    icon: '🗄️',
    title: 'Databases',
    description: 'Designing schemas, managing data, and optimizing queries for scale.',
    items: [
      { name: 'MongoDB', description: 'NoSQL document database for scalable, real-time applications.' },
      { name: 'SQLite', description: 'Lightweight relational database for rapid prototyping and local apps.' },
      { name: 'PostgreSQL', description: 'Relational database with strong consistency and advanced querying.' }
    ]
  },
  {
    id: 'cloud',
    icon: '☁️',
    title: 'Cloud & Deployment',
    description: 'Deploying, hosting, and maintaining production-ready applications.',
    items: [
      { name: 'AWS', description: 'Hosting backend services, databases, and static assets.' },
      { name: 'Vercel', description: 'Frontend deployments with CI/CD and edge performance.' },
      { name: 'Netlify', description: 'Static site hosting with serverless functions.' }
    ]
  },
  {
    id: 'devops',
    icon: '⚙️',
    title: 'DevOps & Tooling',
    description: 'Tools and workflows that keep projects maintainable and scalable.',
    items: [
      { name: 'Git & GitHub', description: 'Version control, collaboration, and pull request workflows.' },
      { name: 'Docker', description: 'Containerizing applications for consistent environments.' },
      { name: 'CI/CD', description: 'Automated testing and deployment pipelines.' }
    ]
  },
  {
    id: 'ml',
    icon: '🤖',
    title: 'Machine Learning & AI',
    description: 'Building and training intelligent systems using data-driven models.',
    items: [
      { name: 'Python', description: 'Primary language for data processing and ML workflows.' },
      { name: 'TensorFlow / Keras', description: 'Training deep learning models for audio and data analysis.' },
      { name: 'NumPy & Pandas', description: 'Numerical computing and data manipulation.' }
    ]
  },
  {
    id: 'testing',
    icon: '🧪',
    title: 'Testing & Quality',
    description: 'Ensuring correctness, reliability, and maintainability.',
    items: [
      { name: 'Jest', description: 'Unit and integration testing for JavaScript applications.' },
      { name: 'Playwright', description: 'End-to-end testing for real user workflows.' }
    ]
  }
]
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

.hero_text {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -70%);
  opacity: 0;
  transition: all 0.6s ease;
}

.hero_text.showHero {
  opacity: 1;
  transform: translate(-50%, -50%);
}

h1 {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 700;
}

.subtitle {
  margin-top: 1rem;
  opacity: 0.85;
}

/* ---------------- DIVIDER ---------------- */

hr {
  width: 70%;
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

/* ---------------- TECHNOLOGIES ---------------- */

.tech {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s ease;
  width: 90%;
  margin: 0 auto;
}

.tech.show {
  opacity: 1;
  transform: translateY(0);
}

.tech-header {
  max-width: 800px;
  margin-bottom: 3rem;
  text-align: left;
}

.tech-subtitle {
  font-size: 1.15rem;
  opacity: 0.8;
}

.tech-groups {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.group-title {
  font-size: 1.9rem;
}

.group-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.6rem;
  padding: 0.3rem 0.55rem;
  border-radius: 8px;
  opacity: 1;
}

.tech-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.tech-card {
  border: 1px solid #fff;
  border-radius: 12px;
  padding: 5%;
  background: radial-gradient(circle at top, #151515, #0f0f0f);
  transition: transform 0.25s ease, background 0.25s ease;
}

.tech-card:hover {
  transform: translateY(-4px);
  background: radial-gradient(circle at top, #1a1a1a, #0f0f0f);
}

.tech-header-row {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 0.4rem;
}

.tech-logo {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid #fff;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tech-logo img {
  width: 70%;
  height: 70%;
  object-fit: contain;
}

.tech-name {
  font-size: 1.1rem;
}

.tech-desc {
  font-size: 0.95rem;
  opacity: 1;
}

/* ---------------- SPACER ---------------- */

.spacer {
  height: 200vh;
}

/* ---------------- EXPERIENCE PREVIEW ---------------- */

.experience-preview {
  width: 90%;
  margin: 5rem auto;          /* spacing above & below */
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s ease;
}

/* show animation */
.experience-preview.show {
  opacity: 1;
  transform: translateY(0);
}

.credentials-preview {
  margin-top: 4rem;
}
</style>