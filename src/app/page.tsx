'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { BaziForm } from '@/components/BaziForm';
import { FourPillarsCard } from '@/components/FourPillarsCard';
import { ElementsBreakdown } from '@/components/ElementsBreakdown';
import { AnalysisSection } from '@/components/AnalysisSection';
import { LuckPillarsView } from '@/components/LuckPillarsView';
import { RawJsonViewer } from '@/components/RawJsonViewer';
import { ApiKeyModal } from '@/components/ApiKeyModal';
import { HumanReadableReport } from '@/components/HumanReadableReport';
import type { BaziCalculateRequest, BaziCalculateResponse } from '@/lib/types';
import { Sparkles, AlertTriangle, RefreshCw } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState<BaziCalculateResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<{ source?: 'live' | 'sample'; note?: string } | null>(null);

  const [apiKey, setApiKey] = useState<string>('');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);

  // Load API key from localStorage on mount & perform initial calculation
  useEffect(() => {
    const storedKey = localStorage.getItem('bazi_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    }

    // Run default calculation
    handleCalculate({
      birthDate: '1998-08-12',
      birthTime: '10:30',
      gender: 'male',
      timezone: 'Asia/Dhaka',
      language: 'en',
    }, storedKey || undefined);
  }, []);

  const handleSaveApiKey = (newKey: string) => {
    setApiKey(newKey);
    if (newKey) {
      localStorage.setItem('bazi_api_key', newKey);
    } else {
      localStorage.removeItem('bazi_api_key');
    }
  };

  const handleToggleDemoMode = () => {
    setIsDemoMode((prev) => !prev);
  };

  const handleCalculate = async (
    calcInput: BaziCalculateRequest,
    overrideKey?: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const activeKey = overrideKey !== undefined ? overrideKey : apiKey;
      const res = await fetch('/api/bazi/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...calcInput,
          apiKey: activeKey,
          forceDemo: isDemoMode,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to calculate BaZi');
      }

      setData(json.data);
      setMeta({
        source: json.source,
        note: json.note,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Calculation error occurred';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-500 selection:text-stone-950">
      {/* Top Navigation */}
      <Header
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasCustomKey={Boolean(apiKey)}
        isDemoMode={isDemoMode}
        onToggleDemoMode={handleToggleDemoMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Hero Notice / Banner */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950/40 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Four Pillars of Destiny (四柱八字)
              </span>
              <span className="text-xs text-stone-400 hidden sm:inline">
                Full-Stack Next.js Implementation
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Chinese Astrological Chart & Destiny Analysis
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-2xl">
              Calculate birth charts, 5 Elements (Wu Xing) balance, Ten Gods distribution,
              auspicious stars, and 10-year Luck Pillars powered by{' '}
              <code className="text-amber-300 font-mono">@baziapi/sdk</code>.
            </p>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto">
            {meta?.source && (
              <div className="bg-stone-950/80 px-3.5 py-2 rounded-xl border border-stone-800 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-stone-300">
                  Mode:{' '}
                  <strong className="text-white">
                    {meta.source === 'live' ? 'Live API SDK' : 'Simulation Engine'}
                  </strong>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Input Form */}
        <BaziForm onSubmit={(formData) => handleCalculate(formData)} isLoading={isLoading} />

        {/* Error notification if any */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-200 text-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Calculation Notice</p>
              <p className="text-xs text-rose-300 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Loading skeleton */}
        {isLoading && !data && (
          <div className="py-16 text-center text-stone-400 flex flex-col items-center justify-center gap-3">
            <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
            <p className="text-sm font-medium">Computing BaZi chart and astronomical alignments...</p>
          </div>
        )}

        {/* Results Sections */}
        {data && (
          <div className="space-y-6">
            {/* 1. Four Pillars Main Chart */}
            <FourPillarsCard data={data} />

            {/* 2. Comprehensive Human-Readable Life Destiny Report (English) */}
            <HumanReadableReport data={data} />

            {/* 3. Five Elements & Day Master Analysis */}
            <ElementsBreakdown data={data} />

            {/* 3. Auspicious Stars, Interactions & Calendar */}
            <AnalysisSection data={data} />

            {/* 4. 10-Year Luck Pillars & Life Predictions */}
            <LuckPillarsView data={data} />

            {/* 5. Raw SDK JSON Viewer */}
            <RawJsonViewer
              data={data}
              metaSource={meta?.source}
              metaNote={meta?.note}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-stone-900/60 text-stone-400 text-xs py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} BaZi Astrology System. Built with Next.js & @baziapi/sdk.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.npmjs.com/package/@baziapi/sdk"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300 transition-colors"
            >
              @baziapi/sdk on npm
            </a>
            <a
              href="https://baziapi.pro"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300 transition-colors"
            >
              BaZi API Documentation
            </a>
          </div>
        </div>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSaveKey={handleSaveApiKey}
        currentKey={apiKey}
      />
    </div>
  );
}
