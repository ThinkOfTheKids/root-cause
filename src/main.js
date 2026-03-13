import cytoscape from 'cytoscape';
import { nodes, edges, groups, nodeGroups, parties, policyPopularity } from './data.js';

// === Compute contribution weights (recursive) ===
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

  // Bonus for solutions/policies
  nodes.forEach(n => {
    const solveTargets = outgoingSolves[n.id] || [];
    if (solveTargets.length > 0) weights[n.id] += solveTargets.length * 0.5;
    const implTargets = outgoingImplements[n.id] || [];
    if (implTargets.length > 0) weights[n.id] += implTargets.length * 0.4;
  });

  return weights;
}

const weights = computeWeights();

const BASE_SIZE = 48;
const WEIGHT_SCALE = 16;
const MIN_SIZE = 40;
const MAX_SIZE = 110;

function nodeSize(id) {
  const w = weights[id] || 0;
  return Math.min(MAX_SIZE, Math.max(MIN_SIZE, BASE_SIZE + w * WEIGHT_SCALE));
}

function fontSize(id) {
  const size = nodeSize(id);
  return Math.max(7, Math.min(11, 7 + (size - MIN_SIZE) / (MAX_SIZE - MIN_SIZE) * 4));
}

// Build group color map
const groupColorMap = {};
groups.forEach(g => { groupColorMap[g.id] = g.color; });

