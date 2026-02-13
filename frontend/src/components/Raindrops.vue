<script setup>
import { ref, onMounted } from 'vue'
import 'primeicons/primeicons.css'

const githubLink = ref(null)
const linkedinLink = ref(null)

onMounted(() => {
  const canvas = document.getElementById("rainCanvas")
  const ctx = canvas.getContext("2d")

  function resize() {
    canvas.width = window.innerWidth * 0.75
    canvas.height = window.innerHeight * 0.75
  }
  window.addEventListener("resize", resize)
  resize()

  // Platform
  const platformHeight = canvas.height * 0.88
  const platformColor = "#222222"

  let drops = []
  let particles = []
  let wind = -1.5

  // 💧 Drop class
  class Drop {
    constructor(x = Math.random() * canvas.width, targetY, size = Math.random() * 3 + 4) {
      this.x = x
      this.y = -50
      this.targetY = targetY
      this.vx = wind + (Math.random() - 0.5) * 0.3
      this.vy = Math.random() * 8 + 12
      this.size = size
      this.bounces = 0
      this.opacity = 1
      this.trail = []
    }

    update() {
      this.vy += 0.15
      this.x += this.vx
      this.y += this.vy

      this.trail.push({ x: this.x, y: this.y, alpha: this.opacity })
      if (this.trail.length > 6) this.trail.shift()

      if (this.y >= platformHeight) {
        this.y = platformHeight
        if (this.bounces < 2) {
          this.vy *= -0.45
          this.size *= 0.7
          this.bounces++
          spawnParticles(this.x, this.y)
        } else {
          this.opacity -= 0.04
          this.size *= 0.96
        }
      }

      if (this.opacity <= 0) this.reset()
    }

    reset() {
      this.x = Math.random() * canvas.width
      this.y = -50
      this.vx = wind + (Math.random() - 0.5) * 0.3
      this.vy = Math.random() * 8 + 12
      this.size = Math.random() * 3 + 4
      this.bounces = 0
      this.opacity = 1
      this.trail = []
      this.targetY = undefined
    }

    draw() {
      ctx.shadowBlur = 14
      ctx.shadowColor = "white"

      for (let t of this.trail) {
        ctx.fillStyle = `rgba(255,255,255,${t.alpha * 0.3})`
        ctx.beginPath()
        ctx.arc(t.x, t.y, this.size * 0.5, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.fillStyle = `rgba(255,255,255,${this.opacity})`
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()

      ctx.shadowBlur = 0
    }
  }

  // 💥 Particle class
  class Particle {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.vx = (Math.random() - 0.5) * 3
      this.vy = (Math.random() - 0.5) * 3
      this.size = Math.random() * 2
      this.life = 1
    }

    update() {
      this.vy += 0.04
      this.x += this.vx
      this.y += this.vy
      this.life -= 0.03
    }

    draw() {
      ctx.fillStyle = `rgba(255,255,255,${this.life})`
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  function spawnParticles(x, y) {
    for (let i = 0; i < 6; i++) particles.push(new Particle(x, y))
  }

  // 🌄 Mountains
  function drawMountains() {
    const layers = [
      { color: "#111111", peaks: [ {x:0,y:canvas.height}, {x:430,y:canvas.height*0.4}, {x:1000,y:canvas.height} ] },
      { color: "#333333", peaks: [ {x:0,y:canvas.height}, {x:250,y:canvas.height*0.45}, {x:500,y:canvas.height} ] },
      { color: "#555555", peaks: [ {x:0,y:canvas.height}, {x:200,y:canvas.height*0.5}, {x:400,y:canvas.height}, {x:600,y:canvas.height*0.52}, {x:800,y:canvas.height} ] },
      { color: "#777777", peaks: [ {x:0,y:canvas.height}, {x:150,y:canvas.height*0.55}, {x:400,y:canvas.height}, {x:650,y:canvas.height*0.57}, {x:900,y:canvas.height} ] },
    ]

    layers.forEach(layer => {
      ctx.fillStyle = layer.color
      ctx.beginPath()
      ctx.moveTo(layer.peaks[0].x, layer.peaks[0].y)
      for (let i = 1; i < layer.peaks.length; i++) ctx.lineTo(layer.peaks[i].x, layer.peaks[i].y)
      ctx.lineTo(canvas.width, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.closePath()
      ctx.fill()
    })

    ctx.fillStyle = platformColor
    ctx.fillRect(0, platformHeight, canvas.width, canvas.height - platformHeight)
  }

  // 🚀 Animate
  let lastDropTime = 0
  const MAX_DROPS = 100
  const MAX_PARTICLES = 300

  function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Gradient background
    const gradient = ctx.createLinearGradient(0,0,0,canvas.height)
    gradient.addColorStop(0,"#01020a")
    gradient.addColorStop(1,"#000000")
    ctx.fillStyle = gradient
    ctx.fillRect(0,0,canvas.width,canvas.height)

    drawMountains()

    // Spawn drops (max limit)
    if (!lastDropTime) lastDropTime = timestamp
    if (timestamp - lastDropTime > 1000) {
      drops.push(new Drop())
      if (drops.length > MAX_DROPS) drops.splice(0, drops.length - MAX_DROPS)
      lastDropTime = timestamp
    }

    // Update and draw drops
    drops.forEach(d => { d.update(); d.draw() })

    // Update and draw particles
    particles.forEach((p,i) => { p.update(); p.draw(); if(p.life<=0) particles.splice(i,1) })
    if (particles.length > MAX_PARTICLES) particles.splice(0, particles.length - MAX_PARTICLES)

    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)

  // Click for big drop
  canvas.addEventListener("click", e => {
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    drops.push(new Drop(x, undefined, 10))
  })

  // 💻 Social links fade
  if (githubLink.value && linkedinLink.value) {
    setTimeout(() => githubLink.value.classList.add('show'), 1500)
    setTimeout(() => linkedinLink.value.classList.add('show'), 1750)
  }
})
</script>

<template>
  <div class="canvas-wrapper">
    <canvas id="rainCanvas"></canvas>

    <!-- Social Links -->
    <a
      href="https://github.com/JulianMunguia04"
      target="_blank"
      class="social-link github"
      ref="githubLink"
    >
      <i class="pi pi-github"></i>
    </a>

    <a
      href="https://www.linkedin.com/in/julian-munguia/"
      target="_blank"
      class="social-link linkedin"
      ref="linkedinLink"
    >
      <i class="pi pi-linkedin"></i>
    </a>
  </div>
</template>

<style scoped>
    .canvas-wrapper {
    position: relative;
    display: inline-block;
    }

    canvas {
    border: 1px solid rgb(204, 204, 204);
    border-radius: 5vh;
    display: block;
    }

    /* Social links */
    .social-link {
    position: absolute;
    bottom: 1rem;
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-size: 1.5rem;
    color: #00b050;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.4s ease;
    z-index: 3;
    }

    /* Individual positions */
    .social-link.github {
    right: 1rem;
    }

    .social-link.linkedin {
    right: 4rem;
    }

    /* Fade-in */
    .social-link.show {
    opacity: 1;
    transform: translateY(0);
    }

    /* Hover animation */
    .social-link:hover {
    transform: translateY(-5px) scale(1.2);
    opacity: 0.85;
    }
</style>