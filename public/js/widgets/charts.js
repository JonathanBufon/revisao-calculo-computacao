/* Séries numéricas — Plotly.js. */
(function () {
  'use strict';

  const KSL = window.KSL || (window.KSL = {});
  KSL.registry = KSL.registry || {};

  function costChart(host, p) {
    const n = [];
    for (let i = 1; i <= 20; i += 1) n.push(i);

    const C = n.map((v) => 2 * v * v + 5 * v + 10);
    const quad = n.map((v) => v * v);
    const nlogn = n.map((v) => v * Math.log2(v || 1));

    const axis = {
      gridcolor: p.borderSoft,
      zerolinecolor: p.border,
      linecolor: p.border,
      tickfont: { color: p.muted, size: 11 },
      titlefont: { color: p.muted, size: 12 }
    };

    const traces = [
      {
        x: n, y: C, name: 'C(n) = 2n² + 5n + 10', type: 'scatter', mode: 'lines+markers',
        line: { color: p.accent, width: 2 }, marker: { size: 6, color: p.accent },
        hovertemplate: 'n = %{x}<br>C(n) = %{y}<extra></extra>'
      },
      {
        x: n, y: quad, name: 'n²', type: 'scatter', mode: 'lines',
        line: { color: p.violet, width: 1.5, dash: 'dash' },
        hovertemplate: 'n = %{x}<br>n² = %{y}<extra></extra>'
      },
      {
        x: n, y: nlogn, name: 'n · log₂ n', type: 'scatter', mode: 'lines',
        line: { color: p.ok, width: 1.5, dash: 'dot' },
        hovertemplate: 'n = %{x}<br>n·log₂n = %{y:.1f}<extra></extra>'
      }
    ];

    const layout = {
      autosize: true,
      height: 380,
      margin: { l: 52, r: 16, t: 16, b: 44 },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      font: { color: p.text, family: 'Inter, Segoe UI, system-ui, sans-serif', size: 12 },
      xaxis: Object.assign({ title: 'n (tamanho da entrada)', dtick: 2 }, axis),
      yaxis: Object.assign({ title: 'custo' }, axis),
      legend: { orientation: 'h', y: -0.22, font: { size: 11, color: p.muted } },
      hoverlabel: { bgcolor: p.surface, bordercolor: p.border, font: { color: p.text } }
    };

    const plotDiv = document.createElement('div');
    host.appendChild(plotDiv);
    window.Plotly.newPlot(plotDiv, traces, layout, {
      responsive: true,
      displaylogo: false,
      modeBarButtonsToRemove: ['select2d', 'lasso2d', 'autoScale2d', 'toggleSpikelines']
    });

    // Tabela de valores: a mesma função em outra representação.
    const sample = [1, 2, 5, 10, 20];
    const table = document.createElement('div');
    table.className = 'table-wrap';
    table.innerHTML =
      '<table><thead><tr><th>n</th>' +
      sample.map((v) => '<th>' + v + '</th>').join('') +
      '</tr></thead><tbody><tr><td>C(n)</td>' +
      sample.map((v) => '<td>' + (2 * v * v + 5 * v + 10) + '</td>').join('') +
      '</tr></tbody></table>';
    host.appendChild(table);
  }

  const KINDS = { cost: costChart };

  KSL.registry.chart = function chart(host, config) {
    if (!window.Plotly) {
      host.innerHTML = '<p class="widget-fallback">Plotly.js não carregou.</p>';
      return;
    }
    const build = KINDS[config.kind];
    if (!build) {
      host.innerHTML = '<p class="widget-fallback">Gráfico desconhecido: ' + config.kind + '</p>';
      return;
    }
    build(host, KSL.palette());
  };
})();
