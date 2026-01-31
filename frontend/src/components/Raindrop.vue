<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

let canvas, ctx, animationId

onMounted(() => {
  canvas = document.getElementById('rainCanvas')
  ctx = canvas.getContext('2d')

  function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  window.addEventListener('resize', resize)
  resize()

  const platformHeight = canvas.height * 0.88
  const platformColor = '#222'

  let drops = []
  let wind = -1.5

  class Drop {
    constructor(x = Math.random() * canvas.width, size = Math.random() * 3 + 4) {
      this.x = x
      this.y = -50
      this.vx = wind + (Math.random() - 0.5) * 0.3
      this.vy = Math.random() * 8 + 12
      this.size = size
      this.opacity = 1
    }

    update() {
      this.vy += 0.15
      this.x += this.vx
      this.y += this.vy

      if (this.y >= platformHeight) {
        this.opacity -= 0.04
      }
    }

    draw() {
      ctx.fillStyle = `rgba(255,255,255,${this.opacity})`
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    if (Math.random() < 0.03) {
      drops.push(new Drop())
    }

    drops.forEach((d, i) => {
      d.update()
      d.draw()
      if (d.opacity <= 0) drops.splice(i, 1)
    })

    animationId = requestAnimationFrame(animate)
  }

  animate()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <canvas id="rainCanvas" />
</template>

<style scoped>
canvas {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;

  z-index: -1;
  pointer-events: none;
}
</style>
