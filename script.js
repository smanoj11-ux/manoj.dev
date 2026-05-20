/* ==========================================================================
   INTERACTIVE SCRIPTS (Manoj Portfolio 2026)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // DOM references
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const pillarTabs = document.querySelectorAll('.pillar-tab');
    const pillarViews = document.querySelectorAll('.pillar-view');
    const modalOpenButtons = document.querySelectorAll('.btn-open-modal');
    const contactForm = document.getElementById('portfolio-contact-form');
    
    // Additional buttons for simulation feedback
    const resumeBtn = document.getElementById('btn-resume');
    const mobileResumeBtn = document.getElementById('mobile-btn-resume');
    const portfolioBtn = document.getElementById('btn-portfolio');
    const mobilePortfolioBtn = document.getElementById('mobile-btn-portfolio');

    /* ==========================================================================
       TOAST NOTIFICATION SYSTEM
       ========================================================================== */
    const showToast = (message, iconType = 'info') => {
        const notificationArea = document.getElementById('notification-area');
        if (!notificationArea) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        
        let iconHtml = '<i data-lucide="info"></i>';
        if (iconType === 'success') {
            iconHtml = '<i data-lucide="check-circle" style="color: #10b981"></i>';
        } else if (iconType === 'error') {
            iconHtml = '<i data-lucide="alert-triangle" style="color: #ef4444"></i>';
        } else if (iconType === 'terminal' || iconType === 'system') {
            iconHtml = '<i data-lucide="terminal" style="color: #a855f7"></i>';
        }

        toast.innerHTML = `
            ${iconHtml}
            <span>${message}</span>
        `;
        
        notificationArea.appendChild(toast);
        if (typeof lucide !== 'undefined') {
            lucide.createIcons({ attrs: { class: 'lucide-icon' } });
        }

        // Trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // Remove after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 4000);
    };

    /* ==========================================================================
       NO-OP TERMINAL UTILITY (SAFE LOGGER BACKWARD COMPATIBILITY)
       ========================================================================== */
    const logToTerminal = (text, type = 'normal') => {
        console.log(`[System Diagnostic - ${type}]: ${text}`);
    };

    /* ==========================================================================
       STICKY NAVIGATION & SCROLL EVENTS
       ========================================================================== */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Close mobile drawer on navigation click
    const toggleMobileMenu = () => {
        mobileNav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        
        // Visual menu lines rotation
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (mobileNav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    };

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav && mobileNav.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    /* ==========================================================================
       PILLAR TABS INTERACTION
       ========================================================================== */
    pillarTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetPillar = tab.getAttribute('data-pillar');
            
            // Toggle Tab Buttons active state
            pillarTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Toggle views display
            pillarViews.forEach(view => {
                if (view.id === targetPillar) {
                    view.classList.add('active');
                    logToTerminal(`Switched perspective active layer to: ${tab.innerText.trim()}`, 'system');
                } else {
                    view.classList.remove('active');
                }
            });
            
            // Trigger animation updates
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    });

    /* ==========================================================================
       CASE STUDY DATA & DYNAMIC MODAL ENGINE
       ========================================================================== */
    const caseStudiesData = {
        "m1c": {
            pillar: "Web3 / Crypto",
            title: "MetaMask Wallet Flow",
            sub: "Seamless Web3 onboarding and transaction UI",
            image: "assets/metamask_flow.png",
            mainText: `
                <h3>The Narrative & Challenge</h3>
                <p>Navigating Web3 wallets and executing on-chain transactions is often a daunting experience for new users. High gas fees, confusing token contracts, and clunky interfaces lead to significant drop-off rates during initial onboarding and token swaps.</p>
                <p>To solve this, I led a high-fidelity glassmorphic redesign of the MetaMask wallet experience. The primary goal was to abstract away the blockchain complexity while maintaining absolute transparency over transaction costs and security.</p>
                <h3>System Design & Responsive UX</h3>
                <p>The interface leverages a modern dark mode aesthetic with deep glassmorphic layers (backdrop blur) and neon-Ethereum accents. Critical actions like <strong>Sending</strong> and <strong>Swapping</strong> are elevated into intuitive, tap-friendly pill buttons.</p>
                <p>A real-time gas estimation module was integrated directly into the swap flow, dynamically parsing network congestion and displaying exact slippage tolerances before the user ever clicks "Review Swap", ensuring zero surprises on chain.</p>
            `,
            metrics: [
                { val: "100+", lbl: "Tokens Supported" },
                { val: "Real-time", lbl: "Gas Estimation" },
                { val: "0.5s", lbl: "Transaction Sign Time" }
            ],
            tags: ["Web3 UI", "Glassmorphism", "Crypto Wallet", "Ethers.js", "Figma Prototyping"]
        },
        "m1b": {
            pillar: "Pillar 1: UI/UX & Systems",
            title: "HealthTech Intake Onboarding",
            sub: "HIPAA-compliant progressive onboarding flows",
            image: "assets/pillar1_health_wizard.webp",
            mainText: `
                <h3>The Narrative & Challenge</h3>
                <p>Telehealth platforms lose up to 65% of potential patients during the initial onboarding intake due to long, clinical intake spreadsheets asking for medical history, insurance verifications, and family details simultaneously. The objective was to design a beautiful, calm intake wizard that breaks down a complex 47-field form into a 6-step progressive flow.</p>
                <h3>Conditional Branching & Branching UX</h3>
                <p>I architected a step-by-step smart wizard. Patients answer single primary queries (e.g., "Describe your main symptom"). Behind the screen, a conditional logic tree dynamically hides or reveals detailed sub-questions—minimizing clutter. Medical terms are tagged with clean, instant hover-tooltips that explain medical jargon in plain language, avoiding panic or confusion.</p>
                <h3>Securing the Data Flow</h3>
                <p>Security is handled progressively. Sensitive information (identity files, insurance records) are uploaded via client-side chunked operations to encrypted buckets, bypassing middleman servers and conforming to strict HIPAA Title II compliance parameters.</p>
            `,
            metrics: [
                { val: "93.4%", lbl: "Form Completion Rate" },
                { val: "3.2m", lbl: "Average Finish Time" },
                { val: "HIPAA", lbl: "Compliant Framework" }
            ],
            tags: ["Figma Design", "Conditional Logic Tree", "HIPAA Architecture", "Client Encryption", "Calm UI"]
        },
        "m2a": {
            pillar: "Pillar 2: AI Automation",
            title: "E-Commerce AI Product Pipeline",
            sub: "Zero-studio product catalog photos at enterprise scale",
            image: "assets/pillar2_product_pipeline.png",
            mainText: `
                <h3>The Narrative & Challenge</h3>
                <p>Traditional e-commerce catalog production is slow, expensive, and requires studio rentals, lighting rigs, and digital retouchers. Scaling a catalog of 1000+ items across diverse visual settings (office, holiday, outdoor) presents massive bottlenecks.</p>
                <p>I engineered an automated, serverless pipeline that takes a single smartphone picture of a product and generates 8 distinct, visually consistent, and photorealistic lifestyle assets in seconds.</p>
                <h3>Pipeline Architecture & Nodes</h3>
                <p>The system is built as a programmatic ComfyUI node pipeline triggered via a REST API:</p>
                <ol>
                    <li><strong>Background Isolation:</strong> <strong>BiRefNet</strong> processes the input image, producing a surgical, high-contrast alpha mask of the target product.</li>
                    <li><strong>Perspective Matching:</strong> A ControlNet depth model extracts the physical perspective of the item, generating a three-dimensional mapping.</li>
                    <li><strong>Scene Synthesis:</strong> The <strong>Flux</strong> model uses the depth map to merge the item seamlessly into customizable background settings.</li>
                    <li><strong>Lighting Calibration:</strong> An automated overlay node normalizes brightness, shadows, and reflection values, locking the visual continuity.</li>
                    <li><strong>Quality Assurance:</strong> A <strong>CLIP score gate</strong> evaluates output aesthetics against a predefined scale, rejecting anomalies and auto-retrying failures.</li>
                </ol>
            `,
            metrics: [
                { val: "90%", lbl: "Time Saved vs Studio" },
                { val: "500+", lbl: "Daily Image Capacity" },
                { val: "93%", lbl: "Cost Reduction" }
            ],
            tags: ["BiRefNet Node", "Flux Diffusion", "ComfyUI Programmatic", "ControlNet", "CLIP Quality Filter"]
        },
        "m2b": {
            pillar: "Pillar 2: AI Automation",
            title: "Multi-Model AI Content Agent",
            sub: "LLM-driven orchestrator with automated self-correction",
            image: "assets/pillar2_content_agent.webp",
            mainText: `
                <h3>The Narrative & Challenge</h3>
                <p>Static prompts fail when generating varied artistic assets because individual AI models are tailored for highly specific styles (e.g., Flux for realistic assets, SDXL for stylized art, Midjourney for editorial layouts). A human operator must manually choose the model, adjust parameters, and review outputs.</p>
                <p>I built a multi-agent orchestrator that ingests basic text summaries, expands them into high-fidelity image prompts, dynamically routes tasks to the best-performing models, checks outputs against CLIP score thresholds, and auto-corrects prompt variables if failures occur.</p>
                <h3>Autonomous Orchestration Workflow</h3>
                <p>Behind the interface, a routing layer maps the target style: photorealistic tasks go to Flux, stylistic layouts go to SDXL, and editorial outputs trigger Midjourney API calls. An autonomous critic evaluates details, checking for typical anatomical defects or text anomalies and returning corrective instruction blocks back to the generator loops if required.</p>
            `,
            metrics: [
                { val: "94%", lbl: "First-Pass Quality Score" },
                { val: "12s", lbl: "Average Process Speed" },
                { val: "Zero", lbl: "Human Intervention" }
            ],
            tags: ["Claude Multi-Agent", "GPT-4 Vision critic", "Midjourney API", "SDXL/Flux Nodes", "Auto-Correction"]
        },
        "m3a": {
            pillar: "Pillar 3: AI Creative",
            title: "AI Cyberpunk Fashion Film",
            sub: "High-end runway digital couture campaign showcase",
            image: "assets/pillar3_fashion_film.png",
            mainText: `
                <h3>The Creative Vision & Challenge</h3>
                <p>Traditional high-fashion campaigns cost hundreds of thousands of dollars in set building, lighting design, and model casting. The goal was to construct a premium digital fashion film showcasing a futuristic cyberpunk-inspired clothing line, retaining high fabric detail and photorealistic human model fidelity.</p>
                <h3>Advanced Generation Pipeline</h3>
                <p>A multi-layered AI synthesis pipeline was established to direct the campaign:</p>
                <ul>
                    <li><strong>Concept Modeling:</strong> Used Midjourney v6 to render consistent material and fabric swatch reference sheets.</li>
                    <li><strong>Textile Synthesis:</strong> Leveraged Flux Dev with custom LoRA nodes to build intricate digital neon embroidery and interactive cybernetic textures.</li>
                    <li><strong>Cinematic Choreography:</strong> Run through Kling AI for realistic human runway walks and smooth cloth simulation.</li>
                    <li><strong>Camera Sequencing:</strong> Runway Gen-3 was utilized to apply volumetric light sweeps, dolly-ins, and slow-motion pans to highlight clothing textures.</li>
                </ul>
            `,
            metrics: [
                { val: "1.2M+", lbl: "Organic Campaign Views" },
                { val: "18", lbl: "Fully-Realized Looks" },
                { val: "8K", lbl: "Master Rendering" }
            ],
            tags: ["Midjourney v6", "Flux Custom LoRA", "Kling Runway Walks", "Runway Gen-3 Motion", "Volumetric Lighting"]
        },
        "m3b": {
            pillar: "Pillar 3: AI Creative",
            title: "AI Sci-Fi Cinematic Trailer",
            sub: "Worldbuilding cinematic teaser for 'Kepler-186f'",
            image: "assets/pillar3_scifi_trailer.png",
            mainText: `
                <h3>The Narrative & Challenge</h3>
                <p>Generating believable space exploration concepts requires absolute consistency in hard-surface vehicle modeling, cosmic particle simulation, and grand-scale environmental perspective. Random panning or shifting details destroy the cinematic illusion.</p>
                <h3>Cinematic Orchestration & Worldbuilding</h3>
                <p>The teaser was directed using custom reference seeds for spaceships and planetary topography. Midjourney was used to design detailed cockpit views, planet orbit hulls, and ring system geometries. Runway Gen-3 then animated these models with highly precise orbital drift paths and asteroid particle flows. Color correction and space haze layers were composited in DaVinci Resolve, creating a dark, majestic cosmic voyage feel.</p>
            `,
            metrics: [
                { val: "98%", lbl: "Consistent Geometry" },
                { val: "45", lbl: "Storyboard Scenes" },
                { val: "60fps", lbl: "Motion Interpolation" }
            ],
            tags: ["Midjourney Orbit Seeds", "Runway Gen-3 Motion", "Hard-Surface Design", "DaVinci Resolve Composite", "Space Haze Grade"]
        }
    };

    const injectCaseStudyContent = (data) => {
        const contentContainer = document.getElementById('modal-dynamic-content');
        if (!contentContainer) return;

        let metricsHtml = '';
        if (data.metrics && data.metrics.length > 0) {
            metricsHtml = `
                <div class="sidebar-block">
                    <h4>Key Metrics</h4>
                    ${data.metrics.map(m => `
                        <div class="sidebar-stat">
                            <span class="val">${m.val}</span>
                            <span class="lbl">${m.lbl}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        let tagsHtml = '';
        if (data.tags && data.tags.length > 0) {
            tagsHtml = `
                <div class="sidebar-block">
                    <h4>Core Stack</h4>
                    <div class="sidebar-tags">
                        ${data.tags.map(t => `<span class="badge">${t}</span>`).join('')}
                    </div>
                </div>
            `;
        }

        contentContainer.innerHTML = `
            <div class="modal-hero">
                <img src="${data.image}" alt="${data.title} Case Study" loading="lazy">
                <div class="modal-header-text">
                    <span class="tag">${data.pillar}</span>
                    <h2>${data.title}</h2>
                    <p class="sub">${data.sub}</p>
                </div>
            </div>
            <div class="modal-body-content">
                <div class="modal-main">
                    ${data.mainText}
                </div>
                <div class="modal-sidebar">
                    ${metricsHtml}
                    ${tagsHtml}
                </div>
            </div>
        `;
    };

    const modal = document.getElementById('case-study-modal');
    const closeBtn = document.getElementById('modal-close-btn');

    const openModal = (modalId) => {
        const data = caseStudiesData[modalId];
        if (!data || !modal) return;

        // Inject dynamic content
        injectCaseStudyContent(data);

        // Render Lucide icons inside dynamic content
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Show modal with animation
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock main scroll
        
        logToTerminal(`Ingesting case study model packet: [${modalId.toUpperCase()}]`, 'system');
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore main scroll
    };

    modalOpenButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = btn.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeModal();
        });
    }

    // Close modal clicking outside the container
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modals on escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    /* ==========================================================================
       CONTACT FORM ROUTING VIA FORMSUBMIT AJAX
       ========================================================================== */
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            const submitBtn = document.getElementById('btn-submit-form');
            const submitBtnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
            if (submitBtnText) submitBtnText.innerText = 'TRANSMITTING SIGNAL...';
        });
    }

    /* ==========================================================================
       BUTTON INTERACTION EXTRAS (SIMULATIONS)
       ========================================================================== */
    if (resumeBtn) {
        resumeBtn.addEventListener('click', (e) => {
            // Let normal download happen, but show a nice toast
            showToast('Opening official Manoj_Resume.pdf...', 'terminal');
        });
    }

    if (mobileResumeBtn) {
        mobileResumeBtn.addEventListener('click', () => {
            showToast('Opening Manoj_Resume.pdf...', 'terminal');
            if (mobileNav && mobileNav.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    }

    if (portfolioBtn) {
        portfolioBtn.addEventListener('click', (e) => {
            // Let normal download happen, but show a nice toast
            showToast('Opening official Manoj_Portfolio.pdf...', 'terminal');
        });
    }

    if (mobilePortfolioBtn) {
        mobilePortfolioBtn.addEventListener('click', () => {
            showToast('Opening Manoj_Portfolio.pdf...', 'terminal');
            if (mobileNav && mobileNav.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    }
    /* ==========================================================================
       SCROLL REVEAL INTERSECT OBSERVER
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Trigger only once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for browsers without IntersectionObserver
        revealElements.forEach(el => el.classList.add('active'));
    }

    /* ==========================================================================
       GENERATIVE ART ENGINE
       ========================================================================== */
    const artCanvas = document.getElementById('generative-canvas');
    if (artCanvas) {
        const ctx = artCanvas.getContext('2d');
        const seedVal = document.getElementById('art-seed-val');
        const vectorVal = document.getElementById('art-vector-val');
        const regenBtn = document.getElementById('regenerate-art-btn');
        
        let width = 0;
        let height = 0;
        let particles = [];
        let numParticles = 150;
        let seed = Math.random() * 1000;
        let activePaletteIndex = 0;

        const PALETTES = [
            { name: 'Neon Horizon', colors: ['#ff007f', '#7f00ff', '#00f0ff', '#ff00aa'], seedHex: '#FF007F' },
            { name: 'Ethereum Cyber', colors: ['#5b6cfd', '#a384ff', '#1ad1a5', '#49e6f3'], seedHex: '#5B6CFD' },
            { name: 'Solar Nebula', colors: ['#ff4b2b', '#ff416c', '#ff8c00', '#f4e613'], seedHex: '#FF4B2B' },
            { name: 'Forest Aurora', colors: ['#00e676', '#00b0ff', '#1de9b6', '#a7ffeb'], seedHex: '#00E676' },
            { name: 'Pure Platinum', colors: ['#ffffff', '#e0e0e0', '#80deea', '#00acc1'], seedHex: '#FFFFFF' }
        ];

        const mouse = { x: -1000, y: -1000 };

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = 0;
                this.vy = 0;
                this.speed = 0.3 + Math.random() * 1.2;
                const palette = PALETTES[activePaletteIndex].colors;
                this.color = palette[Math.floor(Math.random() * palette.length)];
                this.alpha = 0.15 + Math.random() * 0.45;
                this.size = 1 + Math.random() * 1.5;
                this.life = 0;
                this.maxLife = 100 + Math.random() * 300;
            }
            update() {
                // Sine field vector calculations
                const angle = Math.sin(this.x * 0.008 + seed) * Math.cos(this.y * 0.008 + seed) * Math.PI * 2;
                
                let ax = Math.cos(angle) * 0.08;
                let ay = Math.sin(angle) * 0.08;
                
                // Mouse attraction
                if (mouse.x > 0 && mouse.y > 0) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        const force = (120 - dist) / 600;
                        ax += (dx / dist) * force;
                        ay += (dy / dist) * force;
                    }
                }
                
                this.vx += ax;
                this.vy += ay;
                
                const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                if (currentSpeed > this.speed) {
                    this.vx = (this.vx / currentSpeed) * this.speed;
                    this.vy = (this.vy / currentSpeed) * this.speed;
                }
                
                this.x += this.vx;
                this.y += this.vy;
                
                this.life++;
                
                if (this.x < 0 || this.x > width || this.y < 0 || this.y > height || this.life > this.maxLife) {
                    this.reset();
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.alpha;
                ctx.fill();
            }
        }

        function resize() {
            const rect = artCanvas.getBoundingClientRect();
            width = rect.width || 400;
            height = rect.height || 400;
            
            artCanvas.width = width * window.devicePixelRatio;
            artCanvas.height = height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            
            numParticles = Math.min(220, Math.floor(width * 0.5));
            if (vectorVal) vectorVal.textContent = numParticles;
            
            // Reinitialize particles to fit the new size
            initParticles();
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
            
            // Clear trail buffer
            ctx.fillStyle = 'rgb(10, 10, 15)';
            ctx.fillRect(0, 0, width, height);
        }

        function setPalette(index) {
            activePaletteIndex = index;
            if (seedVal) seedVal.textContent = PALETTES[index].name;
        }

        // Event listeners
        window.addEventListener('resize', resize);
        
        artCanvas.addEventListener('mousemove', (e) => {
            const rect = artCanvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        artCanvas.addEventListener('mouseleave', () => {
            mouse.x = -1000;
            mouse.y = -1000;
        });

        if (regenBtn) {
            regenBtn.addEventListener('click', () => {
                seed = Math.random() * 1000;
                const nextPalette = (activePaletteIndex + 1) % PALETTES.length;
                setPalette(nextPalette);
                initParticles();
                
                showToast(`Generative Mode: ${PALETTES[nextPalette].name}`, 'terminal');
                
                const icon = regenBtn.querySelector('i');
                if (icon) {
                    icon.style.transform = 'rotate(360deg)';
                    icon.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    setTimeout(() => {
                        icon.style.transform = 'none';
                        icon.style.transition = 'none';
                    }, 600);
                }
            });
        }

        // Initialize
        setPalette(0);
        resize();

        // Loop
        function animate() {
            ctx.fillStyle = 'rgba(10, 10, 15, 0.06)';
            ctx.fillRect(0, 0, width, height);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
});
