'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function Loader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Lock scroll while the intro plays
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      setDone(true)
      document.body.style.overflow = ''
    }, 1600)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl font-medium tracking-tight sm:text-7xl"
            >
              AURELIA
            </motion.p>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-0 h-px w-full origin-left bg-foreground/40"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
