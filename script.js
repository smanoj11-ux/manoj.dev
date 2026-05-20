/* ==========================================================================
   Manoj Sridhar - Script.js (Advanced Interactions & Web Audio Synthesizer)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ==========================================================================
    // 1. Custom Cursor Interactions
    // ==========================================================================
    const cursor = document.getElementById('custom-cursor');
    const cursorGlow = document.getElementById('custom-cursor-glow');

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    // Inertial smoothing delay for cursor glow
    const animateCursor = () => {
        const dx = mouseX - glowX;
        const dy = mouseY - glowY;
        
        glowX += dx * 0.15;
        glowY += dy * 0.15;
        
        cursorGlow.style.left = `${glowX}px`;
        cursorGlow.style.top = `${glowY}px`;
        
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover scale effects on interactive components
    const interactives = document.querySelectorAll('a, button, .portfolio-card, .workflow-step-btn, .nav-item, input, textarea');
    interactives.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.style.width = '14px';
            cursor.style.height = '14px';
            cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.6)';
            cursorGlow.style.borderColor = 'var(--accent-cyan)';
            cursorGlow.style.backgroundColor = 'rgba(6, 182, 212, 0.08)';
        });
        
        item.addEventListener('mouseleave', () => {
            cursor.style.width = '8px';
            cursor.style.height = '8px';
            cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorGlow.style.borderColor = 'rgba(255, 255, 255, 0.35)';
            cursorGlow.style.backgroundColor = 'rgba(139, 92, 246, 0.05)';
        });
    });

    // ==========================================================================
    // 2. Interactive Backdrop Canvas (Fluid Art Swirl Simulation)
    // ==========================================================================
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Paint Particle Structure
    const particles = [];
    const maxParticles = 60;
    const colors = [
        'rgba(139, 92, 246, 0.08)', // Violet
        'rgba(6, 182, 212, 0.08)',  // Cyan
        'rgba(217, 70, 239, 0.06)'  // Magenta
    ];

    class PaintDrop {
        constructor(x, y) {
            this.x = x || Math.random() * width;
            this.y = y || Math.random() * height;
            this.radius = Math.random() * 80 + 40;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.vx = Math.random() * 1.5 - 0.75;
            this.vy = Math.random() * 1.5 - 0.75;
            this.alpha = 1;
            this.fade = Math.random() * 0.003 + 0.001;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= this.fade;
            
            // Slow bounce on screen edges
            if (this.x < -100 || this.x > width + 100) this.vx *= -1;
            if (this.y < -100 || this.y > height + 100) this.vy *= -1;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = Math.max(0, this.alpha);
            ctx.beginPath();
            
            // Create a radial gradient drop for smooth blending
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // Populate initial background drops
    for (let i = 0; i < 25; i++) {
        particles.push(new PaintDrop());
    }

    // Create a new drop on mouse move
    let spawnTick = 0;
    canvas.addEventListener('mousemove', (e) => {
        spawnTick++;
        if (spawnTick % 6 === 0) { // Limit spawn rate
            particles.push(new PaintDrop(e.clientX, e.clientY));
            if (particles.length > maxParticles) {
                particles.shift();
            }
        }
    });

    // Create visual burst on click
    canvas.addEventListener('click', (e) => {
        for (let i = 0; i < 5; i++) {
            const burst = new PaintDrop(e.clientX, e.clientY);
            burst.radius = Math.random() * 150 + 80;
            burst.vx = Math.random() * 4 - 2;
            burst.vy = Math.random() * 4 - 2;
            particles.push(burst);
        }
    });

    // Loop Background Rendering
    const drawBackground = () => {
        ctx.fillStyle = 'rgba(7, 7, 10, 0.15)'; // trails effect
        ctx.fillRect(0, 0, width, height);

        // Draw and update active drops
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].alpha <= 0) {
                particles.splice(i, 1);
                // Replenish background base
                if (particles.length < 15) {
                    particles.push(new PaintDrop());
                }
            }
        }

        requestAnimationFrame(drawBackground);
    };
    drawBackground();

    // ==========================================================================
    // 3. Web Audio API (SonicScapes Binaural Ambient Drone Synthesizer)
    // ==========================================================================
    let audioCtx = null;
    let masterGain = null;
    let synthActive = false;
    let oscillators = [];

    const startSynthesizer = () => {
        if (audioCtx) return;

        // Initialize Audio Context
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContextClass();
        
        // Master Volume Gain node
        masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(0, audioCtx.currentTime); // fade-in
        masterGain.connect(audioCtx.destination);
        
        // Create 3 layered oscillators for a deep, rich spiritual drone
        // Frequencies tuned to standard meditative notes (C2, G2, C3)
        const notes = [65.41, 98.00, 130.81]; 
        
        notes.forEach((freq, idx) => {
            const osc = audioCtx.createOscillator();
            const oscGain = audioCtx.createGain();
            
            // Oscillator Types (Sawtooth + Triangle layers for warmth)
            osc.type = idx === 1 ? 'triangle' : 'sawtooth';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            
            // Low-pass filter to keep sound warm and ambient
            const filter = audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(idx === 0 ? 120 : 250, audioCtx.currentTime);
            
            // Create a slow low-frequency modulator (LFO) for smooth waving effects
            const lfo = audioCtx.createOscillator();
            const lfoGain = audioCtx.createGain();
            lfo.frequency.setValueAtTime(0.08 + idx * 0.05, audioCtx.currentTime); // slow pulse
            lfoGain.gain.setValueAtTime(0.2, audioCtx.currentTime);
            
            lfo.connect(lfoGain.gain);
            oscGain.gain.setValueAtTime(0.12, audioCtx.currentTime);
            
            // Connect node pipeline
            osc.connect(filter);
            filter.connect(oscGain);
            lfoGain.connect(oscGain.gain);
            oscGain.connect(masterGain);
            
            // Start components
            osc.start();
            lfo.start();
            
            oscillators.push(osc);
            oscillators.push(lfo); // keep reference to stop later
        });

        // Slow fade-in to C2 drone level
        masterGain.gain.linearRampToValueAtTime(0.35, audioCtx.currentTime + 3.0);
    };

    const stopSynthesizer = () => {
        if (!audioCtx) return;
        
        // Fade-out master gain to prevent popping
        masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.5);
        
        setTimeout(() => {
            oscillators.forEach(osc => {
                try { osc.stop(); } catch(e) {}
            });
            oscillators = [];
            audioCtx.close();
            audioCtx = null;
        }, 1600);
    };

    const audioToggle = document.getElementById('audio-toggle');
    const audioStatusText = audioToggle.querySelector('.audio-status-text');
    const muteIcon = audioToggle.querySelector('.mute-icon');
    const playIcon = audioToggle.querySelector('.play-icon');
    const containerControl = document.querySelector('.audio-control-container');

    const toggleAudioFlow = () => {
        synthActive = !synthActive;
        
        if (synthActive) {
            startSynthesizer();
            audioStatusText.textContent = "SonicScapes On";
            muteIcon.classList.add('hidden');
            playIcon.classList.remove('hidden');
            containerControl.classList.add('playing');
        } else {
            stopSynthesizer();
            audioStatusText.textContent = "SonicScapes Off";
            muteIcon.classList.remove('hidden');
            playIcon.classList.add('hidden');
            containerControl.classList.remove('playing');
        }
    };

    audioToggle.addEventListener('click', toggleAudioFlow);
    
    // Trigger audio activation via Hero button
    const heroAudioBtn = document.getElementById('hero-audio-trigger');
    heroAudioBtn.addEventListener('click', () => {
        if (!synthActive) {
            toggleAudioFlow();
        }
        // Smooth scroll to core capabilities
        document.getElementById('facets').scrollIntoView({ behavior: 'smooth' });
    });

    // ==========================================================================
    // 4. Interactive AI Story-to-Video Workflow Navigation
    // ==========================================================================
    const stepBtns = document.querySelectorAll('.workflow-step-btn');
    const panes = document.querySelectorAll('.workflow-pane');

    stepBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetStep = btn.getAttribute('data-step');
            
            // Remove active states from buttons
            stepBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Transition visible panes
            panes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.getAttribute('id') === `pane-${targetStep}`) {
                    pane.classList.add('active');
                }
            });
        });
    });

    // ==========================================================================
    // 5. Dynamic Portfolio Gallery Filters & Lightbox Modal
    // ==========================================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.portfolio-card');

    // Filter Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterVal = btn.getAttribute('data-filter');
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            cards.forEach(card => {
                const cat = card.getAttribute('data-category');
                
                if (filterVal === 'all' || cat === filterVal) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCat = document.getElementById('lightbox-cat');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxTools = document.getElementById('lightbox-tools');
    const lightboxPrompt = document.getElementById('lightbox-prompt');
    const promptBox = document.getElementById('prompt-box');
    const lightboxAction = document.getElementById('lightbox-action');
    const lightboxClose = document.querySelector('.lightbox-close');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Pull metadata attributes
            const imgUrl = card.getAttribute('data-img');
            const title = card.getAttribute('data-title');
            const desc = card.getAttribute('data-desc');
            const tool = card.getAttribute('data-tool');
            const prompt = card.getAttribute('data-prompt');
            const link = card.getAttribute('data-link');
            const catText = card.querySelector('.overlay-cat').textContent;

            // Hydrate Lightbox
            lightboxImg.src = imgUrl;
            lightboxCat.textContent = catText;
            lightboxTitle.textContent = title;
            lightboxDesc.textContent = desc;
            lightboxTools.textContent = tool;
            lightboxAction.href = link;

            // Prompt block logic (hide if empty or placeholder)
            if (prompt && prompt !== "null") {
                lightboxPrompt.textContent = prompt;
                promptBox.classList.remove('hidden');
            } else {
                promptBox.classList.add('hidden');
            }

            // Open Lightbox
            lightbox.classList.add('active');
        });
    });

    // Close Lightbox listeners
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // Handle ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
    });

    // ==========================================================================
    // 6. Navigation Scrollspy (Active State Tracking)
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - varHdrOffset())) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    });

    const varHdrOffset = () => {
        return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hdr-height')) || 80;
    };

    // Mobile Navbar Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const menuIcon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            menuIcon.setAttribute('data-lucide', 'x');
        } else {
            menuIcon.setAttribute('data-lucide', 'menu');
        }
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const menuIcon = mobileMenuBtn.querySelector('i');
            menuIcon.setAttribute('data-lucide', 'menu');
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    });
});