const cy = cytoscape({
  container: document.getElementById('cy'),
  elements: [
    // Group parent nodes (compound)
    ...groups.map(g => ({
      data: { id: g.id, label: g.label },
      classes: 'group',
    })),
    // Regular nodes
    ...nodes.map(n => {
      const parentGroup = nodeGroups[n.id] || null;
      const data = {
        id: n.id,
        label: n.label,
        type: n.type,
        description: n.description,
        weight: weights[n.id] || 0,
        nodeWidth: nodeSize(n.id),
        nodeHeight: n.type === 'problem' ? nodeSize(n.id) * 0.65 : nodeSize(n.id) * 0.85,
        fontSize: fontSize(n.id),
      };
      if (parentGroup) data.parent = parentGroup;
      return { data, classes: n.type };
    }),
    // Edges
    ...edges.map(e => ({
      data: { source: e.source, target: e.target, label: e.label },
      classes: e.label,
    })),
  ],
  style: [
    // Group (compound) nodes
    {
      selector: 'node.group',
      style: {
        'label': 'data(label)',
        'text-valign': 'top',
        'text-halign': 'center',
        'font-size': '112px',
        'font-weight': 'bold',
        'color': '#aaa',
        'text-outline-color': '#0f0f1a',
        'text-outline-width': 8,
        'background-opacity': 0.06,
        'background-color': '#888',
        'border-width': 1,
        'border-color': '#333',
        'border-opacity': 0.4,
        'shape': 'round-rectangle',
        'padding': '20px',
        'text-margin-y': -20,
        'min-zoomed-font-size': 0,
      },
    },
    {
      selector: 'node[nodeWidth]',
      style: {
        'label': 'data(label)',
        'text-wrap': 'wrap',
        'text-valign': 'center',
        'text-halign': 'center',
        'font-size': 'data(fontSize)',
        'color': '#fff',
        'text-outline-color': '#000',
        'text-outline-width': 1.5,
        'width': 'data(nodeWidth)',
        'height': 'data(nodeHeight)',
        'border-width': 2,
        'border-color': '#333',
        'transition-property': 'background-color, border-color, opacity',
        'transition-duration': '0.3s',
      },
    },
    {
      selector: 'node.problem',
      style: {
        'background-color': '#e74c3c',
        'border-color': '#c0392b',
        'shape': 'round-rectangle',
      },
    },
    {
      selector: 'node.cause',
      style: {
        'background-color': '#e67e22',
        'border-color': '#d35400',
        'shape': 'ellipse',
      },
    },
    {
      selector: 'node.solution',
      style: {
        'background-color': '#2ecc71',
        'border-color': '#27ae60',
        'shape': 'diamond',
      },
    },
    {
      selector: 'node.policy',
      style: {
        'background-color': '#3498db',
        'border-color': '#2980b9',
        'shape': 'round-pentagon',
      },
    },
    {
      selector: 'node.future_problem',
      style: {
        'background-color': '#8e44ad',
        'border-color': '#9b59b6',
        'border-style': 'dashed',
        'shape': 'round-rectangle',
      },
    },
    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': '#444',
        'target-arrow-color': '#444',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'arrow-scale': 1.2,
        'transition-property': 'line-color, target-arrow-color, opacity, width',
        'transition-duration': '0.3s',
      },
    },
    {
      selector: 'edge.causes',
      style: {
        'line-color': 'rgba(230,118,34,0.53)',
        'target-arrow-color': '#e67622',
      },
    },
    {
      selector: 'edge.solves',
      style: {
        'line-color': 'rgba(46,204,113,0.53)',
        'target-arrow-color': '#2ecc71',
        'line-style': 'dashed',
      },
    },
    {
      selector: 'edge.implements',
      style: {
        'line-color': 'rgba(52,152,219,0.53)',
        'target-arrow-color': '#3498db',
        'line-style': 'dashed',
      },
    },
    {
      selector: 'edge.risks',
      style: {
        'line-color': 'rgba(142,68,173,0.53)',
        'target-arrow-color': '#8e44ad',
        'line-style': 'dashed',
      },
    },
    // Highlighted states
    {
      selector: 'node.highlighted',
      style: {
        'border-width': 4,
        'border-color': '#fff',
        'z-index': 10,
      },
    },
    {
      selector: 'node.selected-node',
      style: {
        'border-width': 5,
        'border-color': '#f1c40f',
        'z-index': 20,
      },
    },
    {
      selector: 'edge.highlighted',
      style: {
        'width': 4,
        'z-index': 10,
      },
    },
    {
      selector: 'edge.highlighted.causes',
      style: {
        'line-color': '#e67e22',
        'target-arrow-color': '#e67e22',
      },
    },
    {
      selector: 'edge.highlighted.solves',
      style: {
        'line-color': '#2ecc71',
        'target-arrow-color': '#2ecc71',
      },
    },
    {
      selector: 'edge.highlighted.implements',
      style: {
        'line-color': '#3498db',
        'target-arrow-color': '#3498db',
      },
    },
    {
      selector: 'edge.highlighted.risks',
      style: {
        'line-color': '#8e44ad',
        'target-arrow-color': '#8e44ad',
      },
    },
    {
      selector: 'node.faded',
      style: {
        'opacity': 0.12,
      },
    },
    {
      selector: 'edge.faded',
      style: {
        'opacity': 0.06,
      },
    },
    // Horizon hidden
    {
      selector: '.horizon-hidden',
      style: {
        'display': 'none',
      },
    },
    // Group highlight
    {
      selector: 'node.group.highlighted',
      style: {
        'background-opacity': 0.12,
        'border-opacity': 0.8,
        'border-color': '#555',
      },
    },
    {
      selector: 'node.group.faded',
      style: {
        'background-opacity': 0.02,
        'border-opacity': 0.1,
        'opacity': 0.3,
      },
    },
    // Stance indicator on policy nodes
    {
      selector: 'node.stance-support',
      style: {
        'border-color': '#2ecc71',
        'border-width': 5,
        'border-opacity': 1,
      },
    },
    {
      selector: 'node.stance-oppose',
      style: {
        'border-color': '#e74c3c',
        'border-width': 5,
        'border-opacity': 1,
      },
    },
    {
      selector: 'node.stance-mixed',
      style: {
        'border-color': '#f39c12',
        'border-width': 5,
        'border-opacity': 1,
      },
    },
  ],
  layout: {
    name: 'cose',
    animate: false,
    nodeRepulsion: () => 32000,
    idealEdgeLength: () => 100,
    edgeElasticity: () => 80,
    gravity: 0.4,
    numIter: 2500,
    padding: 60,
    stop: function() {},
  },
  minZoom: 0.15,
  maxZoom: 3,
});

