'use client';

import React from 'react';
import type { BaziCalculateResponse } from '@/lib/types';
import { Flame, Trees, Mountain, ShieldAlert, Droplets, CheckCircle2, XCircle, Gauge } from 'lucide-react';
import { getElementBadgeStyle } from './FourPillarsCard';

interface ElementsBreakdownProps {
  data: BaziCalculateResponse;
}

const ELEMENT_ICONS: Record<string, React.ReactNode> = {
  Wood: <Trees className="w-4 h-4 text-emerald-400" />,
  Fire: <Flame className="w-4 h-4 text-rose-400" />,
  Earth: <Mountain className="w-4 h-4 text-amber-400" />,
  Metal: <ShieldAlert className="w-4 h-4 text-slate-300" />,
  Water: <Droplets className="w-4 h-4 text-blue-400" />,
};

const ELEMENT_PROGRESS_COLORS: Record<string, string> = {
  Wood: 'bg-emerald-500',
  Fire: 'bg-rose-500',
  Earth: 'bg-amber-500',
  Metal: 'bg-slate-400',
  Water: 'bg-blue-500',
};

export const ElementsBreakdown: React.FC<ElementsBreakdownProps> = ({ data }) => {
  const { fiveElements, analysis, tenGods } = data;
  const stats = fiveElements?.statistics || {};

  const elementsList = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* 1. Wu Xing Five Elements Distribution */}
      <div className="lg:col-span-2 bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xl text-stone-200">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-800">
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <span>Five Elements Balance (五行能量)</span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Energy distribution across the Wood, Fire, Earth, Metal, and Water elements
            </p>
          </div>
          {analysis?.balanced !== undefined && (
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
                analysis.balanced
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600/50'
                  : 'bg-stone-800 text-stone-300 border-stone-700'
              }`}
            >
              {analysis.balanced ? 'Harmonious / Balanced' : 'Dynamic / Asymmetric'}
            </span>
          )}
        </div>

        {/* Five elements bars */}
        <div className="space-y-3.5 mt-2">
          {elementsList.map((el) => {
            const rawPercent = stats[el] || '0%';
            const numericValue = parseInt(rawPercent.replace('%', ''), 10) || 0;
            return (
              <div key={el} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 font-medium text-stone-200">
                    {ELEMENT_ICONS[el]}
                    <span>{el}</span>
                    {analysis?.strongestElement === el && (
                      <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-1.5 rounded">
                        Dominant
                      </span>
                    )}
                    {analysis?.missingElements?.includes(el) && (
                      <span className="text-[10px] text-stone-500 bg-stone-800 px-1.5 rounded">
                        Missing
                      </span>
                    )}
                  </span>
                  <span className="font-mono font-semibold text-white">{rawPercent}</span>
                </div>
                {/* Progress bar container */}
                <div className="h-2.5 w-full bg-stone-950 rounded-full overflow-hidden p-0.5 border border-stone-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      ELEMENT_PROGRESS_COLORS[el] || 'bg-stone-500'
                    }`}
                    style={{ width: `${Math.max(4, Math.min(100, numericValue))}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Ten Gods distribution if available */}
        {tenGods?.distribution && Object.keys(tenGods.distribution).length > 0 && (
          <div className="mt-5 pt-4 border-t border-stone-800">
            <h4 className="text-xs font-semibold text-stone-300 mb-2">Ten Gods Pattern Distribution (十神格局)</h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {Object.entries(tenGods.distribution).map(([name, val]) => (
                <div key={name} className="bg-stone-950 p-2 rounded-lg border border-stone-800 text-center">
                  <span className="text-[10px] text-stone-400 block truncate">{name}</span>
                  <span className="text-xs font-bold text-amber-300">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. Day Master Strength & Useful Gods */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xl text-stone-200 flex flex-col justify-between">
        <div>
          <div className="pb-3 mb-4 border-b border-stone-800">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Gauge className="w-4 h-4 text-amber-400" />
              <span>Day Master Analysis (日主身强弱)</span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Core strength of the self element and guiding remedies
            </p>
          </div>

          <div className="space-y-4">
            {/* Strength Badge */}
            <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
              <span className="text-xs text-stone-400 block mb-1">Day Master Strength</span>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white">
                  {analysis?.dayMasterStrength || 'Balanced'}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {analysis?.dayMasterStrength?.includes('Strong') ? '身旺 (Strong)' : '身弱 (Weak)'}
                </span>
              </div>
            </div>

            {/* Useful God (Yong Shen) */}
            <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
              <span className="text-xs text-stone-400 block mb-1">Useful God / Remedial Element (用神)</span>
              <span className="text-sm font-semibold text-amber-300 block">
                {analysis?.yongShen || 'Favorable alignment'}
              </span>
            </div>

            {/* Void Branch */}
            {analysis?.voidBranch && (
              <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                <span className="text-xs text-stone-400 block mb-1">Empty / Void Branches (空亡)</span>
                <span className="text-xs font-mono text-stone-300 block">
                  {analysis.voidBranch}
                </span>
              </div>
            )}

            {/* Favorable vs Unfavorable */}
            <div className="space-y-2 pt-1">
              <div>
                <span className="text-xs font-medium text-emerald-400 flex items-center gap-1 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Favorable Elements (喜神)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {analysis?.favorableElements && analysis.favorableElements.length > 0 ? (
                    analysis.favorableElements.map((el, i) => (
                      <span key={i} className={`text-xs px-2 py-0.5 rounded border ${getElementBadgeStyle(el)}`}>
                        {el}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-stone-500">—</span>
                  )}
                </div>
              </div>

              <div className="pt-1">
                <span className="text-xs font-medium text-rose-400 flex items-center gap-1 mb-1">
                  <XCircle className="w-3.5 h-3.5" /> Unfavorable Elements (忌神)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {analysis?.unfavorableElements && analysis.unfavorableElements.length > 0 ? (
                    analysis.unfavorableElements.map((el, i) => (
                      <span key={i} className={`text-xs px-2 py-0.5 rounded border ${getElementBadgeStyle(el)}`}>
                        {el}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-stone-500">—</span>
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
