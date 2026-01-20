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

// Domain Feeds - Live operations per domain
class DomainFeeds {
    constructor() {
        this.domains = {
            workforce: {
                feed: 'workforce-feed',
                operations: [
                    'Shift assigned → Sarah M. → Station 5',
                    'Break scheduled → James L. → 15:30',
                    'Coverage optimized → Zone A → +2 staff',
                    'Task routed → Mike R. → Priority ticket',
                    'Schedule adjusted → Night shift → -1 staff',
                    'Performance logged → Team B → 94% efficiency',
                    'Training assigned → New hire → Module 3',
                    'Overtime approved → Lisa K. → 2 hours',
                    'Handoff coordinated → Shift change → seamless',
                    'Capacity balanced → All zones → optimal'
                ]
            },
            finance: {
                feed: 'finance-feed',
                operations: [
                    'Invoice paid → Vendor #3842 → $8,420',
                    'Expense approved → Operations → $1,250',
                    'Cash flow optimized → +$18k buffer',
                    'Payment scheduled → Payroll → $124,500',
                    'Budget reallocated → Marketing → +$5k',
                    'Reconciliation complete → Q4 books → clean',
                    'Fraud check passed → Transaction #9281',
                    'Tax payment queued → State → $12,400',
                    'Vendor negotiated → 8% discount → locked',
                    'AR collected → Client #847 → $34,200'
                ]
            },
            inventory: {
                feed: 'inventory-feed',
                operations: [
                    'Reorder triggered → SKU-7842 → 750 units',
                    'Supplier selected → Best price → GlobalCo',
                    'Stock transferred → Warehouse C → B',
                    'Demand forecast → Next week → +12%',
                    'Safety stock adjusted → SKU-1284 → +100',
                    'Dead stock flagged → 23 SKUs → review',
                    'PO generated → Supplier #42 → $28,400',
                    'Receiving scheduled → Tomorrow → Dock 3',
                    'Inventory counted → Zone D → verified',
                    'Shrinkage detected → Aisle 7 → flagged'
                ]
            },
            operations: {
                feed: 'operations-feed',
                operations: [
                    'Contract renewed → CloudHost → -12% cost',
                    'SLA monitored → 99.97% compliance',
                    'Process optimized → Shipping → +18%',
                    'Vendor scored → SupplyCo → A rating',
                    'Maintenance scheduled → HVAC → next week',
                    'Compliance verified → SOC 2 → passed',
                    'Workflow updated → Returns → automated',
                    'Integration synced → ERP → real-time',
                    'Report generated → Board deck → ready',
                    'Alert resolved → System health → green'
                ]
            }
        };
        this.totalOps = 2847;
        this.init();
    }

    init() {
        // Update each domain feed every 2-4 seconds (staggered)
        Object.keys(this.domains).forEach((domain, idx) => {
            setTimeout(() => {
                this.updateFeed(domain);
                setInterval(() => this.updateFeed(domain), 2500 + Math.random() * 2000);
            }, idx * 600);
        });

        // Update total ops counter
        setInterval(() => this.updateTotalOps(), 2000);
    }

    updateFeed(domainKey) {
        const domain = this.domains[domainKey];
        const feed = document.getElementById(domain.feed);
        if (!feed) return;

        const items = feed.querySelectorAll('.feed-item');
        const newOp = domain.operations[Math.floor(Math.random() * domain.operations.length)];

        // Remove 'new' class from existing items
        items.forEach(item => item.classList.remove('new'));

        // Create new item
        const newItem = document.createElement('div');
        newItem.className = 'feed-item new';
        newItem.textContent = newOp;

        // Add to top, remove last if more than 3
        feed.insertBefore(newItem, feed.firstChild);
        if (feed.children.length > 3) {
            feed.removeChild(feed.lastChild);
        }
    }

    updateTotalOps() {
        this.totalOps += Math.floor(Math.random() * 5) + 1;
        const el = document.getElementById('total-ops');
        if (el) {
            el.textContent = this.totalOps.toLocaleString();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('demo')) new AutonomousSystem();
    if (document.querySelector('.operations-grid')) new DomainFeeds();
});
