'use client'

import { motion } from 'framer-motion'

const nav = {
  Studio: [
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#contact' },
  ],
  Work: [
    { label: 'Featured', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Case Studies', href: '#' },
    { label: 'Archive', href: '#' },
  ],
  Social: [
    { label: 'Instagram', href: '#' },
    { label: 'Behance', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'X / Twitter', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border px-6 pt-20 pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="font-serif text-2xl font-semibold">
              AURELIA
            </a>
            <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              An independent design &amp; technology studio crafting cinematic
              digital experiences for ambitious brands worldwide.
            </p>
          </div>

          {Object.entries(nav).map(([title, items]) => (
            <div key={title}>
              <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {title}
              </h3>
              <ul className="mt-5 space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Oversized wordmark */}
        <div className="mt-20 overflow-hidden">
          <motion.p
            initial={{ y: '30%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="select-none text-center font-serif text-[22vw] font-medium leading-none tracking-tight text-foreground/[0.06] lg:text-[16rem]"
          >
            AURELIA
          </motion.p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} AURELIA Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
