import { Navigation } from "@/components/Navigation/Navigation";
import { Hero } from "@/components/Hero/Hero";
import { About } from "@/components/About/About";
import { Projects } from "@/components/Projects/Projects";
import { Skills } from "@/components/Skills/Skills";
import { Experience } from "@/components/Experience/Experience";
import { Education } from "@/components/Education/Education";
import { Engagement } from "@/components/Engagement/Engagement";
import { Interests } from "@/components/Interests/Interests";
import { Languages } from "@/components/Languages/Languages";
import { Contact } from "@/components/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";

export default function HomePage() {
  return (
    <>
      <Navigation />

      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Engagement />
        <Interests />
        <Languages />

        <div className="on-night mt-28 bg-night text-paper md:mt-40">
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
}
