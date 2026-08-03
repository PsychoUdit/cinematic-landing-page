'use client'

import {
  type ElementType,
  type ReactNode,
  useRef,
} from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

/* -------------------------------------------------------------------------- */
/* Reveal — fade + rise on scroll into view                                    */
/* -------------------------------------------------------------------------- */

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = 'div',
  once = true,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: ElementType
  once?: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once, margin: '-10% 0px -10% 0px' })
  const MotionTag = motion(as as ElementType)

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y, filter: 'blur(8px)' }
      }
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}

/* -------------------------------------------------------------------------- */
/* TextReveal — word-by-word staggered reveal for headlines                    */
/* -------------------------------------------------------------------------- */

const wordContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const wordChild: Variants = {
  hidden: { y: '110%' },
  show: {
    y: '0%',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

export function TextReveal({
  text,
  className,
  as = 'h2',
  once = true,
}: {
  text: string
  className?: string
  as?: ElementType
  once?: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once, margin: '-12% 0px' })
  const MotionTag = motion(as as ElementType)
  const words = text.split(' ')

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={wordContainer}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.08em', marginBottom: '-0.08em' }}
        >
          <motion.span variants={wordChild} className="inline-block">
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
