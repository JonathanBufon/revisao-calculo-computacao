/* KSL — casca da aplicação: navegação, tema, progresso e ciclo de vida dos widgets. */
(function () {
  'use strict';

  const KSL = window.KSL || (window.KSL = {});
  KSL.registry = KSL.registry || {};

  const dataEl = document.getElementById('ksl-data');
  KSL.data = dataEl ? JSON.parse(dataEl.textContent) : { widgets: [], diagrams: {}, flashcards: [] };
  KSL.widgetConfig = new Map(KSL.data.widgets.map((w) => [w.id, w]));

  const chapters = Array.from(document.querySelectorAll('.chapter'));
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const topbarTitle = document.getElementById('topbar-title');
  const progressBar = document.getElementById('progress-bar');
  const searchInput = document.getElementById('nav-search');

  /* ------------------------------------------------------------- paleta */

  KSL.palette = function palette() {
    const css = getComputedStyle(document.documentElement);
    const get = (name, fallback) => (css.getPropertyValue(name) || fallback).trim();
    return {
      accent: get('--accent', '#4cc2f5'),
      violet: get('--violet', '#a78bfa'),
      ok: get('--ok', '#4ade80'),
      warn: get('--warn', '#fbbf24'),
      danger: get('--danger', '#fb7185'),
      text: get('--text', '#e9edf7'),
      textStrong: get('--text-strong', '#ffffff'),
      muted: get('--muted', '#93a0bd'),
      border: get('--border', '#26304a'),
      borderSoft: get('--border-soft', '#1d2740'),
      surface: get('--surface', '#131b2d'),
      bg: get('--bg', '#0a0f1e'),
      bgSoft: get('--bg-soft', '#0e1526'),
      isDark: document.documentElement.dataset.theme !== 'light'
    };
  };

  KSL.color = function color(name, palette) {
    const p = palette || KSL.palette();
    return p[name] || name;
  };

  KSL.math = function math(latex, el, displayMode) {
    if (!window.katex) {
      el.textContent = latex;
      return;
    }
    window.katex.render(latex, el, {
      throwOnError: false,
      strict: false,
      displayMode: Boolean(displayMode)
    });
  };

  /* --------------------------------------------- inicialização de widgets */

  const instances = new Map(); // host -> { destroy?: fn, render: fn }

  function mountWidget(figure) {
    const id = figure.dataset.widgetId;
    const type = figure.dataset.widget;
    const host = figure.querySelector('.widget-body');
    const entry = KSL.widgetConfig.get(id);
    const factory = KSL.registry[type];

    if (!host || !factory) return;

    const run = () => {
      try {
        host.innerHTML = '';
        factory(host, (entry && entry.config) || {}, { id: id, figure: figure });
      } catch (error) {
        host.innerHTML = '<p class="widget-fallback">Não foi possível montar esta representação.</p>';
        console.error('[KSL] widget', id, error);
      }
    };

    run();
    instances.set(host, { render: run, kind: type });
  }

  function mountDiagram(figure) {
    const factory = KSL.registry.diagram;
    if (!factory) return;
    const key = figure.dataset.diagram;
    const spec = KSL.data.diagrams[key];
    if (!spec) return;

    const host = figure.querySelector('.diagram-graph');
    const ascii = figure.querySelector('.diagram-ascii');
    const toolbar = figure.querySelector('.diagram-toolbar');

    host.hidden = false;
    ascii.hidden = true;
    toolbar.hidden = false;

    const run = () => {
      host.innerHTML = '';
      factory(host, spec, { key: key, figure: figure });
    };

    toolbar.addEventListener('click', (event) => {
      const button = event.target.closest('.diagram-tab');
      if (!button) return;
      const view = button.dataset.view;
      toolbar.querySelectorAll('.diagram-tab').forEach((b) => b.classList.toggle('is-active', b === button));
      host.hidden = view !== 'graph';
      ascii.hidden = view !== 'ascii';
      if (view === 'graph') run();
    });

    run();
    instances.set(host, { render: run, kind: 'diagram' });
  }

  function initChapter(chapter) {
    if (chapter.dataset.mounted === 'true') return;
    chapter.dataset.mounted = 'true';
    chapter.querySelectorAll('.widget[data-widget-id]').forEach(mountWidget);
    chapter.querySelectorAll('.diagram[data-diagram]').forEach(mountDiagram);
  }

  // O baralho e o laboratório guardam estado do usuário (cartas reveladas,
  // expressão digitada): não são refeitos por mudança de tamanho.
  const KEEP_ON_RESIZE = { deck: true, lab: true };
  const KEEP_ON_THEME = { deck: true };

  KSL.rerenderAll = function rerenderAll(reason) {
    const keep = reason === 'theme' ? KEEP_ON_THEME : KEEP_ON_RESIZE;
    instances.forEach((instance, host) => {
      if (host.offsetParent === null) return; // invisível: será refeito ao aparecer
      if (keep[instance.kind]) return;
      instance.render();
    });
  };

  /* ------------------------------------------------------------ navegação */

  const ownerOf = new Map();
  chapters.forEach((chapter) => {
    ownerOf.set(chapter.id, chapter);
    chapter.querySelectorAll('[id]').forEach((el) => ownerOf.set(el.id, chapter));
  });

  let currentChapter = null;

  function showChapter(chapter, options) {
    const opts = options || {};
    if (!chapter) return;

    if (currentChapter !== chapter) {
      chapters.forEach((c) => {
        c.hidden = c !== chapter;
      });
      currentChapter = chapter;

      navLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.target === chapter.id));

      const title = chapter.querySelector('.chapter-title');
      const eyebrow = chapter.querySelector('.eyebrow');
      if (topbarTitle && title) {
        topbarTitle.textContent = (eyebrow ? eyebrow.textContent + ' · ' : '') + title.textContent;
      }

      try {
        localStorage.setItem('ksl:chapter', chapter.id);
      } catch (error) { /* modo privado */ }
    }

    initChapter(chapter);

    if (opts.scrollTo) {
      const target = document.getElementById(opts.scrollTo);
      if (target && target !== chapter) {
        target.scrollIntoView({ block: 'start' });
        window.requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
        return;
      }
    }
    if (opts.keepScroll !== true) window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function navigate(hash, options) {
    const id = String(hash || '').replace(/^#/, '');
    const chapter = ownerOf.get(id) || chapters[0];
    const isDeepLink = chapter && chapter.id !== id;
    showChapter(chapter, Object.assign({ scrollTo: isDeepLink ? id : null }, options));
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href');
    if (hash === '#' || hash === '#conteudo') return;
    event.preventDefault();
    if (window.location.hash !== hash) {
      window.history.pushState(null, '', hash);
    }
    navigate(hash);
    document.body.classList.remove('nav-open');
  });

  window.addEventListener('popstate', () => navigate(window.location.hash));

  /* ------------------------------------------------- modo leitura contínua */

  const readingToggle = document.getElementById('reading-toggle');
  if (readingToggle) {
    readingToggle.addEventListener('click', () => {
      const on = document.body.classList.toggle('reading-mode');
      readingToggle.setAttribute('aria-pressed', String(on));
      if (on) chapters.forEach(initChapter);
      window.setTimeout(() => KSL.rerenderAll('reading'), 60);
    });
  }

  /* ------------------------------------------------------------------ tema */

  const themeToggle = document.getElementById('theme-toggle');
  const THEMES = { claro: 'light', escuro: 'dark', light: 'light', dark: 'dark' };
  const asked = THEMES[new URLSearchParams(window.location.search).get('tema')];

  try {
    const saved = localStorage.getItem('ksl:theme');
    if (asked) document.documentElement.dataset.theme = asked;
    else if (saved) document.documentElement.dataset.theme = saved;
  } catch (error) {
    if (asked) document.documentElement.dataset.theme = asked;
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem('ksl:theme', next);
      } catch (error) { /* ignore */ }
      window.setTimeout(() => KSL.rerenderAll('theme'), 30);
    });
  }

  /* ---------------------------------------------------------------- menu */

  const menuToggle = document.getElementById('menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => document.body.classList.toggle('nav-open'));
  }

  /* --------------------------------------------------------------- busca */

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const term = searchInput.value.trim().toLowerCase();
      document.querySelectorAll('.nav-part').forEach((part) => {
        let visible = 0;
        part.querySelectorAll('.nav-list li').forEach((li) => {
          const text = li.textContent.toLowerCase();
          const hide = term && text.indexOf(term) === -1;
          li.classList.toggle('is-hidden', Boolean(hide));
          if (!hide) visible += 1;
        });
        part.classList.toggle('is-hidden', visible === 0);
      });
    });
  }

  /* ------------------------------------------------------------- teclado */

  document.addEventListener('keydown', (event) => {
    const tag = (event.target.tagName || '').toLowerCase();
    const typing = tag === 'input' || tag === 'textarea' || event.target.isContentEditable;

    if (event.key === '/' && !typing) {
      event.preventDefault();
      if (searchInput) searchInput.focus();
      return;
    }
    if (typing || event.metaKey || event.ctrlKey || event.altKey) return;

    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      const index = chapters.indexOf(currentChapter);
      const next = chapters[index + (event.key === 'ArrowRight' ? 1 : -1)];
      if (next) {
        window.history.pushState(null, '', '#' + next.id);
        navigate('#' + next.id);
      }
    }
  });

  /* ------------------------------------------------------------ progresso */

  function updateProgress() {
    if (!progressBar) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    progressBar.style.width = (ratio * 100).toFixed(2) + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  /* -------------------------------------------------------------- resize */

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => KSL.rerenderAll('resize'), 220);
  });

  /* ---------------------------------------------------------------- start */

  function start() {
    let initial = window.location.hash;
    if (!initial) {
      try {
        const saved = localStorage.getItem('ksl:chapter');
        if (saved && ownerOf.has(saved)) initial = '#' + saved;
      } catch (error) { /* ignore */ }
    }
    navigate(initial);
    updateProgress();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
