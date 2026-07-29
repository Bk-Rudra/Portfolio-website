import { useEffect, useRef } from 'react'

type Node = { x: number; y: number; vx: number; vy: number }

/**
 * Lightweight interactive constellation. Nodes drift, link to nearby
 * neighbors, and gently repel from the cursor — evoking a distributed
 * network without heavy dependencies. Respects reduced-motion.
 */
export function NodeNetwork({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let nodes: Node[] = []
    const pointer = { x: -9999, y: -9999 }
    let raf = 0

    const readColor = () => {
      const styles = getComputedStyle(document.documentElement)
      const isLight = document.documentElement.classList.contains('light')
      if (isLight) {
        return '#000000'
      }
      return styles.getPropertyValue('--primary').trim() || 'oklch(0.72 0.16 55)'
    }
    let primary = readColor()

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const density = Math.round((width * height) / 22000)
      const count = Math.max(24, Math.min(72, density))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }))
      primary = readColor()
    }

    const LINK_DIST = 130
    const draw = () => {
      // Update color on each frame to handle theme changes
      primary = readColor()
      
      ctx.clearRect(0, 0, width, height)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy

        // cursor repulsion
        const dx = n.x - pointer.x
        const dy = n.y - pointer.y
        const dist = Math.hypot(dx, dy)
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120
          n.x += (dx / dist) * force * 1.6
          n.y += (dy / dist) * force * 1.6
        }

        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
        n.x = Math.max(0, Math.min(width, n.x))
        n.y = Math.max(0, Math.min(height, n.y))
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.28
            ctx.strokeStyle = primary
            ctx.globalAlpha = alpha
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // nodes
      ctx.globalAlpha = 0.8
      ctx.fillStyle = primary
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      raf = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }
    const onLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onMove)
    canvas.parentElement?.addEventListener('pointerleave', onLeave)

    if (reduced) {
      draw()
      cancelAnimationFrame(raf)
      // single static frame for reduced motion
    } else {
      raf = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      canvas.parentElement?.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className={className} />
}
