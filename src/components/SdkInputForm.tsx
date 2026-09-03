'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Globe, User, Send, Zap } from 'lucide-react';
import type { BaziCalculateRequest } from '@/lib/types';

interface SdkInputFormProps {
  onSubmit: (data: BaziCalculateRequest) => void;
  isLoading: boolean;
}

const COMMON_TIMEZONES = [
  { label: 'Asia/Dhaka (GMT+6)', value: 'Asia/Dhaka' },
  { label: 'Asia/Shanghai (GMT+8 - China)', value: 'Asia/Shanghai' },
  { label: 'Asia/Singapore (GMT+8)', value: 'Asia/Singapore' },
  { label: 'Asia/Tokyo (GMT+9)', value: 'Asia/Tokyo' },
  { label: 'Asia/Kolkata (GMT+5:30)', value: 'Asia/Kolkata' },
  { label: 'Europe/London (GMT+0/1)', value: 'Europe/London' },
  { label: 'America/New_York (GMT-5/4)', value: 'America/New_York' },
  { label: 'UTC', value: 'UTC' },
];

export const SdkInputForm: React.FC<SdkInputFormProps> = ({ onSubmit, isLoading }) => {
  const [birthDate, setBirthDate] = useState('1998-08-12');
  const [birthTime, setBirthTime] = useState('10:30');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [timezone, setTimezone] = useState('Asia/Dhaka');
  const [language, setLanguage] = useState<'en' | 'zh'>('en');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      birthDate,
      birthTime,
      gender,
      timezone,
      language,
    });
  };

  const handleApplyPreset = (d: string, t: string, g: 'male' | 'female', tz: string) => {
    setBirthDate(d);
    setBirthTime(t);
    setGender(g);
    setTimezone(tz);
  };

  return (
    <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-zinc-800">
        <div>
          <h2 className="text-sm font-semibold text-white tracking-wide uppercase flex items-center gap-2">
            <span>Query Parameters</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-mono font-medium border border-indigo-500/20">
              POST /api/v1/bazi/calculate
            </span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Parameters passed directly to <code className="text-indigo-300">client.bazi.calculate()</code>
          </p>
        </div>

        {/* Quick presets */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleApplyPreset('1998-08-12', '10:30', 'male', 'Asia/Dhaka')}
            className="text-xs px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors flex items-center gap-1 border border-zinc-700/60"
          >
            <Zap className="w-3 h-3 text-indigo-400" />
            Preset 1998
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset('2005-07-24', '04:00', 'male', 'Asia/Dhaka')}
            className="text-xs px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors flex items-center gap-1 border border-zinc-700/60"
          >
            <Zap className="w-3 h-3 text-violet-400" />
            Preset 2005
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Birth Date */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>Birth Date</span>
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
            />
          </div>

          {/* Birth Time */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Birth Time</span>
            </label>
            <input
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span>Gender</span>
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  gender === 'male'
                    ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500 shadow-sm'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  gender === 'female'
                    ? 'bg-violet-600/20 text-violet-300 border-violet-500 shadow-sm'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                Female
              </button>
            </div>
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>Timezone</span>
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            >
              {COMMON_TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Action */}
          <div className="flex items-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Requesting SDK...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Calculate BaZi</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
