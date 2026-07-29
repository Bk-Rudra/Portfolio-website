import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

type LogLine = {
  time: string
  key: string
  value: string
}

const bootSequence: LogLine[] = [
  { time: '00:00', key: 'System Init', value: 'Loading core competencies...' },
  { time: '00:48', key: 'Focus', value: 'Browser extensions, developer tools, VS Code/Figma plugins, and real-time dashboards.' },
  { time: '01:14', key: 'Status', value: 'Available for new opportunities.' },
]

export function TypingTerminal() {
  const [lines, setLines] = useState<LogLine[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const charIndexRef = useRef(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setLines(bootSequence)
      setIsTyping(false)
      return
    }

    charIndexRef.current = 0

    const typeChar = () => {
      const targetLine = bootSequence[currentLine]
      if (!targetLine) {
        setIsTyping(false)
        return
      }

      if (charIndexRef.current < targetLine.value.length) {
        setTypedText(targetLine.value.slice(0, charIndexRef.current + 1))
        charIndexRef.current++
        const delay = Math.random() * 30 + 20 // Random typing speed
        timeoutRef.current = setTimeout(typeChar, delay)
      } else {
        // Line complete, add to lines and move to next
        setLines((prev) => [...prev, { ...targetLine, value: targetLine.value }])
        setTypedText('')
        charIndexRef.current = 0

        if (currentLine < bootSequence.length - 1) {
          setCurrentLine((prev) => prev + 1)
          timeoutRef.current = setTimeout(typeChar, 400) // Pause between lines
        } else {
          setIsTyping(false)
        }
      }
    }

    timeoutRef.current = setTimeout(typeChar, 500)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [currentLine])

  return (
    <div className="space-y-3 font-mono text-xs sm:text-[13px]">
      {lines.map((line, i) => (
        <motion.div
          key={line.time}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex gap-3"
        >
          <span className="shrink-0 text-muted-foreground/60">{line.time}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-primary">{line.key}</span>
            </div>
            <p className="mt-0.5 leading-relaxed text-muted-foreground">{line.value}</p>
          </div>
        </motion.div>
      ))}

      {isTyping && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-3"
        >
          <span className="shrink-0 text-muted-foreground/60">
            {bootSequence[currentLine]?.time || '00:00'}
          </span>
          <div>
            <span className="text-primary">{bootSequence[currentLine]?.key}</span>
            <p className="mt-0.5 leading-relaxed text-muted-foreground">
              {typedText}
              <span className="inline-block h-4 w-2 animate-pulse bg-primary/80" />
            </p>
          </div>
        </motion.div>
      )}

      {!isTyping && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 border-t border-border pt-3 text-muted-foreground"
        >
          <span className="text-primary">$</span>
          <span>connect</span>
          <span className="inline-block h-4 w-2 animate-pulse bg-primary/80" />
        </motion.div>
      )}
    </div>
  )
}
