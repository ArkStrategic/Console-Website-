/**
 * ARK CONSOLE - AUTONOMOUS DEAL GOVERNANCE
 * Minimal, Conservative JavaScript
 *
 * Design philosophy: Calm, conservative, boring, hard to misuse.
 * JavaScript should enhance, not distract.
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initNavigation();
        initSmoothScroll();
        initScrollReveal();
    }

    /**
     * Navigation
     * - Adds scrolled class for background blur
     * - Handles mobile toggle
     */
    function initNavigation() {
        const nav = document.getElementById('nav');
        const mobileToggle = document.getElementById('mobileToggle');

        if (nav) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 20) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            }, { passive: true });
        }

        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
            });
        }
    }

    /**
     * Smooth Scroll
     * - Handles anchor links with offset for fixed nav
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
     * - Subtle fade-in for content sections
     * - Respects prefers-reduced-motion
     */
    function initScrollReveal() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const revealElements = document.querySelectorAll(
            '.axiom-card, .level, .module-card, .safety-gate, .feature-card, .flow-step, .flow-detail-card, .timeline-item'
        );

        if (!revealElements.length) return;

        // Add initial state
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
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
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    }

})();
