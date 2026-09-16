'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Compass, BookOpen, Database, Image as ImageIcon, Users, 
  GraduationCap, PenTool, ArrowRight, Search, FileText, 
  ChevronRight, Sparkles, MapPin, Play, ExternalLink, Award, 
  Globe, Clock, User, ShieldCheck, Share2, CheckCircle2, 
  Layers, Download, Radio, Activity, Check, Filter, 
  ThermometerSnowflake, Waves, Wind, Microscope, Flame
} from 'lucide-react';
import { 
  POLAR_EXPEDITIONS, POLAR_REPORTS, POLAR_STORIES, 
  POLAR_MEDIA, POLAR_DATASETS, MediaItem, ReportItem, Expedition
} from '@/data/polaris-data';
import { StatCounter } from '@/components/common/StatCounter';
import { PolarMap } from '@/components/maps/PolarMap';
import { MediaLightbox } from '@/components/media/MediaLightbox';
import { downloadExpeditionReport, downloadReportItem, triggerBlobDownload } from '@/utils/downloadUtils';

export default function HomePage() {
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [researchFilter, setResearchFilter] = useState<string>('All');
  const [mediaFilter, setMediaFilter] = useState<string>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showSuccessToast = (msg: string = 'Report downloaded successfully') => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4000);
  };

  const featuredExpeditions = POLAR_EXPEDITIONS.slice(0, 3);
  
  // Custom images mapped to verified real polar photography
  const expeditionRealPhotos = [
    '/images/polar/bharati-station.jpg',
    '/images/polar/arctic-himadri.jpg',
    '/images/polar/research-vessel.jpg'
  ];

  // Filter latest research
  const allReports = POLAR_REPORTS;
  const filteredReports = researchFilter === 'All' 
    ? allReports.slice(0, 4)
    : allReports.filter(r => r.researchDomain.toLowerCase().includes(researchFilter.toLowerCase()) || 
                             r.category.toLowerCase().includes(researchFilter.toLowerCase())).slice(0, 4);

  // Real gallery items
  const realGalleryItems: MediaItem[] = [
    {
      id: 'polar-photo-01',
      title: 'Bharati Antarctic Research Station',
      type: 'Photo',
      category: 'Station Life',
      region: 'Antarctica',
      year: 2024,
      expedition: '43rd Indian Antarctic Expedition',
      photographer: 'Indian Antarctic Programme',
      location: 'Larsemann Hills, East Antarctica',
      coordinates: "69°24'S, 76°11'E",
      cameraInfo: 'Aerial Survey Camera (50mm, f/4.0)',
      url: '/images/polar/bharati-station.jpg',
      thumbnail: '/images/polar/bharati-station.jpg',
      description: "Aerial perspective of Bharati Station, India's third permanent Antarctic research facility constructed on stilts to withstand extreme katabatic blizzards.",
      license: 'CC BY-SA 4.0',
      tags: ['Bharati', 'Antarctica', 'Station', 'Research']
    },
    {
      id: 'polar-photo-02',
      title: 'Maitri Research Base in Schirmacher Oasis',
      type: 'Photo',
      category: 'Station Life',
      region: 'Antarctica',
      year: 2023,
      expedition: 'Indian Antarctic Programme',
      photographer: 'Ministry of Earth Sciences',
      location: 'Schirmacher Oasis, Queen Maud Land',
      coordinates: "70°46'S, 11°44'E",
      cameraInfo: 'Field Telephoto (70-200mm, f/5.6)',
      url: '/images/polar/maitri-station.jpg',
      thumbnail: '/images/polar/maitri-station.jpg',
      description: "India's second permanent Antarctic station established in 1989 on rocky nunatak terrain near Lake Priyadarshini.",
      license: 'Public Domain',
      tags: ['Maitri', 'Antarctica', 'Base', 'Geomagnetism']
    },
    {
      id: 'polar-photo-03',
      title: 'Drygalski Ice Tongue & Coastal Sea Ice',
      type: 'Photo',
      category: 'Landscape',
      region: 'Antarctica',
      year: 2024,
      expedition: 'Ross Sea Cryo-Survey',
      photographer: 'NASA Earth Observatory',
      location: 'McMurdo Sound, Ross Sea Coast',
      coordinates: "75°19'S, 163°30'E",
      cameraInfo: 'Landsat-8 OLI Multiband Satellite Imager',
      url: '/images/polar/hero-antarctica.jpg',
      thumbnail: '/images/polar/hero-antarctica.jpg',
      description: 'High-altitude satellite reconnaissance of the massive Drygalski ice tongue discharging continental ice into coastal polar waters.',
      license: 'CC BY 2.0',
      tags: ['Drygalski', 'Glaciology', 'Ice Tongue', 'Antarctica']
    },
    {
      id: 'polar-photo-04',
      title: 'Ny-Ålesund Research Village & Kongsfjorden',
      type: 'Photo',
      category: 'Station Life',
      region: 'Arctic',
      year: 2023,
      expedition: '16th Arctic Research Expedition',
      photographer: 'Polar Research Archives',
      location: 'Svalbard, Norway',
      coordinates: "78°55'N, 11°56'E",
      cameraInfo: 'Wide Prime (24mm, f/8.0)',
      url: '/images/polar/arctic-himadri.jpg',
      thumbnail: '/images/polar/arctic-himadri.jpg',
      description: "International High Arctic research station corridor housing India's Himadri station and Kongsfjorden ocean monitoring arrays.",
      license: 'CC BY-SA 3.0',
      tags: ['Himadri', 'Arctic', 'Svalbard', 'Fjord']
    },
    {
      id: 'polar-photo-05',
      title: 'Polar Icebreaker Navigating Southern Ocean Pack Ice',
      type: 'Photo',
      category: 'Scientific Equipment',
      region: 'Southern Ocean',
      year: 2024,
      expedition: '12th Southern Ocean Expedition',
      photographer: 'U.S. Coast Guard',
      location: 'Marginal Ice Zone, 64°S',
      coordinates: "64°00'S, 55°00'W",
      cameraInfo: 'Marine Telephoto (100-400mm, f/5.6)',
      url: '/images/polar/research-vessel.jpg',
      thumbnail: '/images/polar/research-vessel.jpg',
      description: 'Ice-strengthened expedition vessel carving passage through multi-year sea ice during physical oceanographic transects.',
      license: 'Public Domain',
      tags: ['Vessel', 'Icebreaker', 'Southern Ocean', 'Navigation']
    },
    {
      id: 'polar-photo-06',
      title: 'Tabular Iceberg in the Southern Ocean',
      type: 'Photo',
      category: 'Wildlife',
      region: 'Southern Ocean',
      year: 2023,
      expedition: 'Southern Ocean Pelagic Survey',
      photographer: 'Polar Marine Expeditions',
      location: 'Off Elephant Island (61°S)',
      coordinates: "61°08'S, 55°07'W",
      cameraInfo: 'Telephoto Lens (300mm, f/4.0)',
      url: '/images/polar/southern-ocean.jpg',
      thumbnail: '/images/polar/southern-ocean.jpg',
      description: 'Massive tabular iceberg drifting with the Antarctic Circumpolar Current, providing nutrients that sustain rich krill and seabird ecosystems.',
      license: 'CC BY-SA 4.0',
      tags: ['Iceberg', 'Southern Ocean', 'Pelagic', 'Cryosphere']
    },
    {
      id: 'polar-photo-07',
      title: 'Deep Ice Core Drilling Camp & Cryo-Stratigraphy',
      type: 'Photo',
      category: 'Scientific Equipment',
      region: 'Antarctica',
      year: 2024,
      expedition: 'WAIS Divide Cryo-Corridor',
      photographer: 'USGS & NSF',
      location: 'West Antarctic Ice Sheet Divide',
      coordinates: "79°28'S, 112°05'W",
      cameraInfo: 'Standard Macro (50mm, f/2.8)',
      url: '/images/polar/ice-core-research.jpg',
      thumbnail: '/images/polar/ice-core-research.jpg',
      description: 'Field glaciologists extracting continuous cylindrical ice core records to reconstruct 800,000 years of atmospheric greenhouse gas variations.',
      license: 'Public Domain',
      tags: ['Ice Core', 'Paleoclimate', 'Drilling', 'Glaciology']
    }
  ];

  const filteredMedia = mediaFilter === 'All' 
    ? realGalleryItems 
    : realGalleryItems.filter(m => 
        m.category.toLowerCase().includes(mediaFilter.toLowerCase()) || 
        m.region.toLowerCase().includes(mediaFilter.toLowerCase()) ||
        m.tags.some(t => t.toLowerCase().includes(mediaFilter.toLowerCase()))
      );

  // Classroom lesson plan download handler
  const handleDownloadLessonPlan = (moduleTitle: string, grade: string) => {
    const content = `# POLARVISION POLAR CLASSROOM — LESSON SUMMARY & CURRICULUM GUIDE
Document Title: ${moduleTitle}
Curriculum Level: ${grade}
Repository Source: POLARVISION High-Latitude Science & Outreach Portal
License: Creative Commons Attribution 4.0 International (CC BY 4.0)

1. LEARNING OBJECTIVES
• Comprehend fundamental cryospheric mechanisms governing Earth's climate system.
• Analyze real-time observational data from high-latitude telemetry networks.
• Evaluate the impact of anthropogenic climate forcing on polar vortex and sea ice stability.

2. CORE SCIENTIFIC CONCEPTS
• Polar Vortex Dynamics: Stratospheric circulation driven by polar jet streams and temperature gradients.
• Cryospheric Feedback Loops: Ice-albedo feedback, thermal insulation of sea ice, and ocean circulation.
• Paleoclimate Reconstruction: Atmospheric gas entrapment within firn and recrystallized ice cores.
• Thermohaline Conveyor: Deep water formation in the Southern Ocean (AABW) and heat redistribution.

3. CLASSROOM LAB ACTIVITIES & DISCUSSION
• Activity 1: Calculating Albedo Differences between open ocean (0.06) and fresh sea ice (0.85).
• Activity 2: Plotting 40-year ice extent anomalies using POLARVISION open datasets.
• Discussion Prompt: Why are changes at 78°N and 70°S early warning indicators for global weather?

4. VERIFIED REFERENCES & RECOMMENDED READING
• Indian Antarctic Research Programme Monograph Series (NCPOR / MoES).
• Intergovernmental Panel on Climate Change (IPCC) Special Report on the Ocean and Cryosphere.
• POLARVISION Open Data Hub: https://polarvision.science/data-hub

Document ID: POL-CLASS-${Date.now()}
Printed via POLARVISION Polar Education Network
`;
    triggerBlobDownload(content, `polarvision-lesson-${moduleTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`, 'text/plain');
    showSuccessToast('Lesson plan downloaded successfully');
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-x-hidden">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 text-white border border-emerald-500/50 shadow-2xl backdrop-blur-md animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative min-h-[75vh] lg:min-h-[820px] flex items-center justify-center overflow-hidden bg-navy-950 py-16 sm:py-24">
        {/* Background Real Antarctic Photography */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/polar/hero-antarctica.jpg"
            alt="Drygalski Ice Tongue and coastal Antarctic ice sheet — NASA Earth Observatory"
            className="w-full h-full object-cover object-center opacity-40 scale-105 transform animate-aurora-drift"
          />
          {/* Subtle Multi-Layered Polar Overlays for Guaranteed Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-transparent to-navy-950" />
          <div className="absolute inset-0 bg-black/35 pointer-events-none" />
          <div className="absolute inset-0 aurora-glow pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
          
          {/* Telemetry Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-sky-950/90 border border-sky-400/40 backdrop-blur-md shadow-xl max-w-[94vw]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-sky-200 truncate">
              POLARVISION • Polar Science Knowledge & Outreach Portal
            </span>
            <span className="text-[10px] font-mono text-sky-400/80 hidden sm:inline">
              • 78°N to 70°S Real-Time Telemetry
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] drop-shadow-md">
            Discover the Science <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-300 to-white">
              of the Poles
            </span>
          </h1>

          {/* Subtext */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed">
            Explore expeditions, research, datasets, publications and stories from the Arctic, Antarctic and Southern Ocean.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/expeditions"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 text-navy-950 shadow-xl shadow-sky-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Expeditions</span>
            </Link>

            <Link
              href="/knowledge"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm bg-slate-900/85 hover:bg-slate-800 text-white border border-sky-400/40 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-sky-400" />
              <span>Explore Knowledge</span>
            </Link>
          </div>

          {/* Live Stats Badge */}
          <div className="pt-4 max-w-3xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-slate-900/80 border border-sky-500/30 backdrop-blur-md shadow-xl text-left">
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-800/60">
                <Compass className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-white">43+ Expeditions</div>
                  <div className="text-[10px] text-slate-400 truncate">Polar Voyages Active</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-800/60">
                <Database className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-white">120+ Datasets</div>
                  <div className="text-[10px] text-slate-400 truncate">Open Archive Feeds</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-800/60">
                <FileText className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-white">350+ Publications</div>
                  <div className="text-[10px] text-slate-400 truncate">Peer-Reviewed Papers</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-800/60">
                <Radio className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-white">5 Stations</div>
                  <div className="text-[10px] text-slate-400 truncate">Monitored Year-Round</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="pt-2 max-w-xl mx-auto w-full">
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
                placeholder="Search Bharati, ice cores, datasets, researchers, Southern Ocean..."
                className="w-full py-3 pl-11 pr-24 rounded-xl bg-slate-900/90 border border-sky-500/30 text-xs sm:text-sm text-white placeholder-slate-400 backdrop-blur-md shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
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
      {/* 2. EXPLORE THE POLAR WORLD */}
      {/* ========================================================================= */}
      <section id="map-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              <Globe className="w-4 h-4" />
              <span>Interactive Telemetry & Geolocation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Explore the Polar World
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              Inspect year-round research stations, subsurface mooring arrays, and navigation corridors across Antarctica, the Arctic, and the Southern Ocean. Click any station to inspect active personnel, coordinates, and live scientific instrumentation.
            </p>
          </div>

          <Link
            href="/expeditions/timeline"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
          >
            <span>View Historical Polar Timeline</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Polar Map Interactive Component with Region Switching & Layer Toggles */}
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
              Landmark high-latitude campaigns advancing cryospheric observation, deep ice drilling, and oceanographic monitoring
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
          {featuredExpeditions.map((exp, idx) => {
            const cardPhoto = expeditionRealPhotos[idx] || exp.heroImage;
            return (
              <div
                key={exp.id}
                className="group rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between polar-card-hover"
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                    <img
                      src={cardPhoto}
                      alt={exp.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-950/85 text-sky-300 border border-sky-400/30 backdrop-blur-sm">
                        {exp.region}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/75 text-slate-300 border border-white/10">
                        {exp.year}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-950/85 text-emerald-300 border border-emerald-500/30">
                        {exp.status}
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
                        <span>Duration: {exp.duration}</span>
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

                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <Link
                    href={`/expeditions/${exp.id}`}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-600 hover:text-white dark:hover:bg-sky-600 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors shadow-sm"
                  >
                    <span>View Expedition</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const filename = downloadExpeditionReport(exp, []);
                      showSuccessToast('Report downloaded successfully');
                    }}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 text-sky-700 dark:text-sky-300 text-xs font-bold transition-colors border border-sky-400/30"
                    title="Download Official Expedition Dossier (PDF)"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Report</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. RESEARCH STATISTICS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-navy-900 to-slate-900 border border-sky-500/25 p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-sky-500/20 relative z-10">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">
                Scientific Telemetry & Footprint
              </span>
              <h3 className="text-lg sm:text-2xl font-black text-white mt-0.5">
                Four Decades of High-Latitude Research
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-400/30 text-[11px] font-mono text-sky-300">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Continuous Polar Operations Since 1981</span>
            </div>
          </div>

          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center relative z-10">
            <div className="space-y-1 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/40">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                <StatCounter target={40} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-sky-300 uppercase tracking-wide">Years Research</p>
              <p className="text-[11px] text-slate-400">Sustained polar presence in Antarctica and Arctic</p>
            </div>

            <div className="space-y-1 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/40">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                <StatCounter target={43} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-sky-300 uppercase tracking-wide">Expeditions Completed</p>
              <p className="text-[11px] text-slate-400">Scientific campaigns across cryospheric fronts</p>
            </div>

            <div className="space-y-1 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/40">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                <StatCounter target={120} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-sky-300 uppercase tracking-wide">Datasets Available</p>
              <p className="text-[11px] text-slate-400">Public open-access NetCDF & CSV archives</p>
            </div>

            <div className="space-y-1 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/40">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                <StatCounter target={350} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-sky-300 uppercase tracking-wide">Scientific Publications</p>
              <p className="text-[11px] text-slate-400">Peer-reviewed monographs and journal articles</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. LATEST RESEARCH & DISCOVERIES */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
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

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {['All', 'Glaciology', 'Atmospheric', 'Marine Biology', 'Oceanography', 'Climate'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setResearchFilter(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                researchFilter === tab
                  ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between space-y-4 polar-card-hover overflow-hidden"
            >
              <div className="space-y-3">
                {/* Card Top: Thumbnail + Metadata */}
                <div className="flex items-start gap-4">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-800 bg-slate-950">
                    <img
                      src={report.coverImage}
                      alt={report.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-[9px] font-mono text-white">
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
                <span className="text-[11px] font-mono text-slate-400 truncate hidden sm:inline">
                  DOI: {report.doi}
                </span>

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      downloadReportItem(report);
                      showSuccessToast('Report downloaded successfully');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-600 hover:text-white dark:hover:bg-sky-600 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors inline-flex items-center gap-1 border border-slate-200 dark:border-slate-700"
                    title="Download Monograph PDF"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download PDF</span>
                  </button>

                  <Link
                    href={`/knowledge/${report.id}`}
                    className="px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 dark:hover:text-navy-950 text-sky-600 dark:text-sky-300 font-bold text-xs transition-colors inline-flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. ANTARCTIC RESEARCH HIGHLIGHT */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="rounded-3xl bg-slate-900 border border-sky-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="max-w-3xl space-y-2 mb-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950 border border-sky-400/40 text-xs font-bold text-sky-300">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>National Polar Capability Highlight</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              India's Antarctic Research Programme
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Operating year-round scientific research stations in Antarctica since 1983, investigating cryospheric evolution, atmospheric coupling, and the global thermohaline engine.
            </p>
          </div>

          {/* Station Photography Cards (Verified Real Polar Photos) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* Bharati Station */}
            <div className="rounded-2xl overflow-hidden bg-slate-950 border border-sky-500/25 flex flex-col justify-between group">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src="/images/polar/bharati-station.jpg"
                  alt="Bharati Research Station, Larsemann Hills"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-sky-950/90 text-sky-300 text-[10px] font-bold border border-sky-400/40">
                  Active Year-Round
                </span>
              </div>
              <div className="p-5 space-y-2 flex-1">
                <h3 className="text-base font-bold text-white">Bharati Station</h3>
                <p className="text-[11px] font-mono text-sky-400">Larsemann Hills (69°24'S, 76°11'E)</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Engineered on structural stilts to mitigate blizzard accumulation. Hosts satellite telemetry, ionospheric sensors, and marine bio-geochemistry laboratories.
                </p>
              </div>
            </div>

            {/* Maitri Base */}
            <div className="rounded-2xl overflow-hidden bg-slate-950 border border-sky-500/25 flex flex-col justify-between group">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src="/images/polar/maitri-station.jpg"
                  alt="Maitri Research Base, Schirmacher Oasis"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-sky-950/90 text-sky-300 text-[10px] font-bold border border-sky-400/40">
                  Established 1989
                </span>
              </div>
              <div className="p-5 space-y-2 flex-1">
                <h3 className="text-base font-bold text-white">Maitri Station</h3>
                <p className="text-[11px] font-mono text-sky-400">Schirmacher Oasis (70°46'S, 11°44'E)</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Located near freshwater Lake Priyadarshini. Focuses on geomagnetism, atmospheric ozone monitoring, meteorology, and psychrophilic microbiology.
                </p>
              </div>
            </div>

            {/* Southern Ocean & Vessel Operations */}
            <div className="rounded-2xl overflow-hidden bg-slate-950 border border-sky-500/25 flex flex-col justify-between group">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src="/images/polar/research-vessel.jpg"
                  alt="Southern Ocean Research Vessel Icebreaking"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-sky-950/90 text-sky-300 text-[10px] font-bold border border-sky-400/40">
                  Marine Transects
                </span>
              </div>
              <div className="p-5 space-y-2 flex-1">
                <h3 className="text-base font-bold text-white">Southern Ocean Expeditions</h3>
                <p className="text-[11px] font-mono text-sky-400">Sub-Antarctic Fronts to Polar Margins</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Continuous CTD casts, bio-Argo floats, and sediment coring from 40°S to 68°S tracking the Antarctic Circumpolar Current and oceanic carbon sink.
                </p>
              </div>
            </div>
          </div>

          {/* 5 Key Scientific Focus Areas */}
          <div className="mt-8 pt-8 border-t border-slate-800 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 block mb-4">
              Core Strategic Research Focus Areas:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {[
                {
                  title: 'Ice Sheet Dynamics',
                  desc: 'Radar soundings and GNSS kinematic vectors tracking grounding line stability and mass balance.',
                  icon: ThermometerSnowflake
                },
                {
                  title: 'Paleoclimate Ice Cores',
                  desc: 'High-resolution isotope stratigraphy reconstructing millennial-scale greenhouse cycles.',
                  icon: Microscope
                },
                {
                  title: 'Southern Ocean Circulation',
                  desc: 'Quantifying Antarctic Bottom Water formation and air-sea carbon dioxide fluxes.',
                  icon: Waves
                },
                {
                  title: 'Space Weather & Magnetism',
                  desc: 'Pulsation magnetometers and riometers monitoring solar wind-magnetosphere coupling.',
                  icon: Wind
                },
                {
                  title: 'Microbial Cold Diversity',
                  desc: 'Genomic sequencing of psychrophiles producing novel cold-active enzymes in oasis lakes.',
                  icon: Sparkles
                }
              ].map((focus, fIdx) => {
                const Icon = focus.icon;
                return (
                  <div key={fIdx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                    <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-white">{focus.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{focus.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. POLAR STORIES */}
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
            <span>All Stories ({POLAR_STORIES.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Editorial Layout: 1 Large Feature + 2 Supporting Stories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Large Feature Story (7 cols) */}
          <Link
            href={`/stories/${POLAR_STORIES[0].slug}`}
            className="lg:col-span-7 group rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between polar-card-hover"
          >
            <div>
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
                <img
                  src="/images/polar/ice-core-research.jpg"
                  alt={POLAR_STORIES[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute top-4 left-4 bg-sky-950/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-sky-300 border border-sky-400/30">
                  Featured Dispatch • Climate Change
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 text-xs text-sky-300 mb-1">
                    <span>{POLAR_STORIES[0].date}</span>
                    <span>•</span>
                    <span>{POLAR_STORIES[0].readTime}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black leading-tight text-white group-hover:text-sky-300 transition-colors">
                    {POLAR_STORIES[0].title}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {POLAR_STORIES[0].summary}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Climate Change', 'Ice Cores', 'Fieldwork', 'Antarctica'].map(tag => (
                    <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 mt-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs border border-sky-400/30">
                  VS
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-800 dark:text-slate-200">{POLAR_STORIES[0].author}</p>
                  <p className="text-[11px] text-slate-400">{POLAR_STORIES[0].authorRole}</p>
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
            {POLAR_STORIES.slice(1, 3).map((story, sIdx) => {
              const storyImg = sIdx === 0 ? '/images/polar/southern-ocean.jpg' : '/images/polar/arctic-himadri.jpg';
              return (
                <Link
                  key={story.id}
                  href={`/stories/${story.slug}`}
                  className="group flex-1 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between polar-card-hover"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-950">
                        <img
                          src={storyImg}
                          alt={story.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                          {sIdx === 0 ? 'Wildlife & Ecosystems' : 'Expedition Life'}
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
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. MEDIA GALLERY */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Photographic & Sensor Archives
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Polar Media Gallery
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Verified high-resolution scientific photography from field expeditions and polar stations
            </p>
          </div>

          <Link
            href="/media"
            className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
          >
            <span>Explore Full Archive ({POLAR_MEDIA.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {['All', 'Antarctica', 'Arctic', 'Stations', 'Wildlife', 'Research'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setMediaFilter(tab)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                mediaFilter === tab
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveMedia(item)}
              className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 polar-card-hover bg-slate-950"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              <span className="absolute top-2.5 left-2.5 text-[9px] font-bold px-2 py-0.5 rounded-md bg-black/70 text-white backdrop-blur-sm border border-white/10">
                {item.category}
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
      {/* 9. POLAR CLASSROOM */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              <GraduationCap className="w-4 h-4" />
              <span>Outreach & Education Modules</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Polar Classroom
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Interactive cryospheric science modules with downloadable curriculum lesson plans
            </p>
          </div>

          <Link
            href="/classroom"
            className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
          >
            <span>Launch Polar Classroom</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: 'What is the Polar Vortex?',
              audience: 'School (Grades 8-12)',
              desc: 'Discover the stratospheric jet stream circling the Arctic and why low-pressure destabilization drives extreme mid-latitude cold snaps.',
              color: 'border-sky-500/30 bg-sky-950/20'
            },
            {
              title: 'How Ice Cores Reveal Earth\'s History',
              audience: 'University & High School',
              desc: 'Learn how trapped atmospheric bubbles inside polar ice sheets preserve 800,000 years of past carbon dioxide and temperature fluctuations.',
              color: 'border-cyan-500/30 bg-cyan-950/20'
            },
            {
              title: 'Why the Southern Ocean Matters',
              audience: 'General Public & Students',
              desc: 'Examine the global ocean conveyor belt, Antarctic Bottom Water (AABW) formation, and how the Southern Ocean absorbs 40% of oceanic CO₂.',
              color: 'border-indigo-500/30 bg-indigo-950/20'
            },
            {
              title: 'Life Under the Sea Ice',
              audience: 'School & Curious Minds',
              desc: 'Investigate sympagic ecosystems, krill swarms, antifreeze glycoproteins in fish, and psychrophilic bacteria thriving at -2°C.',
              color: 'border-emerald-500/30 bg-emerald-950/20'
            }
          ].map((mod, mIdx) => (
            <div
              key={mIdx}
              className={`rounded-2xl p-5 border ${mod.color} bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4`}
            >
              <div className="space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                  {mod.audience}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {mod.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {mod.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <Link
                  href="/classroom"
                  className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
                >
                  Explore Lesson →
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDownloadLessonPlan(mod.title, mod.audience);
                  }}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-sky-500 hover:text-white transition-colors"
                  title="Download Lesson Plan Summary"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. SCIENTIFIC COMMUNICATION WORKFLOW */}
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
            How POLARVISION bridges high-latitude sensor telemetry and polar research into verified public communication
          </p>
        </div>

        {/* 3-Step Visual Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-md space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Field Expedition & Data Collection
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Polar researchers deploy CTD ocean casts, extract continental ice cores, and operate continuous atmospheric observatories at Bharati, Maitri, and Himadri.
            </p>
            <div className="text-[11px] font-mono text-sky-500">
              Output: Raw telemetry, NetCDF matrices & physical cores
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-md space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Peer-Reviewed Analysis & Archival
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Data undergo multi-institution calibration and peer review in international journals (Nature, Polar Science). Datasets are registered with verified DOIs in open archives.
            </p>
            <div className="text-[11px] font-mono text-cyan-500">
              Output: Peer-reviewed monographs & public open data packages
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-md space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Public Outreach & Multilingual Communication
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The POLARVISION Content Studio synthesizes verified papers into audience-tailored articles, classroom quizzes, and social explainers with traceable citations.
            </p>
            <div className="text-[11px] font-mono text-emerald-500">
              Output: Engaging public stories, classroom curricula & press feeds
            </div>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-sky-500 hover:bg-sky-400 text-navy-950 shadow-lg shadow-sky-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Try in Content Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. CONTENT STUDIO CTA BANNER */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 border border-sky-500/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden space-y-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950 border border-sky-400/40 text-xs font-bold text-sky-300">
                <PenTool className="w-3.5 h-3.5" />
                <span>Science Communication Pipeline</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Polar Content Studio
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Transform complex scientific papers into news articles, social posts, classroom summaries, and press releases with traceable DOI citations and multilingual generation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 text-navy-950 shadow-xl shadow-sky-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch Content Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/studio/workflow"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Editorial Review Kanban</span>
              </Link>
            </div>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 relative z-10">
            {[
              { title: 'News Articles', desc: 'In-depth science journalism for general readers' },
              { title: 'Social Media Posts', desc: 'Complete hooks, hashtags, and real polar imagery' },
              { title: 'Classroom Summaries', desc: 'Structured pedagogy for secondary and higher education' },
              { title: 'Press Releases', desc: 'Formal institutional releases with researcher citations' }
            ].map((feat, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                <span className="text-[10px] font-mono font-bold text-sky-400 block">Feature 0{idx + 1}</span>
                <h4 className="text-xs font-bold text-white">{feat.title}</h4>
                <p className="text-[11px] text-slate-300">{feat.desc}</p>
              </div>
            ))}
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
