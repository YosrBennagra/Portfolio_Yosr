'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Monitor, Server, Wrench, LucideIcon, Folder } from 'lucide-react';
import clsx from 'clsx';
import { skills } from '@/data/skills';
import { DetailItem } from '../DetailsPane';
import { DiReact, DiNodejs, DiPython, DiDocker, DiMongodb, DiPostgresql, DiMysql, DiGit, DiJava, DiDjango, DiRedis } from 'react-icons/di';
import { SiTypescript, SiNextdotjs, SiSpringboot, SiNestjs, SiExpress, SiFlask, SiDotnet, SiGraphql, SiJest, SiJunit5, SiJenkins, SiSonarqube, SiGrafana, SiPrometheus, SiGithubactions, SiHuggingface, SiNeo4J, SiRedis, SiKubernetes, SiAngular } from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { IconType } from 'react-icons';

type Category = 'frontend' | 'backend' | 'tools';

const SECTION_META: Record<Category, { accent: string; icon: LucideIcon; folderColor: string }> = {
    frontend: {
        accent: 'from-blue-400 to-blue-600',
        icon: Monitor,
        folderColor: 'text-blue-500'
    },
    backend: {
        accent: 'from-green-400 to-emerald-600',
        icon: Server,
        folderColor: 'text-green-500'
    },
    tools: {
        accent: 'from-orange-400 to-rose-500',
        icon: Wrench,
        folderColor: 'text-orange-500'
    }
};

const SKILL_ICONS: Record<string, { icon: IconType; color: string }> = {
    'React': { icon: DiReact, color: 'text-cyan-400' },
    'TypeScript': { icon: SiTypescript, color: 'text-blue-500' },
    'Angular': { icon: SiAngular, color: 'text-red-500' },
    'Next.js': { icon: SiNextdotjs, color: 'text-slate-800 dark:text-white' },
    'Spring Boot': { icon: SiSpringboot, color: 'text-green-500' },
    'NestJS': { icon: SiNestjs, color: 'text-red-500' },
    'Node.js': { icon: DiNodejs, color: 'text-green-500' },
    'Express': { icon: SiExpress, color: 'text-slate-700 dark:text-slate-300' },
    'Python/Flask': { icon: DiPython, color: 'text-yellow-500' },
    'Django': { icon: DiDjango, color: 'text-green-700' },
    'Java': { icon: DiJava, color: 'text-red-600' },
    'C#': { icon: TbBrandCSharp, color: 'text-purple-600' },
    'ASP.NET Core': { icon: SiDotnet, color: 'text-purple-500' },
    'GraphQL': { icon: SiGraphql, color: 'text-pink-500' },
    'PostgreSQL': { icon: DiPostgresql, color: 'text-blue-600' },
    'MongoDB': { icon: DiMongodb, color: 'text-green-500' },
    'MySQL': { icon: DiMysql, color: 'text-blue-500' },
    'Neo4j': { icon: SiNeo4J, color: 'text-blue-400' },
    'Redis': { icon: DiRedis, color: 'text-red-500' },
    'SQL Server': { icon: DiMysql, color: 'text-red-600' },
    'Docker': { icon: DiDocker, color: 'text-blue-400' },
    'Git': { icon: DiGit, color: 'text-orange-500' },
    'Jenkins': { icon: SiJenkins, color: 'text-red-500' },
    'SonarQube': { icon: SiSonarqube, color: 'text-blue-500' },
    'Grafana': { icon: SiGrafana, color: 'text-orange-500' },
    'Prometheus': { icon: SiPrometheus, color: 'text-orange-600' },
    'GitHub Actions': { icon: SiGithubactions, color: 'text-blue-500' },
    'Jest': { icon: SiJest, color: 'text-red-600' },
    'JUnit': { icon: SiJunit5, color: 'text-green-600' },
    'Hugging Face': { icon: SiHuggingface, color: 'text-yellow-500' },
};

const EXPERT_SKILLS = new Set([
    'React', 'TypeScript', 'Next.js', 'Spring Boot', 'NestJS', 'Node.js',
    'Express', 'RESTful APIs', 'Python/Flask', 'MongoDB', 'MySQL', 'NoSQL',
    'PostgreSQL', 'Jenkins', 'SonarQube', 'Grafana', 'Prometheus',
    'Unit Testing', 'GitHub Actions', 'CI/CD Pipelines', 'Docker', 'AI Fine-Tuning'
]);

interface SkillsContentProps {
    onSelectItem?: (item: DetailItem | null) => void;
    selectedId?: string | null;
    viewMode?: 'grid' | 'list';
}

