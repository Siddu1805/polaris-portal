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
                POLARVISION
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

          {/* Station Directory */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Polar Stations
            </h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-slate-400">Bharati Station</span> <span className="text-[10px] text-sky-500 font-mono">(69°S, Larsemann Hills)</span></li>
              <li><span className="text-slate-400">Maitri Station</span> <span className="text-[10px] text-sky-500 font-mono">(70°S, Schirmacher Oasis)</span></li>
              <li><span className="text-slate-400">Himadri Station</span> <span className="text-[10px] text-sky-500 font-mono">(78°N, Ny-Ålesund, Arctic)</span></li>
              <li><span className="text-slate-400">IndARC Observatory</span> <span className="text-[10px] text-sky-500 font-mono">(Kongsfjorden Mooring)</span></li>
              <li><span className="text-slate-400">Dakshin Gangotri</span> <span className="text-[10px] text-amber-500 font-mono">(Historical Base, 1983)</span></li>
            </ul>
          </div>

        </div>

        {/* Institutional Credits & Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            <p className="font-semibold text-slate-700 dark:text-slate-300">
              POLARVISION — Polar Science Knowledge & Outreach Portal
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Developed in alignment with Indian Polar Science Programmes (National Centre for Polar and Ocean Research - NCPOR, Ministry of Earth Sciences).
            </p>
          </div>
          <div className="text-right">
            <p>© {new Date().getFullYear()} POLARVISION. Open-Access Polar Science & Education Repository.</p>
            <p className="text-[11px] text-slate-400">All data & publications indexed under CC BY 4.0 / Public Domain.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
