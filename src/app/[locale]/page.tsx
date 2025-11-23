import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import AdvancedCardNav from '@/components/sections/AdvancedCardNav';
import MagicBento from '@/components/sections/MagicBento';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Certificates from '@/components/sections/Certificates';
import ExperienceSection from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <AdvancedCardNav
        items={[
          {
            label: 'Navigation',
            links: [
              { label: 'Home', href: '#home' },
              { label: 'About', href: '#about' },
              { label: 'Skills', href: '#skills' },
              { label: 'Projects', href: '#projects' },
              { label: 'Certificates', href: '#certificates' },
            ],
            bgColor: 'linear-gradient(135deg,#e0e7ff,#eef2ff)',
          },
          {
            label: 'Highlights',
            links: [
              { label: 'Focus Areas', href: '#focus' },
              { label: 'Experience', href: '#experience' },
              { label: 'Contact', href: '#contact' },
            ],
            bgColor: 'linear-gradient(135deg,#fce7f3,#fff1f2)',
          },
          {
            label: 'Utilities',
            links: [
              { label: 'Theme', href: '#top' },
              { label: 'Language', href: '#top' },
              { label: 'Degree', href: '#about' },
            ],
            bgColor: 'linear-gradient(135deg,#dcfce7,#f0fdf4)',
          },
        ]}
        ctaLabel="Hire Me"
      />
      <Hero />
      <MagicBento />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <ExperienceSection />
      <Contact />
      <Footer />
    </main>
  );
}
