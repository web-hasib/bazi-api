'use client';

import React from 'react';
import type { BaziCalculateResponse } from '@/lib/types';
import { Columns3, Sparkles } from 'lucide-react';

interface SdkPillarsViewProps {
  data: BaziCalculateResponse;
}

export const SdkPillarsView: React.FC<SdkPillarsViewProps> = ({ data }) => {
  const { pillars, heavenlyStems, earthlyBranches, fiveElements } = data;

  const pillarList = [
    {
      label: 'Year Pillar',
      chineseLabel: '年柱',
      ganZhi: pillars?.yearPillar || '—',
      stem: heavenlyStems?.yearStem || '—',
      branch: earthlyBranches?.yearBranch || '—',
      element: fiveElements?.yearElement || '—',
      isDayMaster: false,
    },
    {
      label: 'Month Pillar',
      chineseLabel: '月柱',
      ganZhi: pillars?.monthPillar || '—',
      stem: heavenlyStems?.monthStem || '—',
      branch: earthlyBranches?.monthBranch || '—',
      element: fiveElements?.monthElement || '—',
      isDayMaster: false,
    },
    {
      label: 'Day Pillar',
      chineseLabel: '日柱',
      ganZhi: pillars?.dayPillar || '—',
      stem: heavenlyStems?.dayStem || '—',
      branch: earthlyBranches?.dayBranch || '—',
      element: fiveElements?.dayElement || '—',
      isDayMaster: true,
    },
    {
      label: 'Hour Pillar',
      chineseLabel: '时柱',
      ganZhi: pillars?.hourPillar || '—',
      stem: heavenlyStems?.hourStem || '—',
      branch: earthlyBranches?.hourBranch || '—',
      element: fiveElements?.hourElement || '—',
      isDayMaster: false,
    },
  ];

  return (
    <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-zinc-800">
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide uppercase flex items-center gap-2">
            <Columns3 className="w-4 h-4 text-indigo-400" />
            <span>Four Pillars (四柱八字)</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Core natal pillars from <code className="text-zinc-300">result.pillars</code>
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            Day Master: <strong className="text-white">{heavenlyStems?.dayStem || '—'}</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {pillarList.map((p, idx) => (
          <div
            key={idx}
            className={`rounded-xl p-4 border transition-all flex flex-col justify-between ${
              p.isDayMaster
                ? 'bg-gradient-to-b from-indigo-950/40 via-zinc-900/90 to-zinc-950 border-indigo-500/60 shadow-lg shadow-indigo-950/30 ring-1 ring-indigo-500/20'
                : 'bg-zinc-950/80 border-zinc-800/80 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
              <span className="text-xs font-semibold text-zinc-200">
                {p.label} <span className="text-zinc-500 font-normal">({p.chineseLabel})</span>
              </span>
              {p.isDayMaster && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                  DAY MASTER
                </span>
              )}
            </div>

            {/* Ganzhi Large Character */}
            <div className="my-4 py-3 bg-zinc-900/90 rounded-xl border border-zinc-800 text-center">
              <span className="text-3xl sm:text-4xl font-black text-zinc-100 tracking-widest font-mono">
                {p.ganZhi}
              </span>
            </div>

            {/* Stem & Branch Details */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                <span className="text-[11px] text-zinc-400">Stem (天干)</span>
                <span className="font-mono font-bold text-white">{p.stem}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                <span className="text-[11px] text-zinc-400">Branch (地支)</span>
                <span className="font-mono font-bold text-white">{p.branch}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                <span className="text-[11px] text-zinc-400">Elements</span>
                <span className="font-mono font-medium text-indigo-300">{p.element}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
