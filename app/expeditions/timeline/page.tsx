'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { POLAR_TIMELINE, TimelineMilestone } from '@/data/polaris-data';
import { Compass, Calendar, ChevronDown, ChevronUp, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

export default function ExpeditionTimelinePage() {
  const [expandedYears, setExpandedYears] = useState<number[]>([1981, 1983, 2008, 2012, 2024]);

  const toggleYear = (year: number) => {
    setExpandedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const expandAll = () => setExpandedYears(POLAR_TIMELINE.map((t) => t.year));
  const collapseAll = () => setExpandedYears([]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-3">
        <Link
          href="/expeditions"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Expeditions</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Four Decades of High-Latitude Science
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
              India's Polar Journey
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              From the historic first landing of Operation Gangotri in 1981 to permanent multi-station year-round observatories in Antarctica, the Arctic, and the Southern Ocean.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              Collapse
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Vertical Timeline */}
      <div className="relative border-l-2 border-sky-500/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
        {POLAR_TIMELINE.map((item, idx) => {
          const isExpanded = expandedYears.includes(item.year);

          return (
            <div key={item.year} className="relative group">
              
              {/* Timeline Marker Dot */}
              <div
                onClick={() => toggleYear(item.year)}
                className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                  isExpanded
                    ? 'bg-sky-500 text-navy-950 ring-4 ring-sky-500/20 shadow-lg scale-110 font-black text-xs'
                    : 'bg-slate-900 border-2 border-sky-500 text-sky-400 font-bold text-[11px]'
                }`}
              >
                ✦
              </div>

              {/* Timeline Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-md hover:shadow-xl transition-all space-y-4">
                
                {/* Header (Clickable to Toggle) */}
                <div
                  onClick={() => toggleYear(item.year)}
                  className="cursor-pointer flex items-start justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm sm:text-base font-black font-mono text-sky-600 dark:text-sky-400">
                        {item.year}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                        {item.region}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.summary}
                </p>

                {/* Expandable Details Area */}
                {isExpanded && (
                  <div className="space-y-4 pt-3 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-200">
                    
                    {/* Image */}
                    <div className="relative h-48 sm:h-64 w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Scientific Objectives */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-1.5">
                        Scientific Objectives:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        {item.scientificObjectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 flex-shrink-0 mt-0.5" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-1.5">
                        Key Historical Milestones:
                      </h4>
                      <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        {item.highlights.map((hl, i) => (
                          <div key={i} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                            ✦ {hl}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Related Knowledge CTA */}
                    <div className="pt-2 flex justify-end">
                      <Link
                        href={`/knowledge?region=${encodeURIComponent(item.region)}`}
                        className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Explore {item.region} scientific publications</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
