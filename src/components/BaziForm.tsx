'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Globe, User, Languages, Play, RotateCcw, Zap } from 'lucide-react';
import type { BaziCalculateRequest } from '@/lib/types';

interface BaziFormProps {
  onSubmit: (formData: BaziCalculateRequest) => void;
  isLoading: boolean;
}

const COMMON_TIMEZONES = [
  { label: 'Asia/Dhaka (GMT+6)', value: 'Asia/Dhaka' },
  { label: 'Asia/Shanghai (GMT+8 - China)', value: 'Asia/Shanghai' },
  { label: 'Asia/Hong_Kong (GMT+8)', value: 'Asia/Hong_Kong' },
  { label: 'Asia/Singapore (GMT+8)', value: 'Asia/Singapore' },
  { label: 'Asia/Tokyo (GMT+9)', value: 'Asia/Tokyo' },
  { label: 'Asia/Kolkata (GMT+5:30)', value: 'Asia/Kolkata' },
  { label: 'Asia/Dubai (GMT+4)', value: 'Asia/Dubai' },
  { label: 'Europe/London (GMT+0/1)', value: 'Europe/London' },
  { label: 'America/New_York (GMT-5/4)', value: 'America/New_York' },
  { label: 'America/Los_Angeles (GMT-8/7)', value: 'America/Los_Angeles' },
  { label: 'UTC', value: 'UTC' },
];

export const BaziForm: React.FC<BaziFormProps> = ({ onSubmit, isLoading }) => {
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

  const handlePreset = (presetDate: string, presetTime: string, presetGender: 'male' | 'female', presetTz: string) => {
    setBirthDate(presetDate);
    setBirthTime(presetTime);
    setGender(presetGender);
    setTimezone(presetTz);
  };

  const handleCurrentMoment = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    setBirthDate(`${y}-${m}-${d}`);
    setBirthTime(`${hh}:${mm}`);
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xl text-stone-200">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5 pb-4 border-b border-stone-800">
        <div>
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <span>Chart Calculation Inputs</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              八字输入
            </span>
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Enter exact solar (Gregorian) birth date, time, and location
          </p>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => handlePreset('1998-08-12', '10:30', 'male', 'Asia/Dhaka')}
            className="text-xs px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors flex items-center gap-1"
          >
            <Zap className="w-3 h-3 text-amber-400" />
            Preset 1998
          </button>
          <button
            type="button"
            onClick={() => handlePreset('1990-05-20', '14:15', 'female', 'Asia/Shanghai')}
            className="text-xs px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors flex items-center gap-1"
          >
            <Zap className="w-3 h-3 text-rose-400" />
            Preset 1990
          </button>
          <button
            type="button"
            onClick={handleCurrentMoment}
            className="text-xs px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors flex items-center gap-1"
          >
            <Clock className="w-3 h-3 text-blue-400" />
            Now
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Birth Date */}
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Birth Date (YYYY-MM-DD) *</span>
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
          </div>

          {/* Birth Time */}
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Birth Time (HH:mm - 24hr)</span>
            </label>
            <input
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Gender *</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                  gender === 'male'
                    ? 'bg-blue-600/30 text-blue-200 border-blue-500 shadow-sm'
                    : 'bg-stone-950 text-stone-400 border-stone-700 hover:border-stone-600'
                }`}
              >
                Male (男)
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                  gender === 'female'
                    ? 'bg-rose-600/30 text-rose-200 border-rose-500 shadow-sm'
                    : 'bg-stone-950 text-stone-400 border-stone-700 hover:border-stone-600'
                }`}
              >
                Female (女)
              </button>
            </div>
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>Timezone</span>
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            >
              {COMMON_TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-amber-400" />
              <span>Output Language</span>
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'zh')}
              className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            >
              <option value="en">English (en)</option>
              <option value="zh">Chinese (zh - 中文)</option>
            </select>
          </div>

          {/* Submit CTA */}
          <div className="flex items-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-sm shadow-md hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                  <span>Calculating BaZi...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-stone-950" />
                  <span>Calculate BaZi Chart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