export default function SkillsContent({ onSelectItem, selectedId, viewMode = 'grid' }: SkillsContentProps) {
    const t = useTranslations('skills');

    const skillsByCategory = {
        frontend: skills.filter(s => s.category === 'frontend').sort((a, b) => b.level - a.level),
        backend: skills.filter(s => s.category === 'backend').sort((a, b) => b.level - a.level),
        tools: skills.filter(s => s.category === 'tools').sort((a, b) => b.level - a.level),
    };

    const handleSelect = (skill: typeof skills[0]) => {
        const isExpert = EXPERT_SKILLS.has(skill.name) || skill.level >= 92;
        const item: DetailItem = {
            id: skill.name,
            title: skill.name,
            subtitle: t(`categories.${skill.category}`),
            description: isExpert
                ? 'Expert-level proficiency with extensive real-world experience.'
                : 'Solid working knowledge with practical project experience.',
            tags: [skill.category, isExpert ? 'Expert' : 'Proficient'],
            metadata: [
                { label: 'Category', value: t(`categories.${skill.category}`) },
                { label: 'Proficiency', value: `${skill.level}%` },
                { label: 'Level', value: isExpert ? 'Expert' : 'Proficient' },
            ],
            type: 'skill',
        };
        onSelectItem?.(item);
    };

    if (viewMode === 'grid') {
        return (
            <div className="h-full overflow-auto p-2">
                {/* Finder-style icon grid */}
                <div className="space-y-4">
                    {(['frontend', 'backend', 'tools'] as Category[]).map((category, catIndex) => {
                        const meta = SECTION_META[category];
                        const categorySkills = skillsByCategory[category];

                        return (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: catIndex * 0.05 }}
                            >
                                {/* Category folder header - macOS style */}
                                <div className="flex items-center gap-1.5 px-1 mb-2">
                                    <Folder className={clsx('w-4 h-4', meta.folderColor)} />
                                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        {t(`categories.${category}`)}
                                    </span>
                                    <span className="text-[10px] text-slate-400 dark:text-slate-500">
                                        ({categorySkills.length})
                                    </span>
                                </div>

                                {/* Tight icon grid - macOS Finder style */}
                                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-1">
                                    {categorySkills.map((skill, index) => {
                                        const isExpert = EXPERT_SKILLS.has(skill.name) || skill.level >= 92;
                                        const isSelected = selectedId === skill.name;
                                        const skillData = SKILL_ICONS[skill.name];
                                        const SkillIcon = skillData?.icon;
                                        const iconColor = skillData?.color || 'text-slate-500';

                                        return (
                                            <motion.button
                                                key={skill.name}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: catIndex * 0.05 + index * 0.01 }}
                                                onClick={() => handleSelect(skill)}
                                                className={clsx(
                                                    'group relative flex flex-col items-center p-2 rounded-xl transition-all',
                                                    'focus:outline-none',
                                                    isSelected
                                                        ? 'bg-blue-500/20 ring-1 ring-blue-500/50'
                                                        : 'hover:bg-slate-100 dark:hover:bg-white/10'
                                                )}
                                            >
                                                {/* Icon container */}
                                                <div className={clsx(
                                                    'relative w-12 h-12 rounded-xl flex items-center justify-center mb-1.5',
                                                    'bg-gradient-to-br from-white to-slate-100 dark:from-slate-700 dark:to-slate-800',
                                                    'shadow-md group-hover:shadow-lg transition-all border border-slate-200/50 dark:border-white/10',
                                                    isSelected && 'ring-2 ring-blue-500'
                                                )}>
                                                    {SkillIcon ? (
                                                        <SkillIcon className={clsx(
                                                            'w-6 h-6 transition-transform group-hover:scale-110',
                                                            iconColor
                                                        )} />
                                                    ) : (
                                                        <div className="w-6 h-6 rounded bg-gradient-to-br from-slate-300 to-slate-400" />
                                                    )}
                                                    {/* Expert badge */}
                                                    {isExpert && (
                                                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm">
                                                            <span className="text-[7px] text-white font-bold">★</span>
                                                        </div>
                                                    )}
                                                </div>
                                                {/* Label */}
                                                <span className={clsx(
                                                    'text-[9px] text-center leading-tight line-clamp-2 max-w-[52px]',
                                                    isSelected
                                                        ? 'text-blue-600 dark:text-blue-400 font-medium'
                                                        : 'text-slate-600 dark:text-slate-400'
                                                )}>
                                                    {skill.name}
                                                </span>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // List view - Finder column style
    return (
        <div className="h-full overflow-auto">
            {(['frontend', 'backend', 'tools'] as Category[]).map((category, catIndex) => {
                const meta = SECTION_META[category];
                const categorySkills = skillsByCategory[category];

                return (
                    <div key={category} className="border-b border-slate-200 dark:border-white/5 last:border-b-0">
                        {/* Category header */}
                        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50/50 dark:bg-white/[0.02] sticky top-0 backdrop-blur-sm">
                            <Folder className={clsx('w-4 h-4', meta.folderColor)} />
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                                {t(`categories.${category}`)}
                            </span>
                            <span className="text-[10px] text-slate-400 ml-auto">{categorySkills.length} items</span>
                        </div>

                        {/* Skills list */}
                        <div className="divide-y divide-slate-100 dark:divide-white/5">
                            {categorySkills.map((skill) => {
                                const isExpert = EXPERT_SKILLS.has(skill.name) || skill.level >= 92;
                                const isSelected = selectedId === skill.name;
                                const skillData = SKILL_ICONS[skill.name];
                                const SkillIcon = skillData?.icon;
                                const iconColor = skillData?.color || 'text-slate-500';

                                return (
                                    <button
                                        key={skill.name}
                                        onClick={() => handleSelect(skill)}
                                        className={clsx(
                                            'w-full flex items-center gap-3 px-3 py-2 text-left transition-colors',
                                            isSelected
                                                ? 'bg-blue-500/10 dark:bg-blue-500/20'
                                                : 'hover:bg-slate-50 dark:hover:bg-white/5'
                                        )}
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                                            {SkillIcon ? (
                                                <SkillIcon className={clsx('w-4 h-4', iconColor)} />
                                            ) : (
                                                <div className="w-4 h-4 rounded bg-slate-300" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={clsx(
                                                'text-sm font-medium truncate',
                                                isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200'
                                            )}>
                                                {skill.name}
                                            </p>
                                            <p className="text-[10px] text-slate-400">{skill.level}% proficiency</p>
                                        </div>
                                        {isExpert && (
                                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-medium">
                                                Expert
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
