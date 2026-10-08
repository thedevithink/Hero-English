import React, { useState } from 'react';
import { VOCAB_DATA } from '../data/vocabData';
import { soundManager } from '../utils/audio';
import {
  BookOpen,
  Volume2,
  Search,
  Sparkles,
  Layers,
  List,
  RotateCw,
  CheckCircle,
  HelpCircle,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

export const DojoReview: React.FC = () => {
  const [viewMode, setViewMode] = useState<'flashcards' | 'list'>('flashcards');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Flashcard State
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);

  const categories = ['all', 'Heroic Virtues', 'Battle Idioms', 'Grammar & Verbs', 'Heroic Commands'];

  const filteredVocab = VOCAB_DATA.filter((item) => {
    const matchesSearch =
      item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.meaningTr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.exampleSentenceEn.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleSpeak = (text: string) => {
    soundManager.play('click');
    soundManager.speak(text);
  };

  const handleFlip = () => {
    soundManager.play('click');
    setIsCardFlipped(!isCardFlipped);
  };

  const handleNextCard = () => {
    soundManager.play('click');
    setIsCardFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % filteredVocab.length);
  };

  const handlePrevCard = () => {
    soundManager.play('click');
    setIsCardFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + filteredVocab.length) % filteredVocab.length);
  };

  const handleMarkMastered = (id: string) => {
    soundManager.play('correct');
    if (!masteredIds.includes(id)) {
      setMasteredIds((prev) => [...prev, id]);
    }
    handleNextCard();
  };

  const currentCard = filteredVocab[currentCardIndex % (filteredVocab.length || 1)];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 p-4">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Academy Grimoire / İngilizce Sözlük & Akıllı Kartlar</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          Hero Vocabulary & Flashcard Dojo
        </h2>
        <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto">
          Akademi boyunca karşılaştığın tüm kahramanlık sözcükleri, deyimleri ve düzensiz fiilleri telaffuzlarıyla ve hafıza kartlarıyla pekiştir!
        </p>
      </div>

      {/* Mode Switcher & Category Ribbon */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/90 p-3 rounded-2xl border border-slate-800 shadow-md">
        {/* Flashcards vs List View Toggle */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              soundManager.play('click');
              setViewMode('flashcards');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'flashcards'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Kelime Kartları (Flashcards)</span>
          </button>

          <button
            onClick={() => {
              soundManager.play('click');
              setViewMode('list');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'list'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Sözlük Listesi</span>
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundManager.play('click');
                setSelectedCategory(cat);
                setCurrentCardIndex(0);
                setIsCardFlipped(false);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'Tümü' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* FLASHCARD STUDY VIEW */}
      {viewMode === 'flashcards' && currentCard && (
        <div className="max-w-xl mx-auto space-y-4">
          {/* Card Tracker Progress */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <span>
              Kart: <strong className="text-white">{(currentCardIndex % filteredVocab.length) + 1}</strong> / {filteredVocab.length}
            </span>
            <span className="text-emerald-400 font-bold">
              Öğrenilen: {masteredIds.length} / {VOCAB_DATA.length}
            </span>
          </div>

          {/* Interactive Flip Card */}
          <div
            onClick={handleFlip}
            className="w-full min-h-[300px] bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/60 border-2 border-emerald-500/40 hover:border-emerald-400 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col justify-between cursor-pointer transition-all transform hover:scale-[1.01] active:scale-[0.99] relative select-none"
          >
            {/* Top Bar of Card */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                {currentCard.category} · {currentCard.type}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSpeak(currentCard.word);
                }}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 cursor-pointer shadow"
                title="Pronounce"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Center Content: Front (English) vs Back (Turkish Meaning) */}
            <div className="text-center my-6 space-y-3">
              {!isCardFlipped ? (
                <>
                  <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400">
                    İNGİLİZCE SÖZCÜK
                  </span>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide">
                    {currentCard.word}
                  </h3>
                  <p className="text-xs text-emerald-400 font-mono">
                    (Kartı çevirmek için tıkla 🔄)
                  </p>
                </>
              ) : (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-400">
                    TÜRKÇE ANLAMI & KULLANIMI
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-amber-300">
                    {currentCard.meaningTr}
                  </h3>
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-left space-y-1 mt-2">
                    <p className="text-xs text-emerald-200 font-semibold italic">
                      "{currentCard.exampleSentenceEn}"
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {currentCard.exampleSentenceTr}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/80 pt-3">
              <span className="flex items-center gap-1 text-[11px]">
                <RotateCw className="w-3.5 h-3.5 text-slate-400" />
                {isCardFlipped ? 'Ön yüze dön' : 'Anlamı görmek için dokun'}
              </span>
              {masteredIds.includes(currentCard.id) && (
                <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Öğrenildi ✓
                </span>
              )}
            </div>
          </div>

          {/* Action Navigation Buttons */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePrevCard}
              className="p-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Önceki</span>
            </button>

            <button
              onClick={() => handleMarkMastered(currentCard.id)}
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition-all shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Biliyorum / Öğrendim (+10 XP)</span>
            </button>

            <button
              onClick={handleNextCard}
              className="p-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Sonraki</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Kelime veya anlam ara..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredVocab.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-4 transition-all shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {item.category}
                    </span>

                    <button
                      onClick={() => handleSpeak(item.word)}
                      className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 bg-slate-800 hover:bg-slate-750 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                      title="Pronounce word"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Dinle</span>
                    </button>
                  </div>

                  <div className="space-y-0.5 mb-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {item.word}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium">
                      {item.meaningTr}
                    </p>
                  </div>

                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs text-emerald-200 font-semibold italic leading-relaxed">
                        "{item.exampleSentenceEn}"
                      </p>
                      <button
                        onClick={() => handleSpeak(item.exampleSentenceEn)}
                        className="p-1 text-slate-400 hover:text-emerald-300 shrink-0 cursor-pointer"
                        title="Pronounce example sentence"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {item.exampleSentenceTr}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Tür: {item.type}</span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <Sparkles className="w-3 h-3" />
                    Hero Level
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
