'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useToast } from '../components/Toast';

export default function Home() {
  const { showToast } = useToast();
  const [copyText, setCopyText] = useState('Copy Email');
  const [hoverImage, setHoverImage] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
      setCopyText('Copied!');
      showToast('email copied: alisufiancodes@gmail.com');
      setTimeout(() => {
        setCopyText('Copy Email');
      }, 2500);
    }
  };

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <main onMouseMove={handleMouseMove}>
      {/* Hero / Intro Section */}
      <section className="hero reveal active">
        <div className="hero-profile">
          <div className="profile-img-wrapper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/profile.png" alt="Ali Sufian Portrait" className="profile-img" />
          </div>
          <div className="hero-info">
            <h1 className="hero-name">Ali Sufian</h1>
            <p className="hero-tag">content creator & builder</p>
          </div>
        </div>

        <p className="hero-bio">
          I love content creation and shipping products. I review AI tools, build MVPs, and share my journey as a creator
          and builder.
        </p>

        <div className="learning-badge">
          Currently learning: Machine Learning (ML)
        </div>
      </section>

      <div className="divider"></div>

      {/* Projects Section */}
      <section id="projects" className="reveal active">
        <h2 className="section-title">things i've built & shipped</h2>
        <div className="projects-list">

          {/* Screen Snipper */}
          <a href="https://screensnipper.app" target="_blank" rel="noopener noreferrer" className="project-card">
            <div className="project-header">
              <h3 className="project-title">screensnipper.app</h3>
              <div className="project-badges">
                <span className="badge badge-earnings">revenue: $18</span>
              </div>
            </div>
            <p className="project-description">
              A lightweight, lightning-fast screen recording browser extension built for creators and developers who need
              to capture and share snippets in seconds.
            </p>
            <div className="project-link-indicator">
              visit screensnipper.app &rarr;
            </div>
          </a>

          {/* WhatsApp Privacy Extension */}
          <a href="https://whatsapp-privacy-extension.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-card">
            <div className="project-header">
              <h3 className="project-title">WhatsApp Privacy Extension</h3>
              <div className="project-badges">
                <span className="badge badge-free">free tool</span>
              </div>
            </div>
            <p className="project-description">
              A privacy-focused browser extension that blurs chats, contact names, and profile pictures in WhatsApp Web.
              Keep your messages secure from shoulder-surfers.
            </p>
            <div className="project-link-indicator">
              extension link &rarr;
            </div>
          </a>

          {/* Attendance Bot Story Link */}
          <Link href="/story" className="project-card">
            <div className="project-header">
              <h3 className="project-title">Attendance Bot Automation</h3>
              <div className="project-badges">
                <span className="badge badge-secret">python &bull; automation</span>
              </div>
            </div>
            <p className="project-description">
              A custom python script built to automate class attendance. The backstory of why I built it, how it worked,
              and why it's... kinda illegal.
            </p>
            <div className="project-link-indicator">
              read the story &rarr;
            </div>
          </Link>

        </div>
      </section>

      <div className="divider"></div>

      {/* Services Section */}
      <section id="services" className="reveal active">
        <h2 className="section-title">work with me</h2>
        <div className="services-sponsor-grid">

          {/* Service Card 1 */}
          <div className="service-card">
            <div className="service-content">
              <h3>MVP Building</h3>
              <p>if you built something with cursor or vibe-coding and got stuck or need someone to ship the final 10% of
                your product, let's finish it together.</p>
            </div>
            <button
              type="button"
              id="book-call-btn"
              className="service-btn service-btn-primary"
              data-cal-link="alis-sufian/mvp-building"
              data-cal-namespace="mvp-building"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            >
              Book a Call
            </button>
          </div>

          {/* Service Card 2 */}
          <div className="service-card">
            <div className="service-content">
              <h3>Sponsor & Collabs</h3>
              <p>want me to test, review, or make a tutorial for your ai tool? if your product is actually useful, i'll
                showcase it to my audience.</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                className="service-btn service-btn-secondary copy-email-btn"
                style={{ flex: 1 }}
                onClick={handleCopyEmail}
              >
                {copyText}
              </button>
              <a
                href="https://x.com/aliscodes"
                target="_blank"
                rel="noopener noreferrer"
                className="service-btn service-btn-secondary"
                style={{ flex: 1 }}
              >
                DM on X
              </a>
            </div>
          </div>

        </div>

        {/* Featured & Worked With Brands Grid */}
        <div className="brands-section">
          <h3 className="brands-title">featured & worked with</h3>
          <div className="brands-grid">

            {/* 1: Lovable */}
            <div className="brand-card">
              <div className="brand-logo-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
              </div>
              <div className="brand-card-info">
                <span className="brand-card-name">Lovable</span>
                <span className="brand-card-role">ai web builder</span>
              </div>
            </div>

            {/* 2: DeepSpace */}
            <div className="brand-card">
              <div className="brand-logo-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              </div>
              <div className="brand-card-info">
                <span className="brand-card-name">DeepSpace</span>
                <span className="brand-card-role">dev platform</span>
              </div>
            </div>

            {/* 3: Memory Store */}
            <div className="brand-card">
              <div className="brand-logo-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
              </div>
              <div className="brand-card-info">
                <span className="brand-card-name">Memory Store</span>
                <span className="brand-card-role">dev storage</span>
              </div>
            </div>

            {/* 4: Rocket */}
            <div className="brand-card">
              <div className="brand-logo-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71 1.26-2 1.26-2l-4.26-4.26s-1.29.55-2 1.26z"></path><path d="M12 15l-3-3 7.35-7.35c.99-.99 2.59-.99 3.58 0 .99.99.99 2.59 0 3.58L12 15z"></path></svg>
              </div>
              <div className="brand-card-info">
                <span className="brand-card-name">Rocket</span>
                <span className="brand-card-role">ai product builder</span>
              </div>
            </div>

            {/* 5: Pippit (by CapCut) */}
            <div className="brand-card">
              <div className="brand-logo-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
              </div>
              <div className="brand-card-info">
                <span className="brand-card-name">Pippit</span>
                <span className="brand-card-role">by capcut</span>
              </div>
            </div>

            {/* 6: Hyperagent (by Airtable) */}
            <div className="brand-card">
              <div className="brand-logo-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="16" y1="16" x2="16.01" y2="16"></line></svg>
              </div>
              <div className="brand-card-info">
                <span className="brand-card-name">Hyperagent</span>
                <span className="brand-card-role">by airtable</span>
              </div>
            </div>

            {/* 7: Higgsfield */}
            <div className="brand-card">
              <div className="brand-logo-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
              </div>
              <div className="brand-card-info">
                <span className="brand-card-name">Higgsfield</span>
                <span className="brand-card-role">ai video creator</span>
              </div>
            </div>

            {/* 8: Kling */}
            <div className="brand-card">
              <div className="brand-logo-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line></svg>
              </div>
              <div className="brand-card-info">
                <span className="brand-card-name">Kling</span>
                <span className="brand-card-role">ai video model</span>
              </div>
            </div>

            {/* 9: Gamma */}
            <div className="brand-card">
              <div className="brand-logo-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
              </div>
              <div className="brand-card-info">
                <span className="brand-card-name">Gamma</span>
                <span className="brand-card-role">ai presentations</span>
              </div>
            </div>

            {/* 10: HeyGen */}
            <div className="brand-card">
              <div className="brand-logo-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <div className="brand-card-info">
                <span className="brand-card-name">HeyGen</span>
                <span className="brand-card-role">ai avatar generator</span>
              </div>
            </div>

            {/* 11: MiniMax */}
            <div className="brand-card">
              <div className="brand-logo-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
              </div>
              <div className="brand-card-info">
                <span className="brand-card-name">MiniMax</span>
                <span className="brand-card-role">ai video & audio</span>
              </div>
            </div>

          </div>
          <div className="brands-footer-note">
            <span>+ 100 more</span> AI tools & tech brands reviewed and showcased
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* Things I Love Section */}
      <section id="loves" className="reveal active">
        <h2 className="section-title">things i love</h2>
        <div className="loves-tags">
          <span
            className="love-tag"
            onMouseEnter={() => setHoverImage('/assets/python.webp')}
            onMouseLeave={() => setHoverImage(null)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            python
          </span>
          <span
            className="love-tag"
            onMouseEnter={() => setHoverImage('/assets/Ollie.webp')}
            onMouseLeave={() => setHoverImage(null)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
            ollie
          </span>
          <span
            className="love-tag"
            onMouseEnter={() => setHoverImage('/assets/vibecoding.png')}
            onMouseLeave={() => setHoverImage(null)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            2am vibe-coding
          </span>
          <span
            className="love-tag"
            onMouseEnter={() => setHoverImage('/assets/ai tools.png')}
            onMouseLeave={() => setHoverImage(null)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            useful ai tools
          </span>
          <span
            className="love-tag"
            onMouseEnter={() => setHoverImage('/assets/beef biryanii.png')}
            onMouseLeave={() => setHoverImage(null)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            beef biryaani & grilled chicken
          </span>
          <span
            className="love-tag"
            onMouseEnter={() => setHoverImage('/assets/claudeee.png')}
            onMouseLeave={() => setHoverImage(null)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            claude
          </span>
          <span
            className="love-tag"
            onMouseEnter={() => setHoverImage('/assets/porsche 911.png')}
            onMouseLeave={() => setHoverImage(null)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12.2V16c0 .6.4 1 1 1h2c0 1.7 1.3 3 3 3s3-1.3 3-3h6c0 1.7 1.3 3 3 3s3-1.3 3-3z"></path>
              <circle cx="8" cy="17" r="2"></circle>
              <circle cx="18" cy="17" r="2"></circle>
            </svg>
            porsche 911 GT3
          </span>
        </div>
      </section>

      {/* Hover Image Preview Overlay */}
      {hoverImage && (
        <div
          className="hover-preview active"
          style={{
            left: `${mousePos.x + 15}px`,
            top: `${mousePos.y + 15}px`,
            position: 'fixed',
            zIndex: 1000,
            pointerEvents: 'none'
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hoverImage} alt="Preview" className="hover-preview-img" />
        </div>
      )}
    </main>
  );
}
