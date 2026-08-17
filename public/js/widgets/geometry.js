/* Construções interativas — JSXGraph. */
(function () {
  'use strict';

  const KSL = window.KSL || (window.KSL = {});
  KSL.registry = KSL.registry || {};

  let boardSeq = 0;

  function makeBoard(host, boundingbox, options) {
    boardSeq += 1;
    const box = document.createElement('div');
    box.id = 'jxg-' + boardSeq;
    box.className = 'geo-host';
    const width = Math.max(260, host.clientWidth || 620);
    box.style.width = '100%';
    box.style.height = Math.round(Math.min(440, Math.max(280, width * 0.62))) + 'px';
    host.appendChild(box);

    const p = KSL.palette();
    return window.JXG.JSXGraph.initBoard(box.id, Object.assign({
      boundingbox: boundingbox,
      axis: true,
      showCopyright: false,
      showNavigation: false,
      keepAspectRatio: false,
      pan: { enabled: true, needShift: false },
      zoom: { wheel: false },
      defaultAxes: {
        x: { strokeColor: p.border, ticks: { strokeColor: p.border, label: { color: p.muted, fontSize: 10 } } },
        y: { strokeColor: p.border, ticks: { strokeColor: p.border, label: { color: p.muted, fontSize: 10 } } }
      }
    }, options || {}));
  }

  function readout(host) {
    const el = document.createElement('div');
    el.className = 'widget-readout';
    host.appendChild(el);
    return el;
  }

  function slider(label, min, max, step, value, onInput) {
    const wrap = document.createElement('label');
    wrap.className = 'geo-slider';
    wrap.style.display = 'inline-flex';
    wrap.style.alignItems = 'center';
    wrap.style.gap = '0.4rem';

    const name = document.createElement('span');
    name.textContent = label;
    name.style.fontFamily = 'var(--font-mono)';
    name.style.color = 'var(--accent)';

    const input = document.createElement('input');
    input.type = 'range';
    input.min = String(min);
    input.max = String(max);
    input.step = String(step);
    input.value = String(value);
    input.addEventListener('input', () => onInput(parseFloat(input.value)));

    const out = document.createElement('output');
    out.textContent = Number(value).toFixed(1);
    out.style.fontFamily = 'var(--font-mono)';
    out.style.minWidth = '2.2rem';

    input.addEventListener('input', () => {
      out.textContent = parseFloat(input.value).toFixed(1);
    });

    wrap.appendChild(name);
    wrap.appendChild(input);
    wrap.appendChild(out);
    return wrap;
  }

  /* ------------------------------------------------ 1) plano cartesiano */

  function cartesian(host) {
    const p = KSL.palette();
    const f = (x) => x * x - 4 * x + 3;

    const controls = document.createElement('div');
    controls.className = 'widget-controls';
    host.appendChild(controls);

    const board = makeBoard(host, [-2.5, 9, 6.5, -3.5]);
    const out = readout(host);

    const curve = board.create('functiongraph', [f, -2.5, 6.5], {
      strokeColor: p.accent,
      strokeWidth: 1.2,
      strokeOpacity: 0.35,
      highlight: false,
      fixed: true
    });

    const base = board.create('glider', [3.2, 0, board.defaultAxes.x], {
      name: 'x',
      size: 4,
      strokeColor: p.danger,
      fillColor: p.danger,
      label: { color: p.muted, offset: [6, -14] }
    });

    const point = board.create('point', [() => base.X(), () => f(base.X())], {
      name: 'P',
      size: 3,
      strokeColor: p.accent,
      fillColor: p.accent,
      fixed: true,
      trace: true,
      label: { color: p.textStrong, offset: [8, 8] }
    });

    board.create('segment', [base, point], { strokeColor: p.muted, dash: 2, strokeWidth: 1, fixed: true });
    board.create('segment', [point, [0, () => f(base.X())]], {
      strokeColor: p.muted, dash: 2, strokeWidth: 1, fixed: true
    });

    const clear = document.createElement('button');
    clear.type = 'button';
    clear.className = 'ghost-btn';
    clear.textContent = 'Limpar rastro';
    clear.addEventListener('click', () => {
      point.clearTrace();
      board.update();
    });

    const hint = document.createElement('span');
    hint.style.color = 'var(--muted)';
    hint.style.fontSize = '0.78rem';
    hint.textContent = 'Arraste o ponto vermelho sobre o eixo x — o rastro azul é o gráfico.';

    controls.appendChild(clear);
    controls.appendChild(hint);

    function update() {
      const x = base.X();
      KSL.math(
        'x = ' + x.toFixed(2) + ' \\quad\\Longrightarrow\\quad P = (' + x.toFixed(2) + ',\\; ' + f(x).toFixed(2) + ')',
        out
      );
    }

    base.on('drag', update);
    board.on('update', update);
    update();
    return board;
  }

  /* --------------------------------------------- 2) identidade (a+b)² */

  function squareIdentity(host) {
    const p = KSL.palette();
    const state = { a: 3, b: 2 };

    const controls = document.createElement('div');
    controls.className = 'widget-controls';
    host.appendChild(controls);

    const board = makeBoard(host, [-1.2, 9.2, 9.2, -1.2], { keepAspectRatio: true, axis: false });
    const out = readout(host);

    const A = () => state.a;
    const B = () => state.b;

    const region = (points, color, label) => {
      board.create('polygon', points, {
        fillColor: color,
        fillOpacity: 0.22,
        highlight: false,
        withLines: true,
        borders: { strokeColor: color, strokeWidth: 1.5, highlight: false, fixed: true },
        vertices: { visible: false, fixed: true },
        fixed: true
      });
      board.create('text', label.at, {
        fontSize: 15,
        color: color,
        anchorX: 'middle',
        anchorY: 'middle',
        fixed: true,
        highlight: false
      });
    };

    // a²
    region(
      [[0, 0], [A, 0], [A, A], [0, A]],
      p.accent,
      { at: [() => A() / 2, () => A() / 2, 'a²'], text: 'a²' }
    );
    // ab (inferior direito)
    region(
      [[A, 0], [() => A() + B(), 0], [() => A() + B(), A], [A, A]],
      p.violet,
      { at: [() => A() + B() / 2, () => A() / 2, 'ab'], text: 'ab' }
    );
    // ab (superior esquerdo)
    region(
      [[0, A], [A, A], [A, () => A() + B()], [0, () => A() + B()]],
      p.violet,
      { at: [() => A() / 2, () => A() + B() / 2, 'ab'], text: 'ab' }
    );
    // b²
    region(
      [[A, A], [() => A() + B(), A], [() => A() + B(), () => A() + B()], [A, () => A() + B()]],
      p.ok,
      { at: [() => A() + B() / 2, () => A() + B() / 2, 'b²'], text: 'b²' }
    );

    board.create('text', [() => (A() + B()) / 2, -0.55, () => 'a + b'], {
      fontSize: 13, color: p.muted, anchorX: 'middle', fixed: true, highlight: false
    });

    function update() {
      const a = state.a;
      const b = state.b;
      const total = (a + b) * (a + b);
      const side = a + b;
      // A janela acompanha o quadrado: a figura ocupa sempre a área disponível.
      board.setBoundingBox([-0.9, side + 0.9, side + 0.9, -0.9], true);
      KSL.math(
        '(' + a.toFixed(1) + '+' + b.toFixed(1) + ')^2 = ' +
        a.toFixed(1) + '^2 + 2\\cdot' + a.toFixed(1) + '\\cdot' + b.toFixed(1) + ' + ' + b.toFixed(1) + '^2 = ' +
        total.toFixed(2),
        out,
        true
      );
      board.update();
    }

    controls.appendChild(slider('a', 0.5, 4, 0.1, state.a, (value) => {
      state.a = value;
      update();
    }));
    controls.appendChild(slider('b', 0.5, 4, 0.1, state.b, (value) => {
      state.b = value;
      update();
    }));

    update();
    return board;
  }

  /* ------------------------------------------------ 3) reta secante */

  function secant(host) {
    const p = KSL.palette();
    const f = (x) => 0.5 * x * x - x - 1;

    const board = makeBoard(host, [-3.5, 7, 6.5, -4]);
    const out = readout(host);

    board.create('functiongraph', [f, -3.5, 6.5], { strokeColor: p.accent, strokeWidth: 2, fixed: true, highlight: false });

    const ga = board.create('glider', [-1, 0, board.defaultAxes.x], {
      name: 'a', size: 4, strokeColor: p.ok, fillColor: p.ok, label: { color: p.ok, offset: [4, -16] }
    });
    const gb = board.create('glider', [4, 0, board.defaultAxes.x], {
      name: 'b', size: 4, strokeColor: p.warn, fillColor: p.warn, label: { color: p.warn, offset: [4, -16] }
    });

    const pa = board.create('point', [() => ga.X(), () => f(ga.X())], {
      name: 'A', size: 3, strokeColor: p.ok, fillColor: p.ok, fixed: true, label: { color: p.muted }
    });
    const pb = board.create('point', [() => gb.X(), () => f(gb.X())], {
      name: 'B', size: 3, strokeColor: p.warn, fillColor: p.warn, fixed: true, label: { color: p.muted }
    });

    board.create('line', [pa, pb], { strokeColor: p.violet, strokeWidth: 2, fixed: true, highlight: false });
    board.create('segment', [ga, pa], { strokeColor: p.muted, dash: 2, strokeWidth: 1, fixed: true });
    board.create('segment', [gb, pb], { strokeColor: p.muted, dash: 2, strokeWidth: 1, fixed: true });

    // Triângulo Δx / Δy da taxa média.
    board.create('polygon', [pa, [() => gb.X(), () => f(ga.X())], pb], {
      fillColor: p.violet,
      fillOpacity: 0.1,
      borders: { strokeColor: p.violet, dash: 3, strokeWidth: 1, highlight: false, fixed: true },
      vertices: { visible: false, fixed: true },
      fixed: true,
      highlight: false
    });

    // Tangente em A (f'(x) = x - 1), para comparar com a secante.
    const fp = (x) => x - 1;
    board.create(
      'line',
      [
        [() => ga.X() - 2, () => f(ga.X()) - 2 * fp(ga.X())],
        [() => ga.X() + 2, () => f(ga.X()) + 2 * fp(ga.X())]
      ],
      { strokeColor: p.ok, dash: 2, strokeWidth: 1.4, fixed: true, highlight: false, straightFirst: false, straightLast: false }
    );

    function update() {
      const a = ga.X();
      const b = gb.X();
      if (Math.abs(b - a) < 1e-6) {
        KSL.math('b - a \\to 0:\\ \\text{a secante virou tangente}', out, true);
        return;
      }
      const slope = (f(b) - f(a)) / (b - a);
      KSL.math(
        '\\frac{f(b)-f(a)}{b-a} = \\frac{' + f(b).toFixed(2) + ' - (' + f(a).toFixed(2) + ')}{' +
        b.toFixed(2) + ' - (' + a.toFixed(2) + ')} = ' + slope.toFixed(3),
        out,
        true
      );
    }

    ga.on('drag', update);
    gb.on('drag', update);
    board.on('update', update);
    update();
    return board;
  }

  const KINDS = { cartesian: cartesian, 'square-identity': squareIdentity, secant: secant };

  KSL.registry.geometry = function geometry(host, config) {
    if (!window.JXG) {
      host.innerHTML = '<p class="widget-fallback">JSXGraph não carregou.</p>';
      return;
    }
    const build = KINDS[config.kind];
    if (!build) {
      host.innerHTML = '<p class="widget-fallback">Construção desconhecida: ' + config.kind + '</p>';
      return;
    }
    build(host);
  };
})();
