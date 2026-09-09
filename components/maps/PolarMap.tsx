'use client';

import React, { useState, useEffect, useRef } from 'react';
import { POLAR_STATIONS, ResearchStation } from '@/data/polaris-data';
import { StationInfoDrawer } from '@/components/maps/StationInfoDrawer';
import { MapPin, Navigation, Eye, Layers, Compass, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export function PolarMap() {
  const [selectedStation, setSelectedStation] = useState<ResearchStation | null>(null);
  const [activeRegionFilter, setActiveRegionFilter] = useState<'All' | 'Antarctica' | 'Arctic' | 'Southern Ocean'>('All');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [centerOffset, setCenterOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  const filteredStations = POLAR_STATIONS.filter((st) => {
    if (activeRegionFilter === 'All') return true;
    return st.region === activeRegionFilter;
  });

  // Calculate pixel coordinates for polar stereographic projection projection / equirectangular canvas
  // Input: [lat, lng], Output: { x, y } in percentage [0..100]
  const projectCoords = (lat: number, lng: number) => {
    // Equirectangular mapping:
    // x: (-180 to 180) -> (0 to 100%)
    // y: (90 to -90) -> (0 to 100%)
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x, y };
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.35, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.35, 0.8));
  const handleReset = () => {
    setZoomLevel(1);
    setCenterOffset({ x: 0, y: 0 });
    setActiveRegionFilter('All');
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - centerOffset.x, y: e.clientY - centerOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setCenterOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Expedition routes
  const routes = [
    {
      name: 'Indian Antarctic Voyage Track (Goa → Cape Town → Larsemann Hills)',
      path: [
        { lat: 15.4, lng: 73.8 }, // Goa
        { lat: -33.9, lng: 18.4 }, // Cape Town
        { lat: -60.0, lng: 57.5 }, // 60°S Front
        { lat: -69.4, lng: 76.2 } // Bharati Station
      ],
      color: '#38bdf8'
    },
    {
      name: 'Central Dronning Maud Land Traverse (Maitri Corridor)',
      path: [
        { lat: -70.08, lng: 12.0 }, // Shelf
        { lat: -70.76, lng: 11.73 }, // Maitri
        { lat: -71.2, lng: 12.45 } // Deep Drilling Camp
      ],
      color: '#00E5FF'
    },
    {
      name: 'Arctic Gateway Corridor (Tromsø → Ny-Ålesund)',
      path: [
        { lat: 69.65, lng: 18.96 }, // Tromsø
        { lat: 78.92, lng: 11.93 } // Himadri, Svalbard
      ],
      color: '#a78bfa'
    }
  ];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-sky-500/20 bg-slate-950 shadow-2xl">
      {/* Map Header & Controls Overlay */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Region Filter Chips */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 backdrop-blur-md rounded-xl border border-sky-500/30 pointer-events-auto shadow-lg">
          {(['All', 'Antarctica', 'Arctic', 'Southern Ocean'] as const).map((reg) => (
            <button
              key={reg}
              onClick={() => {
                setActiveRegionFilter(reg);
                if (reg === 'Antarctica') {
                  setZoomLevel(1.6);
                  setCenterOffset({ x: -100, y: -180 });
                } else if (reg === 'Arctic') {
                  setZoomLevel(1.7);
                  setCenterOffset({ x: -50, y: 180 });
                } else if (reg === 'Southern Ocean') {
                  setZoomLevel(1.4);
                  setCenterOffset({ x: -80, y: -120 });
                } else {
                  handleReset();
                }
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                activeRegionFilter === reg
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {reg === 'All' ? 'Global Polar Network' : reg}
            </button>
          ))}
        </div>

        {/* Map Control Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 backdrop-blur-md rounded-xl border border-sky-500/30 pointer-events-auto shadow-lg">
          <button
            onClick={handleZoomIn}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
            title="Reset map perspective"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Map Interactive Canvas */}
      <div
        className="relative w-full h-[520px] sm:h-[620px] cursor-grab active:cursor-grabbing select-none overflow-hidden bg-radial from-slate-900 via-navy-950 to-black"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="absolute inset-0 transition-transform duration-100 ease-out"
          style={{
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px) scale(${zoomLevel})`,
            transformOrigin: '50% 50%'
          }}
        >
          {/* Stylized Polar Ocean Grid & Latitude Circles */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            <defs>
              <pattern id="polarGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="1" />
              </pattern>
              <linearGradient id="routeGlow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#polarGrid)" />

            {/* Arctic Circle (66.5°N) */}
            <line x1="0" y1="13%" x2="100%" y2="13%" stroke="rgba(56, 189, 248, 0.25)" strokeDasharray="6 4" strokeWidth="1.5" />
            <text x="12" y="12%" fill="#38bdf8" fontSize="10" fontFamily="monospace" opacity="0.6">ARCTIC CIRCLE (66.5° N)</text>

            {/* Equator */}
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="1" />
            <text x="12" y="49%" fill="#64748b" fontSize="9" fontFamily="monospace" opacity="0.5">EQUATOR (0°)</text>

            {/* Antarctic Circle (66.5°S) */}
            <line x1="0" y1="87%" x2="100%" y2="87%" stroke="rgba(56, 189, 248, 0.25)" strokeDasharray="6 4" strokeWidth="1.5" />
            <text x="12" y="86%" fill="#38bdf8" fontSize="10" fontFamily="monospace" opacity="0.6">ANTARCTIC CIRCLE (66.5° S)</text>

            {/* Expedition Route Polyline Overlays */}
            {routes.map((route, idx) => {
              const points = route.path
                .map((pt) => {
                  const p = projectCoords(pt.lat, pt.lng);
                  return `${p.x}%,${p.y}%`;
                })
                .join(' ');

              return (
                <g key={idx}>
                  <polyline
                    points={points}
                    fill="none"
                    stroke={route.color}
                    strokeWidth="2"
                    strokeDasharray="4 3"
                    className="opacity-75 animate-pulse"
                  />
                </g>
              );
            })}
          </svg>

          {/* Continents Outline Background */}
          <div className="absolute inset-0 pointer-events-none opacity-25">
            {/* Arctic Region Glow */}
            <div className="absolute top-2 left-1/4 right-1/4 h-28 rounded-full bg-sky-500/20 blur-3xl" />
            {/* Antarctic Region Glow */}
            <div className="absolute bottom-2 left-1/4 right-1/4 h-36 rounded-full bg-cyan-500/25 blur-3xl" />
          </div>

          {/* Station Markers */}
          {filteredStations.map((station) => {
            const pos = projectCoords(station.coordinates[0], station.coordinates[1]);
            const isSelected = selectedStation?.id === station.id;

            return (
              <div
                key={station.id}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedStation(station);
                }}
              >
                {/* Pulsing Radar Ring */}
                <span className="absolute -inset-2 rounded-full bg-sky-400/30 animate-ping" />

                {/* Pin Icon */}
                <div
                  className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                    isSelected
                      ? 'bg-sky-400 text-slate-950 scale-125 ring-4 ring-sky-400/40'
                      : 'bg-slate-900 border-2 border-sky-400 text-sky-400 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                </div>

                {/* Label Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 whitespace-nowrap pointer-events-none transition-all duration-200 opacity-90 group-hover:opacity-100 group-hover:-translate-y-1">
                  <div className="bg-slate-900/95 backdrop-blur-md border border-sky-500/30 text-white px-2.5 py-1 rounded-lg shadow-xl text-center">
                    <p className="text-xs font-bold tracking-tight">{station.name}</p>
                    <p className="text-[10px] text-sky-400 font-mono">
                      {station.region} • {station.coordinates[0]}°, {station.coordinates[1]}°
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend / Status Telemetry Bar */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 rounded-xl bg-slate-900/85 backdrop-blur-md border border-sky-500/20 text-xs text-slate-300 shadow-xl pointer-events-auto">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="font-semibold text-white">Active Polar Observatories ({filteredStations.length})</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
              <Navigation className="w-3.5 h-3.5 text-sky-400" />
              <span>Dashed lines: Expedition & Logistics Corridors</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-3">
            <span>Click any marker to inspect station scientific assets</span>
            <span className="hidden md:inline font-mono text-sky-400">Zoom: {Math.round(zoomLevel * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Quick Station Carousel / Selector Strip */}
      <div className="p-3 bg-slate-900 border-t border-sky-500/20 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap pl-1 hidden sm:inline">
          Quick Inspect:
        </span>
        {filteredStations.map((st) => (
          <button
            key={st.id}
            onClick={() => setSelectedStation(st)}
            className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-medium whitespace-nowrap border transition-all flex items-center gap-1.5 flex-shrink-0 ${
              selectedStation?.id === st.id
                ? 'bg-sky-500/20 border-sky-400 text-sky-300 ring-1 ring-sky-400/30'
                : 'bg-slate-800/80 border-slate-700/60 text-slate-300 hover:border-sky-500/40 hover:text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span>{st.name}</span>
          </button>
        ))}
      </div>

      {/* Slide-out Station Detail Drawer */}
      <StationInfoDrawer
        station={selectedStation}
        onClose={() => setSelectedStation(null)}
      />
    </div>
  );
}
