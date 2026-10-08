import React from 'react';
import { Volume2, VolumeX, ShieldCheck, Flame } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface TopNavProps {
  currentTab: 'chapters' | 'boss' | 'minigames' | 'dojo';
  onSelectTab: (tab: 'chapters' | 'boss' | 'minigames' | 'dojo') => void;
  onOpenLicense: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  unlockedBadgeCount: number;
  streakCount: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenLicense,
  soundEnabled,
  onToggleSound,
  unlockedBadgeCount,
  streakCount
}) => {
  return (
    <header className="w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 md:px-8 py-3.5 flex items-center justify-between">
      {/* Zone 1: Brand title, one line, single text element wordmark */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onSelectTab('chapters');
        }}
        className="text-lg md:text-xl font-black tracking-tight text-white font-hero hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
      >
        Hero English Academy
      </a>

      {/* Zone 2: 4-6 clean text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <button
          onClick={() => {
            soundManager.play('click');
            onSelectTab('chapters');
          }}
          className={`transition-colors whitespace-nowrap cursor-pointer ${
            currentTab === 'chapters'
              ? 'text-emerald-400 font-bold border-b-2 border-emerald-400 pb-0.5'
              : 'hover:text-white'
          }`}
        >
          Story Chapters
        </button>

        <button
          onClick={() => {
            soundManager.play('click');
            onSelectTab('minigames');
          }}
          className={`transition-colors whitespace-nowrap cursor-pointer ${
            currentTab === 'minigames'
              ? 'text-orange-400 font-bold border-b-2 border-orange-400 pb-0.5'
              : 'hover:text-orange-300'
          }`}
        >
          Mini-Games
        </button>

        <button
          onClick={() => {
            soundManager.play('click');
            onSelectTab('boss');
          }}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
            currentTab === 'boss'
              ? 'text-rose-400 font-bold border-b-2 border-rose-400 pb-0.5'
              : 'hover:text-rose-300 text-rose-400/90'
          }`}
        >
          <span>Boss Showdown</span>
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
        </button>

        <button
          onClick={() => {
            soundManager.play('click');
            onSelectTab('dojo');
          }}
          className={`transition-colors whitespace-nowrap cursor-pointer ${
            currentTab === 'dojo'
              ? 'text-emerald-400 font-bold border-b-2 border-emerald-400 pb-0.5'
              : 'hover:text-white'
          }`}
        >
          Vocab Grimoire
        </button>

        <button
          onClick={() => {
            soundManager.play('click');
            onOpenLicense();
          }}
          className="hover:text-amber-300 transition-colors whitespace-nowrap text-amber-400 cursor-pointer flex items-center gap-1"
        >
          <span>Badges</span>
          <span className="text-xs bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded font-mono font-bold">
            {unlockedBadgeCount}
          </span>
        </button>
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-3">
        {/* Streak counter pill-less text */}
        <div className="hidden sm:flex items-center gap-1 text-xs text-orange-400 font-bold">
          <Flame className="w-4 h-4 fill-orange-400 text-orange-400" />
          <span>{streakCount} Day Streak</span>
        </div>

        {/* Audio Mute/Unmute */}
        <button
          onClick={onToggleSound}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
          title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-500" />
          )}
        </button>

        {/* Hero License Trigger */}
        <button
          onClick={() => {
            soundManager.play('click');
            onOpenLicense();
          }}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 rounded-xl shadow-md shadow-amber-400/20 transition-all cursor-pointer whitespace-nowrap"
        >
          <ShieldCheck className="w-4 h-4" />
          <span className="hidden sm:inline">Hero License</span>
        </button>
      </div>
    </header>
  );
};
