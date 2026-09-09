'use client';

import React, { useState } from 'react';
import { POLAR_MEDIA, MediaItem } from '@/data/polaris-data';
import { MediaLightbox } from '@/components/media/MediaLightbox';
import { Image as ImageIcon, Video, Compass, Sparkles, Filter, Search, Play, Volume2 } from 'lucide-react';

export default function MediaGalleryPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Photo' | 'Video' | '360 Experience' | 'Audio / Hydrophone'>('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);

  const regions = ['All', 'Antarctica', 'Arctic', 'Southern Ocean'];

  const filteredMedia = POLAR_MEDIA.filter((item) => {
    const matchesTab = activeTab === 'All' || item.type === activeTab;
    const matchesRegion = selectedRegion === 'All' || item.region === selectedRegion;
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesRegion && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Digital Visual & Acoustic Archive
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            Polar Media
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Explore high-resolution scientific photography, 4K expedition cinema, 360° spherical base tours, and sub-surface glacial acoustics from the frontiers of polar exploration.
          </p>
        </div>
      </div>

      {/* Tabs & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        
        {/* Media Type Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'All', label: 'All Media', icon: ImageIcon },
            { id: 'Photo', label: 'Photos', icon: ImageIcon },
            { id: 'Video', label: 'Videos', icon: Video },
            { id: '360 Experience', label: '360° Experiences', icon: Sparkles },
            { id: 'Audio / Hydrophone', label: 'Hydrophone Audio', icon: Volume2 },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;

            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Region & Search Filters */}
        <div className="flex items-center gap-2">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
          >
            {regions.map((r) => (
              <option key={r} value={r}>{r === 'All' ? 'All Regions' : r}</option>
            ))}
          </select>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter media..."
              className="py-1.5 pl-8 pr-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 w-44"
            />
          </div>
        </div>

      </div>

      {/* Masonry / Responsive Grid Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveMedia(item)}
            className="group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            {/* Media Image Container */}
            <div className="relative h-56 w-full overflow-hidden bg-slate-950">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

              {/* Type Badge */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 text-white backdrop-blur-sm border border-white/20">
                  {item.type}
                </span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-sky-950/80 text-sky-300 border border-sky-400/30 backdrop-blur-sm">
                  {item.region}
                </span>
              </div>

              {item.type === 'Video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-sky-500/90 text-navy-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
              )}

              {item.type === '360 Experience' && (
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 text-[10px] font-bold border border-cyan-400/40">
                  360° VR
                </div>
              )}

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                <h3 className="text-xs font-bold leading-tight line-clamp-2">{item.title}</h3>
                <p className="text-[10px] text-sky-300 truncate mt-0.5">{item.location}</p>
              </div>
            </div>

            {/* Technical Metadata Footer */}
            <div className="p-3 bg-white dark:bg-slate-900 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
              <span className="truncate max-w-[150px]">👤 {item.photographer}</span>
              <span className="font-mono text-[10px]">{item.year}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <MediaLightbox
        media={activeMedia}
        onClose={() => setActiveMedia(null)}
      />

    </div>
  );
}
