'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CursorFollower() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState('')

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 22, stiffness: 320, mass: 0.4 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Only enable on devices with a fine pointer (mouse)
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    setEnabled(true)

    function move(e: MouseEvent) {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      const el = (e.target as HTMLElement).closest('[data-cursor]') as HTMLElement | null
      if (el) {
        setHovering(true)
        setLabel(el.dataset.cursor || '')
      } else {
        const interactive = (e.target as HTMLElement).closest('a, button')
        setHovering(!!interactive)
        setLabel('')
      }
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [cursorX, cursorY])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:flex items-center justify-center rounded-full mix-blend-difference"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: label ? 96 : hovering ? 56 : 14,
        height: label ? 96 : hovering ? 56 : 14,
        backgroundColor: '#ffffff',
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    >
      {label ? (
        <span className="text-[11px] font-medium uppercase tracking-wider text-black">
          {label}
        </span>
      ) : null}
    </motion.div>
  )
}
