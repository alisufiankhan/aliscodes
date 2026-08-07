'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useToast } from '../../components/Toast';

export default function StoryPage() {
  const { showToast } = useToast();
  const [progress, setProgress] = useState(0);
  const [copyCodeText, setCopyCodeText] = useState('copy snippet');
  const [simRunning, setSimRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);

  // Reading progress scroll calculation
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Copy code snippet helper
  const handleCopyCode = async () => {
    const codeSnippet = `import requests
import time

def auto_checkin(student_id, session_token):
    url = "https://university-portal.edu/api/attendance/checkin"
    headers = {"Authorization": f"Bearer {session_token}"}
    payload = {"student_id": student_id, "status": "PRESENT"}
    res = requests.post(url, json=payload, headers=headers)
    return res.status_code == 200

# Run bot 5 minutes before class ends
time.sleep(300)
auto_checkin("STU_88412", "tok_live_992a")`;

    let copied = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(codeSnippet);
        copied = true;
      } catch (err) {
        console.warn('Clipboard writeText failed:', err);
      }
    }

    if (!copied) {
      const textArea = document.createElement('textarea');
      textArea.value = codeSnippet;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        copied = true;
      } catch (err) {
        console.error('ExecCommand copy failed:', err);
      }
      document.body.removeChild(textArea);
    }

    if (copied) {
      setCopyCodeText('copied!');
      showToast('python snippet copied to clipboard');
      setTimeout(() => setCopyCodeText('copy snippet'), 2500);
    }
  };

  // Run interactive bot terminal simulator
  const handleRunSimulation = () => {
    if (simRunning) return;
    setSimRunning(true);
    setSimLogs([]);

    const steps = [
      { text: '[08:00:01] 🚀 Initializing attendance_bot.py...', delay: 400 },
      { text: '[08:00:03] 🌐 Connecting to portal: university-portal.edu', delay: 900 },
      { text: '[08:00:05] 🔑 Auth token validated: STU_88412 (Ali Sufian)', delay: 1400 },
      { text: '[08:00:07] ⏳ Waiting for professor to open attendance window...', delay: 2000 },
      { text: '[08:14:58] ⚡ Attendance window opened! Dispatching payload...', delay: 2700 },
      { text: '[08:15:00] ✅ Status 200 OK: Marked PRESENT while sound asleep 😴', delay: 3400 }
    ];

    steps.forEach(({ text, delay }) => {
      setTimeout(() => {
        setSimLogs(prev => [...prev, text]);
      }, delay);
    });

    setTimeout(() => {
      setSimRunning(false);
    }, 4000);
  };

  return (
    <main>
      {/* Reading Progress Bar Container */}
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <article className="story-container reveal active">
        {/* Back Link */}
        <Link href="/#projects" className="story-back-link">
          &larr; back to projects
        </Link>

        {/* Story Header */}
        <header className="story-header">
          <div className="story-meta">
            <span className="badge badge-secret">python &bull; automation</span>
            <span className="story-date">october 2024</span>
          </div>
          <h1 className="story-title">why i built a python bot to automate my class attendance</h1>
          <p className="story-subtitle">
            a story about morning classes, 8am lectures, and how 20 lines of python saved my semester.
          </p>
        </header>

        {/* Story Body Content */}
        <div className="story-body">
          <p>
            It was 7:45 AM on a freezing Tuesday morning. My alarm was screaming at me from across the room.
            I had an 8:00 AM lecture—a class where the professor took attendance by posting a QR code on the screen for exactly 120 seconds.
          </p>

          <p>
            Miss those two minutes? Marked absent. Miss 3 classes? Dropped a full letter grade.
            As a night-owl developer who writes their best code between 1 AM and 4 AM, this policy was my worst enemy.
          </p>

          <h3>the realization</h3>
          <p>
            One morning, while groggily scanning the QR code with one eye open, I looked at the URL it opened:
          </p>
          <p>
            <code>https://portal.university.edu/checkin?session_id=98231&token=abc123xyz</code>
          </p>
          <p>
            My developer brain immediately kicked in. The URL followed a completely predictable pattern.
            The session token was generated using a simple timestamp hash.
            I didn't need to be sitting in that cold lecture hall at 8:00 AM—I just needed Python.
          </p>

          <h3>how it worked</h3>
          <p>
            That night, I opened VS Code and spent 45 minutes building a lightweight automation script.
            Here's what the logic looked like:
          </p>

          {/* Code Block Showcase with Copy Button */}
          <div className="code-block-wrapper">
            <div className="code-block-header">
              <span>attendance_bot.py</span>
              <button
                type="button"
                className="code-copy-btn"
                onClick={handleCopyCode}
              >
                {copyCodeText}
              </button>
            </div>
            <pre><code>{`import requests
import time

def auto_checkin(student_id, session_token):
    url = "https://university-portal.edu/api/attendance/checkin"
    headers = {"Authorization": f"Bearer {session_token}"}
    payload = {"student_id": student_id, "status": "PRESENT"}
    
    res = requests.post(url, json=payload, headers=headers)
    return res.status_code == 200

# Run bot 5 minutes before class ends
time.sleep(300)
auto_checkin("STU_88412", "tok_live_992a")`}</code></pre>
          </div>

          <div className="story-steps">
            <div className="story-step">
              <span className="step-num">1</span>
              <div>
                <strong>cron schedule</strong>
                <p>The script ran automatically on my cloud server every morning at 7:58 AM.</p>
              </div>
            </div>
            <div className="story-step">
              <span className="step-num">2</span>
              <div>
                <strong>token fetching</strong>
                <p>It fetched the active session token directly from the portal's open API endpoint.</p>
              </div>
            </div>
            <div className="story-step">
              <span className="step-num">3</span>
              <div>
                <strong>auto-submission</strong>
                <p>It sent the check-in payload and fired a Telegram notification to my phone: <em>"marked present!"</em></p>
              </div>
            </div>
          </div>

          {/* Interactive Bot Simulation Card */}
          <div className="story-demo-card">
            <div className="sim-header">
              <span className="sim-dot red"></span>
              <span className="sim-dot yellow"></span>
              <span className="sim-dot green"></span>
              <span className="sim-title">attendance_bot_terminal.sh</span>
            </div>
            <div className="sim-console">
              {simLogs.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  click "run live bot simulation" below to test the automated script workflow...
                </p>
              ) : (
                simLogs.map((log, index) => <div key={index} className="sim-log-line">{log}</div>)
              )}
            </div>
            <button
              type="button"
              className="sim-btn-primary"
              onClick={handleRunSimulation}
              disabled={simRunning}
            >
              {simRunning ? 'Running Bot...' : 'Run Live Bot Simulation'}
            </button>
          </div>

          <h3>the outcome</h3>
          <p>
            It worked flawlessly for an entire semester. I had 100% attendance in an 8:00 AM class that I rarely attended in person.
            My grades went up because I was actually getting 8 hours of sleep.
          </p>

          <p>
            Eventually, the university upgraded their system to require Bluetooth proximity beacons, which officially retired the bot.
            Targeting systems and finding clever workarounds is what made me love software automation.
          </p>

          {/* Disclaimer Box */}
          <div className="story-disclaimer">
            <strong>disclaimer:</strong> if you get caught, we never met. if you don't get caught, please endorse me for python automation on linkedin.
          </div>
        </div>
      </article>
    </main>
  );
}
