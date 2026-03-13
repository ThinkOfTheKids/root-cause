import { nodes, edges, parties, policyPopularity } from './data.js';

// === Weight computation (mirrors main.js) ===
function computeWeights() {
  const incomingCauseCount = {};
  const outgoingCauses = {};
  const outgoingSolves = {};
  const outgoingImplements = {};

  edges.forEach(e => {
    if (e.label === 'causes') {
      incomingCauseCount[e.target] = (incomingCauseCount[e.target] || 0) + 1;
      if (!outgoingCauses[e.source]) outgoingCauses[e.source] = [];
      outgoingCauses[e.source].push(e.target);
    } else if (e.label === 'solves') {
      if (!outgoingSolves[e.source]) outgoingSolves[e.source] = [];
      outgoingSolves[e.source].push(e.target);
    } else if (e.label === 'implements') {
      if (!outgoingImplements[e.source]) outgoingImplements[e.source] = [];
      outgoingImplements[e.source].push(e.target);
    }
  });

  const memo = {};
  const visiting = new Set();

  function calcWeight(id) {
    if (memo[id] !== undefined) return memo[id];
    if (visiting.has(id)) return 0;
    visiting.add(id);
    let w = 0;
    const targets = outgoingCauses[id] || [];
    for (const t of targets) {
      const share = 1 / (incomingCauseCount[t] || 1);
      w += share * (1 + calcWeight(t));
    }
    visiting.delete(id);
    memo[id] = w;
    return w;
  }

  const weights = {};
  nodes.forEach(n => { weights[n.id] = calcWeight(n.id); });
  nodes.forEach(n => {
    const solveTargets = outgoingSolves[n.id] || [];
    if (solveTargets.length > 0) weights[n.id] += solveTargets.length * 0.5;
    const implTargets = outgoingImplements[n.id] || [];
    if (implTargets.length > 0) weights[n.id] += implTargets.length * 0.4;
  });
  return weights;
}

// === Pre-compute edge indexes ===
const implementsEdges = {};   // policy → [solution]
const solvesEdges = {};       // solution → [problem/cause]
const causesEdges = {};       // cause → [problem]
const causedByEdges = {};     // problem → [cause]
const risksEdges = {};        // policy → [future_problem]

edges.forEach(e => {
  if (e.label === 'implements') {
    (implementsEdges[e.source] ??= []).push(e.target);
  } else if (e.label === 'solves') {
    (solvesEdges[e.source] ??= []).push(e.target);
  } else if (e.label === 'causes') {
    (causesEdges[e.source] ??= []).push(e.target);
    (causedByEdges[e.target] ??= []).push(e.source);
  } else if (e.label === 'risks') {
    (risksEdges[e.source] ??= []).push(e.target);
  }
});

const nodeMap = {};
nodes.forEach(n => { nodeMap[n.id] = n; });

const policyNodes = nodes.filter(n => n.type === 'policy');
const problemNodes = nodes.filter(n => n.type === 'problem');
const weights = computeWeights();

// === Impact calculation ===
// For each policy, trace: policy → implements → solutions → solves → problems
// positive impact = sum of (problem weight × share)
// negative impact via risks: policy → risks → future_problem that causes problems

function calcPolicyImpact(policyId) {
  const solutions = implementsEdges[policyId] || [];
  const problemsAddressed = new Set();
  const addressedDetails = []; // { problemId, share }

  solutions.forEach(solId => {
    const targets = solvesEdges[solId] || [];
    targets.forEach(targetId => {
      const targetNode = nodeMap[targetId];
      if (!targetNode) return;
      // Direct solve to problem
      if (targetNode.type === 'problem') {
        if (!problemsAddressed.has(targetId)) {
          problemsAddressed.add(targetId);
          const incoming = (causedByEdges[targetId] || []).length || 1;
          addressedDetails.push({ problemId: targetId, share: 1 / incoming });
        }
      }
      // Solve a cause → follow causes edges to problems
      if (targetNode.type === 'cause') {
        const downstream = causesEdges[targetId] || [];
        downstream.forEach(probId => {
          const probNode = nodeMap[probId];
          if (probNode && (probNode.type === 'problem' || probNode.type === 'future_problem')) {
            if (!problemsAddressed.has(probId)) {
              problemsAddressed.add(probId);
              const incoming = (causedByEdges[probId] || []).length || 1;
              addressedDetails.push({ problemId: probId, share: 1 / incoming });
            }
          }
        });
      }
    });
  });

  const positiveImpact = addressedDetails.reduce((sum, d) => {
    return sum + (weights[d.problemId] || 0) * d.share;
  }, 0);

  // Negative: risks
  const risksCreated = risksEdges[policyId] || [];
  let negativeImpact = 0;
  const riskProblems = [];

  risksCreated.forEach(fpId => {
    const fpNode = nodeMap[fpId];
    if (!fpNode) return;
    riskProblems.push(fpId);
    // Future problem might cause other problems
    const downstream = causesEdges[fpId] || [];
    downstream.forEach(probId => {
      negativeImpact += (weights[probId] || 0) * 0.5;
    });
    negativeImpact += (weights[fpId] || 0) * 0.3;
  });

  return {
    positiveImpact,
    negativeImpact,
    netImpact: positiveImpact - negativeImpact,
    problemsAddressed: [...problemsAddressed],
    risksCreated,
    solutions,
  };
}

