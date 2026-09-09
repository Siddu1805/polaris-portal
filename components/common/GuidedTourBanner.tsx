'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, ArrowRight, CheckCircle2, ChevronRight, X } from 'lucide-react';

export function GuidedTourBanner() {
  const [isOpen, setIsOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isOpen) return null;

  const steps = [
    { num: 1, name: 'Search', link: '/search?q=Antarctic+sea+ice' },
    { num: 2, name: 'Expedition', link: '/expeditions/exp-43-iae' },
    { num: 3, name: 'Report', link: '/knowledge/rep-43-01' },
    { num: 4, name: 'Dataset', link: '/data-hub/ds-ice-01' },
    { num: 5, name: 'Polar Map', link: '/#map-section' },
    { num: 6, name: 'Content Studio', link: '/studio' },
    { num: 7, name: 'Editorial Review', link: '/studio/workflow' },
    { num: 8, name: 'Disseminate', link: '/studio/distribute' },
  ];

  return (
    <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-navy-900 border-b border-sky-500/20 text-slate-100 text-xs py-1.5 px-3 sm:px-4 relative z-30 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5 md:gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center md:justify-start">
          <span className="flex items-center gap-1 font-semibold text-sky-400 uppercase tracking-wider text-[10px] sm:text-[11px] bg-sky-950/80 px-1.5 sm:px-2 py-0.5 rounded border border-sky-500/30">
            <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin" style={{ animationDuration: '16s' }} />
            Scientific Workflow Journey
          </span>
          <span className="text-slate-300 hidden sm:inline">
            Follow the complete research-to-dissemination lifecycle:
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sky-300 hover:text-white underline font-medium ml-1 inline-flex items-center gap-0.5"
          >
            {isExpanded ? 'Hide Steps' : 'Explore Steps'}
            <ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/studio"
            className="inline-flex items-center gap-1 text-sky-300 hover:text-sky-100 font-semibold bg-sky-900/60 hover:bg-sky-850 px-2.5 py-1 rounded-md border border-sky-400/30 transition-colors text-[11px]"
          >
            Open Content Studio
            <ArrowRight className="w-3 h-3" />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white p-1"
            title="Dismiss"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-sky-900/50 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 pb-1">
          {steps.map((step) => (
            <Link
              key={step.num}
              href={step.link}
              className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-900/60 hover:bg-sky-950 border border-slate-800 hover:border-sky-500/40 text-slate-300 hover:text-white transition-all text-[11px]"
            >
              <span className="w-4 h-4 rounded-full bg-sky-900/80 text-sky-300 flex items-center justify-center font-bold text-[9px]">
                {step.num}
              </span>
              <span className="truncate">{step.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
