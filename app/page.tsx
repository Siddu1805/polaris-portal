'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Compass, BookOpen, Database, Image as ImageIcon, Users, 
  GraduationCap, PenTool, ArrowRight, Search, FileText, 
  ChevronRight, Sparkles, MapPin, Play, ExternalLink, Award, 
  Globe, Clock, User, ShieldCheck, Share2, CheckCircle2, 
  Layers, ChevronDown, Check, Activity, Radio
} from 'lucide-react';
import { 
  POLAR_EXPEDITIONS, POLAR_REPORTS, POLAR_STORIES, 
  POLAR_MEDIA, POLAR_DATASETS, MediaItem 
} from '@/data/polaris-data';
import { StatCounter } from '@/components/common/StatCounter';
import { PolarMap } from '@/components/maps/PolarMap';
import { MediaLightbox } from '@/components/media/MediaLightbox';

export default function HomePage() {
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const featuredExpeditions = POLAR_EXPEDITIONS.slice(0, 3);
  const latestReports = POLAR_REPORTS.slice(0, 4);
  const featuredStory = POLAR_STORIES[0];
  const supportingStories = POLAR_STORIES.slice(1, 3);
  const mediaPreview = POLAR_MEDIA.slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative min-h-[70vh] lg:min-h-[780px] max-h-[820px] flex items-center justify-center overflow-hidden bg-navy-950 py-16 sm:py-20">
        {/* Background Landscape Image with Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=2000&q=80"
            alt="Polar Ice Landscape Aurora"
            className="w-full h-full object-cover object-center opacity-45 scale-105 transform animate-aurora-drift"
          />
          {/* Subtle Multi-Layered Polar Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-transparent to-navy-950" />
          <div className="absolute inset-0 aurora-glow pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
          
          {/* Telemetry Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-400/40 backdrop-blur-md shadow-xl max-w-[94vw]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-sky-200 truncate">
              High-Latitude Science & Outreach Network
            </span>
            <span className="text-[10px] font-mono text-sky-400/80 hidden sm:inline">
              • 78°N to 70°S Telemetry Online
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] drop-shadow-sm">
            Discover the Science <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-300 to-white">
              of the Poles
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-lg text-slate-300 font-light leading-relaxed">
            Explore expeditions, research, datasets, publications and stories from the Arctic, Antarctic and Southern Ocean.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/knowledge"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 text-navy-950 shadow-xl shadow-sky-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Knowledge</span>
            </Link>

            <Link
              href="/expeditions"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm bg-slate-900/85 hover:bg-slate-800 text-white border border-sky-400/40 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            >
              <Compass className="w-4 h-4 text-sky-400" />
              <span>Explore Expeditions</span>
            </Link>

            <Link
              href="/studio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-sky-950/60 hover:bg-sky-900/80 text-sky-300 hover:text-white border border-sky-500/30 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            >
              <PenTool className="w-4 h-4 text-sky-400" />
              <span>Content Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Discover Search Bar */}
          <div className="pt-3 max-w-xl mx-auto w-full">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                placeholder="Search polar expeditions, ice cores, datasets, researchers..."
                className="w-full py-3 pl-11 pr-24 rounded-xl bg-slate-900/80 border border-sky-500/30 text-xs sm:text-sm text-white placeholder-slate-400 backdrop-blur-md shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <Search className="w-4 h-4 text-sky-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <Link
                href={`/search?q=${encodeURIComponent(searchQuery.trim() || 'Antarctica')}`}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-navy-950 font-bold text-xs transition-colors"
              >
                Search
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. POLAR EXPLORER (MAP) */}
      {/* ========================================================================= */}
      <section id="map-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              <Globe className="w-4 h-4" />
              <span>Interactive Telemetry & Geolocation</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Polar World Explorer
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              Inspect active year-round research stations, subsurface mooring observatories, and maritime expedition corridors across Antarctica, the Arctic, and the Southern Ocean. Click any station marker to view scientific assets.
            </p>
          </div>

          <Link
            href="/expeditions/timeline"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
          >
            <span>View Historical Polar Journey Timeline</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Polar Map Interactive Component */}
        <PolarMap />
      </section>

      {/* ========================================================================= */}
      {/* 3. FEATURED EXPEDITIONS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Frontier Scientific Expeditions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Featured Expeditions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Landmark high-latitude campaigns advancing cryospheric observation, ice drilling, and oceanographic monitoring
            </p>
          </div>

          <Link
            href="/expeditions"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
          >
            <span>All Expeditions ({POLAR_EXPEDITIONS.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredExpeditions.map((exp) => (
            <div
              key={exp.id}
              className="group rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between polar-card-hover"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={exp.heroImage}
                    alt={exp.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-950/80 text-sky-300 border border-sky-400/30 backdrop-blur-sm">
                      {exp.region}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 text-slate-300">
                      {exp.year}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-mono text-sky-300 font-bold">{exp.code}</span>
                    <h3 className="text-base font-bold leading-tight line-clamp-1">{exp.name}</h3>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {exp.summary}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <p className="flex items-center gap-1.5 truncate">
                      <User className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
                      <span>Lead: <strong>{exp.leadResearcher}</strong></span>
                    </p>
                    <p className="flex items-center gap-1.5 truncate">
                      <Compass className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span>{exp.vesselOrBase}</span>
                    </p>
                    <p className="flex items-center gap-1.5 truncate">
                      <Clock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span>{exp.duration}</span>
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] font-semibold text-slate-400 block mb-1">Research Focus:</span>
                    <div className="flex flex-wrap gap-1">
                      {exp.researchDomains.map((dom) => (
                        <span
                          key={dom}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        >
                          {dom}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={`/expeditions/${exp.id}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-600 hover:text-white dark:hover:bg-sky-600 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors shadow-sm"
                >
                  <span>Explore Expedition</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. STATISTICS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-navy-900 to-slate-900 border border-sky-500/25 p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-sky-500/20 relative z-10">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-sky-400">
                Global Cryosphere Observatory Metrics
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
                Scientific Telemetry & Research Footprint
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-400/30 text-[11px] font-mono text-sky-300">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Continuous Telemetry Since 1981</span>
            </div>
          </div>

          <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center relative z-10">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                <StatCounter target={43} suffix="+" />
              </div>
              <p className="text-xs font-bold text-sky-300 uppercase tracking-wide">Expeditions</p>
              <p className="text-[11px] text-slate-400 hidden sm:block">Antarctic & Arctic Voyages</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                <StatCounter target={1200} suffix="+" />
              </div>
              <p className="text-xs font-bold text-sky-300 uppercase tracking-wide">Publications</p>
              <p className="text-[11px] text-slate-400 hidden sm:block">Peer-Reviewed Papers</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                <StatCounter target={850} suffix="+" />
              </div>
              <p className="text-xs font-bold text-sky-300 uppercase tracking-wide">Datasets</p>
              <p className="text-[11px] text-slate-400 hidden sm:block">Open Ingestion Archives</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                <StatCounter target={8000} suffix="+" />
              </div>
              <p className="text-xs font-bold text-sky-300 uppercase tracking-wide">Media Assets</p>
              <p className="text-[11px] text-slate-400 hidden sm:block">Photography & Acoustics</p>
            </div>

            <div className="space-y-1 col-span-2 sm:col-span-1">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                <StatCounter target={40} suffix="+" />
              </div>
              <p className="text-xs font-bold text-sky-300 uppercase tracking-wide">Years Research</p>
              <p className="text-[11px] text-slate-400 hidden sm:block">Sustained Polar Presence</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. LATEST RESEARCH & DISCOVERIES */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Verified Open-Access Literature
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Latest Research & Discoveries
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Peer-reviewed monographs, glaciological traverses, and marine biogeochemical analyses
            </p>
          </div>

          <Link
            href="/knowledge"
            className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
          >
            <span>Full Catalog ({POLAR_REPORTS.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestReports.map((report) => (
            <div
              key={report.id}
              className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between space-y-4 polar-card-hover overflow-hidden"
            >
              <div className="space-y-3">
                {/* Card Top: Thumbnail + Metadata */}
                <div className="flex items-start gap-4">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-800">
                    <img
                      src={report.coverImage}
                      alt={report.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/75 px-1.5 py-0.5 rounded text-[9px] font-mono text-white">
                      {report.year}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                        {report.researchDomain}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {report.region}
                      </span>
                    </div>

                    <Link href={`/knowledge/${report.id}`} className="block">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-snug line-clamp-2">
                        {report.title}
                      </h3>
                    </Link>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      By {report.author} • {report.institution}
                    </p>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {report.abstract}
                </p>
              </div>

              {/* Bottom Action Bar */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
                <span className="text-[11px] font-mono text-slate-400 truncate">
                  DOI: {report.doi}
                </span>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/studio?source=${report.id}`}
                    className="text-[11px] font-medium text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-1"
                    title="Translate research into outreach story"
                  >
                    <PenTool className="w-3 h-3" />
                    <span>Story Studio</span>
                  </Link>
                  <Link
                    href={`/knowledge/${report.id}`}
                    className="px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 dark:hover:text-navy-950 text-sky-600 dark:text-sky-300 font-bold text-xs transition-colors inline-flex items-center gap-1"
                  >
                    <span>Read Research</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. POLAR STORIES (EDITORIAL FEATURE) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Editorial Journalism & Field Narratives
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Polar Stories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Immersive longform narratives chronicling scientific discoveries and human resilience at the ends of the Earth
            </p>
          </div>

          <Link
            href="/stories"
            className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
          >
            <span>All Features ({POLAR_STORIES.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Editorial Layout: 1 Large Feature + 2 Supporting Stories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Large Feature Story (7 cols) */}
          <Link
            href={`/stories/${featuredStory.slug}`}
            className="lg:col-span-7 group rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between polar-card-hover"
          >
            <div>
              <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                <img
                  src={featuredStory.heroImage}
                  alt={featuredStory.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute top-4 left-4 bg-sky-950/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-sky-300 border border-sky-400/30">
                  Featured Dispatch • {featuredStory.category}
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 text-xs text-sky-300 mb-1">
                    <span>{featuredStory.date}</span>
                    <span>•</span>
                    <span>{featuredStory.readTime}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black leading-tight text-white group-hover:text-sky-300 transition-colors">
                    {featuredStory.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {featuredStory.summary}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 mt-2">
              <div className="flex items-center gap-3">
                <img
                  src={featuredStory.authorAvatar}
                  alt={featuredStory.author}
                  className="w-9 h-9 rounded-full object-cover border border-sky-400/40"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-800 dark:text-slate-200">{featuredStory.author}</p>
                  <p className="text-[11px] text-slate-400">{featuredStory.authorRole}</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform">
                <span>Read Feature Dispatch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          {/* 2 Supporting Stories (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {supportingStories.map((story) => (
              <Link
                key={story.id}
                href={`/stories/${story.slug}`}
                className="group flex-1 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between polar-card-hover"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={story.heroImage}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                        {story.category}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors leading-snug line-clamp-2 mt-0.5">
                        {story.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {story.date} • {story.readTime}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {story.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs mt-3">
                  <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                    By {story.author}
                  </span>
                  <span className="font-semibold text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. MEDIA GALLERY PREVIEW */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Photographic & Sensor Archives
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Polar Media Gallery
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              High-resolution scientific photography, 4K expedition cinema, and hydrophone acoustics
            </p>
          </div>

          <Link
            href="/media"
            className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
          >
            <span>Explore Full Gallery ({POLAR_MEDIA.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {mediaPreview.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveMedia(item)}
              className="group relative h-44 rounded-2xl overflow-hidden cursor-pointer border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 polar-card-hover"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-85 group-hover:opacity-100 transition-opacity" />

              <span className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-md bg-black/70 text-white backdrop-blur-sm border border-white/10">
                {item.type}
              </span>

              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                <p className="text-xs font-bold truncate leading-tight">{item.title}</p>
                <p className="text-[10px] text-sky-300 truncate mt-0.5">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. POLAR CLASSROOM TEASER */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-sky-950 via-navy-900 to-slate-900 border border-sky-500/30 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-900/80 border border-sky-400/40 text-xs font-bold text-sky-300">
              <GraduationCap className="w-4 h-4" />
              <span>Interactive Polar Education</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Polar Classroom & Science Quizzes
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Designed for students, educators, and curious minds. Explore why the polar cryosphere controls global climate, discover how scientists survive in -45°C, and test your knowledge with interactive science quizzes.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/classroom"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-sky-400 hover:bg-sky-300 text-slate-950 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-sky-400/20"
              >
                <span>Launch Polar Classroom</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/classroom#quiz"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs bg-slate-900/80 hover:bg-slate-800 text-white border border-sky-400/30 transition-all"
              >
                <span>Take Interactive Science Quiz</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. SCIENTIFIC COMMUNICATION WORKFLOW */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            The Scientific Dissemination Lifecycle
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            From Fieldwork to Global Outreach
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            How POLARIS bridges high-latitude sensor telemetry and polar research into verified public communication
          </p>
        </div>

        {/* 6-Stage Visual Workflow Pipeline */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {[
            {
              step: '1. Research',
              icon: Compass,
              title: 'Field Voyages',
              desc: 'Vessel cruises, ice core drilling & station sensor arrays',
              color: 'text-sky-500 dark:text-sky-400'
            },
            {
              step: '2. Knowledge',
              icon: BookOpen,
              title: 'Open Data',
              desc: 'Peer-reviewed monographs & NetCDF telemetry ingestion',
              color: 'text-cyan-500 dark:text-cyan-400'
            },
            {
              step: '3. Discovery',
              icon: Globe,
              title: 'Spatial Index',
              desc: 'Interactive coordinate mapping & semantic catalog search',
              color: 'text-indigo-500 dark:text-indigo-400'
            },
            {
              step: '4. Content',
              icon: PenTool,
              title: 'Studio Synthesis',
              desc: 'Audience-tailored translation with strict citation checks',
              color: 'text-amber-500 dark:text-amber-400'
            },
            {
              step: '5. Review',
              icon: ShieldCheck,
              title: 'Referee Audit',
              desc: 'Multi-stage Kanban editorial verification by domain scientists',
              color: 'text-emerald-500 dark:text-emerald-400'
            },
            {
              step: '6. Dissemination',
              icon: Share2,
              title: 'Public Feeds',
              desc: 'Multi-channel feeds for education, news media & policy makers',
              color: 'text-rose-500 dark:text-rose-400'
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-2 polar-card-hover relative"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded">
                      {item.step}
                    </span>
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. CONTENT STUDIO FLAGSHIP SECTION & CTA */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 border border-sky-500/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden space-y-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950 border border-sky-400/40 text-xs font-bold text-sky-300">
                <PenTool className="w-3.5 h-3.5" />
                <span>Flagship Translation Engine</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Polar Content Studio
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Transform verified scientific reports and multi-decadal observation datasets into audience-tailored articles, social explainers, and classroom materials with traceable citations.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 text-navy-950 shadow-xl shadow-sky-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Create Science Content</span>
              </Link>
              <Link
                href="/studio/workflow"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Editorial Kanban</span>
              </Link>
            </div>
          </div>

          {/* 5-Step Process Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2 relative z-10">
            {[
              { step: '1. Source Select', desc: 'Choose verified paper or dataset' },
              { step: '2. AI Synthesis', desc: 'Generate multi-audience draft' },
              { step: '3. Citation Check', desc: 'Trace facts to source DOI' },
              { step: '4. Peer Review', desc: 'Scientific editorial sign-off' },
              { step: '5. Publication', desc: 'Disseminate to global feeds' },
            ].map((s, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center space-y-1"
              >
                <span className="text-[10px] font-mono font-bold text-sky-400 block">{s.step}</span>
                <p className="text-[11px] text-slate-300 font-medium">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Interactive Source-to-Outreach Example Card */}
          <div className="rounded-2xl bg-slate-950 border border-sky-500/30 p-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            
            {/* Source Monograph Box */}
            <div className="space-y-2 p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono text-sky-400 font-bold">Scientific Source: POL-REP-2024-001</span>
                <span className="text-slate-400">PDF • 14.2 MB</span>
              </div>
              <h4 className="text-xs font-bold text-white">
                Glaciological Stratigraphy & Mass Balance of Dronning Maud Land
              </h4>
              <p className="text-[11px] text-slate-400 font-mono bg-slate-950 p-2.5 rounded border border-slate-800 leading-relaxed">
                "...400 MHz radar echograms over 1,800 km traverse confirm +7.4% decadal accumulation acceleration on escarpments, contrasting with inland plateau stability (7.2 cm/yr water eq)..."
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                <CheckCircle2 className="w-3 h-3" />
                <span>Peer-reviewed DOI: 10.1016/j.polarsci.2024.01.004</span>
              </div>
            </div>

            {/* Generated Outreach Article Box */}
            <div className="space-y-2 p-4 rounded-xl bg-sky-950/40 border border-sky-500/40">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-sky-300">Generated Public Outreach Article</span>
                <span className="px-2 py-0.5 rounded bg-sky-900 text-sky-200 font-bold text-[10px]">General Public</span>
              </div>
              <h4 className="text-xs font-bold text-white">
                How Antarctic Snow Radar Reveals Changing Storm Patterns
              </h4>
              <p className="text-[11px] text-slate-200 bg-navy-950/80 p-2.5 rounded border border-sky-500/30 leading-relaxed">
                Traversing 1,800 kilometers of rugged Antarctic ice, scientists have found coastal snowfall rising by 7.4% per decade, while the deep interior remains dry{' '}
                <span className="inline-block px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 font-mono text-[9px] border border-sky-400/40">
                  [POL-REP-2024-001]
                </span>.
              </p>
              <div className="flex items-center justify-between text-[10px] text-sky-300 pt-1">
                <span>Verified with 100% Traceable Citations</span>
                <Link href="/studio" className="underline font-bold hover:text-white">
                  Try It in Studio →
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Lightbox Modal for Media preview */}
      <MediaLightbox
        media={activeMedia}
        onClose={() => setActiveMedia(null)}
      />

    </div>
  );
}
