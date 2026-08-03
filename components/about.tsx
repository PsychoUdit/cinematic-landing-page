'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal, TextReveal } from './anim'

const stats = [
  { value: '12+', label: 'Years crafting' },
  { value: '180', label: 'Projects shipped' },
  { value: '30', label: 'Awards won' },
]

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const floatY = useTransform(scrollYProgress, [0, 1], ['20%', '-20%'])

  return (
    <section
      id="about"
      className="relative border-t border-border px-6 py-28 sm:py-36"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Image with floating elements */}
        <div ref={ref} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border">
            <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
              <Image
                src="/images/about.png"
                alt="Inside the AURELIA studio"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
          </div>

          {/* Floating glass card */}
          <motion.div
            style={{ y: floatY }}
            className="absolute -right-4 top-10 hidden rounded-2xl glass-strong px-6 py-5 sm:block"
          >
            <p className="font-serif text-3xl">A+</p>
            <p className="mt-1 text-xs text-muted-foreground">Client satisfaction</p>
          </motion.div>

          <motion.div
            style={{ y: floatY }}
            className="absolute -bottom-6 left-6 hidden rounded-2xl glass-strong px-6 py-5 sm:block"
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-foreground" />
              </span>
              <p className="text-sm">Available for Q3 2026</p>
            </div>
          </motion.div>
        </div>

        {/* Copy */}
        <div>
          <Reveal>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              The Studio
            </span>
          </Reveal>

          <TextReveal
            as="h2"
            text="We are a small team obsessed with the details that make work feel alive."
            className="mt-6 font-serif text-3xl leading-[1.1] text-balance sm:text-4xl md:text-5xl"
          />

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-lg text-pretty leading-relaxed text-muted-foreground">
              AURELIA is an independent design and technology studio. We partner
              with founders, brands and cultural institutions to shape digital
              experiences that are equal parts beautiful and useful — grounded in
              strategy, elevated by craft.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-10">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.08}>
                <p className="font-serif text-4xl sm:text-5xl">{s.value}</p>
                <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
