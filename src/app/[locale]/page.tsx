import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroAbout from '@/components/sections/HeroAbout';
import SkillsExperience from '@/components/sections/SkillsExperience';
import ProjectsCertificates from '@/components/sections/ProjectsCertificates';
import ContactFooter from '@/components/sections/ContactFooter';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Header />
      {/* Unique flowing single-page portfolio with side-by-side sections */}
      <HeroAbout />
      <SkillsExperience />
      <ProjectsCertificates />
      <ContactFooter />
      <Footer />
    </main>
  );
}
