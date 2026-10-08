import React, { useState, useEffect } from 'react';
import { CHAPTERS_DATA } from './data/chaptersData';
import { CHARACTERS, CAMPUS_BACKGROUND } from './data/characters';
import { INITIAL_BADGES } from './data/badgesData';
import { Badge } from './types/game';
import { soundManager } from './utils/audio';
import { TopNav } from './components/TopNav';
import { DialogueViewer } from './components/DialogueViewer';
import { BossBattle } from './components/BossBattle';
import { HeroLicenseModal } from './components/HeroLicenseModal';
import { DojoReview } from './components/DojoReview';
import { MiniGames } from './components/MiniGames';
import { ThreeScene } from './components/ThreeScene';
import {
  Sparkles,
  Trophy,
  Swords,
  ChevronRight,
  Flame,
  Award,
  BookOpen,
  Volume2,
  Gamepad2
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'chapters' | 'boss' | 'minigames' | 'dojo'>('chapters');
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [activeDialogueIndex, setActiveDialogueIndex] = useState<number>(0);
  const [playerName, setPlayerName] = useState<string>('Izuku Walker');
  const [heroScore, setHeroScore] = useState<number>(100);
  const [streakCount, setStreakCount] = useState<number>(7);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [isLicenseOpen, setIsLicenseOpen] = useState<boolean>(false);
  const [unlockedChapters, setUnlockedChapters] = useState<number[]>([1]);
  const [showIntroHeroBanner, setShowIntroHeroBanner] = useState<boolean>(true);

  // Load progress if available in localStorage
  useEffect(() => {
    try {
      const savedBadges = localStorage.getItem('hero_english_badges');
      if (savedBadges) {
        setBadges(JSON.parse(savedBadges));
      }
      const savedScore = localStorage.getItem('hero_english_score');
      if (savedScore) {
        setHeroScore(parseInt(savedScore, 10));
      }
      const savedName = localStorage.getItem('hero_english_name');
      if (savedName) {
        setPlayerName(savedName);
      }
      const savedChapters = localStorage.getItem('hero_english_chapters');
      if (savedChapters) {
        setUnlockedChapters(JSON.parse(savedChapters));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveBadges = (newBadges: Badge[]) => {
    setBadges(newBadges);
    try {
      localStorage.setItem('hero_english_badges', JSON.stringify(newBadges));
    } catch {
      // ignore
    }
  };

  const unlockBadge = (badgeId: string) => {
    setBadges((prev) => {
      const next = prev.map((b) =>
        b.id === badgeId
          ? { ...b, isUnlocked: true, unlockedAt: new Date().toLocaleDateString() }
          : b
      );
      try {
        localStorage.setItem('hero_english_badges', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundManager.setSoundEnabled(nextState);
    if (nextState) {
      soundManager.play('click');
    }
  };

  const handleAddScore = (points: number) => {
    const nextScore = heroScore + points;
    setHeroScore(nextScore);
    try {
      localStorage.setItem('hero_english_score', nextScore.toString());
    } catch {
      // ignore
    }
  };

  const handleAdvanceDialogue = (pointsEarned: number) => {
    const nextScore = heroScore + pointsEarned;
    setHeroScore(nextScore);
    try {
      localStorage.setItem('hero_english_score', nextScore.toString());
    } catch {
      // ignore
    }

    const currentChapter = CHAPTERS_DATA[activeChapterIndex];
    if (activeDialogueIndex < currentChapter.dialogues.length - 1) {
      setActiveDialogueIndex((prev) => prev + 1);
    } else {
      // Completed current chapter!
      soundManager.play('victory');

      // Award chapter-specific badges
      if (currentChapter.id === 1) unlockBadge('one_for_vocab');
      if (currentChapter.id === 2) unlockBadge('explosion_idioms');
      if (currentChapter.id === 3) unlockBadge('preposition_sensei');

      // Unlock next chapter if available
      const nextChapId = currentChapter.id + 1;
      if (nextChapId <= CHAPTERS_DATA.length && !unlockedChapters.includes(nextChapId)) {
        const nextUnlocked = [...unlockedChapters, nextChapId];
        setUnlockedChapters(nextUnlocked);
        try {
          localStorage.setItem('hero_english_chapters', JSON.stringify(nextUnlocked));
        } catch {
          // ignore
        }
      }

      // If finished chapter 4, prompt to enter the boss battle!
      if (currentChapter.id === 4) {
        setCurrentTab('boss');
      } else {
        setActiveChapterIndex((prev) => prev + 1);
        setActiveDialogueIndex(0);
      }
    }
  };

  const handleSelectChapter = (idx: number) => {
    soundManager.play('click');
    setActiveChapterIndex(idx);
    setActiveDialogueIndex(0);
    setShowIntroHeroBanner(false);
  };

  const handleBossVictory = () => {
    unlockBadge('duovour_slayer');
    unlockBadge('s_rank_license');
    unlockBadge('plus_ultra_strike');
    setHeroScore((prev) => prev + 150);
    setStreakCount((prev) => prev + 1);
    setIsLicenseOpen(true);
  };

  const unlockedBadgeCount = badges.filter((b) => b.isUnlocked).length;
  const currentChapter = CHAPTERS_DATA[activeChapterIndex];
  const currentDialogue = currentChapter?.dialogues[activeDialogueIndex];
  const activeChar = CHARACTERS[currentChapter?.characterId] || CHARACTERS.izumi;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans-main selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Bar Navigation */}
      <TopNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenLicense={() => setIsLicenseOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        unlockedBadgeCount={unlockedBadgeCount}
        streakCount={streakCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 md:py-8 flex flex-col gap-8">
        {/* Intro Campus Banner when on Chapters Tab */}
        {currentTab === 'chapters' && showIntroHeroBanner && (
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
            {/* Campus Background Image */}
            <div className="w-full h-56 md:h-72 relative overflow-hidden">
              <img
                src={CAMPUS_BACKGROUND}
                alt="Seishin Hero Academy Campus"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            </div>

            {/* Banner Text Overlays */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-8 md:right-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  APEX LINGUISTIC ACADEMY / HERO TRAINING
                </span>
                <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight font-hero drop-shadow-md">
                  My Hero English: The Linguistic Quirk
                </h1>
                <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Anime kahramanlarıyla interaktif diyaloglara gir, İngilizce gramer ve deyimleri fethet!
                  Akademiyi bitirince Yeşil Tüylü Seri Tiranı <strong>Lord Duovour</strong> ile 3D dövüşe katıl ve efsanevi rozetleri kap!
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    soundManager.play('click');
                    setShowIntroHeroBanner(false);
                  }}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer whitespace-nowrap"
                >
                  Derslere Başla / Enter Lessons
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: STORY CHAPTERS & VISUAL NOVEL */}
        {currentTab === 'chapters' && (
          <div className="space-y-8">
            {/* Chapter Selection Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {CHAPTERS_DATA.map((chap, idx) => {
                const isUnlocked = unlockedChapters.includes(chap.id);
                const isActive = activeChapterIndex === idx;
                const char = CHARACTERS[chap.characterId];

                return (
                  <button
                    key={chap.id}
                    onClick={() => isUnlocked && handleSelectChapter(idx)}
                    disabled={!isUnlocked}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                      isActive
                        ? 'bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/50 shadow-xl'
                        : isUnlocked
                        ? 'bg-slate-900/60 hover:bg-slate-900 border-slate-800'
                        : 'bg-slate-950/40 border-slate-900 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold text-slate-400">
                          0{chap.id}. Chapter
                        </span>
                        {isUnlocked ? (
                          <span
                            className="text-[10px] font-extrabold px-2 py-0.5 rounded text-white"
                            style={{ backgroundColor: char.color }}
                          >
                            {char.name.split(' ')[0]}
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-500">🔒 Kilitli</span>
                        )}
                      </div>

                      <h3 className="font-bold text-sm text-white line-clamp-1 mb-1">
                        {chap.titleTr}
                      </h3>
                      <p className="text-[11px] text-slate-400 line-clamp-2">
                        {chap.topic}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">
                        {isActive ? 'Şu An Oynanıyor' : isUnlocked ? 'Seç ve Oyna' : 'Önceki Bölümü Bitir'}
                      </span>
                      {isUnlocked && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 3D Campus Scene & Interactive Dialogue Container */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950/90 shadow-2xl p-4 md:p-6">
              {/* Subtle 3D background in story mode */}
              <div className="absolute inset-0 opacity-40 pointer-events-none">
                <ThreeScene mode="campus" />
              </div>

              {/* Active Visual Novel Dialogue Box */}
              <div className="relative z-10 py-4">
                {currentDialogue && (
                  <DialogueViewer
                    dialogue={currentDialogue}
                    activeCharacter={activeChar}
                    lessonGuide={currentChapter?.lessonGuide}
                    cefrLevel={currentChapter?.cefrLevel}
                    onAdvance={handleAdvanceDialogue}
                  />
                )}
              </div>

              {/* Chapter Footer Progress */}
              <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-3">
                  <span>
                    Diyalog Adımı: <strong className="text-white">{activeDialogueIndex + 1}</strong> / {currentChapter?.dialogues.length}
                  </span>
                  <span>·</span>
                  <span>
                    Eğitmen: <strong className="text-emerald-400">{activeChar.name}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Jump to Mini-Games */}
                  <button
                    onClick={() => {
                      soundManager.play('click');
                      setCurrentTab('minigames');
                    }}
                    className="flex items-center gap-1.5 text-orange-400 hover:text-orange-300 font-bold transition-colors cursor-pointer"
                  >
                    <Gamepad2 className="w-4 h-4 text-orange-400" />
                    <span>Mini Oyunlar ➔</span>
                  </button>

                  {/* Direct Boss Battle Jump button if user wants to fight Duovour */}
                  <button
                    onClick={() => {
                      soundManager.play('click');
                      setCurrentTab('boss');
                    }}
                    className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-bold transition-colors cursor-pointer"
                  >
                    <Swords className="w-4 h-4 text-rose-500" />
                    <span>Lord Duovour Arenası ➔</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MINI GAMES */}
        {currentTab === 'minigames' && (
          <MiniGames
            onAwardBadge={unlockBadge}
            onAddScore={handleAddScore}
          />
        )}

        {/* TAB 3: 3D CLIMAX BOSS BATTLE */}
        {currentTab === 'boss' && (
          <div className="space-y-4">
            <div className="text-center space-y-1 mb-2">
              <span className="text-xs font-black uppercase tracking-widest text-rose-400 flex items-center justify-center gap-1.5">
                <Swords className="w-4 h-4 text-rose-500" />
                CLIMACTIC 3D ARENA SHOWDOWN
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white font-hero">
                VS. LORD DUOVOUR (THE STREAK TYRANT)
              </h2>
              <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto">
                Yeşil tüylü seri tiranı öğrencilerin peşinde! Soruları doğru cevapla, İngilizce Gücünle hasar ver,
                %100 Plus Ultra sayacını doldurarak nihai bitiriciyi indir!
              </p>
            </div>

            <BossBattle
              playerName={playerName}
              onVictory={handleBossVictory}
              onBackToAcademy={() => setCurrentTab('chapters')}
            />
          </div>
        )}

        {/* TAB 4: DOJO VOCABULARY & GRAMMAR GRIMOIRE */}
        {currentTab === 'dojo' && <DojoReview />}
      </main>

      {/* Hero License Modal */}
      <HeroLicenseModal
        isOpen={isLicenseOpen}
        onClose={() => setIsLicenseOpen(false)}
        playerName={playerName}
        onUpdatePlayerName={(name) => {
          setPlayerName(name);
          try {
            localStorage.setItem('hero_english_name', name);
          } catch {
            // ignore
          }
        }}
        badges={badges}
        heroScore={heroScore}
        streakCount={streakCount}
      />

      {/* Footer */}
      <footer className="w-full bg-slate-950 border-t border-slate-900 py-6 px-4 text-center text-xs text-slate-500">
        <p>
          Hero English: Linguistic Academy © 2026 · İngilizce Dil Kahramanları Akademisi
        </p>
        <p className="text-[11px] text-slate-600 mt-1">
          Karakterler ve mekânlar eğitim amaçlı orijinal kurgusal kahraman arketipleridir.
        </p>
      </footer>
    </div>
  );
}
