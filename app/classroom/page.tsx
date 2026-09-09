'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  POLAR_EDUCATIONAL_MODULES, POLAR_FACTS, EducationalModule 
} from '@/data/polaris-data';
import { InteractiveQuiz } from '@/components/classroom/InteractiveQuiz';
import { 
  GraduationCap, BookOpen, Compass, Award, Lightbulb, 
  HelpCircle, ArrowRight, Sparkles, CheckCircle2 
} from 'lucide-react';

export default function PolarClassroomPage() {
  const [activeTab, setActiveTab] = useState<'modules' | 'quiz' | 'facts'>('modules');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Classroom Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-sky-900 via-navy-900 to-slate-900 border border-sky-500/30 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950 border border-sky-400/40 text-xs font-bold text-sky-300">
            <GraduationCap className="w-4 h-4" />
            <span>Science Education & Public Engagement</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Polar Classroom
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Designed for students, educators, and curious minds. Explore why the polar cryosphere controls global climate, discover how scientists survive in -45°C, and test your knowledge with interactive science quizzes.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setActiveTab('quiz');
                const el = document.getElementById('quiz-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-sky-400 hover:bg-sky-300 text-slate-950 shadow-md transition-all hover:scale-105"
            >
              Start Interactive Quiz (5 Questions)
            </button>
            <button
              onClick={() => setActiveTab('modules')}
              className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-slate-900/80 hover:bg-slate-800 text-white border border-sky-400/30 transition-colors"
            >
              Explore Learning Modules
            </button>
          </div>
        </div>
      </div>

      {/* Sections Selector Tabs */}
      <div className="flex items-center justify-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        {[
          { id: 'modules', label: 'Exploration Modules', icon: BookOpen },
          { id: 'quiz', label: 'Interactive Science Quiz', icon: Award },
          { id: 'facts', label: 'Did You Know? Polar Facts', icon: Lightbulb },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                isActive
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20 scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: LEARNING MODULES */}
      {activeTab === 'modules' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Structured Educational Curricula
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              Explore Antarctica, the Arctic & Southern Ocean
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POLAR_EDUCATIONAL_MODULES.map((mod) => (
              <div
                key={mod.id}
                className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={mod.image}
                      alt={mod.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-950/80 text-sky-300 border border-sky-400/40">
                        {mod.region}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 text-white">
                        {mod.duration}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] uppercase font-bold text-sky-300">{mod.targetLevel}</span>
                      <h3 className="text-sm font-bold leading-tight line-clamp-1">{mod.title}</h3>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {mod.description}
                    </p>

                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                        Key Scientific Concepts:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {mod.keyConcepts.map((c) => (
                          <span
                            key={c}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-sky-50/60 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-[11px] text-sky-900 dark:text-sky-300">
                      <strong>Interactive Activity:</strong> {mod.interactiveActivity}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-600 hover:text-white text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    Take Topic Quiz →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: INTERACTIVE QUIZ */}
      {activeTab === 'quiz' && (
        <div id="quiz-section" className="space-y-6 animate-in fade-in duration-200">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Self-Assessment
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Polar Science Interactive Quiz
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Five scientific questions exploring polar desert classification, sea ice dynamics, ancient ice cores, and marine food webs.
            </p>
          </div>

          <InteractiveQuiz />
        </div>
      )}

      {/* SECTION 3: "DID YOU KNOW?" FACTS */}
      {activeTab === 'facts' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Curious Insights
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Did You Know? Polar Facts
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Astonishing truths about high-latitude environments, extreme temperatures, and survival mechanisms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POLAR_FACTS.map((fact, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/20 shadow-sm hover:shadow-lg transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950 flex items-center justify-center text-sky-600 dark:text-sky-400 font-bold text-xs">
                    💡
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                    {fact.category}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    "{fact.fact}"
                  </p>
                </div>

                <span className="text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  Verified Scientific Fact #{idx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
