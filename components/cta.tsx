'use client'

import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { MagneticButton } from './magnetic-button'
import { Reveal, TextReveal } from './anim'

export function CTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border px-6 py-32 sm:py-44"
    >
      {/* Animated background glow */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0.3, scale: 0.9 }}
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.05, 0.9] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(1_0_0_/_10%)_0%,transparent_65%)]"
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Let&apos;s build something
          </span>
        </Reveal>

        <TextReveal
          as="h2"
          text="Have a project in mind? Let's make it unforgettable."
          className="mt-8 font-serif text-4xl leading-[1.05] text-balance sm:text-6xl md:text-7xl"
        />

        <Reveal delay={0.15}>
          <p className="mt-8 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Tell us about your ambitions. We&apos;ll bring the strategy, craft and
            technology to get you there.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <MagneticButton href="mailto:hello@aurelia.studio" data-cursor="">
              hello@aurelia.studio
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="#work" variant="outline">
              Explore work
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
