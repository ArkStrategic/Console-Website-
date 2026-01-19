/**
 * ARK CONSOLE - ROI CALCULATOR
 * Interactive calculator for pricing page
 */

(function() {
    'use strict';

    // Tier configurations
    const TIERS = {
        autopilot: {
            name: 'Autopilot',
            platformFee: 5000 * 12, // Annual
            valueShare: 0.05,
            hurdle: 0
        },
        fsd: {
            name: 'Full Self-Driving',
            platformPercent: 0.01, // 1% of EBITDA
            platformMin: 25000 * 12,
            platformMax: 250000 * 12,
            valueShare: 0.15,
            hurdle: 0.08
        },
        premium: {
            name: 'FSD Premium',
            platformPercent: 0.02, // 2% of EBITDA
            platformMin: 100000 * 12,
            platformMax: Infinity,
            valueShare: 0.20,
            hurdle: 0.10
        },
        enterprise: {
            name: 'Enterprise',
            platformPercent: 0.015, // 1.5% of EBITDA
            platformMin: 0,
            platformMax: Infinity,
            valueShare: 0.25,
            hurdle: 0.12
        }
    };

    // DOM Elements
    let ebitdaSlider, improvementSlider, tierSelect;
    let ebitdaValue, improvementValue;
    let valueCreatedEl, ourFeesEl, youKeepEl, roiEl, keepPercentEl;

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        // Get elements
        ebitdaSlider = document.getElementById('ebitda');
        improvementSlider = document.getElementById('improvement');
        tierSelect = document.getElementById('tierSelect');
        ebitdaValue = document.getElementById('ebitdaValue');
        improvementValue = document.getElementById('improvementValue');
        valueCreatedEl = document.getElementById('valueCreated');
        ourFeesEl = document.getElementById('ourFees');
        youKeepEl = document.getElementById('youKeep');
        roiEl = document.getElementById('roi');
        keepPercentEl = document.getElementById('keepPercent');

        if (!ebitdaSlider || !improvementSlider || !tierSelect) return;

        // Add event listeners
        ebitdaSlider.addEventListener('input', updateCalculator);
        improvementSlider.addEventListener('input', updateCalculator);
        tierSelect.addEventListener('change', updateCalculator);

        // Initialize FAQ
        initFAQ();

        // Initial calculation
        updateCalculator();
    }

    function updateCalculator() {
        const ebitda = parseFloat(ebitdaSlider.value) * 1000000; // Convert to dollars
        const improvement = parseFloat(improvementSlider.value) / 100;
        const tierKey = tierSelect.value;
        const tier = TIERS[tierKey];

        // Update display values
        ebitdaValue.textContent = ebitdaSlider.value;
        improvementValue.textContent = improvementSlider.value;

        // Calculate value created
        const valueCreated = ebitda * improvement;

        // Calculate platform fee
        let platformFee;
        if (tier.platformFee !== undefined) {
            // Fixed fee (Autopilot)
            platformFee = tier.platformFee;
        } else {
            // Percentage based
            platformFee = ebitda * tier.platformPercent;
            if (tier.platformMin) platformFee = Math.max(platformFee, tier.platformMin);
            if (tier.platformMax) platformFee = Math.min(platformFee, tier.platformMax);
        }

        // Calculate value share (only on improvement above hurdle)
        const improvementAboveHurdle = Math.max(0, improvement - tier.hurdle);
        const valueAboveHurdle = ebitda * improvementAboveHurdle;
        const valueShareFee = valueAboveHurdle * tier.valueShare;

        // Total fees
        const totalFees = platformFee + valueShareFee;

        // You keep
        const youKeep = valueCreated - valueShareFee; // Platform fee is separate cost

        // ROI
        const roi = totalFees > 0 ? (youKeep / totalFees) * 100 : 0;

        // Keep percentage
        const keepPercent = valueCreated > 0 ? (youKeep / valueCreated) * 100 : 0;

        // Update display
        valueCreatedEl.textContent = formatCurrency(valueCreated);
        ourFeesEl.textContent = formatCurrency(totalFees);
        youKeepEl.textContent = formatCurrency(youKeep);
        roiEl.textContent = Math.round(roi) + '%';
        keepPercentEl.textContent = Math.round(keepPercent) + '% of value created';
    }

    function formatCurrency(value) {
        if (value >= 1000000) {
            return '$' + (value / 1000000).toFixed(2) + 'M';
        } else if (value >= 1000) {
            return '$' + Math.round(value / 1000) + 'K';
        } else {
            return '$' + Math.round(value);
        }
    }

    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    // Close other items
                    faqItems.forEach(other => {
                        if (other !== item) {
                            other.classList.remove('active');
                        }
                    });
                    // Toggle current
                    item.classList.toggle('active');
                });
            }
        });
    }

})();