// Pre-compute all policy impacts
const policyImpacts = {};
policyNodes.forEach(p => {
  policyImpacts[p.id] = calcPolicyImpact(p.id);
});

// === Coverage calculation ===
// For each problem: find all upstream causes, check which are addressed by enabled policies
function getAllCauses(problemId, visited = new Set()) {
  if (visited.has(problemId)) return visited;
  visited.add(problemId);
  const upstream = causedByEdges[problemId] || [];
  upstream.forEach(causeId => {
    getAllCauses(causeId, visited);
  });
  return visited;
}

// Pre-compute problem cause trees
const problemCauses = {};
problemNodes.forEach(p => {
  const allCauses = getAllCauses(p.id);
  allCauses.delete(p.id); // remove self
  problemCauses[p.id] = allCauses;
});

// Problem severity = based on incoming cause tree depth and breadth
// Terminal problems (like nhs_crisis) have 0 outgoing weight but many incoming causes
const problemSeverity = {};
problemNodes.forEach(p => {
  const causeTree = problemCauses[p.id];
  // Weight by: direct causes count + cause tree depth, plus sum of upstream cause weights
  const directCauses = (causedByEdges[p.id] || []).length;
  let upstreamWeight = 0;
  causeTree.forEach(causeId => {
    upstreamWeight += (weights[causeId] || 0);
  });
  // Combine: tree size + upstream weight contributions
  problemSeverity[p.id] = causeTree.size + upstreamWeight + directCauses;
});

// Which causes each policy addresses (via solutions it implements)
function getPolicyAddressedCauses(policyId) {
  const addressed = new Set();
  const solutions = implementsEdges[policyId] || [];
  solutions.forEach(solId => {
    const targets = solvesEdges[solId] || [];
    targets.forEach(targetId => {
      addressed.add(targetId);
      // If solution solves a cause, also add it
      const node = nodeMap[targetId];
      if (node && node.type === 'cause') {
        addressed.add(targetId);
      }
    });
  });
  return addressed;
}

// Which problems each policy's risks exacerbate
function getPolicyRiskTargets(policyId) {
  const targets = new Set();
  const risks = risksEdges[policyId] || [];
  risks.forEach(fpId => {
    targets.add(fpId);
    const downstream = causesEdges[fpId] || [];
    downstream.forEach(id => targets.add(id));
  });
  return targets;
}

