import { useEffect, useRef, useState } from 'react'

export function ScrollProgress({ totalNodes }: { totalNodes: number }) {
  const [progress, setProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [nodePositions, setNodePositions] = useState<number[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const calculateNodePositions = () => {
      const cards = document.querySelectorAll('[data-card-index]')
      const positions: number[] = []
      
      cards.forEach((card) => {
        const container = containerRef.current
        if (!container) return
        
        const cardRect = card.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        
        // Calculate position as percentage from top of container
        // The container has top-2 (8px), card starts from its natural position
        const relativeTop = cardRect.top - containerRect.top + 8 // +8 to align with container top-2
        const percentage = (relativeTop / containerRect.height) * 100
        positions.push(Math.max(0, Math.min(100, percentage)))
      })
      
      setNodePositions(positions)
    }

    const handleScroll = () => {
      if (!containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const containerTop = containerRect.top
      const containerHeight = containerRect.height
      const windowHeight = window.innerHeight

      // Calculate overall progress (0 to 1)
      const scrollTop = Math.max(0, -containerTop)
      const scrollableHeight = containerHeight - windowHeight
      const progressValue = Math.min(1, Math.max(0, scrollTop / scrollableHeight))
      setProgress(progressValue)

      // Calculate active index based on which card is in view
      const cards = document.querySelectorAll('[data-card-index]')
      const viewportCenter = windowHeight / 2
      let activeIdx = 0
      
      cards.forEach((card, idx) => {
        const cardRect = card.getBoundingClientRect()
        const cardCenter = cardRect.top + cardRect.height / 2
        const distance = Math.abs(cardCenter - viewportCenter)
        
        if (distance < windowHeight / 3) {
          activeIdx = idx
        }
      })
      
      setActiveIndex(activeIdx)
    }

    // Initial calculation
    calculateNodePositions()
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', () => {
      calculateNodePositions()
      handleScroll()
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [totalNodes])

  return (
    <div ref={containerRef} className="absolute left-[7px] top-2 hidden h-full w-px sm:block">
      {/* Background line */}
      <div className="absolute inset-0 w-full bg-border" />
      {/* Progress line */}
      <div
        className="absolute left-0 w-full bg-primary transition-all duration-150 ease-out"
        style={{ height: `${progress * 100}%` }}
      />
      {/* Nodes positioned at actual card locations */}
      {Array.from({ length: totalNodes }).map((_, idx) => (
        <div
          key={idx}
          className={`absolute left-[-6px] size-4 rounded-full border-2 bg-background transition-all duration-300 ${
            idx <= activeIndex
              ? 'border-primary scale-100'
              : 'border-border scale-75 opacity-50'
          }`}
          style={{ top: `${nodePositions[idx] || (idx / (totalNodes - 1)) * 100}%` }}
        />
      ))}
    </div>
  )
}
