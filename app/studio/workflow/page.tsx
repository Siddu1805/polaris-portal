'use client';

import React from 'react';
import Link from 'next/link';
import { KanbanBoard } from '@/components/studio/KanbanBoard';
import { ArrowLeft, PenTool, Globe, ShieldCheck } from 'lucide-react';

export default function WorkflowPage() {
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

        <div className="flex items-center gap-2">
          <Link
            href="/studio/distribute"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Platform Previews</span>
          </Link>
        </div>
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
          Editorial Governance & Fact Verification
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
          Editorial Review Workflow
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          Manage generated communication drafts through five editorial phases: Draft, Generated, Under Review, Approved, and Published. Ensure high-latitude science is represented with authentic fidelity.
        </p>
      </div>

      {/* Kanban Board Component */}
      <KanbanBoard />

    </div>
  );
}
