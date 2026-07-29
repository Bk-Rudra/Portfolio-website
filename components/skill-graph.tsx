import { useEffect, useRef, useState } from 'react'

type SkillNode = {
  name: string
  category: string
  x: number
  y: number
  vx: number
  vy: number
}

export function SkillGraph({ skillGroups }: { skillGroups: { label: string; items: string[] }[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hoveredSkillRef = useRef<string | null>(null)
  const nodesRef = useRef<SkillNode[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const initTimeout = setTimeout(() => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      let width = 0
      let height = 0
      let dpr = Math.min(window.devicePixelRatio || 1, 2)
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
        height = 400
        dpr = Math.min(window.devicePixelRatio || 1, 2)
        canvas.width = width * dpr
        canvas.height = height * dpr
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

        // Create nodes from skill groups
        nodesRef.current = []
        const centerX = width / 2
        const centerY = height / 2
        const radius = Math.min(width, height) * 0.35

        skillGroups.forEach((group, groupIndex) => {
          const angleOffset = (groupIndex / skillGroups.length) * Math.PI * 2
          group.items.forEach((skill, skillIndex) => {
            const angle = angleOffset + (skillIndex / group.items.length) * 0.5
            const x = centerX + Math.cos(angle) * radius
            const y = centerY + Math.sin(angle) * radius
            nodesRef.current.push({
              name: skill,
              category: group.label,
              x,
              y,
              vx: (Math.random() - 0.5) * 0.3,
              vy: (Math.random() - 0.5) * 0.3,
            })
          })
        })

        primary = readColor()
      }

      const LINK_DIST = 100
      const draw = () => {
        // Update color on each frame to handle theme changes
        primary = readColor()
        
        ctx.clearRect(0, 0, width, height)
        const nodes = nodesRef.current

        // Update positions with physics
        for (const node of nodes) {
          if (!reduced) {
            node.x += node.vx
            node.y += node.vy

            // Cursor attraction (gentle)
            const dx = pointer.x - node.x
            const dy = pointer.y - node.y
            const dist = Math.hypot(dx, dy)
            if (dist < 150 && dist > 0) {
              const force = (150 - dist) / 150 * 0.02
              node.vx += (dx / dist) * force
              node.vy += (dy / dist) * force
            }

            // Repulsion between all nodes to prevent overlap
            for (const other of nodes) {
              if (node === other) continue
              const odx = node.x - other.x
              const ody = node.y - other.y
              const odist = Math.hypot(odx, ody)
              
              // Strong repulsion for all nodes when too close (prevent overlap)
              if (odist < 30) {
                const repelForce = (30 - odist) / 30 * 0.15
                node.vx += (odx / odist) * repelForce
                node.vy += (ody / odist) * repelForce
              }
              // Additional repulsion for different categories (maintain separation)
              else if (node.category !== other.category && odist < 80) {
                const repelForce = (80 - odist) / 80 * 0.03
                node.vx += (odx / odist) * repelForce
                node.vy += (ody / odist) * repelForce
              }
              // Gentle attraction for same category (keep groups together)
              else if (node.category === other.category && odist > 60 && odist < 120) {
                const attractForce = (odist - 60) / 60 * 0.005
                node.vx -= (odx / odist) * attractForce
                node.vy -= (ody / odist) * attractForce
              }
            }

            // Damping
            node.vx *= 0.97
            node.vy *= 0.97

            // Keep in bounds
            if (node.x < 40 || node.x > width - 40) node.vx *= -1
            if (node.y < 40 || node.y > height - 40) node.vy *= -1
            node.x = Math.max(40, Math.min(width - 40, node.x))
            node.y = Math.max(40, Math.min(height - 40, node.y))
          }
        }

        // Draw links between related skills (same category)
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i]
            const b = nodes[j]
            if (a.category === b.category) {
              const d = Math.hypot(a.x - b.x, a.y - b.y)
              if (d < LINK_DIST) {
                const alpha = (1 - d / LINK_DIST) * 0.3
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
        }

        // Draw nodes
        ctx.globalAlpha = 1
        for (const node of nodes) {
          const isHovered = node.name === hoveredSkillRef.current
          const radius = isHovered ? 8 : 4
          
          ctx.beginPath()
          ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
          ctx.fillStyle = primary
          ctx.globalAlpha = isHovered ? 1 : 0.6
          ctx.fill()
          
          if (isHovered) {
            ctx.font = '12px JetBrains Mono, monospace'
            ctx.fillStyle = primary
            ctx.globalAlpha = 1
            ctx.fillText(node.name, node.x + 12, node.y + 4)
          }
        }
        ctx.globalAlpha = 1

        raf = requestAnimationFrame(draw)
      }

      const onMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect()
        pointer.x = e.clientX - rect.left
        pointer.y = e.clientY - rect.top

        // Check for hover
        let found = null
        for (const node of nodesRef.current) {
          const dist = Math.hypot(pointer.x - node.x, pointer.y - node.y)
          if (dist < 15) {
            found = node.name
            break
          }
        }
        hoveredSkillRef.current = found
      }

      const onLeave = () => {
        pointer.x = -9999
        pointer.y = -9999
        hoveredSkillRef.current = null
      }

      resize()
      window.addEventListener('resize', resize)
      canvas.addEventListener('pointermove', onMove)
      canvas.addEventListener('pointerleave', onLeave)

      if (reduced) {
        draw()
        cancelAnimationFrame(raf)
      } else {
        raf = requestAnimationFrame(draw)
      }

      return () => {
        cancelAnimationFrame(raf)
        window.removeEventListener('resize', resize)
        canvas.removeEventListener('pointermove', onMove)
        canvas.removeEventListener('pointerleave', onLeave)
      }
    }, 100)

    return () => {
      clearTimeout(initTimeout)
    }
  }, [skillGroups])

  return (
    <div className="relative hidden h-[400px] w-full rounded-xl border border-border bg-card/30 md:block">
      <canvas ref={canvasRef} className="size-full" />
      <div className="absolute bottom-4 left-4 font-mono text-xs text-muted-foreground">
        Interactive skill graph · Hover to explore
      </div>
    </div>
  )
}