function computeCoverage(enabledPolicies) {
  const allAddressed = new Set();
  const policyContributions = {}; // problemId → [policyId, ...]
  const hinderingContributions = {}; // problemId → [policyId, ...]

  // Per-policy chain details for problem dashboard
  // policyChains[problemId] = [{ policyId, helpChains: [...], hinderChains: [...] }]
  const policyChains = {};

  enabledPolicies.forEach(polId => {
    const addressed = getPolicyAddressedCauses(polId);
    addressed.forEach(id => allAddressed.add(id));

    // Track which policies help which problems + build help chains
    const impact = policyImpacts[polId];
    if (impact) {
      impact.problemsAddressed.forEach(probId => {
        (policyContributions[probId] ??= []).push(polId);
      });

      // Build help chain details per problem
      (impact.solutions || []).forEach(solId => {
        const sol = nodeMap[solId];
        if (!sol) return;
        const solLabel = sol.label.replace(/\n/g, ' ');
        const targets = solvesEdges[solId] || [];
        targets.forEach(targetId => {
          const target = nodeMap[targetId];
          if (!target) return;
          if (target.type === 'problem') {
            const chain = { text: `implements <b>${solLabel}</b> → solves`, type: 'helps' };
            addPolicyChain(policyChains, targetId, polId, chain, 'help');
          } else if (target.type === 'cause') {
            const downstream = causesEdges[targetId] || [];
            downstream.forEach(pid => {
              if (nodeMap[pid]?.type === 'problem') {
                const targetLabel = target.label.replace(/\n/g, ' ');
                const chain = { text: `implements <b>${solLabel}</b> → addresses <b>${targetLabel}</b>`, type: 'helps' };
                addPolicyChain(policyChains, pid, polId, chain, 'help');
              }
            });
          }
        });
      });
    }

    // Track which policies hinder which problems + build hinder chains
    const risks = risksEdges[polId] || [];
    risks.forEach(fpId => {
      const fp = nodeMap[fpId];
      if (!fp) return;
      const fpLabel = fp.label.replace(/\n/g, ' ');

      if (fp.type === 'problem') {
        (hinderingContributions[fpId] ??= []).push(polId);
        const chain = { text: `risks <b>${fpLabel}</b>`, type: 'hinders' };
        addPolicyChain(policyChains, fpId, polId, chain, 'hinder');
      }
      const downstream = causesEdges[fpId] || [];
      downstream.forEach(probId => {
        if (nodeMap[probId]?.type === 'problem') {
          (hinderingContributions[probId] ??= []).push(polId);
          const chain = { text: `risks <b>${fpLabel}</b> → worsens`, type: 'hinders' };
          addPolicyChain(policyChains, probId, polId, chain, 'hinder');
        }
      });
    });
  });

  const results = {};
  problemNodes.forEach(problem => {
    const causes = problemCauses[problem.id];
    const totalCauses = Math.max(1, causes.size);
    let addressedCount = 0;
    causes.forEach(causeId => {
      if (allAddressed.has(causeId)) addressedCount++;
    });
    if (allAddressed.has(problem.id)) addressedCount += 1;

    let coverage = Math.min(100, (addressedCount / totalCauses) * 100);

    const helpingPolicies = [...new Set(policyContributions[problem.id] || [])];
    const hinderingPolicies = [...new Set(hinderingContributions[problem.id] || [])];
    const isHindered = hinderingPolicies.length > 0;
    const hindrance = isHindered ? Math.min(50, hinderingPolicies.length * 10) : 0;

    let direction = 'unchanged';
    if (helpingPolicies.length > 0 && !isHindered) direction = 'improving';
    else if (isHindered && helpingPolicies.length === 0) direction = 'worsening';
    else if (isHindered && helpingPolicies.length > 0) direction = 'mixed';

    const chains = policyChains[problem.id] || [];

    results[problem.id] = { coverage, direction, helpingPolicies, hinderingPolicies, hindrance, chains };
  });

  return results;
}

function addPolicyChain(policyChains, problemId, policyId, chain, type) {
  if (!policyChains[problemId]) policyChains[problemId] = [];
  let entry = policyChains[problemId].find(e => e.policyId === policyId);
  if (!entry) {
    entry = { policyId, helpChains: [], hinderChains: [] };
    policyChains[problemId].push(entry);
  }
  if (type === 'help') entry.helpChains.push(chain);
  else entry.hinderChains.push(chain);
}

// === Max severity (for normalising bars) ===
const maxSeverity = Math.max(...problemNodes.map(p => problemSeverity[p.id] || 0), 1);
const maxImpact = Math.max(
  ...policyNodes.map(p => Math.abs(policyImpacts[p.id]?.netImpact || 0)),
  ...policyNodes.map(p => policyImpacts[p.id]?.positiveImpact || 0),
  1
);

// === Render ===
let enabledPolicies = new Set();
let currentSort = 'impact';
let currentPartyFilter = '';
let policyListEl, problemListEl, summaryEl;

function render() {
  renderPolicyList();
  renderProblemDashboard();
  renderSummary();
}

function renderSummary() {
  const coverage = computeCoverage(enabledPolicies);
  const avgCoverage = problemNodes.length > 0
    ? problemNodes.reduce((s, p) => s + coverage[p.id].coverage, 0) / problemNodes.length
    : 0;
  const improving = Object.values(coverage).filter(c => c.direction === 'improving').length;

  summaryEl.innerHTML = `
    <div class="stat"><span class="stat-value">${enabledPolicies.size}</span><span class="stat-label">Policies Enabled</span></div>
    <div class="stat"><span class="stat-value">${avgCoverage.toFixed(0)}%</span><span class="stat-label">Avg Coverage</span></div>
    <div class="stat"><span class="stat-value">${improving}</span><span class="stat-label">Problems Improving</span></div>
  `;
}

