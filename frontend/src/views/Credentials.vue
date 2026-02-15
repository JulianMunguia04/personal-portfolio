<template>
  <div
    ref="credentialsSection"
    class="credentials"
    :class="{ show: showCredentials }"
  >
    <!-- HEADER -->
    <div class="credentials-header">
      <h1>Credentials</h1>
      <p class="credentials-subtitle">
        Academic background and professional achievements.
      </p>
    </div>

    <!-- EDUCATION -->
    <section class="section">
      <h2 class="section-title">Education</h2>

      <div
        v-for="(edu, index) in education"
        :key="index"
        class="card credential-card"
      >
        <div class="card-header">
          <img v-if="edu.photoLink" :src="edu.photoLink" alt="education photo" class="photo" />
          <h3>{{ edu.degree }}</h3>
        </div>

        <div class="meta">
          {{ edu.institution }} • {{ edu.years }}
        </div>

        <div v-if="edu.coursework?.length" class="sub-section">
          <div class="label">Relevant Coursework</div>
          <div class="tags">
            <span class="tag" v-for="(c, i) in edu.coursework" :key="i">{{ c }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CERTIFICATES / PROFESSIONAL DEVELOPMENT -->
    <section class="section">
      <h2 class="section-title">Certificates & Professional Development</h2>

      <div
        v-for="(cert, index) in certificates"
        :key="index"
        class="card credential-card"
      >
        <div class="card-header">
          <img v-if="cert.photoLink" :src="cert.photoLink" alt="certificate photo" class="photo" />
          <h3>{{ cert.title }}</h3>
        </div>

        <div class="meta" v-if="cert.organization">
          {{ cert.organization }} • {{ cert.year }}
        </div>

        <ul class="impact-list" v-if="cert.notes?.length">
          <li v-for="(note, i) in cert.notes" :key="i">{{ note }}</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const credentialsSection = ref(null);
const showCredentials = ref(false);

const education = ref([
  {
    degree: "Bachelor of Science in Information Technology",
    institution: "Concordia University of Edmonton",
    years: "2022 – Present",
    coursework: [
      "Data Structures & Algorithms",
      "Database Systems",
      "Software Engineering",
      "Operating Systems",
    ],
    photoLink: "https://via.placeholder.com/80", // add your actual photo URL
  },
]);

const certificates = ref([
  {
    title: "AWS Cloud Practitioner",
    organization: "Amazon Web Services",
    year: "In Progress",
    notes: ["Independent study and cloud practice"],
    photoLink: "https://via.placeholder.com/80",
  },
  {
    title: "AI & Machine Learning Exploration",
    notes: ["Independent projects and research"],
    photoLink: "https://via.placeholder.com/80",
  },
]);

let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target === credentialsSection.value) {
          showCredentials.value = entry.isIntersecting;
        }
      });
    },
    { threshold: 0.1 }
  );

  credentialsSection.value && observer.observe(credentialsSection.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<style scoped>
.credentials {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s ease;
  width: 85%;
  margin: 6rem auto;
}

.credentials.show {
  opacity: 1;
  transform: translateY(0);
}

.credentials-header {
  max-width: 800px;
  margin-bottom: 3rem;
}

.credentials-subtitle {
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

.card {
  border: 1px solid #fff;
  border-radius: 14px;
  padding: 2rem;
  background: radial-gradient(circle at top, #151515, #0f0f0f);
  margin-bottom: 2rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.photo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #fff;
}

.meta {
  font-size: 0.9rem;
  opacity: 0.6;
  margin-bottom: 1rem;
}

.label {
  font-weight: 600;
  margin-bottom: 0.6rem;
  opacity: 0.85;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.tag {
  border: 1px solid #fff;
  border-radius: 20px;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  opacity: 0.8;
}

.impact-list {
  padding-left: 1.2rem;
  line-height: 1.7;
}
</style>