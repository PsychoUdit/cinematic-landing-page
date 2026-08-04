import { SmoothScroll } from '@/components/smooth-scroll'
import { CursorFollower } from '@/components/cursor-follower'
import { Loader } from '@/components/loader'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Showcase } from '@/components/showcase'
import { Services } from '@/components/services'
import { About } from '@/components/about'
import { Process } from '@/components/process'
import { FeaturedWork } from '@/components/featured-work'
import { Testimonials } from '@/components/testimonials'
import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <SmoothScroll>
      <Loader />
      <CursorFollower />
      <Navbar />
      <main className="relative">
        <Hero />
        <Showcase />
        <Services />
        <About />
        <Process />
        <FeaturedWork />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
