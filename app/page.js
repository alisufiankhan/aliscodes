'use client';

import { useState } from 'react';
import { useToast } from '../components/Toast';

export default function Home() {
  const { showToast } = useToast();
  const [copyText, setCopyText] = useState('copy email');
  const [hoverImage, setHoverImage] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Modal states
  const [rateCardOpen, setRateCardOpen] = useState(false);

  const handleCopyEmail = async () => {
    const email = 'alisufiancodes@gmail.com';
    let copied = false;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(email);
        copied = true;
      } catch (err) {
        console.warn('Clipboard writeText failed, using fallback:', err);
      }
    }

    if (!copied) {
      const textArea = document.createElement('textarea');
      textArea.value = email;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        copied = true;
      } catch (err) {
        console.error('Fallback execCommand copy failed:', err);
      }
      document.body.removeChild(textArea);
    }

    if (copied) {
      setCopyText('copied!');
      showToast('email copied: alisufiancodes@gmail.com');
      setTimeout(() => {
        setCopyText('copy email');
      }, 2500);
    }
  };

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <main onMouseMove={handleMouseMove}>
      {/* 1. Hero / Intro Section */}
      <section className="hero">
        <div className="hero-profile">
          <div className="profile-avatar-circle">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/profile.png" alt="Ali Sufian" />
          </div>
          <div className="hero-info">
            <h2 className="hero-name">ali sufian</h2>
            <p className="hero-tag">i build software and make content about ai tools</p>
          </div>
        </div>

        <h1 className="hero-headline">
          building apps, testing ai tools, and sharing it all with <span className="highlight">80k+ people</span>.
        </h1>

        <p className="hero-bio">
          when i review a tool, i've built something with it first. that's why 100+ brands have paid me to test theirs.
        </p>

        <div className="hero-cta-group">
          <a href="#work" className="btn-primary">
            work with me
          </a>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setRateCardOpen(true)}
          >
            see the rate card
          </button>
        </div>
      </section>

      {/* 2. Key Stats Bar */}
      <div className="stats-container">
        <div className="stats-grid">
          <div className="stat-cell">
            <div className="stat-number">80k</div>
            <div className="stat-label">across x, instagram & linkedin</div>
          </div>
          <div className="stat-cell">
            <div className="stat-number">100+</div>
            <div className="stat-label">paid brand collabs</div>
          </div>
        </div>
      </div>

      {/* 3. Brands Worked With */}
      <section className="brands-section">
        <h3 className="brands-title">BRANDS I'VE WORKED WITH</h3>
        <div className="brands-grid">
          {[
            'lovable',
            'luma ai',
            'magnific',
            'pixverse',
            'airtable',
            'heygen',
            'kling',
            'gamma',
            'minimax',
            'sintra',
            'higgsfield',
          ].map((brand) => (
            <span key={brand} className="brand-chip">
              {brand}
            </span>
          ))}
          <span className="brand-chip brand-chip-more">+ 90 more</span>
        </div>
      </section>

      <div className="divider"></div>

      {/* 4. Two Ways to Work With Me Section */}
      <section id="work">
        <h2 className="section-title">two ways to work with me</h2>
        <p className="section-subtitle">different problems, different pages. pick yours.</p>

        <div id="rates" className="work-grid">
          {/* Card 1: For AI Brands */}
          <div className="work-card">
            <div>
              <span className="work-card-tag tag-brands">FOR AI BRANDS</span>
              <h3 className="work-card-title">sponsored content that gets used</h3>
              <p className="work-card-desc">
                i install your tool, build something real with it, then make the content. no scripted demos. reels, x threads, newsletter placements.
              </p>
              <ul className="work-card-list">
                <li><span className="check-icon">&#10003;</span> single x post from $150</li>
                <li><span className="check-icon">&#10003;</span> ig reel from $200</li>
                <li><span className="check-icon">&#10003;</span> multi-platform package from $500</li>
              </ul>
            </div>
            <div>
              <button
                type="button"
                className="btn-primary"
                style={{ width: '100%' }}
                onClick={() => setRateCardOpen(true)}
              >
                get the media kit
              </button>
            </div>
          </div>

          {/* Card 2: For Founders */}
          <div className="work-card">
            <div>
              <span className="work-card-tag tag-founders">FOR FOUNDERS</span>
              <h3 className="work-card-title">your ai-built saas is broken</h3>
              <p className="work-card-desc">
                you vibe-coded something to 90% and hit a wall. i finish it, fix it, and ship it. free scope call first, no form.
              </p>
              <ul className="work-card-list">
                <li><span className="check-icon">&#10003;</span> codebase audit & repair</li>
                <li><span className="check-icon">&#10003;</span> final 10% to launch</li>
                <li><span className="check-icon">&#10003;</span> completemysaas.com</li>
              </ul>
            </div>
            <div>
              <button
                type="button"
                className="btn-secondary"
                style={{ width: '100%' }}
                data-cal-link="alis-sufian/mvp-building"
                data-cal-namespace="mvp-building"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              >
                book a scope call
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>


      {/* 6. Things I've Built & Shipped */}
      <section id="built">
        <h2 className="section-title">things i've built & shipped</h2>
        <p className="section-subtitle">this is what separates me from creators who only review.</p>

        <div className="projects-stack">
          {/* Project 1 */}
          <a
            href="https://screensnipper.app"
            target="_blank"
            rel="noopener noreferrer"
            className="project-row"
          >
            <div className="project-row-header">
              <h3 className="project-row-title">
                screensnipper.app
                <svg className="project-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </h3>
              <span className="badge-status status-live">live</span>
            </div>
            <p className="project-row-desc">
              chrome extension for screen recording. nothing touches a server &mdash; recordings stay on your machine. built it because every alternative wanted an upload.
            </p>
          </a>

          {/* Project 2 */}
          <a
            href="https://completemysaas.com"
            target="_blank"
            rel="noopener noreferrer"
            className="project-row"
          >
            <div className="project-row-header">
              <h3 className="project-row-title">
                completemysaas.com
                <svg className="project-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </h3>
              <span className="badge-status status-live">live</span>
            </div>
            <p className="project-row-desc">
              i fix ai-generated saas codebases that stalled at 90%. audit, repair, ship.
            </p>
          </a>

          {/* Project 3 */}
          <div className="project-row">
            <div className="project-row-header">
              <h3 className="project-row-title">stackup ai</h3>
              <span className="badge-status status-weekly">weekly</span>
            </div>
            <p className="project-row-desc">
              weekly newsletter on ai tools. built the whole content pipeline myself &mdash; idea shelf, script generator, carousel export.
            </p>
          </div>

          {/* Project 4 */}
          <a
            href="https://whatsapp-privacy-extension.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="project-row"
          >
            <div className="project-row-header">
              <h3 className="project-row-title">
                whatsapp privacy extension
                <svg className="project-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </h3>
              <span className="badge-status status-free">free</span>
            </div>
            <p className="project-row-desc">
              blurs chats, names and profile pictures in whatsapp web so nobody reads over your shoulder.
            </p>
          </a>
        </div>
      </section>

      {/* 7. Things I Love Section */}
      <section className="things-love-section">
        <h2 className="section-title" style={{ marginBottom: '1.25rem' }}>things i love</h2>
        <div className="love-chips-cloud">
          {[
            {
              id: 'python',
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              ),
              label: 'python',
              image: '/assets/python.webp',
            },
            {
              id: 'ollie',
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              ),
              label: 'ollie',
              image: '/assets/Ollie.webp',
            },
            {
              id: 'vibecoding',
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              ),
              label: '2am vibe-coding',
              image: '/assets/vibecoding.png',
            },
            {
              id: 'aitools',
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              ),
              label: 'useful ai tools',
              image: '/assets/ai tools.png',
            },
            {
              id: 'food',
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              ),
              label: 'beef biryaani & grilled chicken',
              image: '/assets/beef biryanii.png',
            },
            {
              id: 'claude',
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              ),
              label: 'claude',
              image: '/assets/claudeee.png',
            },
            {
              id: 'porsche',
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2"></path>
                  <circle cx="7" cy="17" r="2"></circle>
                  <circle cx="17" cy="17" r="2"></circle>
                </svg>
              ),
              label: 'porsche 911 gt3',
              image: '/assets/porsche 911.png',
            },
          ].map((item) => (
            <div
              key={item.id}
              className={`love-chip-wrapper ${hoverImage === item.image ? 'active' : ''}`}
              onMouseEnter={() => setHoverImage(item.image)}
              onMouseLeave={() => setHoverImage(null)}
            >
              {hoverImage === item.image && (
                <div className="love-card-popup">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.label} className="love-card-img" />
                </div>
              )}
              <div className="love-chip">
                <span className="love-chip-icon">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Footer CTA Banner */}
      <div className="footer-cta-banner">
        <h2 className="footer-cta-title">got a tool you want in front of 80k people?</h2>
        <p className="footer-cta-desc">reply time is usually under a day. rate card sent on request.</p>
        <div className="footer-cta-actions">
          <button
            type="button"
            className="btn-banner-white"
            onClick={handleCopyEmail}
          >
            {copyText}
          </button>
          <a
            href="https://x.com/aliscodes"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-banner-dark"
          >
            dm on x
          </a>
        </div>
      </div>


      {/* Media Kit / Rate Card Modal */}
      {rateCardOpen && (
        <div className="modal-overlay" onClick={() => setRateCardOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setRateCardOpen(false)}>
              &times;
            </button>
            <h3 className="modal-title">rate card & media kit</h3>
            <p className="modal-subtitle">ali sufian &bull; 80k+ cross-platform audience</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f9fafb', padding: '0.85rem 1rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontWeight: '700', color: 'var(--accent-teal)', marginBottom: '0.2rem' }}>X (Twitter) Post</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Dedicated thread / post showcasing your tool: <strong>From $150</strong></div>
              </div>
              <div style={{ background: '#f9fafb', padding: '0.85rem 1rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontWeight: '700', color: 'var(--accent-teal)', marginBottom: '0.2rem' }}>Instagram Reel</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>High-engagement short video demo with real build: <strong>From $200</strong></div>
              </div>
              <div style={{ background: '#f9fafb', padding: '0.85rem 1rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontWeight: '700', color: 'var(--accent-amber)', marginBottom: '0.2rem' }}>Multi-Platform Package</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>X Thread + IG Reel + Newsletter feature: <strong>From $500</strong></div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="button" className="btn-primary" style={{ flex: 1 }} onClick={handleCopyEmail}>
                copy email to book
              </button>
              <a href="https://x.com/aliscodes" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ flex: 1 }}>
                dm on x
              </a>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
