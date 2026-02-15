<template>
  <div
    ref="experienceSection"
    class="experience"
    :class="{ show: showExperience }"
  >
    <!-- HEADER -->
    <div class="experience-header">
      <h1>Experience</h1>
      <p class="experience-subtitle">
        Building scalable systems, leading teams, and delivering production-ready software.
      </p>
    </div>

    <!-- PROFESSIONAL EXPERIENCE -->
    <section class="section">
      <h2 class="section-title">Professional Experience</h2>

      <div class="timeline">
        <div
          v-for="role in roles"
          :key="role.id"
          class="experience-card"
        >
          <div class="card-top">
            <div>
              <h3 class="role-title">{{ role.title }}</h3>
              <div class="company">{{ role.company }}</div>
              <div class="meta">
                {{ role.location }} • {{ role.date }}
              </div>
            </div>
          </div>

          <ul class="impact-list">
            <li v-for="point in role.points" :key="point">
              {{ point }}
            </li>
          </ul>

          <div class="tech-stack">
            <span
              v-for="tech in role.tech"
              :key="tech"
              class="tech-badge"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- LEADERSHIP -->
    <section class="section">
      <h2 class="section-title">Leadership & Involvement</h2>

      <div class="timeline">
        <div
          v-for="leader in leadership"
          :key="leader.id"
          class="experience-card"
        >
          <div>
            <h3 class="role-title">{{ leader.title }}</h3>
            <div class="company">{{ leader.organization }}</div>
            <div class="meta">
              {{ leader.location }} • {{ leader.date }}
            </div>
          </div>

          <ul class="impact-list">
            <li v-for="point in leader.points" :key="point">
              {{ point }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const experienceSection = ref(null)
const showExperience = ref(false)

let observer

onMounted(() => {
  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.target === experienceSection.value) {
          showExperience.value = entry.isIntersecting
        }
      })
    },
    { threshold: 0.1 }
  )

  experienceSection.value &&
    observer.observe(experienceSection.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

const roles = [
  {
    id: 1,
    title: 'Software Engineering Intern (Full-Stack)',
    company: 'Triumphant Communications',
    location: 'London, England (Remote)',
    date: 'May 2025 – September 2025',
    tech: ['React', 'Next.js', 'TypeScript', 'MySQL', 'Tailwind', 'OpenAI API'],
    points: [
      'Developed and optimized scalable full-stack web applications using React, Next.js, and TypeScript.',
      'Integrated LLM-powered features via OpenAI APIs to automate content generation.',
      'Improved database schema performance and REST API reliability.',
      'Collaborated in Agile workflows with daily stand-ups and peer code reviews.'
    ]
  },
  {
    id: 2,
    title: 'Software Engineering Intern',
    company: 'Career Jump Academy',
    location: 'Virginia, USA (Remote)',
    date: 'Nov 2025 – Feb 2026',
    tech: ['PHP', 'MySQL', 'OAuth', 'WordPress', 'REST APIs'],
    points: [
      'Designed and built a custom Learning Management System with scalable backend architecture.',
      'Implemented authentication systems including Google and Facebook OAuth.',
      'Developed course enrollment, subscription logic, and WordPress REST integrations.',
      'Worked directly with founders to iterate on UX and system design.'
    ]
  },
  {
    id: 3,
    title: 'Computer Science & Coding Instructor',
    company: 'Edmonton Catholic Schools',
    location: 'Edmonton, Canada',
    date: 'June 2025 – July 2026',
    tech: ['Scratch', 'Curriculum Design', 'Mentorship'],
    points: [
      'Taught Grade 6 students foundational programming concepts.',
      'Designed interactive lessons on loops, variables, and pseudocode.',
      'Mentored students through final coding projects and creative builds.'
    ]
  }
]

const leadership = [
  {
    id: 1,
    title: 'Student Athlete – Men’s Soccer',
    organization: 'Concordia University of Edmonton',
    location: 'Edmonton, Alberta',
    date: 'September 2022 – Present',
    points: [
      'Balance 20+ hours per week of training and competition with full-time academics.',
      'Develop leadership, teamwork, and resilience in high-pressure environments.',
      'Maintain discipline and time management while pursuing technical excellence.'
    ]
  },
  {
    id: 2,
    title: 'Independent Developer',
    organization: 'Personal Projects',
    location: 'Edmonton, Alberta',
    date: 'September 2022 – Present',
    points: [
      'Design and deploy full-stack applications using React, Node.js, MongoDB, and AWS.',
      'Build real-time systems using WebSockets and scalable backend architecture.',
      'Continuously explore machine learning and AI development.'
    ]
  }
]
</script>

<style scoped>
.experience {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s ease;
  width: 90%;
  margin: 0 0 6rem 0;
  padding-left: 5%;
  padding-bottom: 5%;
}

.experience.show {
  opacity: 1;
  transform: translateY(0);
}

.experience-header {
  max-width: 800px;
  margin-bottom: 3rem;
}

.experience-subtitle {
  font-size: 1.1rem;
  opacity: 0.8;
}

.section {
  margin-bottom: 4rem;
}

.section-title {
  font-size: 1.6rem;
  margin-bottom: 2rem;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.experience-card {
  border: 1px solid #fff;
  border-radius: 14px;
  padding: 2rem;
  background: radial-gradient(circle at top, #151515, #0f0f0f);
  transition: transform 0.25s ease;
}

.experience-card:hover {
  transform: translateY(-6px);
}

.role-title {
  font-size: 1.3rem;
}

.company {
  font-weight: 600;
  opacity: 0.85;
}

.meta {
  font-size: 0.9rem;
  opacity: 0.6;
  margin-bottom: 1rem;
}

.impact-list {
  padding-left: 1.2rem;
  margin-bottom: 1rem;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.tech-badge {
  border: 1px solid #fff;
  border-radius: 20px;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  opacity: 0.8;
}
h1{
  font-size:5vh
}
</style>