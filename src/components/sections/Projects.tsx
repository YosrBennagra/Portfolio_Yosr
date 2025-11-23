'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { projects } from '@/data/projects';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import type { Project } from '@/types';

type Category = 'all' | 'web' | 'mobile' | 'fullstack';

export default function Projects() {
  const t = useTranslations('projects');
  const locale = useLocale() as 'en' | 'fr' | 'ar';
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const categories: Category[] = ['all', 'web', 'mobile', 'fullstack'];
  
  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-slate-600 dark:text-slate-400"
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {t(`categories.${category}`)}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} locale={locale} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-600 dark:text-slate-400">{t('noProjects')}</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, locale }: { project: Project; locale: 'en' | 'fr' | 'ar' }) {
  const t = useTranslations('projects');

  return (
    <motion.div variants={fadeInUp}>
      <Card hover className="h-full flex flex-col">
        {/* Project Image */}
        <div className="relative w-full h-48 bg-gradient-to-br from-blue-400 to-purple-600">
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <p className="text-sm text-center px-4">
              Add project image to
              <br />
              <code className="text-xs">{project.image}</code>
            </p>
          </div>
          {/* Uncomment when you have images
          <Image
            src={project.image}
            alt={project.title[locale]}
            fill
            className="object-cover"
          />
          */}
        </div>

        {/* Project Info */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            {project.title[locale]}
          </h3>
          
          <p className="text-slate-600 dark:text-slate-400 mb-4 flex-1">
            {project.description[locale]}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="primary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {project.links.demo && (
              <Button
                size="sm"
                className="flex-1 gap-2"
                onClick={() => window.open(project.links.demo, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
                {t('viewDemo')}
              </Button>
            )}
            {project.links.github && (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => window.open(project.links.github, '_blank')}
              >
                <Github className="w-4 h-4" />
                {t('viewCode')}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
