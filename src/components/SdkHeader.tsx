'use client';

import React from 'react';
import { Cpu, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';

interface SdkHeaderProps {
  apiKeyPrefix: string;
}

export const SdkHeader: React.FC<SdkHeaderProps> = ({ apiKeyPrefix }) => {
  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-white">
                BaZi SDK Client
              </h1>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-mono font-medium border border-indigo-500/20">
                v1.0.4
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 hidden sm:block">
              Direct live integration with <code className="text-zinc-200">@baziapi/sdk</code>
            </p>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-300 font-medium">API Key:</span>
            <span className="text-emerald-400 font-mono text-[11px]">
              {apiKeyPrefix ? `${apiKeyPrefix.slice(0, 10)}...` : 'Active'}
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>

          <a
            href="https://www.npmjs.com/package/@baziapi/sdk"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-white bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 transition-colors"
          >
            <span>npm package</span>
            <ExternalLink className="w-3 h-3 text-zinc-500" />
          </a>
        </div>
      </div>
    </header>
  );
};
