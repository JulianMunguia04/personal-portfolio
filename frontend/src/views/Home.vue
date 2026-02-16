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
    id: 'languages',
    icon: '🧑‍💻',
    title: 'Programming Languages',
    description: 'Strong foundations in typed and untyped languages across backend, frontend, and machine learning systems.',
    items: [
      { name: 'JavaScript', 
        description: 'Core language for full-stack web development and real-time systems.',
        logo: "/tech-logos/javascript.png"
      },
      { name: 'TypeScript',
        description: 'Type-safe application architecture for scalable frontend and backend systems.',
        logo: "/tech-logos/typescript.png"
      },
      { name: 'Python',
        description: 'Backend services and machine learning model development.',
        logo: "/tech-logos/python.png"
      },
      { name: 'Go',
        description: 'Systems-level programming and concurrent backend services.',
        logo: "/tech-logos/go.png"
      },
      { name: 'Java',
        description: 'Object-oriented programming and academic system design.',
        logo: "/tech-logos/java.png"
      },
      { name: 'PHP',
        description: 'Backend development for LMS systems and WordPress integrations.',
        logo: "/tech-logos/php.png"
      },
      { name: 'C / C#',
        description: 'Low-level systems understanding and object-oriented development.',
        logo: "/tech-logos/c.png"
      }
    ]
  },
  {
    id: 'frontend',
    icon: '🎨',
    title: 'Frontend Engineering',
    description: 'Building modern, responsive, and production-grade user interfaces.',
    items: [
      { name: 'React.js',
        description: 'Production applications using hooks, state management, and scalable component architecture.',
        logo: "/tech-logos/react.png"
      },
      { name: 'Next.js', 
        description: 'Server-side rendering, routing, and full-stack React frameworks.',
        logo: "/tech-logos/next.png"
      },
      { name: 'Vue.js', 
        description: 'Component-driven UI development using Composition API.', 
        logo: "/tech-logos/vue.png"
      },
      { name: 'HTML5 & Semantic HTML',
        description: 'Accessible, SEO-friendly markup structure.',
        logo: "/tech-logos/html.png"
      },
      { name: 'CSS3', 
        description: 'Responsive layouts, animations, scroll effects, and modern UI styling.',
        logo: "/tech-logos/css.png" 
      },
      { name: 'Tailwind', 
        description: 'utility-first CSS framework for rapidly building custom user interfaces directly in your HTML.', 
        logo: "/tech-logos/tailwind.png"
      },
      { name: 'Bootstrap', 
        description: 'Rapid UI prototyping and responsive design systems.',
        logo: "/tech-logos/bootstrap.png"
      },
      { name: 'Wordpress', 
        description: 'A full-stack WordPress Developer building high-performance, custom websites that drive business results',
        logo: "/tech-logos/wordpress.png"
      },
    ]
  },
  {
    id: 'backend',
    icon: '⚙️',
    title: 'Backend & APIs',
    description: 'Designing secure, scalable, and real-time backend systems.',
    items: [
      { name: 'Node.js', 
        description: 'RESTful APIs and real-time server architecture.', 
        logo: "/tech-logos/node.png"
      },
      { name: 'Express.js', 
        description: 'Middleware-based backend application framework.', 
        logo: "/tech-logos/express.png"
      },
      { name: 'Nest.js', 
        description: 'Modular, enterprise-grade Node.js backend framework.', 
        logo: "/tech-logos/nest.png"
      },
      { name: 'Django', 
        description: 'High-level Python framework enabling rapid, secure web development.', 
        logo: "/tech-logos/django.png"
      },
      { name: 'WebSockets / Socket.io', 
        description: 'Low-latency multiplayer and real-time communication systems.', 
        logo: "/tech-logos/socketio.svg"
      },
      { name: 'REST APIs', 
        description: 'Structured API design and CRUD operations.', 
        logo: "/tech-logos/restapi.png"
      },
      { name: 'Authentication (OAuth2, JWT, Sessions)', 
        description: 'Secure user authentication and session management.', 
        logo: "/tech-logos/auth.svg"
      }
    ]
  },
  {
    id: 'databases',
    icon: '🗄️',
    title: 'Databases & Caching',
    description: 'Designing schemas, optimizing queries, and managing persistent data at scale.',
    items: [
      { name: 'PostgreSQL', 
        description: 'Relational database design and advanced querying.', 
        logo: "/tech-logos/postgresql.png"
      },
      { name: 'MySQL', 
        description: 'Production database management and indexing.', 
        logo: "/tech-logos/mysql.png"
      },
      { name: 'MongoDB', 
        description: 'NoSQL document modeling for scalable applications.', 
        logo: "/tech-logos/mongodb.png"
      },
      { name: 'Redis', 
        description: 'Caching, session storage, and performance optimization.', 
        logo: "/tech-logos/redis.svg"
      },
      { name: 'SQLite', 
        description: 'Lightweight database solutions for local and rapid deployments.', 
        logo: "/tech-logos/sqlite.jpg"
      },
    ]
  },
  {
    id: 'cloud',
    icon: '☁️',
    title: 'Cloud & Deployment',
    description: 'Deploying and maintaining production applications in cloud environments.',
    items: [
      { name: 'AWS (EC2, S3)', description: 'Cloud infrastructure, compute instances, and object storage.' },
      { name: 'Docker', description: 'Containerized application deployment.' },
      { name: 'Kubernetes', description: 'Container orchestration and scaling.' },
      { name: 'Firebase', description: 'Backend-as-a-Service and real-time database solutions.' },
      { name: 'Render', description: 'Cloud deployment for full-stack applications.' },
      { name: 'PM2', description: 'Node.js process management and production uptime.' },
      { name: 'GitHub Pages', description: 'Static site deployment and CI workflows.' }
    ]
  },
  {
    id: 'machine-learning',
    icon: '🤖',
    title: 'Machine Learning & AI',
    description: 'Building and training deep learning systems for real-world applications.',
    items: [
      { name: 'TensorFlow / Keras', description: 'Training neural networks and transformer-based architectures.' },
      { name: 'Scikit-Learn', description: 'Classical machine learning algorithms and evaluation.' },
      { name: 'NumPy & Pandas', description: 'Data processing and numerical computing.' },
      { name: 'Matplotlib', description: 'Data visualization and analysis.' },
      { name: 'Jupyter Notebook', description: 'Experimentation and ML prototyping workflows.' }
    ]
  },
  {
    id: 'tools',
    icon: '🛠️',
    title: 'Engineering Tools & Workflow',
    description: 'Professional development tools and collaborative workflows.',
    items: [
      { name: 'Git & GitHub', description: 'Version control, pull requests, and collaborative development.' },
      { name: 'CI/CD Pipelines', description: 'Automated testing and deployment workflows.' },
      { name: 'Linux / Bash', description: 'Server environments and command-line proficiency.' },
      { name: 'VMware & VirtualBox', description: 'Virtualized environments for development and cybersecurity labs.' },
      { name: 'Kali Linux', description: 'Security testing and network analysis environments.' },
      { name: 'Figma', description: 'UI/UX design and prototyping.' }
    ]
  },
  {
    id: 'computer-science',
    icon: '📚',
    title: 'Computer Science Foundations',
    description: 'Strong theoretical foundation supporting scalable and optimized systems.',
    items: [
      { name: 'Data Structures & Algorithms', description: 'Complexity analysis and optimized problem solving.' },
      { name: 'Big-O Notation', description: 'Performance analysis of algorithms.' },
      { name: 'Operating Systems', description: 'Memory, concurrency, and system-level concepts.' },
      { name: 'Networking & Security', description: 'Protocols, encryption, and cybersecurity fundamentals.' },
      { name: 'Linear Algebra & Statistics', description: 'Mathematical foundations for machine learning.' }
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