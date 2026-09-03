'use client';

import React, { useState } from 'react';
import { Code, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface RawJsonViewerProps {
  data: unknown;
  metaSource?: 'live' | 'sample';
  metaNote?: string;
}

export const RawJsonViewer: React.FC<RawJsonViewerProps> = ({ data, metaSource, metaNote }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl text-stone-200">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-semibold text-white">SDK Response JSON Output</span>
          {metaSource && (
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full font-medium border ${
                metaSource === 'live'
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600/50'
                  : 'bg-amber-950/60 text-amber-300 border-amber-600/50'
              }`}
            >
              Source: {metaSource.toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-400" />
                <span>Copy JSON</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition-colors"
          >
            <span>{isOpen ? 'Collapse' : 'Expand'}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {metaNote && (
        <p className="text-xs text-stone-400 mt-2 bg-stone-950 px-3 py-2 rounded-lg border border-stone-800/80">
          ℹ️ {metaNote}
        </p>
      )}

      {isOpen && (
        <div className="mt-4">
          <pre className="p-4 bg-stone-950 border border-stone-800 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto max-h-96 leading-relaxed">
            {jsonString}
          </pre>
        </div>
      )}
    </div>
  );
};
