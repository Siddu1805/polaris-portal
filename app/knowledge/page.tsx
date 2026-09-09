'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, Filter, LayoutGrid, List, Download, Eye, 
  FileText, Sparkles, PenTool, ExternalLink, Bookmark, Check, X 
} from 'lucide-react';
import { POLAR_REPORTS, ReportItem } from '@/data/polaris-data';
import { useSavedItems } from '@/context/SavedItemsContext';
import { useToast } from '@/context/ToastContext';

export default function KnowledgeRepositoryPage() {
  const { isSaved, toggleSave } = useSavedItems();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Extract unique filter options
  const categories = useMemo(() => ['All', ...Array.from(new Set(POLAR_REPORTS.map((r) => r.category)))], []);
  const regions = useMemo(() => ['All', ...Array.from(new Set(POLAR_REPORTS.map((r) => r.region)))], []);
  const domains = useMemo(() => ['All', ...Array.from(new Set(POLAR_REPORTS.map((r) => r.researchDomain)))], []);
  const years = useMemo(() => ['All', ...Array.from(new Set(POLAR_REPORTS.map((r) => r.year.toString())))], []);

  // Filtered reports
  const filteredReports = useMemo(() => {
    return POLAR_REPORTS.filter((item) => {
      const matchesSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesRegion = selectedRegion === 'All' || item.region === selectedRegion;
      const matchesDomain = selectedDomain === 'All' || item.researchDomain === selectedDomain;
      const matchesYear = selectedYear === 'All' || item.year.toString() === selectedYear;
      const matchesFormat = selectedFormat === 'All' || item.fileFormat === selectedFormat;

      return matchesSearch && matchesCategory && matchesRegion && matchesDomain && matchesYear && matchesFormat;
    });
  }, [searchQuery, selectedCategory, selectedRegion, selectedDomain, selectedYear, selectedFormat]);

  const handleDownload = (report: ReportItem) => {
    showToast('Download Started', `Downloading "${report.title}" (${report.fileSize})`, 'success');
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedRegion('All');
    setSelectedDomain('All');
    setSelectedYear('All');
    setSelectedFormat('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
          Open Access Polar Literature
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
          Knowledge Repository
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          Search and discover expedition reports, peer-reviewed monographs, scientific briefs, and glaciological assessments from high-latitude expeditions.
        </p>
      </div>

      {/* Main Layout: Filters Sidebar (Desktop) + Results Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* DESKTOP FILTERS SIDEBAR */}
        <div className="hidden lg:block p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm space-y-6 sticky top-20">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-sky-500" />
              Repository Filters
            </span>
            <button
              onClick={resetFilters}
              className="text-[11px] text-sky-600 dark:text-sky-400 hover:underline font-medium"
            >
              Reset
            </button>
          </div>

          {/* Region */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Polar Region
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
            >
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Content Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Content Type
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Research Domain */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Research Domain
            </label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
            >
              {domains.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Publication Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* File Format */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              File Format
            </label>
            <div className="flex gap-2">
              {['All', 'PDF', 'DOCX'].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    selectedFormat === fmt
                      ? 'bg-sky-500 text-white border-sky-500'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RESULTS CONTENT AREA (3 COLS) */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Top Search & Controls Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-sky-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by title, author, keyword..."
                className="w-full py-2 pl-9 pr-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* View Mode Switcher & Mobile Filter Trigger */}
            <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
              <button
                onClick={() => setIsFilterDrawerOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                <Filter className="w-3.5 h-3.5 text-sky-500" />
                <span>Filters</span>
              </button>

              <span className="text-xs text-slate-400 hidden md:inline">
                Showing <strong>{filteredReports.length}</strong> items
              </span>

              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-slate-900 text-sky-500 shadow-sm'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-slate-900 text-sky-500 shadow-sm'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Grid / List */}
          {filteredReports.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <FileText className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">No scientific records match your criteria</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Try modifying your search term or clearing applied region and domain filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-sky-600 text-white"
              >
                Clear All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredReports.map((report) => {
                const bookmarked = isSaved('report', report.id);

                return (
                  <div
                    key={report.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm hover:shadow-lg transition-all space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      {/* Tags & Actions */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                          {report.category}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-slate-400">
                            {report.region} • {report.year}
                          </span>
                          <button
                            onClick={() => {
                              const added = toggleSave('report', report.id);
                              showToast(added ? 'Saved to Profile' : 'Removed from Profile', report.title, 'info');
                            }}
                            className={`p-1 rounded-md text-xs transition-colors ${
                              bookmarked ? 'text-sky-500' : 'text-slate-400 hover:text-slate-600'
                            }`}
                            title="Save report"
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Title */}
                      <Link href={`/knowledge/${report.id}`} className="block group">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-snug line-clamp-2">
                          {report.title}
                        </h3>
                      </Link>

                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {report.author} • {report.institution}
                      </p>

                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                        {report.abstract}
                      </p>

                      {/* Keywords */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {report.keywords.slice(0, 3).map((kw) => (
                          <span
                            key={kw}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-[10px] font-mono text-slate-400">
                        {report.fileFormat} • {report.fileSize}
                      </span>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/studio?source=${report.id}`}
                          className="p-1.5 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-lg text-[11px] font-semibold flex items-center gap-1"
                          title="Generate science story in Content Studio"
                        >
                          <PenTool className="w-3 h-3" />
                          <span className="hidden sm:inline">Story Studio</span>
                        </Link>
                        <button
                          onClick={() => handleDownload(report)}
                          className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-sky-500 rounded-lg text-[11px] font-semibold flex items-center gap-1"
                          title="Download report"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <Link
                          href={`/knowledge/${report.id}`}
                          className="px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-semibold text-xs"
                        >
                          View Report
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* LIST VIEW */
            <div className="space-y-3">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                        {report.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {report.region} • {report.year}
                      </span>
                    </div>
                    <Link href={`/knowledge/${report.id}`} className="block">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white hover:text-sky-500 line-clamp-1">
                        {report.title}
                      </h4>
                    </Link>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {report.author} • {report.researchDomain}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <Link
                      href={`/studio?source=${report.id}`}
                      className="text-xs text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <PenTool className="w-3 h-3" />
                      Studio
                    </Link>
                    <button
                      onClick={() => handleDownload(report)}
                      className="p-2 text-slate-500 hover:text-sky-500"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <Link
                      href={`/knowledge/${report.id}`}
                      className="px-3 py-1.5 text-xs font-semibold bg-sky-600 text-white rounded-lg"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* MOBILE FILTER DRAWER */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-xs bg-white dark:bg-slate-900 h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Filter Repository</h3>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold block mb-1">Region</label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border"
                >
                  {regions.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">Content Type</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border"
                >
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">Research Domain</label>
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border"
                >
                  {domains.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border"
                >
                  {years.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>

            <div className="pt-4 border-t flex gap-2">
              <button
                onClick={resetFilters}
                className="flex-1 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800"
              >
                Reset
              </button>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="flex-1 py-2 text-xs font-semibold rounded-lg bg-sky-600 text-white"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
