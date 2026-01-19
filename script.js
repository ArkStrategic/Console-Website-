/**
 * ARK CONSOLE - AUTONOMOUS BUSINESS INFRASTRUCTURE
 * Interactive JavaScript
 */

(function() {
    'use strict';

    // ============================================
    // INITIALIZATION
    // ============================================

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initCursorGlow();
        initNavigation();
        initParticles();
        initCounters();
        initScrollReveal();
        initSmoothScroll();
        initAgentAnimations();
    }

    // ============================================
    // CURSOR GLOW EFFECT
    // ============================================

    function initCursorGlow() {
        const cursorGlow = document.getElementById('cursorGlow');
        if (!cursorGlow) return;

        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animate() {
            const ease = 0.15;
            currentX += (mouseX - currentX) * ease;
            currentY += (mouseY - currentY) * ease;

            cursorGlow.style.left = currentX + 'px';
            cursorGlow.style.top = currentY + 'px';

            requestAnimationFrame(animate);
        }

        animate();
    }

    // ============================================
    // NAVIGATION
    // ============================================

    function initNavigation() {
        const nav = document.getElementById('nav');
        const mobileToggle = document.getElementById('mobileToggle');
        let lastScroll = 0;

        // Scroll behavior
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });

        // Mobile toggle
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                // Add mobile menu logic here
            });
        }
    }

    // ============================================
    // PARTICLE SYSTEM
    // ============================================

    function initParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        const particleCount = 50;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            createParticle(container, particles);
        }

        function createParticle(container, particles) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(0, 212, 255, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: 0;
                transition: opacity 0.3s;
            `;

            container.appendChild(particle);

            const data = {
                element: particle,
                x: Math.random() * 100,
                y: Math.random() * 100,
                speedX: (Math.random() - 0.5) * 0.1,
                speedY: (Math.random() - 0.5) * 0.1 - 0.05,
                opacity: Math.random() * 0.5 + 0.2
            };

            particles.push(data);

            // Fade in
            setTimeout(() => {
                particle.style.opacity = data.opacity;
            }, Math.random() * 2000);
        }

        function animateParticles() {
            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;

                // Wrap around
                if (p.x < 0) p.x = 100;
                if (p.x > 100) p.x = 0;
                if (p.y < 0) p.y = 100;
                if (p.y > 100) p.y = 0;

                p.element.style.left = p.x + '%';
                p.element.style.top = p.y + '%';
            });

            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }

    // ============================================
    // ANIMATED COUNTERS
    // ============================================

    function initCounters() {
        const counters = document.querySelectorAll('.stat-value');
        let observed = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !observed) {
                    observed = true;
                    animateCounters(counters);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    function animateCounters(counters) {
        counters.forEach(counter => {
            const target = parseFloat(counter.dataset.value);
            const duration = 2000;
            const start = performance.now();
            const isDecimal = target % 1 !== 0;

            function update(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function (ease-out-quart)
                const eased = 1 - Math.pow(1 - progress, 4);

                const current = target * eased;

                if (isDecimal) {
                    counter.textContent = current.toFixed(2);
                } else {
                    counter.textContent = Math.round(current);
                }

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }

            requestAnimationFrame(update);
        });
    }

    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================

    function initScrollReveal() {
        const revealElements = document.querySelectorAll(
            '.problem-item, .step, .capability-card, .agent, .vision-text p, .vision-quote'
        );

        revealElements.forEach(el => el.classList.add('reveal'));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    }

    // ============================================
    // SMOOTH SCROLL
    // ============================================

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const navHeight = document.getElementById('nav').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================
    // AGENT STATUS ANIMATIONS
    // ============================================

    function initAgentAnimations() {
        const agents = document.querySelectorAll('.agent');
        const statuses = {
            revenue: [
                'Optimizing pricing...',
                'Analyzing market data...',
                'Adjusting revenue model...',
                'Processing transactions...'
            ],
            ops: [
                'Scaling infrastructure...',
                'Deploying updates...',
                'Monitoring systems...',
                'Optimizing resources...'
            ],
            support: [
                'Resolving 847 tickets...',
                'Analyzing sentiment...',
                'Routing inquiries...',
                'Updating knowledge base...'
            ]
        };

        agents.forEach(agent => {
            const type = agent.dataset.agent;
            const statusEl = agent.querySelector('.agent-status');

            if (type && statuses[type] && statusEl) {
                let index = 0;

                setInterval(() => {
                    index = (index + 1) % statuses[type].length;
                    statusEl.style.opacity = 0;

                    setTimeout(() => {
                        statusEl.textContent = statuses[type][index];
                        statusEl.style.opacity = 1;
                    }, 200);
                }, 3000);
            }
        });
    }

    // ============================================
    // CONSOLE TYPING EFFECT (Enhancement)
    // ============================================

    function initConsoleTyping() {
        const typingLines = document.querySelectorAll('.console-line');

        typingLines.forEach((line, index) => {
            const text = line.querySelector('.console-text');
            if (!text) return;

            const originalText = text.textContent;
            text.textContent = '';

            setTimeout(() => {
                typeText(text, originalText, 0, 50);
            }, (index + 1) * 500);
        });
    }

    function typeText(element, text, index, speed) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            setTimeout(() => typeText(element, text, index + 1, speed), speed);
        }
    }

    // ============================================
    // MAGNETIC BUTTONS (Premium feel)
    // ============================================

    function initMagneticButtons() {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }

    // Initialize magnetic buttons after DOM is ready
    document.addEventListener('DOMContentLoaded', initMagneticButtons);

    // ============================================
    // PERFORMANCE: RAF THROTTLE
    // ============================================

    function throttleRAF(callback) {
        let requestId = null;

        return function(...args) {
            if (requestId === null) {
                requestId = requestAnimationFrame(() => {
                    callback.apply(this, args);
                    requestId = null;
                });
            }
        };
    }

    // ============================================
    // ACCESSIBILITY: Reduced Motion
    // ============================================

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.documentElement.style.setProperty('--transition-fast', '0ms');
        document.documentElement.style.setProperty('--transition-base', '0ms');
        document.documentElement.style.setProperty('--transition-slow', '0ms');
    }

})();
