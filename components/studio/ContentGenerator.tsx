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
  Send, RefreshCw, Layers, FileText, Globe, Check, Copy, 
  Download, Share2, ExternalLink, Image as ImageIcon 
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

  const handleCopyCaption = async () => {
    if (!generatedResult) return;
    const textToCopy = `${generatedResult.socialHook || generatedResult.title}\n\n${generatedResult.socialCaption || generatedResult.summary}\n\n${(generatedResult.hashtags || []).join(' ')}\n\nSource: ${generatedResult.sourceReportTitle} (POLARVISION)`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      showToast('Caption Copied', 'Social post caption and hashtags copied to clipboard.', 'success');
    } catch {
      showToast('Copy Failed', 'Could not copy to clipboard directly.', 'alert');
    }
  };

  const handleShareWhatsApp = () => {
    if (!generatedResult) return;
    const text = `${generatedResult.socialHook || generatedResult.title}\n\n${generatedResult.socialCaption || generatedResult.summary}\n\n${(generatedResult.hashtags || []).join(' ')}\n\nSource: ${generatedResult.sourceReportTitle} (POLARVISION)`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast('Opening WhatsApp', 'Prepared social post caption for WhatsApp sharing.', 'info');
  };

  const handleShareX = () => {
    if (!generatedResult) return;
    const text = `${generatedResult.socialHook || generatedResult.title}\n\n${generatedResult.socialCaption || generatedResult.summary}\n\n${(generatedResult.hashtags || []).join(' ')}`;
    const url = `https://x.com/intent/post?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast('Opening X Composer', 'Standard post composer opened with pre-filled scientific text.', 'info');
  };

  const handleShareInstagram = async () => {
    if (!generatedResult) return;
    const textToCopy = `${generatedResult.socialHook || generatedResult.title}\n\n${generatedResult.socialCaption || generatedResult.summary}\n\n${(generatedResult.hashtags || []).join(' ')}\n\nSource: ${generatedResult.sourceReportTitle} • POLARVISION`;
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch {}

    if (generatedResult.suggestedImage?.url) {
      const a = document.createElement('a');
      a.href = generatedResult.suggestedImage.url;
      a.download = `polarvision-social-${generatedResult.sourceReportId}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    if (typeof navigator !== 'undefined' && navigator.share && window.innerWidth < 768) {
      try {
        await navigator.share({
          title: generatedResult.title,
          text: textToCopy
        });
        showToast('Shared via Mobile', 'Caption copied — paste it into your Instagram post.', 'success');
        return;
      } catch {}
    }

    window.open('https://www.instagram.com', '_blank', 'noopener,noreferrer');
    showToast('Caption Copied for Instagram', 'Caption copied — paste it into your Instagram post.', 'info');
  };

  const handleShareThreads = async () => {
    if (!generatedResult) return;
    const text = `${generatedResult.socialHook || generatedResult.title}\n\n${generatedResult.socialCaption || generatedResult.summary}\n\n${(generatedResult.hashtags || []).join(' ')}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
    const url = `https://threads.net/intent/post?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast('Opening Threads', 'Caption copied and composer opened.', 'info');
  };

  const handleDownloadImage = () => {
    if (!generatedResult?.suggestedImage?.url) return;
    const a = document.createElement('a');
    a.href = generatedResult.suggestedImage.url;
    a.download = `polarvision-image-${generatedResult.sourceReportId}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Image Downloaded', `Saved ${generatedResult.suggestedImage.title}`, 'success');
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

          {generatedResult.contentType === 'Social Media Post' ? (
            /* ========================================================= */
            /* SOCIAL MEDIA POST PACKAGE & SOCIAL SHARING CARD           */
            /* ========================================================= */
            <div className="space-y-8">
              
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
                    📱 Social Media Post Package
                  </span>
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    Audience: {generatedResult.audience}
                  </span>
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    Language: {generatedResult.language}
                  </span>
                </div>

                {/* Character Counter */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  <span>Character Count: <strong>{generatedResult.characterCount || 240}</strong></span>
                  <span className="text-emerald-500 font-bold">• Ready for X / Instagram / Threads</span>
                </div>
              </div>

              {/* Social Card Preview */}
              <div className="max-w-2xl mx-auto rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-sky-500/30 overflow-hidden shadow-2xl">
                
                {/* Author Bar */}
                <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center text-white font-black text-sm shadow-md">
                      ✦
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-slate-900 dark:text-white">POLARVISION Science Outreach</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 inline" />
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">@polarvision • Verified Research Portal</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">Just now</span>
                </div>

                {/* Real Polar Image Preview */}
                {generatedResult.suggestedImage && (
                  <div className="relative aspect-video w-full bg-slate-900 overflow-hidden group">
                    <img 
                      src={generatedResult.suggestedImage.url} 
                      alt={generatedResult.suggestedImage.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white/90">
                      <span className="font-semibold drop-shadow">{generatedResult.suggestedImage.title}</span>
                      <span className="text-[10px] text-sky-200/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                        {generatedResult.suggestedImage.credit}
                      </span>
                    </div>
                  </div>
                )}

                {/* Post Body Content */}
                <div className="p-5 sm:p-6 space-y-4">
                  
                  {/* Hook */}
                  <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
                    {generatedResult.socialHook || generatedResult.title}
                  </h4>

                  {/* Caption */}
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {generatedResult.socialCaption || generatedResult.summary}
                  </p>

                  {/* Key Scientific Information */}
                  {generatedResult.keyFacts && generatedResult.keyFacts.length > 0 && (
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                        Key Scientific Findings:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                        {generatedResult.keyFacts.map((fact, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-sky-500 font-bold">•</span>
                            <span>{fact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Hashtags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {(generatedResult.hashtags || ['#PolarVision', '#PolarScience', '#ClimateResearch', '#Antarctica']).map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Traceable Source Citation */}
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                    <p className="font-semibold text-slate-700 dark:text-slate-300">
                      Scientific Source: {generatedResult.sourceReportTitle}
                    </p>
                    <p className="font-mono text-[10px] text-slate-400">
                      Lead Investigator: {generatedResult.author} • POLARVISION Knowledge Repository ID: {generatedResult.sourceReportId}
                    </p>
                  </div>
                </div>

                {/* Card Direct Controls */}
                <div className="px-5 py-3.5 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={handleCopyCaption}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5 text-sky-500" />
                    <span>Copy Caption</span>
                  </button>

                  {generatedResult.suggestedImage && (
                    <button
                      type="button"
                      onClick={handleDownloadImage}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-sky-500" />
                      <span>Download Media</span>
                    </button>
                  )}

                  <span className="text-[10px] text-slate-400 font-mono">
                    Official Public Domain Polar Photo Included
                  </span>
                </div>
              </div>

              {/* ========================================================= */}
              {/* "SHARE THIS STORY" SOCIAL BUTTONS SECTION                 */}
              {/* ========================================================= */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-sky-50/40 dark:from-slate-950 dark:to-sky-950/20 border border-sky-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-500">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                        Share This Story
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Launch directly to connected social channels or trigger assisted outreach workflows.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
                  
                  {/* WhatsApp */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-sm">
                        💬
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-slate-900 dark:text-white">WhatsApp</h5>
                        <span className="text-[10px] text-slate-400">Chats & Broadcasts</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                      Pre-fills caption with scientific findings & link.
                    </p>
                    <button
                      type="button"
                      onClick={handleShareWhatsApp}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Share on WhatsApp</span>
                    </button>
                  </div>

                  {/* X (Twitter) */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 transition-all flex flex-col justify-between space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 text-white dark:bg-slate-800 flex items-center justify-center font-black text-xs">
                        𝕏
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-slate-900 dark:text-white">X (Twitter)</h5>
                        <span className="text-[10px] text-slate-400">Composer Pre-fill</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                      Opens X composer with hook, summary, and hashtags.
                    </p>
                    <button
                      type="button"
                      onClick={handleShareX}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs transition-colors shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Share on X</span>
                    </button>
                  </div>

                  {/* Instagram */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-pink-500/50 transition-all flex flex-col justify-between space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs">
                        📸
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-slate-900 dark:text-white">Instagram</h5>
                        <span className="text-[10px] text-slate-400">Assisted Post Workflow</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                      Copies caption, downloads media, and opens Instagram.
                    </p>
                    <button
                      type="button"
                      onClick={handleShareInstagram}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs transition-colors shadow-sm"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Share to Instagram</span>
                    </button>
                  </div>

                  {/* Threads */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 text-white dark:bg-slate-800 flex items-center justify-center font-black text-xs">
                        @
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-slate-900 dark:text-white">Threads</h5>
                        <span className="text-[10px] text-slate-400">Text & Media Share</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                      Opens Threads composer with ready-to-publish text.
                    </p>
                    <button
                      type="button"
                      onClick={handleShareThreads}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs transition-colors shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Share to Threads</span>
                    </button>
                  </div>

                </div>
              </div>

              {/* Bottom Standard Pipeline Controls */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSendForReview}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-md transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit for Editorial Peer Review
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push('/studio/distribute')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-md transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    Dissemination Previews
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => showToast('Draft Saved', 'Social media draft saved to local workspace.', 'info')}
                  className="px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Save as Scratch Draft
                </button>
              </div>

            </div>
          ) : (
            /* ========================================================= */
            /* STANDARD ARTICLE / BRIEF FORMAT                           */
            /* ========================================================= */
            <div className="space-y-6">
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
                    type="button"
                    onClick={handleSendForReview}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-md transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit for Editorial Peer Review
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push('/studio/distribute')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-md transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    Dissemination Previews
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => showToast('Draft Saved', 'Content draft saved to local workspace.', 'info')}
                  className="px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Save as Scratch Draft
                </button>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
