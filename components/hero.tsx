'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { MagneticButton } from './magnetic-button'

const line1 = 'CINEMATIC'
const line2 = 'DIGITAL CRAFT'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.4 } },
}
const char = {
  hidden: { y: '120%' },
  show: { y: '0%', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
}

function AnimatedLine({ text }: { text: string }) {
  return (
    <span className="block overflow-hidden">
      <motion.span variants={container} className="inline-block">
        {text.split('').map((c, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span variants={char} className="inline-block">
              {c === ' ' ? '\u00A0' : c}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </span>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--background)_95%)]" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          <span className="h-px w-8 bg-muted-foreground/60" />
          Design &amp; Technology Studio
          <span className="h-px w-8 bg-muted-foreground/60" />
        </motion.p>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="font-serif text-6xl font-medium leading-[0.95] tracking-tight text-balance sm:text-7xl md:text-8xl lg:text-[9rem]"
        >
          <AnimatedLine text={line1} />
          <AnimatedLine text={line2} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          We build immersive websites, products and brands that move people —
          blending art direction, motion and engineering into one seamless
          experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticButton href="#contact" data-cursor="">
            Start a project
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton href="#work" variant="outline">
            View our work
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#showcase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-muted-foreground"
        aria-label="Scroll down"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative flex h-12 w-6 justify-center rounded-full border border-border">
          <motion.span
            animate={{ y: [4, 18, 4], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground"
          />
        </span>
      </motion.a>
    </section>
  )
}
