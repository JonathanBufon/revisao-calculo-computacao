'use strict';

/**
 * Baralho de revisão ativa.
 *
 * Perguntas: seção 16 do documento. Respostas: seção 17. O texto é reproduzido
 * como está no markdown — este arquivo só o reorganiza em cartões para
 * recuperação sem consulta.
 */

const R = String.raw;

const FLASHCARDS = [
  {
    group: 'Perguntas conceituais',
    cards: [
      {
        n: 1,
        q: R`Qual é a diferença entre expressão algébrica e equação?`,
        a: R`Uma expressão combina números, variáveis e operações, como \(2x+3\). Uma equação contém uma igualdade, por exemplo \(2x+3=7\).`
      },
      {
        n: 2,
        q: R`O que significa fatorar uma expressão?`,
        a: R`Fatorar significa transformar uma expressão em produto. Exemplo: \(x^2-9=(x-3)(x+3)\).`
      },
      {
        n: 3,
        q: R`Por que \((a+b)^2\) não é igual a \(a^2+b^2\)?`,
        a: R`Porque \((a+b)^2=(a+b)(a+b)\), e aplicando a distributividade: \(a^2+ab+ab+b^2=a^2+2ab+b^2\).`
      },
      {
        n: 4,
        q: R`Em quais condições podemos cancelar um fator em uma fração algébrica?`,
        a: R`Quando o elemento cancelado aparece como fator completo no numerador e no denominador e esse fator é diferente de zero.`
      },
      {
        n: 5,
        q: R`O que significa resolver uma equação?`,
        a: R`Encontrar todos os valores da incógnita que tornam a igualdade verdadeira.`
      },
      {
        n: 6,
        q: R`Qual propriedade fundamental diferencia uma função de uma relação qualquer?`,
        a: R`Cada entrada pertencente ao domínio deve possuir exatamente uma saída.`
      },
      {
        n: 7,
        q: R`Qual é a diferença entre domínio e imagem?`,
        a: R`O domínio é o conjunto de entradas permitidas. A imagem é o conjunto dos valores efetivamente produzidos pela função.`
      },
      {
        n: 8,
        q: R`Por que valores que zeram o denominador precisam ser retirados do domínio?`,
        a: R`Porque divisão por zero não está definida.`
      },
      {
        n: 9,
        q: R`Qual é a relação entre o gráfico de \(f\) e os pares \((x,f(x))\)?`,
        a: R`Cada valor admissível de \(x\) gera exatamente o ponto \((x,f(x))\) no gráfico.`
      },
      {
        n: 10,
        q: R`Qual é a função da fatoração no estudo posterior de limites?`,
        a: R`Fatorar pode revelar fatores comuns que permitem simplificar expressões, especialmente quocientes que aparecem em limites.`
      }
    ]
  },
  {
    group: 'Perguntas de comparação',
    cards: [
      {
        n: 11,
        q: R`Compare desenvolver um produto e fatorar uma expressão.`,
        a: R`Desenvolver: \((a+b)(a-b)\to a^2-b^2\). Fatorar realiza o processo inverso: \(a^2-b^2\to(a-b)(a+b)\).`
      },
      {
        n: 12,
        q: R`Compare \(\sqrt9\) com as soluções de \(x^2=9\).`,
        a: R`\(\sqrt9=3\) porque o radical representa a raiz principal. Já \(x^2=9\) possui duas soluções: \(x=3\) e \(x=-3\).`
      },
      {
        n: 13,
        q: R`Compare domínio e imagem de \(f(x)=x^2\).`,
        a: R`Para \(f(x)=x^2\), qualquer real pode ser entrada: \(D_f=\mathbb R\). Mas quadrados não são negativos: \(\operatorname{Im}(f)=[0,\infty)\).`
      },
      {
        n: 14,
        q: R`Compare \(\frac{x^2-4}{x-2}\) e \(x+2\). Elas representam exatamente a mesma função?`,
        a: R`A expressão \(\frac{x^2-4}{x-2}\) possui domínio \(\mathbb R\setminus\{2\}\). Como \(x^2-4=(x-2)(x+2)\), ela equivale a \(x+2\) quando \(x\neq2\). Porém a função \(g(x)=x+2\) definida em todos os reais contém \(x=2\). Portanto, se os domínios forem considerados, não são exatamente a mesma função.`
      }
    ]
  },
  {
    group: 'Exercícios de aplicação',
    cards: [
      {
        n: 15,
        q: R`Simplifique: \(3(x-2)+2(x+5)\).`,
        a: R`\(3(x-2)+2(x+5)=3x-6+2x+10=5x+4\).`
      },
      {
        n: 16,
        q: R`Fatore: \(x^2-10x+25\).`,
        a: R`\(x^2-10x+25\) é um trinômio quadrado perfeito: \(x^2-2(5)x+5^2\). Assim, \((x-5)^2\).`
      },
      {
        n: 17,
        q: R`Simplifique e informe as restrições: \(\frac{x^2-4}{x^2-x-6}\).`,
        a: R`Fatorando: \(x^2-4=(x-2)(x+2)\) e \(x^2-x-6=(x-3)(x+2)\). Portanto \(\frac{(x-2)(x+2)}{(x-3)(x+2)}=\frac{x-2}{x-3}\). Restrições originais: \(x\neq-2\) e \(x\neq3\).`
      },
      {
        n: 18,
        q: R`Resolva: \(x^2-7x+12=0\).`,
        a: R`Fatorando: \((x-3)(x-4)=0\). Pelo produto nulo: \(x=3\) ou \(x=4\).`
      },
      {
        n: 19,
        q: R`Determine domínio e imagem de: \(f(x)=\sqrt{x-2}\).`,
        a: R`Para existir nos reais: \(x-2\ge0\), portanto \(x\ge2\). Domínio: \([2,\infty)\). Como a raiz quadrada principal nunca é negativa: \(\operatorname{Im}(f)=[0,\infty)\).`
      }
    ]
  },
  {
    group: 'Classifique como válido ou inválido',
    cards: [
      {
        n: 20,
        q: R`\((x-4)^2=x^2-8x+16\).`,
        a: R`**Válido.** \((x-4)^2=x^2-8x+16\).`,
        verdict: 'valido'
      },
      {
        n: 21,
        q: R`\(\frac{x+4}{x}=4\).`,
        a: R`**Inválido.** \(\frac{x+4}{x}=1+\frac4x\), com \(x\neq0\). Não se pode cancelar \(x\) em uma soma.`,
        verdict: 'invalido'
      },
      {
        n: 22,
        q: R`\(x^2x^3=x^5\).`,
        a: R`**Válido.** Para mesma base: \(x^2x^3=x^{2+3}=x^5\).`,
        verdict: 'valido'
      },
      {
        n: 23,
        q: R`\(\sqrt{x^2}=x\) para todo \(x\in\mathbb R\).`,
        a: R`**Inválido.** Na realidade, \(\sqrt{x^2}=|x|\). Por exemplo, se \(x=-3\), \(\sqrt{(-3)^2}=3\neq-3\).`,
        verdict: 'invalido'
      },
      {
        n: 24,
        q: R`A relação \(\{(1,2),(2,3),(1,5)\}\) define uma função da primeira coordenada para a segunda?`,
        a: R`**Inválido.** A entrada \(1\) possui duas saídas: \(1\mapsto2\) e \(1\mapsto5\). Portanto, a relação não define uma função da primeira coordenada para a segunda.`,
        verdict: 'invalido'
      }
    ]
  }
];

module.exports = { FLASHCARDS };