// After layout settles, rearrange groups and reveal
cy.one('layoutstop', () => {
  cy.nodes('.group').forEach(group => {
    const children = group.children().filter(':visible');
    if (children.length === 0) return;

    const bb = children.boundingBox();
    const centerX = (bb.x1 + bb.x2) / 2;
    const centerY = (bb.y1 + bb.y2) / 2;

    const radius = Math.max(80, children.length * 22);

    children.forEach((child, i) => {
      const angle = (2 * Math.PI * i) / children.length - Math.PI / 2;
      child.position({
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      });
    });
  });

  cy.fit(undefined, 60);
  document.getElementById('cy').classList.add('settled');
  const loader = document.getElementById('loading');
  if (loader) loader.remove();
});

// === Trail collection ===

function getUpstreamTrail(nodeId, visitedNodes = new Set(), trailEdges = new Set()) {
  if (visitedNodes.has(nodeId)) return { nodes: visitedNodes, edges: trailEdges };
  visitedNodes.add(nodeId);
  cy.edges(`[target = "${nodeId}"][label = "causes"]`).forEach(edge => {
    trailEdges.add(edge.id());
    getUpstreamTrail(edge.source().id(), visitedNodes, trailEdges);
  });
  return { nodes: visitedNodes, edges: trailEdges };
}

function getDownstreamTrail(nodeId, visitedNodes = new Set(), trailEdges = new Set()) {
  if (visitedNodes.has(nodeId)) return { nodes: visitedNodes, edges: trailEdges };
  visitedNodes.add(nodeId);
  cy.edges(`[source = "${nodeId}"][label = "causes"]`).forEach(edge => {
    trailEdges.add(edge.id());
    getDownstreamTrail(edge.target().id(), visitedNodes, trailEdges);
  });
  return { nodes: visitedNodes, edges: trailEdges };
}

function getSolveTargets(nodeId) {
  const targetNodes = new Set();
  const targetEdges = new Set();
  cy.edges(`[source = "${nodeId}"][label = "solves"]`).forEach(edge => {
    targetNodes.add(edge.target().id());
    targetEdges.add(edge.id());
  });
  return { nodes: targetNodes, edges: targetEdges };
}

function getSolutionsForNodes(nodeIds) {
  const solutionNodes = new Set();
  const solutionEdges = new Set();
  nodeIds.forEach(id => {
    cy.edges(`[target = "${id}"][label = "solves"]`).forEach(edge => {
      solutionNodes.add(edge.source().id());
      solutionEdges.add(edge.id());
    });
  });
  return { nodes: solutionNodes, edges: solutionEdges };
}

function getPoliciesForNodes(nodeIds) {
  const policyNodes = new Set();
  const policyEdges = new Set();
  nodeIds.forEach(id => {
    cy.edges(`[target = "${id}"][label = "implements"]`).forEach(edge => {
      policyNodes.add(edge.source().id());
      policyEdges.add(edge.id());
    });
  });
  return { nodes: policyNodes, edges: policyEdges };
}

function getImplementTargets(nodeId) {
  const targetNodes = new Set();
  const targetEdges = new Set();
  cy.edges(`[source = "${nodeId}"][label = "implements"]`).forEach(edge => {
    targetNodes.add(edge.target().id());
    targetEdges.add(edge.id());
  });
  return { nodes: targetNodes, edges: targetEdges };
}

function getRisksFromNode(nodeId) {
  const riskNodes = new Set();
  const riskEdges = new Set();
  cy.edges(`[source = "${nodeId}"][label = "risks"]`).forEach(edge => {
    riskNodes.add(edge.target().id());
    riskEdges.add(edge.id());
  });
  return { nodes: riskNodes, edges: riskEdges };
}

function getRiskSources(nodeId) {
  const sourceNodes = new Set();
  const sourceEdges = new Set();
  cy.edges(`[target = "${nodeId}"][label = "risks"]`).forEach(edge => {
    sourceNodes.add(edge.source().id());
    sourceEdges.add(edge.id());
  });
  return { nodes: sourceNodes, edges: sourceEdges };
}

// === Feasibility rendering ===

const DIFFICULTY_COLORS = { easy: '#2ecc71', medium: '#f39c12', hard: '#e74c3c' };
const RISK_COLORS = { low: '#2ecc71', medium: '#f39c12', high: '#e74c3c' };

function ratingBadge(label, value, colorMap) {
  const color = colorMap[value] || '#888';
  return `<span class="rating-badge" style="--badge-color: ${color}">${label}: <strong>${value}</strong></span>`;
}

