import { motion } from 'motion/react'
import type { ReactNode } from 'react'

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  withDepth = false,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  withDepth?: boolean
}) {
  const initialVariants = withDepth
    ? { opacity: 0, y, scale: 0.95, filter: 'blur(8px)' }
    : { opacity: 0, y }

  const whileInViewVariants = withDepth
    ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
    : { opacity: 1, y: 0 }

  return (
    <motion.div
      className={className}
      initial={initialVariants}
      whileInView={whileInViewVariants}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
