'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './anim'

type Project = {
  title: string
  category: string
  year: string
  image: string
}

const projects: Project[] = [
  {
    title: 'Noir Atelier',
    category: 'Brand Identity',
    year: '2025',
    image: '/images/work-1.png',
  },
  {
    title: 'Lumen Commerce',
    category: 'E-Commerce',
    year: '2025',
    image: '/images/work-2.png',
  },
  {
    title: 'Flux Motion',
    category: 'Motion & 3D',
    year: '2024',
    image: '/images/work-3.png',
  },
  {
    title: 'Monolith Spaces',
    category: 'Web Experience',
    year: '2024',
    image: '/images/work-4.png',
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  // Offset alternating columns for an editorial rhythm
  const isOffset = index % 2 === 1

  return (
    <Reveal
      y={50}
      delay={(index % 2) * 0.08}
      className={isOffset ? 'lg:mt-24' : ''}
    >
      <a
        href="#work"
        data-cursor="Open"
        className="group block"
      >
        <div
          ref={ref}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border"
        >
          <motion.div style={{ y: imgY }} className="absolute inset-0 scale-125">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

          <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full glass-strong opacity-0 transition-all duration-500 group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5" />
          </div>

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
            <div>
              <span className="rounded-full glass px-3 py-1 text-xs text-foreground/90">
                {project.category}
              </span>
              <h3 className="mt-4 font-serif text-2xl sm:text-3xl">
                {project.title}
              </h3>
            </div>
            <span className="text-sm text-muted-foreground">{project.year}</span>
          </div>
        </div>
      </a>
    </Reveal>
  )
}

export function FeaturedWork() {
  return (
    <section
      id="work"
      className="relative border-t border-border px-6 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Featured Work
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-serif text-4xl leading-[1.05] text-balance sm:text-5xl md:text-6xl">
                Selected projects
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a
              href="#work"
              data-cursor=""
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              View full archive
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
