'use client';

import React, { useState } from 'react';
import { useWorkflow, WorkflowItem } from '@/context/WorkflowContext';
import { useToast } from '@/context/ToastContext';
import { 
  Globe, Linkedin, Twitter, Instagram, Youtube, Copy, 
  Send, Bookmark, Share2, Sparkles, Check 
} from 'lucide-react';

export function PlatformPreviews() {
  const { items, updateStatus } = useWorkflow();
  const { showToast } = useToast();

  const [selectedItemId, setSelectedItemId] = useState<string>(
    items[0]?.id || ''
  );
  const [activePlatform, setActivePlatform] = useState<
    'website' | 'linkedin' | 'twitter' | 'instagram' | 'youtube'
  >('website');

  const selectedItem: WorkflowItem | undefined = 
    items.find((it) => it.id === selectedItemId) || items[0];

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    showToast('Copied to Clipboard', 'Text copied with hashtags and citations.', 'success');
  };

  const handleSendForReview = () => {
    if (selectedItem) {
      updateStatus(selectedItem.id, 'Under Review');
      showToast('Dissemination Package Sent', 'Routed to scientific review queue.', 'info');
    }
  };

  // Generate platform-specific representations
  const getPlatformContent = () => {
    if (!selectedItem) return { text: '', hashtags: [], charCount: 0, imageRec: '' };

    const title = selectedItem.title;
    const summary = selectedItem.summary;
    const author = selectedItem.author;
    const source = selectedItem.sourceReportTitle;

    switch (activePlatform) {
      case 'website': {
        const text = `${title}\n\n${summary}\n\nKey Highlights:\n${selectedItem.keyFacts.map(f => `• ${f}`).join('\n')}\n\nSource: ${source} (Led by ${author})`;
        const hashtags = ['#PolarScience', '#OpenAccess', '#CryosphereResearch'];
        return {
          text,
          hashtags,
          charCount: text.length,
          imageRec: 'Panoramic 16:9 ice sheet landscape or high-contrast research base module photography'
        };
      }
      case 'linkedin': {
        const text = `🔬 Breakthrough in Polar Exploration & Climate Science\n\n${summary}\n\nOur scientific investigation, documented in "${source}", demonstrates vital new observations for high-latitude modeling.\n\nKey Takeaways:\n${selectedItem.keyFacts.map(f => `✓ ${f}`).join('\n')}\n\nCitation: ${selectedItem.citations[0] || source}\n\nExplore the open dataset and full voyage report on POLARIS.`;
        const hashtags = ['#PolarResearch', '#ClimateScience', '#Glaciology', '#Oceanography', '#DataDrivenScience'];
        return {
          text,
          hashtags,
          charCount: text.length,
          imageRec: 'Scientific data visualization chart paired with on-site field team in polar parkas'
        };
      }
      case 'twitter': {
        const text = `❄️ New polar research alert!\n\n${summary.slice(0, 160)}...\n\nLed by ${author}, this analysis provides critical indicators on polar climate stability.\n\nRead the full report on POLARIS 👇`;
        const hashtags = ['#Antarctica', '#ArcticScience', '#ClimateChange'];
        return {
          text,
          hashtags,
          charCount: text.length,
          imageRec: 'Dynamic action shot of research icebreaker or meteorological instrumentation tower'
        };
      }
      case 'instagram': {
        const text = `Into the Frozen Frontiers ❄️✨\n\n${summary}\n\nSwipe across to discover the raw empirical data gathered in the field by ${author}.\n\nEvery ice core and deep-sea cast tells a story of planetary balance.\n\nLink in bio to read the open report on POLARIS Portal 🌐`;
        const hashtags = ['#PolarisScience', '#AntarcticLife', '#PolarExploration', '#GlacierLove', '#ScienceOutreach', '#ExtremeFieldwork'];
        return {
          text,
          hashtags,
          charCount: text.length,
          imageRec: 'Square 1:1 or 4:5 vertical carousel starting with Aurora Australis or Adélie penguin colony'
        };
      }
      case 'youtube': {
        const text = `VIDEO SCRIPT / COMMUNITY POST:\n\n[HOOK]: What does an 800,000-year-old ice core sound like when it melts?\n\n[OVERVIEW]: Welcome back to POLARIS Science. Today, we're diving into ${source}.\n\n[KEY FACTS TO DISCUSS]:\n${selectedItem.keyFacts.map((f, i) => `${i + 1}. ${f}`).join('\n')}\n\n[CITATION & DATA]: All datasets referenced are available for free download at polaris-science.org`;
        const hashtags = ['#ScienceDocumentary', '#PolarExpedition', '#ClimateExplained', '#Shorts'];
        return {
          text,
          hashtags,
          charCount: text.length,
          imageRec: 'High-contrast thumbnail featuring bold title text, sub-zero ice crystals, and researcher in action'
        };
      }
    }
  };

  const currentPlatformContent = getPlatformContent();

  const platforms = [
    { id: 'website', label: 'Website Portal', icon: Globe, color: 'text-sky-500' },
    { id: 'linkedin', label: 'LinkedIn Article', icon: Linkedin, color: 'text-blue-600' },
    { id: 'twitter', label: 'X (Twitter)', icon: Twitter, color: 'text-sky-400' },
    { id: 'instagram', label: 'Instagram Carousel', icon: Instagram, color: 'text-pink-500' },
    { id: 'youtube', label: 'YouTube Script', icon: Youtube, color: 'text-red-500' },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Source Item Selector */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Multi-Platform Dissemination Matrix
          </span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
            Select Scientific Communication Draft
          </h3>
        </div>

        <select
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value)}
          className="text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 max-w-md w-full"
        >
          {items.map((it) => (
            <option key={it.id} value={it.id}>
              {it.title.slice(0, 50)}... ({it.status})
            </option>
          ))}
        </select>
      </div>

      {/* Platform Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {platforms.map((p) => {
          const Icon = p.icon;
          const isActive = activePlatform === p.id;

          return (
            <button
              key={p.id}
              onClick={() => setActivePlatform(p.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20 scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : p.color}`} />
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* Platform Preview Card */}
      {selectedItem && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Feed Card Preview (2 Cols) */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center text-white font-black text-sm">
                  ✦
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    POLARIS Science Communication
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Platform Channel: <strong>{platforms.find(p => p.id === activePlatform)?.label}</strong>
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                {currentPlatformContent.charCount} characters
              </span>
            </div>

            {/* Generated Formatted Body */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed font-sans">
              {currentPlatformContent.text}
            </div>

            {/* Hashtag List */}
            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">
                Suggested Distribution Hashtags:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentPlatformContent.hashtags.map((h) => (
                  <span
                    key={h}
                    className="text-xs px-2.5 py-1 rounded-md bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-mono border border-sky-200 dark:border-sky-900"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(`${currentPlatformContent.text}\n\n${currentPlatformContent.hashtags.join(' ')}`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-sm transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy Formatted Post
                </button>
                <button
                  onClick={handleSendForReview}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-sm transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send to Editorial Review
                </button>
              </div>

              <button
                onClick={() => showToast('Draft Saved', 'Platform package saved locally.', 'info')}
                className="px-3 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Save Draft
              </button>
            </div>
          </div>

          {/* Asset & Citation Specification Sidebar (1 Col) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Distribution Specifications
            </h4>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-slate-100">Recommended Visual Asset:</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {currentPlatformContent.imageRec}
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-0.5">Underlying Scientific Report:</span>
                <p className="text-[11px] text-sky-600 dark:text-sky-400 font-medium">
                  {selectedItem.sourceReportTitle}
                </p>
              </div>

              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-0.5">Primary Author:</span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {selectedItem.author} ({selectedItem.authorRole})
                </p>
              </div>

              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-0.5">Permanent DOI Citation:</span>
                <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                  {selectedItem.citations[0] || '10.1016/j.polarsci.2024.01.008'}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-300 dark:border-sky-800 text-[11px] text-sky-800 dark:text-sky-300 leading-relaxed">
              ✦ Dissemination drafts adhere to open-science licensing guidelines and include traceable metadata citations.
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
