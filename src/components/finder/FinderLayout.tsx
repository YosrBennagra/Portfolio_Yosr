'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

import FinderWindow from './FinderWindow';
import SidebarNav, { NavSection } from './SidebarNav';
import ContentPane from './ContentPane';
import DetailsPane, { DetailItem } from './DetailsPane';
import {
    AboutContent,
    ProjectsContent,
    CertificatesContent,
    SkillsContent,
    ContactContent,
} from './sections';
import CareerContent from './sections/CareerContent';

import { skills } from '@/data/skills';
import { projects } from '@/data/projects';
import { certificates } from '@/data/certificates';
import { experiences } from '@/data/experience';

const sectionConfig: Record<NavSection, { title: string; subtitle: string; getCount: () => number }> = {
    about: { title: 'About Me', subtitle: 'Personal information', getCount: () => 1 },
    career: { title: 'Career', subtitle: 'Experience & Education', getCount: () => experiences.length },
    projects: { title: 'Projects', subtitle: 'Portfolio work', getCount: () => projects.length },
    certificates: { title: 'Certificates', subtitle: 'Credentials & certifications', getCount: () => certificates.length },
    skills: { title: 'Skills', subtitle: 'Technical expertise', getCount: () => skills.length },
    contact: { title: 'Contact', subtitle: 'Get in touch', getCount: () => 4 },
};

export default function FinderLayout() {
    const [activeSection, setActiveSection] = useState<NavSection>('about');
    const [selectedItem, setSelectedItem] = useState<DetailItem | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDetailsPaneOpen, setIsDetailsPaneOpen] = useState(true);

    const handleSectionChange = useCallback((section: NavSection) => {
        setActiveSection(section);
        setSelectedItem(null);
        setIsMobileMenuOpen(false);
    }, []);

    const handleSelectItem = useCallback((item: DetailItem | null) => {
        setSelectedItem(item);
        if (item) {
            setIsDetailsPaneOpen(true);
        }
    }, []);

    const config = sectionConfig[activeSection];

    const renderContent = () => {
        switch (activeSection) {
            case 'about':
                return <AboutContent />;
            case 'career':
                return <CareerContent onSelectItem={handleSelectItem} selectedId={selectedItem?.id} />;
            case 'projects':
                return <ProjectsContent onSelectItem={handleSelectItem} selectedId={selectedItem?.id} />;
            case 'certificates':
                return <CertificatesContent onSelectItem={handleSelectItem} selectedId={selectedItem?.id} />;
            case 'skills':
                return <SkillsContent onSelectItem={handleSelectItem} selectedId={selectedItem?.id} />;
            case 'contact':
                return <ContactContent />;
            default:
                return null;
        }
    };

    // Determine if details pane should show based on section
    const showDetailsPane = ['career', 'projects', 'certificates', 'skills'].includes(activeSection);

    return (
        <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-400/10 dark:bg-orange-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-400/10 dark:bg-rose-500/5 rounded-full blur-[120px]" />
            </div>

            <FinderWindow title="Yosr Ben Nagra — Portfolio">
                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden absolute top-3 left-16 z-50 p-1.5 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>

                {/* Sidebar - Desktop */}
                <SidebarNav
                    activeSection={activeSection}
                    onSectionChange={handleSectionChange}
                    className="hidden lg:flex"
                />

                {/* Sidebar - Mobile Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="lg:hidden fixed inset-0 bg-black/50 z-40"
                            />
                            <motion.div
                                initial={{ x: -280 }}
                                animate={{ x: 0 }}
                                exit={{ x: -280 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                className="lg:hidden absolute left-0 top-12 bottom-0 z-50"
                            >
                                <SidebarNav
                                    activeSection={activeSection}
                                    onSectionChange={handleSectionChange}
                                    className="h-full shadow-xl"
                                />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Main Content Pane */}
                <ContentPane
                    title={config.title}
                    subtitle={config.subtitle}
                    itemCount={config.getCount()}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </ContentPane>

                {/* Details Pane - Desktop only for relevant sections */}
                {showDetailsPane && (
                    <DetailsPane
                        item={selectedItem}
                        onClose={() => setSelectedItem(null)}
                        className="hidden md:flex"
                    />
                )}
            </FinderWindow>

            {/* Mobile Details Modal */}
            <AnimatePresence>
                {showDetailsPane && selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="md:hidden fixed inset-0 z-50 flex items-end bg-black/50"
                        onClick={() => setSelectedItem(null)}
                    >
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-h-[70vh] rounded-t-2xl bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/10 overflow-hidden"
                        >
                            <div className="w-12 h-1 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mt-3" />
                            <DetailsPane
                                item={selectedItem}
                                onClose={() => setSelectedItem(null)}
                                className="border-l-0 w-full"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
