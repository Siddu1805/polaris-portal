'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  useSavedItems 
} from '@/context/SavedItemsContext';
import { 
  useWorkflow 
} from '@/context/WorkflowContext';
import { 
  POLAR_REPORTS, POLAR_DATASETS, POLAR_EXPEDITIONS 
} from '@/data/polaris-data';
import { 
  User, Bookmark, FileText, Database, Compass, 
  PenTool, Clock, ArrowRight, Trash2, CheckCircle2 
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function ProfilePage() {
  const { getSavedByType, toggleSave } = useSavedItems();
  const { items: workflowItems } = useWorkflow();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'saved' | 'drafts' | 'activity'>('saved');

  const savedReportIds = getSavedByType('report');
  const savedDatasetIds = getSavedByType('dataset');
  const savedExpeditionIds = getSavedByType('expedition');

  const savedReports = POLAR_REPORTS.filter((r) => savedReportIds.includes(r.id));
  const savedDatasets = POLAR_DATASETS.filter((d) => savedDatasetIds.includes(d.id));
  const savedExpeditions = POLAR_EXPEDITIONS.filter((e) => savedExpeditionIds.includes(e.id));

  const userDrafts = workflowItems.filter((item) => item.status === 'Draft' || item.status === 'Generated');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Profile Identity Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl flex flex-col sm:flex-row items-start gap-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center text-white text-3xl font-black shadow-lg">
          ✦
        </div>

        <div className="flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
              Verified Polar Researcher
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              ID: POLAR-SCI-2024-884
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Dr. Sidharth Sengupta
          </h1>

          <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
            Senior Field Glaciologist & Science Communicator
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            🏛️ National Polar Knowledge & Ocean Research Network • Larsemann Hills Working Group
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex sm:flex-col items-center sm:items-end gap-3 self-stretch sm:self-auto border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-800 pt-4 sm:pt-0 sm:pl-6">
          <div className="text-right">
            <span className="text-xl font-bold text-sky-600 dark:text-sky-400">
              {savedReports.length + savedDatasets.length + savedExpeditions.length}
            </span>
            <span className="block text-[10px] text-slate-400 uppercase font-semibold">Bookmarked Assets</span>
          </div>

          <div className="text-right">
            <span className="text-xl font-bold text-amber-500">
              {userDrafts.length}
            </span>
            <span className="block text-[10px] text-slate-400 uppercase font-semibold">Active Story Drafts</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: 'saved', label: `Saved Library (${savedReports.length + savedDatasets.length + savedExpeditions.length})`, icon: Bookmark },
          { id: 'drafts', label: `My Story Drafts (${userDrafts.length})`, icon: PenTool },
          { id: 'activity', label: 'Recent Field Activity', icon: Clock },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: SAVED LIBRARY */}
      {activeTab === 'saved' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Saved Reports */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-500" />
              Saved Expedition Reports & Monographs ({savedReports.length})
            </h3>

            {savedReports.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No saved reports yet. Explore the Knowledge Repository to bookmark research.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedReports.map((r) => (
                  <div
                    key={r.id}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm flex items-start justify-between gap-3"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-slate-400">{r.region} • {r.year}</span>
                      <Link href={`/knowledge/${r.id}`} className="font-bold text-xs text-slate-900 dark:text-white hover:text-sky-500 block mt-0.5 line-clamp-1">
                        {r.title}
                      </Link>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{r.author}</p>
                    </div>

                    <button
                      onClick={() => toggleSave('report', r.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Saved Datasets */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-500" />
              Saved Observation Datasets ({savedDatasets.length})
            </h3>

            {savedDatasets.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No saved datasets yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedDatasets.map((d) => (
                  <div
                    key={d.id}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm flex items-start justify-between gap-3"
                  >
                    <div>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        {d.format}
                      </span>
                      <Link href={`/data-hub/${d.id}`} className="font-bold text-xs text-slate-900 dark:text-white hover:text-emerald-500 block mt-1 line-clamp-1">
                        {d.title}
                      </Link>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{d.recordsCount}</p>
                    </div>

                    <button
                      onClick={() => toggleSave('dataset', d.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Saved Expeditions */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-500" />
              Saved Expeditions ({savedExpeditions.length})
            </h3>

            {savedExpeditions.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No saved expeditions yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedExpeditions.map((e) => (
                  <div
                    key={e.id}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm flex items-start justify-between gap-3"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">{e.code}</span>
                      <Link href={`/expeditions/${e.id}`} className="font-bold text-xs text-slate-900 dark:text-white hover:text-sky-500 block mt-0.5">
                        {e.name}
                      </Link>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{e.region} • {e.year}</p>
                    </div>

                    <button
                      onClick={() => toggleSave('expedition', e.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 2: MY STORY DRAFTS */}
      {activeTab === 'drafts' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Work In Progress Outreach Articles
            </h3>
            <Link
              href="/studio"
              className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
            >
              + Launch Studio
            </Link>
          </div>

          <div className="space-y-3">
            {userDrafts.map((d) => (
              <div
                key={d.id}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                      {d.contentType}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{d.status}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{d.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Audience: {d.audience} • {d.language}</p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Link
                    href="/studio/workflow"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white"
                  >
                    Editorial Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: RECENT ACTIVITY */}
      {activeTab === 'activity' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl space-y-4 animate-in fade-in duration-200">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Operational Audit Trail
          </h3>

          <div className="space-y-3 text-xs">
            {[
              { text: 'Completed 120m ice core firn analysis at Dronning Maud Land traverse camp', time: 'Yesterday' },
              { text: 'Generated science explainer draft: "Solar Panels on Antarctic Ice"', time: '3 days ago' },
              { text: 'Downloaded NetCDF observation package: Prydz Bay CTD hydrographic profiles', time: '1 week ago' },
              { text: 'Submitted peer review comments on Lake Priyadarshini metagenomic synthesis', time: '2 weeks ago' },
            ].map((act, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-slate-800 dark:text-slate-200">{act.text}</p>
                  <span className="text-[10px] text-slate-400">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
