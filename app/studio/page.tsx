'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ContentGenerator } from '@/components/studio/ContentGenerator';
import { PenTool, ShieldCheck, Globe, ArrowRight } from 'lucide-react';

function StudioContent() {
  const searchParams = useSearchParams();
  const sourceId = searchParams.get('source') || undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Research-to-Public Translation Workspace
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            Polar Content Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Bridge high-latitude research and science outreach. Select verified scientific datasets or voyage reports to generate audience-tailored articles, social explainers, and policy briefs.
          </p>
        </div>

        {/* Sub-navigation links to Workflow & Distribute */}
        <div className="flex items-center gap-2">
          <Link
            href="/studio/workflow"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800 hover:bg-amber-100 transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Editorial Review Kanban →</span>
          </Link>

          <Link
            href="/studio/distribute"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800 hover:bg-sky-100 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>Dissemination Feeds →</span>
          </Link>
        </div>
      </div>

      {/* Main Generator Tool */}
      <ContentGenerator preselectedSourceId={sourceId} />

    </div>
  );
}

export default function StudioPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-xs">Loading Content Studio...</div>}>
      <StudioContent />
    </Suspense>
  );
}
