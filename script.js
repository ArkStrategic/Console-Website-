/**
 * ARK CONSOLE - DOPAMINE DESIGN SYSTEM
 * Interactive Animations & Effects
 *
 * Premium interactions that feel responsive and alive.
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initNavigation();
        initSmoothScroll();
        initScrollReveal();
        initParallaxOrbs();
        initMagneticButtons();
        initCounterAnimations();
        initFAQAccordion();
        initCalculator();
        initConsoleTyping();
        initProgressIndicator();
    }

    /**
     * Navigation
     * - Glass effect on scroll
     * - Mobile menu toggle
     */
    function initNavigation() {
        const nav = document.getElementById('nav');
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.querySelector('.nav-links');

        if (nav) {
            let lastScroll = 0;

            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;

                if (currentScroll > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }

                lastScroll = currentScroll;
            }, { passive: true });
        }

        if (mobileToggle && navLinks) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                navLinks.classList.toggle('mobile-open');

                // Animate hamburger to X
                const spans = mobileToggle.querySelectorAll('span');
                if (mobileToggle.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    if (spans[2]) spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
                } else {
                    spans[0].style.transform = '';
                    spans[1].style.opacity = '';
                    if (spans[2]) spans[2].style.transform = '';
                }
            });
        }
    }

    /**
     * Smooth Scroll
     * - Offset for fixed nav
     * - Eased animation
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Scroll Reveal
     * - Staggered animations for grid items
     * - Respects prefers-reduced-motion
     */
    function initScrollReveal() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const revealElements = document.querySelectorAll(
            '.axiom-card, .level, .module-card, .safety-gate, .feature-card, .flow-step, .flow-detail-card, .timeline-item, .tier-card, .how-step, .document, .boundary, .result-card'
        );

        if (!revealElements.length) return;

        // Add initial hidden state
        revealElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index % 6 * 0.1}s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index % 6 * 0.1}s`;
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -80px 0px'
        });

        revealElements.forEach(el => observer.observe(el));

        // Section headers
        const sectionHeaders = document.querySelectorAll('.section-header');
        sectionHeaders.forEach(header => {
            header.style.opacity = '0';
            header.style.transform = 'translateY(20px)';
            header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

            const headerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        headerObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            headerObserver.observe(header);
        });
    }

    /**
     * Parallax Orbs
     * - Mouse-responsive floating orbs
     * - Subtle depth effect
     */
    function initParallaxOrbs() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const orbs = document.querySelectorAll('.orb');
        if (!orbs.length) return;

        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        }, { passive: true });

        function animateOrbs() {
            currentX += (mouseX - currentX) * 0.05;
            currentY += (mouseY - currentY) * 0.05;

            orbs.forEach((orb, index) => {
                const depth = (index + 1) * 15;
                const translateX = currentX * depth;
                const translateY = currentY * depth;
                orb.style.transform = `translate(${translateX}px, ${translateY}px)`;
            });

            requestAnimationFrame(animateOrbs);
        }

        animateOrbs();
    }

    /**
     * Magnetic Buttons
     * - Buttons follow cursor slightly
     * - Creates premium feel
     */
    function initMagneticButtons() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const magneticBtns = document.querySelectorAll('.btn-primary, .btn-large');

        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    /**
     * Counter Animations
     * - Animates numbers on scroll
     * - Used for stats and pricing
     */
    function initCounterAnimations() {
        const counters = document.querySelectorAll('[data-counter]');
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const end = parseInt(target.dataset.counter);
                    const duration = 2000;
                    const startTime = performance.now();

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeProgress = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(easeProgress * end);

                        target.textContent = current.toLocaleString();

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            target.textContent = end.toLocaleString();
                        }
                    }

                    requestAnimationFrame(updateCounter);
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    /**
     * FAQ Accordion
     * - Smooth expand/collapse
     * - Only one open at a time
     */
    function initFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        if (!faqItems.length) return;

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');

            if (question && answer) {
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');

                    // Close all others
                    faqItems.forEach(other => {
                        other.classList.remove('active');
                        const otherAnswer = other.querySelector('.faq-answer');
                        if (otherAnswer) otherAnswer.style.maxHeight = '0';
                    });

                    // Toggle current
                    if (!isActive) {
                        item.classList.add('active');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }
                });
            }
        });
    }

    /**
     * ROI Calculator
     * - Interactive sliders
     * - Real-time calculation
     */
    function initCalculator() {
        const calculator = document.querySelector('.calculator');
        if (!calculator) return;

        const revenueSlider = document.getElementById('revenue-slider');
        const dealsSlider = document.getElementById('deals-slider');
        const tierSelect = document.getElementById('tier-select');

        const revenueValue = document.getElementById('revenue-value');
        const dealsValue = document.getElementById('deals-value');

        const monthlyFee = document.getElementById('monthly-fee');
        const annualCost = document.getElementById('annual-cost');
        const valueFee = document.getElementById('value-fee');
        const totalAnnual = document.getElementById('total-annual');

        function updateCalculator() {
            if (!revenueSlider || !dealsSlider) return;

            const revenue = parseInt(revenueSlider.value);
            const deals = parseInt(dealsSlider.value);
            const tier = tierSelect?.value || 'growth';

            // Update display values
            if (revenueValue) revenueValue.textContent = '$' + (revenue / 1000).toFixed(0) + 'K';
            if (dealsValue) dealsValue.textContent = deals;

            // Calculate fees based on tier
            let baseFee = 0;
            let feeRate = 0;
            let hurdle = 0;

            switch(tier) {
                case 'starter':
                    baseFee = 500;
                    feeRate = 0;
                    break;
                case 'growth':
                    baseFee = 1000;
                    feeRate = 0.01;
                    hurdle = 100000;
                    break;
                case 'scale':
                    baseFee = 2500;
                    feeRate = 0.008;
                    hurdle = 150000;
                    break;
                case 'enterprise':
                    baseFee = 5000;
                    feeRate = 0.005;
                    hurdle = 200000;
                    break;
            }

            const annualBase = baseFee * 12;
            const excessRevenue = Math.max(0, revenue * 12 - hurdle);
            const performanceFee = excessRevenue * feeRate;
            const total = annualBase + performanceFee;

            if (monthlyFee) monthlyFee.textContent = '$' + baseFee.toLocaleString();
            if (annualCost) annualCost.textContent = '$' + annualBase.toLocaleString();
            if (valueFee) valueFee.textContent = '$' + Math.round(performanceFee).toLocaleString();
            if (totalAnnual) totalAnnual.textContent = '$' + Math.round(total).toLocaleString();
        }

        if (revenueSlider) revenueSlider.addEventListener('input', updateCalculator);
        if (dealsSlider) dealsSlider.addEventListener('input', updateCalculator);
        if (tierSelect) tierSelect.addEventListener('change', updateCalculator);

        // Initial calculation
        updateCalculator();
    }

    /**
     * Console Typing Effect
     * - Typewriter effect for console preview
     * - Creates "live" feel
     */
    function initConsoleTyping() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const consoleBody = document.querySelector('.console-body');
        if (!consoleBody) return;

        const lines = consoleBody.querySelectorAll('.console-line');

        lines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.animation = `lineAppear 0.5s ease forwards ${0.3 + index * 0.2}s`;
        });
    }

    /**
     * Progress Indicator
     * - Shows scroll progress
     * - Thin bar at top of page
     */
    function initProgressIndicator() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
            z-index: 9999;
            transition: width 0.1s ease;
            width: 0%;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = (window.scrollY / scrollHeight) * 100;
            progressBar.style.width = scrollProgress + '%';
        }, { passive: true });
    }

    /**
     * Intersection Observer Utilities
     * - Add 'in-view' class when elements enter viewport
     */
    function observeElements(selector, callback) {
        const elements = document.querySelectorAll(selector);
        if (!elements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => observer.observe(el));
    }

})();

// Add some CSS animations dynamically for elements that need them
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes lineAppear {
        from {
            opacity: 0;
            transform: translateX(-10px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .nav-links.mobile-open {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        flex-direction: column;
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(20px);
        padding: 1rem;
        gap: 0.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .nav-links.mobile-open a {
        padding: 0.75rem 1rem;
        border-radius: 8px;
    }

    .nav-links.mobile-open a:hover {
        background: rgba(99, 102, 241, 0.1);
    }

    .nav-mobile-toggle span {
        transition: all 0.3s ease;
    }

    /* Slider track styling */
    input[type="range"]::-webkit-slider-runnable-track {
        background: linear-gradient(90deg, #6366f1 0%, #6366f1 var(--progress, 50%), rgba(255,255,255,0.1) var(--progress, 50%));
        border-radius: 4px;
    }
`;
document.head.appendChild(dynamicStyles);
