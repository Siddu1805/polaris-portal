'use client';

import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

export function DataHubCharts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);



  // 1. Datasets by Year
  const datasetsByYearData = [
    { year: '2019', datasets: 48, openAccess: 42 },
    { year: '2020', datasets: 65, openAccess: 58 },
    { year: '2021', datasets: 92, openAccess: 86 },
    { year: '2022', datasets: 135, openAccess: 128 },
    { year: '2023', datasets: 210, openAccess: 198 },
    { year: '2024', datasets: 300, openAccess: 286 },
  ];

  // 2. Datasets by Research Domain
  const domainData = [
    { name: 'Glaciology', count: 280, color: '#38bdf8' },
    { name: 'Oceanography', count: 220, color: '#0284c7' },
    { name: 'Atmospheric Physics', count: 165, color: '#00e5ff' },
    { name: 'Marine Biology', count: 115, color: '#10b981' },
    { name: 'Geophysics', count: 70, color: '#818cf8' },
  ];

  // 3. Arctic vs Antarctic vs Southern Ocean
  const regionBreakdown = [
    { name: 'Antarctica', value: 490, color: '#0ea5e9' },
    { name: 'Arctic', value: 240, color: '#38bdf8' },
    { name: 'Southern Ocean', value: 120, color: '#06b6d4' },
  ];

  // 4. Oceanographic Observations Over Time (Depth vs Salinity/Temp records)
  const oceanObservationsData = [
    { month: 'Oct', ctdProfiles: 180, gliderMiles: 420 },
    { month: 'Nov', ctdProfiles: 340, gliderMiles: 780 },
    { month: 'Dec', ctdProfiles: 620, gliderMiles: 1420 },
    { month: 'Jan', ctdProfiles: 940, gliderMiles: 2100 },
    { month: 'Feb', ctdProfiles: 880, gliderMiles: 1980 },
    { month: 'Mar', ctdProfiles: 410, gliderMiles: 920 },
  ];

  const customTooltipStyle = {
    backgroundColor: '#0f172a',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderRadius: '0.75rem',
    color: '#f8fafc',
    fontSize: '12px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Chart 1: Datasets Published by Year */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Dataset Ingestion Growth by Year
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Total observational datasets submitted to the open archive
          </p>
        </div>
        <div className="h-64 w-full mt-4 min-w-0">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={datasetsByYearData}>
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="datasets" name="Total Datasets" fill="#0284c7" radius={[4, 4, 0, 0]} isAnimationActive={false} />
                <Bar dataKey="openAccess" name="Open Access" fill="#38bdf8" radius={[4, 4, 0, 0]} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <svg className="w-full h-full text-sky-500" viewBox="0 0 500 240" fill="none">
              <line x1="40" y1="200" x2="480" y2="200" stroke="#334155" strokeWidth="1" />
              <line x1="40" y1="40" x2="40" y2="200" stroke="#334155" strokeWidth="1" />
              <rect x="70" y="160" width="18" height="40" rx="3" fill="#0284c7" />
              <rect x="92" y="165" width="18" height="35" rx="3" fill="#38bdf8" />
              <rect x="140" y="145" width="18" height="55" rx="3" fill="#0284c7" />
              <rect x="162" y="150" width="18" height="50" rx="3" fill="#38bdf8" />
              <rect x="210" y="120" width="18" height="80" rx="3" fill="#0284c7" />
              <rect x="232" y="125" width="18" height="75" rx="3" fill="#38bdf8" />
              <rect x="280" y="85" width="18" height="115" rx="3" fill="#0284c7" />
              <rect x="302" y="90" width="18" height="110" rx="3" fill="#38bdf8" />
              <rect x="350" y="50" width="18" height="150" rx="3" fill="#0284c7" />
              <rect x="372" y="55" width="18" height="145" rx="3" fill="#38bdf8" />
              <rect x="420" y="20" width="18" height="180" rx="3" fill="#0284c7" />
              <rect x="442" y="25" width="18" height="175" rx="3" fill="#38bdf8" />
            </svg>
          )}
        </div>
      </div>

      {/* Chart 2: Datasets by Research Domain */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Datasets by Research Domain
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Distribution across primary high-latitude disciplines
          </p>
        </div>
        <div className="h-64 w-full mt-4 min-w-0">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={domainData} layout="vertical">
                <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={10} width={110} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Bar dataKey="count" name="Datasets" fill="#38bdf8" radius={[0, 4, 4, 0]} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <svg className="w-full h-full" viewBox="0 0 500 240" fill="none">
              <rect x="120" y="25" width="320" height="24" rx="4" fill="#38bdf8" />
              <text x="110" y="42" fill="#94a3b8" fontSize="11" textAnchor="end">Glaciology</text>
              <rect x="120" y="65" width="250" height="24" rx="4" fill="#0284c7" />
              <text x="110" y="82" fill="#94a3b8" fontSize="11" textAnchor="end">Oceanography</text>
              <rect x="120" y="105" width="190" height="24" rx="4" fill="#00e5ff" />
              <text x="110" y="122" fill="#94a3b8" fontSize="11" textAnchor="end">Atmospheric</text>
              <rect x="120" y="145" width="130" height="24" rx="4" fill="#10b981" />
              <text x="110" y="162" fill="#94a3b8" fontSize="11" textAnchor="end">Marine Bio</text>
              <rect x="120" y="185" width="80" height="24" rx="4" fill="#818cf8" />
              <text x="110" y="202" fill="#94a3b8" fontSize="11" textAnchor="end">Geophysics</text>
            </svg>
          )}
        </div>
      </div>

      {/* Chart 3: Geographic Distribution (Arctic vs Antarctic vs Southern Ocean) */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Polar Geographic Distribution
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Proportion of archives across Antarctica, Arctic, and Southern Ocean
          </p>
        </div>
        <div className="h-64 w-full mt-4 min-w-0 flex items-center justify-center">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={regionBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                  isAnimationActive={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {regionBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={customTooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center gap-6">
              <div className="w-36 h-36 rounded-full border-8 border-sky-500 border-t-cyan-400 border-r-indigo-500 animate-spin-slow" />
              <div className="text-xs space-y-1.5 text-slate-400">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-sky-500" /> Antarctica (58%)</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-sky-400" /> Arctic (28%)</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-cyan-500" /> Southern Ocean (14%)</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chart 4: Oceanographic Observations During Field Season */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Oceanographic Observations (Seasonal Surge)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            CTD profiling casts and autonomous underwater glider nautical miles
          </p>
        </div>
        <div className="h-64 w-full mt-4 min-w-0">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={oceanObservationsData}>
                <defs>
                  <linearGradient id="ctdGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gliderGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00e5ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Area type="monotone" dataKey="ctdProfiles" name="CTD Casts" stroke="#38bdf8" fillOpacity={1} fill="url(#ctdGrad)" isAnimationActive={false} />
                <Area type="monotone" dataKey="gliderMiles" name="Glider Miles Tracked" stroke="#00e5ff" fillOpacity={1} fill="url(#gliderGrad)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <svg className="w-full h-full" viewBox="0 0 500 240" fill="none">
              <path d="M40 180 Q 140 160, 240 100 T 460 60 L 460 200 L 40 200 Z" fill="#0284c7" fillOpacity="0.4" />
              <path d="M40 190 Q 140 140, 240 80 T 460 30 L 460 200 L 40 200 Z" fill="#00e5ff" fillOpacity="0.3" />
              <line x1="40" y1="200" x2="480" y2="200" stroke="#334155" strokeWidth="1" />
            </svg>
          )}
        </div>
      </div>

    </div>
  );
}
