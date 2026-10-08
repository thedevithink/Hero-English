import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { CHARACTERS } from '../data/characters';
import { soundManager } from '../utils/audio';
import {
  Zap,
  Bomb,
  RotateCcw,
  Sparkles,
  Trophy,
  Volume2,
  CheckCircle2,
  ArrowRight,
  Flame,
  Headphones,
  Check,
  X,
  Gauge
} from 'lucide-react';

interface MiniGamesProps {
  onAwardBadge: (badgeId: string) => void;
  onAddScore: (points: number) => void;
}

// Data for Katsuro's Explosion Blitz
interface BlitzQuestion {
  targetTr: string;
  correctEn: string;
  options: string[];
}

const BLITZ_QUESTIONS: BlitzQuestion[] = [
  {
    targetTr: 'ÇOCUK OYUNCAĞI / ÇOK KOLAY',
    correctEn: 'Piece of cake',
    options: ['Piece of cake', 'Bite the bullet', 'Break a leg', 'Tenacious']
  },
  {
    targetTr: 'İYİ ŞANSLAR / BAŞARILAR DİLEĞİ',
    correctEn: 'Break a leg',
    options: ['Break a leg', 'Face the music', 'Proceed toward', 'Fought']
  },
  {
    targetTr: 'DİŞİNİ SIKMAK / ZORLUĞA KATLANMAK',
    correctEn: 'Bite the bullet',
    options: ['Bite the bullet', 'Piece of cake', 'Cowardly', 'Caught']
  },
  {
    targetTr: 'AZİMLİ / PES ETMEYEN / KARARLI',
    correctEn: 'Tenacious',
    options: ['Tenacious', 'Cowardly', 'Careless', 'Fragile']
  },
  {
    targetTr: 'DÖVÜŞMEK (FIGHT) FİİLİNİN GEÇMİŞ HALİ',
    correctEn: 'Fought',
    options: ['Fought', 'Fighted', 'Fighting', 'Fight']
  },
  {
    targetTr: 'YAKALAMAK (CATCH) FİİLİNİN GEÇMİŞ HALİ',
    correctEn: 'Caught',
    options: ['Caught', 'Catched', 'Catching', 'Caughter']
  },
  {
    targetTr: 'SONUÇLARLA / HATAYLA YÜZLEŞMEK',
    correctEn: 'Face the music',
    options: ['Face the music', 'Break a leg', 'Proceed toward', 'Piece of cake']
  },
  {
    targetTr: 'CESUR / YÜREKLİ',
    correctEn: 'Brave',
    options: ['Brave', 'Cowardly', 'Timid', 'Fearful']
  },
  {
    targetTr: 'SAATLER İÇİN KULLANILAN EDAT (at 5 PM)',
    correctEn: 'At',
    options: ['At', 'In', 'On', 'For']
  },
  {
    targetTr: 'GÜNLER İÇİN KULLANILAN EDAT (on Monday)',
    correctEn: 'On',
    options: ['On', 'At', 'In', 'By']
  },
  {
    targetTr: 'ZORUNLULUK / ŞART BİLDİREN MODAL FİİL',
    correctEn: 'Must',
    options: ['Must', 'Might', 'Could', 'May']
  },
  {
    targetTr: 'GÜVENLİĞE DOĞRU İLERLEMEK / İNTİKAL ETMEK',
    correctEn: 'Proceed toward',
    options: ['Proceed toward', 'Run away', 'Face the music', 'Break a leg']
  }
];

// Data for Izumi's Sentence Synthesizer
interface SentencePuzzle {
  id: string;
  targetTr: string;
  words: string[];
  correctOrder: string[];
}

