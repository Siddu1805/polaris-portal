'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  POLAR_DATASETS, POLAR_EXPEDITIONS, POLAR_PUBLICATIONS, DatasetItem 
} from '@/data/polaris-data';
import { DatasetTimeSeriesChart } from '@/components/charts/DatasetTimeSeriesChart';
import { useSavedItems } from '@/context/SavedItemsContext';
import { useToast } from '@/context/ToastContext';
import { downloadDatasetPackage } from '@/utils/downloadUtils';
import { 
  Database, Download, Bookmark, ArrowLeft, Calendar, 
  MapPin, User, FileText, Compass, Copy, Check, PenTool, Layers 
} from 'lucide-react';

export default function DatasetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isSaved, toggleSave } = useSavedItems();
  const { showToast } = useToast();

  const id = params?.id as string;
  const dataset = POLAR_DATASETS.find((d) => d.id === id) || POLAR_DATASETS[0];

  const [copiedCitation, setCopiedCitation] = useState(false);
  const bookmarked = isSaved('dataset', dataset.id);

  // Related expedition
  const expedition = POLAR_EXPEDITIONS.find((e) => e.id === dataset.relatedExpeditionId);

  // Related publications
  const relatedPublications = POLAR_PUBLICATIONS.filter((p) =>
    dataset.relatedPublicationIds?.includes(p.id)
  );

  const handleDownload = () => {
    const filename = downloadDatasetPackage(dataset);
    showToast('Report downloaded successfully', `Saved dataset package: "${filename}"`, 'success');
  };

  const handleCopyCitation = () => {
    navigator.clipboard?.writeText(dataset.citation);
    setCopiedCitation(true);
    showToast('Citation Copied', 'Dataset DOI citation copied to clipboard.', 'success');
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/data-hub"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Scientific Data Hub</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const added = toggleSave('dataset', dataset.id);
              showToast(added ? 'Saved Dataset' : 'Removed Dataset', dataset.title, 'info');
            }}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              bookmarked
                ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
            <span>{bookmarked ? 'Saved' : 'Save'}</span>
          </button>

          <Link
            href={`/studio?source=${dataset.id}`}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white shadow-sm flex items-center gap-1.5"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Outreach Studio</span>
          </Link>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleDownload();
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download ({dataset.format})</span>
          </button>
        </div>
      </div>

      {/* Dataset Header Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            {dataset.format} Archive
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            {dataset.code}
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
            {dataset.region}
          </span>
          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
            ● {dataset.accessStatus}
          </span>
        </div>

        <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
          {dataset.title}
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Principal Investigator: <strong>{dataset.leadInvestigator}</strong> ({dataset.institution})
        </p>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-4xl">
          {dataset.description}
        </p>
      </div>

      {/* Interactive Observation Visualization */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Interactive Time-Series Observation
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              Empirical Sensor Readings: {dataset.parameterName}
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Unit: {dataset.unit}</span>
        </div>

        {/* Chart */}
        <DatasetTimeSeriesChart
          data={dataset.sampleData}
          parameterName={dataset.parameterName}
          secondaryParameterName={dataset.secondaryParameterName}
          unit={dataset.unit}
        />
      </div>

      {/* Grid: Metadata Specifications + Sample Table (2 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sample Observation Table (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Sample Observation Data Records
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="pb-2">Timestamp / Station Interval</th>
                    <th className="pb-2">{dataset.parameterName} ({dataset.unit})</th>
                    {dataset.secondaryParameterName && (
                      <th className="pb-2">{dataset.secondaryParameterName}</th>
                    )}
                    <th className="pb-2 text-right">Data Quality</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {dataset.sampleData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="py-2.5 font-mono text-slate-700 dark:text-slate-300">{row.timestamp}</td>
                      <td className="py-2.5 font-mono font-bold text-sky-600 dark:text-sky-400">{row.value}</td>
                      {dataset.secondaryParameterName && (
                        <td className="py-2.5 font-mono text-cyan-600 dark:text-cyan-400">
                          {row.secondaryValue !== undefined ? row.secondaryValue : '-'}
                        </td>
                      )}
                      <td className="py-2.5 text-right font-mono text-emerald-500">QC_FLAG_PASSED</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Citation Box */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                Data Citation
              </h3>
              <button
                onClick={handleCopyCitation}
                className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
              >
                {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCitation ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 font-mono text-xs text-slate-700 dark:text-slate-300 leading-relaxed border">
              {dataset.citation}
            </p>
          </div>
        </div>

        {/* Metadata Sidebar (1 Col) */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Technical Metadata
            </h3>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div>
                <span className="text-slate-400 block text-[10px]">Research Domain:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{dataset.domain}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">Geographic Coverage:</span>
                <span className="font-mono text-[11px] text-slate-800 dark:text-slate-200">{dataset.coordinatesBbox}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">Time Period:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{dataset.temporalCoverage}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">Format & File Size:</span>
                <span className="font-semibold font-mono text-slate-800 dark:text-slate-200">{dataset.format} ({dataset.size})</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">Observations Count:</span>
                <span className="font-semibold font-mono text-slate-800 dark:text-slate-200">{dataset.recordsCount}</span>
              </div>
            </div>

            {/* Related Expedition */}
            {expedition && (
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-400 block text-[10px]">Collected During:</span>
                <Link
                  href={`/expeditions/${expedition.id}`}
                  className="font-bold text-sky-600 dark:text-sky-400 hover:underline text-xs block"
                >
                  {expedition.name} ({expedition.code})
                </Link>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
