import { nodes, edges, parties, policyPopularity } from './data.js';

// ── Edge indexes ──────────────────────────────────────────────────────────────
const implementsEdges = {};
const solvesEdges = {};
const risksEdges = {};
const causesEdges = {};
const causedByEdges = {};

edges.forEach(e => {
  if (e.label === 'implements') (implementsEdges[e.source] ??= []).push(e.target);
  if (e.label === 'solves') (solvesEdges[e.source] ??= []).push(e.target);
  if (e.label === 'risks') (risksEdges[e.source] ??= []).push(e.target);
  if (e.label === 'causes') {
    (causesEdges[e.source] ??= []).push(e.target);
    (causedByEdges[e.target] ??= []).push(e.source);
  }
});

const nodeMap = {};
nodes.forEach(n => { nodeMap[n.id] = n; });
const problemNodes = nodes.filter(n => n.type === 'problem');
const policyNodes = nodes.filter(n => n.type === 'policy');

// ── Constants ─────────────────────────────────────────────────────────────────
const TOTAL_TURNS = 14;  // Q1 2026 → Q2 2029
const GOV_PARTY = 'party_labour';
const OTHER_PCT = 5;
const POLL_TOTAL = 100 - OTHER_PCT;

// March 2026 polling averages (YouGov/Opinium/aggregators)
const STARTING_POLLS = {
  party_reform: 25,
  party_labour: 18,
  party_conservative: 18,
  party_green: 17,
  party_libdem: 12,
};

const QUARTER_LABELS = [
  'Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026',
  'Q1 2027', 'Q2 2027', 'Q3 2027', 'Q4 2027',
  'Q1 2028', 'Q2 2028', 'Q3 2028', 'Q4 2028',
  'Q1 2029', 'Q2 2029',
  'Election',
];

const partyMap = {};
parties.forEach(p => { partyMap[p.id] = p; });

// ── Styles ────────────────────────────────────────────────────────────────────
const STYLE_ID = 'game-module-styles';

function injectStyles() {
  const existing = document.getElementById(STYLE_ID);
  if (existing) existing.remove();
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
.game-root {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr 1fr;
  gap: 12px;
  width: 100%;
  flex: 1;
  min-height: 0;
  padding: 12px;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #eee;
  overflow: auto;
}

/* ── Timeline bar ── */
.game-timeline {
  grid-column: 1 / -1;
  background: #16213e;
  border: 1px solid #2a2a4a;
  border-radius: 8px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
}
.game-timeline .turn-label {
  font-weight: 700;
  font-size: 14px;
  white-space: nowrap;
}
.game-timeline .date-label {
  color: #aaa;
  font-size: 13px;
  white-space: nowrap;
}
.game-timeline .progress-wrap {
  flex: 1;
  height: 8px;
  background: #2a2a4a;
  border-radius: 4px;
  overflow: hidden;
}
.game-timeline .progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  border-radius: 4px;
  transition: width 0.4s ease;
}

