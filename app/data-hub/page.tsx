'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { POLAR_DATASETS, DatasetItem } from '@/data/polaris-data';
import { DataHubCharts } from '@/components/charts/DataHubCharts';
import { useSavedItems } from '@/context/SavedItemsContext';
import { useToast } from '@/context/ToastContext';
import { downloadDatasetPackage } from '@/utils/downloadUtils';
import { 
  Database, Search, Filter, Download, Eye, FileSpreadsheet, 
  Layers, MapPin, Calendar, HardDrive, Bookmark, Check, ArrowRight, X 
} from 'lucide-react';

export default function DataHubPage() {
  const { isSaved, toggleSave } = useSavedItems();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [activeMetadataModal, setActiveMetadataModal] = useState<DatasetItem | null>(null);

  const domains = ['All', ...Array.from(new Set(POLAR_DATASETS.map((d) => d.domain)))];
  const regions = ['All', ...Array.from(new Set(POLAR_DATASETS.map((d) => d.region)))];
  const formats = ['All', 'NetCDF', 'CSV', 'HDF5'];

  const filteredDatasets = POLAR_DATASETS.filter((ds) => {
    const matchesSearch =
      searchQuery === '' ||
      ds.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ds.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ds.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion = selectedRegion === 'All' || ds.region === selectedRegion;
    const matchesDomain = selectedDomain === 'All' || ds.domain === selectedDomain;
    const matchesFormat = selectedFormat === 'All' || ds.format === selectedFormat;

    return matchesSearch && matchesRegion && matchesDomain && matchesFormat;
  });

  const handleDownload = (ds: DatasetItem) => {
    const filename = downloadDatasetPackage(ds);
    showToast('Download Complete', `Saved "${filename}" (${ds.format}, ${ds.size})`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Open Observational Catalog
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            Scientific Data Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Access multi-decadal glaciological radar profiles, CTD oceanographic casts, high-latitude atmospheric black carbon measurements, and geomagnetic timeseries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
          >
            + Ingest New Dataset
          </Link>
        </div>
      </div>

      {/* Top Telemetry Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-sky-600 dark:text-sky-400">Total Datasets</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">850+</p>
          <span className="text-[11px] text-slate-400">100% Free & Open Access</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">Research Domains</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">12</p>
          <span className="text-[11px] text-slate-400">From Glaciology to Space Physics</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400">Polar Regions</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">3</p>
          <span className="text-[11px] text-slate-400">Antarctic, Arctic & Southern Ocean</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-purple-600 dark:text-purple-400">Observation Records</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">4.2M+</p>
          <span className="text-[11px] text-slate-400">Sub-minute sensor epochs</span>
        </div>
      </div>

      {/* Analytics Visualizations (Recharts) */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Observational Telemetry Visualizations
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
            Polar Data Ingestion & Trends
          </h2>
        </div>

        <DataHubCharts />
      </div>

      {/* Dataset Filter & Table Section */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Searchable Catalog
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
            Scientific Datasets Directory
          </h2>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-sky-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search datasets..."
              className="w-full py-2 pl-9 pr-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
            >
              {regions.map((r) => <option key={r} value={r}>Region: {r}</option>)}
            </select>

            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
            >
              {domains.map((d) => <option key={d} value={d}>Domain: {d}</option>)}
            </select>

            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
            >
              {formats.map((f) => <option key={f} value={f}>Format: {f}</option>)}
            </select>
          </div>
        </div>

        {/* DESKTOP TABLE VIEW (Hidden on Mobile) */}
        <div className="hidden md:block rounded-2xl overflow-hidden border border-slate-200 dark:border-sky-500/20 bg-white dark:bg-slate-900 shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Dataset Title & Code</th>
                <th className="p-4">Region</th>
                <th className="p-4">Research Domain</th>
                <th className="p-4">Year</th>
                <th className="p-4">Format & Size</th>
                <th className="p-4">Access Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredDatasets.map((ds) => {
                const bookmarked = isSaved('dataset', ds.id);

                return (
                  <tr key={ds.id} className="hover:bg-slate-50 dark:hover:bg-slate-850/60 transition-colors">
                    <td className="p-4">
                      <Link href={`/data-hub/${ds.id}`} className="font-bold text-slate-900 dark:text-white hover:text-sky-500 block leading-snug">
                        {ds.title}
                      </Link>
                      <span className="text-[10px] font-mono text-slate-400">{ds.code} • {ds.recordsCount}</span>
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">
                      {ds.region}
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {ds.domain}
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300 font-mono whitespace-nowrap">
                      {ds.year}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{ds.format}</span>
                      <span className="text-slate-400 block text-[10px]">{ds.size}</span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        ● {ds.accessStatus}
                      </span>
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setActiveMetadataModal(ds)}
                          className="p-1.5 text-slate-500 hover:text-sky-500 rounded-lg"
                          title="View Metadata"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownload(ds)}
                          className="p-1.5 text-slate-500 hover:text-emerald-500 rounded-lg"
                          title="Download Dataset"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <Link
                          href={`/data-hub/${ds.id}`}
                          className="px-2.5 py-1 text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white rounded-lg"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* MOBILE STACKED DATASET CARDS (Shown on mobile only) */}
        <div className="md:hidden space-y-3">
          {filteredDatasets.map((ds) => (
            <div
              key={ds.id}
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                  {ds.region}
                </span>
                <span className="text-[10px] font-semibold text-emerald-500">
                  ● {ds.accessStatus}
                </span>
              </div>

              <div>
                <Link href={`/data-hub/${ds.id}`} className="font-bold text-slate-900 dark:text-white text-sm block">
                  {ds.title}
                </Link>
                <p className="text-[10px] font-mono text-slate-400 mt-0.5">{ds.code} • {ds.domain} • {ds.year}</p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="font-mono">{ds.format} ({ds.size})</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveMetadataModal(ds)}
                    className="text-slate-500 hover:text-sky-500 text-xs font-medium"
                  >
                    Metadata
                  </button>
                  <button
                    onClick={() => handleDownload(ds)}
                    className="p-1.5 text-slate-500 hover:text-emerald-500"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <Link
                    href={`/data-hub/${ds.id}`}
                    className="px-3 py-1 bg-sky-600 text-white rounded-lg text-xs font-semibold"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Metadata Quick Inspection Modal */}
      {activeMetadataModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
          onClick={() => setActiveMetadataModal(null)}
        >
          <div
            className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 rounded-2xl shadow-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-sky-600 dark:text-sky-400">
                  ISO-19115 Dataset Metadata Record
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  {activeMetadataModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveMetadataModal(null)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <p>{activeMetadataModal.description}</p>

              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border">
                <div>
                  <span className="text-slate-400 block text-[10px]">Lead Investigator:</span>
                  <span className="font-semibold">{activeMetadataModal.leadInvestigator}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Institution:</span>
                  <span className="font-semibold">{activeMetadataModal.institution}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Bounding Coordinates:</span>
                  <span className="font-mono text-[11px]">{activeMetadataModal.coordinatesBbox}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Temporal Epoch:</span>
                  <span className="font-semibold">{activeMetadataModal.temporalCoverage}</span>
                </div>
              </div>

              <div>
                <span className="font-semibold block mb-1">Measured Variables:</span>
                <div className="flex flex-wrap gap-1">
                  {activeMetadataModal.variables.map((v) => (
                    <span key={v} className="text-[11px] px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <Link
                href={`/data-hub/${activeMetadataModal.id}`}
                className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
              >
                Open Full Interactive Analytics →
              </Link>
              <button
                onClick={() => handleDownload(activeMetadataModal)}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold"
              >
                Download Package ({activeMetadataModal.size})
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
