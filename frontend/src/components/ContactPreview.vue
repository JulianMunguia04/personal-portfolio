<template>
  <div
    ref="contactSection"
    class="contact"
    :class="{ show: showContact }"
  >
    <!-- HEADER -->
    <div class="contact-header">
      <h1>Contact Me</h1>
      <p class="contact-subtitle">
        Get in touch for collaborations, projects, or inquiries.
      </p>
    </div>

    <!-- CONTACT CARD -->
    <div class="card contact-card">
      <div class="card-header">
        <img v-if="contact.photoLink" :src="contact.photoLink" alt="Profile Photo" class="photo" />
        <div>
          <h3>{{ contact.name }}</h3>
          <p class="role">{{ contact.role }}</p>
        </div>
      </div>

      <div class="contact-info">
        <div class="info-item" v-if="contact.email">
          <span class="label">Email:</span>
          <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
        </div>
        <div class="info-item" v-if="contact.location">
          <span class="label">Location:</span>
          <span>{{ contact.location }}</span>
        </div>

        <div class="info-item" v-if="contact.links?.length">
          <span class="label">Links:</span>
          <div class="tags">
            <a
              v-for="(link, i) in contact.links"
              :key="i"
              :href="link.url"
              target="_blank"
              class="tag"
            >
              {{ link.name }}
            </a>
          </div>
        </div>
      </div>

      <div v-if="contact.notes" class="notes">
        <p>{{ contact.notes }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const contactSection = ref(null);
const showContact = ref(false);

const contact = ref({
  name: "Julian Munguia",
  role: "Full-Stack Developer / AI Enthusiast",
  photoLink: "/2026_Headshot.jpg",
  email: "julianmunguia04@gmail.com",
  location: "Edmonton, Canada",
  links: [
    { name: "GitHub", url: "https://github.com/julianmunguia" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/julianmunguia" },
  ],
  notes:
    "I’m open to remote or local projects, collaborations, and mentorship opportunities. Let’s build something awesome together!",
});

let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target === contactSection.value) {
          showContact.value = entry.isIntersecting;
        }
      });
    },
    { threshold: 0.1 }
  );

  contactSection.value && observer.observe(contactSection.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<style scoped>
.contact {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s ease;
  width: 85%;
  margin: 6rem;
  margin-top:0px;
}

.contact.show {
  opacity: 1;
  transform: translateY(0);
}

.contact-header {
  max-width: 800px;
  margin-bottom: 3rem;
  text-align: left; /* change from center to left */
}

.contact-subtitle {
  font-size: 1.1rem;
  opacity: 0.8;
  margin-top: 0.3rem;
}

.card.contact-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #fff;
  border-radius: 14px;
  padding: 2rem;
  background: radial-gradient(circle at top, #151515, #0f0f0f);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
}

.role {
  font-size: 0.95rem;
  opacity: 0.7;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.info-item .label {
  font-weight: 600;
  opacity: 0.85;
}

.info-item a {
  color: #fff;
  text-decoration: underline;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.3rem;
}

.tag {
  border: 1px solid #fff;
  border-radius: 20px;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  opacity: 0.8;
  text-decoration: none;
  transition: all 0.2s ease;
}

.tag:hover {
  background: #fff;
  color: #000;
}

.notes {
  margin-top: 1.5rem;
  opacity: 0.85;
  line-height: 1.6;
}
</style>