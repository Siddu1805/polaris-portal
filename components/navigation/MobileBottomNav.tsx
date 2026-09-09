'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, BookOpen, Database, PenTool, User } from 'lucide-react';

export function MobileBottomNav() {
  const pathname = usePathname();

  const items = [
    { label: 'Explore', href: '/#map-section', icon: Compass },
    { label: 'Knowledge', href: '/knowledge', icon: BookOpen },
    { label: 'Data Hub', href: '/data-hub', icon: Database },
    { label: 'Studio', href: '/studio', icon: PenTool },
    { label: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-sky-500/20 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 min-w-[56px] ${
                isActive
                  ? 'text-sky-600 dark:text-sky-400 font-semibold scale-105'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-sky-500/10' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