const SENTENCE_PUZZLES: SentencePuzzle[] = [
  {
    id: 'sp1',
    targetTr: 'Gerçek bir kahraman masum insanları asla terk etmez.',
    words: ['never', 'A true hero', 'abandons', 'innocent people'],
    correctOrder: ['A true hero', 'never', 'abandons', 'innocent people']
  },
  {
    id: 'sp2',
    targetTr: 'Her sabah saat yedide sıkı antrenman yaparız.',
    words: ['We train hard', 'at 7 AM', 'every morning'],
    correctOrder: ['We train hard', 'at 7 AM', 'every morning']
  },
  {
    id: 'sp3',
    targetTr: 'Katsuro dün kötü adamla cesurca dövüştü.',
    words: ['fought bravely', 'Katsuro', 'yesterday', 'against the villain'],
    correctOrder: ['Katsuro', 'fought bravely', 'against the villain', 'yesterday']
  },
  {
    id: 'sp4',
    targetTr: 'Gece yarısından önce Lord Duovour\'ı yenmeliyiz!',
    words: ['We must defeat', 'before midnight', 'Lord Duovour'],
    correctOrder: ['We must defeat', 'Lord Duovour', 'before midnight']
  },
  {
    id: 'sp5',
    targetTr: 'Sınırlarını aş ve kahramanlık lisansını kazan!',
    words: ['Go beyond', 'your limits and', 'earn your license'],
    correctOrder: ['Go beyond', 'your limits and', 'earn your license']
  }
];

// Data for Almighty's Listening Drill
interface ListeningItem {
  id: string;
  spokenEn: string;
  questionTr: string;
  options: string[];
  correctIndex: number;
  explanationTr: string;
}

const LISTENING_ITEMS: ListeningItem[] = [
  {
    id: 'li1',
    spokenEn: 'A tenacious hero never surrenders.',
    questionTr: 'Duyduğunuz cümlenin doğru Türkçe karşılığı hangisidir?',
    options: [
      'Azimli bir kahraman asla teslim olmaz.',
      'Korkak bir kahraman hemen kaçar.',
      'Bir kahraman her zaman müzik dinler.',
      'Sınav çocuk oyuncağıdır.'
    ],
    correctIndex: 0,
    explanationTr: "'Tenacious' azimli/kararlı, 'surrender' ise teslim olmak demektir. 'never surrenders' = asla teslim olmaz."
  },
  {
    id: 'li2',
    spokenEn: 'We must proceed toward the emergency shelter immediately.',
    questionTr: 'Duyduğunuz acil durum anonsunun anlamı nedir?',
    options: [
      'Derhal acil durum sığınağına doğru intikal etmeliyiz.',
      'Hemen evlerimize dönüp uyumalıyız.',
      'Düşmana doğru tek başımıza koşmalıyız.',
      'Yarın sabah sekizde antrenman yapacağız.'
    ],
    correctIndex: 0,
    explanationTr: "'Proceed toward' ...e doğru ilerlemek, 'emergency shelter' acil durum sığınağı, 'immediately' ise derhal demektir."
  },
  {
    id: 'li3',
    spokenEn: 'The English licensing exam was a piece of cake for me.',
    questionTr: 'Duyduğunuz cümledeki deyim ne anlama gelmektedir?',
    options: [
      'İngilizce lisans sınavı benim için çocuk oyuncağıydı.',
      'İngilizce lisans sınavında bir dilim pasta yedim.',
      'İngilizce sınavında bacağımı kırdım.',
      'İngilizce sınavı çok zordu ve vazgeçtim.'
    ],
    correctIndex: 0,
    explanationTr: "'A piece of cake' İngilizcede çok kolay, tereyağından kıl çeker gibi, çocuk oyuncağı anlamına gelen deyimdir."
  },
  {
    id: 'li4',
    spokenEn: 'Almighty Sensei has saved hundreds of lives so far.',
    questionTr: 'Duyduğunuz cümlenin Present Perfect anlamı nedir?',
    options: [
      'Almighty Sensei şimdiye dek yüzlerce hayat kurtardı.',
      'Almighty Sensei dün şehirden ayrıldı.',
      'Almighty Sensei yarın insanları kurtaracak.',
      'Almighty Sensei her gün yüzlerce saat uyur.'
    ],
    correctIndex: 0,
    explanationTr: "'has saved' ve 'so far' (şimdiye dek) kalıbı, hayat deneyimini anlatan Present Perfect yapısıdır."
  }
];

