'use strict';

/**
 * Catálogo de widgets interativos.
 *
 * Cada widget é ancorado a um título do documento (regex sobre o texto do título).
 * O bloco é inserido no fim daquela subseção, logo antes do próximo título ou
 * divisor. A inicialização acontece no cliente (public/js/widgets/*.js), que
 * consulta `KSL.widgets[type]`.
 *
 * Bibliotecas usadas por tipo:
 *   geometry  -> JSXGraph          (construções interativas, arrastar pontos)
 *   plot      -> Function Plot     (curvas y = f(x), zoom e navegação)
 *   chart     -> Plotly.js         (séries numéricas, hover, WebGL)
 *   deck      -> KaTeX + DOM       (flashcards de revisão ativa)
 *   lab       -> Function Plot     (plotter livre)
 */

const WIDGETS = [
  {
    id: 'limite-buraco',
    chapter: 3,
    anchor: /^3\./,
    type: 'plot',
    lib: 'Function Plot',
    title: 'O limite que a álgebra resolve',
    caption:
      'A curva de \\(f(x)=\\dfrac{x^2-4}{x-2}\\) coincide com a reta \\(y=x+2\\) em todo ponto, ' +
      'exceto em \\(x=2\\), onde \\(f\\) não está definida. O círculo aberto marca o ponto ausente \\((2,4)\\): ' +
      'o limite existe e vale \\(4\\), mas o valor da função não.',
    config: {
      xDomain: [-4, 8],
      yDomain: [-4, 10],
      curves: [
        { fn: '(x^2 - 4)/(x - 2)', color: 'accent', label: 'f(x) = (x²-4)/(x-2)' }
      ],
      holes: [{ x: 2, y: 4, label: '(2, 4) removido' }]
    }
  },
  {
    id: 'plano-cartesiano',
    chapter: 4,
    anchor: /^4\.4/,
    type: 'geometry',
    lib: 'JSXGraph',
    title: 'Cada entrada gera um ponto (x, f(x))',
    caption:
      'Arraste o ponto vermelho no eixo \\(x\\). O ponto azul é \\((x,f(x))\\) para \\(f(x)=x^2-4x+3\\); ' +
      'o rastro que ele deixa é exatamente o gráfico \\(G_f=\\{(x,f(x)):x\\in D\\}\\).',
    config: { kind: 'cartesian' }
  },
  {
    id: 'quadrado-da-soma',
    chapter: 5,
    anchor: /^5\.2/,
    type: 'geometry',
    lib: 'JSXGraph',
    title: 'Por que (a+b)² tem o termo 2ab',
    caption:
      'O quadrado de lado \\(a+b\\) se decompõe em quatro regiões: \\(a^2\\), \\(b^2\\) e **dois** retângulos ' +
      '\\(ab\\). Mova os controles de \\(a\\) e \\(b\\) — a soma das áreas é sempre \\((a+b)^2=a^2+2ab+b^2\\).',
    config: { kind: 'square-identity' }
  },
  {
    id: 'dominio-restricoes',
    chapter: 5,
    anchor: /^5\.8/,
    type: 'plot',
    lib: 'Function Plot',
    title: 'Onde a função existe',
    caption:
      'Duas restrições típicas lado a lado: \\(g(x)=\\dfrac{1}{x-3}\\) não existe em \\(x=3\\) (assíntota vertical) ' +
      'e \\(h(x)=\\sqrt{x-2}\\) só existe para \\(x\\ge2\\). A faixa sombreada indica o que fica **fora** do domínio.',
    config: {
      xDomain: [-3, 9],
      yDomain: [-5, 6],
      curves: [
        { fn: '1/(x - 3)', color: 'accent', label: 'g(x) = 1/(x-3)', ranges: [[-3, 2.94], [3.06, 9]] },
        { fn: 'sqrt(x - 2)', color: 'ok', label: 'h(x) = √(x-2)', range: [2, 9] }
      ],
      asymptotes: [3],
      excluded: [{ from: -3, to: 2, label: 'fora do domínio de h' }]
    }
  },
  {
    id: 'exemplo-racional',
    chapter: 8,
    anchor: /Exemplo 1/,
    type: 'plot',
    lib: 'Function Plot',
    title: 'Assíntota em x = 2, ponto removido em x = −3',
    caption:
      'Os dois valores excluídos do domínio de \\(f(x)=\\dfrac{x^2-9}{x^2+x-6}\\) se comportam de maneiras ' +
      'diferentes no gráfico: em \\(x=2\\) o fator sobrevive e produz uma assíntota vertical; em \\(x=-3\\) o ' +
      'fator é cancelado e sobra apenas um furo em \\(\\left(-3,\\tfrac65\\right)\\).',
    config: {
      xDomain: [-9, 9],
      yDomain: [-6, 8],
      curves: [
        {
          fn: '(x^2 - 9)/(x^2 + x - 6)',
          color: 'accent',
          label: 'f(x) = (x²-9)/(x²+x-6)',
          ranges: [[-9, 1.94], [2.06, 9]]
        }
      ],
      asymptotes: [2],
      holes: [{ x: -3, y: 1.2, label: '(-3, 6/5) removido' }]
    }
  },
  {
    id: 'exemplo-quadratica',
    chapter: 8,
    anchor: /^Imagem$/,
    type: 'plot',
    lib: 'Function Plot',
    title: 'Três formas, uma parábola',
    caption:
      'A forma fatorada \\((x-1)(x-3)\\) mostra os zeros; a forma de vértice \\((x-2)^2-1\\) mostra o mínimo ' +
      '\\((2,-1)\\) e, com ele, a imagem \\([-1,\\infty)\\). É a mesma função nas três escritas.',
    config: {
      xDomain: [-2, 6],
      yDomain: [-3, 9],
      curves: [
        { fn: 'x^2 - 4*x + 3', color: 'accent', label: 'f(x) = x²-4x+3' }
      ],
      points: [
        { x: 1, y: 0, label: 'zero x=1', color: 'ok' },
        { x: 3, y: 0, label: 'zero x=3', color: 'ok' },
        { x: 2, y: -1, label: 'vértice (2,-1)', color: 'warn' }
      ],
      levels: [{ y: -1, label: 'mínimo: Im(f) = [-1, ∞)' }]
    }
  },
  {
    id: 'taxa-media',
    chapter: 10,
    anchor: /^10\.3/,
    type: 'geometry',
    lib: 'JSXGraph',
    title: 'Da reta secante à derivada',
    caption:
      'Arraste \\(a\\) e \\(b\\) sobre o eixo \\(x\\). A inclinação da secante é a taxa média ' +
      '\\(\\dfrac{f(b)-f(a)}{b-a}\\). Aproxime \\(b\\) de \\(a\\): a secante tende à tangente — é essa passagem ' +
      'ao limite que define a derivada.',
    config: { kind: 'secant' }
  },
  {
    id: 'custo-computacional',
    chapter: 11,
    anchor: /^11\.5/,
    type: 'chart',
    lib: 'Plotly.js',
    title: 'Um modelo de custo como função',
    caption:
      'O modelo \\(C(n)=2n^2+5n+10\\) do texto, avaliado em entradas inteiras, comparado a \\(n^2\\) e ' +
      '\\(n\\log_2 n\\). A tabela de valores e o gráfico são duas representações da mesma função.',
    config: { kind: 'cost' }
  },
  {
    id: 'revisao-ativa',
    chapter: 16,
    anchor: 'end',
    type: 'deck',
    lib: 'Revisão ativa',
    title: 'Baralho de recuperação sem consulta',
    caption:
      'As 24 questões da seção 16 com as respostas da seção 17. Tente responder antes de revelar — ' +
      'a etapa final do fluxo KSL é justamente **recuperar sem consultar**.',
    config: { kind: 'flashcards' }
  }
];

