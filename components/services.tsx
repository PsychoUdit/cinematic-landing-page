'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  Compass,
  Layers,
  MonitorSmartphone,
  Sparkles,
  Boxes,
  Gauge,
} from 'lucide-react'
import { Reveal } from './anim'

const services = [
  {
    icon: Compass,
    title: 'Brand & Art Direction',
    description:
      'Identity systems, visual language and narrative that give ambitious brands a distinct, lasting presence.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Web & Interactive',
    description:
      'Immersive, high-performance websites with cinematic motion, built to convert and to be remembered.',
  },
  {
    icon: Layers,
    title: 'Product & UX Design',
    description:
      'End-to-end product design — from research and flows to polished, accessible interfaces at scale.',
  },
  {
    icon: Sparkles,
    title: 'Motion & 3D',
    description:
      'Animation, WebGL and real-time 3D that bring stories to life and make interfaces feel alive.',
  },
  {
    icon: Boxes,
    title: 'Design Systems',
    description:
      'Scalable component libraries and tokens so your teams ship consistent experiences faster.',
  },
  {
    icon: Gauge,
    title: 'Engineering',
    description:
      'Production-grade front-end engineering — fast, resilient and built on modern frameworks.',
  },
]

function ServiceCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: typeof Compass
  title: string
  description: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const sx = useSpring(rx, { stiffness: 200, damping: 18 })
  const sy = useSpring(ry, { stiffness: 200, damping: 18 })
  const rotateX = useTransform(sy, [-0.5, 0.5], ['7deg', '-7deg'])
  const rotateY = useTransform(sx, [-0.5, 0.5], ['-7deg', '7deg'])

  function onMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    rx.set((e.clientX - rect.left) / rect.width - 0.5)
    ry.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function onLeave() {
    rx.set(0)
    ry.set(0)
  }

  return (
    <Reveal delay={(index % 3) * 0.08}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8 transition-colors duration-300 hover:border-foreground/25"
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-foreground/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ transform: 'translateZ(20px)' }}
        />
        <div
          style={{ transform: 'translateZ(40px)' }}
          className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-xl glass"
        >
          <Icon className="h-5 w-5" />
        </div>
        <h3
          style={{ transform: 'translateZ(30px)' }}
          className="text-xl font-medium"
        >
          {title}
        </h3>
        <p
          style={{ transform: 'translateZ(20px)' }}
          className="mt-4 text-sm leading-relaxed text-muted-foreground"
        >
          {description}
        </p>
      </motion.div>
    </Reveal>
  )
}

export function Services() {
  return (
    <section
      id="services"
      className="relative border-t border-border px-6 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                What we do
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-serif text-4xl leading-[1.05] text-balance sm:text-5xl md:text-6xl">
                A full-stack creative studio
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
              Six disciplines, one team. We move fluidly between craft and code
              so nothing gets lost in translation.
            </p>
          </Reveal>
        </div>

        <div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: '1200px' }}
        >
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
