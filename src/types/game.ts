export interface Character {
  id: string;
  name: string;
  heroName: string;
  role: string;
  quirkName: string;
  quirkDesc: string;
  avatar: string;
  color: string;
  bgGlow: string;
}

export interface QuizOption {
  id: string;
  textEn: string;
  textTr: string;
  isCorrect: boolean;
  feedbackEn: string;
  feedbackTr: string;
}

export interface ClickableWordTip {
  word: string;
  translation: string;
  grammarTip?: string;
}

export interface DialogueNode {
  id: string;
  speaker: 'player' | 'izumi' | 'katsuro' | 'almighty' | 'duovour' | 'narrator';
  textEn: string;
  textTr: string;
  emotion?: 'neutral' | 'happy' | 'excited' | 'serious' | 'angry' | 'smug';
  audioPrompt?: string;
  clickableWords?: ClickableWordTip[];
  quiz?: {
    questionEn: string;
    questionTr: string;
    options: QuizOption[];
    tipTr: string;
    detailedExplanationTr?: string;
  };
  options?: {
    id: string;
    textEn: string;
    textTr: string;
    heroPoints: number;
    nextId?: string;
    responseEn?: string;
    responseTr?: string;
  }[];
  onPassPoints?: number;
}

export interface LessonGuide {
  ruleTitle: string;
  ruleFormula: string;
  keyPoints: string[];
  commonMistake: {
    wrong: string;
    correct: string;
    why: string;
  };
  keyVocabulary: {
    word: string;
    meaning: string;
    phonetic?: string;
  }[];
}

export interface Chapter {
  id: number;
  titleEn: string;
  titleTr: string;
  characterId: string;
  topic: string;
  cefrLevel: string;
  descriptionTr: string;
  lessonGuide: LessonGuide;
  dialogues: DialogueNode[];
  requiredScore: number;
}

export interface Badge {
  id: string;
  titleEn: string;
  titleTr: string;
  descriptionTr: string;
  icon: string;
  color: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface BossQuestion {
  id: string;
  type: 'vocab' | 'idiom' | 'grammar' | 'ultimate';
  questionEn: string;
  questionTr: string;
  options: string[];
  correctIndex: number;
  explanationTr: string;
  damage: number;
  timeLimitSeconds?: number;
}

export interface VocabWord {
  id: string;
  word: string;
  meaningTr: string;
  type: string;
  exampleSentenceEn: string;
  exampleSentenceTr: string;
  category: string;
  cefrLevel?: string;
  phonetic?: string;
}
