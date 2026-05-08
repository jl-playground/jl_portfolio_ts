<template>
  <canvas ref="canvasRef" class="particle-canvas"></canvas>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animFrame: number

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let w = 0, h = 0
  const particles: { x: number; y: number; vx: number; vy: number; r: number; color: string }[] = []
  const colors = ['--ctp-mauve', '--ctp-blue', '--ctp-teal', '--ctp-pink']

  const getColor = (cssVar: string) => {
    const style = getComputedStyle(document.documentElement)
    return style.getPropertyValue(cssVar) || '#cba6f7'
  }

  const resize = () => {
    w = window.innerWidth
    h = document.documentElement.scrollHeight
    canvas.width = w * window.devicePixelRatio
    canvas.height = h * window.devicePixelRatio
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)
  }

  const createParticles = () => {
    particles.length = 0
    const count = Math.min(50, Math.floor((w * Math.min(h, window.innerHeight * 3)) / 30000))
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * Math.min(h, window.innerHeight * 3),
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }
  }

  const draw = () => {
    ctx.clearRect(0, 0, w, h)
    particles.forEach((p, i) => {
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > w) p.vx *= -1
      if (p.y < 0 || p.y > h) p.vy *= -1

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = getColor(p.color)
      ctx.fill()

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const dx = p.x - p2.x
        const dy = p.y - p2.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 140) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.strokeStyle = getColor(p.color) + '18'
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    })
    animFrame = requestAnimationFrame(draw)
  }

  resize()
  createParticles()
  draw()

  window.addEventListener('resize', () => {
    resize()
    createParticles()
  })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animFrame)
})
</script>

<style scoped>
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.5;
}
</style>
