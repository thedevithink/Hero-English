import React, { useState } from 'react';
import { Badge } from '../types/game';
import { soundManager } from '../utils/audio';
import { Award, ShieldCheck, Star, X, Check, Sparkles, User, Flame } from 'lucide-react';

interface HeroLicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerName: string;
  onUpdatePlayerName: (name: string) => void;
  badges: Badge[];
  heroScore: number;
  streakCount: number;
}

export const HeroLicenseModal: React.FC<HeroLicenseModalProps> = ({
  isOpen,
  onClose,
  playerName,
  onUpdatePlayerName,
  badges,
  heroScore,
  streakCount
}) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [editingName, setEditingName] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>(playerName);

  if (!isOpen) return null;

  const handleSaveName = () => {
    if (nameInput.trim()) {
      onUpdatePlayerName(nameInput.trim());
      setEditingName(false);
      soundManager.play('click');
    }
  };

  const unlockedCount = badges.filter((b) => b.isUnlocked).length;
  const isDuovourDefeated = badges.some((b) => b.id === 'duovour_slayer' && b.isUnlocked);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-slate-900 border-2 border-amber-400/80 rounded-3xl p-6 shadow-2xl text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            Official Hero Registry / Apex Linguistic Academy
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-hero text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
            HERO LICENSE & BADGE SHOWCASE
          </h2>
          <p className="text-xs text-slate-400">
            Resmi Kahramanlık Lisansı & Açılan İngilizce Ustalık Rozetleri
          </p>
        </div>

        {/* Holographic S-Rank Hero License Card */}
        <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 rounded-2xl border-2 border-amber-400/60 p-6 shadow-xl mb-8 overflow-hidden group">
          {/* Decorative Corner Seals */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-bl-full pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-emerald-500/10 rounded-tr-full pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            {/* Hero Photo / Avatar */}
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-lg bg-slate-800 shrink-0 relative">
              <img
                src="/src/assets/images/char_izumi_deku_1791482011634.jpg"
                alt="Hero Cadet"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 right-1 bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded shadow">
                {isDuovourDefeated ? 'S-RANK' : 'A-RANK'}
              </div>
            </div>

            {/* Hero Info */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                {editingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="bg-slate-800 border border-amber-400/80 rounded-lg px-3 py-1 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                      maxLength={20}
                    />
                    <button
                      onClick={handleSaveName}
                      className="p-1.5 bg-amber-500 text-slate-950 rounded-lg hover:bg-amber-400 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl md:text-2xl font-black text-amber-300">
                      {playerName}
                    </h3>
                    <button
                      onClick={() => setEditingName(true)}
                      className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      (İsmi Değiştir)
                    </button>
                  </div>
                )}
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {isDuovourDefeated ? 'PRO HERO (LİSANSLI)' : 'HERO CADET (ADAY)'}
                </span>
              </div>

              <p className="text-xs text-slate-300">
                <span className="font-semibold text-amber-400">Quirk:</span>{' '}
                One For Vocab & Fluency Burst (İngilizce Sözcük Gücü)
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>Streak: <strong className="text-white">{streakCount} Days</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Hero Fluency: <strong className="text-white">{heroScore} XP</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Rozetler: <strong className="text-white">{unlockedCount} / {badges.length}</strong></span>
                </div>
              </div>
            </div>

            {/* Official Seal Badge */}
            <div className="shrink-0 text-center p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <ShieldCheck className="w-8 h-8 text-amber-400 mx-auto mb-1" />
              <span className="text-[10px] font-black tracking-widest text-amber-300 uppercase block">
                SEAL OF FLUENCY
              </span>
              <span className="text-[9px] text-slate-400 block">APEX ACADEMY VERIFIED</span>
            </div>
          </div>
        </div>

        {/* Badges Grid Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Özel Rozet Koleksiyonu (Unlocked Badges)
            </h4>
            <span className="text-xs text-slate-400">
              Lord Duovour'ı yenerek tüm rozetleri topla!
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {badges.map((badge) => {
              const isSelected = selectedBadge?.id === badge.id;
              return (
                <button
                  key={badge.id}
                  onClick={() => {
                    soundManager.play('click');
                    setSelectedBadge(badge);
                  }}
                  className={`relative p-4 rounded-2xl border text-left transition-all cursor-pointer group ${
                    badge.isUnlocked
                      ? 'bg-slate-800/90 hover:bg-slate-750 border-amber-400/50 hover:border-amber-400 shadow-lg'
                      : 'bg-slate-900/50 border-slate-800 opacity-60 hover:opacity-80'
                  } ${isSelected ? 'ring-2 ring-amber-400' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 shadow-md ${
                        badge.isUnlocked
                          ? 'bg-gradient-to-br from-amber-400/20 to-emerald-500/20 border border-amber-400/40'
                          : 'bg-slate-800 border border-slate-700 text-slate-600'
                      }`}
                    >
                      {badge.isUnlocked ? badge.icon : '🔒'}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded ${
                            badge.rarity === 'Legendary'
                              ? 'text-amber-400 bg-amber-400/10'
                              : badge.rarity === 'Epic'
                              ? 'text-purple-400 bg-purple-400/10'
                              : 'text-sky-400 bg-sky-400/10'
                          }`}
                        >
                          {badge.rarity}
                        </span>
                        {badge.isUnlocked && (
                          <span className="text-[10px] text-emerald-400 font-bold">
                            KAZANILDI ✓
                          </span>
                        )}
                      </div>

                      <h5 className="font-bold text-sm text-white truncate mt-1">
                        {badge.titleTr}
                      </h5>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                        {badge.descriptionTr}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Badge Inspector */}
          {selectedBadge && (
            <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-amber-400/40 animate-in fade-in">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedBadge.icon}</span>
                <div>
                  <h5 className="font-extrabold text-amber-300 text-base">
                    {selectedBadge.titleEn} ({selectedBadge.titleTr})
                  </h5>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {selectedBadge.descriptionTr}
                  </p>
                  <p className="text-[11px] text-emerald-400 mt-1 font-semibold">
                    {selectedBadge.isUnlocked
                      ? '✨ Bu rozet başarıyla envanterinizde kilitli değil.'
                      : '🔒 Henüz açılmadı: Lord Duovour ve akademi görevlerini tamamlayın.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
