'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  POLAR_RESEARCHERS, POLAR_EXPEDITIONS, POLAR_REPORTS, 
  POLAR_DATASETS, POLAR_PUBLICATIONS, ResearcherItem 
} from '@/data/polaris-data';
import { 
  ArrowLeft, Mail, ExternalLink, Compass, BookOpen, 
  Database, Award, CheckCircle2, User, FileText 
} from 'lucide-react';

export default function ResearcherProfilePage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;
  const researcher = POLAR_RESEARCHERS.find((r) => r.id === id) || POLAR_RESEARCHERS[0];

  const expeditions = POLAR_EXPEDITIONS.filter((e) =>
    researcher.expeditionIds.includes(e.id) ||
    e.leadResearcher.toLowerCase().includes(researcher.name.toLowerCase())
  );

  const reports = POLAR_REPORTS.filter((r) =>
    r.author.toLowerCase().includes(researcher.name.toLowerCase()) ||
    r.coAuthors.some((co) => co.toLowerCase().includes(researcher.name.toLowerCase()))
  );

  const datasets = POLAR_DATASETS.filter((d) =>
    d.leadInvestigator.toLowerCase().includes(researcher.name.toLowerCase())
  );

  const publications = POLAR_PUBLICATIONS.filter((p) =>
    p.authors.some((a) => a.toLowerCase().includes(researcher.name.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Breadcrumb */}
      <Link
        href="/researchers"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Researchers Directory</span>
      </Link>

      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl flex flex-col md:flex-row items-start gap-6">
        <img
          src={researcher.photo}
          alt={researcher.name}
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-sky-500/30 shadow-lg"
        />

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
              {researcher.domain}
            </span>
            <span className="text-xs font-mono text-slate-400">
              ORCID: {researcher.orcid}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {researcher.name}
          </h1>

          <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
            {researcher.title} • {researcher.institution}
          </p>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl pt-1">
            {researcher.bio}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-sky-500" />
              {researcher.email}
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              {researcher.role}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Research Interests, Expeditions, Publications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Publications, Reports, Datasets */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Authored Reports & Monographs */}
          {reports.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-500" />
                Authored Expedition Reports & Monographs ({reports.length})
              </h2>

              <div className="space-y-3">
                {reports.map((r) => (
                  <div
                    key={r.id}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-slate-400">{r.region} • {r.year}</span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                        {r.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{r.researchDomain}</p>
                    </div>

                    <Link
                      href={`/knowledge/${r.id}`}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white self-end sm:self-center"
                    >
                      Read Report
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Peer-Reviewed Journal Articles */}
          {publications.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                Journal Publications ({publications.length})
              </h2>

              <div className="space-y-3">
                {publications.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm space-y-1.5"
                  >
                    <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400">{p.journal} ({p.year})</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {p.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {p.authors.join(', ')}
                    </p>
                    <span className="text-[10px] font-mono text-slate-400 block">DOI: {p.doi}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Generated Open Datasets */}
          {datasets.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-500" />
                Archived Observation Datasets ({datasets.length})
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {datasets.map((d) => (
                  <Link
                    key={d.id}
                    href={`/data-hub/${d.id}`}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm hover:shadow-md transition-all space-y-2 block"
                  >
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      {d.format}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{d.title}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{d.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right 1 Col: Interests & Expeditions */}
        <div className="space-y-6">
          
          {/* Research Interests */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Research Interests
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {researcher.researchInterests.map((interest) => (
                <span
                  key={interest}
                  className="text-xs px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Expeditions Participated / Led */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Polar Expeditions
            </h3>
            <div className="space-y-2">
              {expeditions.map((e) => (
                <Link
                  key={e.id}
                  href={`/expeditions/${e.id}`}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-50 dark:hover:bg-sky-950/40 border border-slate-200 dark:border-slate-700 block transition-colors text-xs"
                >
                  <p className="font-bold text-slate-900 dark:text-white">{e.name}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">{e.region} • {e.year}</p>
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
