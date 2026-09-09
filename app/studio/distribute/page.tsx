'use client';

import React from 'react';
import Link from 'next/link';
import { PlatformPreviews } from '@/components/studio/PlatformPreviews';
import { ArrowLeft, ShieldCheck, PenTool } from 'lucide-react';

export default function DistributePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/studio"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-sky-600 dark:hover:text-sky-400"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Content Studio</span>
        </Link>

        <Link
          href="/studio/workflow"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Editorial Kanban</span>
        </Link>
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
          Cross-Channel Scientific Communication
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
          Content Distribution Previews
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          Transform validated polar scientific research into formatted packages for Website Articles, LinkedIn summaries, Instagram carousels, X (Twitter) threads, and YouTube documentary video scripts.
        </p>
      </div>

      {/* Platform Previews Component */}
      <PlatformPreviews />

    </div>
  );
}
