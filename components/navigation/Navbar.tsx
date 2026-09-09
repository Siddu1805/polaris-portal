'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, Bell, User, Menu, Compass, BookOpen, Navigation, 
  Database, Image as ImageIcon, Users, GraduationCap, PenTool 
} from 'lucide-react';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { SearchModal } from '@/components/navigation/SearchModal';
import { MobileDrawer } from '@/components/navigation/MobileDrawer';
import { useToast } from '@/context/ToastContext';

export function Navbar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { notificationHistory } = useToast();

  const navLinks = [
    { label: 'Explore', href: '/#map-section' },
    { label: 'Knowledge', href: '/knowledge' },
    { label: 'Expeditions', href: '/expeditions' },
    { label: 'Data Hub', href: '/data-hub' },
    { label: 'Media', href: '/media' },
    { label: 'Researchers', href: '/researchers' },
    { label: 'Polar Classroom', href: '/classroom' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-sky-500/20 bg-white/95 dark:bg-navy-900/95 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-cyan-400 flex items-center justify-center text-white font-black text-base shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
                ✦
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-wider text-slate-900 dark:text-white leading-none">
                  POLARIS
                </span>
                <span className="text-[10px] font-semibold tracking-widest text-sky-600 dark:text-sky-400 uppercase leading-tight mt-0.5">
                  Polar Science Portal
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-1 ml-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href) && link.href !== '/#map-section');
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                      isActive
                        ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10 shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Content Studio Flagship Header Action */}
            <Link
              href="/studio"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 dark:hover:text-navy-950 transition-all shadow-sm group"
            >
              <PenTool className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400 group-hover:text-current" />
              <span>Content Studio</span>
            </Link>
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 transition-colors"
              title="Quick Search (Ctrl + K)"
              aria-label="Open search modal"
            >
              <Search className="w-4 h-4 text-sky-500" />
              <span className="hidden md:inline text-slate-600 dark:text-slate-300">Search science catalog...</span>
              <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] bg-white dark:bg-slate-900 rounded font-mono text-slate-400 border border-slate-300 dark:border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-sky-500 ring-2 ring-white dark:ring-navy-900 animate-pulse" />
              </button>

              {/* Notification Popover */}
              {isNotifOpen && (
                <div 
                  className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 rounded-2xl shadow-2xl p-4 z-50 text-xs animate-in fade-in zoom-in-95 duration-150"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-slate-100">Scientific Notifications</span>
                    <span className="text-[10px] text-sky-600 dark:text-sky-400 font-semibold bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded">
                      Live Feed
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-60 overflow-y-auto mt-2">
                    {notificationHistory.map((item) => (
                      <div key={item.id} className="py-2.5">
                        <p className="font-medium text-slate-800 dark:text-slate-200">{item.title}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.message}</p>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 block">
                          {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-800 text-center">
                    <button
                      onClick={() => setIsNotifOpen(false)}
                      className="text-[11px] text-sky-600 dark:text-sky-400 font-medium hover:underline"
                    >
                      Close Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Profile Avatar Link */}
            <Link
              href="/profile"
              className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sky-500 text-slate-700 dark:text-slate-300 hover:text-sky-500 transition-colors flex items-center gap-1.5"
              title="Scientist Profile & Saved Assets"
            >
              <div className="w-6 h-6 rounded-lg bg-sky-100 dark:bg-sky-950 flex items-center justify-center text-sky-600 dark:text-sky-400 font-semibold text-xs">
                <User className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="xl:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </>
  );
}
