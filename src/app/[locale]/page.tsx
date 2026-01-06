import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroAbout from '@/components/sections/HeroAbout';
import SkillsExperience from '@/components/sections/SkillsExperience';
import ProjectsCertificates from '@/components/sections/ProjectsCertificates';
import ContactFooter from '@/components/sections/ContactFooter';
import FloatingHireButton from '@/components/ui/FloatingHireButton';
import SectionDivider from '@/components/ui/SectionDivider';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Header />
      {/* Unique flowing single-page portfolio with side-by-side sections */}
      <HeroAbout />
      <SectionDivider variant="dots" />
      <SkillsExperience />
      <SectionDivider variant="diagonal" />
      <ProjectsCertificates />
      <SectionDivider variant="dots" />
      <ContactFooter />
      <Footer />
      {/* Floating HR-focused hire button */}
      <FloatingHireButton />
    </main>
  );
}
