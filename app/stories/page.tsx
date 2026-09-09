'use client';

import React from 'react';
import Link from 'next/link';
import { POLAR_STORIES, StoryItem } from '@/data/polaris-data';
import { BookOpen, Clock, User, ArrowRight, ChevronRight } from 'lucide-react';

export default function StoriesIndexPage() {
  const leadStory = POLAR_STORIES[0];
  const remainingStories = POLAR_STORIES.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
          Editorial Longform & Field Dispatches
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
          Stories From the Poles
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          Immersive narrative journalism documenting wintering over in Antarctica, drilling through millennia of ice, and braving high-latitude oceanic storms.
        </p>
      </div>

      {/* Hero Featured Story Card */}
      {leadStory && (
        <Link
          href={`/stories/${leadStory.slug}`}
          className="group rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-xl hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-2 block"
        >
          <div className="relative h-64 sm:h-96 lg:h-full w-full overflow-hidden">
            <img
              src={leadStory.heroImage}
              alt={leadStory.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 bg-sky-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-sky-300 border border-sky-400/40">
              Featured Dispatch • {leadStory.category}
            </div>
          </div>

          <div className="p-8 sm:p-12 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{leadStory.date}</span>
                <span>•</span>
                <span>{leadStory.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-tight">
                {leadStory.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 leading-relaxed">
                {leadStory.summary}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={leadStory.authorAvatar}
                  alt={leadStory.author}
                  className="w-9 h-9 rounded-full object-cover border border-sky-400/40"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-900 dark:text-white">{leadStory.author}</p>
                  <p className="text-slate-400">{leadStory.authorRole}</p>
                </div>
              </div>

              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Story <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* Remaining Feature Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {remainingStories.map((story) => (
          <Link
            key={story.id}
            href={`/stories/${story.slug}`}
            className="group flex flex-col justify-between rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div>
              <div className="relative h-52 w-full overflow-hidden">
                <img
                  src={story.heroImage}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-bold text-sky-300">
                  {story.category}
                </div>
              </div>

              <div className="p-6 space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span>{story.date}</span>
                  <span>•</span>
                  <span>{story.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-snug">
                  {story.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {story.summary}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 mt-3 flex items-center gap-2.5">
              <img
                src={story.authorAvatar}
                alt={story.author}
                className="w-7 h-7 rounded-full object-cover border border-sky-400/40"
              />
              <div className="text-[11px]">
                <p className="font-semibold text-slate-800 dark:text-slate-200">{story.author}</p>
                <p className="text-slate-400">{story.authorRole}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