function practicalityBar(value) {
  const pct = (value / 5) * 100;
  return `<div class="practicality-bar"><span class="bar-label">Practicality</span><div class="bar-track"><div class="bar-fill" style="width: ${pct}%"></div></div><span class="bar-value">${value}/5</span></div>`;
}

function showSidebar(nodeData) {
  const sidebar = document.getElementById('sidebar-content');
  const node = nodes.find(n => n.id === nodeData.id);
  if (!node) return;

  const weight = weights[node.id] || 0;

  const causes = cy.edges(`[target = "${node.id}"][label = "causes"]`).map(e => {
    const src = nodes.find(n => n.id === e.source().id());
    return src ? { id: src.id, label: src.label.replace(/\n/g, ' '), type: src.type } : null;
  }).filter(Boolean);

  const effects = cy.edges(`[source = "${node.id}"][label = "causes"]`).map(e => {
    const tgt = nodes.find(n => n.id === e.target().id());
    return tgt ? { id: tgt.id, label: tgt.label.replace(/\n/g, ' '), type: tgt.type } : null;
  }).filter(Boolean);

  const solutions = cy.edges(`[target = "${node.id}"][label = "solves"]`).map(e => {
    const src = nodes.find(n => n.id === e.source().id());
    return src ? { id: src.id, label: src.label.replace(/\n/g, ' '), type: src.type } : null;
  }).filter(Boolean);

  const solves = cy.edges(`[source = "${node.id}"][label = "solves"]`).map(e => {
    const tgt = nodes.find(n => n.id === e.target().id());
    return tgt ? { id: tgt.id, label: tgt.label.replace(/\n/g, ' '), type: tgt.type } : null;
  }).filter(Boolean);

  const implementsTargets = cy.edges(`[source = "${node.id}"][label = "implements"]`).map(e => {
    const tgt = nodes.find(n => n.id === e.target().id());
    return tgt ? { id: tgt.id, label: tgt.label.replace(/\n/g, ' '), type: tgt.type } : null;
  }).filter(Boolean);

  const implementedBy = cy.edges(`[target = "${node.id}"][label = "implements"]`).map(e => {
    const src = nodes.find(n => n.id === e.source().id());
    return src ? { id: src.id, label: src.label.replace(/\n/g, ' '), type: src.type } : null;
  }).filter(Boolean);

  const risksCreated = cy.edges(`[source = "${node.id}"][label = "risks"]`).map(e => {
    const tgt = nodes.find(n => n.id === e.target().id());
    return tgt ? { id: tgt.id, label: tgt.label.replace(/\n/g, ' '), type: tgt.type } : null;
  }).filter(Boolean);

  const riskedBy = cy.edges(`[target = "${node.id}"][label = "risks"]`).map(e => {
    const src = nodes.find(n => n.id === e.source().id());
    return src ? { id: src.id, label: src.label.replace(/\n/g, ' '), type: src.type } : null;
  }).filter(Boolean);

  let html = `<div class="node-detail">`;
  html += `<h2>${node.label.replace(/\n/g, ' ')}</h2>`;
  html += `<div class="type-row">`;
  html += `<span class="node-type ${node.type}">${node.type === 'future_problem' ? 'future risk' : node.type}</span>`;
  if (node.status) html += `<span class="status-badge ${node.status}">${node.status}</span>`;
  html += `<span class="weight-badge" title="Contribution weight">⚖️ ${weight.toFixed(1)}</span>`;
  html += `</div>`;
  html += `<p class="description">${node.description}</p>`;

  // Feasibility ratings
  if (node.politicalDifficulty || node.economicDifficulty || node.practicality || node.sideEffectRisk) {
    html += `<div class="feasibility-section">`;
    html += `<h3>📊 Feasibility Assessment</h3>`;
    html += `<div class="ratings-grid">`;
    if (node.politicalDifficulty) html += ratingBadge('🏛️ Political', node.politicalDifficulty, DIFFICULTY_COLORS);
    if (node.economicDifficulty) html += ratingBadge('💰 Economic', node.economicDifficulty, DIFFICULTY_COLORS);
    if (node.sideEffectRisk) html += ratingBadge('⚠️ Side Effects', node.sideEffectRisk, RISK_COLORS);
    html += `</div>`;
    if (node.practicality) html += practicalityBar(node.practicality);
    if (node.riskDetail) html += `<p class="risk-detail">⚠️ ${node.riskDetail}</p>`;
    html += `</div>`;
  }

  // Sources
  if (node.sources && node.sources.length > 0) {
    html += `<div class="sources-section"><span class="sources-label">📚 Sources:</span> ${node.sources.join(' · ')}</div>`;
  }

  // Party popularity (policies only)
  const popularity = policyPopularity[node.id];
  if (popularity) {
    const stanceIcon = { support: '👍', oppose: '👎', mixed: '🤷' };
    const stanceColor = { support: '#2ecc71', oppose: '#e74c3c', mixed: '#f39c12' };
    html += `<div class="popularity-section"><h3>🗳️ Party Stances</h3><div class="party-stances">`;
    parties.forEach(p => {
      const stance = popularity[p.id] || 'mixed';
      html += `<div class="party-stance" style="border-left: 3px solid ${p.color}">`;
      html += `<span class="party-name" style="color:${p.color}">${p.label}</span>`;
      html += `<span class="stance-badge" style="color:${stanceColor[stance]}">${stanceIcon[stance]} ${stance}</span>`;
      html += `</div>`;
    });
    html += `</div></div>`;
  }

  if (causes.length > 0) {
    html += `<h3>⬆️ Caused by</h3><ul class="related-list causes-list">`;
    causes.forEach(c => { html += `<li data-id="${c.id}"><span class="rel-dot ${c.type}"></span>${c.label}</li>`; });
    html += `</ul>`;
  }

  if (effects.length > 0) {
    html += `<h3>⬇️ Contributes to</h3><ul class="related-list effects-list">`;
    effects.forEach(c => { html += `<li data-id="${c.id}"><span class="rel-dot ${c.type}"></span>${c.label}</li>`; });
    html += `</ul>`;
  }

  if (solutions.length > 0) {
    html += `<h3>💡 Can be addressed by</h3><ul class="related-list solutions-list">`;
    solutions.forEach(c => { html += `<li data-id="${c.id}"><span class="rel-dot solution"></span>${c.label}</li>`; });
    html += `</ul>`;
  }

  if (solves.length > 0) {
    html += `<h3>🎯 Addresses</h3><ul class="related-list solves-list">`;
    solves.forEach(c => { html += `<li data-id="${c.id}"><span class="rel-dot ${c.type}"></span>${c.label}</li>`; });
    html += `</ul>`;
  }

  if (implementsTargets.length > 0) {
    html += `<h3>🏗️ Implements</h3><ul class="related-list implements-list">`;
    implementsTargets.forEach(c => { html += `<li data-id="${c.id}"><span class="rel-dot ${c.type}"></span>${c.label}</li>`; });
    html += `</ul>`;
  }

  if (implementedBy.length > 0) {
    html += `<h3>🏛️ Government Policy</h3><ul class="related-list policy-list">`;
    implementedBy.forEach(c => { html += `<li data-id="${c.id}"><span class="rel-dot policy"></span>${c.label}</li>`; });
    html += `</ul>`;
  }

  if (risksCreated.length > 0) {
    html += `<h3>⚠️ Risks Creating</h3><ul class="related-list risks-list">`;
    risksCreated.forEach(c => { html += `<li data-id="${c.id}"><span class="rel-dot future_problem"></span>${c.label}</li>`; });
    html += `</ul>`;
  }

  if (riskedBy.length > 0) {
    html += `<h3>⚠️ Risked by</h3><ul class="related-list riskedby-list">`;
    riskedBy.forEach(c => { html += `<li data-id="${c.id}"><span class="rel-dot policy"></span>${c.label}</li>`; });
    html += `</ul>`;
  }

  html += `</div>`;
  sidebar.innerHTML = html;

  sidebar.querySelectorAll('.related-list li').forEach(li => {
    li.addEventListener('click', () => {
      const targetId = li.dataset.id;
      const targetNode = cy.getElementById(targetId);
      if (targetNode.length) {
        selectNode(targetNode);
        cy.animate({ center: { eles: targetNode }, duration: 300 });
      }
    });
  });
}

