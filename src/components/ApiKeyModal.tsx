'use client';

import React, { useState, useEffect } from 'react';
import { X, Key, CheckCircle, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveKey: (key: string) => void;
  currentKey: string;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  onSaveKey,
  currentKey,
}) => {
  const [inputKey, setInputKey] = useState(currentKey);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    status: string;
    message?: string;
  } | null>(null);

  useEffect(() => {
    setInputKey(currentKey);
  }, [currentKey]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveKey(inputKey.trim());
    onClose();
  };

  const handleClear = () => {
    setInputKey('');
    onSaveKey('');
    setTestResult(null);
  };

  const handleTestHealth = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/bazi/health');
      const data = await res.json();
      if (data.status === 'reachable') {
        setTestResult({
          status: 'success',
          message: 'Server reachable! Ready to execute requests.',
        });
      } else {
        setTestResult({
          status: 'warning',
          message: `Server status: ${data.status} (Automatic high-precision fallback mode will be used if needed).`,
        });
      }
    } catch {
      setTestResult({
        status: 'error',
        message: 'Could not connect to health endpoint.',
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-md p-6 shadow-2xl text-stone-200 relative animate-in fade-in zoom-in duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">BaZi API Key Settings</h3>
            <p className="text-xs text-stone-400">Configure your credentials for @baziapi/sdk</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              API Key (starts with <code>bazi_</code>)
            </label>
            <input
              type="text"
              placeholder="bazi_xxxxxxxxxxxxxxxxxxxxxxxx"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
            <p className="text-[11px] text-stone-400 mt-1">
              You can also specify <code>BAZI_API_KEY</code> inside your <code>.env.local</code> file.
            </p>
          </div>

          {/* Test connection */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleTestHealth}
              disabled={testing}
              className="w-full py-2 px-3 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium border border-stone-700 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
              <span>{testing ? 'Pinging API...' : 'Test Backend Connectivity'}</span>
            </button>

            {testResult && (
              <div
                className={`mt-2.5 p-2.5 rounded-lg text-xs border flex items-start gap-2 ${
                  testResult.status === 'success'
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60'
                    : 'bg-amber-950/60 text-amber-300 border-amber-700/60'
                }`}
              >
                {testResult.status === 'success' ? (
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                )}
                <span>{testResult.message}</span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-800">
            {inputKey && (
              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-950/40 transition-colors mr-auto"
              >
                Clear Key
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors shadow-sm"
            >
              Save Key
            </button>
          </div>
        </form>

        <div className="mt-4 pt-3 border-t border-stone-800/80 text-[11px] text-stone-500 flex items-center justify-between">
          <span>Documentation & Plans:</span>
          <a
            href="https://baziapi.pro"
            target="_blank"
            rel="noreferrer"
            className="text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>baziapi.pro</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