/* ── Policy card ── */
.game-policy-card {
  grid-column: 1;
  grid-row: 2 / 4;
  background: #16213e;
  border: 1px solid #2a2a4a;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  min-height: 0;
}
.game-policy-card h3 {
  margin: 0 0 8px;
  font-size: 18px;
  color: #fff;
  line-height: 1.3;
}
.game-policy-card .policy-desc {
  color: #bbb;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 14px;
}
.game-policy-card .stances-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
.game-policy-card .stance-badge {
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  border: 1px solid #333;
  background: #1a1a2e;
}
.game-policy-card .stance-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}
.game-policy-card .impacts-section {
  margin-bottom: 16px;
}
.game-policy-card .impacts-section h4 {
  margin: 0 0 6px;
  font-size: 13px;
  color: #aaa;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.game-policy-card .impact-item {
  font-size: 12px;
  padding: 2px 0;
  display: flex;
  align-items: center;
  gap: 5px;
}
.game-policy-card .impact-item.positive { color: #2ecc71; }
.game-policy-card .impact-item.negative { color: #e74c3c; }

/* ── Policy picker ── */
.policy-picker {
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #2a2a4a;
}
.policy-picker h4 {
  margin: 0 0 8px;
  font-size: 12px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.policy-pick-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  max-height: 120px;
  overflow-y: auto;
}
.policy-pick-item {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  border-radius: 4px;
  background: #1a1a2e;
  border: 1px solid #2a2a4a;
  cursor: pointer;
  font-size: 11px;
  color: #bbb;
  transition: background 0.15s, border-color 0.15s;
}
.policy-pick-item:hover {
  background: #252548;
  border-color: #444;
}
.policy-pick-item.selected {
  background: #252548;
  border-color: #5a5a8a;
  color: #fff;
  font-weight: 600;
}
.pick-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.pick-name {
  white-space: nowrap;
}
.policy-detail h3 {
  margin: 12px 0 8px;
}

.game-actions {
  margin-top: 16px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding-top: 14px;
  border-top: 1px solid #2a2a4a;
}
.game-actions button {
  flex: 1;
  min-width: 100px;
  padding: 10px 14px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.15s, transform 0.1s;
}
.game-actions button:hover { filter: brightness(1.15); }
.game-actions button:active { transform: scale(0.97); }
.btn-implement { background: #2ecc71; color: #111; }
.btn-reject { background: #e74c3c; color: #fff; }
.btn-skip { background: #2a2a4a; color: #aaa; border: 1px solid #444; }

/* ── Polling chart ── */
.game-polling {
  grid-column: 2;
  grid-row: 2;
  background: #16213e;
  border: 1px solid #2a2a4a;
  border-radius: 8px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.game-polling h4 {
  margin: 0 0 8px;
  font-size: 13px;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.game-polling canvas {
  flex: 1;
  width: 100%;
  min-height: 180px;
}

/* ── Problem tracker ── */
.game-problems {
  grid-column: 2;
  grid-row: 3;
  background: #16213e;
  border: 1px solid #2a2a4a;
  border-radius: 8px;
  padding: 14px;
  overflow-y: auto;
  min-height: 0;
}
.game-problems h4 {
  margin: 0 0 8px;
  font-size: 13px;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.game-prob-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 5px;
  font-size: 12px;
}
.game-prob-row .prob-label {
  width: 160px;
  min-width: 120px;
  color: #ccc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.game-prob-row .prob-bar-bg {
  flex: 1;
  height: 10px;
  background: #2a2a4a;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}
.game-prob-row .prob-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.4s ease, background 0.4s ease;
}
.game-prob-row .prob-delta {
  width: 44px;
  text-align: right;
  font-weight: 600;
  font-size: 11px;
}

/* ── Election overlay ── */
.game-election-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 15, 26, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: fadeInOverlay 0.5s ease;
}
@keyframes fadeInOverlay {
  from { opacity: 0; }
  to { opacity: 1; }
}
.election-card {
  background: #16213e;
  border: 1px solid #2a2a4a;
  border-radius: 12px;
  padding: 32px 40px;
  max-width: 480px;
  width: 90%;
  text-align: center;
}
.election-card h2 {
  font-size: 26px;
  margin: 0 0 4px;
}
.election-card .winner-label {
  font-size: 16px;
  margin-bottom: 20px;
  color: #aaa;
}
.election-results-grid {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 24px;
}
.election-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  padding: 6px 10px;
  border-radius: 6px;
  background: #1a1a2e;
}
.election-row.winner {
  border: 2px solid;
  background: #1a1a2e;
}
.election-row .e-party {
  width: 100px;
  font-weight: 700;
  text-align: left;
}
.election-row .e-poll {
  width: 50px;
  text-align: right;
  color: #aaa;
}
.election-row .e-seats {
  flex: 1;
  text-align: right;
  font-weight: 700;
}
.election-row .e-bar-bg {
  width: 100px;
  height: 8px;
  background: #2a2a4a;
  border-radius: 4px;
  overflow: hidden;
}
.election-row .e-bar-fill {
  height: 100%;
  border-radius: 4px;
}
.btn-play-again {
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px 28px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.15s;
}
.btn-play-again:hover { filter: brightness(1.2); }

/* ── Waiting / between-turn state ── */
.game-policy-card .waiting-msg {
  color: #888;
  font-style: italic;
  text-align: center;
  margin-top: 40px;
}

/* ── Party selection screen ── */
.game-party-select {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
  min-height: 0;
  padding: 32px 16px;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #eee;
  animation: fadeInOverlay 0.5s ease;
}
.game-party-select h2 {
  font-size: 28px;
  margin: 0 0 8px;
}
.game-party-select .party-select-desc {
  color: #aaa;
  font-size: 15px;
  margin-bottom: 24px;
  text-align: center;
  max-width: 480px;
  line-height: 1.5;
}
.game-party-select .party-select-note {
  color: #888;
  font-size: 12px;
  margin-bottom: 20px;
  text-align: center;
  font-style: italic;
}
.game-party-select .party-cards {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 700px;
}
.game-party-select .party-card {
  background: #1a1a2e;
  border: 2px solid #2a2a4a;
  border-radius: 10px;
  padding: 20px 18px;
  width: 120px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.15s, border-color 0.2s, box-shadow 0.2s;
}
.game-party-select .party-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}
.game-party-select .party-card .party-swatch {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 auto 10px;
}
.game-party-select .party-card .party-name {
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 6px;
}
.game-party-select .party-card .party-poll {
  font-size: 12px;
  color: #aaa;
}
.game-party-select .party-card .party-gov-tag {
  font-size: 10px;
  color: #f1c40f;
  margin-top: 6px;
  font-weight: 600;
}

/* ── Election player result banner ── */
.election-player-result {
  font-size: 20px;
  margin-bottom: 16px;
  font-weight: 700;
}
.election-row.player-party {
  outline: 2px solid rgba(255, 255, 255, 0.3);
  outline-offset: -2px;
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .game-root {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
    overflow: auto;
  }
  .game-policy-card { grid-column: 1; grid-row: 2; }
  .game-polling { grid-column: 1; grid-row: 3; min-height: 250px; }
  .game-problems { grid-column: 1; grid-row: 4; }
  .game-party-select .party-cards {
    gap: 10px;
  }
  .game-party-select .party-card {
    width: 100px;
    padding: 14px 12px;
  }
}
`;
  document.head.appendChild(style);
}

// ── Impact engine ─────────────────────────────────────────────────────────────

function computePolicyImpacts(policyId) {
  const helps = [];
  const hinders = [];

  // policy → implements → solutions → solves → problems (positive)
  const solutions = implementsEdges[policyId] || [];
  for (const solId of solutions) {
    const solved = solvesEdges[solId] || [];
    for (const probId of solved) {
      if (nodeMap[probId]?.type === 'problem') {
        helps.push(probId);
      }
    }
  }

  // policy → risks → future_problem → causes → problems (negative)
  const risked = risksEdges[policyId] || [];
  for (const fpId of risked) {
    const caused = causesEdges[fpId] || [];
    for (const probId of caused) {
      if (nodeMap[probId]?.type === 'problem') {
        hinders.push(probId);
      }
    }
  }

  return { helps: [...new Set(helps)], hinders: [...new Set(hinders)] };
}

function computeSeverityChanges(activePolicies) {
  const helpCounts = {};
  const hinderCounts = {};

  for (const polId of activePolicies) {
    const { helps, hinders } = computePolicyImpacts(polId);
    for (const pid of helps) helpCounts[pid] = (helpCounts[pid] || 0) + 1;
    for (const pid of hinders) hinderCounts[pid] = (hinderCounts[pid] || 0) + 1;
  }

  const changes = {};
  for (const prob of problemNodes) {
    const h = helpCounts[prob.id] || 0;
    const k = hinderCounts[prob.id] || 0;
    const net = h - k * 1.5;
    // Scale: each chain count ≈ 5% change
    let delta = Math.round(net * 5);
    delta = Math.max(-30, Math.min(20, delta));
    changes[prob.id] = delta;
  }
  return changes;
}

// ── Polling engine ────────────────────────────────────────────────────────────

function clonePolls(polls) {
  return Object.assign({}, polls);
}

function normalizePolls(polls) {
  const sum = Object.values(polls).reduce((a, b) => a + b, 0);
  if (sum === 0) return polls;
  for (const k of Object.keys(polls)) {
    polls[k] = Math.max(3, Math.min(55, polls[k] * POLL_TOTAL / sum));
  }
  // Re-normalize after clamp
  const sum2 = Object.values(polls).reduce((a, b) => a + b, 0);
  for (const k of Object.keys(polls)) {
    polls[k] = Math.round((polls[k] / sum2) * POLL_TOTAL * 10) / 10;
  }
  return polls;
}

function randRange(lo, hi) {
  return lo + Math.random() * (hi - lo);
}

function applyImplement(polls, policyId, severityChanges) {
  const newPolls = clonePolls(polls);
  const stances = policyPopularity[policyId] || {};

  for (const party of parties) {
    const stance = stances[party.id];
    if (party.id === GOV_PARTY) {
      // Government implementing policy — modest credit for action
      if (stance === 'support') newPolls[party.id] += 0.3;
      else if (stance === 'oppose') newPolls[party.id] -= 2.0;
      else newPolls[party.id] -= 0.1;
    } else {
      // Opposition parties react
      if (stance === 'oppose') {
        // Opposing government — energises their base, media coverage
        newPolls[party.id] += 0.6;
      } else if (stance === 'support') {
        newPolls[party.id] -= 0.1;
      }
    }
    newPolls[party.id] += randRange(-0.5, 0.5);
  }

  // Government bonus/penalty for problem effects
  const netImprovement = Object.values(severityChanges).reduce((s, v) => s + (v < 0 ? 1 : 0), 0);
  const netWorsening = Object.values(severityChanges).reduce((s, v) => s + (v > 0 ? 1 : 0), 0);
  // Solving problems is how governments rebuild trust — meaningful bonus
  if (netImprovement > 0) newPolls[GOV_PARTY] += Math.min(1.5, 0.3 * netImprovement);
  // Failures are salient and punished hard
  if (netWorsening > 0) newPolls[GOV_PARTY] -= 1.5 * netWorsening;

  // Government fatigue — incumbents bleed support over time
  newPolls[GOV_PARTY] -= 0.4;
  // Reform momentum — outsider protest vote advantage
  newPolls['party_reform'] = (newPolls['party_reform'] || 0) + 0.15;
  // Green momentum — youth enthusiasm
  newPolls['party_green'] = (newPolls['party_green'] || 0) + 0.1;

  return normalizePolls(newPolls);
}

function applyReject(polls, policyId) {
  const newPolls = clonePolls(polls);
  const stances = policyPopularity[policyId] || {};

  // Government rejecting a policy — looks indecisive
  newPolls[GOV_PARTY] -= 0.6;

  for (const party of parties) {
    const stance = stances[party.id];
    if (party.id !== GOV_PARTY && stance === 'support') {
      newPolls[party.id] += 0.4;
    }
    newPolls[party.id] += randRange(-0.3, 0.3);
  }

  // Background trends
  newPolls['party_reform'] = (newPolls['party_reform'] || 0) + 0.2;
  newPolls['party_green'] = (newPolls['party_green'] || 0) + 0.15;
  newPolls[GOV_PARTY] -= 0.2;

  return normalizePolls(newPolls);
}

function applySkip(polls) {
  const newPolls = clonePolls(polls);
  for (const party of parties) {
    newPolls[party.id] += randRange(-0.3, 0.3);
  }
  // Background trends: government fatigue, Reform/Green momentum
  newPolls[GOV_PARTY] -= 0.4;
  newPolls['party_reform'] = (newPolls['party_reform'] || 0) + 0.25;
  newPolls['party_green'] = (newPolls['party_green'] || 0) + 0.15;
  return normalizePolls(newPolls);
}

// ── Seat estimation ───────────────────────────────────────────────────────────
const TOTAL_SEATS = 650;

// FPTP seat efficiency — how well each party converts votes to seats
// Based on current electoral geography and vote distribution patterns
// Labour's 2024 efficiency was anomalous (Con/Ref split); it's eroding as
// urban voters shift to Greens and Red Wall voters shift to Reform
const SEAT_EFFICIENCY = {
  party_labour: 1.15,
  party_conservative: 0.95,
  party_reform: 0.55,
  party_libdem: 1.35,
  party_green: 0.2,
};

function estimateSeats(polls, usePR = false) {
  const sorted = parties.map(p => ({ id: p.id, pct: polls[p.id] }))
    .sort((a, b) => b.pct - a.pct);
  const leader = sorted[0];

  if (usePR) {
    // Proportional representation — seats roughly match vote share
    const totalPct = sorted.reduce((s, p) => s + p.pct, 0);
    const seats = {};
    let allocated = 0;
    for (const p of sorted) {
      seats[p.id] = Math.max(1, Math.round(TOTAL_SEATS * (p.pct / totalPct)));
      allocated += seats[p.id];
    }
    if (allocated !== TOTAL_SEATS) seats[leader.id] += TOTAL_SEATS - allocated;
    return seats;
  }

  // FPTP: calculate effective vote share (vote % × efficiency)
  const effective = {};
  let effTotal = 0;
  for (const p of sorted) {
    effective[p.id] = p.pct * (SEAT_EFFICIENCY[p.id] || 1.0);
    effTotal += effective[p.id];
  }

  // FPTP bonus: leading party gets disproportionate seat share
  const leaderPct = leader.pct;
  let leaderBonus;
  if (leaderPct >= 35) leaderBonus = 1.35;
  else if (leaderPct >= 30) leaderBonus = 1.25;
  else if (leaderPct >= 25) leaderBonus = 1.15;
  else leaderBonus = 1.08;

  effective[leader.id] *= leaderBonus;
  effTotal = Object.values(effective).reduce((a, b) => a + b, 0);

  // Allocate seats proportionally to effective share
  const seats = {};
  let allocated = 0;
  for (const p of sorted) {
    const share = effective[p.id] / effTotal;
    seats[p.id] = Math.max(1, Math.round(TOTAL_SEATS * share));
    allocated += seats[p.id];
  }

  // Adjust to hit exactly 650
  if (allocated !== TOTAL_SEATS) {
    seats[leader.id] += TOTAL_SEATS - allocated;
  }

  return seats;
}

// ── Chart drawing ─────────────────────────────────────────────────────────────

function drawPollingChart(canvas, history) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const W = rect.width;
  const H = rect.height;
  const pad = { top: 12, right: 70, bottom: 32, left: 36 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  ctx.clearRect(0, 0, W, H);

  // Grid
  ctx.strokeStyle = '#2a2a4a';
  ctx.lineWidth = 0.5;
  const yTicks = [0, 10, 20, 30, 40, 50];
  for (const v of yTicks) {
    const y = pad.top + chartH - (v / 50) * chartH;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + chartW, y);
    ctx.stroke();
    ctx.fillStyle = '#666';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(v + '%', pad.left - 4, y + 3);
  }

  // X-axis labels
  const totalPoints = Math.max(history.length, TOTAL_TURNS + 1);
  const xStep = chartW / TOTAL_TURNS;
  ctx.fillStyle = '#666';
  ctx.font = '9px sans-serif';
  ctx.textAlign = 'center';
  for (let i = 0; i <= TOTAL_TURNS; i += 4) {
    const x = pad.left + i * xStep;
    ctx.fillText(QUARTER_LABELS[i] || '', x, H - pad.bottom + 14);
    ctx.strokeStyle = '#222';
    ctx.beginPath();
    ctx.moveTo(x, pad.top);
    ctx.lineTo(x, pad.top + chartH);
    ctx.stroke();
  }

  // Draw lines for each party
  for (const party of parties) {
    if (history.length < 2) continue;
    ctx.strokeStyle = party.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < history.length; i++) {
      const x = pad.left + i * xStep;
      const val = history[i][party.id] || 0;
      const y = pad.top + chartH - (val / 50) * chartH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Dots
    ctx.fillStyle = party.color;
    for (let i = 0; i < history.length; i++) {
      const x = pad.left + i * xStep;
      const val = history[i][party.id] || 0;
      const y = pad.top + chartH - (val / 50) * chartH;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Label at right edge
    const lastVal = history[history.length - 1][party.id] || 0;
    const lastY = pad.top + chartH - (lastVal / 50) * chartH;
    ctx.fillStyle = party.color;
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${party.abbr} ${lastVal.toFixed(1)}%`, pad.left + chartW + 6, lastY + 4);
  }
}

// ── UI ────────────────────────────────────────────────────────────────────────

export function initGame(container) {
  injectStyles();

  // ── Game state ──
  let playerParty = null;
  let state = null;

  function createInitialState() {
    const shuffled = [...policyNodes].sort(() => Math.random() - 0.5);
    const baseline = {};
    for (const p of problemNodes) baseline[p.id] = 50;
    return {
      turn: 0,
      polls: clonePolls(STARTING_POLLS),
      pollHistory: [clonePolls(STARTING_POLLS)],
      activePolicies: [],
      rejectedPolicies: [],
      policyQueue: shuffled,
      problemSeverity: baseline,
      baselineSeverity: { ...baseline },
      prActive: false,
      selectedPolicy: null,
      finished: false,
    };
  }

  // ── Party selection screen ──
  function showPartySelect() {
    container.style.position = 'relative';
    container.innerHTML = '';

    const selectScreen = document.createElement('div');
    selectScreen.className = 'game-party-select';

    const partyCards = parties.map(p => {
      const poll = STARTING_POLLS[p.id] || 0;
      const govTag = p.id === GOV_PARTY ? '<div class="party-gov-tag">★ IN GOVT</div>' : '';
      return `<div class="party-card" data-party-id="${p.id}" style="border-color:${p.color}30">
        <div class="party-swatch" style="background:${p.color}"></div>
        <div class="party-name" style="color:${p.color}">${p.label}</div>
        <div class="party-poll">${poll}% in polls</div>
        ${govTag}
      </div>`;
    }).join('');

    selectScreen.innerHTML = `
      <h2>🗳️ Choose Your Party</h2>
      <p class="party-select-desc">Pick a party and try to lead them to victory in the next general election.</p>
      <p class="party-select-note">Labour is currently in government — all policies are theirs to implement or reject.</p>
      <div class="party-cards">${partyCards}</div>
    `;

    container.appendChild(selectScreen);

    selectScreen.querySelectorAll('.party-card').forEach(card => {
      card.addEventListener('click', () => {
        playerParty = card.dataset.partyId;
        state = createInitialState();
        buildGameDOM();
      });
    });
  }

  // ── Build DOM ──
  function buildGameDOM() {
  container.style.position = 'relative';
  container.innerHTML = '';

  const root = document.createElement('div');
  root.className = 'game-root';

  // Timeline
  const timeline = document.createElement('div');
  timeline.className = 'game-timeline';
  timeline.innerHTML = `
    <span class="turn-label">Turn 1 / ${TOTAL_TURNS}</span>
    <span class="date-label">${QUARTER_LABELS[0]}</span>
    <div class="progress-wrap"><div class="progress-fill" style="width:0%"></div></div>
  `;

  // Policy card
  const policyCard = document.createElement('div');
  policyCard.className = 'game-policy-card';

  // Polling panel
  const pollingPanel = document.createElement('div');
  pollingPanel.className = 'game-polling';
  pollingPanel.innerHTML = `<h4>📊 Polling Tracker</h4>`;
  const canvas = document.createElement('canvas');
  pollingPanel.appendChild(canvas);

  // Problems panel
  const problemsPanel = document.createElement('div');
  problemsPanel.className = 'game-problems';
  problemsPanel.innerHTML = `<h4>🔴 Problem Severity</h4>`;
  const problemsList = document.createElement('div');
  problemsPanel.appendChild(problemsList);

  root.append(timeline, policyCard, pollingPanel, problemsPanel);
  container.appendChild(root);

  // ── Render helpers ──
  function updateTimeline() {
    const turnNum = Math.min(state.turn + 1, TOTAL_TURNS);
    timeline.querySelector('.turn-label').textContent = `Turn ${turnNum} / ${TOTAL_TURNS}`;
    timeline.querySelector('.date-label').textContent = QUARTER_LABELS[state.turn] || '';
    const pct = (state.turn / TOTAL_TURNS) * 100;
    timeline.querySelector('.progress-fill').style.width = pct + '%';
  }

  function renderPolicyCard() {
    if (state.finished) {
      policyCard.innerHTML = '<p class="waiting-msg">Election complete!</p>';
      return;
    }
    if (state.turn >= TOTAL_TURNS) {
      showElection();
      return;
    }

    // Get available policies (not yet implemented or rejected)
    const available = policyNodes.filter(p =>
      !state.activePolicies.includes(p.id) && !state.rejectedPolicies.includes(p.id)
    );

    if (!available.length) {
      policyCard.innerHTML = '<p class="waiting-msg">All policies have been considered.</p>' +
        '<div class="game-actions"><button class="btn-skip">⏭ Skip Quarter</button></div>';
      policyCard.querySelector('.btn-skip').onclick = () => handleChoice('skip', null);
      return;
    }

    // Use selected policy or default to first available
    const policy = state.selectedPolicy && available.find(p => p.id === state.selectedPolicy)
      ? available.find(p => p.id === state.selectedPolicy)
      : available[0];
    state.selectedPolicy = policy.id;

    // Build compact policy picker list
    const pickerItems = available.map(p => {
      const st = policyPopularity[p.id] || {};
      const playerStance = st[playerParty] || 'mixed';
      const dotColor = playerStance === 'support' ? '#2ecc71' : playerStance === 'oppose' ? '#e74c3c' : '#f1c40f';
      const selected = p.id === policy.id;
      return `<div class="policy-pick-item${selected ? ' selected' : ''}" data-id="${p.id}">
        <span class="pick-dot" style="background:${dotColor}"></span>
        <span class="pick-name">${cleanLabel(p.label)}</span>
      </div>`;
    }).join('');

    const stances = policyPopularity[policy.id] || {};
    const { helps, hinders } = computePolicyImpacts(policy.id);

    const stanceBadges = parties.map(p => {
      const stance = stances[p.id] || 'mixed';
      const dotColor = stance === 'support' ? '#2ecc71' : stance === 'oppose' ? '#e74c3c' : '#f1c40f';
      return `<span class="stance-badge">
        <span class="stance-dot" style="background:${dotColor}"></span>
        <span style="color:${p.color};font-weight:600">${p.abbr}</span>
      </span>`;
    }).join('');

    const helpItems = helps.map(pid => {
      const n = nodeMap[pid];
      return `<div class="impact-item positive">✓ Improves: ${cleanLabel(n?.label)}</div>`;
    }).join('');

    const hinderItems = hinders.map(pid => {
      const n = nodeMap[pid];
      return `<div class="impact-item negative">⚠ Risks worsening: ${cleanLabel(n?.label)}</div>`;
    }).join('');

    policyCard.innerHTML = `
      <div class="policy-picker">
        <h4>📋 Select Policy (${available.length} remaining)</h4>
        <div class="policy-pick-list">${pickerItems}</div>
      </div>
      <div class="policy-detail">
        <h3>📜 ${cleanLabel(policy.label)}</h3>
        <p class="policy-desc">${policy.description || 'No description available.'}</p>
        <div class="stances-row">${stanceBadges}</div>
        ${(helps.length || hinders.length) ? `
          <div class="impacts-section">
            <h4>Expected Impacts</h4>
            ${helpItems}
            ${hinderItems}
          </div>
        ` : ''}
        <div class="game-actions">
          <button class="btn-implement">✅ Implement</button>
          <button class="btn-reject">❌ Reject</button>
          <button class="btn-skip">⏭ Skip Quarter</button>
        </div>
      </div>
    `;

    // Policy picker click handlers
    policyCard.querySelectorAll('.policy-pick-item').forEach(item => {
      item.addEventListener('click', () => {
        state.selectedPolicy = item.dataset.id;
        renderPolicyCard();
      });
    });

    policyCard.querySelector('.btn-implement').onclick = () => handleChoice('implement', policy);
    policyCard.querySelector('.btn-reject').onclick = () => handleChoice('reject', policy);
    policyCard.querySelector('.btn-skip').onclick = () => handleChoice('skip', policy);
  }

  function renderProblems() {
    const rows = problemNodes.map(prob => {
      const severity = state.problemSeverity[prob.id] ?? 50;
      const baseline = state.baselineSeverity[prob.id] ?? 50;
      const delta = severity - baseline;
      const barColor = delta < 0 ? '#2ecc71' : delta > 0 ? '#e74c3c' : '#555';
      const deltaStr = delta === 0 ? '—' : (delta > 0 ? `+${delta}%` : `${delta}%`);
      const deltaColor = delta < 0 ? '#2ecc71' : delta > 0 ? '#e74c3c' : '#666';

      return `<div class="game-prob-row">
        <span class="prob-label" title="${cleanLabel(prob.label)}">${cleanLabel(prob.label)}</span>
        <div class="prob-bar-bg">
          <div class="prob-bar-fill" style="width:${Math.max(0, Math.min(100, severity))}%;background:${barColor}"></div>
        </div>
        <span class="prob-delta" style="color:${deltaColor}">${deltaStr}</span>
      </div>`;
    }).join('');

    problemsList.innerHTML = rows;
  }

  function redrawChart() {
    drawPollingChart(canvas, state.pollHistory);
  }

  // ── Game logic ──
  function handleChoice(choice, policy) {
    if (policy) {
      const severityChanges = computeSeverityChanges(
        choice === 'implement'
          ? [...state.activePolicies, policy.id]
          : state.activePolicies
      );

      if (choice === 'implement') {
        state.activePolicies.push(policy.id);
        if (policy.id === 'pol_proportional_representation') state.prActive = true;
        state.polls = applyImplement(state.polls, policy.id, severityChanges);
      } else if (choice === 'reject') {
        state.rejectedPolicies.push(policy.id);
        state.polls = applyReject(state.polls, policy.id);
      } else {
        state.polls = applySkip(state.polls);
      }
    } else {
      state.polls = applySkip(state.polls);
    }

    state.selectedPolicy = null;

    // Update problem severities from all active policies
    const allChanges = computeSeverityChanges(state.activePolicies);
    for (const prob of problemNodes) {
      state.problemSeverity[prob.id] = state.baselineSeverity[prob.id] + (allChanges[prob.id] || 0);
      state.problemSeverity[prob.id] = Math.max(0, Math.min(100, state.problemSeverity[prob.id]));
    }

    state.pollHistory.push(clonePolls(state.polls));
    state.turn++;

    updateTimeline();
    renderProblems();
    redrawChart();

    if (state.turn >= TOTAL_TURNS) {
      state.finished = true;
      policyCard.innerHTML = '<p class="waiting-msg">Term complete. Calculating election results...</p>';
      setTimeout(showElection, 800);
    } else {
      renderPolicyCard();
    }
  }

  function showElection() {
    const seats = estimateSeats(state.polls, state.prActive);
    const winnerId = Object.entries(seats).sort((a, b) => b[1] - a[1])[0][0];
    const winner = partyMap[winnerId];

    const electionSystem = state.prActive ? 'Proportional Representation' : 'First Past the Post';

    const majority = seats[winnerId] > TOTAL_SEATS / 2;
    const resultLabel = majority
      ? `${winner.label} wins a majority!`
      : `${winner.label} is the largest party — hung parliament`;

    const playerWon = playerParty === winnerId;
    const playerMsg = playerWon
      ? '🎉 Victory! Your party won!'
      : '😔 Defeat. Better luck next time.';
    const playerColor = partyMap[playerParty]?.color || '#eee';

    const rows = parties
      .sort((a, b) => (seats[b.id] || 0) - (seats[a.id] || 0))
      .map(p => {
        const s = seats[p.id] || 0;
        const pct = state.polls[p.id] || 0;
        const isWinner = p.id === winnerId;
        const isPlayer = p.id === playerParty;
        const classes = ['election-row'];
        if (isWinner) classes.push('winner');
        if (isPlayer) classes.push('player-party');
        const borderStyle = isWinner ? `border-color:${p.color}` : '';
        return `<div class="${classes.join(' ')}" style="${borderStyle}">
          <span class="e-party" style="color:${p.color}">${p.label}${isPlayer ? ' ◂' : ''}</span>
          <span class="e-poll">${pct.toFixed(1)}%</span>
          <div class="e-bar-bg"><div class="e-bar-fill" style="width:${(s / TOTAL_SEATS) * 100}%;background:${p.color}"></div></div>
          <span class="e-seats">${s} seats</span>
        </div>`;
      }).join('');

    const overlay = document.createElement('div');
    overlay.className = 'game-election-overlay';
    overlay.innerHTML = `
      <div class="election-card">
        <h2 style="color:${winner.color}">🗳️ General Election ${QUARTER_LABELS[TOTAL_TURNS] || '2029'}</h2>
        <p class="election-player-result" style="color:${playerColor}">${playerMsg}</p>
        <p class="winner-label">${resultLabel}</p>
        <p style="font-size:12px;color:#888;margin-bottom:12px">Electoral system: ${electionSystem}</p>
        <div class="election-results-grid">${rows}</div>
        <button class="btn-play-again">🔄 Play Again</button>
      </div>
    `;

    container.appendChild(overlay);
    overlay.querySelector('.btn-play-again').onclick = () => {
      showPartySelect();
    };
  }

  // ── Canvas resize observer ──
  const resizeObserver = new ResizeObserver(() => {
    if (canvas.offsetParent !== null) redrawChart();
  });
  resizeObserver.observe(pollingPanel);

  // Re-draw chart when the game tab becomes visible
  const tabObserver = new MutationObserver(() => {
    if (container.classList.contains('active') || container.offsetParent !== null) {
      redrawChart();
    }
  });
  tabObserver.observe(container, { attributes: true, attributeFilter: ['class', 'style'] });

  // ── Initial render ──
  updateTimeline();
  renderPolicyCard();
  renderProblems();
  // Defer chart draw to next frame so canvas has layout dimensions
  requestAnimationFrame(() => redrawChart());
  } // end buildGameDOM

  // ── Start with party selection ──
  showPartySelect();
}

// ── Utilities ─────────────────────────────────────────────────────────────────

function cleanLabel(label) {
  if (!label) return 'Unknown';
  return label.replace(/\n/g, ' ').replace(/\\n/g, ' ');
}
