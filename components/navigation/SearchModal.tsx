'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, FileText, Database, Compass, Users, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { POLAR_REPORTS, POLAR_DATASETS, POLAR_EXPEDITIONS, POLAR_RESEARCHERS, POLAR_MEDIA } from '@/data/polaris-data';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open triggered by parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const matchingReports = cleanQuery
    ? POLAR_REPORTS.filter(
        (r) =>
          r.title.toLowerCase().includes(cleanQuery) ||
          r.abstract.toLowerCase().includes(cleanQuery) ||
          r.researchDomain.toLowerCase().includes(cleanQuery) ||
          r.author.toLowerCase().includes(cleanQuery)
      ).slice(0, 3)
    : [];

  const matchingDatasets = cleanQuery
    ? POLAR_DATASETS.filter(
        (d) =>
          d.title.toLowerCase().includes(cleanQuery) ||
          d.domain.toLowerCase().includes(cleanQuery) ||
          d.description.toLowerCase().includes(cleanQuery)
      ).slice(0, 3)
    : [];

  const matchingExpeditions = cleanQuery
    ? POLAR_EXPEDITIONS.filter(
        (e) =>
          e.name.toLowerCase().includes(cleanQuery) ||
          e.summary.toLowerCase().includes(cleanQuery) ||
          e.region.toLowerCase().includes(cleanQuery)
      ).slice(0, 2)
    : [];

  const matchingResearchers = cleanQuery
    ? POLAR_RESEARCHERS.filter(
        (res) =>
          res.name.toLowerCase().includes(cleanQuery) ||
          res.domain.toLowerCase().includes(cleanQuery) ||
          res.institution.toLowerCase().includes(cleanQuery)
      ).slice(0, 2)
    : [];

  const matchingMedia = cleanQuery
    ? POLAR_MEDIA.filter(
        (m) =>
          m.title.toLowerCase().includes(cleanQuery) ||
          m.tags.some((t) => t.toLowerCase().includes(cleanQuery))
      ).slice(0, 2)
    : [];

  const totalMatches =
    matchingReports.length +
    matchingDatasets.length +
    matchingExpeditions.length +
    matchingResearchers.length +
    matchingMedia.length;

  const navigateTo = (path: string) => {
    onClose();
    router.push(path);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigateTo(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const suggestedQueries = [
    'Antarctic sea ice',
    'Kongsfjorden IndARC',
    'Southern Ocean carbon',
    'Dronning Maud Land ice core',
    'Maitri seismology',
    'Lake Priyadarshini microbiology'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative border-b border-slate-200 dark:border-slate-800 p-4 flex items-center gap-3">
          <Search className="w-5 h-5 text-sky-500 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reports, datasets, publications, expeditions, researchers..."
            className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-base focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 text-xs text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700 rounded-md font-mono"
          >
            ESC
          </button>
        </form>

        {/* Modal Body / Results */}
        <div className="overflow-y-auto p-4 space-y-4">
          {!cleanQuery ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Suggested Scientific Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedQueries.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setQuery(item);
                    }}
                    className="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-sky-50 dark:hover:bg-sky-950/50 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-300 border border-slate-200 dark:border-slate-700/60 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : totalMatches === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-slate-500 dark:text-slate-400">No exact matches found for "{query}".</p>
              <button
                onClick={handleSearchSubmit}
                className="mt-3 text-xs text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-1 font-medium"
              >
                Execute full catalog search for "{query}" <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Reports */}
              {matchingReports.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-2">
                    <FileText className="w-3.5 h-3.5" />
                    Expedition Reports & Publications ({matchingReports.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchingReports.map((r) => (
                      <div
                        key={r.id}
                        onClick={() => navigateTo(`/knowledge/${r.id}`)}
                        className="p-2.5 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-950/50 border border-transparent hover:border-sky-500/20 cursor-pointer transition-all flex items-start justify-between gap-2"
                      >
                        <div>
                          <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 line-clamp-1">{r.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {r.author} • {r.region} • {r.year}
                          </p>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 whitespace-nowrap">
                          {r.researchDomain}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Datasets */}
              {matchingDatasets.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                    <Database className="w-3.5 h-3.5" />
                    Scientific Datasets ({matchingDatasets.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchingDatasets.map((d) => (
                      <div
                        key={d.id}
                        onClick={() => navigateTo(`/data-hub/${d.id}`)}
                        className="p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-transparent hover:border-emerald-500/20 cursor-pointer transition-all flex items-start justify-between gap-2"
                      >
                        <div>
                          <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 line-clamp-1">{d.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {d.domain} • {d.region} • {d.format}
                          </p>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 whitespace-nowrap">
                          {d.format}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Expeditions */}
              {matchingExpeditions.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
                    <Compass className="w-3.5 h-3.5" />
                    Research Expeditions ({matchingExpeditions.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchingExpeditions.map((e) => (
                      <div
                        key={e.id}
                        onClick={() => navigateTo(`/expeditions/${e.id}`)}
                        className="p-2.5 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-transparent hover:border-amber-500/20 cursor-pointer transition-all flex items-start justify-between gap-2"
                      >
                        <div>
                          <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">{e.name}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {e.region} • {e.year} • Led by {e.leadResearcher}
                          </p>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                          {e.code}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Researchers */}
              {matchingResearchers.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2">
                    <Users className="w-3.5 h-3.5" />
                    Researchers & Scientists ({matchingResearchers.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchingResearchers.map((res) => (
                      <div
                        key={res.id}
                        onClick={() => navigateTo(`/researchers/${res.id}`)}
                        className="p-2.5 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/30 border border-transparent hover:border-purple-500/20 cursor-pointer transition-all flex items-start justify-between gap-2"
                      >
                        <div>
                          <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">{res.name}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {res.role} • {res.institution}
                          </p>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                          {res.domain}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Media */}
              {matchingMedia.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
                    <ImageIcon className="w-3.5 h-3.5" />
                    Media Assets ({matchingMedia.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchingMedia.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => navigateTo(`/media`)}
                        className="p-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-transparent hover:border-rose-500/20 cursor-pointer transition-all flex items-center justify-between gap-2"
                      >
                        <div>
                          <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">{m.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {m.type} • {m.location}
                          </p>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                          {m.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Tip: Press <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-mono text-[10px]">Enter</kbd> for full search page</span>
          {query.trim() && (
            <button
              type="button"
              onClick={handleSearchSubmit}
              className="font-semibold text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-1"
            >
              View all results <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
