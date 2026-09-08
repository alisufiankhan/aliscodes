'use client';

import { useState } from 'react';
import { useToast } from '../components/Toast';
import MagneticButton from '../components/MagneticButton';
import GravityChips from '../components/GravityChips';

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

    // Update cursor spotlight position on all spotlight-card elements
    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
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
          <MagneticButton strength={0.3}>
            <a href="#work" className="btn-primary">
              work with me
            </a>
          </MagneticButton>
          <MagneticButton strength={0.3}>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setRateCardOpen(true)}
            >
              see the rate card
            </button>
          </MagneticButton>
        </div>
      </section>

      {/* 2. Key Stats Bar */}
      <div className="stats-container">
        <div className="stats-grid">
          <div className="stat-cell spotlight-card">
            <div className="stat-number">80k</div>
            <div className="stat-label">across x, instagram & linkedin</div>
          </div>
          <div className="stat-cell spotlight-card">
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
          <div className="work-card spotlight-card">
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
              <MagneticButton strength={0.25} style={{ width: '100%' }}>
                <button
                  type="button"
                  className="btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => setRateCardOpen(true)}
                >
                  get the media kit
                </button>
              </MagneticButton>
            </div>
          </div>

          {/* Card 2: For Founders */}
          <div className="work-card spotlight-card">
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
              <MagneticButton strength={0.25} style={{ width: '100%' }}>
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
              </MagneticButton>
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
            className="project-row spotlight-card"
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
            className="project-row spotlight-card"
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
          <div className="project-row spotlight-card">
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
            className="project-row spotlight-card"
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

      {/* 7. Things I Love Section with Gravity Physics */}
      <section className="things-love-section">
        <GravityChips hoverImage={hoverImage} setHoverImage={setHoverImage} />
      </section>

      {/* 8. Footer CTA Banner */}
      <div className="footer-cta-banner">
        <h2 className="footer-cta-title">got a tool you want in front of 80k people?</h2>
        <p className="footer-cta-desc">reply time is usually under a day. rate card sent on request.</p>
        <div className="footer-cta-actions">
          <MagneticButton strength={0.3}>
            <button
              type="button"
              className="btn-banner-white"
              onClick={handleCopyEmail}
            >
              {copyText}
            </button>
          </MagneticButton>
          <MagneticButton strength={0.3}>
            <a
              href="https://x.com/aliscodes"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-banner-dark"
            >
              dm on x
            </a>
          </MagneticButton>
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