/**
 * Widget extra, fora do documento original: plotter livre.
 * Fica em um capítulo próprio, marcado como apêndice.
 */
const LAB = {
  id: 'laboratorio',
  type: 'lab',
  lib: 'Function Plot',
  title: 'Plotter livre',
  caption:
    'Digite uma expressão em \\(x\\) e observe o gráfico. Os botões carregam as funções discutidas no ' +
    'documento. Lembre-se: o plotter desenha pontos, mas **não** verifica domínio — essa análise continua ' +
    'sendo algébrica.',
  config: {
    xDomain: [-8, 8],
    yDomain: [-6, 8],
    presets: [
      { label: '(x²-4)/(x-2)', fn: '(x^2 - 4)/(x - 2)' },
      { label: 'x² - 4x + 3', fn: 'x^2 - 4*x + 3' },
      { label: '√(x-2)', fn: 'sqrt(x - 2)' },
      { label: '1/(x-3)', fn: '1/(x - 3)' },
      { label: '(x²-9)/(x²+x-6)', fn: '(x^2 - 9)/(x^2 + x - 6)' },
      { label: '√(1-x²)', fn: 'sqrt(1 - x^2)' },
      { label: '|x|', fn: 'abs(x)' }
    ]
  }
};

module.exports = { WIDGETS, LAB };
