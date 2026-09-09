'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { POLAR_RESEARCHERS, ResearcherItem } from '@/data/polaris-data';
import { Search, Users, Compass, BookOpen, Database, ArrowRight, Mail } from 'lucide-react';

export default function ResearchersDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');

  const domains = ['All', ...Array.from(new Set(POLAR_RESEARCHERS.map((r) => r.domain)))];

  const filteredResearchers = POLAR_RESEARCHERS.filter((res) => {
    const matchesSearch =
      searchQuery === '' ||
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.researchInterests.some((int) => int.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDomain = selectedDomain === 'All' || res.domain === selectedDomain;

    return matchesSearch && matchesDomain;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Scientific Faculty & Expedition Personnel
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            Researchers & Scientists
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Meet the glaciologists, oceanographers, atmospheric physicists, and extremophile biologists leading field campaigns across the polar regions.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-sky-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, interest, institution..."
            className="w-full py-2 pl-9 pr-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 w-full sm:w-auto"
          >
            {domains.map((d) => (
              <option key={d} value={d}>Domain: {d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Researchers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResearchers.map((res) => (
          <div
            key={res.id}
            className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              {/* Profile Photo & Name */}
              <div className="flex items-start gap-4">
                <img
                  src={res.photo}
                  alt={res.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-500/30 group-hover:border-sky-500 transition-colors shadow-md"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                    {res.domain}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {res.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {res.title}
                  </p>
                </div>
              </div>

              {/* Institution */}
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                🏛️ {res.institution}
              </p>

              {/* Bio snippet */}
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {res.bio}
              </p>

              {/* Metrics Count Bar */}
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 dark:border-slate-800 text-center text-[11px]">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">{res.expeditionsCount}</span>
                  <span className="block text-[10px] text-slate-400">Voyages</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">{res.publicationsCount}</span>
                  <span className="block text-[10px] text-slate-400">Papers</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">{res.datasetsCount}</span>
                  <span className="block text-[10px] text-slate-400">Datasets</span>
                </div>
              </div>

              {/* Research Interests */}
              <div className="flex flex-wrap gap-1">
                {res.researchInterests.slice(0, 3).map((int) => (
                  <span
                    key={int}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  >
                    {int}
                  </span>
                ))}
              </div>
            </div>

            {/* Action */}
            <div className="pt-2">
              <Link
                href={`/researchers/${res.id}`}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-600 hover:text-white text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
              >
                <span>View Full Researcher Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
