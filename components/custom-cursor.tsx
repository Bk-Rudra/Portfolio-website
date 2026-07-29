import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [label, setLabel] = useState('')
  const [isHovering, setIsHovering] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [data-interactive]')
      const profileName = target.closest('[data-profile-name]')
      
      if (profileName) {
        setShowProfile(true)
        setIsHovering(true)
        // Hide default cursor when showing profile video
        document.body.style.cursor = 'none'
        // Play video when showing profile
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0
            videoRef.current.play().catch((err) => {
              console.log('Video play error:', err)
            })
          }
        }, 100)
      } else if (interactive) {
        const labelText = interactive.getAttribute('aria-label') || 
                         interactive.textContent?.slice(0, 20) || ''
        setLabel(labelText)
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => {
      setLabel('')
      setIsHovering(false)
      setShowProfile(false)
      // Show default cursor when not showing profile
      document.body.style.cursor = ''
      // Pause and reset video when not showing profile
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      // Reset cursor on cleanup
      document.body.style.cursor = ''
    }
  }, [])

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-50 hidden size-4 rounded-full border-2 border-primary md:block overflow-hidden"
        style={{
          transform: `translate(${position.x - (showProfile ? 40 : 8)}px, ${position.y - (showProfile ? 40 : 8)}px)`,
          transition: isHovering ? 'transform 0.1s, width 0.2s, height 0.2s' : 'transform 0.15s ease-out',
          width: showProfile ? '80px' : (isHovering ? '48px' : '16px'),
          height: showProfile ? '80px' : (isHovering ? '48px' : '16px'),
        }}
      >
        {showProfile && (
          <video
            ref={videoRef}
            src="/bhuppi_peace-sign.mp4"
            className="size-full object-cover"
            muted
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            onContextMenu={(e) => e.preventDefault()}
            style={{
              WebkitUserSelect: 'none',
              userSelect: 'none',
              pointerEvents: 'none',
              transform: 'scale(1.18)',
            }}
          />
        )}
      </div>
      {label && !showProfile && (
        <div
          ref={labelRef}
          className="pointer-events-none fixed left-0 top-0 z-50 hidden rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground md:block"
          style={{
            transform: `translate(${position.x + 20}px, ${position.y + 20}px)`,
          }}
        >
          {label}
        </div>
      )}
    </>
  )
}
