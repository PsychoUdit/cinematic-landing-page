'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from './anim'

type Item = {
  eyebrow: string
  title: string
  description: string
  image: string
}

const items: Item[] = [
  {
    eyebrow: 'Product Design',
    title: 'Interfaces engineered for clarity',
    description:
      'From data-dense dashboards to consumer apps, we design systems that scale — every pixel earning its place in a considered, cohesive whole.',
    image: '/images/showcase-1.png',
  },
  {
    eyebrow: 'Mobile Experiences',
    title: 'Motion that guides the eye',
    description:
      'Fluid transitions, tactile micro-interactions and purposeful animation turn everyday flows into experiences people remember and return to.',
    image: '/images/showcase-2.png',
  },
]

function ShowcaseRow({ item, index }: { item: Item; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05])
  const reversed = index % 2 === 1

  return (
    <div
      ref={ref}
      className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
    >
      <Reveal
        className={reversed ? 'lg:order-2' : ''}
        y={40}
      >
        <div
          data-cursor="View"
          className="group relative aspect-[16/11] overflow-hidden rounded-2xl border border-border"
        >
          <motion.div style={{ y: imgY, scale }} className="absolute inset-0">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        </div>
      </Reveal>

      <div className={reversed ? 'lg:order-1' : ''}>
        <Reveal>
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {item.eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h3 className="mt-5 font-serif text-3xl leading-tight text-balance sm:text-4xl md:text-5xl">
            {item.title}
          </h3>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </Reveal>
      </div>
    </div>
  )
}

export function Showcase() {
  return (
    <section id="showcase" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 max-w-2xl">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Selected Capabilities
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-serif text-4xl leading-[1.05] text-balance sm:text-5xl md:text-6xl">
              Work that feels as good as it looks
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col gap-24 lg:gap-32">
          {items.map((item, i) => (
            <ShowcaseRow key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
