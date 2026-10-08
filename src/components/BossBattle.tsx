import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { BOSS_QUESTIONS } from '../data/bossQuestions';
import { CHARACTERS } from '../data/characters';
import { soundManager } from '../utils/audio';
import { ThreeScene } from './ThreeScene';
import { Zap, Shield, Flame, Volume2, Trophy, RotateCcw, AlertTriangle } from 'lucide-react';

interface BossBattleProps {
  playerName: string;
  onVictory: () => void;
  onBackToAcademy: () => void;
}

export const BossBattle: React.FC<BossBattleProps> = ({
  playerName,
  onVictory,
  onBackToAcademy
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [bossHp, setBossHp] = useState<number>(100);
  const [playerHp, setPlayerHp] = useState<number>(100);
  const [plusUltraGauge, setPlusUltraGauge] = useState<number>(25);
  const [isBattleOver, setIsBattleOver] = useState<'victory' | 'defeat' | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [lastActionResult, setLastActionResult] = useState<{
    success: boolean;
    messageEn: string;
    messageTr: string;
    damage: number;
  } | null>(null);

  const [attackTrigger, setAttackTrigger] = useState<{
    attacker: 'player' | 'boss' | 'plus_ultra';
    timestamp: number;
  } | null>(null);

  const boss = CHARACTERS.duovour;
  const currentQ = BOSS_QUESTIONS[currentQuestionIndex % BOSS_QUESTIONS.length];

  const handleSpeak = (text: string) => {
    soundManager.play('click');
    soundManager.speak(text);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered || isBattleOver) return;
    soundManager.play('click');
    setSelectedOption(idx);
  };

  const handleExecuteTurn = () => {
    if (selectedOption === null || isAnswered || isBattleOver) return;

    setIsAnswered(true);
    const isCorrect = selectedOption === currentQ.correctIndex;

    if (isCorrect) {
      // Player deals damage
      const isUltra = plusUltraGauge >= 100;
      const damageDealt = isUltra ? 40 : currentQ.damage;

      setAttackTrigger({
        attacker: isUltra ? 'plus_ultra' : 'player',
        timestamp: Date.now()
      });

      if (isUltra) {
        soundManager.play('plus_ultra');
      } else {
        soundManager.play('punch');
      }

      const nextBossHp = Math.max(0, bossHp - damageDealt);
      setBossHp(nextBossHp);
      setPlusUltraGauge((prev) => Math.min(100, prev + 35));

      setLastActionResult({
        success: true,
        messageEn: isUltra
          ? "PLUS ULTRA MAXIMUM IMPACT! You shattered Lord Duovour's armor with pure English fluency!"
          : "DIRECT HIT! Your English Quirk smashed through the Streak Tyrant's barrier!",
        messageTr: isUltra
          ? "PLUS ULTRA NİHAİ VURUŞ! Lord Duovour'ın zırhını kusursuz İngilizce gücünle paramparça ettin!"
          : "TAM İSABET! İngilizce Gücün Seri Tiranı'nın kalkanını delip geçti!",
        damage: damageDealt
      });

      if (nextBossHp <= 0) {
        handleVictorySequence();
      }
    } else {
      // Boss attacks player
      setAttackTrigger({
        attacker: 'boss',
        timestamp: Date.now()
      });
      soundManager.play('hit');
      soundManager.play('boss_roar');

      const bossDamage = 25;
      const nextPlayerHp = Math.max(0, playerHp - bossDamage);
      setPlayerHp(nextPlayerHp);

      setLastActionResult({
        success: false,
        messageEn: "DUOVOUR STRIKES! 'You hesitated on your English! Feel the wrath of 500 unread streak emails!'",
        messageTr: "DUOVOUR SALDIRDI! 'İngilizcede tereddüt ettin! 500 okunmamış seri e-postasının gazabını tat!'",
        damage: bossDamage
      });

      if (nextPlayerHp <= 0) {
        setIsBattleOver('defeat');
        soundManager.play('wrong');
      }
    }
  };

  const handleNextTurn = () => {
    if (bossHp <= 0) return;
    setIsAnswered(false);
    setSelectedOption(null);
    setLastActionResult(null);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleVictorySequence = () => {
    setIsBattleOver('victory');
    soundManager.play('victory');

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 80,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 80,
          origin: { x: 1 }
        });
      }, 400);
    } catch {
      // fallback
    }

    onVictory();
  };

  const handleRestartBattle = () => {
    setBossHp(100);
    setPlayerHp(100);
    setPlusUltraGauge(25);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setLastActionResult(null);
    setIsBattleOver(null);
  };

  return (
    <div className="relative w-full min-h-[85vh] flex flex-col justify-between rounded-3xl overflow-hidden border border-emerald-800/60 bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950 shadow-2xl p-4 md:p-6">
      {/* 3D Anime Three.js Canvas Backdrop */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <ThreeScene mode="boss" attackTrigger={attackTrigger} />
      </div>

      {/* Floating Battle Ambient Elements */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-6">
        {/* Top HUD: Boss vs Player Health Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-xl">
          {/* Player HUD */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5 text-sky-400">
                <Shield className="w-4 h-4 text-sky-400" />
                {playerName || 'Hero Cadet'} (You)
              </span>
              <span className="font-mono text-emerald-400">{playerHp} / 100 HP</span>
            </div>
            {/* Player HP Bar */}
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 transition-all duration-500 rounded-full"
                style={{ width: `${playerHp}%` }}
              />
            </div>

            {/* Plus Ultra Bar */}
            <div className="flex items-center justify-between text-[11px] font-bold mt-1">
              <span className="text-amber-400 flex items-center gap-1 font-anime tracking-wider">
                <Zap className="w-3.5 h-3.5" />
                PLUS ULTRA GAUGE:
              </span>
              <span className="font-mono text-amber-300">{plusUltraGauge}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-amber-900/50">
              <div
                className={`h-full transition-all duration-500 ${
                  plusUltraGauge >= 100
                    ? 'bg-gradient-to-r from-amber-400 via-red-500 to-yellow-300 animate-pulse'
                    : 'bg-gradient-to-r from-amber-500 to-orange-500'
                }`}
                style={{ width: `${plusUltraGauge}%` }}
              />
            </div>
          </div>

          {/* Boss HUD */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5 text-rose-400 font-anime text-sm">
                <Flame className="w-4 h-4 text-emerald-500" />
                {boss.name}
              </span>
              <span className="font-mono text-rose-400">{bossHp} / 100 HP</span>
            </div>
            {/* Boss HP Bar */}
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-green-500 to-rose-600 transition-all duration-500 rounded-full"
                style={{ width: `${bossHp}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Quirk: {boss.quirkName}</span>
              <span className="text-emerald-400 font-semibold">Phase {bossHp > 50 ? '1: Notification Swarm' : '2: Overdrive Streak'}</span>
            </div>
          </div>
        </div>

        {/* Visual Arena Center: Boss Avatar Display */}
        <div className="flex flex-col items-center justify-center my-2">
          <div className="relative group">
            <div
              className={`w-36 h-36 md:w-44 md:h-44 rounded-3xl overflow-hidden border-4 shadow-2xl relative transition-all duration-300 ${
                attackTrigger?.attacker === 'boss'
                  ? 'scale-110 ring-4 ring-rose-500'
                  : attackTrigger?.attacker === 'player' || attackTrigger?.attacker === 'plus_ultra'
                  ? 'translate-x-3 rotate-6 brightness-125'
                  : 'hover:scale-105'
              }`}
              style={{ borderColor: '#22c55e' }}
            >
              <img
                src={boss.avatar}
                alt={boss.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Glowing Boss Title */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-extrabold text-white bg-emerald-600 shadow-xl whitespace-nowrap border border-emerald-300/40">
              THE STREAK REAPER
            </div>
          </div>

          <div className="mt-4 text-center max-w-lg bg-slate-950/70 backdrop-blur-sm px-4 py-2 rounded-xl border border-emerald-900/40">
            <p className="text-xs text-emerald-300 font-semibold italic">
              "You think you can pass the Hero Exam without a 100-day English streak?! Think again, young hero!"
            </p>
          </div>
        </div>

        {/* Combat Action Box: Boss Challenge & Choices */}
        {!isBattleOver && (
          <div className="bg-slate-950/90 backdrop-blur-xl border-2 border-emerald-600/50 rounded-2xl p-5 md:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold px-2.5 py-1 rounded bg-rose-950/80 text-rose-400 border border-rose-800 uppercase tracking-wider">
                  Enemy Attack: {currentQ.type.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  Question {currentQuestionIndex + 1} of {BOSS_QUESTIONS.length}
                </span>
              </div>

              <button
                onClick={() => handleSpeak(currentQ.questionEn)}
                className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-700/50 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen / Dinle</span>
              </button>
            </div>

            {/* Boss Question Text */}
            <div className="space-y-1">
              <p className="text-base md:text-lg font-bold text-white leading-relaxed">
                {currentQ.questionEn}
              </p>
              <p className="text-xs text-slate-400 italic">
                {currentQ.questionTr}
              </p>
            </div>

            {/* Combat Options (Hero Counter Attacks) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {currentQ.options.map((optText, idx) => {
                const isSelected = selectedOption === idx;
                let optStyle =
                  'bg-slate-900 hover:bg-slate-850 border-slate-700 text-slate-200';

                if (isSelected && !isAnswered) {
                  optStyle =
                    'bg-emerald-950 border-emerald-400 text-emerald-100 ring-2 ring-emerald-400 shadow-lg';
                } else if (isAnswered) {
                  if (idx === currentQ.correctIndex) {
                    optStyle =
                      'bg-emerald-950/90 border-emerald-400 text-emerald-100 ring-2 ring-emerald-400';
                  } else if (isSelected && idx !== currentQ.correctIndex) {
                    optStyle =
                      'bg-rose-950/90 border-rose-500 text-rose-100 ring-2 ring-rose-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`p-3.5 text-left rounded-xl border text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${optStyle}`}
                  >
                    <span>{optText}</span>
                    {isAnswered && idx === currentQ.correctIndex && (
                      <span className="text-emerald-400 text-xs font-bold shrink-0 ml-2">✓ Doğru</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Turn Execution or Turn Feedback */}
            {!isAnswered ? (
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleExecuteTurn}
                  disabled={selectedOption === null}
                  className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-sm tracking-wide transition-all cursor-pointer ${
                    selectedOption !== null
                      ? plusUltraGauge >= 100
                        ? 'bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 text-slate-950 shadow-xl shadow-red-500/30 animate-bounce'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 active:scale-[0.99]'
                      : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                  }`}
                >
                  {plusUltraGauge >= 100
                    ? '💥 UNLEASH PLUS ULTRA ATTACK! (%100 GÜÇ)'
                    : '⚡ COUNTER WITH ENGLISH QUIRK! (Saldır)'}
                </button>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                {lastActionResult && (
                  <div
                    className={`p-4 rounded-xl border text-sm ${
                      lastActionResult.success
                        ? 'bg-emerald-950/70 border-emerald-600 text-emerald-200'
                        : 'bg-rose-950/70 border-rose-600 text-rose-200'
                    }`}
                  >
                    <p className="font-bold text-base mb-1">
                      {lastActionResult.success
                        ? `💥 BAŞARILI! (-${lastActionResult.damage} HP HASAR)`
                        : `❌ DARBE ALDINIZ! (-${lastActionResult.damage} HP HASAR)`}
                    </p>
                    <p className="text-xs leading-relaxed">
                      {lastActionResult.messageEn}
                    </p>
                    <p className="text-xs leading-relaxed opacity-85 mt-1">
                      {lastActionResult.messageTr}
                    </p>
                    <p className="text-xs text-amber-300 mt-2 font-medium border-t border-slate-700/50 pt-1.5">
                      💡 Bilgi Notu: {currentQ.explanationTr}
                    </p>
                  </div>
                )}

                {bossHp > 0 && playerHp > 0 && (
                  <button
                    onClick={handleNextTurn}
                    className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-extrabold rounded-xl text-sm transition-all shadow-lg cursor-pointer"
                  >
                    Sonraki Hamleye Geç / Next Turn ➔
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Victory Screen */}
        {isBattleOver === 'victory' && (
          <div className="bg-slate-950/95 backdrop-blur-2xl border-4 border-amber-400 rounded-3xl p-6 md:p-8 text-center shadow-2xl space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-amber-400 text-slate-950 rounded-full flex items-center justify-center mx-auto shadow-2xl ring-8 ring-amber-400/20">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                HERO ACADEMY HISTORIC VICTORY
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide font-anime">
                LORD DUOVOUR IS VANQUISHED!
              </h2>
              <p className="text-emerald-400 text-sm font-semibold max-w-lg mx-auto">
                "NOOOOO! Your English grammar was too powerful! My notification army is scattered! You are truly... S-RANK HEROES!"
              </p>
              <p className="text-xs text-slate-400 max-w-md mx-auto pt-1">
                Yeşil Tüylü Seri Tiranı'nı dize getirdiniz! Kahramanlık Akademisi ve tüm İngilizce öğrencileri kurtuldu!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={onVictory}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-extrabold rounded-xl shadow-xl shadow-amber-400/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Trophy className="w-5 h-5" />
                <span>Özel Rozetleri & Lisansı Gör / View Badges</span>
              </button>
              <button
                onClick={handleRestartBattle}
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl border border-slate-700 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Tekrar Oyna / Rematch</span>
              </button>
            </div>
          </div>
        )}

        {/* Defeat Screen */}
        {isBattleOver === 'defeat' && (
          <div className="bg-slate-950/95 backdrop-blur-2xl border-4 border-rose-600 rounded-3xl p-6 md:p-8 text-center shadow-2xl space-y-6">
            <div className="w-20 h-20 bg-rose-600 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl ring-8 ring-rose-600/20">
              <AlertTriangle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white font-anime">
                DEFEATED BY DUOVOUR'S NOTIFICATIONS!
              </h2>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Lord Duovour'ın gramer dalgaları karşısında canın tükendi! Ama gerçek bir kahraman asla pes etmez!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleRestartBattle}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Tekrar Dene / Try Again</span>
              </button>
              <button
                onClick={onBackToAcademy}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl border border-slate-700 cursor-pointer"
              >
                Akademiye Dönüp Çalış / Review Lessons
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
