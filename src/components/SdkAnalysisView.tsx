'use client';

import React from 'react';
import type { BaziCalculateResponse } from '@/lib/types';
import { BarChart3, Compass, Calendar, Moon, Sun, Shield, Layers } from 'lucide-react';

interface SdkAnalysisViewProps {
  data: BaziCalculateResponse;
}

const ELEMENT_COLORS: Record<string, string> = {
  Wood: 'bg-emerald-500',
  Fire: 'bg-rose-500',
  Earth: 'bg-amber-500',
  Metal: 'bg-slate-300',
  Water: 'bg-blue-500',
};

export const SdkAnalysisView: React.FC<SdkAnalysisViewProps> = ({ data }) => {
  const { fiveElements, analysis, solar, lunar, zodiac, constellation, advancedPillars } = data;
  const stats = fiveElements?.statistics || {};
  const elements = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];

  return (
    <div className="space-y-6">
      {/* Top row: Five Elements & Core Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Five Elements Statistics */}
        <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800">
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <span>Five Elements Distribution (五行)</span>
            </h3>
            {analysis?.balanced !== undefined && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                {analysis.balanced ? 'Balanced' : 'Asymmetric'}
              </span>
            )}
          </div>

          <div className="space-y-3.5 mt-3">
            {elements.map((el) => {
              const raw = stats[el] || '0%';
              const num = parseInt(raw.replace('%', ''), 10) || 0;
              return (
                <div key={el} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-zinc-300 flex items-center gap-2">
                      <span>{el}</span>
                      {analysis?.strongestElement === el && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">
                          Dominant
                        </span>
                      )}
                      {analysis?.weakestElement === el && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                          Weakest
                        </span>
                      )}
                    </span>
                    <span className="font-mono font-bold text-white">{raw}</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        ELEMENT_COLORS[el] || 'bg-indigo-500'
                      }`}
                      style={{ width: `${Math.max(3, num)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Core Analysis (Strength, YongShen, Favorable) */}
        <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800">
              <h3 className="text-sm font-semibold text-white tracking-wide uppercase flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-400" />
                <span>Day Master Analysis (格局分析)</span>
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono">
                {analysis?.dayMasterStrength || 'Standard'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800/80">
                <span className="text-[11px] text-zinc-400 block mb-1">Useful God (用神)</span>
                <span className="text-sm font-bold text-indigo-300 font-mono">
                  {analysis?.yongShen || 'N/A'}
                </span>
              </div>

              <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800/80">
                <span className="text-[11px] text-zinc-400 block mb-1">Void Branch (空亡)</span>
                <span className="text-sm font-bold text-zinc-200 font-mono">
                  {analysis?.voidBranch || 'None'}
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div>
                <span className="text-zinc-400 block mb-1 font-medium">Favorable Elements (喜神):</span>
                <div className="flex flex-wrap gap-1.5">
                  {analysis?.favorableElements && analysis.favorableElements.length > 0 ? (
                    analysis.favorableElements.map((el, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-lg bg-emerald-950/50 text-emerald-300 border border-emerald-800/50 font-medium"
                      >
                        {el}
                      </span>
                    ))
                  ) : (
                    <span className="text-zinc-500">—</span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-zinc-400 block mb-1 font-medium">Unfavorable Elements (忌神):</span>
                <div className="flex flex-wrap gap-1.5">
                  {analysis?.unfavorableElements && analysis.unfavorableElements.length > 0 ? (
                    analysis.unfavorableElements.map((el, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-lg bg-rose-950/50 text-rose-300 border border-rose-800/50 font-medium"
                      >
                        {el}
                      </span>
                    ))
                  ) : (
                    <span className="text-zinc-500">—</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Astronomical & Advanced Pillars Card */}
      <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm">
        <h3 className="text-sm font-semibold text-white tracking-wide uppercase flex items-center gap-2 pb-3 mb-4 border-b border-zinc-800">
          <Calendar className="w-4 h-4 text-indigo-400" />
          <span>Astronomical Metadata & Advanced Pillars</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {/* Solar */}
          <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800">
            <span className="text-[10px] text-zinc-400 flex items-center gap-1 mb-1">
              <Sun className="w-3 h-3 text-amber-400" /> Solar Date
            </span>
            <span className="font-mono font-semibold text-white block truncate">
              {solar?.solarDateTime || '—'}
            </span>
            <span className="text-zinc-500 text-[10px]">{solar?.weekDay}</span>
          </div>

          {/* Lunar */}
          <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800">
            <span className="text-[10px] text-zinc-400 flex items-center gap-1 mb-1">
              <Moon className="w-3 h-3 text-blue-400" /> Lunar Date
            </span>
            <span className="font-semibold text-white block truncate">
              {lunar?.chineseDate || '—'}
            </span>
            <span className="text-zinc-500 text-[10px]">
              M{lunar?.lunarMonth} D{lunar?.lunarDay}
            </span>
          </div>

          {/* Zodiac & Constellation */}
          <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800">
            <span className="text-[10px] text-zinc-400 mb-1 block">Zodiac / Constellation</span>
            <span className="font-semibold text-indigo-300 block">
              {zodiac?.animal || zodiac?.chineseZodiac}
            </span>
            <span className="text-zinc-500 text-[10px]">{constellation?.westernConstellation}</span>
          </div>

          {/* Tai Yuan */}
          <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800">
            <span className="text-[10px] text-zinc-400 mb-1 block">Conception (胎元)</span>
            <span className="font-mono font-bold text-lg text-zinc-100 block">
              {advancedPillars?.taiYuan || '—'}
            </span>
            <span className="text-zinc-500 text-[10px]">Tai Yuan</span>
          </div>

          {/* Ming Gong */}
          <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800">
            <span className="text-[10px] text-zinc-400 mb-1 block">Life Palace (命宫)</span>
            <span className="font-mono font-bold text-lg text-zinc-100 block">
              {advancedPillars?.mingGong || '—'}
            </span>
            <span className="text-zinc-500 text-[10px]">Ming Gong</span>
          </div>

          {/* Shen Gong */}
          <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800">
            <span className="text-[10px] text-zinc-400 mb-1 block">Body Palace (身宫)</span>
            <span className="font-mono font-bold text-lg text-zinc-100 block">
              {advancedPillars?.shenGong || '—'}
            </span>
            <span className="text-zinc-500 text-[10px]">Shen Gong</span>
          </div>
        </div>
      </div>
    </div>
  );
};