function selectNode(node) {
  cy.elements().removeClass('highlighted selected-node faded');

  const nodeId = node.id();
  const nodeData = node.data();
  const nodeType = nodeData.type;

  const allTrailNodes = new Set();
  const allTrailEdges = new Set();

  if (nodeType === 'solution') {
    // Solutions: follow solves edges to targets, then get full trails for those targets
    allTrailNodes.add(nodeId);
    const solveTargets = getSolveTargets(nodeId);
    solveTargets.nodes.forEach(id => allTrailNodes.add(id));
    solveTargets.edges.forEach(id => allTrailEdges.add(id));

    // For each target, get upstream & downstream causal trails
    solveTargets.nodes.forEach(targetId => {
      const up = getUpstreamTrail(targetId);
      up.nodes.forEach(id => allTrailNodes.add(id));
      up.edges.forEach(id => allTrailEdges.add(id));
      const down = getDownstreamTrail(targetId);
      down.nodes.forEach(id => allTrailNodes.add(id));
      down.edges.forEach(id => allTrailEdges.add(id));
    });

    // Show policies implementing this solution
    const policies = getPoliciesForNodes(new Set([nodeId]));
    policies.nodes.forEach(id => allTrailNodes.add(id));
    policies.edges.forEach(id => allTrailEdges.add(id));

  } else if (nodeType === 'policy') {
    // Policies: follow implements edges, then get trails for what those solutions solve
    allTrailNodes.add(nodeId);
    const implTargets = getImplementTargets(nodeId);
    implTargets.nodes.forEach(id => allTrailNodes.add(id));
    implTargets.edges.forEach(id => allTrailEdges.add(id));

    // For each implemented solution, find what it solves and trace those
    implTargets.nodes.forEach(solId => {
      const solveTargets = getSolveTargets(solId);
      solveTargets.nodes.forEach(id => allTrailNodes.add(id));
      solveTargets.edges.forEach(id => allTrailEdges.add(id));

      solveTargets.nodes.forEach(targetId => {
        const up = getUpstreamTrail(targetId);
        up.nodes.forEach(id => allTrailNodes.add(id));
        up.edges.forEach(id => allTrailEdges.add(id));
        const down = getDownstreamTrail(targetId);
        down.nodes.forEach(id => allTrailNodes.add(id));
        down.edges.forEach(id => allTrailEdges.add(id));
      });
    });

    // Show risks from this policy
    const risks = getRisksFromNode(nodeId);
    risks.nodes.forEach(id => allTrailNodes.add(id));
    risks.edges.forEach(id => allTrailEdges.add(id));

    // Follow downstream causes from future problems
    risks.nodes.forEach(fpId => {
      const down = getDownstreamTrail(fpId);
      down.nodes.forEach(id => allTrailNodes.add(id));
      down.edges.forEach(id => allTrailEdges.add(id));
    });

  } else if (nodeType === 'future_problem') {
    // Future problem: show what policy risks this, and downstream effects
    allTrailNodes.add(nodeId);
    const riskSources = getRiskSources(nodeId);
    riskSources.nodes.forEach(id => allTrailNodes.add(id));
    riskSources.edges.forEach(id => allTrailEdges.add(id));

    const down = getDownstreamTrail(nodeId);
    down.nodes.forEach(id => allTrailNodes.add(id));
    down.edges.forEach(id => allTrailEdges.add(id));

  } else {
    // Problems and causes: full upstream/downstream causal trails
    const upstream = getUpstreamTrail(nodeId);
    const downstream = getDownstreamTrail(nodeId);
    upstream.nodes.forEach(id => allTrailNodes.add(id));
    upstream.edges.forEach(id => allTrailEdges.add(id));
    downstream.nodes.forEach(id => allTrailNodes.add(id));
    downstream.edges.forEach(id => allTrailEdges.add(id));

    // Solutions for all nodes in the causal chain
    const solutions = getSolutionsForNodes(allTrailNodes);
    solutions.nodes.forEach(id => allTrailNodes.add(id));
    solutions.edges.forEach(id => allTrailEdges.add(id));

    // Policies implementing those solutions
    const policies = getPoliciesForNodes(new Set([...solutions.nodes, ...allTrailNodes]));
    policies.nodes.forEach(id => allTrailNodes.add(id));
    policies.edges.forEach(id => allTrailEdges.add(id));

    // Risks from policies in the trail
    const policyIds = [...allTrailNodes].filter(id => {
      const n = nodes.find(nn => nn.id === id);
      return n && n.type === 'policy';
    });
    policyIds.forEach(polId => {
      const risks = getRisksFromNode(polId);
      risks.nodes.forEach(id => allTrailNodes.add(id));
      risks.edges.forEach(id => allTrailEdges.add(id));
    });
  }

  // Fade everything, then un-fade the trail (but keep horizon-hidden elements hidden)
  cy.elements().addClass('faded');

  allTrailNodes.forEach(id => {
    const el = cy.getElementById(id);
    if (!el.hasClass('horizon-hidden')) el.removeClass('faded').addClass('highlighted');
  });
  allTrailEdges.forEach(id => {
    const el = cy.getElementById(id);
    if (!el.hasClass('horizon-hidden')) el.removeClass('faded').addClass('highlighted');
  });

  // Highlight parent group nodes that contain highlighted children
  const highlightedGroups = new Set();
  allTrailNodes.forEach(id => {
    const grp = nodeGroups[id];
    if (grp) highlightedGroups.add(grp);
  });
  highlightedGroups.forEach(grpId => {
    cy.getElementById(grpId).removeClass('faded').addClass('highlighted');
  });

  node.removeClass('faded').addClass('selected-node highlighted');

  showSidebar(nodeData);
}

