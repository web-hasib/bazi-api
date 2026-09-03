'use client';

import React, { useState, useEffect } from 'react';
import { SdkHeader } from '@/components/SdkHeader';
import { SdkInputForm } from '@/components/SdkInputForm';
import { SdkPillarsView } from '@/components/SdkPillarsView';
import { SdkAnalysisView } from '@/components/SdkAnalysisView';
import { SdkRawViewer } from '@/components/SdkRawViewer';
import type { BaziCalculateRequest, BaziCalculateResponse } from '@/lib/types';
import { AlertCircle, RefreshCw, Zap } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState<BaziCalculateResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Initial calculation on mount
  useEffect(() => {
    handleCalculate({
      birthDate: '1998-08-12',
      birthTime: '10:30',
      gender: 'male',
      timezone: 'Asia/Dhaka',
      language: 'en',
    });
  }, []);

  const handleCalculate = async (input: BaziCalculateRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/bazi/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to calculate BaZi');
      }

      setData(json.data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Calculation error occurred';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col selection:bg-indigo-500 selection:text-white font-sans antialiased">
      {/* Sleek Header */}
      <SdkHeader apiKeyPrefix="bazi_7063f408" />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-zinc-900/90 via-zinc-900/60 to-indigo-950/30 border border-zinc-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-mono font-medium border border-indigo-500/20 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Live SDK Powered
              </span>
              <span className="text-xs text-zinc-500">Official Client Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              BaZi (Four Pillars of Destiny) Analysis
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Real-time calculation rendered directly from the official <code className="text-indigo-300 font-mono">@baziapi/sdk</code>.
              Zero local calculation overhead — 100% backend API accuracy.
            </p>
          </div>

          <div className="bg-zinc-950/90 border border-zinc-800/90 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 self-stretch md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-400">Endpoint:</span>
            <span className="font-mono text-zinc-200">api.baziapi.pro</span>
          </div>
        </div>

        {/* Input Form */}
        <SdkInputForm onSubmit={handleCalculate} isLoading={isLoading} />

        {/* Error notification */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-200 text-xs flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white mb-0.5">SDK Calculation Error</p>
              <p className="text-rose-300 font-mono text-[11px]">{error}</p>
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && !data && (
          <div className="py-20 text-center text-zinc-400 flex flex-col items-center justify-center gap-3">
            <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
            <p className="text-xs font-mono text-zinc-400">Fetching live calculation from BaZi API server...</p>
          </div>
        )}

        {/* Results Sections */}
        {data && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* 1. Four Pillars Cards */}
            <SdkPillarsView data={data} />

            {/* 2. Five Elements & Analysis */}
            <SdkAnalysisView data={data} />

            {/* 3. Raw SDK Payload Viewer */}
            <SdkRawViewer data={data} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/60 bg-zinc-950/60 text-zinc-500 text-xs py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px]">
          <p>© {new Date().getFullYear()} BaZi API Client • Powered by @baziapi/sdk</p>
          <div className="flex items-center gap-4 text-zinc-400">
            <a
              href="https://www.npmjs.com/package/@baziapi/sdk"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              npm @baziapi/sdk
            </a>
            <span>•</span>
            <a
              href="https://baziapi.pro"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              baziapi.pro
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
