'use client';

import React from 'react';
import { Compass, Key, Sparkles, BookOpen } from 'lucide-react';

interface HeaderProps {
  onOpenApiKeyModal: () => void;
  hasCustomKey: boolean;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenApiKeyModal,
  hasCustomKey,
  isDemoMode,
  onToggleDemoMode,
}) => {
  return (
    <header className="border-b border-stone-200 bg-stone-900 text-stone-100 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-600 via-red-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-900/30">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                BaZi Astrology
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-medium border border-amber-500/30">
                  八字命盘
                </span>
              </h1>
            </div>
            <p className="text-xs text-stone-400 hidden sm:block">
              Powered by <code className="text-amber-300">@baziapi/sdk</code>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Demo Mode Toggle */}
          <button
            type="button"
            onClick={onToggleDemoMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              isDemoMode
                ? 'bg-amber-950/80 text-amber-300 border-amber-600/60 shadow-sm'
                : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
            }`}
            title="Toggle Demo / Local Simulation Mode"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Mode:</span>
            <span>{isDemoMode ? 'Demo / Offline' : 'Live SDK'}</span>
          </button>

          {/* API Key Modal Button */}
          <button
            type="button"
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              hasCustomKey
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600/50'
                : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
            }`}
            title="Configure BaZi API Key"
          >
            <Key className="w-3.5 h-3.5" />
            <span>{hasCustomKey ? 'API Key Configured' : 'Set API Key'}</span>
          </button>

          {/* Docs link */}
          <a
            href="https://www.npmjs.com/package/@baziapi/sdk"
            target="_blank"
            rel="noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-400 hover:text-white bg-stone-800/50 hover:bg-stone-800 border border-stone-700/50 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>npm SDK</span>
          </a>
        </div>
      </div>
    </header>
  );
};
