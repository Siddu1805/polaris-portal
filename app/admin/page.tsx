'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  POLAR_REPORTS, POLAR_DATASETS, POLAR_EXPEDITIONS 
} from '@/data/polaris-data';
import { useToast } from '@/context/ToastContext';
import { 
  ShieldCheck, Upload, FileText, Database, CheckCircle2, 
  Clock, Archive, Eye, Trash2, ArrowRight, BarChart3, Plus 
} from 'lucide-react';

export default function AdminPage() {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'overview' | 'upload' | 'repository'>('overview');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    institution: '',
    year: '2024',
    expedition: '43-IAE',
    region: 'Antarctica',
    researchDomain: 'Glaciology',
    keywords: '',
    citation: '',
    license: 'CC BY 4.0'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author) {
      showToast('Validation Failed', 'Please fill in Title and Author fields.', 'alert');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Asset Ingested Successfully', `"${formData.title}" registered with SHA-256 integrity hash.`, 'success');
      setFormData({
        title: '',
        description: '',
        author: '',
        institution: '',
        year: '2024',
        expedition: '43-IAE',
        region: 'Antarctica',
        researchDomain: 'Glaciology',
        keywords: '',
        citation: '',
        license: 'CC BY 4.0'
      });
      setActiveTab('repository');
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Institutional Administration & Ingestion Console
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            Repository Management Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Administer polar research assets, manage open dataset access states, approve pending scientific briefs, and register field documentation.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          {[
            { id: 'overview', label: 'Admin Metrics' },
            { id: 'upload', label: 'Upload Asset' },
            { id: 'repository', label: 'Manage Catalog' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === t.id
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. OVERVIEW DASHBOARD */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Total Assets', value: '1,420', sub: '+18 this month', color: 'text-sky-500' },
              { label: 'Pending Reviews', value: '4', sub: 'In referee queue', color: 'text-amber-500' },
              { label: 'Published Content', value: '88', sub: 'Outreach articles', color: 'text-emerald-500' },
              { label: 'New Datasets', value: '12', sub: 'NetCDF / CSV', color: 'text-cyan-500' },
              { label: 'Publications', value: '1,200+', sub: 'Peer-reviewed', color: 'text-purple-500' },
              { label: 'Media Assets', value: '8,000+', sub: 'Photos & 360°', color: 'text-rose-500' },
            ].map((m, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm space-y-1"
              >
                <span className="text-[10px] font-bold uppercase text-slate-400">{m.label}</span>
                <p className={`text-xl sm:text-2xl font-black ${m.color}`}>{m.value}</p>
                <p className="text-[10px] text-slate-400">{m.sub}</p>
              </div>
            ))}
          </div>

          {/* Activity / Operational Feed */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Recent Scientific Repository Transactions
            </h3>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {[
                { event: 'NetCDF Ingest: Dronning Maud Land Ice Velocity (POL-DAT-2024-001)', time: '12 mins ago', status: 'Completed', user: 'Dr. Vikramaditya Sen' },
                { event: 'DOI Assigned: Kongsfjorden Thermohaline IndARC Monograph', time: '1 hour ago', status: 'Published', user: 'Editorial Office' },
                { event: 'Outreach Draft Submitted: Solar Panels on Antarctic Ice', time: '3 hours ago', status: 'Under Review', user: 'POLARVISION Content Studio' },
                { event: 'Aethalometer Calibration Record Replaced: Himadri Station', time: '1 day ago', status: 'Archived', user: 'Dr. Rajeshwar Nair' },
              ].map((tx, i) => (
                <div key={i} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{tx.event}</p>
                    <p className="text-[11px] text-slate-400">Initiated by {tx.user} • {tx.time}</p>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 self-start sm:self-center">
                    {tx.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 2. UPLOAD ASSET FORM */}
      {activeTab === 'upload' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Open-Access Metadata Ingestion
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              Deposit Polar Research Report or Dataset
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Complete the standardized ISO-19115 compliant metadata record below to register and publish polar scientific assets.
            </p>
          </div>

          <form onSubmit={handleSubmitUpload} className="space-y-4 text-xs">
            {/* Title */}
            <div>
              <label className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">
                Document / Dataset Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Ice Sheet Velocity and Mass Balance of East Antarctica"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">
                Executive Abstract / Dataset Summary *
              </label>
              <textarea
                rows={3}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide empirical abstract, observational methodology, and instrumentation..."
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Author & Institution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">
                  Lead Author / Principal Investigator *
                </label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="e.g., Dr. Vikramaditya Sen"
                  className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">
                  Affiliated Institution *
                </label>
                <input
                  type="text"
                  required
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="e.g., National Polar Knowledge Centre"
                  className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border"
                />
              </div>
            </div>

            {/* Region, Domain, Year, Expedition */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="font-semibold block mb-1">Region</label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border"
                >
                  <option value="Antarctica">Antarctica</option>
                  <option value="Arctic">Arctic</option>
                  <option value="Southern Ocean">Southern Ocean</option>
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">Domain</label>
                <select
                  value={formData.researchDomain}
                  onChange={(e) => setFormData({ ...formData, researchDomain: e.target.value })}
                  className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border"
                >
                  <option value="Glaciology">Glaciology</option>
                  <option value="Oceanography">Oceanography</option>
                  <option value="Atmospheric Science">Atmospheric Science</option>
                  <option value="Microbiology">Microbiology</option>
                  <option value="Geophysics">Geophysics</option>
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">Year</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Expedition</label>
                <select
                  value={formData.expedition}
                  onChange={(e) => setFormData({ ...formData, expedition: e.target.value })}
                  className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border"
                >
                  <option value="43-IAE">43-IAE</option>
                  <option value="42-IAE">42-IAE</option>
                  <option value="ARCTIC-24">ARCTIC-24</option>
                  <option value="SOE-12">SOE-12</option>
                </select>
              </div>
            </div>

            {/* Keywords */}
            <div>
              <label className="font-semibold block mb-1">Keywords (Comma separated)</label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                placeholder="e.g., Ice Sheet, GPS Velocity, Ground Penetrating Radar"
                className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border"
              />
            </div>

            {/* File Drag & Drop Simulation */}
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center space-y-2 hover:border-sky-500 transition-colors">
              <Upload className="w-8 h-8 text-sky-500 mx-auto" />
              <p className="font-semibold text-slate-900 dark:text-white">
                Drag scientific payload here, or browse local files
              </p>
              <p className="text-[11px] text-slate-400">
                Supports PDF, NetCDF (.nc), CSV, HDF5 (.h5), GeoJSON up to 2.5 GB
              </p>
            </div>

            {/* License & Citation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold block mb-1">Open Access License</label>
                <select
                  value={formData.license}
                  onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                  className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border"
                >
                  <option value="CC BY 4.0">Creative Commons Attribution 4.0 (CC BY 4.0)</option>
                  <option value="CC0 1.0">Public Domain Dedication (CC0 1.0)</option>
                  <option value="ODC-By">Open Data Commons Attribution</option>
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">Standard Citation Reference</label>
                <input
                  type="text"
                  value={formData.citation}
                  onChange={(e) => setFormData({ ...formData, citation: e.target.value })}
                  placeholder="Author et al. (2024). POLARVISION Science."
                  className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-sky-600 hover:bg-sky-500 text-white shadow-md disabled:opacity-50"
              >
                {isSubmitting ? 'Ingesting and Verifying SHA-256...' : 'Deposit and Ingest Asset'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. REPOSITORY MANAGEMENT TABLE */}
      {activeTab === 'repository' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Institutional Asset Records ({POLAR_REPORTS.length + POLAR_DATASETS.length})
            </h3>
            <button
              onClick={() => setActiveTab('upload')}
              className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Deposit Asset</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="pb-3">Asset Title & Identifier</th>
                  <th className="pb-3">Domain</th>
                  <th className="pb-3">Author / Lead</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {POLAR_REPORTS.map((rep) => (
                  <tr key={rep.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3">
                      <span className="font-bold text-slate-900 dark:text-white block">{rep.title}</span>
                      <span className="text-[10px] font-mono text-slate-400">{rep.code} • {rep.category}</span>
                    </td>
                    <td className="py-3 font-medium text-slate-600 dark:text-slate-300">{rep.researchDomain}</td>
                    <td className="py-3 text-slate-600 dark:text-slate-300">{rep.author}</td>
                    <td className="py-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                        Published
                      </span>
                    </td>
                    <td className="py-3 text-right space-x-2">
                      <button
                        onClick={() => showToast('Asset Archived', `Asset ${rep.code} archived in cold storage.`, 'warning')}
                        className="text-slate-400 hover:text-amber-500"
                        title="Archive"
                      >
                        <Archive className="w-3.5 h-3.5 inline" />
                      </button>
                      <Link
                        href={`/knowledge/${rep.id}`}
                        className="text-sky-600 dark:text-sky-400 hover:underline font-semibold"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
