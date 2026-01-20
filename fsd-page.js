// FSD Portal - Subtle Animations

class FSDPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollReveal();
        this.animateOrbitNodes();
        this.setupJourneyProgress();
    }

    setupScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        // Add reveal class to sections
        document.querySelectorAll('.fsd-section, .fsd-stats-banner').forEach(section => {
            section.classList.add('reveal');
            observer.observe(section);
        });
    }

    animateOrbitNodes() {
        const nodes = document.querySelectorAll('.orbit-node');
        let activeIndex = 0;

        setInterval(() => {
            nodes.forEach((node, i) => {
                node.style.borderColor = i === activeIndex ? '#00d26a' : '#333';
                node.style.color = i === activeIndex ? '#00d26a' : '#666';
            });
            activeIndex = (activeIndex + 1) % nodes.length;
        }, 1600);
    }

    setupJourneyProgress() {
        const journeyItems = document.querySelectorAll('.journey-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate progress through journey when visible
                    this.animateJourney(journeyItems);
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });

        const journeySection = document.querySelector('.fsd-journey-section');
        if (journeySection) observer.observe(journeySection);
    }

    animateJourney(items) {
        items.forEach((item, i) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, i * 200);
        });
    }
}

// Add reveal animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .reveal.visible {
        opacity: 1;
        transform: translateY(0);
    }
    .journey-item {
        opacity: 0;
        transform: translateX(-20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new FSDPage();
});
