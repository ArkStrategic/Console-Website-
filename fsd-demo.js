class FSDDemo {
    constructor() {
        this.stages = ['sense', 'perceive', 'decide', 'act', 'learn'];
        this.currentStage = 0;
        this.cycleCount = 0;
        this.decisions = [];
        this.decisionId = 0;
        this.stageElements = document.querySelectorAll('.fsd-stage');
        this.consoleOutput = document.getElementById('console-output');
        this.decisionsList = document.getElementById('decisions-list');
        this.metrics = {
            burn: { value: 847, delta: -12 },
            runway: { value: 18.4, delta: 3.2 },
            efficiency: { value: 94.2, delta: 8.1 },
            savings: { value: 2.4, delta: 0.18 }
        };
        this.logMessages = {
            sense: [
                'Pulling data from QuickBooks…',
                'Syncing Gusto payroll records…',
                'Fetching Plaid transactions…',
                'Scanning 847 vendor contracts…',
                'Monitoring real-time cash flow…'
            ],
            perceive: [
                'Analyzing burn rate patterns…',
                'Detecting anomaly in Q4 projections…',
                'Mapping vendor spend distribution…',
                'Calculating runway scenarios…',
                'Building employee performance matrix…'
            ],
            decide: [
                'Evaluating cost reduction options…',
                'Scoring vendor renegotiation potential…',
                'Assessing workforce optimization…',
                'Prioritizing by ROI impact…',
                'Running risk assessment models…'
            ],
            act: [
                'Executing approved decisions…',
                'Sending vendor renegotiation email…',
                'Adjusting payment schedules…',
                'Initiating contract renewal…',
                'Processing disbursement request…'
            ],
            learn: [
                'Recording outcome metrics…',
                'Updating prediction models…',
                'Adjusting confidence scores…',
                'Refining decision weights…',
                'Archiving to evidence log…'
            ]
        };
        this.decisionTypes = [
            { title: 'Renegotiate AWS Contract', meta: 'Potential savings: $48K/yr', icon: '◈' },
            { title: 'Optimize SaaS Stack', meta: '3 redundant subscriptions', icon: '◇' },
            { title: 'Adjust Payment Terms', meta: 'Net-60 opportunity', icon: '○' },
            { title: 'Vendor Consolidation', meta: '2 vendors → 1 vendor', icon: '◎' },
            { title: 'Revenue Collection', meta: '45-day overdue: $125K', icon: '▸' }
        ];
        this.init();
    }

    init() {
        this.runCycle();
    }

    async runCycle() {
        while (true) {
            for (let i = 0; i < this.stages.length; i++) {
                this.currentStage = i;
                await this.runStage(this.stages[i]);
            }
            this.cycleCount++;
            this.updateMetrics();
        }
    }

    async runStage(stage) {
        this.stageElements.forEach((el, idx) => el.classList.toggle('active', idx === this.currentStage));
        const logs = this.logMessages[stage];
        const numLogs = 2 + Math.floor(Math.random() * 2);
        for (let i = 0; i < numLogs; i++) {
            this.addLog(stage, logs[Math.floor(Math.random() * logs.length)]);
            await this.sleep(600 + Math.random() * 400);
        }
        if (stage === 'decide') this.addDecision();
        else if (stage === 'act') this.executeDecision();
        else if (stage === 'learn') this.completeDecision();
        await this.sleep(500);
    }

    addLog(stage, text, tag = null) {
        const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const icons = { sense: '◎', perceive: '◈', decide: '◇', act: '▸', learn: '○' };
        const line = document.createElement('div');
        line.className = `log-line ${stage}`;
        line.innerHTML = `<span class="log-time">${time}</span><span class="log-icon">${icons[stage]}</span><span class="log-text">${text}</span>${tag ? `<span class="log-tag ${tag.class}">${tag.text}</span>` : ''}`;
        this.consoleOutput.appendChild(line);
        this.consoleOutput.scrollTop = this.consoleOutput.scrollHeight;
        while (this.consoleOutput.children.length > 20) this.consoleOutput.removeChild(this.consoleOutput.firstChild);
    }

    addDecision() {
        const type = this.decisionTypes[Math.floor(Math.random() * this.decisionTypes.length)];
        this.decisions.unshift({ id: ++this.decisionId, ...type, status: 'pending' });
        this.renderDecisions();
        this.addLog('decide', `Decision queued: ${type.title}`, { text: 'Pending', class: 'pending' });
    }

    executeDecision() {
        const pending = this.decisions.find(d => d.status === 'pending');
        if (pending) {
            pending.status = 'executing';
            this.renderDecisions();
            this.addLog('act', `Executing: ${pending.title}`, { text: 'Running', class: 'executing' });
        }
    }

    completeDecision() {
        const executing = this.decisions.find(d => d.status === 'executing');
        if (executing) {
            executing.status = 'completed';
            this.renderDecisions();
            this.addLog('learn', `Completed: ${executing.title}`, { text: 'Success', class: 'success' });
        }
        this.decisions = this.decisions.filter((d, i) => !(d.status === 'completed' && i > 3));
    }

    renderDecisions() {
        this.decisionsList.innerHTML = this.decisions.slice(0, 5).map(d => `<div class="decision-item ${d.status}"><span class="decision-icon">${d.icon}</span><div class="decision-content"><div class="decision-title">${d.title}</div><div class="decision-meta">${d.meta}</div></div><span class="decision-status">${d.status === 'executing' ? 'Running' : d.status}</span></div>`).join('');
    }

    updateMetrics() {
        this.metrics.burn.value = Math.max(500, this.metrics.burn.value - Math.random() * 20);
        this.metrics.runway.value = Math.min(36, this.metrics.runway.value + Math.random() * 0.3);
        this.metrics.efficiency.value = Math.min(99, this.metrics.efficiency.value + Math.random() * 0.5);
        this.metrics.savings.value += Math.random() * 0.1;
        this.animateMetric('metric-burn', `$${Math.round(this.metrics.burn.value)}K`);
        this.animateMetric('metric-runway', `${this.metrics.runway.value.toFixed(1)} mo`);
        this.animateMetric('metric-efficiency', `${this.metrics.efficiency.value.toFixed(1)}%`);
        this.animateMetric('metric-savings', `$${this.metrics.savings.value.toFixed(1)}M`);
    }

    animateMetric(id, value) {
        const el = document.getElementById(id);
        if (!el) return;
        const parent = el.closest('.metric');
        parent.classList.add('updating');
        setTimeout(() => el.textContent = value, 150);
        setTimeout(() => parent.classList.remove('updating'), 600);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('demo')) new FSDDemo();
});
