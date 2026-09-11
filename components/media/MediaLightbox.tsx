'use client';

import React from 'react';
import { MediaItem } from '@/data/polaris-data';
import { X, MapPin, Camera, User, Download, Share2, Tag, Calendar, Compass, Shield } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { downloadMediaAsset } from '@/utils/downloadUtils';

interface MediaLightboxProps {
  media: MediaItem | null;
  onClose: () => void;
}

export function MediaLightbox({ media, onClose }: MediaLightboxProps) {
  const { showToast } = useToast();

  if (!media) return null;

  const handleDownload = async () => {
    showToast('Download Started', `Downloading high-res media: ${media.title}`, 'info');
    const filename = await downloadMediaAsset(media);
    showToast('Download Complete', `Saved "${filename}"`, 'success');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link Copied', 'Asset link copied to clipboard.', 'info');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media Preview Area */}
        <div className="flex-1 bg-black flex items-center justify-center relative min-h-[300px] lg:min-h-[500px]">
          <img
            src={media.url}
            alt={media.title}
            className="max-h-[500px] lg:max-h-[80vh] w-full object-contain"
          />

          {media.type === '360 Experience' && (
            <div className="absolute top-4 left-4 bg-sky-950/80 backdrop-blur-md border border-sky-400/40 text-sky-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <span>✦ Interactive 360° Panorama Mode</span>
            </div>
          )}

          {media.duration && (
            <div className="absolute bottom-4 left-4 bg-black/80 px-2.5 py-1 rounded text-white text-xs font-mono">
              Duration: {media.duration}
            </div>
          )}
        </div>

        {/* Technical Metadata Sidebar */}
        <div className="w-full lg:w-96 p-6 overflow-y-auto flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                  {media.type} • {media.region}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                  {media.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
                aria-label="Close viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {media.description}
            </p>

            {/* Metadata Grid */}
            <div className="space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-500 flex-shrink-0" />
                <span className="truncate">{media.location} ({media.coordinates})</span>
              </div>

              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span className="truncate">{media.expedition}</span>
              </div>

              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Photographer: {media.photographer}</span>
              </div>

              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-purple-500 flex-shrink-0" />
                <span className="font-mono text-[11px] truncate">{media.cameraInfo}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span>Recorded: {media.year}</span>
              </div>

              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span className="text-[11px] text-slate-500 dark:text-slate-400">{media.license}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="pt-2">
              <div className="flex flex-wrap gap-1">
                {media.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 mt-6 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download Asset
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              title="Share"
              aria-label="Share media asset"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
