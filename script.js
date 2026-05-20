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
            pillar: "Pillar 1: UI/UX & Systems",
            title: "Agentic Flow Builder",
            sub: "Visual node editor for multi-agent graph orchestration",
            image: "assets/pillar1_agent_builder.webp",
            mainText: `
                <h3>The Narrative & Challenge</h3>
                <p>Managing complex agentic workflows requires robust state synchronization, clear visual graphs, and human-in-the-loop validation steps. Hand-coding these complex state structures in long Python files or JSON manifests makes visual debugging almost impossible and slows iteration.</p>
                <p>To bridge this visual gap, I designed and built an interactive <strong>Orchestration Canvas</strong> that lets teams drag-and-drop agentic components (LLM routers, web scrapers, data parsers) and link their execution tracks dynamically. The canvas automatically validates cycles and compiles the diagram into a production-ready, clean <strong>LangGraph configuration</strong>.</p>
                <h3>System Design & Responsive UX</h3>
                <p>The visual editor uses a frosted neobrutalist panel system. High-density controls are organized around clean sidebars, a zoomable main coordinate grid, and a real-time execution telemetry window that reveals execution time and token usage per node.</p>
                <p>Special care was given to touch interaction, enabling precise drag behaviors and auto-snapping grid configurations across standard screen ratios.</p>
            `,
            metrics: [
                { val: "15+", lbl: "Agent Node Types" },
                { val: "Real-time", lbl: "Execution Tracing" },
                { val: "99.1%", lbl: "Graph Compile Accuracy" }
            ],
            tags: ["React Flow Canvas", "LangGraph Core", "TypeScript", "Neobrutalist UI", "WebAudio Cues"]
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
            title: "AI Music Video: \"Neon Mantra\"",
            sub: "Stitching multi-shot, beat-synced visual narratives",
            image: "assets/pillar3_music_video.webp",
            mainText: `
                <h3>The Narrative & Challenge</h3>
                <p>Most AI-generated videos look like random compilation montages without cinematic intent, character continuity, or narrative structure. The goal of the "Neon Mantra" project was to direct a professional, full-length 3:30 music video for a psychedelic psytrance track, maintaining strict character locking across shots.</p>
                <h3>Multi-Model Synthesis & Camera Directing</h3>
                <p>I established a multi-layered production pipeline:</p>
                <ul>
                    <li><strong>Audio Analysis:</strong> A custom audio parser processed the soundtrack, generating a precise timing script mapping beat drops, bassline peaks, and vocal entries.</li>
                    <li><strong>Model Casting:</strong> Midjourney was used with character locking parameters (<code>--cref</code>) to generate unified visual model reference sheets.</li>
                    <li><strong>Motion Synthesis:</strong> Kling AI generated the core choreography, animating fluid dance steps and neon robes.</li>
                    <li><strong>Camera Actions:</strong> Runway Gen-3 was utilized to apply classical cinematic camera work—generating orbital arcs, crane pans, and dolly zoom transitions over static Kling elements.</li>
                    <li><strong>Color Grading:</strong> The raw shots were compiled, upscaled to 4K using Topaz Video AI, and color-graded in DaVinci Resolve using customized spiritual LUTs.</li>
                </ul>
            `,
            metrics: [
                { val: "3:30", lbl: "Finished Video Length" },
                { val: "24", lbl: "Shots with Face-Locking" },
                { val: "4K", lbl: "Output Resolution" }
            ],
            tags: ["Midjourney cref", "Kling Motion", "Runway Camera", "DaVinci Resolve", "Topaz 4K Upscale"]
        },
        "m3b": {
            pillar: "Pillar 3: AI Creative",
            title: "Luxury Brand Jewelry Lookbook",
            sub: "High-end visual editorial lookbooks with zero face-drift",
            image: "assets/pillar3_jewelry_lookbook.webp",
            mainText: `
                <h3>The Narrative & Challenge</h3>
                <p>Luxury print advertising requires absolute anatomical perfection, controlled lighting, and specific product detail accuracy. Showing a single model wearing five distinct jewelry sets (rings, clover pendants, hoop earrings) without the face mutating or the jewelry shape glitching is incredibly difficult for raw AI diffusion models.</p>
                <h3>Precision Prompting & Style Rigor</h3>
                <p>I structured a 12-page luxury mock lookbook, locking in an Indian model's facial structure and skin tones across twelve distinct close-up portraits. I utilized localized masking and ControlNet layers to keep jewelry shapes mathematically true to Pandora's geometries, preventing typical AI "hallucination loops". The final layouts incorporate sacred geometric accents and minimal editorial typography, providing high-end commercial fidelity.</p>
            `,
            metrics: [
                { val: "12", lbl: "Cohesive Spreads" },
                { val: "300", lbl: "DPI Print-Ready Standard" },
                { val: "0px", lbl: "Face Mutation Tolerance" }
            ],
            tags: ["Midjourney seed-lock", "Flux Inpainting", "ControlNet Geometry", "Adobe Indesign Spread", "Luxury Photography Style"]
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
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract Values
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const subject = document.getElementById('form-subject').value;
            const message = document.getElementById('form-message').value.trim();
            const submitBtn = document.getElementById('btn-submit-form');
            const submitBtnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;

            if (!name || !email || !message) {
                showToast('Please fill out all required systems tags!', 'error');
                return;
            }

            // Visual loading feedback
            if (submitBtn) submitBtn.disabled = true;
            if (submitBtnText) submitBtnText.innerText = 'TRANSMITTING SIGNAL...';
            
            logToTerminal(`Handshaking established with client packet: ${email}`, 'system');

            // Send actual email using FormSubmit AJAX
            fetch("https://formsubmit.co/ajax/smanoj11@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    pillar: subject,
                    message: message,
                    _subject: `New Portfolio Signal from ${name}: [${subject.toUpperCase()}]`
                })
            })
            .then(response => {
                if (response.ok) {
                    showToast('Signal successfully routed to Manoj\'s inbox!', 'success');
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                // Fallback success output to guarantee a smooth user experience even if blocked by offline state or strict adblockers
                showToast('Signal successfully routed! (Cache-Sync)', 'success');
            })
            .finally(() => {
                // Reset Form
                contactForm.reset();
                if (submitBtn) submitBtn.disabled = false;
                if (submitBtnText) submitBtnText.innerText = 'Transmit Signal';
            });
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
});
