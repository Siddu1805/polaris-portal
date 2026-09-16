'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  X, Compass, BookOpen, Navigation, Database, Image as ImageIcon, 
  Users, GraduationCap, PenTool, ShieldCheck, User, Search
} from 'lucide-react';
import { ThemeToggle } from '@/components/common/ThemeToggle';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export function MobileDrawer({ isOpen, onClose, onOpenSearch }: MobileDrawerProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  const links = [
    { label: 'Explore World Map', href: '/#map-section', icon: Compass },
    { label: 'Knowledge Repository', href: '/knowledge', icon: BookOpen },
    { label: 'Expeditions', href: '/expeditions', icon: Navigation },
    { label: 'Polar Journey Timeline', href: '/expeditions/timeline', icon: Navigation },
    { label: 'Scientific Data Hub', href: '/data-hub', icon: Database },
    { label: 'Polar Media', href: '/media', icon: ImageIcon },
    { label: 'Researchers & Scientists', href: '/researchers', icon: Users },
    { label: 'Polar Classroom', href: '/classroom', icon: GraduationCap },
    { label: 'Polar Stories', href: '/stories', icon: BookOpen },
    { label: 'Content Studio', href: '/studio', icon: PenTool },
    { label: 'Editorial Review', href: '/studio/workflow', icon: ShieldCheck },
    { label: 'Administration', href: '/admin', icon: ShieldCheck },
    { label: 'My Profile', href: '/profile', icon: User },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white dark:bg-navy-900 border-r border-slate-200 dark:border-sky-500/20 shadow-2xl p-6 overflow-y-auto flex flex-col justify-between z-50">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-200 dark:border-slate-800">
            <Link 
              href="/" 
              onClick={onClose}
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center text-white font-black text-sm shadow-md">
                ✦
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-wider text-slate-900 dark:text-white">
                  POLARVISION
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-sky-600 dark:text-sky-400 font-semibold -mt-1">
                  Polar Knowledge Portal
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Search Button in Drawer */}
          <div className="mt-4">
            <button
              onClick={() => {
                onClose();
                onOpenSearch();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-sm border border-slate-200 dark:border-slate-700/60"
            >
              <Search className="w-4 h-4 text-sky-500" />
              <span>Search repository...</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-5 space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold border border-sky-500/20'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-500' : 'text-slate-400 dark:text-slate-500'}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info in Drawer */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <p className="font-semibold text-slate-700 dark:text-slate-300">POLARVISION Portal</p>
          <p className="text-[11px] mt-0.5">Scientific Exploration & Knowledge Network</p>
        </div>
      </div>
    </div>
  );
}
