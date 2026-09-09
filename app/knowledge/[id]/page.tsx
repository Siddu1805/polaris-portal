'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  POLAR_REPORTS, POLAR_DATASETS, POLAR_PUBLICATIONS, 
  POLAR_MEDIA, ReportItem, MediaItem 
} from '@/data/polaris-data';
import { useSavedItems } from '@/context/SavedItemsContext';
import { useToast } from '@/context/ToastContext';
import { MediaLightbox } from '@/components/media/MediaLightbox';
import { 
  FileText, Download, Share2, Bookmark, Check, ArrowLeft, 
  Database, BookOpen, Image as ImageIcon, PenTool, Copy, 
  Compass, ExternalLink, Calendar, MapPin, Eye, ChevronRight, Sparkles 
} from 'lucide-react';

export default function DocumentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isSaved, toggleSave } = useSavedItems();
  const { showToast } = useToast();

  const id = params?.id as string;
  const report = POLAR_REPORTS.find((r) => r.id === id) || POLAR_REPORTS[0];

  const [activeTab, setActiveTab] = useState<'preview' | 'findings' | 'citation'>('preview');
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const bookmarked = isSaved('report', report.id);

  // Related datasets
  const relatedDatasets = POLAR_DATASETS.filter((d) =>
    report.relatedDatasetIds?.includes(d.id)
  );

  // Related publications
  const relatedPublications = POLAR_PUBLICATIONS.filter((p) =>
    report.relatedPublicationIds?.includes(p.id)
  );

  // Related media
  const relatedMedia = POLAR_MEDIA.filter((m) =>
    report.relatedMediaIds?.includes(m.id)
  );

  const handleCopyCitation = () => {
    navigator.clipboard?.writeText(report.citation);
    setCopiedCitation(true);
    showToast('Citation Copied', 'Full scientific citation copied to clipboard.', 'success');
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  const handleDownload = () => {
    showToast('Download Initiated', `Downloading ${report.title} (${report.fileSize}, ${report.fileFormat})`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/knowledge"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Knowledge Repository</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const added = toggleSave('report', report.id);
              showToast(added ? 'Saved to Profile' : 'Removed from Profile', report.title, 'info');
            }}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              bookmarked
                ? 'bg-sky-50 dark:bg-sky-950 border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
            <span>{bookmarked ? 'Saved' : 'Save'}</span>
          </button>

          <Link
            href={`/studio?source=${report.id}`}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Send to Content Studio</span>
          </Link>

          <button
            onClick={handleDownload}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download {report.fileFormat}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Document Header & Preview + Metadata Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Main Details & Document Preview (2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Document Header Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
                {report.category}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {report.code}
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                DOI: {report.doi}
              </span>
            </div>

            <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {report.title}
            </h1>

            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1">
              <p>
                <strong>Lead Author:</strong> {report.author} ({report.institution})
              </p>
              {report.coAuthors.length > 0 && (
                <p className="text-slate-500 dark:text-slate-400">
                  <strong>Co-Authors:</strong> {report.coAuthors.join(', ')}
                </p>
              )}
            </div>

            {/* Keywords */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {report.keywords.map((kw) => (
                <span
                  key={kw}
                  className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>

          {/* Document Preview Tabs & Area */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl overflow-hidden">
            
            {/* Tabs Header */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 px-4 pt-2 gap-2 overflow-x-auto">
              {[
                { id: 'preview', label: 'Executive Summary & Abstract', icon: FileText },
                { id: 'findings', label: 'Key Scientific Findings', icon: Sparkles },
                { id: 'citation', label: 'Citation & DOI Reference', icon: BookOpen },
              ].map((t) => {
                const Icon = t.icon;
                const isActive = activeTab === t.id;

                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as any)}
                    className={`flex items-center gap-2 px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
                      isActive
                        ? 'border-sky-500 text-sky-600 dark:text-sky-400 bg-white dark:bg-slate-900 rounded-t-lg'
                        : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {activeTab === 'preview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-2">
                      Scientific Abstract
                    </h3>
                    <p className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800 italic leading-relaxed">
                      "{report.abstract}"
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-2">
                      Executive Field Summary
                    </h3>
                    <p className="leading-relaxed">
                      {report.executiveSummary}
                    </p>
                  </div>

                  {/* Simulated PDF Viewer Frame */}
                  <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-xs">
                        PDF
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white text-xs">Full Document Representation ({report.pages} Pages)</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">High-resolution scientific monograph with high-latitude cartography</p>
                      </div>
                    </div>

                    <button
                      onClick={handleDownload}
                      className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Read / Download ({report.fileSize})
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'findings' && (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                    Peer-Verified Empirical Findings
                  </h3>
                  <div className="space-y-3">
                    {report.keyFindings.map((finding, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                          {finding}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'citation' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                      Standard Citation Formats
                    </h3>
                    <button
                      onClick={handleCopyCitation}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                    >
                      {copiedCitation ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Citation</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 font-mono text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                    {report.citation}
                  </div>

                  {/* BibTeX Snippet */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-300 mb-1.5">BibTeX Record:</h4>
                    <pre className="p-4 rounded-xl bg-slate-950 text-sky-300 font-mono text-[11px] overflow-x-auto">
{`@article{${report.id},
  title = {${report.title}},
  author = {${report.author} and others},
  journal = {POLARIS Scientific Monographs},
  year = {${report.year}},
  doi = {${report.doi}}
}`}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Datasets Section */}
          {relatedDatasets.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-500" />
                  Linked Scientific Datasets ({relatedDatasets.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedDatasets.map((ds) => (
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

          {/* Related Photographs & Videos */}
          {relatedMedia.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-rose-500" />
                Related Photographic & Visual Media ({relatedMedia.length})
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {relatedMedia.map((m) => (
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

        {/* RIGHT COLUMN: Metadata & Expedition Sidebar (1 Col) */}
        <div className="space-y-6">
          
          {/* Expedition Context Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Expedition Details
            </h3>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-2.5">
                <Compass className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Expedition Name:</span>
                  <Link
                    href={`/expeditions/${report.expeditionId}`}
                    className="font-bold text-slate-900 dark:text-white hover:text-sky-500"
                  >
                    {report.expeditionName}
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Geographic Region:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{report.region}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Season / Year:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{report.year}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <BookOpen className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Research Domain:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{report.researchDomain}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
              <Link
                href={`/expeditions/${report.expeditionId}`}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-sky-600 hover:text-white text-slate-800 dark:text-slate-200 transition-colors"
              >
                <span>View Full Expedition Dossier</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Outreach Action Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-950 to-navy-900 border border-sky-500/30 text-white shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase">
              <PenTool className="w-4 h-4" />
              <span>Science Communication</span>
            </div>
            <h4 className="text-sm font-bold leading-snug">
              Turn This Research Into Outreach Content
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Use the Polar Content Studio to translate these findings into educational stories, social carousels, or policy briefs.
            </p>
            <Link
              href={`/studio?source=${report.id}`}
              className="inline-flex items-center justify-center w-full py-2.5 rounded-xl font-bold text-xs bg-sky-500 hover:bg-sky-400 text-navy-950 shadow-md transition-colors"
            >
              Open in Content Studio →
            </Link>
          </div>

        </div>

      </div>

      {/* Lightbox for related media */}
      <MediaLightbox
        media={selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />

    </div>
  );
}
