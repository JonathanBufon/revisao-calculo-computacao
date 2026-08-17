'use strict';

/**
 * Pipeline de markdown do KSL.
 *
 * Responsabilidades:
 *  - renderizar o markdown com matemática LaTeX (delimitadores \[ \] e \( \)) via KaTeX;
 *  - gerar ids estáveis e únicos para cada título (usados na navegação);
 *  - transformar blocos ```text (diagramas ASCII) em figuras com visualização dupla
 *    (ASCII + grafo interativo, quando existir um grafo registrado para a chave).
 */

const MarkdownIt = require('markdown-it');
const anchor = require('markdown-it-anchor');
const texmath = require('markdown-it-texmath');
const katex = require('katex');

const KATEX_OPTIONS = {
  throwOnError: false,
  strict: false,
  trust: false,
  macros: {
    '\\R': '\\mathbb{R}'
  }
};

// Contexto mutável usado pelos renderers/slugify durante o render de um capítulo.
const ctx = {
  prefix: 'doc',
  usedSlugs: new Set(),
  diagramCount: 0
};

function stripMath(text) {
  return String(text)
    // \( ... \) e \[ ... \]: mantém o conteúdo, sem os comandos LaTeX
    .replace(/\\[[(]([\s\S]*?)\\[\])]/g, (_, inner) => inner)
    .replace(/\\operatorname\s*{([^}]*)}/g, '$1')
    .replace(/\\[a-zA-Z]+/g, ' ')
    .replace(/[{}$^_\\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugBase(text) {
  return stripMath(text)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'secao';
}

function uniqueSlug(text) {
  const base = `${ctx.prefix}-${slugBase(text)}`;
  let slug = base;
  let n = 2;
  while (ctx.usedSlugs.has(slug)) {
    slug = `${base}-${n}`;
    n += 1;
  }
  ctx.usedSlugs.add(slug);
  return slug;
}

const md = new MarkdownIt({ html: false, linkify: true, breaks: false })
  .use(texmath, {
    engine: katex,
    delimiters: 'brackets',
    katexOptions: KATEX_OPTIONS
  })
  .use(anchor, {
    level: [2, 3, 4],
    slugify: uniqueSlug,
    tabIndex: false
  });

/** Blocos ```text são diagramas: viram figura com abas ASCII / grafo. */
md.renderer.rules.fence = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const info = (token.info || '').trim();
  const code = md.utils.escapeHtml(token.content.replace(/\s+$/, ''));

  if (info !== 'text') {
    return `<pre class="code-block"><code>${code}</code></pre>\n`;
  }

  ctx.diagramCount += 1;
  const key = `${ctx.prefix}-${ctx.diagramCount}`;

  return [
    `<figure class="diagram" data-diagram="${key}">`,
    '  <div class="diagram-toolbar" hidden>',
    `    <button type="button" class="diagram-tab is-active" data-view="graph">Grafo interativo</button>`,
    `    <button type="button" class="diagram-tab" data-view="ascii">Diagrama original</button>`,
    '  </div>',
    `  <div class="diagram-graph" hidden></div>`,
    `  <pre class="diagram-ascii"><code>${code}</code></pre>`,
    '</figure>\n'
  ].join('\n');
};

/** Tabelas ganham wrapper com scroll horizontal. */
md.renderer.rules.table_open = () => '<div class="table-wrap"><table>';
md.renderer.rules.table_close = () => '</table></div>';

/**
 * Renderiza um trecho de markdown.
 * @param {string} source
 * @param {{prefix?: string}} [options]
 * @returns {{html: string, headings: Array<{id: string, level: number, text: string}>, diagrams: string[]}}
 */
function render(source, options = {}) {
  ctx.prefix = options.prefix || 'doc';
  ctx.diagramCount = 0;

  const env = {};
  const tokens = md.parse(source, env);

  const headings = [];
  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    if (token.type !== 'heading_open') continue;
    const inline = tokens[i + 1];
    headings.push({
      id: token.attrGet('id'),
      level: Number(token.tag.slice(1)),
      text: stripMath(inline ? inline.content : '')
    });
  }

  // O título do capítulo já é um <h2> na página: os títulos internos descem um
  // nível para manter a hierarquia do documento coerente.
  for (const token of tokens) {
    if (token.type === 'heading_open' || token.type === 'heading_close') {
      const level = Math.min(Number(token.tag.slice(1)) + 1, 6);
      token.tag = `h${level}`;
    }
  }

  const html = md.renderer.render(tokens, md.options, env);

  const diagrams = [];
  for (let i = 1; i <= ctx.diagramCount; i += 1) {
    diagrams.push(`${ctx.prefix}-${i}`);
  }

  return { html, headings, diagrams };
}

/** Render inline (sem <p>), para legendas curtas. */
function renderInline(source) {
  return md.renderInline(String(source), {});
}

/** Render de matemática isolada, para rótulos de widgets no servidor. */
function renderMath(latex, displayMode = false) {
  return katex.renderToString(latex, { ...KATEX_OPTIONS, displayMode });
}

function resetSlugs() {
  ctx.usedSlugs = new Set();
}

module.exports = { render, renderInline, renderMath, resetSlugs, stripMath, slugBase };
