import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Experience } from "@/components/sections/experience"
import { Certificates } from "@/components/sections/certificates"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden w-full">
      <Navigation />
      <Hero />
      <About />
      <Skills />
              <Projects />
        <Experience />
        <Certificates />
        <Contact />
      <Footer />
    </main>
  )
}
