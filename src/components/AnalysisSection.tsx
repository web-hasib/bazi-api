'use client';

import React from 'react';
import type { BaziCalculateResponse } from '@/lib/types';
import { Star, Zap, Calendar, Compass, Sun, Moon } from 'lucide-react';

interface AnalysisSectionProps {
  data: BaziCalculateResponse;
}

export const AnalysisSection: React.FC<AnalysisSectionProps> = ({ data }) => {
  const {
    analysis,
    solar,
    lunar,
    zodiac,
    constellation,
    solarTerms,
    advancedPillars,
  } = data;

  const stars = analysis?.godsAndStars;
  const interactions = analysis?.interactions;

  return (
    <div className="space-y-5">
      {/* Grid for Stars & Interactions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1. Auspicious & Inauspicious Stars (Shen Sha) */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xl text-stone-200">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-800">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Gods & Auspicious Stars (神煞分析)</span>
            </h3>
            <span className="text-xs text-stone-400">Special Astrological Markers</span>
          </div>

          <div className="space-y-3">
            {/* Nobleman */}
            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
              <span className="text-xs font-semibold text-amber-300 block mb-1">
                Tian Yi Nobleman (天乙贵人 - Mentors & Helpers)
              </span>
              <p className="text-xs text-stone-300">
                {stars?.nobleman && stars.nobleman.length > 0
                  ? stars.nobleman.join(', ')
                  : 'Neutral presence'}
              </p>
            </div>

            {/* Peach Blossom */}
            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
              <span className="text-xs font-semibold text-rose-300 block mb-1">
                Peach Blossom (红鸾 / 咸池 - Charisma & Romance)
              </span>
              <p className="text-xs text-stone-300">
                {stars?.peachBlossom && stars.peachBlossom.length > 0
                  ? stars.peachBlossom.join(', ')
                  : 'Subtle romance magnetism'}
              </p>
            </div>

            {/* Academic Star */}
            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
              <span className="text-xs font-semibold text-blue-300 block mb-1">
                Wen Chang Academic Star (文昌星 - Intellect & Learning)
              </span>
              <p className="text-xs text-stone-300">
                {stars?.academicStar && stars.academicStar.length > 0
                  ? stars.academicStar.join(', ')
                  : 'Self-driven academic curiosity'}
              </p>
            </div>

            {/* Travel Horse & General Star */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                <span className="text-xs font-semibold text-emerald-300 block mb-1">
                  Travel Horse (驿马)
                </span>
                <p className="text-xs text-stone-300">
                  {stars?.travelHorse && stars.travelHorse.length > 0
                    ? stars.travelHorse.join(', ')
                    : 'Stable environment'}
                </p>
              </div>
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                <span className="text-xs font-semibold text-purple-300 block mb-1">
                  General Star (将星)
                </span>
                <p className="text-xs text-stone-300">
                  {stars?.generalStar && stars.generalStar.length > 0
                    ? stars.generalStar.join(', ')
                    : 'Independent authority'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Earthly Branch Interactions (Clashes & Combinations) */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xl text-stone-200">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-800">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Branch Interactions (刑冲合害)</span>
            </h3>
            <span className="text-xs text-stone-400">Dynamic Relationships</span>
          </div>

          <div className="space-y-3">
            {/* Combinations (Harmony) */}
            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
              <span className="text-xs font-semibold text-emerald-400 block mb-1">
                Combinations & Harmonies (合 - Support & Union)
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {interactions?.combinations && interactions.combinations.length > 0 ? (
                  interactions.combinations.map((c, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-700/60">
                      {c}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-stone-500">No major direct branch combinations in natal pillars</span>
                )}
              </div>
            </div>

            {/* Clashes */}
            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
              <span className="text-xs font-semibold text-amber-400 block mb-1">
                Clashes (冲 - Transformation & Movement)
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {interactions?.clashes && interactions.clashes.length > 0 ? (
                  interactions.clashes.map((c, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-700/60">
                      {c}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-stone-500">No active branch clashes</span>
                )}
              </div>
            </div>

            {/* Punishments */}
            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
              <span className="text-xs font-semibold text-rose-400 block mb-1">
                Punishments (刑 - Friction & Discipline)
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {interactions?.punishments && interactions.punishments.length > 0 ? (
                  interactions.punishments.map((c, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded bg-rose-950/70 text-rose-300 border border-rose-700/60">
                      {c}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-stone-500">None detected</span>
                )}
              </div>
            </div>

            {/* Harms */}
            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
              <span className="text-xs font-semibold text-stone-400 block mb-1">
                Harms (害 - Hidden Discomfort)
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {interactions?.harms && interactions.harms.length > 0 ? (
                  interactions.harms.map((c, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded bg-stone-900 text-stone-300 border border-stone-700">
                      {c}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-stone-500">None detected</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Astronomical & Calendar Details + Advanced Pillars */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xl text-stone-200">
        <h3 className="text-base font-semibold text-white flex items-center gap-2 pb-3 mb-4 border-b border-stone-800">
          <Calendar className="w-4 h-4 text-amber-400" />
          <span>Astronomical Calendar & Advanced Reference Pillars</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {/* Solar Info */}
          <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
            <span className="text-[10px] text-stone-400 block mb-1 flex items-center gap-1">
              <Sun className="w-3 h-3 text-amber-400" /> Solar Gregorian
            </span>
            <span className="font-bold text-white block truncate">{solar?.solarDateTime || '—'}</span>
            <span className="text-stone-400 text-[11px] block">{solar?.weekDay}</span>
          </div>

          {/* Lunar Info */}
          <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
            <span className="text-[10px] text-stone-400 block mb-1 flex items-center gap-1">
              <Moon className="w-3 h-3 text-blue-300" /> Lunar Calendar
            </span>
            <span className="font-bold text-white block truncate">{lunar?.chineseDate || '—'}</span>
            <span className="text-stone-400 text-[11px] block">
              Month {lunar?.lunarMonth}, Day {lunar?.lunarDay}
            </span>
          </div>

          {/* Zodiac & Constellation */}
          <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
            <span className="text-[10px] text-stone-400 block mb-1">Zodiac & Constellation</span>
            <span className="font-bold text-amber-300 block">
              {zodiac?.animal} ({zodiac?.chineseZodiac})
            </span>
            <span className="text-stone-400 text-[11px] block">{constellation?.westernConstellation}</span>
          </div>

          {/* Tai Yuan (胎元) */}
          <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
            <span className="text-[10px] text-stone-400 block mb-1">Conception (胎元)</span>
            <span className="font-mono text-base font-extrabold text-amber-200 block">
              {advancedPillars?.taiYuan || '—'}
            </span>
            <span className="text-stone-500 text-[10px]">Tai Yuan</span>
          </div>

          {/* Ming Gong (命宫) */}
          <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
            <span className="text-[10px] text-stone-400 block mb-1">Life Palace (命宫)</span>
            <span className="font-mono text-base font-extrabold text-amber-200 block">
              {advancedPillars?.mingGong || '—'}
            </span>
            <span className="text-stone-500 text-[10px]">Ming Gong</span>
          </div>

          {/* Shen Gong (身宫) */}
          <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
            <span className="text-[10px] text-stone-400 block mb-1">Body Palace (身宫)</span>
            <span className="font-mono text-base font-extrabold text-amber-200 block">
              {advancedPillars?.shenGong || '—'}
            </span>
            <span className="text-stone-500 text-[10px]">Shen Gong</span>
          </div>
        </div>

        {/* Solar terms notice */}
        {solarTerms && (
          <div className="mt-4 pt-3 border-t border-stone-800/80 flex flex-wrap items-center justify-between text-xs text-stone-400 gap-2">
            <span>
              Solar Term (节气):{' '}
              <strong className="text-stone-200">{solarTerms.currentSolarTerm || '—'}</strong>
            </span>
            <span>
              Prev: <span className="text-stone-300">{solarTerms.previousSolarTerm || '—'}</span> | Next:{' '}
              <span className="text-stone-300">{solarTerms.nextSolarTerm || '—'}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
