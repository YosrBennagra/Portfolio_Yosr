'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import {
    User,
    Briefcase,
    FolderKanban,
    Award,
    Wrench,
    Mail,
    LucideIcon,
    Clock
} from 'lucide-react';

export type NavSection = 'about' | 'career' | 'projects' | 'certificates' | 'skills' | 'contact';

interface NavItem {
    id: NavSection;
    label: string;
    icon: LucideIcon;
    color: string;
}

const navItems: NavItem[] = [
    { id: 'about', label: 'About Me', icon: User, color: 'text-blue-500 dark:text-blue-400' },
    { id: 'career', label: 'Career', icon: Clock, color: 'text-orange-500 dark:text-orange-400' },
    { id: 'projects', label: 'Projects', icon: FolderKanban, color: 'text-purple-500 dark:text-purple-400' },
    { id: 'certificates', label: 'Certificates', icon: Award, color: 'text-amber-500 dark:text-amber-400' },
    { id: 'skills', label: 'Skills', icon: Wrench, color: 'text-emerald-500 dark:text-emerald-400' },
    { id: 'contact', label: 'Contact', icon: Mail, color: 'text-cyan-500 dark:text-cyan-400' },
];

interface SidebarNavProps {
    activeSection: NavSection;
    onSectionChange: (section: NavSection) => void;
    className?: string;
}

export default function SidebarNav({ activeSection, onSectionChange, className }: SidebarNavProps) {
    return (
        <nav
            className={clsx(
                'flex flex-col w-52 lg:w-56 flex-shrink-0',
                'bg-slate-50/80 dark:bg-slate-800/50 backdrop-blur-xl',
                'border-r border-slate-200/60 dark:border-white/5',
                'overflow-y-auto',
                className
            )}
            role="navigation"
            aria-label="Portfolio sections"
        >
            {/* Sidebar Header */}
            <div className="px-4 py-3 border-b border-slate-200/40 dark:border-white/5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Favorites
                </p>
            </div>

            {/* Navigation Items */}
            <ul className="flex-1 p-2 space-y-0.5" role="list">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;

                    return (
                        <li key={item.id}>
                            <button
                                onClick={() => onSectionChange(item.id)}
                                className={clsx(
                                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg',
                                    'text-left text-sm font-medium',
                                    'transition-all duration-200',
                                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1',
                                    isActive
                                        ? 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-white/5'
                                )}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <Icon
                                    className={clsx(
                                        'w-4 h-4 flex-shrink-0 transition-transform',
                                        isActive ? item.color : 'text-slate-400 dark:text-slate-500'
                                    )}
                                />
                                <span className="truncate">{item.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500"
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </button>
                        </li>
                    );
                })}
            </ul>

            {/* Sidebar Footer */}
            <div className="px-4 py-3 border-t border-slate-200/40 dark:border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">Available for hire</span>
                </div>
            </div>
        </nav>
    );
}

export { navItems };
export type { NavItem };
