'use client'

import { useEffect, useRef, useState } from 'react'
import TypingAnimation from './typing-animation'

function useInView(ref: React.RefObject<HTMLElement>, options = {}) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
    }, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, options])

  return isInView
}

export function AnimatedTitle({ text, className }: { text: string, className: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { threshold: 0.1 })

  return (
    <div ref={ref}>
      {isInView && (
        <TypingAnimation
          className={className}
          text={text}
          duration={50}
        />
      )}
    </div>
  )
} 