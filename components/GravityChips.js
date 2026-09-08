'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useToast } from './Toast';

const LOVE_ITEMS = [
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
];

export default function GravityChips({ hoverImage, setHoverImage }) {
  const [gravityActive, setGravityActive] = useState(false);
  const { showToast } = useToast();
  const containerRef = useRef(null);
  const chipElementsRef = useRef({});
  const physicsDataRef = useRef({});
  const animationFrameRef = useRef(null);
  const isDraggingRef = useRef(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const mouseHistoryRef = useRef([]);

  // Trigger physics simulation
  const startGravity = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    const initialBodies = {};
    LOVE_ITEMS.forEach((item) => {
      const el = chipElementsRef.current[item.id];
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = rect.left - containerRect.left;
      const y = rect.top - containerRect.top;

      initialBodies[item.id] = {
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * -2,
        width: rect.width,
        height: rect.height,
        rotation: 0,
        vRot: (Math.random() - 0.5) * 3,
      };
    });

    physicsDataRef.current = initialBodies;
    setGravityActive(true);
    showToast('🧲 gravity on: click & fling chips around!');
  };

  const resetGravity = () => {
    setGravityActive(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    // Reset inline styles smoothly
    LOVE_ITEMS.forEach((item) => {
      const el = chipElementsRef.current[item.id];
      if (el) {
        el.style.transform = '';
        el.style.position = '';
        el.style.left = '';
        el.style.top = '';
        el.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        setTimeout(() => {
          if (el) el.style.transition = '';
        }, 400);
      }
    });
    showToast('chips snapped back to grid');
  };

  // Main physics loop
  useEffect(() => {
    if (!gravityActive) return;

    const gravity = 0.48;
    const friction = 0.985;
    const floorBounce = 0.58;
    const wallBounce = 0.65;

    const updatePhysics = () => {
      if (!containerRef.current) return;
      const arena = containerRef.current.getBoundingClientRect();
      const arenaWidth = arena.width;
      const arenaHeight = Math.max(arena.height, 320);

      const bodies = physicsDataRef.current;

      LOVE_ITEMS.forEach((item) => {
        const body = bodies[item.id];
        const el = chipElementsRef.current[item.id];
        if (!body || !el) return;

        // Skip physics if being dragged by user
        if (isDraggingRef.current === item.id) return;

        body.vy += gravity;
        body.vx *= friction;
        body.vy *= friction;
        body.vRot *= friction;

        body.x += body.vx;
        body.y += body.vy;
        body.rotation += body.vRot;

        // Bottom bounce
        if (body.y + body.height >= arenaHeight) {
          body.y = arenaHeight - body.height;
          body.vy = -body.vy * floorBounce;
          body.vx *= 0.88; // ground friction
          if (Math.abs(body.vy) < 0.6) body.vy = 0;
        }

        // Left wall
        if (body.x <= 0) {
          body.x = 0;
          body.vx = -body.vx * wallBounce;
        }

        // Right wall
        if (body.x + body.width >= arenaWidth) {
          body.x = arenaWidth - body.width;
          body.vx = -body.vx * wallBounce;
        }

        // Apply transforms
        el.style.position = 'absolute';
        el.style.left = '0px';
        el.style.top = '0px';
        el.style.transform = `translate3d(${body.x}px, ${body.y}px, 0) rotate(${body.rotation}deg)`;
      });

      animationFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animationFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gravityActive]);

  // Drag & Fling Handlers
  const handleMouseDown = (e, id) => {
    if (!gravityActive) return;
    e.preventDefault();
    isDraggingRef.current = id;

    const body = physicsDataRef.current[id];
    if (!body || !containerRef.current) return;
    const arena = containerRef.current.getBoundingClientRect();

    dragOffsetRef.current = {
      x: (e.clientX - arena.left) - body.x,
      y: (e.clientY - arena.top) - body.y,
    };

    mouseHistoryRef.current = [{ x: e.clientX, y: e.clientY, time: Date.now() }];
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingRef.current || !containerRef.current) return;
      const id = isDraggingRef.current;
      const body = physicsDataRef.current[id];
      const el = chipElementsRef.current[id];
      if (!body || !el) return;

      const arena = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - arena.left;
      const mouseY = e.clientY - arena.top;

      body.x = mouseX - dragOffsetRef.current.x;
      body.y = mouseY - dragOffsetRef.current.y;
      body.vx = 0;
      body.vy = 0;

      el.style.transform = `translate3d(${body.x}px, ${body.y}px, 0) rotate(${body.rotation}deg)`;

      // Record velocity
      const now = Date.now();
      mouseHistoryRef.current.push({ x: e.clientX, y: e.clientY, time: now });
      if (mouseHistoryRef.current.length > 5) mouseHistoryRef.current.shift();
    };

    const handleMouseUp = () => {
      if (!isDraggingRef.current) return;
      const id = isDraggingRef.current;
      const body = physicsDataRef.current[id];

      // Fling throw calculation
      if (body && mouseHistoryRef.current.length >= 2) {
        const first = mouseHistoryRef.current[0];
        const last = mouseHistoryRef.current[mouseHistoryRef.current.length - 1];
        const dt = Math.max(1, last.time - first.time);
        body.vx = ((last.x - first.x) / dt) * 14;
        body.vy = ((last.y - first.y) / dt) * 14;
        body.vRot = body.vx * 0.4;
      }

      isDraggingRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="gravity-section-wrapper">
      <div className="gravity-header-row">
        <h2 className="section-title" style={{ margin: 0 }}>things i love</h2>
        <button
          type="button"
          className={`btn-gravity-toggle ${gravityActive ? 'active' : ''}`}
          onClick={gravityActive ? resetGravity : startGravity}
          title={gravityActive ? 'Snap chips back into grid' : 'Drop chips with real gravity physics'}
        >
          {gravityActive ? (
            <>
              <span className="gravity-icon">↺</span>
              <span>reset chips</span>
            </>
          ) : (
            <>
              <span className="gravity-icon">🧲</span>
              <span>drop chips (gravity)</span>
            </>
          )}
        </button>
      </div>

      <div
        ref={containerRef}
        className={`love-chips-cloud ${gravityActive ? 'gravity-active-arena' : ''}`}
      >
        {LOVE_ITEMS.map((item) => (
          <div
            key={item.id}
            ref={(el) => {
              if (el) chipElementsRef.current[item.id] = el;
            }}
            className={`love-chip-wrapper ${hoverImage === item.image ? 'active' : ''} ${gravityActive ? 'physics-chip' : ''}`}
            onMouseEnter={() => !gravityActive && setHoverImage(item.image)}
            onMouseLeave={() => !gravityActive && setHoverImage(null)}
            onMouseDown={(e) => handleMouseDown(e, item.id)}
            onClick={() => {
              if (item.id === 'vibecoding') {
                window.dispatchEvent(new CustomEvent('toggle-vibecoding-audio'));
              }
            }}
            style={item.id === 'vibecoding' || gravityActive ? { cursor: gravityActive ? 'grab' : 'pointer' } : {}}
            title={
              item.id === 'vibecoding'
                ? 'Click to toggle 2am vibe-coding mode 🎧'
                : gravityActive
                ? 'Click and fling!'
                : undefined
            }
          >
            {hoverImage === item.image && !gravityActive && (
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
    </div>
  );
}
