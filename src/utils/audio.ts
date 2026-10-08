/**
 * Web Audio API synthesizer for retro-modern anime sound effects
 * No external audio files needed; 100% reliable in hermetic browser environments.
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private speechRate: number = 0.95;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public play(sfx: 'correct' | 'wrong' | 'hit' | 'punch' | 'plus_ultra' | 'victory' | 'boss_roar' | 'click') {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      switch (sfx) {
        case 'correct': {
          const osc1 = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc1.type = 'triangle';
          osc2.type = 'sine';

          osc1.frequency.setValueAtTime(523.25, now); // C5
          osc1.frequency.setValueAtTime(659.25, now + 0.1); // E5
          osc1.frequency.setValueAtTime(783.99, now + 0.2); // G5
          osc1.frequency.setValueAtTime(1046.50, now + 0.3); // C6

          osc2.frequency.setValueAtTime(1046.50, now + 0.3);

          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(this.ctx.destination);

          osc1.start(now);
          osc2.start(now + 0.2);
          osc1.stop(now + 0.55);
          osc2.stop(now + 0.55);
          break;
        }

        case 'wrong': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';

          osc.frequency.setValueAtTime(180, now);
          osc.frequency.linearRampToValueAtTime(110, now + 0.25);

          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.3);
          break;
        }

        case 'punch':
        case 'hit': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';

          osc.frequency.setValueAtTime(320, now);
          osc.frequency.exponentialRampToValueAtTime(45, now + 0.2);

          gain.gain.setValueAtTime(0.3, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.22);
          break;
        }

        case 'plus_ultra': {
          // Powerful anime beam / chord sound
          const freqs = [330, 440, 554, 659, 880];
          freqs.forEach((freq, idx) => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq * 0.8, now);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.5);

            gain.gain.setValueAtTime(0.08 / freqs.length, now);
            gain.gain.linearRampToValueAtTime(0.2 / freqs.length, now + 0.3);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8 + idx * 0.1);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.9);
          });
          break;
        }

        case 'victory': {
          const melody = [
            { f: 523.25, d: 0.12 }, // C
            { f: 659.25, d: 0.12 }, // E
            { f: 783.99, d: 0.12 }, // G
            { f: 1046.5, d: 0.35 }, // High C
            { f: 880.0, d: 0.15 }, // A
            { f: 1046.5, d: 0.6 } // High C hold
          ];
          let time = now;
          melody.forEach(note => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(note.f, time);

            gain.gain.setValueAtTime(0.2, time);
            gain.gain.exponentialRampToValueAtTime(0.005, time + note.d);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(time);
            osc.stop(time + note.d);
            time += note.d;
          });
          break;
        }

        case 'boss_roar': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(140, now);
          osc.frequency.linearRampToValueAtTime(75, now + 0.4);

          gain.gain.setValueAtTime(0.35, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.5);
          break;
        }

        case 'click': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(700, now);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.05);
          break;
        }
      }
    } catch {
      // Ignore audio context interruptions
    }
  }

  public speak(text: string, rate?: number) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = rate || this.speechRate;

      // Try selecting a natural English voice if present
      const voices = window.speechSynthesis.getVoices();
      const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel')));
      if (enVoice) {
        utterance.voice = enVoice;
      }
      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech synthesis fallback silent
    }
  }
}

export const soundManager = new SoundManager();
