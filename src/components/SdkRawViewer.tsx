'use client';

import React, { useState } from 'react';
import { Terminal, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface SdkRawViewerProps {
  data: unknown;
}

export const SdkRawViewer: React.FC<SdkRawViewerProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const jsonStr = JSON.stringify(data, null, 2);
  const lineCount = jsonStr.split('\n').length;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonStr);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-5 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-mono font-bold text-zinc-200">
            Official SDK Response Payload
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400 font-mono border border-zinc-800">
            {lineCount} lines
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors font-mono cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>Copy JSON</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors font-mono cursor-pointer"
          >
            <span>{isOpen ? 'Hide Payload' : 'View Raw Payload'}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-zinc-800/80">
          <pre className="p-4 bg-black/80 border border-zinc-800/80 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto max-h-[500px] leading-relaxed select-all">
            {jsonStr}
          </pre>
        </div>
      )}
    </div>
  );
};
