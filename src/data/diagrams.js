'use strict';

/**
 * Versão interativa (Cytoscape.js) dos diagramas ASCII do documento.
 *
 * A chave é `c<capítulo>-<n-ésimo bloco ```text do capítulo>`. Os nós reproduzem
 * exatamente os rótulos do diagrama original; nada é acrescentado ao conteúdo —
 * apenas o mesmo diagrama em outra representação. O bloco ASCII original continua
 * disponível na aba ao lado.
 */

/** Atalho para montar nós/arestas de uma cadeia linear. */
function chain(labels, group) {
  const nodes = labels.map((label, i) => ({
    data: { id: `n${i}`, label },
    classes: typeof group === 'function' ? group(i, label) : group || ''
  }));
  const edges = labels.slice(1).map((_, i) => ({
    data: { id: `e${i}`, source: `n${i}`, target: `n${i + 1}` }
  }));
  return [...nodes, ...edges];
}

/** Atalho para montar uma árvore a partir de pares [pai, filho]. */
function tree(root, pairs, classOf = () => '') {
  const ids = new Map();
  const nodes = [];
  const edges = [];

  const idFor = (label) => {
    if (!ids.has(label)) {
      const id = `n${ids.size}`;
      ids.set(label, id);
      nodes.push({ data: { id, label }, classes: classOf(label) });
    }
    return ids.get(label);
  };

  idFor(root);
  pairs.forEach(([parent, child], i) => {
    edges.push({ data: { id: `e${i}`, source: idFor(parent), target: idFor(child) } });
  });

  return [...nodes, ...edges];
}

