/* Baralho de revisão ativa: perguntas da seção 16, respostas da seção 17. */
(function () {
  'use strict';

  const KSL = window.KSL || (window.KSL = {});
  KSL.registry = KSL.registry || {};

  function shuffle(list) {
    const out = list.slice();
    for (let i = out.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = out[i];
      out[i] = out[j];
      out[j] = tmp;
    }
    return out;
  }

  function cardEl(card) {
    const el = document.createElement('article');
    el.className = 'card';

    const num = document.createElement('p');
    num.className = 'card-num';
    num.textContent = 'Questão ' + card.n;

    const question = document.createElement('div');
    question.className = 'card-q';
    question.innerHTML = card.q;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'card-toggle';
    toggle.textContent = 'Ver resposta';
    toggle.setAttribute('aria-expanded', 'false');

    const answer = document.createElement('div');
    answer.className = 'card-a' + (card.verdict ? ' verdict-' + card.verdict : '');
    answer.innerHTML = card.a;
    answer.hidden = true;

    const setOpen = (open) => {
      answer.hidden = !open;
      el.classList.toggle('is-open', open);
      toggle.textContent = open ? 'Ocultar resposta' : 'Ver resposta';
      toggle.setAttribute('aria-expanded', String(open));
    };

    toggle.addEventListener('click', () => setOpen(answer.hidden));

    el.appendChild(num);
    el.appendChild(question);
    el.appendChild(toggle);
    el.appendChild(answer);
    el.setOpen = setOpen;
    return el;
  }

  KSL.registry.deck = function deck(host) {
    const groups = (KSL.data && KSL.data.flashcards) || [];
    if (!groups.length) {
      host.innerHTML = '<p class="widget-fallback">Nenhuma questão carregada.</p>';
      return;
    }

    const bar = document.createElement('div');
    bar.className = 'deck-bar';

    const count = document.createElement('span');
    const total = groups.reduce((sum, g) => sum + g.cards.length, 0);
    count.textContent = total + ' questões';

    const spacer = document.createElement('span');
    spacer.className = 'spacer';

    const revealAll = document.createElement('button');
    revealAll.type = 'button';
    revealAll.className = 'ghost-btn';
    revealAll.textContent = 'Revelar todas';

    const hideAll = document.createElement('button');
    hideAll.type = 'button';
    hideAll.className = 'ghost-btn';
    hideAll.textContent = 'Ocultar todas';

    const shuffleBtn = document.createElement('button');
    shuffleBtn.type = 'button';
    shuffleBtn.className = 'ghost-btn';
    shuffleBtn.textContent = 'Embaralhar';

    bar.appendChild(count);
    bar.appendChild(spacer);
    bar.appendChild(revealAll);
    bar.appendChild(hideAll);
    bar.appendChild(shuffleBtn);
    host.appendChild(bar);

    const body = document.createElement('div');
    host.appendChild(body);

    let cards = [];

    function paint(order) {
      body.innerHTML = '';
      cards = [];
      groups.forEach((group) => {
        const section = document.createElement('section');
        section.className = 'deck-group';

        const title = document.createElement('h5');
        title.className = 'deck-group-title';
        title.textContent = group.group;

        const grid = document.createElement('div');
        grid.className = 'deck-grid';

        (order === 'shuffled' ? shuffle(group.cards) : group.cards).forEach((card) => {
          const el = cardEl(card);
          cards.push(el);
          grid.appendChild(el);
        });

        section.appendChild(title);
        section.appendChild(grid);
        body.appendChild(section);
      });
    }

    revealAll.addEventListener('click', () => cards.forEach((el) => el.setOpen(true)));
    hideAll.addEventListener('click', () => cards.forEach((el) => el.setOpen(false)));
    shuffleBtn.addEventListener('click', () => paint('shuffled'));

    paint('original');
  };
})();
