'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Star, ArrowLeft, ArrowRight } from 'lucide-react'
import { Reveal } from './anim'

type Testimonial = {
  quote: string
  name: string
  role: string
  avatar: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    quote:
      'AURELIA translated a vague ambition into a brand and product that feels inevitable. The craft is on another level — every interaction is considered.',
    name: 'Elena Vasquez',
    role: 'CEO, Noir Atelier',
    avatar: '/images/avatar-1.png',
    rating: 5,
  },
  {
    quote:
      'The most collaborative team we have worked with. They think like owners, not vendors, and it shows in the results we shipped.',
    name: 'Marcus Feld',
    role: 'Founder, Lumen',
    avatar: '/images/avatar-2.png',
    rating: 5,
  },
  {
    quote:
      'Our conversion doubled after the redesign, but the real win is how the brand finally feels like us. Cinematic, precise, unforgettable.',
    name: 'Priya Anand',
    role: 'CMO, Flux',
    avatar: '/images/avatar-3.png',
    rating: 5,
  },
  {
    quote:
      'They set a new bar for what our digital presence could be. Deadlines met, expectations exceeded, and a genuine joy to work with.',
    name: 'Sophie Laurent',
    role: 'Director, Monolith',
    avatar: '/images/avatar-4.png',
    rating: 5,
  },
]

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)

  function scroll(dir: 1 | -1) {
    const el = trackRef.current
    if (!el) return
    const amount = Math.min(el.clientWidth * 0.8, 420)
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden border-t border-border py-28 sm:py-36">
      <div className="mx-auto mb-14 max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Testimonials
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-serif text-4xl leading-[1.05] text-balance sm:text-5xl md:text-6xl">
                Trusted by ambitious teams
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => scroll(-1)}
                aria-label="Previous testimonial"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                aria-label="Next testimonial"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4"
      >
        {/* leading spacer to align with max-w container */}
        <div className="hidden shrink-0 lg:block lg:w-[max(0px,calc((100vw-80rem)/2))]" />
        {testimonials.map((t) => (
          <article
            key={t.name}
            className="flex w-[85vw] shrink-0 snap-start flex-col justify-between rounded-3xl border border-border bg-card p-8 sm:w-[440px] sm:p-10"
          >
            <div>
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-foreground text-foreground" />
                ))}
              </div>
              <p className="mt-8 font-serif text-xl leading-snug text-balance sm:text-2xl">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </article>
        ))}
        <div className="shrink-0 pr-2" aria-hidden="true" />
      </div>
    </section>
  )
}
