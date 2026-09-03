'use client';

import React, { useState } from 'react';
import type { BaziCalculateResponse } from '@/lib/types';
import { generateHumanReadableReport } from '@/lib/interpretation-engine';
import {
  Sparkles,
  UserCheck,
  Briefcase,
  Heart,
  CalendarCheck,
  Compass,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Award,
  Layers,
} from 'lucide-react';

interface HumanReadableReportProps {
  data: BaziCalculateResponse;
}

export const HumanReadableReport: React.FC<HumanReadableReportProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'career' | 'relationships' | 'timing' | 'remedies'>('profile');
  const [copied, setCopied] = useState(false);

  const report = generateHumanReadableReport(data);

  const handleCopyReport = async () => {
    const fullText = `
BAZI LIFE DESTINY REPORT (ENGLISH READING)
=========================================
ARCHETYPE: ${report.archetypeTitle}
Tagline: ${report.archetypeTagline}

1. PERSONALITY & PSYCHOLOGICAL PROFILE
---------------------------------------
${report.personalitySummary}

KEY STRENGTHS:
${report.strengths.map((s) => `• ${s}`).join('\n')}

BLIND SPOTS & GROWTH AREAS:
${report.blindSpots.map((b) => `• ${b}`).join('\n')}

2. CAREER & FINANCIAL BLUEPRINT
--------------------------------
Strategic Headline: ${report.careerGuidance.headline}
Work Style: ${report.careerGuidance.workStyle}
Wealth Strategy: ${report.careerGuidance.wealthStrategy}

Recommended Domains:
${report.careerGuidance.bestRoles.map((r) => `• ${r}`).join('\n')}

3. RELATIONSHIP DYNAMICS
-------------------------
Romantic Style: ${report.relationshipInsights.romanticStyle}
Ideal Partner Profile: ${report.relationshipInsights.partnerProfile}
Golden Advice: ${report.relationshipInsights.advice}

4. TIMING & 10-YEAR ROADMAP
----------------------------
Current Cycle: ${report.currentCycleRoadmap.currentDecadeTheme}
2026 Year Focus: ${report.currentCycleRoadmap.currentYearFocus}

Key Milestones:
${report.currentCycleRoadmap.milestones.map((m) => `• ${m}`).join('\n')}

5. ACTIONABLE REMEDIES & HABITS
--------------------------------
Favorable Colors: ${report.practicalRemedies.favorableColors.join(', ')}
Daily Habits:
${report.practicalRemedies.dailyHabits.map((h) => `• ${h}`).join('\n')}
    `.trim();

    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-stone-200 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Comprehensive Life Destiny Reading
            </span>
            <span className="text-xs text-stone-400 hidden sm:inline">
              Plain-English Interpretation
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {report.archetypeTitle}
          </h2>
          <p className="text-sm font-medium text-amber-300/90 mt-1">
            {report.archetypeTagline}
          </p>
        </div>

        {/* Copy button */}
        <button
          type="button"
          onClick={handleCopyReport}
          className="self-start sm:self-center flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-all shadow-sm"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">Copied Full Report</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-stone-400" />
              <span>Copy Full Reading (Text)</span>
            </>
          )}
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 my-6 pb-2 border-b border-stone-800/80">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'profile'
              ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
              : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Personality & Strengths</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('career')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'career'
              ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
              : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Career & Wealth Blueprint</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('relationships')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'relationships'
              ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
              : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>Love & Relationships</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('timing')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'timing'
              ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
              : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
          }`}
        >
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>2026 & Decade Roadmap</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('remedies')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'remedies'
              ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
              : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Actionable Remedies</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="space-y-6 min-h-[300px]">
        {/* 1. Personality & Strengths Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-stone-950/80 p-5 rounded-2xl border border-stone-800/80 leading-relaxed">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2 mb-2">
                <Award className="w-4 h-4" />
                <span>Executive Character Summary</span>
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                {report.personalitySummary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Superpowers */}
              <div className="bg-stone-950/60 p-5 rounded-2xl border border-stone-800/80">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2 mb-3.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Key Strengths & Endowments</span>
                </h4>
                <ul className="space-y-2.5">
                  {report.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-stone-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Blind spots */}
              <div className="bg-stone-950/60 p-5 rounded-2xl border border-stone-800/80">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2 mb-3.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>Blind Spots & Areas for Mastery</span>
                </h4>
                <ul className="space-y-2.5">
                  {report.blindSpots.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-stone-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 2. Career & Wealth Tab */}
        {activeTab === 'career' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-stone-950/80 p-5 rounded-2xl border border-stone-800/80">
              <span className="text-xs text-amber-400 font-semibold block mb-1">Career Archetype</span>
              <h3 className="text-lg font-extrabold text-white mb-2">
                {report.careerGuidance.headline}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {report.careerGuidance.workStyle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Wealth Strategy */}
              <div className="bg-stone-950/60 p-5 rounded-2xl border border-stone-800/80 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Wealth Compounding Strategy</span>
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed mt-2">
                    {report.careerGuidance.wealthStrategy}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-800/80 text-[11px] text-stone-400">
                  Tip: Focus on equity and ownership over hourly exchange.
                </div>
              </div>

              {/* Recommended Domains */}
              <div className="bg-stone-950/60 p-5 rounded-2xl border border-stone-800/80">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                  <Briefcase className="w-4 h-4" />
                  <span>Optimal Industries & Focus Areas</span>
                </h4>
                <div className="space-y-2">
                  {report.careerGuidance.bestRoles.map((r, i) => (
                    <div
                      key={i}
                      className="text-xs bg-stone-900/90 px-3 py-2 rounded-xl border border-stone-800 text-stone-200"
                    >
                      ✓ {r}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Relationships Tab */}
        {activeTab === 'relationships' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-stone-950/80 p-5 rounded-2xl border border-stone-800/80">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4" />
                  <span>How You Love & Connect</span>
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed mt-2">
                  {report.relationshipInsights.romanticStyle}
                </p>
              </div>

              <div className="bg-stone-950/80 p-5 rounded-2xl border border-stone-800/80">
                <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2 mb-2">
                  <UserCheck className="w-4 h-4" />
                  <span>Ideal Partner Profile</span>
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed mt-2">
                  {report.relationshipInsights.partnerProfile}
                </p>
              </div>
            </div>

            <div className="bg-stone-950/60 p-5 rounded-2xl border border-stone-800/80 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-white mb-1">Relationship Harmony Advice</h5>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {report.relationshipInsights.advice}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. Timing & 10-Year Roadmap Tab */}
        {activeTab === 'timing' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="bg-gradient-to-r from-stone-950 via-stone-950 to-amber-950/30 p-5 rounded-2xl border border-stone-800/80">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Active Luck Cycle (大运时代)
              </span>
              <h3 className="text-base font-extrabold text-white mb-2">
                {report.currentCycleRoadmap.currentDecadeTheme}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {report.currentCycleRoadmap.currentYearFocus}
              </p>
            </div>

            <div className="bg-stone-950/80 p-5 rounded-2xl border border-stone-800/80">
              <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-3">
                Three-Phase Trajectory Milestones
              </h4>
              <div className="space-y-3">
                {report.currentCycleRoadmap.milestones.map((ms, i) => (
                  <div key={i} className="flex items-start gap-3 bg-stone-900/60 p-3 rounded-xl border border-stone-800">
                    <span className="text-xs font-black text-amber-400 bg-amber-500/10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border border-amber-500/20">
                      {i + 1}
                    </span>
                    <span className="text-xs text-stone-200 leading-relaxed">{ms}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. Actionable Remedies Tab */}
        {activeTab === 'remedies' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Daily Leverage Habits */}
              <div className="bg-stone-950/80 p-5 rounded-2xl border border-stone-800/80">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Daily High-Leverage Habits</span>
                </h4>
                <ul className="space-y-2.5">
                  {report.practicalRemedies.dailyHabits.map((dh, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-stone-200">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{dh}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Favorable Colors & Environments */}
              <div className="bg-stone-950/80 p-5 rounded-2xl border border-stone-800/80 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2 mb-2">
                    <Layers className="w-4 h-4" />
                    <span>Favorable Palette & Resonance Colors</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {report.practicalRemedies.favorableColors.map((col, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-lg bg-stone-900 text-stone-300 border border-stone-800"
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
                    Optimal Environments
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-300">
                    {report.practicalRemedies.favorableEnvironments.map((env, i) => (
                      <li key={i}>• {env}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
