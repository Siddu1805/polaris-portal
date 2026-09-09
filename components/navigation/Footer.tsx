'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-navy-950 border-t border-slate-200 dark:border-sky-500/20 text-slate-600 dark:text-slate-400 text-sm transition-colors pb-20 lg:pb-12 pt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center text-white font-black text-sm shadow-md">
                ✦
              </div>
              <span className="font-extrabold text-xl tracking-wider text-slate-900 dark:text-white">
                POLARIS
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Polar Science Knowledge & Outreach Portal — A unified platform for discovering polar science, research expeditions, scientific datasets, publications, and scientific content creation.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
                Arctic • Antarctic • Southern Ocean
              </span>
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/#map-section" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Polar World Map</Link></li>
              <li><Link href="/knowledge" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Knowledge Repository</Link></li>
              <li><Link href="/expeditions" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Expedition Explorer</Link></li>
              <li><Link href="/expeditions/timeline" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Polar Journey Timeline</Link></li>
              <li><Link href="/data-hub" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Scientific Data Hub</Link></li>
              <li><Link href="/media" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Polar Media</Link></li>
              <li><Link href="/researchers" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Researchers Directory</Link></li>
              <li><Link href="/classroom" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Polar Classroom</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/knowledge" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Expedition Reports</Link></li>
              <li><Link href="/data-hub" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Open Datasets</Link></li>
              <li><Link href="/knowledge?type=publication" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Peer-Reviewed Papers</Link></li>
              <li><Link href="/stories" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Feature Polar Stories</Link></li>
              <li><Link href="/classroom" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Interactive Science Quiz</Link></li>
            </ul>
          </div>

          {/* Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/studio" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Content Studio</Link></li>
              <li><Link href="/studio/workflow" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Editorial Review</Link></li>
              <li><Link href="/studio/distribute" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Media Dissemination</Link></li>
              <li><Link href="/admin" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Repository Admin</Link></li>
              <li><Link href="/profile" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Researcher Profile</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} POLARIS. Dedicated to Open Polar Science, Knowledge & Outreach.</p>
          <div className="flex items-center gap-6">
            <span className="text-[11px] text-slate-400">Open Access • High-Latitude Research Repository</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