cy.on('tap', 'node', (evt) => {
  if (evt.target.hasClass('group')) {
    selectGroup(evt.target);
    return;
  }
  selectNode(evt.target);
});

function selectGroup(groupNode) {
  const groupId = groupNode.id();
  const groupData = groups.find(g => g.id === groupId);
  const childNodes = groupNode.children();

  // Highlight the group and its children
  cy.elements().addClass('faded');
  groupNode.removeClass('faded').addClass('highlighted');
  childNodes.forEach(child => {
    if (!child.hasClass('horizon-hidden')) {
      child.removeClass('faded').addClass('highlighted');
    }
  });
  // Also highlight edges between children
  childNodes.forEach(child => {
    child.connectedEdges().forEach(edge => {
      const src = edge.source().id();
      const tgt = edge.target().id();
      const childIds = new Set(childNodes.map(c => c.id()));
      if (childIds.has(src) && childIds.has(tgt) && !edge.hasClass('horizon-hidden')) {
        edge.removeClass('faded').addClass('highlighted');
      }
    });
  });

  // Build summary
  const childData = childNodes.filter(c => !c.hasClass('horizon-hidden')).map(c => {
    const d = c.data();
    return nodes.find(n => n.id === d.id);
  }).filter(Boolean);

  const byType = {};
  childData.forEach(n => {
    if (!byType[n.type]) byType[n.type] = [];
    byType[n.type].push(n);
  });

  const typeLabels = {
    problem: { icon: '🔴', title: 'Problems' },
    cause: { icon: '🟠', title: 'Causes' },
    solution: { icon: '🟢', title: 'Solutions' },
    policy: { icon: '🔵', title: 'Government Policies' },
    future_problem: { icon: '🟣', title: 'Future Risks' },
  };

  let html = `<div class="node-header"><span class="node-type group">${groupData ? groupData.label : groupId}</span></div>`;
  html += `<p class="node-desc" style="margin-bottom:12px">${childData.length} nodes in this group</p>`;

  for (const [type, info] of Object.entries(typeLabels)) {
    const items = byType[type];
    if (!items || items.length === 0) continue;
    html += `<div class="section-label">${info.icon} ${info.title} (${items.length})</div><ul class="related-list">`;
    items.forEach(item => {
      html += `<li><span class="rel-dot ${item.type}"></span>${item.label.replace(/\n/g, ' ')}</li>`;
    });
    html += '</ul>';

    // For problems, show their descriptions
    if (type === 'problem') {
      items.forEach(item => {
        html += `<div style="margin: 8px 0 12px 0; padding: 8px 12px; background: rgba(231,76,60,0.08); border-radius: 6px; border-left: 3px solid #e74c3c;">`;
        html += `<strong style="color:#e74c3c">${item.label.replace(/\n/g, ' ')}</strong>`;
        html += `<p class="node-desc" style="margin-top:4px;font-size:0.82rem">${item.description}</p></div>`;
      });
    }
  }

  document.getElementById('sidebar-content').innerHTML = html;
}

