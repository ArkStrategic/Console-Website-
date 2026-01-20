class ConsoleDemo {
    constructor() {
        this.decisions = [
            { title: 'REORDER: SKU-4528', module: 'INVENTORY', time: '2m ago', tag: 'auto' },
            { title: 'SCHEDULE: Shift optimization', module: 'WORKFORCE', time: '5m ago', tag: 'auto' },
            { title: 'RESOLVE: Ticket #1847', module: 'SUPPORT', time: '8m ago', tag: 'auto' },
            { title: 'APPROVE: Invoice #2341', module: 'FINANCE', time: '12m ago', tag: 'human' },
            { title: 'ROUTE: Order #7823', module: 'OPERATIONS', time: '15m ago', tag: 'auto' },
            { title: 'FLAG: Anomaly detected', module: 'INTELLIGENCE', time: '18m ago', tag: 'auto' },
            { title: 'ADJUST: Pricing matrix', module: 'FINANCE', time: '22m ago', tag: 'auto' },
            { title: 'DISPATCH: Team Alpha', module: 'WORKFORCE', time: '25m ago', tag: 'auto' }
        ];
        this.health = 94;
        this.autonomy = 87;
        this.revenue = 1404000;
        this.decisionCount = 147;
        this.init();
    }

    init() {
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
        this.renderDecisions();
        setInterval(() => this.cycleDecisions(), 4000);
        setInterval(() => this.updateMetrics(), 3000);
    }

    updateTime() {
        const el = document.getElementById('status-time');
        if (el) {
            el.textContent = new Date().toLocaleTimeString('en-US', { hour12: false });
        }
    }

    renderDecisions() {
        const feed = document.getElementById('decision-feed');
        if (!feed) return;
        feed.innerHTML = this.decisions.slice(0, 4).map(d => `
            <div class="feed-item">
                <span class="feed-title">${d.title}</span>
                <span class="feed-module">${d.module}</span>
                <span class="feed-time">${d.time}</span>
                <span class="feed-tag ${d.tag}">${d.tag.toUpperCase()}</span>
            </div>
        `).join('');
    }

    cycleDecisions() {
        const newDecisions = [
            { title: 'PROCESS: Payment batch #892', module: 'FINANCE', time: 'just now', tag: 'auto' },
            { title: 'OPTIMIZE: Route efficiency', module: 'OPERATIONS', time: 'just now', tag: 'auto' },
            { title: 'UPDATE: Inventory levels', module: 'INVENTORY', time: 'just now', tag: 'auto' },
            { title: 'ALERT: Threshold reached', module: 'INTELLIGENCE', time: 'just now', tag: 'auto' },
            { title: 'ASSIGN: Support ticket', module: 'WORKFORCE', time: 'just now', tag: 'auto' }
        ];
        const newItem = newDecisions[Math.floor(Math.random() * newDecisions.length)];
        this.decisions.unshift(newItem);
        this.decisions = this.decisions.slice(0, 8);
        this.decisions.forEach((d, i) => {
            if (i > 0) d.time = this.formatTime(i);
        });
        this.renderDecisions();
        this.decisionCount++;
        const subEl = document.getElementById('autonomy-sub');
        if (subEl) {
            subEl.textContent = `${this.decisionCount} decisions / 3 escalations`;
        }
    }

    formatTime(index) {
        const times = ['just now', '2m ago', '5m ago', '8m ago', '12m ago', '15m ago', '18m ago', '22m ago'];
        return times[index] || '25m ago';
    }

    updateMetrics() {
        this.health = Math.min(99, Math.max(90, this.health + (Math.random() - 0.4) * 2));
        this.autonomy = Math.min(95, Math.max(82, this.autonomy + (Math.random() - 0.3) * 1.5));
        this.revenue += Math.floor(Math.random() * 5000);

        this.animateValue('sys-health', Math.round(this.health) + '%');
        this.animateValue('sys-autonomy', Math.round(this.autonomy) + '%');
        this.animateValue('health-value', Math.round(this.health) + '%');
        this.animateValue('autonomy-value', Math.round(this.autonomy) + '%');
        this.animateValue('revenue-value', '$' + this.revenue.toLocaleString());

        const fill = document.getElementById('health-fill');
        if (fill) fill.style.width = this.health + '%';
    }

    animateValue(id, value) {
        const el = document.getElementById(id);
        if (!el) return;
        el.style.transition = 'opacity 0.15s';
        el.style.opacity = '0.5';
        setTimeout(() => {
            el.textContent = value;
            el.style.opacity = '1';
        }, 150);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('demo')) new ConsoleDemo();
});
