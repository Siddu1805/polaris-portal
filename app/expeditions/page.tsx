'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { POLAR_EXPEDITIONS, POLAR_REPORTS, Expedition } from '@/data/polaris-data';
import { Compass, Calendar, Clock, User, ArrowRight, Layers, Navigation, Download } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { downloadExpeditionReport } from '@/utils/downloadUtils';

export default function ExpeditionsPage() {
  const { showToast } = useToast();
  const [selectedRegion, setSelectedRegion] = useState<'All' | 'Antarctica' | 'Arctic' | 'Southern Ocean'>('All');

  const handleDownload = (exp: Expedition) => {
    const reps = POLAR_REPORTS.filter((r) => r.expeditionId === exp.id);
    const filename = downloadExpeditionReport(exp, reps);
    showToast('Report downloaded successfully', `Saved: ${filename}`, 'success');
  };

  const filtered = POLAR_EXPEDITIONS.filter((exp) => {
    if (selectedRegion === 'All') return true;
    return exp.region === selectedRegion;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Scientific Expeditions Catalog
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            Expedition Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Discover landmark scientific voyages to Antarctica, high Arctic marine campaigns from Svalbard, and deep ocean transects through the Southern Ocean.
          </p>
        </div>

        <Link
          href="/expeditions/timeline"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-sky-50 dark:bg-sky-950/80 border border-sky-300 dark:border-sky-800 text-sky-700 dark:text-sky-300 hover:bg-sky-100 transition-colors"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>India's Polar Journey Timeline →</span>
        </Link>
      </div>

      {/* Region Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {(['All', 'Antarctica', 'Arctic', 'Southern Ocean'] as const).map((reg) => (
          <button
            key={reg}
            onClick={() => setSelectedRegion(reg)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedRegion === reg
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20 scale-105'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {reg === 'All' ? 'All Expeditions' : reg}
          </button>
        ))}
      </div>

      {/* Expeditions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((exp) => (
          <div
            key={exp.id}
            className="group rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Image & Badges */}
              <div className="relative h-52 w-full overflow-hidden">
                <img
                  src={exp.heroImage}
                  alt={exp.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-950/80 text-sky-300 border border-sky-400/30 backdrop-blur-sm">
                    {exp.region}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 text-slate-300">
                    {exp.status}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-mono text-sky-300 font-bold">{exp.code}</span>
                  <h3 className="text-base font-bold leading-tight">{exp.name}</h3>
                </div>
              </div>

              {/* Expedition Details */}
              <div className="p-5 space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {exp.summary}
                </p>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-1">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
                    <span>Lead: <strong>{exp.leadResearcher}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    <span className="truncate">{exp.duration}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span className="truncate">{exp.vesselOrBase}</span>
                  </div>
                </div>

                {/* Research Domains */}
                <div className="pt-2">
                  <span className="text-[10px] font-semibold text-slate-400 block mb-1">Research Highlights:</span>
                  <div className="flex flex-wrap gap-1">
                    {exp.researchDomains.map((dom) => (
                      <span
                        key={dom}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        {dom}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-5 pt-0 flex items-center gap-2">
              <Link
                href={`/expeditions/${exp.id}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-600 hover:text-white dark:hover:bg-sky-600 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
              >
                <span>Explore Expedition</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDownload(exp);
                }}
                title={`Download ${exp.code} Report`}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-600 hover:text-white dark:hover:bg-sky-600 text-slate-600 dark:text-slate-300 transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
