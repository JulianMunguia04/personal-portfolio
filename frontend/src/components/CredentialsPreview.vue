<template>
  <div
    ref="credentialsSection"
    class="credentials"
    :class="{ show: showCredentials }"
  >
    <h1>Credentials</h1>

    <div class="credentials-groups">
      <section v-for="group in credentials" :key="group.id" class="credentials-group">
        <h2 class="group-title">
          <span class="group-icon">{{ group.icon }}</span>
          {{ group.title }}
        </h2>

        <div class="credential-items">
          <div v-for="item in group.items" :key="item.name" class="credential-card">
            <div class="credential-header-row">
              <div v-if="item.logo" class="credential-logo">
                <img :src="item.logo" :alt="`${item.name} logo`" />
              </div>
              <h3 class="credential-name">{{ item.name }}</h3>
            </div>
            <p class="credential-desc">{{ item.description }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const credentialsSection = ref(null)
const showCredentials = ref(false)
let observer

onMounted(() => {
  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.target === credentialsSection.value) {
          showCredentials.value = entry.isIntersecting
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -20% 0px'
    }
  )

  credentialsSection.value && observer.observe(credentialsSection.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

/* ---- scalable credentials ---- */
const credentials = [
  {
    id: 'education',
    icon: '🎓',
    title: 'Education',
    items: [
      {
        name: 'Harvard CS50',
        description: 'Completed Harvard’s Introduction to Computer Science course.',
        logo: '/credentials/cs50.png'
      },
      {
        name: 'B.Sc. Computer Science',
        description: 'Studied software engineering, algorithms, and data structures.',
        logo: '/credentials/university.png'
      }
    ]
  },
  {
    id: 'certificates',
    icon: '📜',
    title: 'Certificates',
    items: [
      {
        name: 'AWS Certified Developer',
        description: 'Certification for deploying and managing cloud applications.',
        logo: '/credentials/aws.png'
      },
      {
        name: 'Fullstack Web Development',
        description: 'Learned fullstack app development with React, Node.js, and databases.',
        logo: '/credentials/fullstack.png'
      }
    ]
  }
]
</script>

<style scoped>
.credentials {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s ease;
  width: 90%;
  margin: 0 auto;
}

.credentials.show {
  opacity: 1;
  transform: translateY(0);
}

.credentials-groups {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.group-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.group-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  padding: 0.2rem 0.4rem;
  border-radius: 6px;
}

.credential-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.credential-card {
  border: 1px solid #fff;
  border-radius: 12px;
  padding: 4%;
  background: radial-gradient(circle at top, #151515, #0f0f0f);
  transition: transform 0.25s ease, background 0.25s ease;
}

.credential-card:hover {
  transform: translateY(-4px);
  background: radial-gradient(circle at top, #1a1a1a, #0f0f0f);
}

.credential-header-row {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 0.3rem;
}

.credential-logo {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid #fff;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.credential-logo img {
  width: 70%;
  height: 70%;
  object-fit: contain;
}

.credential-name {
  font-size: 1.05rem;
}

.credential-desc {
  font-size: 0.9rem;
  opacity: 0.9;
}
</style>