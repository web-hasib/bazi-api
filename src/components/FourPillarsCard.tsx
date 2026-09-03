'use client';

import React from 'react';
import type { BaziCalculateResponse } from '@/lib/types';
import { Sparkles, Calendar, Layers, Shield } from 'lucide-react';

interface FourPillarsCardProps {
  data: BaziCalculateResponse;
}

// Five Element color tags
export function getElementBadgeStyle(elementStr?: string) {
  if (!elementStr) return 'bg-stone-800 text-stone-300 border-stone-700';
  const el = elementStr.toLowerCase();
  if (el.includes('wood') || el.includes('木')) {
    return 'bg-emerald-950/80 text-emerald-300 border-emerald-600/60';
  }
  if (el.includes('fire') || el.includes('火')) {
    return 'bg-rose-950/80 text-rose-300 border-rose-600/60';
  }
  if (el.includes('earth') || el.includes('土')) {
    return 'bg-amber-950/80 text-amber-300 border-amber-600/60';
  }
  if (el.includes('metal') || el.includes('金')) {
    return 'bg-slate-800 text-slate-200 border-slate-500/60';
  }
  if (el.includes('water') || el.includes('水')) {
    return 'bg-blue-950/80 text-blue-300 border-blue-600/60';
  }
  return 'bg-stone-800 text-stone-300 border-stone-700';
}

export const FourPillarsCard: React.FC<FourPillarsCardProps> = ({ data }) => {
  const {
    pillars,
    heavenlyStems,
    earthlyBranches,
    fiveElements,
    hiddenStems,
    tenGods,
    naYin,
  } = data;

  const pillarCards = [
    {
      key: 'year',
      nameEn: 'Year Pillar',
      nameZh: '年柱',
      scope: 'Roots / Ancestry (0-18 yrs)',
      pillarGanzhi: pillars?.yearPillar || '—',
      stem: heavenlyStems?.yearStem || '—',
      branch: earthlyBranches?.yearBranch || '—',
      element: fiveElements?.yearElement || '—',
      hidden: hiddenStems?.yearHiddenStems || [],
      god: tenGods?.yearTenGod || '—',
      naYin: naYin?.yearNaYin || '—',
      isDayMaster: false,
    },
    {
      key: 'month',
      nameEn: 'Month Pillar',
      nameZh: '月柱',
      scope: 'Career / Parents (19-35 yrs)',
      pillarGanzhi: pillars?.monthPillar || '—',
      stem: heavenlyStems?.monthStem || '—',
      branch: earthlyBranches?.monthBranch || '—',
      element: fiveElements?.monthElement || '—',
      hidden: hiddenStems?.monthHiddenStems || [],
      god: tenGods?.monthTenGod || '—',
      naYin: naYin?.monthNaYin || '—',
      isDayMaster: false,
    },
    {
      key: 'day',
      nameEn: 'Day Pillar',
      nameZh: '日柱',
      scope: 'Self / Day Master (36-50 yrs)',
      pillarGanzhi: pillars?.dayPillar || '—',
      stem: heavenlyStems?.dayStem || '—',
      branch: earthlyBranches?.dayBranch || '—',
      element: fiveElements?.dayElement || '—',
      hidden: hiddenStems?.dayHiddenStems || [],
      god: tenGods?.dayTenGod || 'Self (日元)',
      naYin: naYin?.dayNaYin || '—',
      isDayMaster: true,
    },
    {
      key: 'hour',
      nameEn: 'Hour Pillar',
      nameZh: '时柱',
      scope: 'Future / Legacy (51+ yrs)',
      pillarGanzhi: pillars?.hourPillar || '—',
      stem: heavenlyStems?.hourStem || '—',
      branch: earthlyBranches?.hourBranch || '—',
      element: fiveElements?.hourElement || '—',
      hidden: hiddenStems?.hourHiddenStems || [],
      god: tenGods?.hourTenGod || '—',
      naYin: naYin?.hourNaYin || '—',
      isDayMaster: false,
    },
  ];

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xl text-stone-200">
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone-800">
        <div>
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <span>The Four Pillars of Destiny</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              命局四柱
            </span>
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Year, Month, Day, and Hour Pillars derived from your birth moment
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-stone-400">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span>Day Master (Self)</span>
          </span>
        </div>
      </div>

      {/* 4 Columns Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {pillarCards.map((p) => (
          <div
            key={p.key}
            className={`rounded-xl p-4 border transition-all relative flex flex-col ${
              p.isDayMaster
                ? 'bg-gradient-to-b from-amber-950/40 via-stone-900 to-stone-900 border-amber-600/50 shadow-md shadow-amber-900/10 ring-1 ring-amber-500/30'
                : 'bg-stone-950 border-stone-800 hover:border-stone-700'
            }`}
          >
            {/* Header / Pillar title */}
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-800/80">
              <div>
                <span className="text-xs font-semibold text-stone-300 flex items-center gap-1">
                  {p.nameEn}
                  <span className="text-amber-400 text-[11px]">({p.nameZh})</span>
                </span>
                <span className="text-[10px] text-stone-500 block leading-tight">
                  {p.scope}
                </span>
              </div>
              {p.isDayMaster && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  DAY MASTER
                </span>
              )}
            </div>

            {/* Ganzhi Large Character Badge */}
            <div className="text-center py-2.5 my-1 bg-stone-900/80 rounded-lg border border-stone-800">
              <span className="text-3xl font-extrabold tracking-widest text-amber-200">
                {p.pillarGanzhi}
              </span>
            </div>

            {/* Heavenly Stem details */}
            <div className="mt-3 space-y-2 text-xs">
              <div className="bg-stone-900/60 p-2 rounded-lg border border-stone-800/60">
                <span className="text-[10px] text-stone-400 block mb-0.5">Heavenly Stem (天干)</span>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white truncate">{p.stem}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getElementBadgeStyle(p.element)}`}>
                    {p.element}
                  </span>
                </div>
              </div>

              {/* Earthly Branch details */}
              <div className="bg-stone-900/60 p-2 rounded-lg border border-stone-800/60">
                <span className="text-[10px] text-stone-400 block mb-0.5">Earthly Branch (地支)</span>
                <span className="font-semibold text-white truncate block">{p.branch}</span>
              </div>

              {/* Ten Gods */}
              <div className="bg-stone-900/60 p-2 rounded-lg border border-stone-800/60">
                <span className="text-[10px] text-stone-400 block mb-0.5">Ten God (十神)</span>
                <span className="font-medium text-amber-300 truncate block">{p.god}</span>
              </div>

              {/* Hidden Stems */}
              <div className="bg-stone-900/60 p-2 rounded-lg border border-stone-800/60">
                <span className="text-[10px] text-stone-400 block mb-0.5">Hidden Stems (藏干)</span>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {p.hidden.length > 0 ? (
                    p.hidden.map((h, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300 text-[10px] border border-stone-700"
                      >
                        {h}
                      </span>
                    ))
                  ) : (
                    <span className="text-stone-500 text-[10px]">—</span>
                  )}
                </div>
              </div>

              {/* Na Yin */}
              <div className="bg-stone-900/60 p-2 rounded-lg border border-stone-800/60">
                <span className="text-[10px] text-stone-400 block mb-0.5">Na Yin Melodic (纳音)</span>
                <span className="text-[11px] text-stone-300 truncate block font-mono">{p.naYin}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