const DIAGRAMS = {
  // Seção 2 — cadeia dos nove assuntos até o Cálculo
  'c2-1': {
    title: 'Cadeia dos nove assuntos',
    layout: { name: 'dagre', rankDir: 'TB', nodeSep: 18, rankSep: 26 },
    elements: chain(
      [
        'Operações algébricas',
        'Produtos notáveis',
        'Fatoração',
        'Frações algébricas',
        'Potenciação e radiciação',
        'Equações',
        'Funções',
        'Domínio e imagem',
        'Gráficos',
        'Limites',
        'Derivadas',
        'Integrais'
      ],
      (i) => (i >= 9 ? 'future' : i >= 6 ? 'funcao' : i === 5 ? 'equacao' : 'algebra')
    )
  },

  // Seção 6 — estratégia geral de resolução
  'c6-1': {
    title: 'Estratégia geral',
    layout: { name: 'dagre', rankDir: 'LR', nodeSep: 12, rankSep: 40 },
    elements: tree(
      'Expressão ou função recebida',
      [
        ['Expressão ou função recebida', '1. Identificar operações'],
        ['Expressão ou função recebida', '2. Procurar produtos notáveis'],
        ['Expressão ou função recebida', '3. Fatorar quando útil'],
        ['Expressão ou função recebida', '4. Registrar restrições'],
        ['4. Registrar restrições', 'denominador ≠ 0'],
        ['4. Registrar restrições', 'radicando de raiz par ≥ 0'],
        ['Expressão ou função recebida', '5. Simplificar'],
        ['Expressão ou função recebida', '6. Se houver igualdade, resolver'],
        ['Expressão ou função recebida', '7. Se houver função'],
        ['7. Se houver função', 'determinar domínio'],
        ['7. Se houver função', 'determinar imagem'],
        ['7. Se houver função', 'calcular pontos importantes'],
        ['Expressão ou função recebida', '8. Interpretar ou construir o gráfico']
      ],
      (label) => {
        if (label === 'Expressão ou função recebida') return 'root';
        if (/^\d\./.test(label)) return 'step';
        if (/≠|≥/.test(label)) return 'restricao';
        return 'leaf';
      }
    )
  },

  // Seção 14 — síntese estrutural
  'c14-1': {
    title: 'Síntese estrutural',
    layout: { name: 'dagre', rankDir: 'LR', nodeSep: 8, rankSep: 44 },
    elements: tree(
      'REVISÃO DE BASE PARA CÁLCULO',
      [
        ['REVISÃO DE BASE PARA CÁLCULO', 'Motivação'],
        ['Motivação', 'dominar manipulações usadas em Cálculo'],

        ['REVISÃO DE BASE PARA CÁLCULO', 'Dependências'],
        ['Dependências', 'números reais'],
        ['Dependências', 'variáveis'],
        ['Dependências', 'igualdade'],
        ['Dependências', 'plano cartesiano'],

        ['REVISÃO DE BASE PARA CÁLCULO', 'Álgebra'],
        ['Álgebra', 'operações'],
        ['operações', 'distributividade'],
        ['operações', 'termos semelhantes'],
        ['Álgebra', 'produtos notáveis'],
        ['Álgebra', 'fatoração'],
        ['Álgebra', 'frações algébricas'],
        ['Álgebra', 'potências e raízes'],

        ['REVISÃO DE BASE PARA CÁLCULO', 'Equações'],
        ['Equações', 'conjunto solução'],
        ['Equações', 'equivalência'],
        ['Equações', 'verificação'],

        ['REVISÃO DE BASE PARA CÁLCULO', 'Funções'],
        ['Funções', 'entrada'],
        ['Funções', 'saída'],
        ['Funções', 'domínio'],
        ['Funções', 'imagem'],

        ['REVISÃO DE BASE PARA CÁLCULO', 'Gráficos'],
        ['Gráficos', 'pontos (x, f(x))'],
        ['Gráficos', 'zeros'],
        ['Gráficos', 'crescimento'],
        ['Gráficos', 'decrescimento'],
        ['Gráficos', 'extremos'],

        ['REVISÃO DE BASE PARA CÁLCULO', 'Exemplos'],
        ['Exemplos', 'função racional'],
        ['Exemplos', 'função quadrática'],

        ['REVISÃO DE BASE PARA CÁLCULO', 'Relações'],
        ['Relações', 'limites'],
        ['Relações', 'derivadas'],
        ['Relações', 'taxa de variação'],

        ['REVISÃO DE BASE PARA CÁLCULO', 'Aplicações'],
        ['Aplicações', 'simplificação'],
        ['Aplicações', 'modelagem'],
        ['Aplicações', 'análise gráfica'],

        ['REVISÃO DE BASE PARA CÁLCULO', 'Limitações'],
        ['Limitações', 'restrições de domínio'],
        ['Limitações', 'tópicos posteriores não cobertos']
      ],
      (label) => {
        if (label === 'REVISÃO DE BASE PARA CÁLCULO') return 'root';
        const branches = [
          'Motivação', 'Dependências', 'Álgebra', 'Equações',
          'Funções', 'Gráficos', 'Exemplos', 'Relações', 'Aplicações', 'Limitações'
        ];
        if (branches.includes(label)) return 'step';
        return 'leaf';
      }
    )
  },

  // Seção 15 — mapa mental
  'c15-1': {
    title: 'Mapa mental',
    layout: { name: 'dagre', rankDir: 'LR', nodeSep: 10, rankSep: 46 },
    elements: tree(
      'Revisão para Cálculo',
      [
        ['Revisão para Cálculo', 'Álgebra'],
        ['Álgebra', 'operações'],
        ['Álgebra', 'produtos notáveis'],
        ['Álgebra', 'fatoração'],
        ['Álgebra', 'frações'],
        ['Álgebra', 'potências e raízes'],

        ['Revisão para Cálculo', 'Equações'],
        ['Equações', 'transformações equivalentes'],
        ['Equações', 'conjunto solução'],

        ['Revisão para Cálculo', 'Funções'],
        ['Funções', 'regra entrada → saída'],
        ['Funções', 'domínio e imagem'],
        ['Funções', 'gráficos']
      ],
      (label) => {
        if (label === 'Revisão para Cálculo') return 'root';
        if (['Álgebra', 'Equações', 'Funções'].includes(label)) return 'step';
        return 'leaf';
      }
    )
  },

  // Seção 18 — ideia central
  'c18-1': {
    title: 'Ideia central',
    layout: { name: 'dagre', rankDir: 'LR', nodeSep: 20, rankSep: 50 },
    elements: chain(['Manipular', 'Resolver', 'Representar', 'Interpretar'], 'root')
  }
};

module.exports = { DIAGRAMS };
