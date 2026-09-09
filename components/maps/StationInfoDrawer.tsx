'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, MapPin, Compass, BookOpen, Database, Image as ImageIcon, ArrowRight, ExternalLink } from 'lucide-react';
import { ResearchStation, POLAR_EXPEDITIONS, POLAR_DATASETS, POLAR_REPORTS } from '@/data/polaris-data';

interface StationInfoDrawerProps {
  station: ResearchStation | null;
  onClose: () => void;
}

export function StationInfoDrawer({ station, onClose }: StationInfoDrawerProps) {
  if (!station) return null;

  const expeditions = POLAR_EXPEDITIONS.filter((e) =>
    station.associatedExpeditions.includes(e.id)
  );

  const datasets = POLAR_DATASETS.filter((d) =>
    station.associatedDatasets.includes(d.id)
  );

  const reports = POLAR_REPORTS.filter((r) =>
    station.associatedPublications.includes(r.id) ||
    r.expeditionId && station.associatedExpeditions.includes(r.expeditionId)
  );

  return (
    <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-sky-500/20 shadow-2xl z-50 overflow-y-auto p-6 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                {station.region}
              </span>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                ● {station.status}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1.5 leading-snug">
              {station.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-500" />
              {station.coordinates[0]}°, {station.coordinates[1]}° • Elev: {station.elevation}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
            aria-label="Close information drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Station Image */}
        <div className="relative h-44 w-full rounded-xl overflow-hidden my-4 border border-slate-200 dark:border-slate-800 shadow-sm">
          <img
            src={station.image}
            alt={station.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded text-[10px] text-white font-mono">
            Est. {station.established}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>{station.description}</p>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1.5">Scientific Focus Areas:</h4>
            <div className="flex flex-wrap gap-1.5">
              {station.scientificFocus.map((focus) => (
                <span
                  key={focus}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {focus}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1.5">Facilities & Equipment:</h4>
            <ul className="space-y-1 list-disc list-inside text-[11px] text-slate-500 dark:text-slate-400">
              {station.facilities.map((fac) => (
                <li key={fac}>{fac}</li>
              ))}
            </ul>
          </div>

          {/* Associated Expeditions */}
          {expeditions.length > 0 && (
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-slate-100 mb-2">
                <Compass className="w-3.5 h-3.5 text-sky-500" />
                Active Expeditions ({expeditions.length})
              </div>
              <div className="space-y-1.5">
                {expeditions.map((e) => (
                  <Link
                    key={e.id}
                    href={`/expeditions/${e.id}`}
                    className="block p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-50 dark:hover:bg-sky-950/40 border border-slate-200 dark:border-slate-700/60 text-[11px] transition-colors"
                  >
                    <div className="font-medium text-slate-900 dark:text-slate-100">{e.name}</div>
                    <div className="text-slate-500 dark:text-slate-400 text-[10px] mt-0.5">{e.duration}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Associated Datasets */}
          {datasets.length > 0 && (
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-slate-100 mb-2">
                <Database className="w-3.5 h-3.5 text-emerald-500" />
                Linked Observation Datasets ({datasets.length})
              </div>
              <div className="space-y-1.5">
                {datasets.map((d) => (
                  <Link
                    key={d.id}
                    href={`/data-hub/${d.id}`}
                    className="block p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-slate-200 dark:border-slate-700/60 text-[11px] transition-colors"
                  >
                    <div className="font-medium text-slate-900 dark:text-slate-100 line-clamp-1">{d.title}</div>
                    <div className="text-slate-500 dark:text-slate-400 text-[10px] mt-0.5">
                      {d.format} • {d.recordsCount}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Drawer Action */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 flex items-center justify-between">
        <Link
          href={`/knowledge?region=${encodeURIComponent(station.region)}`}
          className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
        >
          View all {station.region} science <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <button
          onClick={onClose}
          className="px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}
