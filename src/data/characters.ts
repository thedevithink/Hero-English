import { Character } from '../types/game';

export const CAMPUS_BACKGROUND = '/src/assets/images/hero_academy_campus_1791481137868.jpg';

export const CHARACTERS: Record<string, Character> = {
  izumi: {
    id: 'izumi',
    name: 'Izumi "Lexi" Midori',
    heroName: 'Lexi Green (Deku Homage)',
    role: '1-A Sınıfı Kadet - Kahraman Öğrenci',
    quirkName: 'One For Vocab (Sözcük Mirası)',
    quirkDesc: 'Zihnindeki İngilizce kelime dağarcığını saf kinetik enerjiye ve kahramanlık iradesine dönüştürür!',
    avatar: '/src/assets/images/char_izumi_deku_1791482011634.jpg',
    color: '#10b981', // emerald
    bgGlow: 'rgba(16, 185, 129, 0.4)'
  },
  katsuro: {
    id: 'katsuro',
    name: 'Katsuro Blast',
    heroName: 'Lord Explosion Idiom (Bakugo Homage)',
    role: '1-A Sınıfı Rakip - Öfkeli Deha',
    quirkName: 'Explosion Grammar (Patlayıcı Gramer)',
    quirkDesc: 'Doğru kullanılan düzensiz fiiller ve İngilizce deyimler ile parmak uçlarından şok dalgaları patlatır!',
    avatar: '/src/assets/images/char_katsuro_bakugo_1791482024283.jpg',
    color: '#f97316', // orange
    bgGlow: 'rgba(249, 115, 22, 0.4)'
  },
  almighty: {
    id: 'almighty',
    name: 'Almighty Sensei',
    heroName: 'Symbol of Fluency (All Might Homage)',
    role: 'Başöğretmen & Efsanevi 1 Numaralı Kahraman',
    quirkName: 'Ultra Fluency (Kusursuz Akıcılık)',
    quirkDesc: 'İngilizce zamanları (Tenses) ve modal fiilleri o kadar kusursuz konuşur ki, sesi kötülüğü dize getirir!',
    avatar: '/src/assets/images/char_almighty_hero_1791482035175.jpg',
    color: '#eab308', // amber/gold
    bgGlow: 'rgba(234, 179, 8, 0.4)'
  },
  duovour: {
    id: 'duovour',
    name: 'Lord Duovour (Hoo-Lingus)',
    heroName: 'The Streak Tyrant (Duolingo Owl Homage)',
    role: 'Baş Düşman - Gece Bildirimleri Lordu',
    quirkName: 'Guilt Notification (Vicdan Azabı Kuşu)',
    quirkDesc: '5 dakika İngilizce çalışmayan öğrencilere gece yarısı yüzlerce bildirim ve gramer zinciri fırlatır!',
    avatar: '/src/assets/images/boss_duovour_owl_1791482046037.jpg',
    color: '#22c55e', // green villain
    bgGlow: 'rgba(34, 197, 94, 0.5)'
  }
};