export const MiniGames: React.FC<MiniGamesProps> = ({ onAwardBadge, onAddScore }) => {
  const [activeMode, setActiveMode] = useState<'blitz' | 'builder' | 'listening'>('blitz');

  // Blitz State
  const [blitzScore, setBlitzScore] = useState<number>(0);
  const [blitzHighScore, setBlitzHighScore] = useState<number>(0);
  const [blitzTimeLeft, setBlitzTimeLeft] = useState<number>(40);
  const [isBlitzRunning, setIsBlitzRunning] = useState<boolean>(false);
  const [blitzIndex, setBlitzIndex] = useState<number>(0);
  const [blitzCombo, setBlitzCombo] = useState<number>(0);
  const [blitzFeedback, setBlitzFeedback] = useState<string | null>(null);
  const [blitzExplosion, setBlitzExplosion] = useState<boolean>(false);
  const blitzTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sentence Builder State
  const [builderIndex, setBuilderIndex] = useState<number>(0);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [constructedWords, setConstructedWords] = useState<string[]>([]);
  const [builderScore, setBuilderScore] = useState<number>(0);
  const [builderFeedback, setBuilderFeedback] = useState<{ isSuccess: boolean; msg: string } | null>(null);

  // Listening State
  const [listeningIndex, setListeningIndex] = useState<number>(0);
  const [selectedListeningOption, setSelectedListeningOption] = useState<number | null>(null);
  const [isListeningSubmitted, setIsListeningSubmitted] = useState<boolean>(false);
  const [listeningScore, setListeningScore] = useState<number>(0);

  // Initialize high score from storage
  useEffect(() => {
    try {
      const savedHigh = localStorage.getItem('blitz_high_score');
      if (savedHigh) {
        setBlitzHighScore(parseInt(savedHigh, 10));
      }
    } catch {
      // ignore
    }
  }, []);

  // Initialize sentence puzzle
  useEffect(() => {
    if (activeMode === 'builder') {
      loadPuzzle(builderIndex);
    }
  }, [activeMode, builderIndex]);

  const loadPuzzle = (idx: number) => {
    const puzzle = SENTENCE_PUZZLES[idx % SENTENCE_PUZZLES.length];
    const shuffled = [...puzzle.words].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
    setConstructedWords([]);
    setBuilderFeedback(null);
  };

  // Blitz Timer Effect
  useEffect(() => {
    if (isBlitzRunning && blitzTimeLeft > 0) {
      blitzTimerRef.current = setTimeout(() => {
        setBlitzTimeLeft((t) => t - 1);
      }, 1000);
    } else if (isBlitzRunning && blitzTimeLeft <= 0) {
      endBlitzGame();
    }
    return () => {
      if (blitzTimerRef.current) clearTimeout(blitzTimerRef.current);
    };
  }, [isBlitzRunning, blitzTimeLeft]);

  const startBlitzGame = () => {
    soundManager.play('click');
    setBlitzScore(0);
    setBlitzCombo(0);
    setBlitzTimeLeft(40);
    setBlitzIndex(Math.floor(Math.random() * BLITZ_QUESTIONS.length));
    setBlitzFeedback(null);
    setIsBlitzRunning(true);
  };

  const endBlitzGame = () => {
    setIsBlitzRunning(false);
    if (blitzScore > blitzHighScore) {
      setBlitzHighScore(blitzScore);
      try {
        localStorage.setItem('blitz_high_score', blitzScore.toString());
      } catch {
        // ignore
      }
    }

    if (blitzScore >= 250) {
      onAwardBadge('arcade_combo_king');
      soundManager.play('victory');
      try {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    } else {
      soundManager.play('victory');
    }

    onAddScore(blitzScore);
  };

  const handleBlitzAnswer = (option: string) => {
    if (!isBlitzRunning) return;
    const currentQ = BLITZ_QUESTIONS[blitzIndex % BLITZ_QUESTIONS.length];

    if (option === currentQ.correctEn) {
      const nextCombo = blitzCombo + 1;
      const points = 25 + nextCombo * 5;
      setBlitzScore((s) => s + points);
      setBlitzCombo(nextCombo);
      setBlitzFeedback(`BOOM! +${points} PTS (COMBO x${nextCombo})`);
      setBlitzExplosion(true);
      setTimeout(() => setBlitzExplosion(false), 300);

      soundManager.play('punch');
      setBlitzIndex((prev) => (prev + 1) % BLITZ_QUESTIONS.length);
    } else {
      soundManager.play('wrong');
      setBlitzCombo(0);
      setBlitzScore((s) => Math.max(0, s - 10));
      setBlitzFeedback('MISS! Combo broken (-10 pts)');
    }
  };

  // Sentence Builder Handlers
  const handlePickWord = (word: string, index: number) => {
    soundManager.play('click');
    setConstructedWords((prev) => [...prev, word]);
    setAvailableWords((prev) => prev.filter((_, i) => i !== index));
    setBuilderFeedback(null);
  };

  const handleRemoveWord = (word: string, index: number) => {
    soundManager.play('click');
    setAvailableWords((prev) => [...prev, word]);
    setConstructedWords((prev) => prev.filter((_, i) => i !== index));
    setBuilderFeedback(null);
  };

  const handleCheckSentence = () => {
    const puzzle = SENTENCE_PUZZLES[builderIndex % SENTENCE_PUZZLES.length];
    const isCorrect =
      constructedWords.length === puzzle.correctOrder.length &&
      constructedWords.every((w, i) => w === puzzle.correctOrder[i]);

    if (isCorrect) {
      soundManager.play('correct');
      const fullSentence = constructedWords.join(' ');
      soundManager.speak(fullSentence);

      setBuilderScore((s) => s + 50);
      onAddScore(50);
      setBuilderFeedback({
        isSuccess: true,
        msg: `PLUS ULTRA! Mükemmel İngilizce cümle: "${fullSentence}"`
      });

      if (builderIndex >= SENTENCE_PUZZLES.length - 1) {
        onAwardBadge('arcade_combo_king');
        try {
          confetti({ particleCount: 100, spread: 70 });
        } catch {
          // ignore
        }
      }
    } else {
      soundManager.play('wrong');
      setBuilderFeedback({
        isSuccess: false,
        msg: 'Gramer sıralaması hatalı! Kelimelere tıklayarak geri al ve tekrar dene.'
      });
    }
  };

  const handleNextPuzzle = () => {
    soundManager.play('click');
    setBuilderIndex((prev) => (prev + 1) % SENTENCE_PUZZLES.length);
  };

  // Listening Handlers
  const currentListeningItem = LISTENING_ITEMS[listeningIndex % LISTENING_ITEMS.length];

  const handlePlayListeningAudio = (rate: number = 0.95) => {
    soundManager.play('click');
    soundManager.speak(currentListeningItem.spokenEn, rate);
  };

  const handleSelectListeningOption = (idx: number) => {
    if (isListeningSubmitted) return;
    soundManager.play('click');
    setSelectedListeningOption(idx);
  };

  const handleSubmitListening = () => {
    if (selectedListeningOption === null || isListeningSubmitted) return;
    setIsListeningSubmitted(true);
    const isCorrect = selectedListeningOption === currentListeningItem.correctIndex;
    if (isCorrect) {
      soundManager.play('correct');
      setListeningScore((s) => s + 40);
      onAddScore(40);
    } else {
      soundManager.play('wrong');
    }
  };

  const handleNextListening = () => {
    soundManager.play('click');
    setIsListeningSubmitted(false);
    setSelectedListeningOption(null);
    setListeningIndex((prev) => (prev + 1) % LISTENING_ITEMS.length);
  };

  const currentBlitzQ = BLITZ_QUESTIONS[blitzIndex % BLITZ_QUESTIONS.length];
  const currentPuzzle = SENTENCE_PUZZLES[builderIndex % SENTENCE_PUZZLES.length];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 p-4">
      {/* Arcade Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
          Hero Arcade Dojo / Hızlı İngilizce Mini Oyunları
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white font-anime tracking-wide">
          HERO ACADEMY MINI-GAMES
        </h2>
        <p className="text-xs md:text-sm text-slate-400 max-w-lg mx-auto">
          Reflekslerini test et, cümleleri kur, dinleme alıştırması yap ve ekstra deneyim puanları topla!
        </p>
      </div>

      {/* Mode Switcher Buttons: 3 Educational Modes */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => {
            soundManager.play('click');
            setActiveMode('blitz');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
            activeMode === 'blitz'
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-lg shadow-orange-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Bomb className="w-4 h-4" />
          <span>1. Katsuro's Word Rush</span>
        </button>

        <button
          onClick={() => {
            soundManager.play('click');
            setActiveMode('builder');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
            activeMode === 'builder'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>2. Lexi's Sentence Builder</span>
        </button>

        <button
          onClick={() => {
            soundManager.play('click');
            setActiveMode('listening');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
            activeMode === 'listening'
              ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Headphones className="w-4 h-4" />
          <span>3. Sensei's Listening Drill</span>
        </button>
      </div>

      {/* MODE 1: KATSURO EXPLOSION BLITZ */}
      {activeMode === 'blitz' && (
        <div className="relative bg-slate-950/90 border-2 border-orange-500/50 rounded-3xl p-6 shadow-2xl overflow-hidden space-y-6">
          {/* Character Guide Banner */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-orange-500 shadow-md shrink-0">
                <img
                  src={CHARACTERS.katsuro.avatar}
                  alt="Katsuro Blast"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-sm md:text-base text-white">
                  Katsuro: "FAST REFLEXES OR GET BLASTED!"
                </h3>
                <p className="text-xs text-orange-400">
                  Yukarıdaki Türkçe anlama uyan İngilizce kelimeyi süre bitmeden patlat!
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-400">High Score</div>
              <div className="text-base font-black text-amber-400 font-mono">
                {blitzHighScore} PTS
              </div>
            </div>
          </div>

          {/* Game Stats Bar */}
          <div className="flex items-center justify-between bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="text-orange-400 flex items-center gap-1 font-mono text-sm">
                <Flame className="w-4 h-4 text-orange-500" />
                Score: {blitzScore}
              </span>
              <span className="text-amber-400 font-mono">
                Combo: x{blitzCombo}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Süre:</span>
              <span
                className={`font-mono text-lg font-black px-3 py-0.5 rounded-lg border ${
                  blitzTimeLeft <= 10
                    ? 'bg-rose-950 text-rose-400 border-rose-600 animate-pulse'
                    : 'bg-slate-800 text-emerald-400 border-slate-700'
                }`}
              >
                {blitzTimeLeft}s
              </span>
            </div>
          </div>

          {/* Main Action Field */}
          {!isBlitzRunning ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-20 h-20 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center mx-auto border-2 border-orange-500/40">
                <Bomb className="w-10 h-10 animate-bounce" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-black text-white font-anime tracking-wide">
                  READY FOR THE 40-SECOND WORD BLITZ?
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  250 puanı aşarak özel <strong>"Mini Oyun Şampiyonu"</strong> rozetini kap!
                </p>
              </div>
              <button
                onClick={startBlitzGame}
                className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black rounded-xl shadow-xl transition-all cursor-pointer transform hover:scale-105 active:scale-95"
              >
                Hemen Başla / Start Blitz!
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Target Prompt Box */}
              <div
                className={`text-center p-6 rounded-2xl border-2 transition-all duration-300 relative ${
                  blitzExplosion
                    ? 'bg-orange-950/80 border-orange-400 scale-102 ring-4 ring-orange-500/40'
                    : 'bg-slate-900 border-slate-700'
                }`}
              >
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                  HEDEF ANLAM / TARGET MEANING:
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white tracking-wide">
                  {currentBlitzQ.targetTr}
                </h3>

                {blitzFeedback && (
                  <div className="absolute top-2 right-4 text-xs font-black text-amber-400 animate-in fade-in">
                    {blitzFeedback}
                  </div>
                )}
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentBlitzQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleBlitzAnswer(opt)}
                    className="p-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-orange-400 rounded-2xl text-left font-bold text-sm md:text-base text-white transition-all transform active:scale-95 cursor-pointer shadow-lg flex items-center justify-between group"
                  >
                    <span className="group-hover:text-orange-300 transition-colors">
                      {opt}
                    </span>
                    <span className="text-xs text-slate-500 font-mono group-hover:text-orange-400">
                      [CLICK]
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 2: LEXI'S SENTENCE SYNTHESIZER */}
      {activeMode === 'builder' && (
        <div className="relative bg-slate-950/90 border-2 border-emerald-500/50 rounded-3xl p-6 shadow-2xl overflow-hidden space-y-6">
          {/* Character Guide Banner */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-emerald-500 shadow-md shrink-0">
                <img
                  src={CHARACTERS.izumi.avatar}
                  alt="Izumi Lexi"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-sm md:text-base text-white">
                  Lexi: "Construct the hero sentence in correct English!"
                </h3>
                <p className="text-xs text-emerald-400">
                  Aşağıdaki kelime kartlarına sırayla tıklayarak cümleyi doğru gramerle oluştur.
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-400">Toplanan Puan</div>
              <div className="text-base font-black text-emerald-400 font-mono">
                +{builderScore} XP
              </div>
            </div>
          </div>

          {/* Target Meaning */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-center space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Türkçe Hedef Cümle:
            </span>
            <p className="text-base md:text-lg font-bold text-white">
              "{currentPuzzle.targetTr}"
            </p>
          </div>

          {/* Constructed Sentence Slot */}
          <div className="min-h-[70px] bg-slate-900/50 border-2 border-dashed border-emerald-500/40 rounded-2xl p-3 flex flex-wrap items-center gap-2">
            {constructedWords.length === 0 ? (
              <span className="text-xs text-slate-500 italic px-2">
                Aşağıdaki kelimelere tıklayarak cümleni buraya ekle...
              </span>
            ) : (
              constructedWords.map((word, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRemoveWord(word, idx)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs md:text-sm shadow-md hover:bg-rose-500 hover:text-white transition-all cursor-pointer group"
                  title="Geri almak için tıkla"
                >
                  <span>{word}</span>
                  <span className="ml-1.5 opacity-60 text-[10px] group-hover:inline">✕</span>
                </button>
              ))
            )}
          </div>

          {/* Available Word Buttons */}
          <div className="space-y-2">
            <span className="text-xs text-slate-400 font-semibold block">
              Kullanılabilir Kelimeler (Sırasıyla tıkla):
            </span>
            <div className="flex flex-wrap gap-2.5">
              {availableWords.map((word, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePickWord(word, idx)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-emerald-400 text-white font-bold text-xs md:text-sm shadow-sm transition-all cursor-pointer active:scale-95"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback & Actions */}
          {builderFeedback && (
            <div
              className={`p-3.5 rounded-xl border text-xs md:text-sm font-semibold flex items-center justify-between ${
                builderFeedback.isSuccess
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                  : 'bg-rose-950/80 border-rose-500 text-rose-200'
              }`}
            >
              <span>{builderFeedback.msg}</span>
              {builderFeedback.isSuccess && (
                <button
                  onClick={() => soundManager.speak(constructedWords.join(' '))}
                  className="p-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white cursor-pointer"
                  title="Tekrar Dinle"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <button
              onClick={() => loadPuzzle(builderIndex)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Sıfırla / Reset</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCheckSentence}
                disabled={constructedWords.length === 0}
                className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-extrabold transition-all cursor-pointer ${
                  constructedWords.length > 0
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 active:scale-95'
                    : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                }`}
              >
                Cümleyi Doğrula (Verify)
              </button>

              {builderFeedback?.isSuccess && (
                <button
                  onClick={handleNextPuzzle}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs md:text-sm transition-all cursor-pointer"
                >
                  <span>Sonraki Soru ➔</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: ALMIGHTY'S LISTENING DRILL */}
      {activeMode === 'listening' && (
        <div className="relative bg-slate-950/90 border-2 border-sky-500/50 rounded-3xl p-6 shadow-2xl overflow-hidden space-y-6">
          {/* Character Guide Banner */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-sky-400 shadow-md shrink-0">
                <img
                  src={CHARACTERS.almighty.avatar}
                  alt="Almighty Sensei"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-sm md:text-base text-white">
                  Almighty Sensei: "LISTEN CLOSELY WITH HERO INTENT!"
                </h3>
                <p className="text-xs text-sky-300">
                  İngilizce ses kaydını dinleyin ve doğru Türkçe karşılığını seçin!
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-400">Puan</div>
              <div className="text-base font-black text-sky-400 font-mono">
                +{listeningScore} XP
              </div>
            </div>
          </div>

          {/* Audio Player Station */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-sky-500/30 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto border-2 border-sky-500/40">
              <Headphones className="w-8 h-8 animate-pulse" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                Ses Kaydı #{listeningIndex + 1} / {LISTENING_ITEMS.length}
              </span>
              <p className="text-sm font-semibold text-slate-300">
                {currentListeningItem.questionTr}
              </p>
            </div>

            {/* Audio Listen Buttons (Normal & Slow) */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => handlePlayListeningAudio(0.95)}
                className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs md:text-sm rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                <span>Dinle (1.0x Normal)</span>
              </button>

              <button
                onClick={() => handlePlayListeningAudio(0.7)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-sky-300 font-bold text-xs md:text-sm rounded-xl border border-sky-500/40 transition-all cursor-pointer flex items-center gap-2"
              >
                <Gauge className="w-4 h-4 text-amber-400" />
                <span>Yavaş Dinle (0.7x Slow)</span>
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentListeningItem.options.map((optText, idx) => {
              const isSelected = selectedListeningOption === idx;
              let optStyle =
                'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200';

              if (isSelected && !isListeningSubmitted) {
                optStyle =
                  'bg-sky-950 border-sky-400 text-white ring-2 ring-sky-400 shadow-lg';
              } else if (isListeningSubmitted) {
                if (idx === currentListeningItem.correctIndex) {
                  optStyle =
                    'bg-emerald-950 border-emerald-400 text-emerald-100 ring-2 ring-emerald-400';
                } else if (isSelected && idx !== currentListeningItem.correctIndex) {
                  optStyle =
                    'bg-rose-950 border-rose-500 text-rose-100 ring-2 ring-rose-500';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectListeningOption(idx)}
                  disabled={isListeningSubmitted}
                  className={`p-4 rounded-xl border text-sm font-semibold text-left transition-all cursor-pointer flex items-center justify-between ${optStyle}`}
                >
                  <span>{optText}</span>
                  {isListeningSubmitted && idx === currentListeningItem.correctIndex && (
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                  )}
                  {isListeningSubmitted && isSelected && idx !== currentListeningItem.correctIndex && (
                    <X className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Submission and Feedback */}
          {!isListeningSubmitted ? (
            <button
              onClick={handleSubmitListening}
              disabled={selectedListeningOption === null}
              className={`w-full py-3.5 rounded-xl font-black text-sm tracking-wide transition-all cursor-pointer ${
                selectedListeningOption !== null
                  ? 'bg-sky-400 hover:bg-sky-300 text-slate-950 shadow-lg shadow-sky-400/20'
                  : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
              }`}
            >
              Cevabı Onayla (Verify)
            </button>
          ) : (
            <div className="space-y-3 pt-1">
              <div
                className={`p-4 rounded-xl border text-xs md:text-sm ${
                  selectedListeningOption === currentListeningItem.correctIndex
                    ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                    : 'bg-rose-950/70 border-rose-500 text-rose-200'
                }`}
              >
                <div className="font-bold mb-1">
                  {selectedListeningOption === currentListeningItem.correctIndex
                    ? '✅ HARİKA DİNLEME! (+40 XP)'
                    : '❌ DİKKAT!'}
                </div>
                <p className="text-white font-mono text-xs mb-1">
                  Konuşulan Cümle: "{currentListeningItem.spokenEn}"
                </p>
                <p className="opacity-90">{currentListeningItem.explanationTr}</p>
              </div>

              <button
                onClick={handleNextListening}
                className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg cursor-pointer"
              >
                Sonraki Dinleme Alıştırması ➔
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