cy.on('tap', (evt) => {
  if (evt.target === cy) {
    cy.elements().removeClass('highlighted selected-node faded');
    document.getElementById('sidebar-content').innerHTML = `
      <div class="placeholder">
        <p>👈 Click a node to explore</p>
        <p class="hint">
          <strong style="color:#e74c3c">■</strong> Problems &nbsp;
          <strong style="color:#e67e22">■</strong> Causes &nbsp;
          <strong style="color:#2ecc71">■</strong> Solutions &nbsp;
          <strong style="color:#3498db">■</strong> Policies &nbsp;
          <strong style="color:#8e44ad">■</strong> Future Risks
        </p>
        <p class="hint" style="margin-top:8px">Click any node to see its full causal chain, solutions, and government policies. Node size reflects contribution weight.</p>
      </div>
    `;
  }
});

// === Horizon slider ===

const HORIZONS = ['now', 'decade', '30years', 'further'];
const HORIZON_LABELS = ['Now', 'Next Decade', '30 Years', 'Further'];

function getNodeHorizon(nodeId) {
  const node = nodes.find(n => n.id === nodeId);
  if (!node) return 'now';
  if (node.horizon) return node.horizon;
  if (node.type === 'future_problem') return 'decade';
  return 'now';
}

function getHorizonIndex(horizon) {
  const idx = HORIZONS.indexOf(horizon);
  return idx >= 0 ? idx : 0;
}

