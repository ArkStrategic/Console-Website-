class AutonomousSystem {
    constructor() {
        this.stages = ['sense', 'analyze', 'decide', 'execute', 'learn'];
        this.currentStage = 0;
        this.decisions = 2847;
        this.operations = [
            { module: 'FINANCE', action: 'Processing payroll batch #4521', type: 'execute' },
            { module: 'FINANCE', action: 'Approving invoice CloudServ $12,400', type: 'execute' },
            { module: 'FINANCE', action: 'Reconciling Q4 accounts', type: 'analyze' },
            { module: 'INVENTORY', action: 'Reordering SKU-4528 (500 units)', type: 'execute' },
            { module: 'INVENTORY', action: 'Optimizing warehouse allocation', type: 'decide' },
            { module: 'INVENTORY', action: 'Scanning stock levels', type: 'sense' },
            { module: 'WORKFORCE', action: 'Scheduling shift rotation', type: 'execute' },
            { module: 'WORKFORCE', action: 'Routing ticket #892 to Team Alpha', type: 'decide' },
            { module: 'WORKFORCE', action: 'Analyzing productivity metrics', type: 'analyze' },
            { module: 'OPERATIONS', action: 'Monitoring vendor SLA compliance', type: 'sense' },
            { module: 'OPERATIONS', action: 'Adjusting pricing matrix', type: 'execute' },
            { module: 'OPERATIONS', action: 'Evaluating contract renewal', type: 'decide' },
            { module: 'INTELLIGENCE', action: 'Detecting revenue anomaly +$24K', type: 'analyze' },
            { module: 'INTELLIGENCE', action: 'Updating prediction models', type: 'learn' },
            { module: 'INTELLIGENCE', action: 'Scanning market signals', type: 'sense' }
        ];
        this.streamLines = [];
        this.currentOp = null;
        this.init();
    }

    init() {
        this.updateStage();
        this.addStreamLine();
        setInterval(() => this.tick(), 800);
        setInterval(() => this.incrementDecisions(), 3000);
    }

    tick() {
        this.currentStage = (this.currentStage + 1) % this.stages.length;
        this.updateStage();

        if (Math.random() > 0.3) {
            this.addStreamLine();
        }
    }

    updateStage() {
        document.querySelectorAll('.loop-stage').forEach((el, idx) => {
            el.classList.toggle('active', idx === this.currentStage);
        });
    }

    addStreamLine() {
        const op = this.operations[Math.floor(Math.random() * this.operations.length)];
        const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const isExecuting = Math.random() > 0.7;

        this.streamLines.unshift({
            time,
            module: op.module,
            action: op.action,
            status: isExecuting ? 'running' : 'auto',
            executing: isExecuting
        });

        // Complete previous executing items
        this.streamLines.forEach((line, idx) => {
            if (idx > 0 && line.executing) {
                line.status = 'auto';
                line.executing = false;
            }
        });

        this.streamLines = this.streamLines.slice(0, 12);
        this.renderStream();
    }

    renderStream() {
        const feed = document.getElementById('stream-feed');
        if (!feed) return;

        feed.innerHTML = this.streamLines.map((line, i) => `
            <div class="stream-line ${line.executing ? 'executing' : 'complete'}">
                <span class="stream-time">${line.time}</span>
                <span class="stream-module">${line.module}</span>
                <span class="stream-action">${line.action}</span>
                <span class="stream-status ${line.status}">${line.status === 'running' ? 'RUNNING' : 'AUTO'}</span>
            </div>
        `).join('');
    }

    incrementDecisions() {
        this.decisions += Math.floor(Math.random() * 3) + 1;
        const el = document.getElementById('decisions-count');
        if (el) {
            el.textContent = this.decisions.toLocaleString();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('demo')) new AutonomousSystem();
});
