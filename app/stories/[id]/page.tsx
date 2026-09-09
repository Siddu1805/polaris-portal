'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  POLAR_STORIES, POLAR_REPORTS, POLAR_DATASETS, StoryItem 
} from '@/data/polaris-data';
import { useToast } from '@/context/ToastContext';
import { 
  ArrowLeft, Clock, Calendar, User, Share2, Bookmark, 
  BookOpen, Database, PenTool, CheckCircle2, ChevronRight 
} from 'lucide-react';

export default function StoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();

  const slug = params?.id as string;
  const story = POLAR_STORIES.find((s) => s.slug === slug || s.id === slug) || POLAR_STORIES[0];

  const relatedReports = POLAR_REPORTS.filter((r) =>
    story.relatedReportIds?.includes(r.id)
  );

  const relatedDatasets = POLAR_DATASETS.filter((d) =>
    story.relatedDatasetIds?.includes(d.id)
  );

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Story Link Copied', 'Copied to clipboard.', 'info');
  };

  return (
    <article className="space-y-12 pb-16">
      
      {/* Top Header / Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 flex items-center justify-between">
        <Link
          href="/stories"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-sky-600 dark:hover:text-sky-400"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Stories</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs flex items-center gap-1"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Story Hero Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
          {story.category}
        </span>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white leading-[1.15] tracking-tight">
          {story.title}
        </h1>

        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 font-light leading-relaxed">
          {story.subtitle}
        </p>

        {/* Byline */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <img
            src={story.authorAvatar}
            alt={story.author}
            className="w-10 h-10 rounded-full object-cover border-2 border-sky-500/40"
          />
          <div className="text-xs">
            <p className="font-bold text-slate-900 dark:text-white">{story.author}</p>
            <p className="text-slate-400">{story.authorRole} • {story.date} • {story.readTime}</p>
          </div>
        </div>
      </div>

      {/* Full-bleed Hero Image with Caption */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-sky-500/20">
          <img
            src={story.heroImage}
            alt={story.title}
            className="w-full max-h-[550px] object-cover"
          />
        </div>
        <p className="text-[11px] text-slate-400 italic text-center mt-2">
          {story.heroCaption}
        </p>
      </div>

      {/* Story Editorial Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8 text-base leading-relaxed text-slate-800 dark:text-slate-200">
        
        {/* Intro Paragraph */}
        <p className="text-lg sm:text-xl font-serif text-slate-900 dark:text-slate-100 leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:text-sky-600 dark:first-letter:text-sky-400">
          {story.contentParagraphs[0]}
        </p>

        {/* Second Paragraph */}
        {story.contentParagraphs[1] && (
          <p className="font-serif leading-relaxed">
            {story.contentParagraphs[1]}
          </p>
        )}

        {/* Editorial Pull Quote */}
        <figure className="my-8 p-6 rounded-2xl bg-sky-50/70 dark:bg-sky-950/40 border-l-4 border-sky-500 text-slate-800 dark:text-slate-100">
          <blockquote className="text-lg sm:text-xl font-serif italic leading-snug">
            "{story.pullQuote}"
          </blockquote>
          <figcaption className="text-xs font-sans font-bold text-sky-700 dark:text-sky-400 mt-2">
            — {story.pullQuoteAuthor}
          </figcaption>
        </figure>

        {/* Remaining Paragraphs */}
        {story.contentParagraphs.slice(2).map((para, i) => (
          <p key={i} className="font-serif leading-relaxed">
            {para}
          </p>
        ))}

        {/* Key Facts Highlight Box */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-md space-y-3 my-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
            Field Science Key Takeaways:
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {story.keyFacts.map((fact, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Underlying Scientific References & Datasets */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Associated Scientific Reports & Datasets
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {relatedReports.map((r) => (
              <Link
                key={r.id}
                href={`/knowledge/${r.id}`}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm hover:shadow-md transition-all space-y-1 block"
              >
                <span className="text-[10px] font-bold uppercase text-sky-600 dark:text-sky-400">Scientific Report</span>
                <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">{r.title}</h4>
                <p className="text-slate-400 text-[11px]">By {r.author}</p>
              </Link>
            ))}

            {relatedDatasets.map((d) => (
              <Link
                key={d.id}
                href={`/data-hub/${d.id}`}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm hover:shadow-md transition-all space-y-1 block"
              >
                <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">Observation Dataset</span>
                <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">{d.title}</h4>
                <p className="text-slate-400 text-[11px]">{d.format} • {d.recordsCount}</p>
              </Link>
            ))}
          </div>
        </div>

      </div>

    </article>
  );
}
