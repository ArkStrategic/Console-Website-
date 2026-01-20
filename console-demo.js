class AutonomousDemo {
    constructor() {
        this.stages = ['sense', 'analyze', 'decide', 'execute', 'learn'];
        this.currentStage = 0;
        this.decisions = 147;
        this.actions = [
            { action: 'Processing payroll disbursement', detail: 'FINANCE → $47,500 to 23 employees', stage: 'execute' },
            { action: 'Reordering inventory SKU-4528', detail: 'INVENTORY → 500 units from Supplier A', stage: 'execute' },
            { action: 'Optimizing shift schedule', detail: 'WORKFORCE → Reallocating 3 team members', stage: 'decide' },
            { action: 'Analyzing cash flow anomaly', detail: 'INTELLIGENCE → Q4 variance detected', stage: 'analyze' },
            { action: 'Monitoring vendor contracts', detail: 'OPERATIONS → 12 contracts scanned', stage: 'sense' },
            { action: 'Updating prediction models', detail: 'LEARNING → Accuracy improved 0.3%', stage: 'learn' },
            { action: 'Approving invoice #2847', detail: 'FINANCE → $12,400 to CloudServ Inc', stage: 'execute' },
            { action: 'Routing support ticket #892', detail: 'SUPPORT → Assigned to Team Alpha', stage: 'decide' },
            { action: 'Detecting revenue opportunity', detail: 'INTELLIGENCE → $24K upsell identified', stage: 'analyze' },
            { action: 'Adjusting pricing matrix', detail: 'OPERATIONS → 3 SKUs updated', stage: 'execute' }
        ];
        this.feedItems = [];
        this.init();
    }

    init() {
        this.updateStage();
        setInterval(() => this.cycle(), 2000);
    }

    cycle() {
        this.currentStage = (this.currentStage + 1) % this.stages.length;
        this.updateStage();

        if (this.currentStage === 3) { // execute stage
            this.decisions++;
            document.getElementById('decisions-made').textContent = this.decisions;
            this.addFeedItem();
        }
    }

    updateStage() {
        const stageName = this.stages[this.currentStage];

        // Update cycle visualization
        document.querySelectorAll('.cycle-stage').forEach((el, idx) => {
            el.classList.toggle('active', idx === this.currentStage);
        });

        // Update current action
        const action = this.actions.find(a => a.stage === stageName) || this.actions[0];
        const actionText = document.getElementById('action-text');
        if (actionText) {
            actionText.style.opacity = '0';
            setTimeout(() => {
                actionText.textContent = action.action;
                actionText.style.opacity = '1';
            }, 200);
        }
    }

    addFeedItem() {
        const action = this.actions[Math.floor(Math.random() * this.actions.length)];
        const icons = {
            FINANCE: '◈',
            INVENTORY: '◎',
            WORKFORCE: '○',
            OPERATIONS: '▸',
            INTELLIGENCE: '◇',
            SUPPORT: '●',
            LEARNING: '◉'
        };

        const module = action.detail.split('→')[0].trim();
        const icon = icons[module] || '◈';

        this.feedItems.unshift({
            icon,
            action: action.action,
            detail: action.detail
        });

        this.feedItems = this.feedItems.slice(0, 6);
        this.renderFeed();
    }

    renderFeed() {
        const feed = document.getElementById('auto-feed');
        if (!feed) return;

        feed.innerHTML = this.feedItems.map((item, i) => `
            <div class="auto-feed-item" style="animation-delay: ${i * 0.05}s">
                <span class="feed-icon">${item.icon}</span>
                <div class="feed-content">
                    <div class="feed-action">${item.action}</div>
                    <div class="feed-detail">${item.detail}</div>
                </div>
                <span class="feed-badge">AUTO</span>
            </div>
        `).join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('demo')) new AutonomousDemo();
});
