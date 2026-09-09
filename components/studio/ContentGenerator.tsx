'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  POLAR_REPORTS, POLAR_DATASETS, ReportItem, DatasetItem 
} from '@/data/polaris-data';
import { 
  useWorkflow, ContentType, TargetAudience, TargetLanguage, WorkflowItem 
} from '@/context/WorkflowContext';
import { useToast } from '@/context/ToastContext';
import { 
  Sparkles, ShieldAlert, CheckCircle2, ArrowRight, BookOpen, 
  Send, RefreshCw, Layers, FileText, Globe, Check 
} from 'lucide-react';

export function ContentGenerator({ preselectedSourceId }: { preselectedSourceId?: string }) {
  const router = useRouter();
  const { generateFromSource, updateStatus } = useWorkflow();
  const { showToast } = useToast();

  const [selectedSourceId, setSelectedSourceId] = useState<string>(
    preselectedSourceId || POLAR_REPORTS[0].id
  );
  const [contentType, setContentType] = useState<ContentType>('Website Article');
  const [audience, setAudience] = useState<TargetAudience>('General Public');
  const [language, setLanguage] = useState<TargetLanguage>('English');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [generatedResult, setGeneratedResult] = useState<WorkflowItem | null>(null);

  const contentTypes: ContentType[] = [
    'Website Article',
    'Social Media Post',
    'Educational Story',
    'Press Brief',
    'Newsletter',
    'Video Script',
  ];

  const audiences: TargetAudience[] = [
    'General Public',
    'Students',
    'Researchers',
    'Teachers',
    'Policymakers',
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedResult(null);

    // Simulated multi-stage generation progress
    setGenerationStep('Extracting scientific empirical findings from source repository...');
    await new Promise((r) => setTimeout(r, 600));

    setGenerationStep(`Aligning terminology for ${audience} audience in ${language}...`);
    await new Promise((r) => setTimeout(r, 700));

    setGenerationStep('Synthesizing peer-reviewed citations and key factual markers...');
    await new Promise((r) => setTimeout(r, 600));

    const result = await generateFromSource(selectedSourceId, contentType, audience, language);
    setGeneratedResult(result);
    setIsGenerating(false);
    showToast('Content Draft Generated', 'Science communication draft generated successfully with source references.', 'success');
  };

  const handleSendForReview = () => {
    if (!generatedResult) return;
    updateStatus(generatedResult.id, 'Under Review');
    showToast('Sent for Scientific Review', 'Item submitted to editorial peer review pipeline.', 'info');
    router.push('/studio/workflow');
  };

  const selectedSource = 
    POLAR_REPORTS.find((r) => r.id === selectedSourceId) ||
    POLAR_DATASETS.find((d) => d.id === selectedSourceId);

  return (
    <div className="space-y-8">
      {/* Workspace Controls Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Advanced Scientific Communication Workspace
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Polar Content Studio Generator
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Select a verified scientific report or dataset to generate audience-tailored science communication with traceable citations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Step 1: Scientific Source */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              1. Scientific Source
            </label>
            <select
              value={selectedSourceId}
              onChange={(e) => setSelectedSourceId(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500"
            >
              <optgroup label="Expedition Reports">
                {POLAR_REPORTS.map((rep) => (
                  <option key={rep.id} value={rep.id}>
                    {rep.title.slice(0, 48)}... ({rep.year})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Observation Datasets">
                {POLAR_DATASETS.map((ds) => (
                  <option key={ds.id} value={ds.id}>
                    {ds.title.slice(0, 48)}... ({ds.format})
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Step 2: Content Type */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              2. Content Type
            </label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value as ContentType)}
              className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500"
            >
              {contentTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Step 3: Target Audience */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              3. Target Audience
            </label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value as TargetAudience)}
              className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500"
            >
              {audiences.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Step 4: Language */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              4. Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as TargetLanguage)}
              className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500"
            >
              <option value="English">English</option>
              <option value="Hindi">हिंदी (Hindi)</option>
            </select>
          </div>
        </div>

        {/* Selected Source Summary Box */}
        {selectedSource && (
          <div className="p-3.5 rounded-xl bg-sky-50/60 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/60 text-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 min-w-0">
              <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400 flex-shrink-0" />
              <div className="truncate">
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {selectedSource.title}
                </span>
                <span className="text-slate-500 dark:text-slate-400 ml-2">
                  ({selectedSource.region} • {selectedSource.year})
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 flex-shrink-0">
              {selectedSource.code}
            </span>
          </div>
        )}

        {/* Generate Button */}
        <div>
          <button
            type="button"
            disabled={isGenerating}
            onClick={handleGenerate}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 text-white shadow-lg shadow-sky-500/25 transition-all disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating Scientific Communication...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Science Story Draft</span>
              </>
            )}
          </button>

          {isGenerating && (
            <p className="text-xs text-sky-600 dark:text-sky-400 mt-2 animate-pulse font-mono">
              ● {generationStep}
            </p>
          )}
        </div>
      </div>

      {/* Generated Content Preview Area */}
      {generatedResult && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl space-y-6 animate-in fade-in duration-300">
          
          {/* Top Review Notice Banner */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
            <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold">Scientific Review Required Prior to Publication</h4>
              <p className="mt-0.5 leading-relaxed text-amber-800 dark:text-amber-300/90">
                To prevent scientific inaccuracies, all generated science communication drafts must be reviewed and vetted by a domain researcher before public dissemination.
              </p>
            </div>
          </div>

          {/* Generated Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                {generatedResult.contentType}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                Audience: {generatedResult.audience}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                Language: {generatedResult.language}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
              {generatedResult.title}
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Lead Investigator: <strong>{generatedResult.author}</strong> • Created: {generatedResult.createdDate}
            </p>
          </div>

          {/* Executive Summary */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
            "{generatedResult.summary}"
          </div>

          {/* Main Body Paragraphs */}
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {generatedResult.content.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Key Facts Highlight Box */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Key Factual Markers:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              {generatedResult.keyFacts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 flex-shrink-0 mt-0.5" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sources Used Citation Cards */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Sources Used & Citations:
            </h4>
            <div className="space-y-1.5">
              {generatedResult.citations.map((cite, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 text-[11px] font-mono text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60"
                >
                  {cite}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Workflow Action Buttons */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSendForReview}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-md transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Submit for Editorial Peer Review
              </button>
              <button
                onClick={() => router.push('/studio/distribute')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-md transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                Dissemination Previews
              </button>
            </div>

            <button
              onClick={() => showToast('Draft Saved', 'Content draft saved to local workspace.', 'info')}
              className="px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Save as Scratch Draft
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
