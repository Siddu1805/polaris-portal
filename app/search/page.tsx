'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  POLAR_REPORTS, POLAR_DATASETS, POLAR_EXPEDITIONS, 
  POLAR_RESEARCHERS, POLAR_MEDIA, POLAR_PUBLICATIONS 
} from '@/data/polaris-data';
import { 
  Search, FileText, Database, Compass, Users, 
  Image as ImageIcon, BookOpen, ArrowRight, Tag, Filter, X 
} from 'lucide-react';

function SearchResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const cleanQuery = query.toLowerCase().trim();

  // Categorized matching
  const matchingReports = useMemo(() => {
    if (!cleanQuery) return POLAR_REPORTS.slice(0, 4);
    return POLAR_REPORTS.filter((r) =>
      r.title.toLowerCase().includes(cleanQuery) ||
      r.abstract.toLowerCase().includes(cleanQuery) ||
      r.author.toLowerCase().includes(cleanQuery) ||
      r.researchDomain.toLowerCase().includes(cleanQuery) ||
      r.keywords.some((k) => k.toLowerCase().includes(cleanQuery))
    );
  }, [cleanQuery]);

  const matchingDatasets = useMemo(() => {
    if (!cleanQuery) return POLAR_DATASETS.slice(0, 4);
    return POLAR_DATASETS.filter((d) =>
      d.title.toLowerCase().includes(cleanQuery) ||
      d.domain.toLowerCase().includes(cleanQuery) ||
      d.description.toLowerCase().includes(cleanQuery) ||
      d.variables.some((v) => v.toLowerCase().includes(cleanQuery))
    );
  }, [cleanQuery]);

  const matchingExpeditions = useMemo(() => {
    if (!cleanQuery) return POLAR_EXPEDITIONS.slice(0, 3);
    return POLAR_EXPEDITIONS.filter((e) =>
      e.name.toLowerCase().includes(cleanQuery) ||
      e.code.toLowerCase().includes(cleanQuery) ||
      e.summary.toLowerCase().includes(cleanQuery) ||
      e.region.toLowerCase().includes(cleanQuery)
    );
  }, [cleanQuery]);

  const matchingResearchers = useMemo(() => {
    if (!cleanQuery) return POLAR_RESEARCHERS.slice(0, 3);
    return POLAR_RESEARCHERS.filter((res) =>
      res.name.toLowerCase().includes(cleanQuery) ||
      res.domain.toLowerCase().includes(cleanQuery) ||
      res.institution.toLowerCase().includes(cleanQuery) ||
      res.researchInterests.some((int) => int.toLowerCase().includes(cleanQuery))
    );
  }, [cleanQuery]);

  const matchingMedia = useMemo(() => {
    if (!cleanQuery) return POLAR_MEDIA.slice(0, 4);
    return POLAR_MEDIA.filter((m) =>
      m.title.toLowerCase().includes(cleanQuery) ||
      m.location.toLowerCase().includes(cleanQuery) ||
      m.tags.some((t) => t.toLowerCase().includes(cleanQuery))
    );
  }, [cleanQuery]);

  const totalResults =
    matchingReports.length +
    matchingDatasets.length +
    matchingExpeditions.length +
    matchingResearchers.length +
    matchingMedia.length;

  const suggestedQueries = [
    'Antarctic sea ice research',
    'Kongsfjorden Atlantification',
    'Dronning Maud Land firn cores',
    'Southern Ocean krill acoustic biomass',
    'Maitri seismology',
    'Himadri black carbon'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Search Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
          Global Intelligent Scientific Search
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Explore the Entire Polar Catalog
        </h1>

        {/* Large Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative pt-2">
          <Search className="w-5 h-5 text-sky-500 absolute left-4 top-1/2 -translate-y-1/2 mt-1" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reports, datasets, publications, expeditions, researchers..."
            className="w-full py-3.5 pl-12 pr-24 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 mt-1 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold"
          >
            Search
          </button>
        </form>

        {/* Suggested Searches */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
          <span className="text-xs text-slate-400 mr-1">Suggested:</span>
          {suggestedQueries.map((s) => (
            <button
              key={s}
              onClick={() => {
                setQuery(s);
                router.push(`/search?q=${encodeURIComponent(s)}`);
              }}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-950/50 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs / Filters */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto gap-2">
        <div className="flex items-center gap-1.5">
          {[
            { id: 'All', label: `All Results (${totalResults})` },
            { id: 'reports', label: `Reports (${matchingReports.length})` },
            { id: 'datasets', label: `Datasets (${matchingDatasets.length})` },
            { id: 'expeditions', label: `Expeditions (${matchingExpeditions.length})` },
            { id: 'researchers', label: `Researchers (${matchingResearchers.length})` },
            { id: 'media', label: `Media (${matchingMedia.length})` },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {cleanQuery && (
          <span className="text-xs text-slate-400 whitespace-nowrap hidden sm:inline">
            Showing matches for "<strong>{cleanQuery}</strong>"
          </span>
        )}
      </div>

      {/* Categorized Results */}
      <div className="space-y-10">
        
        {/* 1. Expedition Reports */}
        {(activeCategory === 'All' || activeCategory === 'reports') && matchingReports.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-500" />
                Expedition Reports & Publications ({matchingReports.length})
              </h2>
              <Link href="/knowledge" className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline">
                View Repository →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchingReports.map((r) => (
                <div
                  key={r.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span className="font-bold uppercase text-sky-600 dark:text-sky-400">{r.category}</span>
                      <span>{r.region} • {r.year}</span>
                    </div>
                    <Link href={`/knowledge/${r.id}`} className="font-bold text-sm text-slate-900 dark:text-white hover:text-sky-500 block leading-snug">
                      {r.title}
                    </Link>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{r.author} ({r.institution})</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">{r.abstract}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <Link href={`/knowledge/${r.id}`} className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-1">
                      View Report <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Scientific Datasets */}
        {(activeCategory === 'All' || activeCategory === 'datasets') && matchingDatasets.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-500" />
                Scientific Datasets ({matchingDatasets.length})
              </h2>
              <Link href="/data-hub" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
                View Data Hub →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchingDatasets.map((d) => (
                <div
                  key={d.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span className="font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        {d.format}
                      </span>
                      <span>{d.recordsCount}</span>
                    </div>
                    <Link href={`/data-hub/${d.id}`} className="font-bold text-sm text-slate-900 dark:text-white hover:text-emerald-500 block leading-snug">
                      {d.title}
                    </Link>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{d.domain} • {d.region}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">{d.description}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <Link href={`/data-hub/${d.id}`} className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1">
                      View Dataset Analytics <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Expeditions */}
        {(activeCategory === 'All' || activeCategory === 'expeditions') && matchingExpeditions.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-500" />
              Polar Expeditions ({matchingExpeditions.length})
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {matchingExpeditions.map((e) => (
                <Link
                  key={e.id}
                  href={`/expeditions/${e.id}`}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm hover:shadow-md transition-all space-y-2 block"
                >
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold">
                    {e.code}
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs leading-snug">{e.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{e.region} • Led by {e.leadResearcher}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 4. Researchers */}
        {(activeCategory === 'All' || activeCategory === 'researchers') && matchingResearchers.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-500" />
              Researchers & Faculty ({matchingResearchers.length})
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {matchingResearchers.map((res) => (
                <Link
                  key={res.id}
                  href={`/researchers/${res.id}`}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm hover:shadow-md transition-all flex items-center gap-3.5 block"
                >
                  <img src={res.photo} alt={res.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs">{res.name}</h4>
                    <p className="text-[11px] text-sky-600 dark:text-sky-400">{res.domain}</p>
                    <p className="text-[10px] text-slate-400 truncate max-w-[180px]">{res.institution}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 5. Media */}
        {(activeCategory === 'All' || activeCategory === 'media') && matchingMedia.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-rose-500" />
              Photographs & Visual Media ({matchingMedia.length})
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {matchingMedia.map((m) => (
                <Link
                  key={m.id}
                  href="/media"
                  className="group relative h-36 rounded-xl overflow-hidden cursor-pointer border border-slate-200 dark:border-slate-800"
                >
                  <img src={m.thumbnail} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <p className="text-[11px] font-bold truncate">{m.title}</p>
                    <p className="text-[9px] text-sky-300">{m.type}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-xs">Loading search...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
