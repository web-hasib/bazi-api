'use client';

import React from 'react';
import type { BaziCalculateResponse } from '@/lib/types';
import { Compass, TrendingUp, DollarSign, Activity, Briefcase, CalendarCheck } from 'lucide-react';

interface LuckPillarsViewProps {
  data: BaziCalculateResponse;
}

export const LuckPillarsView: React.FC<LuckPillarsViewProps> = ({ data }) => {
  const { luckPillars, lifePredictions, currentAnnualLuck } = data;

  return (
    <div className="space-y-5">
      {/* 1. 10-Year Luck Pillars (Da Yun / 大运) */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xl text-stone-200">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-stone-800">
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>10-Year Luck Cycles (大运周期)</span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Decade-by-decade energy shifts governing career, prosperity, and life turning points
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">
              Direction: <strong>{luckPillars?.direction || 'Forward'}</strong>
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
              Starting Age: <strong>{luckPillars?.startingAge ?? '4'} yrs</strong>
            </span>
          </div>
        </div>

        {/* Luck pillars cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {luckPillars?.pillars && luckPillars.pillars.length > 0 ? (
            luckPillars.pillars.map((lp, idx) => (
              <div
                key={idx}
                className="bg-stone-950 border border-stone-800 hover:border-amber-600/50 rounded-xl p-3 text-center transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] text-stone-500 block font-mono">Pillar #{idx + 1}</span>
                  <span className="text-xs font-semibold text-stone-400 block mt-0.5">
                    Age {lp.age} - {lp.age + 9}
                  </span>
                </div>
                <div className="my-2 py-2 bg-stone-900 rounded-lg border border-stone-800">
                  <span className="text-2xl font-black text-amber-200 tracking-wider">
                    {lp.pillar}
                  </span>
                </div>
                <span className="text-[10px] text-stone-400">10-Yr Cycle</span>
              </div>
            ))
          ) : (
            <p className="text-xs text-stone-500 col-span-full">No luck pillars calculated</p>
          )}
        </div>
      </div>

      {/* 2. Annual Luck (Liu Nian) & High-Level Life Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Annual Luck */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xl text-stone-200 flex flex-col justify-between">
          <div>
            <div className="pb-3 mb-4 border-b border-stone-800">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-amber-400" />
                <span>Annual Luck (流年运势)</span>
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Current Year {currentAnnualLuck?.currentYear || new Date().getFullYear()} Outlook
              </p>
            </div>

            <div className="space-y-3.5">
              <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-400 block">Annual Pillar (流年干支)</span>
                  <span className="text-xl font-bold text-amber-200">
                    {currentAnnualLuck?.annualPillar || '丙午 (Fire Horse)'}
                  </span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Year {currentAnnualLuck?.currentYear || '2026'}
                </span>
              </div>

              <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                <span className="text-xs text-stone-400 block mb-1">Overall Climate</span>
                <p className="text-xs text-stone-200 leading-relaxed">
                  {currentAnnualLuck?.overallFortune ||
                    'Focus on steady forward momentum, resource building, and careful capital distribution.'}
                </p>
              </div>

              {currentAnnualLuck?.keyEvents && currentAnnualLuck.keyEvents.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-stone-400 block">Key Milestones:</span>
                  {currentAnnualLuck.keyEvents.map((evt, i) => (
                    <div
                      key={i}
                      className="text-xs bg-stone-950 px-2.5 py-1.5 rounded-lg border border-stone-800/80 text-stone-300"
                    >
                      • {evt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Life Predictions */}
        <div className="lg:col-span-2 bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xl text-stone-200 flex flex-col justify-between">
          <div>
            <div className="pb-3 mb-4 border-b border-stone-800">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Life Predictions & Trajectory (格局推演)</span>
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Strategic career alignment, financial magnetism, and vitality maintenance
              </p>
            </div>

            <div className="space-y-4">
              {/* Career */}
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-1.5">
                  <Briefcase className="w-4 h-4 text-amber-400" />
                  <span>Optimal Career Direction (事业财官)</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {lifePredictions?.careerDirection ||
                    'Leadership, analytical research, technology infrastructure, or international commerce.'}
                </p>
              </div>

              {/* Wealth */}
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>Wealth & Asset Building (财富潜能)</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {lifePredictions?.wealthPotential ||
                    'Strong compounding returns through specialized mastery and intellectual assets.'}
                </p>
              </div>

              {/* Health */}
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 mb-1.5">
                  <Activity className="w-4 h-4 text-rose-400" />
                  <span>Vitality & Health Focus (健康调养)</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {lifePredictions?.healthFocus && lifePredictions.healthFocus.length > 0 ? (
                    lifePredictions.healthFocus.map((hf, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300"
                      >
                        {hf}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-stone-500">Harmonious vitality</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
