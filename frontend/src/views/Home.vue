<template>
  <div ref="homeSection" class="home" :class="{ show: isVisible }">
    <Raindrops />

    <!-- TEXT OVERLAY -->
    <div class="hero_text" :class="{ showHero: showHero }">
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

  <div class="test">

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Raindrops from '@/components/Raindrops.vue'

const homeSection = ref(null)
const isVisible = ref(false)
const showHero = ref(false)

let observer

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      isVisible.value = entry.isIntersecting

      if (entry.isIntersecting) {
        setTimeout(() => {
          showHero.value = true
        }, 300)
      } else {
        showHero.value = false
      }
    },
    {
      threshold: 0.3,
    }
  )

  if (homeSection.value) {
    observer.observe(homeSection.value)
  }
})

onBeforeUnmount(() => {
  if (observer && homeSection.value) {
    observer.unobserve(homeSection.value)
  }
})
</script>


<style scoped>
.home {
  opacity: 0;
  transition: all 0.6s ease;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
}

.show {
  opacity: 1;
}

/* TEXT CONTAINER (replaces old absolute h1 + subtitle) */
.hero_text {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -70%);
  opacity: 0;
  transition: all 0.6s ease;
  /*text-align: center;*/
  z-index: 2;
}

.hero_text.showHero {
  opacity: 1;
  transform: translate(-50%, -50%);
}

h1 {
  margin: 0;
  font-size: clamp(3rem, 6vw, 5rem);
  line-height: 1.08;
  font-weight: 700;
}

.subtitle {
  margin-top: 1.1rem;
  font-size: clamp(1.15rem, 2vw, 1.6rem);
  opacity: 0.85;
}

hr {
  width: 70%;
  border: none;
  border-top: 2px solid rgba(255,255,255,0.2);
  margin: 3rem auto;
}

.test{
  height: 200vh
}
</style>
