/**
 * BS GAMING — High-Tech Cyber Warning & Code Security Protection Engine
 * Animated warning overlay modals, DevTools detection, anti-screenshot, anti-copy & key combo blocker.
 */

(function () {
    'use strict';

    let isPageReadyForSecurity = true;

    // 1. Framebusting — Prevent Clickjacking / Embedding in External Iframes
    try {
        if (window.top !== window.self) {
            window.top.location.href = window.self.location.href;
        }
    } catch (e) { }

    // 2. Disable Console Output & Code Exposure
    const noop = function () { };
    try {
        console.log = function () {
            try { console.clear(); } catch(err){}
        };
        console.warn = noop;
        console.error = noop;
        console.info = noop;
        console.table = noop;
        console.dir = noop;
    } catch (e) { }

    // 3. Continuous Anti-DevTools Debugger Trap
    setInterval(function () {
        if (!isPageReadyForSecurity) return;
        const startTime = performance.now();
        (function () { }).constructor('debugger')();
        const endTime = performance.now();

        // If debugger paused execution for more than 120ms, DevTools is active!
        if (endTime - startTime > 120) {
            triggerDevToolsShield();
        }
    }, 400);

    // 4. DevTools Window Resize Detection
    function checkDevToolsOpen() {
        if (!isPageReadyForSecurity) return;
        const threshold = 180;
        const widthDiff = window.outerWidth - window.innerWidth > threshold;
        const heightDiff = window.outerHeight - window.innerHeight > threshold;

        if (widthDiff || heightDiff) {
            triggerDevToolsShield();
        } else {
            const shield = document.getElementById('securityDevToolsShield');
            if (shield && document.hasFocus() && !document.hidden) {
                shield.style.display = 'none';
            }
        }
    }

    window.addEventListener('resize', checkDevToolsOpen, { passive: true });

    function triggerDevToolsShield() {
        if (!isPageReadyForSecurity) return;
        let shield = document.getElementById('securityDevToolsShield');
        if (!shield) {
            shield = document.createElement('div');
            shield.id = 'securityDevToolsShield';
            shield.className = 'cyber-security-shield-overlay';
            shield.innerHTML = `
                <div class="cyber-warning-card">
                    <div class="warning-scanline"></div>
                    <div class="warning-icon-wrapper">
                        <div class="warning-icon-ring"></div>
                        <div class="warning-icon-ring ring-outer"></div>
                        <span class="warning-icon">⚠️</span>
                    </div>
                    <div class="warning-type-badge">🚨 SECURITY ALERT • ACCESS RESTRICTED</div>
                    <h1 class="warning-title">DEVTOOLS ACCESS DENIED</h1>
                    <p class="warning-desc">Developer Tools inspection is restricted to protect Bibek Sapkota's verified identity, passport & academic credentials.</p>
                    <div class="warning-status-tag">🔒 Reason: Source Code & Verified Document Protection Active</div>
                </div>
            `;
            document.body.appendChild(shield);
        }
        shield.style.display = 'flex';
    }

    // --- WEB AUDIO API CYBER SECURITY ALARM SFX SYNTHESIZER ---
    function playCyberSecurityAlarmSFX() {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();

            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();

            osc1.type = 'sawtooth';
            osc2.type = 'square';

            const now = ctx.currentTime;

            // Cyber Alarm Pulse Frequency (880Hz / 440Hz Beep Sequence)
            osc1.frequency.setValueAtTime(880, now);
            osc1.frequency.setValueAtTime(440, now + 0.12);
            osc1.frequency.setValueAtTime(880, now + 0.24);
            osc1.frequency.setValueAtTime(440, now + 0.36);

            osc2.frequency.setValueAtTime(1200, now);
            osc2.frequency.setValueAtTime(600, now + 0.12);
            osc2.frequency.setValueAtTime(1200, now + 0.24);
            osc2.frequency.setValueAtTime(600, now + 0.36);

            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.48);

            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(ctx.destination);

            osc1.start(now);
            osc2.start(now);
            osc1.stop(now + 0.48);
            osc2.stop(now + 0.48);
        } catch (e) { }
    }

    // 5. Mobile & PC Anti-Screenshot & Screen Capture Protection (High-Tech Animated Warning Card + Alarm SFX)
    function createAntiScreenshotShield() {
        let shield = document.getElementById('antiScreenshotSecurityShield');
        if (!shield) {
            shield = document.createElement('div');
            shield.id = 'antiScreenshotSecurityShield';
            shield.className = 'cyber-security-shield-overlay';
            shield.innerHTML = `
                <div class="cyber-warning-card">
                    <div class="warning-scanline"></div>
                    <div class="warning-icon-wrapper">
                        <div class="warning-icon-ring"></div>
                        <div class="warning-icon-ring ring-outer"></div>
                        <span class="warning-icon">🛡️</span>
                    </div>
                    <div class="warning-type-badge">🚨 SECURITY ALERT • CAPTURE BLOCKED</div>
                    <h1 class="warning-title">SCREENSHOT RESTRICTED</h1>
                    <p class="warning-desc">Screen capture and window screenshots are blocked across all mobile & desktop devices to protect Bibek Sapkota's verified identity, passport & academic credentials.</p>
                    <div class="warning-status-tag">🔒 Reason: Verified Document & Identity Protection Active</div>
                </div>
            `;
            document.body.appendChild(shield);
        }
        return shield;
    }

    let hideShieldTimer = null;
    function activateAntiScreenshot(reason) {
        const shield = createAntiScreenshotShield();
        shield.style.display = 'flex';

        // Play Cyber Siren Alarm Sound Effect
        playCyberSecurityAlarmSFX();

        // Clear clipboard immediately to prevent screenshot paste
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText('🔒 Protected Verified Credentials — Bibek Sapkota');
            }
        } catch (e) { }

        if (reason) {
            showSecurityToast(reason);
        }

        if (hideShieldTimer) clearTimeout(hideShieldTimer);
        hideShieldTimer = setTimeout(function () {
            if (document.hasFocus() && !document.hidden) {
                shield.style.display = 'none';
            }
        }, 2500);
    }

    function deactivateAntiScreenshot() {
        const shield = document.getElementById('antiScreenshotSecurityShield');
        if (shield && !document.hidden && document.hasFocus()) {
            shield.style.display = 'none';
        }
    }

    // Instant Blackout on Tab Switch / Window Blur / App Switcher (Android, iOS & PC)
    window.addEventListener('blur', function () {
        if (window.isUnlockingPortfolio) return;
        activateAntiScreenshot('🔒 Device screen capture protected.');
    }, true);

    window.addEventListener('pagehide', function () {
        if (window.isUnlockingPortfolio) return;
        activateAntiScreenshot();
    }, true);

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            activateAntiScreenshot();
        } else {
            deactivateAntiScreenshot();
        }
    }, true);

    window.addEventListener('focus', function () {
        deactivateAntiScreenshot();
    }, true);

    // Detect Mobile Multi-Touch Screenshot Gestures (Android / iOS 3 & 4 finger swipes)
    window.addEventListener('touchstart', function (e) {
        if (e.touches && e.touches.length >= 3) {
            activateAntiScreenshot('🔒 Multi-touch screenshot gesture blocked for document security.');
        }
    }, { passive: true });

    // 6. Block Keyboard Shortcuts & PrintScreen (PC & Mac)
    document.addEventListener('keydown', function (e) {
        const keyLower = e.key ? e.key.toLowerCase() : '';

        // PrintScreen Key
        if (['printscreen'].includes(keyLower) || e.keyCode === 44 || e.code === 'PrintScreen') {
            e.preventDefault();
            e.stopPropagation();
            activateAntiScreenshot('🔒 PrintScreen blocked: Verified document protection active.');
            return false;
        }

        // F12 key
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            e.stopPropagation();
            showSecurityToast('🔒 F12 Developer Tools is disabled.');
            triggerDevToolsShield();
            return false;
        }

        // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+Shift+E, Ctrl+Shift+K
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'j', 'c', 'e', 'k'].includes(keyLower)) {
            e.preventDefault();
            e.stopPropagation();
            showSecurityToast('🔒 DevTools shortcut is disabled.');
            triggerDevToolsShield();
            return false;
        }

        // Windows Snipping Tool (Win + Shift + S) or Mac Screenshot (Cmd + Shift + 3/4/5)
        if (e.key === 'Meta' || e.key === 'OS' || e.code === 'MetaLeft' || e.code === 'MetaRight' || ((e.metaKey || e.ctrlKey) && e.shiftKey && ['s', '3', '4', '5'].includes(keyLower))) {
            e.preventDefault();
            e.stopPropagation();
            activateAntiScreenshot('🔒 Screen capture shortcut blocked for document security.');
            return false;
        }

        // Ctrl+U (View Source), Ctrl+S (Save), Ctrl+P (Print), Ctrl+A (Select All), Ctrl+C (Copy), Ctrl+X (Cut)
        if ((e.ctrlKey || e.metaKey) && ['u', 's', 'p', 'c', 'x', 'a'].includes(keyLower)) {
            e.preventDefault();
            e.stopPropagation();
            showSecurityToast('🔒 Shortcut disabled: Verified document & identity protection active.');
            return false;
        }
    }, true);

    document.addEventListener('keyup', function (e) {
        const keyLower = e.key ? e.key.toLowerCase() : '';
        if (['printscreen'].includes(keyLower) || e.keyCode === 44 || e.code === 'PrintScreen') {
            activateAntiScreenshot('🔒 PrintScreen blocked: Verified document protection active.');
        }
    }, true);

    // 7. Block Context Menu (Right-Click & Long-Press on Mobile)
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        showSecurityToast('🔒 Right-click disabled: Verified documents are protected.');
        return false;
    }, true);

    // 8. Block Drag & Drop of Images and Documents
    document.addEventListener('dragstart', function (e) {
        e.preventDefault();
        return false;
    }, true);

    // 9. Security Toast Notification Engine
    let securityToastTimeout;
    function showSecurityToast(msg) {
        let toast = document.getElementById('securityNoticeToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'securityNoticeToast';
            toast.className = 'security-notice-toast';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<span style="font-size:1.2rem;">🚨</span> <span>${msg}</span>`;
        toast.classList.add('show-toast');
        clearTimeout(securityToastTimeout);
        securityToastTimeout = setTimeout(() => {
            toast.classList.remove('show-toast');
        }, 2500);
    }
})();