const nodeHorizonIdx = {};
nodes.forEach(n => {
  nodeHorizonIdx[n.id] = getHorizonIndex(getNodeHorizon(n.id));
});

function applyHorizonFilter(maxIdx) {
  cy.elements().removeClass('horizon-hidden');

  const hiddenNodes = new Set();
  nodes.forEach(n => {
    const idx = nodeHorizonIdx[n.id];
    if (idx > maxIdx) {
      hiddenNodes.add(n.id);
    }
  });

  hiddenNodes.forEach(id => {
    cy.getElementById(id).addClass('horizon-hidden');
  });

  cy.edges().forEach(edge => {
    if (hiddenNodes.has(edge.source().id()) || hiddenNodes.has(edge.target().id())) {
      edge.addClass('horizon-hidden');
    }
  });

  groups.forEach(g => {
    const children = cy.getElementById(g.id).children();
    const visibleChildren = children.filter(c => !c.hasClass('horizon-hidden'));
    if (visibleChildren.length === 0) {
      cy.getElementById(g.id).addClass('horizon-hidden');
    } else {
      cy.getElementById(g.id).removeClass('horizon-hidden');
    }
  });
}

const slider = document.getElementById('horizon-slider');
const label = document.getElementById('horizon-label');

slider.addEventListener('input', () => {
  const idx = parseInt(slider.value);
  label.textContent = HORIZON_LABELS[idx];
  applyHorizonFilter(idx);
  cy.elements().removeClass('highlighted selected-node faded');

});

// Apply initial filter
applyHorizonFilter(parseInt(slider.value));

// === Party Stance Dropdown ===
const partySelect = document.getElementById('party-select');

// Populate dropdown with parties
parties.forEach(p => {
  const opt = document.createElement('option');
  opt.value = p.id;
  opt.textContent = `🗳️ ${p.label}`;
  opt.style.color = p.color;
  partySelect.appendChild(opt);
});

function applyPartyView(partyId) {
  // Clear any previous stance classes
  cy.nodes().removeClass('stance-support stance-oppose stance-mixed');
  
  if (!partyId) return;
  
  // Apply stance classes to policy nodes
  Object.entries(policyPopularity).forEach(([polId, stances]) => {
    const stance = stances[partyId];
    if (stance) {
      const node = cy.getElementById(polId);
      if (node.length) {
        node.addClass(`stance-${stance}`);
      }
    }
  });
}

partySelect.addEventListener('change', () => {
  applyPartyView(partySelect.value);
});
