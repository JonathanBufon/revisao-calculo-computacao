'use strict';

/**
 * Leitura e estruturação do documento KSL.
 *
 * O arquivo markdown é a fonte única e nunca é modificado: aqui ele apenas é
 * dividido em capítulos (pelos títulos numerados), renderizado, e recebe os
 * blocos de widgets interativos ao fim das subseções correspondentes.
 */

const fs = require('fs');
const path = require('path');

const markdown = require('./markdown');
const { WIDGETS, LAB } = require('./widgets');
const { DIAGRAMS } = require('./data/diagrams');
const { FLASHCARDS } = require('./data/flashcards');

const SOURCE_FILE = path.join(
  __dirname,
  '..',
  'KSL — Revisão de Base para Cálculo em Computação.md'
);

/** Agrupamento dos capítulos na navegação lateral. */
const PARTS = [
  { title: 'Abertura', chapters: [1, 2, 3] },
  { title: 'Base teórica', chapters: [4, 5, 6, 7] },
  { title: 'Prática e cuidados', chapters: [8, 9, 10, 11, 12, 13] },
  { title: 'Consolidação', chapters: [14, 15, 16, 17, 18, 19] },
  { title: 'Procedência', chapters: [20, 21, 'fluxo'] },
  { title: 'Apêndice interativo', chapters: ['lab'] }
];

/**
 * Divide o markdown em capítulos. Um capítulo começa em qualquer título de
 * nível 1 ou 2 cujo texto comece por "N." (ex.: "## 1. Identificação",
 * "# 7. Propriedades principais"), além do bloco final "Fluxo de aprendizagem KSL".
 */
function splitChapters(source) {
  const lines = source.split('\n');
  const chapters = [];
  let docTitle = 'KSL';
  let current = null;
  let inFence = false;

  for (const line of lines) {
    if (/^\s*```/.test(line)) inFence = !inFence;

    const heading = inFence ? null : line.match(/^(#{1,2})\s+(.+?)\s*$/);
    if (heading) {
      const text = heading[2].trim();
      const numbered = text.match(/^(\d+)\.\s+(.+)$/);

      if (numbered) {
        current = {
          key: numbered[1],
          number: numbered[1],
          title: numbered[2],
          lines: []
        };
        chapters.push(current);
        continue;
      }

      if (/^Fluxo de aprendizagem/i.test(text)) {
        current = { key: 'fluxo', number: null, title: text, lines: [] };
        chapters.push(current);
        continue;
      }

      if (heading[1] === '#' && chapters.length === 0) {
        docTitle = text;
        continue;
      }
    }

    if (current) current.lines.push(line);
  }

  return { docTitle, chapters };
}

/**
 * Insere um bloco HTML no fim da subseção iniciada por `headingId`
 * (ou seja, antes do próximo título ou divisor). Sem âncora, vai para o fim.
 */
function insertAfterSection(html, headingId, block) {
  if (!headingId) return html + block;

  const start = html.indexOf(`id="${headingId}"`);
  if (start === -1) return html + block;

  const rest = html.slice(start);
  const next = rest.search(/<h[1-4][\s>]|<hr\s*\/?>/);
  if (next === -1) return html + block;

  const at = start + next;
  return html.slice(0, at) + block + html.slice(at);
}

/** HTML do container de um widget. A inicialização é feita no cliente. */
function widgetBlock(widget) {
  return [
    `\n<figure class="widget" data-widget="${widget.type}" data-widget-id="${widget.id}">`,
    '  <figcaption class="widget-head">',
    `    <span class="widget-chip">Complemento · ${widget.lib}</span>`,
    `    <h4 class="widget-title">${markdown.renderInline(widget.title)}</h4>`,
    '  </figcaption>',
    '  <div class="widget-body"></div>',
    `  <div class="widget-note">${markdown.renderInline(widget.caption)}</div>`,
    '</figure>\n'
  ].join('\n');
}

function buildLabChapter() {
  const bodyIntro = markdown.renderInline(
    'Este capítulo **não faz parte do documento**: é um apêndice para experimentar as funções ' +
    'discutidas nas seções anteriores.'
  );

  return {
    key: 'lab',
    number: null,
    title: 'Laboratório',
    slug: 'clab',
    html: `<p class="lead">${bodyIntro}</p>` + widgetBlock(LAB),
    headings: [],
    diagrams: [],
    widgets: [LAB]
  };
}

function build() {
  const source = fs.readFileSync(SOURCE_FILE, 'utf8');
  const { docTitle, chapters } = splitChapters(source);

  markdown.resetSlugs();

  const built = chapters.map((chapter) => {
    const prefix = `c${chapter.key}`;
    const rendered = markdown.render(chapter.lines.join('\n'), { prefix });

    const widgets = WIDGETS.filter((w) => String(w.chapter) === String(chapter.key));
    let html = rendered.html;

    for (const widget of widgets) {
      let headingId = null;
      if (widget.anchor && widget.anchor !== 'end') {
        const match = rendered.headings.find((h) => widget.anchor.test(h.text));
        headingId = match ? match.id : null;
      }
      html = insertAfterSection(html, headingId, widgetBlock(widget));
    }

    return {
      key: chapter.key,
      number: chapter.number,
      title: chapter.title,
      slug: prefix,
      html,
      headings: rendered.headings,
      diagrams: rendered.diagrams.filter((key) => Boolean(DIAGRAMS[key])),
      widgets
    };
  });

  built.push(buildLabChapter());

  const byKey = new Map(built.map((c) => [String(c.key), c]));
  const parts = PARTS.map((part) => ({
    title: part.title,
    chapters: part.chapters.map((key) => byKey.get(String(key))).filter(Boolean)
  }));

  // Capítulos não previstos em PARTS entram em um grupo final, para nada se perder.
  const listed = new Set(parts.flatMap((p) => p.chapters.map((c) => String(c.key))));
  const orphans = built.filter((c) => !listed.has(String(c.key)));
  if (orphans.length) parts.push({ title: 'Outras seções', chapters: orphans });

  const usedDiagrams = {};
  for (const chapter of built) {
    for (const key of chapter.diagrams) usedDiagrams[key] = DIAGRAMS[key];
  }

  const clientData = {
    diagrams: usedDiagrams,
    widgets: built.flatMap((c) =>
      c.widgets.map((w) => ({ id: w.id, type: w.type, config: w.config || {} }))
    ),
    flashcards: FLASHCARDS.map((group) => ({
      group: group.group,
      cards: group.cards.map((card) => ({
        n: card.n,
        verdict: card.verdict || null,
        q: markdown.renderInline(card.q),
        a: markdown.renderInline(card.a)
      }))
    }))
  };

  return { docTitle, chapters: built, parts, clientData, sourceFile: SOURCE_FILE };
}

module.exports = { build, SOURCE_FILE };
