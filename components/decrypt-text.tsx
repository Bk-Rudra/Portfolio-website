import { useEffect, useRef, useState } from 'react'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#01ABCDEF'

/**
 * Scrambles then "decrypts" text into place — an on-brand reveal for a
 * security engineer. Each character locks in sequentially. Falls back to
 * plain text when reduced motion is requested.
 */
export function DecryptText({
  text,
  className,
  startDelay = 0,
  speed = 1,
}: {
  text: string
  className?: string
  startDelay?: number
  speed?: number
}) {
  const [display, setDisplay] = useState(text)
  const frame = useRef(0)
  const raf = useRef(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setDisplay(text)
      return
    }

    let timeout: ReturnType<typeof setTimeout>
    const revealPerFrame = 1 / 3 // characters fully resolve gradually
    const total = text.length

    const tick = () => {
      const revealed = Math.floor(frame.current * revealPerFrame * speed)
      let out = ''
      for (let i = 0; i < total; i++) {
        const char = text[i]
        if (char === ' ') {
          out += ' '
          continue
        }
        if (i < revealed) {
          out += char
        } else {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        }
      }
      setDisplay(out)
      frame.current += 1
      if (revealed <= total) {
        raf.current = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
      }
    }

    timeout = setTimeout(() => {
      frame.current = 0
      raf.current = requestAnimationFrame(tick)
    }, startDelay)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(raf.current)
    }
  }, [text, startDelay, speed])

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{display}</span>
    </span>
  )
}
