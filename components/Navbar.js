'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isNight, setIsNight] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aliscodes_nightmode');
    if (saved === 'true') {
      setIsNight(true);
      document.body.classList.add('screenbar-active');
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNightMode = () => {
    const nextState = !isNight;
    setIsNight(nextState);
    if (nextState) {
      document.body.classList.add('screenbar-active');
      localStorage.setItem('aliscodes_nightmode', 'true');
    } else {
      document.body.classList.remove('screenbar-active');
      localStorage.setItem('aliscodes_nightmode', 'false');
    }
  };

  return (
    <header className={scrolled ? 'header-scrolled' : ''}>
      <div className="container nav-container">
        <Link href="/" className="logo">
          ali sufian
        </Link>
        <nav>
          <ul>
            <li><a href="#work">work</a></li>
            <li><a href="#built">built</a></li>
            <li><a href="#rates">rates</a></li>
            <li>
              <button
                type="button"
                className="nav-theme-toggle"
                onClick={toggleNightMode}
                aria-label="Toggle 2am Night Mode"
                title={isNight ? 'Switch to daylight' : 'Switch to 2am night mode'}
              >
                {isNight ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                )}
              </button>
            </li>
            <li>
              <button
                type="button"
                className="nav-btn"
                data-cal-link="alis-sufian/mvp-building"
                data-cal-namespace="mvp-building"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              >
                book a call
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
