import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { BackgroundFX, CustomCursor, Preloader, ScrollProgress } from "@/components/ui/effects";

export default function Home() {
  return (
    <div className="relative min-h-screen text-foreground">
      <Preloader />
      <BackgroundFX />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main id="top" className="relative">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
