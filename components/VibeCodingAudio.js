'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export default function VibeCodingAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const chordTimerRef = useRef(null);
  const vinylNodeRef = useRef(null);
  const isPlayingRef = useRef(false);

  // Keep ref updated to avoid stale closures
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  // Play mechanical key click / thock sound
  const playMechanicalClick = useCallback(() => {
    if (!audioCtxRef.current || !isPlayingRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state !== 'running') return;

    try {
      const now = ctx.currentTime;
      
      // Frequency swept click (thock)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(180, now + 0.025);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320 + Math.random() * 40, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.025);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGainRef.current || ctx.destination);

      osc.start(now);
      osc.stop(now + 0.028);
    } catch (e) {
      console.debug('Click sound error:', e);
    }
  }, []);

  // Listen to user clicks on page when vibe mode is active
  useEffect(() => {
    if (!isPlaying) return;

    const handleClick = (e) => {
      // Don't play click if clicking directly on the toggle itself
      if (e.target.closest('.vibe-player-widget')) return;
      playMechanicalClick();
    };

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isPlaying, playMechanicalClick]);

  // Start Lofi Audio Generator
  const startAudio = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        showToast('Web Audio is not supported in this browser');
        return;
      }

      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.14, ctx.currentTime + 1.2);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // 1. Warm Vinyl / Tape Ambient Layer
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // Soft pinkish tape hiss + occasional dust crackle
        const hiss = (Math.random() * 2 - 1) * 0.025;
        const crackle = Math.random() > 0.9985 ? (Math.random() * 2 - 1) * 0.12 : 0;
        data[i] = hiss + crackle;
      }

      const vinylSource = ctx.createBufferSource();
      vinylSource.buffer = noiseBuffer;
      vinylSource.loop = true;

      const vinylFilter = ctx.createBiquadFilter();
      vinylFilter.type = 'lowpass';
      vinylFilter.frequency.setValueAtTime(950, ctx.currentTime);

      const vinylGain = ctx.createGain();
      vinylGain.gain.setValueAtTime(0.035, ctx.currentTime);

      vinylSource.connect(vinylFilter);
      vinylFilter.connect(vinylGain);
      vinylGain.connect(masterGain);
      vinylSource.start();
      vinylNodeRef.current = vinylSource;

      // 2. Generative 2am Lofi Chords Progression (Dm9 -> G13 -> Cmaj9 -> Am9)
      const chordProgression = [
        [146.83, 174.61, 220.00, 261.63, 329.63], // Dm9
        [98.00, 174.61, 246.94, 329.63],          // G13 / G7sus
        [130.81, 164.81, 196.00, 246.94, 293.66], // Cmaj9
        [110.00, 130.81, 164.81, 196.00, 246.94]  // Am9
      ];

      let currentChordIndex = 0;

      const playChord = () => {
        if (!audioCtxRef.current || !isPlayingRef.current) return;
        const currentCtx = audioCtxRef.current;
        const now = currentCtx.currentTime;
        const freqs = chordProgression[currentChordIndex];
        currentChordIndex = (currentChordIndex + 1) % chordProgression.length;

        const chordGain = currentCtx.createGain();
        const chordFilter = currentCtx.createBiquadFilter();
        
        chordFilter.type = 'lowpass';
        chordFilter.frequency.setValueAtTime(580, now);
        chordFilter.Q.setValueAtTime(1.8, now);

        // Soft ADSR envelope: slow attack, warm sustain, long gentle release
        chordGain.gain.setValueAtTime(0.0001, now);
        chordGain.gain.linearRampToValueAtTime(0.08, now + 0.9);
        chordGain.gain.setValueAtTime(0.08, now + 3.0);
        chordGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.8);

        chordFilter.connect(chordGain);
        chordGain.connect(masterGain);

        freqs.forEach((freq) => {
          // Double oscillator for subtle chorus detune
          [-3, 3].forEach((detuneVal) => {
            const osc = currentCtx.createOscillator();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now);
            osc.detune.setValueAtTime(detuneVal, now);
            osc.connect(chordFilter);
            osc.start(now);
            osc.stop(now + 4.9);
          });
        });
      };

      // Play first chord immediately
      playChord();
      chordTimerRef.current = setInterval(playChord, 4000);

      setIsPlaying(true);
      isPlayingRef.current = true;
    } catch (err) {
      console.error('Audio start error:', err);
    }
  };

  // Stop Lofi Audio
  const stopAudio = () => {
    if (chordTimerRef.current) {
      clearInterval(chordTimerRef.current);
      chordTimerRef.current = null;
    }

    if (masterGainRef.current && audioCtxRef.current) {
      try {
        const ctx = audioCtxRef.current;
        masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value, ctx.currentTime);
        masterGainRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);

        setTimeout(() => {
          try {
            if (vinylNodeRef.current) {
              vinylNodeRef.current.stop();
              vinylNodeRef.current.disconnect();
            }
            if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
              audioCtxRef.current.close();
            }
          } catch (e) {
            // Ignore close error
          }
          audioCtxRef.current = null;
          masterGainRef.current = null;
        }, 450);
      } catch (e) {
        audioCtxRef.current = null;
      }
    }

    setIsPlaying(false);
    isPlayingRef.current = false;
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  // Listen to custom event so clicking the "2am vibe-coding" chip triggers this
  useEffect(() => {
    const handleTrigger = () => {
      toggleAudio();
    };

    window.addEventListener('toggle-vibecoding-audio', handleTrigger);
    return () => {
      window.removeEventListener('toggle-vibecoding-audio', handleTrigger);
    };
  });

  return (
    <div className="vibe-player-widget">
      <button
        type="button"
        className={`vibe-player-btn ${isPlaying ? 'playing' : ''}`}
        onClick={toggleAudio}
        title="Toggle 2am vibe-coding mode (Lofi ambience + mechanical keyboard clicks)"
      >
        {isPlaying ? (
          <>
            <span className="vibe-bars">
              <span className="vibe-bar bar-1"></span>
              <span className="vibe-bar bar-2"></span>
              <span className="vibe-bar bar-3"></span>
            </span>
            <span className="vibe-label">2am vibe-coding: on</span>
            <span className="vibe-badge">pause</span>
          </>
        ) : (
          <>
            <span className="vibe-moon-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </span>
            <span className="vibe-label">2am vibe-coding</span>
            <span className="vibe-badge">play</span>
          </>
        )}
      </button>
    </div>
  );
}
