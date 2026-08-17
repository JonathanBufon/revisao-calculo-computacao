/* Curvas y = f(x) — Function Plot (D3 por baixo). */
(function () {
  'use strict';

  const KSL = window.KSL || (window.KSL = {});
  KSL.registry = KSL.registry || {};

  function hostSize(host) {
    const width = Math.max(260, Math.floor(host.clientWidth || host.parentElement.clientWidth || 640));
    const height = Math.round(Math.min(460, Math.max(260, width * 0.6)));
    return { width: width, height: height };
  }

  function legend(items) {
    const el = document.createElement('div');
    el.className = 'widget-legend';
    el.innerHTML = items
      .map(
        (item) =>
          '<span><i class="legend-swatch' + (item.dot ? ' dot' : '') + '" style="background:' + item.color + '"></i>' +
          item.label +
          '</span>'
      )
      .join('');
    return el;
  }

  /**
   * Monta os `data` do function-plot a partir da configuração declarativa
   * usada em src/widgets.js.
   */
  function buildPlot(host, config, palette) {
    const p = palette;
    const size = hostSize(host);
    const target = document.createElement('div');
    target.className = 'plot-host';
    host.appendChild(target);

    const data = [];
    const legendItems = [];

    (config.curves || []).forEach((curve) => {
      const color = KSL.color(curve.color, p);
      // `ranges` desenha a curva em trechos: é assim que uma assíntota vertical
      // deixa de ser ligada por um traço que não existe.
      const ranges = curve.ranges || [curve.range || null];
      ranges.forEach((range) => {
        const datum = { fn: curve.fn, color: color, graphType: 'polyline' };
        if (range) datum.range = range;
        if (curve.nSamples) datum.nSamples = curve.nSamples;
        data.push(datum);
      });
      legendItems.push({ color: color, label: curve.label || curve.fn });
    });

    (config.levels || []).forEach((level) => {
      data.push({
        fn: String(level.y),
        color: p.muted,
        graphType: 'polyline',
        skipTip: true,
        attr: { 'stroke-dasharray': '4 4', 'stroke-width': 1 }
      });
      if (level.label) legendItems.push({ color: p.muted, label: level.label });
    });

    (config.points || []).forEach((point) => {
      const color = KSL.color(point.color || 'warn', p);
      data.push({
        points: [[point.x, point.y]],
        fnType: 'points',
        graphType: 'scatter',
        color: color,
        attr: { r: 4.5, 'stroke-width': 2 }
      });
      if (point.label) legendItems.push({ color: color, label: point.label, dot: true });
    });

    (config.holes || []).forEach((hole) => {
      data.push({
        points: [[hole.x, hole.y]],
        fnType: 'points',
        graphType: 'scatter',
        color: p.danger,
        attr: { r: 5, fill: p.bgSoft, 'stroke-width': 2.2 }
      });
      if (hole.label) legendItems.push({ color: p.danger, label: hole.label, dot: true });
    });

    const annotations = [];
    (config.asymptotes || []).forEach((x) => {
      annotations.push({ x: x, text: 'assíntota x = ' + x });
    });
    (config.levels || []).forEach((level) => {
      annotations.push({ y: level.y, text: level.label || 'y = ' + level.y });
    });
    (config.excluded || []).forEach((band) => {
      annotations.push({ x: band.to, text: band.label || 'limite do domínio' });
    });

    const instance = window.functionPlot({
      target: target,
      width: size.width,
      height: size.height,
      grid: true,
      disableZoom: false,
      xAxis: { domain: config.xDomain || [-6, 6], label: 'x' },
      yAxis: { domain: config.yDomain || [-6, 6], label: 'y' },
      annotations: annotations,
      tip: { xLine: true, yLine: true, renderer: (x, y) => 'x = ' + x.toFixed(2) + ' , y = ' + y.toFixed(2) },
      data: data
    });

    // Eixos, malha e rótulos seguem o tema da página.
    const svg = target.querySelector('svg');
    if (svg) {
      svg.querySelectorAll('.x.axis path, .y.axis path, .x.axis line, .y.axis line').forEach((el) => {
        el.setAttribute('stroke', p.border);
      });
      svg.querySelectorAll('text').forEach((el) => {
        el.setAttribute('fill', p.muted);
        el.style.fontSize = '10px';
      });
      svg.querySelectorAll('.annotations text').forEach((el) => el.setAttribute('fill', p.accent));
      svg.querySelectorAll('.annotations line, .annotations path').forEach((el) => {
        el.setAttribute('stroke', p.accent);
        el.setAttribute('stroke-dasharray', '5 4');
      });
    }

    if (legendItems.length) host.appendChild(legend(legendItems));
    return instance;
  }

  KSL.registry.plot = function plot(host, config) {
    if (!window.functionPlot) {
      host.innerHTML = '<p class="widget-fallback">Function Plot não carregou.</p>';
      return;
    }
    buildPlot(host, config, KSL.palette());
  };

  /* -------------------------------------------------- laboratório (extra) */

  KSL.registry.lab = function lab(host, config) {
    if (!window.functionPlot) {
      host.innerHTML = '<p class="widget-fallback">Function Plot não carregou.</p>';
      return;
    }

    const p = KSL.palette();
    const presets = config.presets || [];

    const controls = document.createElement('div');
    controls.className = 'widget-controls';

    const input = document.createElement('input');
    input.type = 'text';
    input.value = (presets[0] && presets[0].fn) || 'x^2 - 4';
    input.setAttribute('aria-label', 'Expressão em x');
    controls.appendChild(input);

    const draw = document.createElement('button');
    draw.type = 'button';
    draw.className = 'ghost-btn';
    draw.textContent = 'Plotar';
    controls.appendChild(draw);

    const chips = document.createElement('div');
    chips.className = 'widget-controls';
    presets.forEach((preset) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip-btn';
      chip.textContent = preset.label;
      chip.addEventListener('click', () => {
        input.value = preset.fn;
        render();
      });
      chips.appendChild(chip);
    });

    const canvas = document.createElement('div');
    const error = document.createElement('p');
    error.className = 'widget-error';
    error.hidden = true;

    host.appendChild(controls);
    host.appendChild(chips);
    host.appendChild(canvas);
    host.appendChild(error);

    function render() {
      canvas.innerHTML = '';
      error.hidden = true;
      try {
        buildPlot(canvas, {
          xDomain: config.xDomain,
          yDomain: config.yDomain,
          curves: [{ fn: input.value.trim(), color: 'accent', label: 'f(x) = ' + input.value.trim() }]
        }, p);
      } catch (err) {
        error.hidden = false;
        error.textContent = 'Expressão não reconhecida: ' + (err && err.message ? err.message : String(err));
      }
    }

    draw.addEventListener('click', render);
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        render();
      }
    });

    render();
  };
})();
