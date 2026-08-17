/* Diagramas do documento em versão navegável — Cytoscape.js (+ dagre). */
(function () {
  'use strict';

  const KSL = window.KSL || (window.KSL = {});
  KSL.registry = KSL.registry || {};

  /** Cytoscape usa seu próprio parser de cores: a mistura é feita aqui, em hex. */
  function toRgb(color) {
    const hex = String(color).trim();
    const short = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(hex);
    if (short) {
      return [parseInt(short[1] + short[1], 16), parseInt(short[2] + short[2], 16), parseInt(short[3] + short[3], 16)];
    }
    const long = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
    if (long) {
      return [parseInt(long[1], 16), parseInt(long[2], 16), parseInt(long[3], 16)];
    }
    const rgb = /rgba?\(([^)]+)\)/i.exec(hex);
    if (rgb) {
      const parts = rgb[1].split(',').map((v) => parseFloat(v));
      return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
    }
    return null;
  }

  function mix(color, base, ratio) {
    const a = toRgb(color);
    const b = toRgb(base);
    if (!a || !b) return color;
    const c = a.map((v, i) => Math.round(v * ratio + b[i] * (1 - ratio)));
    return 'rgb(' + c.join(',') + ')';
  }

  function styleSheet(p) {
    const base = {
      label: 'data(label)',
      color: p.text,
      'text-wrap': 'wrap',
      'text-max-width': '150px',
      'text-valign': 'center',
      'text-halign': 'center',
      'font-family': 'Inter, Segoe UI, system-ui, sans-serif',
      'font-size': '11px',
      shape: 'round-rectangle',
      width: 'label',
      height: 'label',
      padding: '9px',
      'background-color': p.surface,
      'border-width': 1,
      'border-color': p.border
    };

    const tinted = (color) => ({
      'background-color': mix(color, p.surface, p.isDark ? 0.18 : 0.12),
      'border-color': color,
      color: p.textStrong
    });

    return [
      { selector: 'node', style: base },
      { selector: 'node.root', style: Object.assign({}, tinted(p.accent), { 'font-weight': 700, 'font-size': '12px' }) },
      { selector: 'node.step', style: tinted(p.violet) },
      { selector: 'node.leaf', style: { 'background-color': p.bgSoft, color: p.muted } },
      { selector: 'node.restricao', style: tinted(p.warn) },
      { selector: 'node.algebra', style: tinted(p.accent) },
      { selector: 'node.equacao', style: tinted(p.warn) },
      { selector: 'node.funcao', style: tinted(p.violet) },
      { selector: 'node.future', style: { 'background-color': p.bgSoft, color: p.muted, 'border-style': 'dashed', 'border-color': p.muted } },
      {
        selector: 'edge',
        style: {
          width: 1.5,
          'line-color': mix(p.muted, p.bgSoft, 0.75),
          'target-arrow-color': mix(p.muted, p.bgSoft, 0.75),
          'target-arrow-shape': 'triangle',
          'arrow-scale': 0.8,
          'curve-style': 'bezier'
        }
      },
      {
        selector: 'node:selected',
        style: { 'border-width': 2, 'border-color': p.accent, color: p.textStrong }
      },
      {
        selector: '.faded',
        style: { opacity: 0.25 }
      },
      {
        selector: '.highlight',
        style: { 'line-color': p.accent, 'target-arrow-color': p.accent, width: 2.5, opacity: 1 }
      }
    ];
  }

  KSL.registry.diagram = function diagram(host, spec) {
    if (!window.cytoscape) {
      host.innerHTML = '<p class="widget-fallback">Cytoscape.js não carregou; use a aba do diagrama original.</p>';
      return;
    }

    const p = KSL.palette();
    const hasDagre = Boolean(window.dagre && window.cytoscapeDagre);
    const layout = Object.assign({ fit: true, padding: 20, animate: false }, spec.layout || {});
    if (layout.name === 'dagre' && !hasDagre) {
      Object.assign(layout, { name: 'breadthfirst', directed: true, spacingFactor: 1.05 });
    }

    const cy = window.cytoscape({
      container: host,
      elements: JSON.parse(JSON.stringify(spec.elements || [])),
      style: styleSheet(p),
      layout: layout,
      wheelSensitivity: 0.25,
      maxZoom: 2.5,
      minZoom: 0.25
    });

    // Clique em um nó realça o caminho até a raiz — útil para ler dependências.
    cy.on('tap', 'node', (event) => {
      const node = event.target;
      cy.elements().removeClass('highlight').addClass('faded');
      const path = node.predecessors().union(node).union(node.successors());
      path.removeClass('faded');
      path.edges().addClass('highlight');
    });

    cy.on('tap', (event) => {
      if (event.target === cy) cy.elements().removeClass('faded highlight');
    });

    const hint = document.createElement('p');
    hint.className = 'diagram-hint';
    hint.textContent = 'Arraste para mover · role para ampliar · clique em um nó para isolar o caminho';
    if (!host.nextElementSibling || !host.nextElementSibling.classList.contains('diagram-hint')) {
      host.insertAdjacentElement('afterend', hint);
    }

    // A altura acompanha o tamanho do grafo: sem isso, árvores grandes ficariam
    // com rótulos ilegíveis para caber em uma caixa de altura fixa.
    function adjust() {
      const bounds = cy.elements().boundingBox();
      const width = host.clientWidth || 560;
      const zoomByWidth = width / Math.max(1, bounds.w + 48);
      const zoom = Math.min(0.95, Math.max(0.5, zoomByWidth));
      host.style.height = Math.round(Math.min(1100, Math.max(320, bounds.h * zoom + 56))) + 'px';
      cy.resize();
      cy.fit(undefined, 24);
    }

    adjust();
    window.requestAnimationFrame(adjust);
  };
})();
