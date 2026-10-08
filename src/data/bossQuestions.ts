import { BossQuestion } from '../types/game';

export const BOSS_QUESTIONS: BossQuestion[] = [
  {
    id: 'bq1',
    type: 'vocab',
    questionEn: "Lord Duovour roars: 'A hero cannot be COWARDLY! What is the exact ANTONYM (opposite) of COWARDLY?!'",
    questionTr: "Lord Duovour kükrüyor: 'Bir kahraman ASLA korkak olamaz! COWARDLY (korkak) kelimesinin tam ZIT ANLAMLISI nedir?!'",
    options: ['Brave (Cesur)', 'Fearful (Korkak)', 'Timid (Çekingen)', 'Cautious (Temkinli)'],
    correctIndex: 0,
    explanationTr: "'Cowardly' korkak demektir; zıt anlamlısı 'Brave' (cesur/yürekli) veya 'Courageous'tır!",
    damage: 25
  },
  {
    id: 'bq2',
    type: 'idiom',
    questionEn: "Lord Duovour casts 'Streak Panic': 'You must face the music! What does the idiom FACE THE MUSIC mean?!'",
    questionTr: "Lord Duovour 'Seri Paniği' büyüsü yapıyor: 'FACE THE MUSIC ne demektir?! Cevap ver!'",
    options: [
      'Accept the unpleasant consequences of your actions (Sonuçlarına katlanmak / Hatayla yüzleşmek)',
      'Listen to rock music before fighting (Savaştan önce müzik dinlemek)',
      'Sing a song to distract the villain (Kötü adamı şarkıyla oyalamak)',
      'Buy tickets to a hero concert (Kahraman konserine bilet almak)'
    ],
    correctIndex: 0,
    explanationTr: "'Face the music' İngilizcede 'yaptığı hatanın ya da davranışın cezasını/sonuçlarını kabullenmek' anlamına gelen çok yaygın bir deyimdir!",
    damage: 25
  },
  {
    id: 'bq3',
    type: 'grammar',
    questionEn: "Lord Duovour summons 'Tense Cage': 'Correct this flawed phrase: By the time the villain arrived, the hero ______!'",
    questionTr: "Lord Duovour 'Zaman Kafesi' büyüsü yapıyor: 'Kötü adam vardığında kahraman çoktan kaçmıştı/kurtarmıştı! Hangi geçmiş zaman yapısı gerekir?'",
    options: [
      'had already rescued the victims (Past Perfect - Geçmişin geçmişi)',
      'has already rescuing the victims (Hatalı present)',
      'will have rescue the victims (Gelecek zaman)',
      'did rescued the victims (Çift geçmiş zaman hatası)'
    ],
    correctIndex: 0,
    explanationTr: "Geçmişte başka bir olaydan (arrived) daha önce tamamlanan olay için Past Perfect kullanılır: 'had + V3' (had already rescued)!",
    damage: 25
  },
  {
    id: 'bq4',
    type: 'vocab',
    questionEn: "Lord Duovour unleashes 'Notification Swarm': 'Which word means PERSISTENT and never giving up despite failures?'",
    questionTr: "Lord Duovour 'Bildirim Sürüsü' fırlatıyor: 'Tüm engellere ve başarısızlıklara rağmen asla vazgeçmeyen, AZİMLİ anlamına gelen kelime hangisidir?'",
    options: ['Tenacious (Azimli / Kararlı)', 'Careless (Dikkatsiz)', 'Lazy (Tembel)', 'Fragile (Kırılgan)'],
    correctIndex: 0,
    explanationTr: "'Tenacious' ya da 'Resilient', engeller karşısında yılmayan azimli ve kararlı kişileri tanımlayan en üst seviye kahraman kelimesidir!",
    damage: 25
  },
  {
    id: 'bq5',
    type: 'ultimate',
    questionEn: "FINAL PLUS ULTRA COUNTER: Assemble the ultimate motto of the Hero Academy!",
    questionTr: "NİHAİ PLUS ULTRA SALDIRISI: Kahramanlık Akademisi'nin nihai mottosunu doğru İngilizce ile tamamlayın!",
    options: [
      'Go beyond your limits with unstoppable courage! (Durdurulamaz cesaretle sınırlarını aş!)',
      'Give up easily when homework is too long. (Ödev uzun gelince kolayca pes et.)',
      'Wait for tomorrow to learn new words. (Yeni kelimeler öğrenmek için yarını bekle.)',
      'Never speak English to anyone. (Asla kimseyle İngilizce konuşma.)'
    ],
    correctIndex: 0,
    explanationTr: "'Go beyond your limits with unstoppable courage!' Gerçek kahramanların mottosudur: Sınırlarını aş, PLUS ULTRA!",
    damage: 35
  }
];
