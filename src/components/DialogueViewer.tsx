import React, { useState } from 'react';
import { DialogueNode, Character, QuizOption, LessonGuide } from '../types/game';
import { CHARACTERS } from '../data/characters';
import { soundManager } from '../utils/audio';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  HelpCircle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Gauge
} from 'lucide-react';

interface DialogueViewerProps {
  dialogue: DialogueNode;
  activeCharacter: Character;
  lessonGuide?: LessonGuide;
  cefrLevel?: string;
  onAdvance: (pointsEarned: number) => void;
  onChoiceSelect?: (heroPoints: number) => void;
}

export const DialogueViewer: React.FC<DialogueViewerProps> = ({
  dialogue,
  activeCharacter,
  lessonGuide,
  cefrLevel,
  onAdvance,
  onChoiceSelect
}) => {
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [chosenBranch, setChosenBranch] = useState<string | null>(null);
  const [showLessonGuide, setShowLessonGuide] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(0.95);
  const [activeWordTip, setActiveWordTip] = useState<{
    word: string;
    translation: string;
    grammarTip?: string;
  } | null>(null);

  const handleSpeak = (text: string, rate: number = speechRate) => {
    soundManager.play('click');
    soundManager.speak(text, rate);
  };

  const toggleRate = () => {
    const nextRate = speechRate === 0.95 ? 0.75 : 0.95;
    setSpeechRate(nextRate);
    soundManager.play('click');
  };

  const handleOptionClick = (option: QuizOption) => {
    if (isSubmitted) return;
    soundManager.play('click');
    setSelectedOption(option);
  };

  const handleSubmitQuiz = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);
    if (selectedOption.isCorrect) {
      soundManager.play('correct');
    } else {
      soundManager.play('wrong');
    }
  };

  const handleNextDialogue = () => {
    soundManager.play('click');
    let points = 0;
    if (dialogue.quiz && selectedOption?.isCorrect) {
      points += 20;
    }
    if (dialogue.onPassPoints) {
      points += dialogue.onPassPoints;
    }
    setSelectedOption(null);
    setIsSubmitted(false);
    setChosenBranch(null);
    setActiveWordTip(null);
    onAdvance(points);
  };

  const handleBranchClick = (branch: { id: string; textEn: string; textTr: string; heroPoints: number }) => {
    soundManager.play('click');
    setChosenBranch(branch.id);
    if (onChoiceSelect) {
      onChoiceSelect(branch.heroPoints);
    }
  };

  const speakerChar = CHARACTERS[dialogue.speaker] || activeCharacter;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
      {/* CEFR Level & Hero Lesson Guide Accordion Header */}
      {lessonGuide && (
        <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl overflow-hidden shadow-lg">
          <button
            onClick={() => {
              soundManager.play('click');
              setShowLessonGuide(!showLessonGuide);
            }}
            className="w-full p-3.5 px-4 flex items-center justify-between text-left hover:bg-slate-800/80 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                  {cefrLevel || 'İngilizce Dersi'} · Kural & Formül Kartı
                </span>
                <span className="text-sm font-bold text-white">
                  {lessonGuide.ruleTitle}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <span className="hidden sm:inline">
                {showLessonGuide ? 'Notları Gizle' : 'Ders Notunu İncele'}
              </span>
              {showLessonGuide ? (
                <ChevronUp className="w-4 h-4 text-emerald-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-emerald-400" />
              )}
            </div>
          </button>

          {/* Expanded Lesson Guide Content */}
          {showLessonGuide && (
            <div className="p-4 md:p-5 border-t border-slate-800 bg-slate-950/70 space-y-4 animate-in fade-in duration-200">
              {/* Formula Card */}
              <div className="bg-emerald-950/40 border border-emerald-500/30 p-3.5 rounded-xl space-y-1">
                <span className="text-[11px] font-black text-emerald-300 uppercase tracking-wider block">
                  📌 GRAMER FORMÜLÜ (FORMULA):
                </span>
                <pre className="text-xs font-mono text-emerald-200 whitespace-pre-wrap leading-relaxed">
                  {lessonGuide.ruleFormula}
                </pre>
              </div>

              {/* Key Teaching Points */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-300 block">
                  Önemli Noktalar:
                </span>
                <ul className="space-y-1 text-xs text-slate-300">
                  {lessonGuide.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Pitfalls / Tuzak Hatalar */}
              <div className="bg-rose-950/30 border border-rose-500/30 p-3 rounded-xl text-xs space-y-1">
                <span className="font-bold text-rose-300 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Sık Yapılan Hata (Common Mistake):
                </span>
                <p className="text-rose-200">
                  ❌ <span className="line-through">{lessonGuide.commonMistake.wrong}</span>
                </p>
                <p className="text-emerald-300 font-semibold">
                  ✅ {lessonGuide.commonMistake.correct}
                </p>
                <p className="text-[11px] text-slate-400 italic">
                  💡 {lessonGuide.commonMistake.why}
                </p>
              </div>

              {/* Essential Vocabulary with Audio Pronunciation */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-300 block">
                  Dersin Anahtar Kelimeleri (Tıkla ve Dinle):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {lessonGuide.keyVocabulary.map((v, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSpeak(v.word)}
                      className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500 rounded-xl text-left transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-emerald-300">
                          {v.word}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {v.meaning}
                        </div>
                      </div>
                      <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Character Profile Ribbon */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 px-4">
        <div className="relative shrink-0">
          <div
            className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 shadow-2xl relative transition-transform duration-300 hover:scale-105"
            style={{ borderColor: speakerChar.color }}
          >
            <img
              src={speakerChar.avatar}
              alt={speakerChar.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-bold text-white shadow-lg whitespace-nowrap"
            style={{ backgroundColor: speakerChar.color }}
          >
            {speakerChar.quirkName}
          </div>
        </div>

        {/* Character Bio & Quirks banner */}
        <div className="flex-1 text-center md:text-left bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-700/60 shadow-xl">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
            <h3 className="text-xl font-extrabold text-white tracking-wide">
              {speakerChar.name}
            </h3>
            <span className="text-xs text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30">
              {speakerChar.role}
            </span>
          </div>
          <p className="text-xs text-slate-300 italic">
            "{speakerChar.quirkDesc}"
          </p>
        </div>
      </div>

      {/* Main Dialogue Box */}
      <div className="bg-slate-900/95 backdrop-blur-lg border-2 border-slate-700 rounded-2xl p-5 md:p-6 shadow-2xl relative space-y-4">
        {/* Speaker Tag & Audio controls */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full animate-ping"
              style={{ backgroundColor: speakerChar.color }}
            />
            <span className="font-bold text-sm tracking-wide text-slate-200">
              {speakerChar.heroName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Speed toggle: 1.0x or 0.75x */}
            <button
              onClick={toggleRate}
              className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded-lg border border-slate-700 cursor-pointer"
              title="Ses Hızını Değiştir (Normal / Yavaş)"
            >
              <Gauge className="w-3 h-3 text-amber-400" />
              <span>{speechRate === 0.95 ? '1.0x (Normal)' : '0.75x (Yavaş)'}</span>
            </button>

            <button
              onClick={() => handleSpeak(dialogue.audioPrompt || dialogue.textEn)}
              className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/50 px-3 py-1 rounded-lg transition-colors cursor-pointer"
              title="Cümlenin doğal İngilizce okunuşunu dinle"
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cümleyi Dinle</span>
            </button>
          </div>
        </div>

        {/* English Dialogue text with interactive clickable words */}
        <div className="space-y-2">
          <p className="text-lg md:text-xl font-semibold text-white leading-relaxed tracking-wide">
            {dialogue.textEn}
          </p>
          <p className="text-sm text-slate-400 italic">
            {dialogue.textTr}
          </p>
        </div>

        {/* Clickable Word Tips Ribbon (Duolingo style word hints) */}
        {dialogue.clickableWords && dialogue.clickableWords.length > 0 && (
          <div className="pt-2 border-t border-slate-800/80">
            <span className="text-[11px] font-bold text-slate-400 block mb-1.5">
              💡 Cümledeki Önemli Kelimeler (Anlam ve Telaffuz için tıkla):
            </span>
            <div className="flex flex-wrap gap-2">
              {dialogue.clickableWords.map((tip, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    handleSpeak(tip.word);
                    setActiveWordTip(tip);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-emerald-400 text-xs font-semibold text-emerald-300 transition-all cursor-pointer flex items-center gap-1.5 group"
                >
                  <span className="underline decoration-dotted decoration-emerald-500/60">
                    {tip.word}
                  </span>
                  <Volume2 className="w-3 h-3 text-slate-400 group-hover:text-emerald-400 shrink-0" />
                </button>
              ))}
            </div>

            {/* Active Word Tip Card */}
            {activeWordTip && (
              <div className="mt-2.5 p-3 rounded-xl bg-slate-950 border border-emerald-500/50 text-xs flex items-center justify-between animate-in fade-in duration-150">
                <div>
                  <span className="font-bold text-emerald-300 text-sm">
                    {activeWordTip.word}
                  </span>
                  <span className="text-slate-300 ml-2">
                    ➔ {activeWordTip.translation}
                  </span>
                  {activeWordTip.grammarTip && (
                    <span className="text-[11px] text-amber-400 ml-2 font-mono">
                      ({activeWordTip.grammarTip})
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setActiveWordTip(null)}
                  className="text-slate-500 hover:text-slate-300 text-xs px-2 cursor-pointer"
                >
                  Kapat ✕
                </button>
              </div>
            )}
          </div>
        )}

        {/* Dialogue branch choices */}
        {dialogue.options && dialogue.options.length > 0 && !chosenBranch && (
          <div className="mt-4 space-y-2">
            <p className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Kahraman Yanıtını Seç (Choose your response):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {dialogue.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleBranchClick(opt)}
                  className="p-3 text-left bg-slate-800/90 hover:bg-slate-700 border border-slate-600 hover:border-emerald-400 rounded-xl transition-all cursor-pointer group"
                >
                  <p className="text-sm font-semibold text-emerald-300 group-hover:text-emerald-200">
                    "{opt.textEn}"
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {opt.textTr}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected Branch feedback */}
        {chosenBranch && (
          <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-600/40 text-emerald-200">
            <p className="text-sm font-bold flex items-center gap-1.5 text-emerald-300">
              <Sparkles className="w-4 h-4" />
              {dialogue.options?.find((o) => o.id === chosenBranch)?.responseEn}
            </p>
            <p className="text-xs text-emerald-300/80 mt-1">
              {dialogue.options?.find((o) => o.id === chosenBranch)?.responseTr}
            </p>
          </div>
        )}

        {/* Quiz Section if present */}
        {dialogue.quiz && (
          <div className="mt-6 pt-5 border-t border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <h4 className="font-bold text-sm uppercase tracking-wide">
                Hero Quirk Exam / Kahramanlık Gramer Sınavı
              </h4>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
              <p className="text-base font-bold text-white mb-1">
                {dialogue.quiz.questionEn}
              </p>
              <p className="text-xs text-slate-400 mb-2">
                {dialogue.quiz.questionTr}
              </p>
              <div className="text-[11px] text-amber-300/90 bg-amber-950/40 px-2.5 py-1 rounded inline-block">
                💡 {dialogue.quiz.tipTr}
              </div>
            </div>

            {/* Quiz Options */}
            <div className="grid grid-cols-1 gap-2.5">
              {dialogue.quiz.options.map((opt) => {
                const isSelected = selectedOption?.id === opt.id;
                let btnStyle =
                  'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200';

                if (isSelected && !isSubmitted) {
                  btnStyle =
                    'bg-sky-950/80 border-sky-400 text-white shadow-lg ring-1 ring-sky-400';
                } else if (isSubmitted) {
                  if (opt.isCorrect) {
                    btnStyle =
                      'bg-emerald-950/90 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500';
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyle =
                      'bg-rose-950/90 border-rose-500 text-rose-100 ring-2 ring-rose-500';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleOptionClick(opt)}
                    disabled={isSubmitted}
                    className={`w-full p-3.5 text-left rounded-xl border transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <div>
                      <p className="text-sm font-semibold tracking-wide">
                        {opt.textEn}
                      </p>
                      <p className="text-xs opacity-75 mt-0.5">
                        {opt.textTr}
                      </p>
                    </div>

                    {isSubmitted && opt.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isSubmitted && isSelected && !opt.isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Action Buttons for Quiz */}
            {!isSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={!selectedOption}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm tracking-wide transition-all cursor-pointer ${
                  selectedOption
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 active:scale-[0.99]'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                Cevabı Onayla (Submit Hero Answer)
              </button>
            ) : (
              <div className="space-y-3">
                <div
                  className={`p-4 rounded-xl border text-sm ${
                    selectedOption?.isCorrect
                      ? 'bg-emerald-950/60 border-emerald-600 text-emerald-200'
                      : 'bg-rose-950/60 border-rose-600 text-rose-200'
                  }`}
                >
                  <p className="font-bold mb-1">
                    {selectedOption?.isCorrect ? '✅ DOĞRU! (EXCELLENT)' : '❌ YANLIŞ! (TRY TO REMEMBER)'}
                  </p>
                  <p className="text-xs leading-relaxed">
                    {selectedOption?.feedbackEn}
                  </p>
                  <p className="text-xs leading-relaxed opacity-80 mt-1">
                    {selectedOption?.feedbackTr}
                  </p>

                  {/* Detailed Linguistic Explanation */}
                  {dialogue.quiz.detailedExplanationTr && (
                    <div className="mt-3 pt-2.5 border-t border-slate-700/60 text-xs text-amber-200/95 leading-relaxed bg-slate-900/40 p-2.5 rounded-lg">
                      <strong className="text-amber-400">📖 Gramer Analizi:</strong>{' '}
                      {dialogue.quiz.detailedExplanationTr}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Advance Button */}
        {(!dialogue.quiz || isSubmitted) && (!dialogue.options || chosenBranch || dialogue.options.length === 0) && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleNextDialogue}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all transform active:scale-95 cursor-pointer"
            >
              <span>İlerle / Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
