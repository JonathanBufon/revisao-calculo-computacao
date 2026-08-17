'use strict';

/** Montagem do HTML da página a partir do documento estruturado. */

const VENDOR = [
  '/vendor/katex/katex.min.js',
  '/vendor/jsxgraph/jsxgraphcore.js',
  '/vendor/function-plot/function-plot.js',
  '/vendor/plotly/plotly.min.js',
  '/vendor/cytoscape/cytoscape.min.js',
  '/vendor/dagre/dagre.min.js',
  '/vendor/cytoscape-dagre/cytoscape-dagre.js'
];

const APP_SCRIPTS = [
  '/js/widgets/diagrams.js',
  '/js/widgets/plots.js',
  '/js/widgets/geometry.js',
  '/js/widgets/charts.js',
  '/js/widgets/deck.js',
  '/js/app.js'
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function chapterLabel(chapter) {
  return chapter.number ? `${chapter.number}. ${chapter.title}` : chapter.title;
}

function renderNav(parts) {
  return parts
    .map(
      (part) => `
      <section class="nav-part">
        <h2 class="nav-part-title">${escapeHtml(part.title)}</h2>
        <ul class="nav-list">
          ${part.chapters
            .map(
              (chapter) => `
            <li>
              <a class="nav-link" href="#${chapter.slug}" data-target="${chapter.slug}">
                <span class="nav-num">${chapter.number || '·'}</span>
                <span class="nav-text">${escapeHtml(chapter.title)}</span>
              </a>
            </li>`
            )
            .join('')}
        </ul>
      </section>`
    )
    .join('');
}

function renderChapters(chapters) {
  const total = chapters.filter((c) => c.number).length;

  return chapters
    .map((chapter, index) => {
      const prev = chapters[index - 1];
      const next = chapters[index + 1];
      const eyebrow = chapter.number
        ? `Seção ${chapter.number} de ${total}`
        : chapter.key === 'lab'
          ? 'Apêndice interativo'
          : 'Encerramento';

      const toc = chapter.headings
        .filter((h) => h.level <= 3 && h.text)
        .map(
          (h) =>
            `<li class="toc-item toc-l${h.level}"><a href="#${h.id}" data-toc="${h.id}">${escapeHtml(h.text)}</a></li>`
        )
        .join('');

      return `
    <article class="chapter" id="${chapter.slug}" data-chapter="${chapter.slug}" hidden>
      <header class="chapter-head">
        <p class="eyebrow">${eyebrow}</p>
        <h2 class="chapter-title">${escapeHtml(chapter.title)}</h2>
      </header>
      ${toc ? `<nav class="chapter-toc" aria-label="Índice da seção"><p class="chapter-toc-title">Nesta seção</p><ul>${toc}</ul></nav>` : ''}
      <div class="prose">${chapter.html}</div>
      <nav class="pager" aria-label="Navegação entre seções">
        ${prev ? `<a class="pager-link pager-prev" href="#${prev.slug}" data-target="${prev.slug}"><span>Anterior</span><strong>${escapeHtml(chapterLabel(prev))}</strong></a>` : '<span></span>'}
        ${next ? `<a class="pager-link pager-next" href="#${next.slug}" data-target="${next.slug}"><span>Próxima</span><strong>${escapeHtml(chapterLabel(next))}</strong></a>` : '<span></span>'}
      </nav>
    </article>`;
    })
    .join('');
}

/**
 * @param {object} doc documento estruturado (src/document.js)
 * @param {{assetPrefix?: string}} [options] prefixo dos assets: '/' no servidor,
 *   './' na exportação estática (permite abrir o arquivo direto no navegador).
 */
function page(doc, options = {}) {
  const { docTitle, chapters, parts, clientData } = doc;
  const at = (path) => `${options.assetPrefix || '/'}${path.replace(/^\//, '')}`;

  return `<!DOCTYPE html>
<html lang="pt-BR" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(docTitle)}</title>
  <meta name="description" content="Revisão de base para Cálculo em Computação: álgebra, funções, domínio, imagem e gráficos, com representações interativas.">
  <link rel="stylesheet" href="${at('vendor/katex/katex.min.css')}">
  <link rel="stylesheet" href="${at('vendor/jsxgraph/jsxgraph.css')}">
  <link rel="stylesheet" href="${at('css/styles.css')}">
</head>
<body>
  <a class="skip-link" href="#conteudo">Ir para o conteúdo</a>

  <div class="shell">
    <aside class="sidebar" id="sidebar">
      <div class="brand">
        <span class="brand-mark">KSL</span>
        <h1 class="brand-title">${escapeHtml(docTitle.replace(/^KSL\s*—\s*/, ''))}</h1>
        <p class="brand-sub">Álgebra elementar e Pré-Cálculo · revisão de base</p>
      </div>
      <div class="nav-search">
        <input type="search" id="nav-search" placeholder="Filtrar seções (/)" aria-label="Filtrar seções">
      </div>
      <nav class="nav" id="chapter-nav" aria-label="Seções do documento">
        ${renderNav(parts)}
      </nav>
      <p class="sidebar-foot">
        Renderizado de <code>KSL — Revisão de Base para Cálculo em Computação.md</code><br>
        KaTeX · JSXGraph · Function Plot · Plotly.js · Cytoscape.js
      </p>
    </aside>

    <div class="main">
      <header class="topbar">
        <button type="button" class="icon-btn" id="menu-toggle" aria-label="Abrir navegação">☰</button>
        <p class="topbar-title" id="topbar-title">${escapeHtml(docTitle)}</p>
        <div class="topbar-actions">
          <button type="button" class="ghost-btn" id="reading-toggle" aria-pressed="false">Leitura contínua</button>
          <button type="button" class="icon-btn" id="theme-toggle" aria-label="Alternar tema">◐</button>
        </div>
        <div class="progress"><span id="progress-bar"></span></div>
      </header>

      <main id="conteudo" class="content">
        ${renderChapters(chapters)}
      </main>
    </div>
  </div>

  <script id="ksl-data" type="application/json">${JSON.stringify(clientData).replace(/</g, '\\u003c')}</script>
  ${VENDOR.map((src) => `<script src="${at(src)}" defer></script>`).join('\n  ')}
  ${APP_SCRIPTS.map((src) => `<script src="${at(src)}" defer></script>`).join('\n  ')}
</body>
</html>
`;
}

module.exports = { page, VENDOR, APP_SCRIPTS };
