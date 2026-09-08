'use client';

import { useState, useEffect } from 'react';
import { useToast } from './Toast';

export default function ScreenBar() {
  const [isOn, setIsOn] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    // Check saved preference
    const saved = localStorage.getItem('aliscodes_screenbar');
    if (saved === 'true') {
      setIsOn(true);
      document.body.classList.add('screenbar-active');
    }
  }, []);

  const playSwitchClick = (turningOn) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Snappy mechanical relay click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(turningOn ? 1800 : 1200, now);
      filter.Q.setValueAtTime(4, now);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(turningOn ? 450 : 380, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.03);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {
      // Audio fallback
    }
  };

  const toggleScreenBar = () => {
    const nextState = !isOn;
    setIsOn(nextState);
    playSwitchClick(nextState);

    if (nextState) {
      document.body.classList.add('screenbar-active');
      localStorage.setItem('aliscodes_screenbar', 'true');
      showToast('💡 2am screenbar on: warm desk lighting active');
    } else {
      document.body.classList.remove('screenbar-active');
      localStorage.setItem('aliscodes_screenbar', 'false');
      showToast('screenbar off');
    }
  };

  return (
    <div className="screenbar-container">
      {/* Light fixture */}
      <button
        type="button"
        className={`screenbar-fixture ${isOn ? 'on' : ''}`}
        onClick={toggleScreenBar}
        title={isOn ? 'Turn off 2am screenbar' : 'Turn on 2am screenbar (warm desk lighting)'}
      >
        <span className="screenbar-mount"></span>
        <span className="screenbar-housing">
          <span className="screenbar-led-strip"></span>
          <span className="screenbar-power-dot"></span>
        </span>
        <span className="screenbar-hint">
          {isOn ? 'screenbar: on' : 'screenbar: 2am light'}
        </span>
      </button>

      {/* Realistic Light Cone */}
      <div className={`screenbar-light-cone ${isOn ? 'active' : ''}`} />
    </div>
  );
}