function sortPolicies(list) {
  if (currentSort === 'impact') {
    return list.sort((a, b) => (policyImpacts[b.id]?.netImpact || 0) - (policyImpacts[a.id]?.netImpact || 0));
  } else if (currentSort === 'feasibility') {
    return list.sort((a, b) => (b.practicality || 0) - (a.practicality || 0));
  } else if (currentSort === 'party') {
    return list.sort((a, b) => {
      const stanceA = policyPopularity[a.id]?.[currentPartyFilter];
      const stanceB = policyPopularity[b.id]?.[currentPartyFilter];
      const order = { support: 0, mixed: 1, oppose: 2 };
      return (order[stanceA] ?? 3) - (order[stanceB] ?? 3);
    });
  }
  return list;
}

function filterPolicies(list) {
  if (!currentPartyFilter) return list;
  return list.filter(p => {
    const stance = policyPopularity[p.id]?.[currentPartyFilter];
    return stance === 'support' || stance === 'mixed';
  });
}

function renderPolicyList() {
  let filtered = [...policyNodes];
  if (currentPartyFilter && currentSort !== 'party') {
    filtered = filterPolicies(filtered);
  }
  filtered = sortPolicies(filtered);

  policyListEl.innerHTML = filtered.map(policy => {
    const impact = policyImpacts[policy.id] || { positiveImpact: 0, negativeImpact: 0, netImpact: 0, solutions: [], problemsAddressed: [], risksCreated: [] };
    const isEnabled = enabledPolicies.has(policy.id);
    const posWidth = Math.min(50, (impact.positiveImpact / maxImpact) * 50);
    const negWidth = Math.min(50, (impact.negativeImpact / maxImpact) * 50);

    // Party dots
    const partyDotsHtml = parties.map(p => {
      const stance = policyPopularity[policy.id]?.[p.id] || '';
      if (!stance) return '';
      return `<span class="party-dot ${stance}" style="background:${p.color}" title="${p.label}: ${stance}"></span>`;
    }).join('');

    // Feasibility
    let feasHtml = '';
    if (policy.practicality) {
      feasHtml = `<span class="feasibility-mini">⚙️ ${policy.practicality}/5</span>`;
    }

    // Summary of what it addresses
    const solvedCount = (impact.problemsAddressed || []).length;
    const riskCount = (impact.risksCreated || []).length;
    let summaryBits = [];
    if (solvedCount > 0) summaryBits.push(`<span class="chain-summary helps">✅ ${solvedCount} problem${solvedCount > 1 ? 's' : ''}</span>`);
    if (riskCount > 0) summaryBits.push(`<span class="chain-summary hinders">⚠️ ${riskCount} risk${riskCount > 1 ? 's' : ''}</span>`);
    const summaryHtml = summaryBits.length ? `<div class="impact-summary">${summaryBits.join(' ')}</div>` : '';

    return `
      <div class="policy-card ${isEnabled ? 'enabled' : ''}" data-id="${policy.id}">
        <div class="policy-card-header">
          <h3>${policy.label.replace(/\n/g, ' ')}</h3>
          <label class="toggle-switch">
            <input type="checkbox" data-policy="${policy.id}" ${isEnabled ? 'checked' : ''}>
            <span class="toggle-slider"></span>
          </label>
        </div>
        <p class="policy-card-desc collapsed">${policy.description || ''}</p>
        <div class="policy-card-meta">
          <div class="impact-bar-container">
            <div class="impact-bar-label">Impact: ${impact.netImpact >= 0 ? '+' : ''}${impact.netImpact.toFixed(1)}</div>
            <div class="impact-bar-track">
              <div class="impact-bar-neg" style="width:${negWidth}%"></div>
              <div class="impact-bar-pos" style="width:${posWidth}%"></div>
              <div class="impact-bar-center"></div>
            </div>
          </div>
          <div class="party-dots">${partyDotsHtml}</div>
          ${feasHtml}
        </div>
        ${summaryHtml}
      </div>
    `;
  }).join('');

  // Attach toggle handlers
  policyListEl.querySelectorAll('input[data-policy]').forEach(input => {
    input.addEventListener('change', (e) => {
      const polId = e.target.dataset.policy;
      if (e.target.checked) {
        enabledPolicies.add(polId);
      } else {
        enabledPolicies.delete(polId);
      }
      render();
    });
  });

  // Click to expand/collapse descriptions
  policyListEl.querySelectorAll('.policy-card-desc').forEach(desc => {
    desc.addEventListener('click', (e) => {
      e.stopPropagation();
      desc.classList.toggle('collapsed');
    });
  });
}

