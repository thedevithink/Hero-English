import { Chapter } from '../types/game';

export const CHAPTERS_DATA: Chapter[] = [
  {
    id: 1,
    titleEn: 'Chapter 1: The Entrance Exam & Daily Routines',
    titleTr: 'Bölüm 1: Giriş Sınavı & Günlük Rutinler',
    characterId: 'izumi',
    topic: 'Present Simple Tense & Daily Routine Verbs',
    cefrLevel: 'A1 - Beginner (Giriş Seviyesi)',
    descriptionTr: 'İzumi Midori ("Lexi") ile tanışın. Kahramanlık akademisine kabul edilmek için temel selamlaşmaları ve geniş zamanı (Present Simple) ustaca kullanın!',
    requiredScore: 30,
    lessonGuide: {
      ruleTitle: 'Present Simple (Geniş Zaman) Kuralı',
      ruleFormula: 'Olumlu: Öznen (I/You/We/They) + V1 | (He/She/It) + V1(-s/-es) \nOlumsuz: Subject + do/does not + V1 \nSoru: Do/Does + Subject + V1?',
      keyPoints: [
        'Düzenli yapılan alışkanlıklar, antrenman rutinleri ve değişmeyen gerçekler için kullanılır.',
        'He, She, It ve tekil öznelerde fiilin sonuna "-s" veya "-es" takısı gelir (train -> trains, watch -> watches, study -> studies).',
        'I, You, We, They öznelerinde fiil hiçbir takı almaz ve yalın kalır (We train).',
        'Soru cümlelerinde "Do" veya "Does" başa gelir. Does gelince ana fiildeki "-s" takısı düşer!'
      ],
      commonMistake: {
        wrong: 'He train every morning. / He don\'t know.',
        correct: 'He trains every morning. / He doesn\'t know.',
        why: 'He/She/It tekil özneleri mutlaka fiile "-s" takısı veya olumsuzda "doesn\'t" gerektirir!'
      },
      keyVocabulary: [
        { word: 'Train', meaning: 'Antrenman yapmak', phonetic: '/treɪn/' },
        { word: 'Every day', meaning: 'Her gün (Zaman zarfı)', phonetic: '/ˈev.ri deɪ/' },
        { word: 'Always', meaning: 'Her zaman / Daima', phonetic: '/ˈɔːl.weɪz/' },
        { word: 'Protect', meaning: 'Korumak', phonetic: '/prəˈtekt/' },
        { word: 'Routine', meaning: 'Rutin / Alışkanlık', phonetic: '/ruːˈtiːn/' }
      ]
    },
    dialogues: [
      {
        id: 'c1_d1',
        speaker: 'izumi',
        textEn: "Hey there, new cadet! Welcome to the Apex Linguistic Academy! I am Izumi Midori, but you can call me Lexi. Are you ready to awaken your English Quirk?",
        textTr: "Selam yeni kadet! Apex Dil Akademisi'ne hoş geldin! Ben Izumi Midori, ama bana Lexi diyebilirsin. İngilizce Gücünü uyandırmaya hazır mısın?",
        emotion: 'excited',
        audioPrompt: "Hey there, new cadet! Welcome to the Apex Linguistic Academy!",
        clickableWords: [
          { word: 'cadet', translation: 'öğrenci / askeri öğrenci', grammarTip: 'İsim (Noun)' },
          { word: 'awaken', translation: 'uyandırmak / harekete geçirmek', grammarTip: 'Fiil (Verb)' },
          { word: 'ready', translation: 'hazır', grammarTip: 'Sıfat (Adjective)' }
        ],
        options: [
          {
            id: 'opt1_1',
            textEn: "Yes, I am completely ready! Let's do this!",
            textTr: "Evet, tamamen hazırım! Hadi yapalım!",
            heroPoints: 10,
            responseEn: "That's the hero spirit! Your energy is soaring!",
            responseTr: "İşte kahraman ruhu bu! Enerjin tavan yaptı!"
          },
          {
            id: 'opt1_2',
            textEn: "I'm a bit nervous, but I will do my best.",
            textTr: "Biraz gerginim ama elimden gelenin en iyisini yapacağım.",
            heroPoints: 10,
            responseEn: "Don't worry at all! Even Almighty Sensei started from the basics!",
            responseTr: "Hiç endişelenme! Almighty Sensei bile temelden başladı!"
          }
        ]
      },
      {
        id: 'c1_d2',
        speaker: 'izumi',
        textEn: "To become a true hero, we must describe our daily training routine in English. For habitual actions, we use the Present Simple tense. Remember: He/She/It takes an '-s' suffix at the end of the verb!",
        textTr: "Gerçek bir kahraman olmak için günlük antrenman rutinimizi İngilizce ifade edebilmeliyiz. Alışkanlıklar için Present Simple (Geniş Zaman) kullanırız. Unutma: He/She/It öznelerinde fiilin sonuna '-s' takısı gelir!",
        emotion: 'serious',
        clickableWords: [
          { word: 'habitual', translation: 'alışkanlık haline gelmiş', grammarTip: 'Sıfat' },
          { word: 'suffix', translation: 'son ek (örneğin -s takısı)', grammarTip: 'Dilbilgisi terimi' }
        ],
        quiz: {
          questionEn: "Complete the sentence: 'A true hero always ______ hard every morning.'",
          questionTr: "Cümleyi tamamlayın: 'A true hero always ______ hard every morning.' (Gerçek bir kahraman her sabah sıkı çalışır.)",
          options: [
            {
              id: 'q1_a',
              textEn: "trains",
              textTr: "trains (He/She/Hero tekil üçüncü şahıs)",
              isCorrect: true,
              feedbackEn: "Brilliant! 'A true hero' is singular (he/she), so we add '-s' to train -> 'trains'!",
              feedbackTr: "Harika! 'A true hero' tekil bir özne olduğu için fiil '-s' takısı alarak 'trains' olur!"
            },
            {
              id: 'q1_b',
              textEn: "training",
              textTr: "training (Şimdiki zaman -ing hali)",
              isCorrect: false,
              feedbackEn: "Not quite! '-ing' is for actions happening right now (Present Continuous).",
              feedbackTr: "Yaklaştın ama '-ing' şu anda gerçekleşen eylemler içindir (Present Continuous)."
            },
            {
              id: 'q1_c',
              textEn: "trained",
              textTr: "trained (Geçmiş zaman hali)",
              isCorrect: false,
              feedbackEn: "'Trained' is past tense! We are talking about daily habits.",
              feedbackTr: "'Trained' geçmiş zamandır. Burada 'every morning' olduğu için geniş zaman gerekir."
            }
          ],
          tipTr: "İpucu: 'Every morning' veya 'always' gibi sıklık zarfları geniş zamanı işaret eder.",
          detailedExplanationTr: "İngilizcede üçüncü tekil şahıs öznelerde (He/She/It/A hero/My friend) geniş zamanda fiilin sonuna -s takısı eklenir: train -> trains, run -> runs."
        }
      },
      {
        id: 'c1_d3',
        speaker: 'izumi',
        textEn: "Awesome work! Now let's test negative sentences and questions in Present Simple. When asking questions with 'You', which auxiliary verb do we summon?",
        textTr: "Süper gidiyorsun! Şimdi soru cümlelerine bakalım. 'You' (sen) öznesiyle soru sorarken hangi yardımcı fiili çağırırız?",
        emotion: 'happy',
        clickableWords: [
          { word: 'auxiliary verb', translation: 'yardımcı fiil (do/does/is/are)', grammarTip: 'Gramer terimi' },
          { word: 'summon', translation: 'çağırmak / davet etmek', grammarTip: 'Fiil' }
        ],
        quiz: {
          questionEn: "Choose the correct question: '______ you speak English every day?'",
          questionTr: "Doğru soruyu seçin: '______ you speak English every day?' (Her gün İngilizce konuşur musun?)",
          options: [
            {
              id: 'q2_a',
              textEn: "Do",
              textTr: "Do (Do you speak...?)",
              isCorrect: true,
              feedbackEn: "Spot on! 'Do' is used for I, You, We, They!",
              feedbackTr: "Tam isabet! I, You, We, They için soru 'Do' ile başlar!"
            },
            {
              id: 'q2_b',
              textEn: "Does",
              textTr: "Does (He/She/It için)",
              isCorrect: false,
              feedbackEn: "'Does' is only for He, She, or It!",
              feedbackTr: "'Does' sadece He, She ve It için kullanılır!"
            },
            {
              id: 'q2_c',
              textEn: "Are",
              textTr: "Are (Eğer eylem fiili yoksa durum cümlesi)",
              isCorrect: false,
              feedbackEn: "If there's an action verb like 'speak', we use 'Do', not 'Are'!",
              feedbackTr: "Cümlede 'speak' gibi eylem fiili varken 'Are you speak' denilemez, 'Do you speak' denir!"
            }
          ],
          tipTr: "İpucu: Eylem içeren geniş zaman sorularında I/You/We/They ile 'Do', He/She/It ile 'Does' kullanılır.",
          detailedExplanationTr: "Cümlede ana fiil (speak) olduğunda geniş zaman soru yardımcı fiili 'Do'dur: 'Do you speak English?'. Eğer fiil olmasaydı durum için 'Are you a hero?' denirdi."
        }
      },
      {
        id: 'c1_d4',
        speaker: 'izumi',
        textEn: "PLUS ULTRA! You scored points in my chapter. Your English core is stabilizing! Next, you must face my explosive rival, Katsuro Blast. Brace yourself!",
        textTr: "PLUS ULTRA! Bölümümdeki tüm puanları topladın. İngilizce temelin güçlendi! Sırada patlayıcı rakibim Katsuro Blast var. Kendini hazırla!",
        emotion: 'excited',
        onPassPoints: 20
      }
    ]
  },
  {
    id: 2,
    titleEn: 'Chapter 2: Explosion Grammar & Battle Idioms',
    titleTr: 'Bölüm 2: Patlayıcı Gramer & Savaş Deyimleri',
    characterId: 'katsuro',
    topic: 'Irregular Verbs (Past Tense) & Hero Battle Idioms',
    cefrLevel: 'A2 - Elementary (Temel Seviye)',
    descriptionTr: 'Katsuro Blast seninle kapışmak istiyor! Hızlı reflekslerle düzensiz geçmiş zaman fiillerini ve İngilizce deyimleri çözmezsen parmak uçlarından kıvılcımlar saçacak!',
    requiredScore: 30,
    lessonGuide: {
      ruleTitle: 'Irregular Verbs (Düzensiz Geçmiş Fiiller) & Deyimler',
      ruleFormula: 'Geçmiş Zaman: Subject + V2 (Irregular form) \nÖrnekler: Fight -> Fought | Catch -> Caught | Fly -> Flew | Teach -> Taught',
      keyPoints: [
        'Düzenli fiiller geçmişte "-ed" takısı alır (play -> played, train -> trained).',
        'DÜZENSİZ FİİLLER (Irregular Verbs) ise kurala uymaz; kelimenin kendisi kökten değişir.',
        'Soru veya olumsuzda "did" / "didn\'t" geldiğinde fiil tekrar 1. haline döner! (He fought -> Did he fight? He didn\'t fight).',
        'Deyimler (Idioms) harfi harfine çevrilmez; kültürde yerleşmiş mecazi anlamları vardır (Piece of cake = Çok kolay).'
      ],
      commonMistake: {
        wrong: 'Yesterday he fighted the villain. / It was a slice of cake.',
        correct: 'Yesterday he fought the villain. / It was a piece of cake.',
        why: 'Fight fiili düzensizdir (Fought), asla -ed almaz! Deyim ise kalıp olarak "piece of cake"tir.'
      },
      keyVocabulary: [
        { word: 'Fought', meaning: 'Dövüştü (Fight V2)', phonetic: '/fɔːt/' },
        { word: 'Caught', meaning: 'Yakaladı (Catch V2)', phonetic: '/kɔːt/' },
        { word: 'Piece of cake', meaning: 'Çocuk oyuncağı / Çok kolay', phonetic: '/piːs əv keɪk/' },
        { word: 'Break a leg', meaning: 'İyi şanslar / Başarılar', phonetic: '/breɪk ə leɡ/' },
        { word: 'Bite the bullet', meaning: 'Zorluğa dişini sıkıp katlanmak', phonetic: '/baɪt ðə ˈbʊl.ɪt/' }
      ]
    },
    dialogues: [
      {
        id: 'c2_d1',
        speaker: 'katsuro',
        textEn: "HEY! Who allowed a beginner like you into my combat training ring?! If your English vocabulary is weak, I'll BLAST YOU ACROSS THE FIELD!",
        textTr: "HEY! Senin gibi bir çaylağın antrenman halkama girmesine kim izin verdi?! Eğer İngilizce kelime dağarcığın zayıfsa, seni SAHANIN DIŞINA PATLATIRIM!",
        emotion: 'angry',
        audioPrompt: "Hey! Who allowed a beginner like you into my training ring?!",
        clickableWords: [
          { word: 'beginner', translation: 'başlangıç seviyesindeki kimse / acemi', grammarTip: 'İsim' },
          { word: 'blast', translation: 'patlatmak / havaya uçurmak', grammarTip: 'Fiil' }
        ],
        options: [
          {
            id: 'opt2_1',
            textEn: "Bring it on, Katsuro! My English Quirk won't lose to yours!",
            textTr: "Hodri meydan Katsuro! Benim İngilizce gücüm seninkine yenilmeyecek!",
            heroPoints: 10,
            responseEn: "HAH! Big talk! Let's see if your grammar can back that mouth up!",
            responseTr: "HAH! Büyük laflar! Bakalım gramerin o lafların altını doldurabilecek mi!"
          },
          {
            id: 'opt2_2',
            textEn: "I respect your power, but I'm here to master irregular verbs!",
            textTr: "Gücüne saygı duyuyorum ama buraya düzensiz fiilleri öğrenmeye geldim!",
            heroPoints: 10,
            responseEn: "Tch! At least you know what's important! Pay attention, rookie!",
            responseTr: "Tch! En azından neyin önemli olduğunu biliyorsun! Dikkatini topla çaylak!"
          }
        ]
      },
      {
        id: 'c2_d2',
        speaker: 'katsuro',
        textEn: "First trial: In a past battle, you can't just slap '-ed' on every verb like a slacker! Many verbs are IRREGULAR! Answer fast: What is the Past Simple form of 'FIGHT' and 'CATCH'?!",
        textTr: "İlk sınav: Geçmişteki bir savaşı anlatırken tembeller gibi her fiilin sonuna '-ed' yapıştıramazsın! Birçok fiil DÜZENSİZDİR! Hızlı cevap ver: 'FIGHT' (dövüşmek) ve 'CATCH' (yakalamak) fiillerinin 2. hali (Past Simple) nedir?!",
        emotion: 'serious',
        clickableWords: [
          { word: 'slacker', translation: 'tembel / kaytaran kimse', grammarTip: 'İsim' },
          { word: 'irregular', translation: 'düzensiz / kuraldışı', grammarTip: 'Sıfat' }
        ],
        quiz: {
          questionEn: "Yesterday, the hero ______ the villain and ______ the falling citizen.",
          questionTr: "Boşlukları doldurun: 'Dün kahraman kötü adamla dövüştü (fight) ve düşen vatandaşı yakaladı (catch).'",
          options: [
            {
              id: 'q3_a',
              textEn: "fought / caught",
              textTr: "fought / caught (Düzensiz geçmiş halleri)",
              isCorrect: true,
              feedbackEn: "BOOM! Correct! Fight -> Fought, Catch -> Caught! You actually know your stuff!",
              feedbackTr: "GÜÜÜM! Doğru! Fight -> Fought, Catch -> Caught! Gerçekten bu işi biliyorsun!"
            },
            {
              id: 'q3_b',
              textEn: "fighted / catched",
              textTr: "fighted / catched (Hatalı -ed ekleri)",
              isCorrect: false,
              feedbackEn: "WRONG! 'Fighted' and 'catched' don't exist! They are irregular verbs!",
              feedbackTr: "YANLIŞ! 'Fighted' veya 'catched' diye kelimeler yoktur! Düzensiz fiiller kural dışıdır!"
            },
            {
              id: 'q3_c',
              textEn: "fighting / catching",
              textTr: "fighting / catching (Şimdiki zaman halleri)",
              isCorrect: false,
              feedbackEn: "No! Those are continuous participles! I asked for Past Simple!",
              feedbackTr: "Hayır! Bunlar şimdiki zaman/ortaç halleridir! Ben geçmiş zamanı sordum!"
            }
          ],
          tipTr: "Düzensiz fiiller kurala uymaz: Fight -> Fought, Catch -> Caught, Teach -> Taught, Buy -> Bought.",
          detailedExplanationTr: "İngilizce geçmiş zamanda düzensiz fiiller ezberlenmelidir: Fight fiilinin 2. hali 'fought', Catch fiilinin 2. hali ise 'caught'tur. -ed almazlar."
        }
      },
      {
        id: 'c2_d3',
        speaker: 'katsuro',
        textEn: "Next trial: True heroes use battle IDIOMS! If someone tells you 'Break a leg!' before you go into the hero exam, what does it actually mean?!",
        textTr: "Sonraki sınav: Gerçek kahramanlar deyimleri (Idioms) bilir! Biri sana kahramanlık sınavından önce 'Break a leg!' derse, bu gerçekte ne anlama gelir?!",
        emotion: 'smug',
        clickableWords: [
          { word: 'idiom', translation: 'deyim / kalıplaşmış mecazi söz', grammarTip: 'İsim' },
          { word: 'literally', translation: 'harfi harfine / kelimenin tam anlamıyla', grammarTip: 'Zarf' }
        ],
        quiz: {
          questionEn: "What does the idiom 'Break a leg!' mean?",
          questionTr: "'Break a leg!' deyimi ne anlama gelir?",
          options: [
            {
              id: 'q4_a',
              textEn: "Good luck! (İyi şanslar / Başarılar)",
              textTr: "İyi şanslar! (Tiyatro ve sahne geleneğinden gelen şans dileği)",
              isCorrect: true,
              feedbackEn: "EXPLOSION! That's right! It means 'Good luck!' and NOT literally breaking your bones!",
              feedbackTr: "PATLAMA! Aynen öyle! Kemik kırmakla ilgisi yoktur, 'İyi şanslar!' demektir!"
            },
            {
              id: 'q4_b',
              textEn: "Literally break your leg in battle!",
              textTr: "Savaşta bacağını kır!",
              isCorrect: false,
              feedbackEn: "Are you insane?! Why would a hero wish a broken leg upon you?!",
              feedbackTr: "Deli misin?! Bir kahraman neden bacağının kırılmasını dilesin?!"
            },
            {
              id: 'q4_c',
              textEn: "Run away from the enemy!",
              textTr: "Düşmandan kaç!",
              isCorrect: false,
              feedbackEn: "Cowardly! No hero runs away!",
              feedbackTr: "Korkakça! Hiçbir kahraman kaçmaz!"
            }
          ],
          tipTr: "'Break a leg' deyimi batıl bir inançtan gelir: Kötü şans getirmesin diye tersi söylenir ama 'İyi şanslar' anlamına gelir.",
          detailedExplanationTr: "'Break a leg' deyimi İngiliz tiyatro kökenlidir. Sanatçılara 'İyi şanslar' demek kötü şans getirebilir inancıyla 'Bacağını kır' denir ama anlamı kesinlikle 'İyi şanslar!'dır."
        }
      },
      {
        id: 'c2_d4',
        speaker: 'katsuro',
        textEn: "And if a battle is super easy, what idiom do we scream? 'This exam is a ______ of cake!'",
        textTr: "Ve eğer bir savaş çocuk oyuncağı kadar kolaysa hangi deyimi bağırırız? 'This exam is a ______ of cake!'",
        emotion: 'excited',
        quiz: {
          questionEn: "Complete the idiom for something very easy: 'This exam is a ______ of cake!'",
          questionTr: "Çok kolay bir şeyi anlatan deyimi tamamlayın: 'This exam is a ______ of cake!'",
          options: [
            {
              id: 'q5_a',
              textEn: "piece",
              textTr: "piece (A piece of cake = Çocuk oyuncağı)",
              isCorrect: true,
              feedbackEn: "PERFECT! 'A piece of cake' means child's play or effortless!",
              feedbackTr: "KUSURSUZ! 'A piece of cake' (Bir dilim kek) çocuk oyuncağı/çok kolay demektir!"
            },
            {
              id: 'q5_b',
              textEn: "slice",
              textTr: "slice",
              isCorrect: false,
              feedbackEn: "Close, but the idiom is strictly 'piece of cake'!",
              feedbackTr: "Yakın ama deyimin kalıplaşmış hali 'piece of cake'tir!"
            },
            {
              id: 'q5_c',
              textEn: "bite",
              textTr: "bite",
              isCorrect: false,
              feedbackEn: "Bite is for 'Bite the bullet' (Zorluğa katlanmak)!",
              feedbackTr: "'Bite' başka bir deyimde geçer: 'Bite the bullet' (Acıya/zorluğa katlanmak)!"
            }
          ],
          tipTr: "A piece of cake = Çok kolay, tereyağından kıl çeker gibi.",
          detailedExplanationTr: "İngilizcede 'A piece of cake' ve 'As easy as pie' ifadeleri hiçbir çaba gerektirmeyen, çocuk oyuncağı işler için kullanılan kalıplaşmış deyimlerdir."
        }
      },
      {
        id: 'c2_d5',
        speaker: 'katsuro',
        textEn: "Grrr! You actually survived my Explosion Grammar drill! You've got guts, rookie. Now go see Almighty Sensei... he is waiting at the central stadium!",
        textTr: "Grrr! Patlayıcı Gramer antrenmanımdan sağ çıktın ha! Cesaretin var çaylak. Şimdi git Almighty Sensei'yi gör... seni merkez stadyumda bekliyor!",
        emotion: 'smug',
        onPassPoints: 25
      }
    ]
  },
  {
    id: 3,
    titleEn: 'Chapter 3: The Symbol of Fluency & Master Prepositions',
    titleTr: 'Bölüm 3: Akıcılık Sembolü & Edatların Efendisi',
    characterId: 'almighty',
    topic: 'Prepositions of Time/Place & Present Perfect Mastery',
    cefrLevel: 'B1 - Intermediate (Orta Seviye)',
    descriptionTr: 'Efsanevi 1 Numaralı Kahraman Almighty Sensei seni karşılıyor! "I AM HERE!" diyerek en zorlu İngilizce edatları ve Present Perfect Tense sırlarını sana aktaracak!',
    requiredScore: 35,
    lessonGuide: {
      ruleTitle: 'Edatlar (In, On, At) & Present Perfect Tense',
      ruleFormula: 'Zaman Edatları: AT (Saatler) | ON (Günler/Tarihler) | IN (Aylar/Yıllar/Mevsimler)\nPresent Perfect: Subject + have/has + V3 (Past Participle)',
      keyPoints: [
        'AT: En dar zaman dilimleri için (at 3 o\'clock, at night, at noon).',
        'ON: Günler ve tarihler için (on Monday, on July 15th, on my birthday).',
        'IN: En geniş zaman dilimleri için (in June, in 2026, in the morning, in winter).',
        'PRESENT PERFECT TENSE: Geçmişte olmuş ama zamanı belirtilmemiş ya da etkisi şimdiki ana yansıyan deneyimler için kullanılır: "I have saved many lives" (Şimdiye kadar pek çok hayat kurtardım).'
      ],
      commonMistake: {
        wrong: 'at Monday / in 8 o\'clock / I have saw him yesterday.',
        correct: 'on Monday / at 8 o\'clock / I have seen him. (Yesterday ile Simple Past kullanılır: I saw him yesterday).',
        why: 'Günler daima "on", saatler daima "at" alır! Dün gibi net geçmiş zaman kelimelerinde Present Perfect değil, Simple Past kullanılır.'
      },
      keyVocabulary: [
        { word: 'Preposition', meaning: 'Edat (in, on, at, under vb.)', phonetic: '/ˌprep.əˈzɪʃ.ən/' },
        { word: 'Experience', meaning: 'Deneyim / Tecrübe', phonetic: '/ɪkˈspɪə.ri.əns/' },
        { word: 'So far', meaning: 'Şimdiye kadar', phonetic: '/soʊ fɑːr/' },
        { word: 'Participate', meaning: 'Katılmak', phonetic: '/pɑːˈtɪs.ɪ.peɪt/' },
        { word: 'Saved', meaning: 'Kurtardı (Save V3)', phonetic: '/seɪvd/' }
      ]
    },
    dialogues: [
      {
        id: 'c3_d1',
        speaker: 'almighty',
        textEn: "HAHAHAHA! HAVE NO FEAR, YOUNG CADET! WHY? BECAUSE I AM HERE! I have watched your progress with great pride. Are your vocal cords ready for supreme hero fluency?",
        textTr: "HAHAHAHA! KORKMAYA HİÇ GEREK YOK GENÇ KADET! NEDEN Mİ? ÇÜNKÜ BEN BURADAYIM! Gelişimini büyük bir gururla izledim. Ses tellerin yüce kahramanlık akıcılığına hazır mı?",
        emotion: 'excited',
        audioPrompt: "Hahaha! Have no fear, young cadet! Because I am here!",
        clickableWords: [
          { word: 'pride', translation: 'gurur / onur', grammarTip: 'İsim' },
          { word: 'fluency', translation: 'akıcılık (özellikle dilde)', grammarTip: 'İsim' }
        ],
        options: [
          {
            id: 'opt3_1',
            textEn: "Almighty Sensei! It is an honor! Teach me the ultimate English grammar!",
            textTr: "Almighty Sensei! Bu büyük bir onur! Bana nihai İngilizce gramerini öğretin!",
            heroPoints: 10,
            responseEn: "A magnificent answer! Passion is the source of all linguistic Quirks!",
            responseTr: "Görkemli bir cevap! Tutku, tüm dilsel güçlerin kaynağıdır!"
          },
          {
            id: 'opt3_2',
            textEn: "I will master every tense and preposition to protect the world!",
            textTr: "Dünyayı korumak için her zamanı ve edatı fethedeceğim!",
            heroPoints: 10,
            responseEn: "Spoken like a true S-Rank hero candidate! Let us begin!",
            responseTr: "Tam bir S-Rank kahraman adayına yakışır sözler! Başlayalım!"
          }
        ]
      },
      {
        id: 'c3_d2',
        speaker: 'almighty',
        textEn: "Many students stumble on the holy trinity of prepositions: IN, ON, and AT! For specific times and clock hours, which preposition reigns supreme?",
        textTr: "Birçok öğrenci edatların kutsal üçlüsünde tökezler: IN, ON ve AT! Saatler ve kesin zaman noktaları için hangi edat hüküm sürer?",
        emotion: 'happy',
        clickableWords: [
          { word: 'stumble', translation: 'tökezlemek / hata yapmak', grammarTip: 'Fiil' },
          { word: 'reign', translation: 'hüküm sürmek', grammarTip: 'Fiil' }
        ],
        quiz: {
          questionEn: "Fill in the blank: 'Our hero mission starts exactly ______ 8:00 AM ______ Monday.'",
          questionTr: "Boşlukları doldurun: 'Kahramanlık görevimiz tam saat 8:00'de (saat) ve Pazartesi günü (gün) başlıyor.'",
          options: [
            {
              id: 'q6_a',
              textEn: "at / on",
              textTr: "at 8:00 AM / on Monday",
              isCorrect: true,
              feedbackEn: "GOLDEN PRECISION! 'At' for exact times (at 8:00 AM) and 'On' for specific days (on Monday)!",
              feedbackTr: "ALTIN GİBİ KUSURSUZ! Saatler için 'At' (at 8:00 AM), belirli günler için 'On' (on Monday) kullanılır!"
            },
            {
              id: 'q6_b',
              textEn: "in / at",
              textTr: "in 8:00 AM / at Monday",
              isCorrect: false,
              feedbackEn: "Watch out! 'In' is for months/years, and 'At' is never used for days!",
              feedbackTr: "Dikkat! 'In' aylar ve yıllar içindir, günler için 'At' kullanılmaz!"
            },
            {
              id: 'q6_c',
              textEn: "on / in",
              textTr: "on 8:00 AM / in Monday",
              isCorrect: false,
              feedbackEn: "Reversed! Hours take 'at' and days take 'on'!",
              feedbackTr: "Ters oldu! Saatler 'at', günler 'on' alır!"
            }
          ],
          tipTr: "Kural: AT saatler için (at 3 PM), ON günler ve tarihler için (on Friday), IN aylar ve yıllar için (in July, in 2026).",
          detailedExplanationTr: "Zaman piramidinde en dar nokta olan saatler 'AT' (at 8:00 AM), tek bir günü belirten günler 'ON' (on Monday), aylar ve yıllar ise 'IN' (in May) edatıyla kullanılır."
        }
      },
      {
        id: 'c3_d3',
        speaker: 'almighty',
        textEn: "Now, the pinnacle of hero experience: THE PRESENT PERFECT TENSE! When we talk about life experiences that connect the past to this very moment, we combine HAVE/HAS with the PAST PARTICIPLE (V3)!",
        textTr: "Şimdi kahramanlık tecrübesinin zirvesi: PRESENT PERFECT TENSE! Geçmişte yaşanmış ama etkisi şu an süren hayat deneyimlerini anlatırken HAVE/HAS ve fiilin 3. halini (V3) birleştiririz!",
        emotion: 'serious',
        clickableWords: [
          { word: 'pinnacle', translation: 'doruk noktası / zirve', grammarTip: 'İsim' },
          { word: 'past participle', translation: 'fiilin 3. hali (V3)', grammarTip: 'Gramer terimi' }
        ],
        quiz: {
          questionEn: "Which sentence correctly demonstrates heroic life experience?",
          questionTr: "Hangi cümle kahramanlık deneyimini Present Perfect ile doğru şekilde ifade eder?",
          options: [
            {
              id: 'q7_a',
              textEn: "I have saved hundreds of innocent people so far.",
              textTr: "I have saved hundreds of innocent people so far. (Şimdiye dek yüzlerce masumu kurtardım.)",
              isCorrect: true,
              feedbackEn: "MAGNIFICENT! 'have + saved (V3)' with 'so far' is the epitome of Present Perfect!",
              feedbackTr: "GÖRKEMLİ! 'have + saved' ve 'so far' kalıbı Present Perfect'in en kusursuz örneğidir!"
            },
            {
              id: 'q7_b',
              textEn: "I am saving hundreds of innocent people yesterday.",
              textTr: "I am saving hundreds of innocent people yesterday.",
              isCorrect: false,
              feedbackEn: "'Yesterday' cannot be used with continuous 'am saving'!",
              feedbackTr: "'Yesterday' geçmiş zamandır, 'am saving' şimdiki zamanla çelişir!"
            },
            {
              id: 'q7_c',
              textEn: "I has saved hundreds of innocent people.",
              textTr: "I has saved hundreds of innocent people.",
              isCorrect: false,
              feedbackEn: "'I' takes 'have', never 'has'!",
              feedbackTr: "'I' öznesi 'has' değil, 'have' alır!"
            }
          ],
          tipTr: "I / You / We / They + have + V3 | He / She / It + has + V3.",
          detailedExplanationTr: "Present Perfect yapısında I, You, We, They ile 'have', He, She, It ile 'has' kullanılır. Ardından fiilin 3. hali (V3) gelir: have saved, have seen, has done."
        }
      },
      {
        id: 'c3_d4',
        speaker: 'almighty',
        textEn: "Listen closely... A grave danger approaches. The rogue villain, LORD DUOVOUR, the Green-Feathered Streak Tyrant, has breached our perimeter!",
        textTr: "Beni iyi dinle... Büyük bir tehlike yaklaşıyor. Firari düşman LORD DUOVOUR, nam-ı diğer Yeşil Tüylü Seri Tiranı, savunma hattımızı deldi!",
        emotion: 'angry',
        onPassPoints: 30
      }
    ]
  },
  {
    id: 4,
    titleEn: 'Chapter 4: The Crisis & Final Preparations',
    titleTr: 'Bölüm 4: Kriz & Son Hazırlıklar',
    characterId: 'izumi',
    topic: 'Emergency Situational English & Battle Readiness',
    cefrLevel: 'B1+ - Upper Intermediate (İleri Seviye)',
    descriptionTr: 'Lord Duovour akademiye saldırıyor! Şehri korumak ve halkı tahliye etmek için acil durum diyaloglarını tamamlayın ve Büyük Boss Arenası kapısını açın!',
    requiredScore: 30,
    lessonGuide: {
      ruleTitle: 'Modal Verbs (Must, Should, Can) & Acil Durum İngilizcesi',
      ruleFormula: 'Modal Kalıbı: Subject + Modal (Must/Should/Can) + V1 (Yalın Fiil)\nÖrnekler: We must evacuate | You should stay calm | They can help',
      keyPoints: [
        'MUST: Kesin zorunluluk, hayati kurallar ve emirler ("We must act now").',
        'SHOULD: Tavsiye, öneri ve doğru olanı belirtmek ("You should drink water").',
        'CAN: Yetenek, güç ve izin ("I can speak English").',
        'KRİTİK KURAL: Modal fiillerden sonra gelen fiil ASLA "-s", "-ed", "-ing" veya "to" almaz! (We must go, asla "We must to go" denmez).'
      ],
      commonMistake: {
        wrong: 'We must to defeat him. / He must goes.',
        correct: 'We must defeat him. / He must go.',
        why: 'Modal fiillerden (must, can, should) hemen sonra fiilin 1. yalın hali gelir; araya "to" girmez, fiil "-s" almaz!'
      },
      keyVocabulary: [
        { word: 'Must', meaning: '-meli / -malı (Kesin zorunluluk)', phonetic: '/mʌst/' },
        { word: 'Evacuate', meaning: 'Tahliye etmek / Boşaltmak', phonetic: '/ɪˈvæk.ju.eɪt/' },
        { word: 'Emergency', meaning: 'Acil durum', phonetic: '/ɪˈmɜː.dʒən.si/' },
        { word: 'Shelter', meaning: 'Sığınak / Korunaklı yer', phonetic: '/ˈʃel.tər/' },
        { word: 'Proceed toward', meaning: '...e doğru ilerlemek', phonetic: '/prəˈsiːd təˈwɔːdz/' }
      ]
    },
    dialogues: [
      {
        id: 'c4_d1',
        speaker: 'izumi',
        textEn: "Cadet, it's terrible! Lord Duovour has unleashed his 'Streak Guilt Wave'! Civilians are panicked. We need to coordinate the evacuation in English right now!",
        textTr: "Kadet, durum çok fena! Lord Duovour 'Seri Vicdan Azabı Dalgası'nı serbest bıraktı! Siviller panik içinde. Hemen İngilizce olarak tahliyeyi koordine etmeliyiz!",
        emotion: 'angry',
        audioPrompt: "Lord Duovour has unleashed his Streak Guilt Wave! Coordinate the evacuation now!",
        clickableWords: [
          { word: 'unleash', translation: 'serbest bırakmak / salmak', grammarTip: 'Fiil' },
          { word: 'coordinate', translation: 'koordine etmek / düzenlemek', grammarTip: 'Fiil' },
          { word: 'evacuation', translation: 'tahliye / boşaltma', grammarTip: 'İsim' }
        ],
        quiz: {
          questionEn: "How do you urgently direct citizens to safety in English?",
          questionTr: "Vatandaşları İngilizce olarak acilen güvenli alana nasıl yönlendirirsiniz?",
          options: [
            {
              id: 'q8_a',
              textEn: "Please stay calm and proceed toward the emergency shelter immediately!",
              textTr: "Lütfen sakin kalın ve derhal acil durum sığınağına doğru ilerleyin!",
              isCorrect: true,
              feedbackEn: "Heroic instruction! Clear, authoritative, and polite!",
              feedbackTr: "Kahramanca bir yönlendirme! Net, otoriter ve nazik!"
            },
            {
              id: 'q8_b',
              textEn: "You must run without thinking anywhere!",
              textTr: "Hiç düşünmeden herhangi bir yere koşmalısınız!",
              isCorrect: false,
              feedbackEn: "That causes panic! A hero keeps people orderly!",
              feedbackTr: "Bu panik yaratır! Bir kahraman insanları düzenli yönlendirir!"
            },
            {
              id: 'q8_c',
              textEn: "Go sleep now, nothing is happening.",
              textTr: "Şimdi uyumaya gidin, hiçbir şey olmuyor.",
              isCorrect: false,
              feedbackEn: "Never lie during a villain attack!",
              feedbackTr: "Bir süper kötü saldırırken asla gerçeği gizleme!"
            }
          ],
          tipTr: "'Proceed toward' = Doğru ilerlemek, 'emergency shelter' = acil durum sığınağı.",
          detailedExplanationTr: "Resmi ve güvenli tahliye yönergelerinde emir kipinde kibarca 'Please stay calm' (Lütfen sakin kalın) ve 'proceed toward' (doğru intikal edin) kalıpları kullanılır."
        }
      },
      {
        id: 'c4_d2',
        speaker: 'katsuro',
        textEn: "THAT GREEN FEATHERED MONSTER THREATENS TO DELETE OUR ENGLISH VOCABULARY! I already hit him with a blast, but he shielded himself! Take this battle command, cadet!",
        textTr: "O YEŞİL TÜYLÜ CANAVAR TÜM İNGİLİZCE KELİMELERİMİZİ SİLMEKLE TEHDİT EDİYOR! Ona bir patlama fırlattım ama kalkanla korundu! Şu savaş emrini al kadet!",
        emotion: 'excited',
        clickableWords: [
          { word: 'threaten', translation: 'tehdit etmek', grammarTip: 'Fiil' },
          { word: 'command', translation: 'emir / komut', grammarTip: 'İsim' }
        ],
        quiz: {
          questionEn: "Which modal verb expresses strong obligation: 'We ______ defeat Lord Duovour before midnight!'",
          questionTr: "Güçlü bir zorunluluğu ifade eden modal fiil hangisidir? 'Gece yarısından önce Lord Duovour'ı yenmeliyiz!'",
          options: [
            {
              id: 'q9_a',
              textEn: "must",
              textTr: "must (Kesin zorunluluk / Şart)",
              isCorrect: true,
              feedbackEn: "EXACTLY! 'Must' expresses absolute hero obligation and urgency!",
              feedbackTr: "KESİNLİKLE! 'Must' mutlak kahramanlık zorunluluğunu ve aciliyeti ifade eder!"
            },
            {
              id: 'q9_b',
              textEn: "might",
              textTr: "might (Belki / Düşük ihtimal)",
              isCorrect: false,
              feedbackEn: "'Might' is weak probability! There is no 'maybe' in saving the world!",
              feedbackTr: "'Might' zayıf bir olasılıktır! Dünyayı kurtarırken 'belki' diye bir şey olmaz!"
            },
            {
              id: 'q9_c',
              textEn: "could have",
              textTr: "could have (Geçmişte olabilirdi)",
              isCorrect: false,
              feedbackEn: "'Could have' is past conditional. We are facing him right now!",
              feedbackTr: "'Could have' geçmişe dairdir. Şu anda yüzleşiyoruz!"
            }
          ],
          tipTr: "'Must' kesin gereklilik ve görev bildirir: We must protect the innocent.",
          detailedExplanationTr: "'Must', kural veya acil durumlarda kesin yapılması gereken eylemler içindir. 'Should' tavsiye, 'Might' ise düşük olasılık bildirir."
        }
      },
      {
        id: 'c4_d3',
        speaker: 'almighty',
        textEn: "THE GATES OF THE 3D COLISEUM ARE NOW OPEN! Lord Duovour awaits you in the skies above. Show him the true might of your English Quirk! GO BEYOND... PLUS ULTRA!",
        textTr: "3D SAVAŞ ARENASININ KAPILARI ARTIK AÇILDI! Lord Duovour gökyüzünde seni bekliyor. Ona İngilizce Gücünün gerçek kudretini göster! SINIRLARI AŞ... PLUS ULTRA!",
        emotion: 'excited',
        onPassPoints: 30
      }
    ]
  }
];
