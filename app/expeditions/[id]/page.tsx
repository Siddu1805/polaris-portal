'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  POLAR_EXPEDITIONS, POLAR_REPORTS, POLAR_DATASETS, 
  POLAR_MEDIA, MediaItem 
} from '@/data/polaris-data';
import { useSavedItems } from '@/context/SavedItemsContext';
import { useToast } from '@/context/ToastContext';
import { MediaLightbox } from '@/components/media/MediaLightbox';
import { 
  Compass, Calendar, Clock, User, ArrowLeft, Bookmark, 
  FileText, Database, Image as ImageIcon, Users, CheckCircle2, ChevronRight, PenTool, Download 
} from 'lucide-react';
import { downloadExpeditionReport } from '@/utils/downloadUtils';

export default function ExpeditionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isSaved, toggleSave } = useSavedItems();
  const { showToast } = useToast();

  const id = params?.id as string;
  const expedition = POLAR_EXPEDITIONS.find((e) => e.id === id) || POLAR_EXPEDITIONS[0];

  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const bookmarked = isSaved('expedition', expedition.id);

  // Associated reports
  const reports = POLAR_REPORTS.filter((r) => r.expeditionId === expedition.id);

  // Associated datasets
  const datasets = POLAR_DATASETS.filter((d) => d.relatedExpeditionId === expedition.id);

  // Associated media
  const media = POLAR_MEDIA.filter((m) =>
    m.expedition.toLowerCase().includes(expedition.code.toLowerCase()) ||
    m.expedition.toLowerCase().includes(expedition.name.toLowerCase()) ||
    (expedition.region === m.region && m.year === expedition.year)
  );

  const handleDownloadReport = () => {
    const filename = downloadExpeditionReport(expedition, reports);
    showToast('Report downloaded successfully', `Saved: ${filename}`, 'success');
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Header */}
      <section className="relative min-h-[420px] flex items-end pb-12 bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={expedition.heroImage}
            alt={expedition.name}
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-4">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/expeditions"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Expeditions</span>
            </Link>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleDownloadReport();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 text-slate-950 font-bold text-xs shadow-lg shadow-sky-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Expedition Report</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-sky-900/80 text-sky-300 border border-sky-400/40">
              {expedition.region}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/80 text-slate-300 border border-slate-700">
              {expedition.code}
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              ● {expedition.status}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white max-w-3xl leading-tight">
            {expedition.name}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 pt-2">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-sky-400" />
              <span>Lead Scientist: <strong>{expedition.leadResearcher}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{expedition.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Platform: {expedition.vesselOrBase}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (2 Cols) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Mission Summary */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl space-y-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
                Expedition Overview & Mission Summary
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {expedition.summary}
              </p>

              {/* Research Highlight Badges */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">
                  Core Scientific Domains Investigated:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {expedition.researchDomains.map((dom) => (
                    <span
                      key={dom}
                      className="text-xs px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800"
                    >
                      {dom}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Scientific Objectives */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                Primary Scientific Objectives
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {expedition.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Highlights & Key Achievements */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                Voyage Highlights & Field Milestones
              </h3>
              <div className="space-y-2.5">
                {expedition.highlights.map((hl, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                  >
                    ✦ {hl}
                  </div>
                ))}
              </div>
            </div>

            {/* Associated Expedition Reports */}
            {reports.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-sky-500" />
                    Voyage Scientific Reports ({reports.length})
                  </h3>
                </div>

                <div className="space-y-3">
                  {reports.map((rep) => (
                    <div
                      key={rep.id}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-300">
                            {rep.code}
                          </span>
                          <span className="text-xs text-slate-400">{rep.researchDomain}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {rep.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Lead: {rep.author}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <Link
                          href={`/studio?source=${rep.id}`}
                          className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                        >
                          <PenTool className="w-3 h-3" />
                          Story Studio
                        </Link>
                        <Link
                          href={`/knowledge/${rep.id}`}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white"
                        >
                          Read Report
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Associated Datasets */}
            {datasets.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-500" />
                  Generated Open Datasets ({datasets.length})
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {datasets.map((ds) => (
                    <Link
                      key={ds.id}
                      href={`/data-hub/${ds.id}`}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm hover:shadow-md transition-all space-y-2 block"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                          {ds.format}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{ds.recordsCount}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                        {ds.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                        {ds.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Field Photo Gallery */}
            {media.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-rose-500" />
                  Expedition Media Gallery ({media.length})
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {media.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setSelectedMedia(m)}
                      className="group relative h-36 rounded-xl overflow-hidden cursor-pointer border border-slate-200 dark:border-slate-800"
                    >
                      <img
                        src={m.thumbnail}
                        alt={m.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 text-white">
                        <p className="text-[11px] font-bold truncate leading-tight">{m.title}</p>
                        <p className="text-[9px] text-sky-300">{m.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Expedition Sidebar (1 Col) */}
          <div className="space-y-6">
            
            {/* Quick Metrics */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                Expedition Metadata
              </h3>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div>
                  <span className="text-slate-400 block text-[10px]">Expedition Code:</span>
                  <span className="font-mono font-bold text-sky-600 dark:text-sky-400 text-sm">{expedition.code}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px]">Scientific Personnel:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{expedition.scientistsCount} Researchers</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px]">Vessel / Operational Base:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{expedition.vesselOrBase}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px]">Duration Window:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{expedition.duration}</span>
                </div>
              </div>

              {/* Participating Institutions */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-200 block mb-2">
                  Participating Institutions:
                </span>
                <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                  {expedition.participatingInstitutions.map((inst) => (
                    <li key={inst}>• {inst}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDownloadReport();
                  }}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-sky-600/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Scientific Dossier</span>
                </button>

                <button
                  onClick={() => {
                    const added = toggleSave('expedition', expedition.id);
                    showToast(added ? 'Saved Expedition' : 'Removed Expedition', expedition.name, 'info');
                  }}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs border flex items-center justify-center gap-1.5 transition-colors ${
                    bookmarked
                      ? 'bg-sky-50 dark:bg-sky-950 border-sky-500 text-sky-600 dark:text-sky-400'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                  <span>{bookmarked ? 'Expedition Saved' : 'Save Expedition'}</span>
                </button>
              </div>
            </div>

            {/* Polar Timeline Teaser */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-950 to-navy-900 border border-sky-500/30 text-white shadow-xl space-y-3">
              <h4 className="text-sm font-bold">India's Polar Journey Timeline</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Trace four decades of polar milestones from Operation Gangotri (1981) to modern clean microgrids.
              </p>
              <Link
                href="/expeditions/timeline"
                className="inline-flex items-center gap-1 text-xs font-bold text-sky-300 hover:text-white"
              >
                <span>Explore Historical Timeline</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </div>

      {/* Lightbox */}
      <MediaLightbox
        media={selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />

    </div>
  );
}