function renderProblemDashboard() {
  const coverage = computeCoverage(enabledPolicies);
  const sorted = [...problemNodes].sort((a, b) => (problemSeverity[b.id] || 0) - (problemSeverity[a.id] || 0));

  problemListEl.innerHTML = sorted.map(problem => {
    const sev = problemSeverity[problem.id] || 0;
    const severityPct = (sev / maxSeverity) * 100;
    const cov = coverage[problem.id] || { coverage: 0, direction: 'unchanged', helpingPolicies: [], hinderingPolicies: [], hindrance: 0, chains: [] };
    const directionIcon = { improving: '↗️', worsening: '↘️', mixed: '⚖️', unchanged: '➡️' }[cov.direction];
    const directionClass = cov.direction;

    // Residual severity: reduced by coverage, increased by hindrance
    // netEffect can be negative (hindrance exceeds coverage = things get worse)
    const netEffect = cov.coverage - cov.hindrance;
    const residualPct = Math.min(100, Math.max(0, severityPct * (1 - netEffect / 100)));

    // Only show change if rounded values actually differ
    const hasVisibleChange = Math.round(severityPct) !== Math.round(residualPct);
    const hasAnyEffect = cov.coverage > 0 || cov.hindrance > 0;

    // Build per-policy impact chains for this problem
    let chainsHtml = '';
    if (cov.chains && cov.chains.length > 0) {
      const chainItems = cov.chains.map(entry => {
        const polNode = nodeMap[entry.policyId];
        if (!polNode) return '';
        const polLabel = polNode.label.replace(/\n/g, ' ');
        const lines = [];
        entry.helpChains.forEach(c => {
          lines.push(`<span class="chain-line helps">✅ ${c.text}</span>`);
        });
        entry.hinderChains.forEach(c => {
          lines.push(`<span class="chain-line hinders">⚠️ ${c.text}</span>`);
        });
        return `<div class="problem-policy-impact"><span class="policy-impact-name">${polLabel}</span>${lines.join('')}</div>`;
      }).filter(Boolean).join('');
      chainsHtml = `<div class="problem-impact-chains">${chainItems}</div>`;
    }

    return `
      <div class="problem-row ${directionClass}">
        <div class="problem-row-header">
          <h3>${problem.label.replace(/\n/g, ' ')}</h3>
          <span class="problem-direction">${directionIcon}</span>
        </div>
        <div class="severity-composite">
          <span class="problem-bar-label">Severity</span>
          <div class="severity-track">
            ${hasAnyEffect
              ? `<div class="severity-baseline" style="width:${severityPct}%"></div>
                 <div class="severity-residual" style="width:${residualPct}%"></div>`
              : `<div class="severity-residual" style="width:${severityPct}%"></div>`
            }
          </div>
          <span class="problem-bar-value">${hasVisibleChange ? `${severityPct.toFixed(0)}→${residualPct.toFixed(0)}%` : `${severityPct.toFixed(0)}%`}</span>
        </div>
        ${chainsHtml}
      </div>
    `;
  }).join('');
}

// === Init ===
export function initDesigner(container) {
  container.innerHTML = `
    <div class="designer-panel designer-left">
      <h2>🏗️ Policy Designer</h2>
      <div class="designer-filters">
        <select id="designer-sort">
          <option value="impact">Sort: Impact</option>
          <option value="feasibility">Sort: Feasibility</option>
          <option value="party">Sort: Party Alignment</option>
        </select>
        <select id="designer-party-filter">
          <option value="">All Parties</option>
          ${parties.map(p => `<option value="${p.id}">${p.label}</option>`).join('')}
        </select>
      </div>
      <div id="designer-summary" class="designer-summary"></div>
      <div id="designer-policy-list"></div>
    </div>
    <div class="designer-panel designer-right">
      <h2>📊 Problem Dashboard</h2>
      <div id="designer-problem-list"></div>
    </div>
  `;

  policyListEl = container.querySelector('#designer-policy-list');
  problemListEl = container.querySelector('#designer-problem-list');
  summaryEl = container.querySelector('#designer-summary');

  container.querySelector('#designer-sort').addEventListener('change', (e) => {
    currentSort = e.target.value;
    render();
  });

  container.querySelector('#designer-party-filter').addEventListener('change', (e) => {
    currentPartyFilter = e.target.value;
    render();
  });

  render();
}
