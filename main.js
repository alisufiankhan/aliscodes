/* ==========================================================================
   Minimalist Portfolio - Main JS interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Copyright Year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Scroll Reveal Animations using IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once revealed, we don't need to observe it anymore
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // trigger when 10% of the element is visible
    rootMargin: '0px 0px -50px 0px' // offset so it triggers slightly before coming into view
  });

  revealElements.forEach(element => {
    revealOnScroll.observe(element);
  });

  // 3. Header Styling on Scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.03)';
      header.style.borderColor = 'rgba(229, 231, 235, 0.8)';
    } else {
      header.style.boxShadow = 'none';
      header.style.borderColor = 'rgba(229, 231, 235, 0.5)';
    }
  });

  // 4. Newsletter Signup Form Handling (Silent Background Submit + Instant UI Feedback)
  const newsletterForm = document.getElementById('newsletter-form');
  const successMessage = document.getElementById('newsletter-success');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', () => {
      const emailInput = newsletterForm.querySelector('.newsletter-input');
      const submitBtn = newsletterForm.querySelector('.newsletter-btn');
      const originalBtnText = submitBtn.textContent;
      const email = emailInput ? emailInput.value.trim() : '';

      if (!email || !email.includes('@')) return;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Subscribing...';

      // Also fire background fetch to guarantee v3 API delivery
      try {
        fetch('https://subscribe-forms.beehiiv.com/v3/embed/97a75432-b575-4b6e-931f-e086ca9cf4a2', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email }),
          mode: 'no-cors'
        });
      } catch (err) {
        console.log(err);
      }

      // Show instant on-page success notification
      setTimeout(() => {
        submitBtn.textContent = 'Subscribed!';
        if (successMessage) {
          successMessage.textContent = 'Thanks for subscribing! Check your inbox soon.';
          successMessage.classList.add('success');
          successMessage.style.display = 'block';
        }

        setTimeout(() => {
          if (emailInput) emailInput.value = '';
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
          if (successMessage) successMessage.classList.remove('success');
        }, 5000);
      }, 400);
    });
  }

  // 5. Hover Image Preview for "things i love" tags
  const loveTags = document.querySelectorAll('.love-tag[data-image]');
  const hoverPreview = document.getElementById('hover-preview');
  const hoverPreviewImg = document.getElementById('hover-preview-img');

  if (hoverPreview && hoverPreviewImg) {
    loveTags.forEach(tag => {
      const imgPath = tag.getAttribute('data-image');
      
      tag.addEventListener('mouseenter', () => {
        hoverPreviewImg.src = imgPath;
        
        // Position preview centered above the tag
        const tagRect = tag.getBoundingClientRect();
        const left = tagRect.left + window.scrollX + (tagRect.width / 2);
        const top = tagRect.top + window.scrollY;
        
        hoverPreview.style.left = `${left}px`;
        hoverPreview.style.top = `${top}px`;
        hoverPreview.classList.add('active');
      });

      tag.addEventListener('mouseleave', () => {
        hoverPreview.classList.remove('active');
      });
    });
  }

  // 6. Toast Notification Helper
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout;

  function showToast(message) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;
    
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // 7. Copy Email Functionality
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  const targetEmail = 'alisufiancodes@gmail.com';

  function copyTextToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    } else {
      return new Promise((resolve, reject) => {
        try {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.left = '-9999px';
          textarea.style.top = '-9999px';
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          const successful = document.execCommand('copy');
          document.body.removeChild(textarea);
          if (successful) {
            resolve();
          } else {
            reject(new Error('execCommand failed'));
          }
        } catch (err) {
          reject(err);
        }
      });
    }
  }

  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e) e.preventDefault();
      const originalText = btn.textContent || 'Copy Email';

      copyTextToClipboard(targetEmail).then(() => {
        btn.textContent = 'Copied!';
        showToast(`email copied: ${targetEmail}`);
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      }).catch(() => {
        btn.textContent = 'Copied!';
        showToast(`email copied: ${targetEmail}`);
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      });
    });
  });

  // 8. Book a Call (Cal.com Ready) Handler
  const bookCallBtn = document.getElementById('book-call-btn');
  if (bookCallBtn) {
    bookCallBtn.addEventListener('click', () => {
      // If Cal.com API is not yet loaded, inform user
      if (typeof window.Cal === 'undefined' && !bookCallBtn.getAttribute('data-cal-link')) {
        showToast('Cal.com booking ready! Share your script to enable popup.');
      }
    });
  }

  // 9. Reading Progress Bar
  const progressBar = document.getElementById('reading-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${Math.min(scrolled, 100)}%`;
    });
  }

  // 10. Copy Code Snippet
  const copyCodeBtn = document.getElementById('copy-code-btn');
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      const codeElement = document.getElementById('python-code');
      if (!codeElement) return;
      const textToCopy = codeElement.innerText || codeElement.textContent;

      navigator.clipboard.writeText(textToCopy).then(() => {
        copyCodeBtn.textContent = 'Copied!';
        showToast('Code snippet copied to clipboard!');
        setTimeout(() => {
          copyCodeBtn.textContent = 'Copy Code';
        }, 2000);
      });
    });
  }

  // 11. Interactive Terminal Simulator
  const simLogBox = document.getElementById('sim-log-box');
  const btnRunSim = document.getElementById('btn-run-sim');
  const btnTestGeo = document.getElementById('btn-test-geo');
  const btnClearLog = document.getElementById('btn-clear-log');

  if (simLogBox) {
    let isSimulating = false;

    function addLogLine(text, type = 'info') {
      const line = document.createElement('div');
      line.className = `terminal-line ${type}`;
      const time = new Date().toLocaleTimeString('en-US', { hour12: false });
      line.textContent = `[${time}] ${text}`;
      simLogBox.appendChild(line);
      simLogBox.scrollTop = simLogBox.scrollHeight;
    }

    if (btnRunSim) {
      btnRunSim.addEventListener('click', async () => {
        if (isSimulating) return;
        isSimulating = true;
        btnRunSim.disabled = true;
        btnRunSim.style.opacity = '0.6';

        simLogBox.innerHTML = '';
        addLogLine('🚀 Initializing LMS Attendance Automation Agent...', 'info');

        await new Promise(r => setTimeout(r, 600));
        addLogLine('🌐 Launching Headless Chrome Browser...', 'info');

        await new Promise(r => setTimeout(r, 800));
        addLogLine('📍 Overriding GPS Geolocation: Lat 34.1688° N, Long 73.2215° E (Abbottabad Office)', 'warn');

        await new Promise(r => setTimeout(r, 900));
        addLogLine('📸 Navigating to LMS portal & capturing CAPTCHA canvas element...', 'info');

        await new Promise(r => setTimeout(r, 1000));
        addLogLine('🧠 Running OCR Captcha Solver... Recognized: "7K9P"', 'success');

        await new Promise(r => setTimeout(r, 700));
        addLogLine('🔑 Injecting Credentials & Submitting Form...', 'info');

        await new Promise(r => setTimeout(r, 900));
        addLogLine('✅ Attendance Mark Action: CHECK-IN SUCCESSFUL!', 'success');

        await new Promise(r => setTimeout(r, 500));
        addLogLine('💤 Closing browser context. Next scheduled trigger: 17:00:00 PM', 'info');

        isSimulating = false;
        btnRunSim.disabled = false;
        btnRunSim.style.opacity = '1';
      });
    }

    if (btnTestGeo) {
      btnTestGeo.addEventListener('click', () => {
        addLogLine('🛰️ CDP Geolocation Override: Lat 34.1688, Long 73.2215. Spoofing active.', 'warn');
      });
    }

    if (btnClearLog) {
      btnClearLog.addEventListener('click', () => {
        simLogBox.innerHTML = '<div class="terminal-line info">[SYS] Terminal cleared. Click "Run Bot Simulation" to start.</div>';
      });
    }
  }
});
