'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from './anim'

const steps = [
  {
    step: '01',
    title: 'Discover',
    description:
      'We immerse ourselves in your world — audits, interviews and research that surface the real problem worth solving.',
  },
  {
    step: '02',
    title: 'Define',
    description:
      'Strategy, positioning and a creative direction. We align on the story before a single pixel is drawn.',
  },
  {
    step: '03',
    title: 'Design & Build',
    description:
      'Rapid, iterative design paired with engineering — prototypes you can feel, refined into a production-ready product.',
  },
  {
    step: '04',
    title: 'Launch & Evolve',
    description:
      'We ship, measure and iterate. Great work is never finished — it grows with your audience.',
  },
]

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 65%', 'end 60%'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      id="process"
      className="relative border-t border-border px-6 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 max-w-2xl">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              How we work
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-serif text-4xl leading-[1.05] text-balance sm:text-5xl md:text-6xl">
              A process built for momentum
            </h2>
          </Reveal>
        </div>

        <div ref={ref} className="relative">
          {/* Animated connecting line */}
          <div className="absolute left-0 top-0 hidden h-full w-px bg-border md:left-1/2 md:block">
            <motion.div
              style={{ scaleY: lineScale, transformOrigin: 'top' }}
              className="h-full w-full bg-foreground"
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-0">
            {steps.map((s, i) => {
              const leftSide = i % 2 === 0
              return (
                <div
                  key={s.step}
                  className="relative md:grid md:min-h-[220px] md:grid-cols-2 md:items-center md:gap-16"
                >
                  {/* Node */}
                  <div className="absolute left-1/2 top-2 hidden h-4 w-4 -translate-x-1/2 items-center justify-center md:flex">
                    <span className="h-4 w-4 rounded-full border border-foreground/40 bg-background" />
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: '-20% 0px' }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute h-2 w-2 rounded-full bg-foreground"
                    />
                  </div>

                  <div
                    className={
                      leftSide
                        ? 'md:col-start-1 md:pr-16 md:text-right'
                        : 'md:col-start-2 md:pl-16'
                    }
                  >
                    <Reveal y={40}>
                      <div className="rounded-2xl border border-border bg-card p-8 transition-colors duration-300 hover:border-foreground/25">
                        <span className="font-serif text-5xl text-muted-foreground/40">
                          {s.step}
                        </span>
                        <h3 className="mt-4 text-2xl font-medium">{s.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {s.description}
                        </p>
                      </div>
                    </Reveal>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
