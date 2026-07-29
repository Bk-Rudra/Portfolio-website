import { useRef, useState } from 'react'
import { motion } from 'motion/react'

export function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [spotlightX, setSpotlightX] = useState(50)
  const [spotlightY, setSpotlightY] = useState(50)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    // Calculate rotation (max 10 degrees)
    const rotateXValue = ((y - centerY) / centerY) * -5
    const rotateYValue = ((x - centerX) / centerX) * 5
    
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
    
    // Calculate spotlight position (opposite to rotation for realistic metal reflection)
    // When card tilts left, light reflection moves right
    const spotlightXValue = 50 - (rotateYValue * 5) // Opposite to Y rotation
    const spotlightYValue = 50 - (rotateXValue * 5) // Opposite to X rotation
    
    setSpotlightX(spotlightXValue)
    setSpotlightY(spotlightYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setSpotlightX(50)
    setSpotlightY(50)
  }

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Metal reflection effect - moves opposite to tilt */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(
            circle at ${spotlightX}% ${spotlightY}%,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.1) 25%,
            transparent 50%
          )`,
        }}
      />
      {/* Secondary reflection for depth */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(
            circle at ${100 - spotlightX}% ${100 - spotlightY}%,
            rgba(255, 255, 255, 0.2) 0%,
            transparent 40%
          )`,
        }}
      />
      {/* Specular highlight for glossy metal effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          background: `linear-gradient(
            135deg,
            transparent 0%,
            rgba(255, 255, 255, 0.3) ${spotlightX}%,
            transparent ${spotlightX + 20}%,
            rgba(255, 255, 255, 0.2) ${spotlightY + 40}%,
            transparent 100%
          )`,
        }}
      />
      {children}
    </motion.div>
  )
}
