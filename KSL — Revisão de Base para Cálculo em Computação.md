# KSL — Revisão de Base para Cálculo em Computação

## 1. Identificação

**Nome principal:** Revisão de Base para Cálculo em Computação  
**Nomes alternativos:** Fundamentos algébricos para Cálculo; revisão de Pré-Cálculo; fundamentos de Álgebra e Funções  
**Área e subárea:** Matemática → Álgebra elementar e Pré-Cálculo  
**Nível:** Graduação — revisão de conhecimentos anteriores ao Cálculo  
**Escopo adotado:** Operações algébricas, produtos notáveis, fatoração, frações algébricas, potenciação e radiciação, equações, funções, domínio e imagem e gráficos de funções.

O escopo corresponde ao tipo de conhecimento normalmente tratado como pré-requisito para disciplinas de Pré-Cálculo e Cálculo: universidades como UCLA, University of Illinois e University of Texas destacam álgebra e funções entre os conhecimentos preparatórios para Cálculo.

**Convenção usada neste material:** as definições e propriedades matemáticas são fundamentadas nas fontes indicadas; as explicações didáticas, exemplos e exercícios foram construídos especificamente para esta KSL.

---

## 2. Resumo inicial

A revisão de base para Cálculo reúne técnicas algébricas e conhecimentos sobre funções necessários para manipular corretamente expressões e interpretar relações entre grandezas.

Os nove assuntos formam aproximadamente a seguinte cadeia:

```text
Operações algébricas
        ↓
Produtos notáveis
        ↓
Fatoração
        ↓
Frações algébricas
        ↓
Potenciação e radiciação
        ↓
Equações
        ↓
Funções
        ↓
Domínio e imagem
        ↓
Gráficos
        ↓
Limites → Derivadas → Integrais
```

Os tópicos iniciais permitem **manipular expressões**; equações permitem **determinar valores desconhecidos**; funções permitem **modelar dependências entre variáveis**; domínio, imagem e gráficos permitem **entender onde uma função existe e como ela se comporta**. Essa sequência coincide, em linhas gerais, com a organização dos capítulos preparatórios de Álgebra e Pré-Cálculo da OpenStax.

---

## 3. Problema ou motivação

No Cálculo, muitas dificuldades aparentemente relacionadas a limites ou derivadas são, na verdade, dificuldades de manipulação algébrica.

Por exemplo, considere

\[
\lim_{x\to 2}\frac{x^2-4}{x-2}.
\]

A substituição direta produz

\[
\frac{0}{0},
\]

que não pode ser tratada como uma fração comum. Porém,

\[
x^2-4=(x-2)(x+2),
\]

e, para \(x\neq2\),

\[
\frac{x^2-4}{x-2}
=
\frac{(x-2)(x+2)}{x-2}
=
x+2.
\]

Assim, a fatoração e a simplificação de frações algébricas tornam possível continuar o estudo do limite.

Outro exemplo é a taxa média de variação,

\[
\frac{f(x_2)-f(x_1)}{x_2-x_1},
\]

que combina funções, substituição, frações algébricas e simplificação. Ela é uma das ideias que antecedem a derivada.

Portanto, essa revisão busca garantir quatro capacidades:

1. manipular expressões sem alterar seu significado;
2. resolver equações mantendo equivalência;
3. interpretar funções como relações entre entradas e saídas;
4. conectar expressões algébricas aos respectivos gráficos.

---

# 4. Dependências conceituais

## 4.1 Números reais

**Definição formal:**  
O conjunto dos números reais é representado por

\[
\mathbb{R}.
\]

Ele contém, entre outros, os números racionais e irracionais.

**Explicação intuitiva:**  
É o conjunto numérico normalmente considerado quando estudamos funções elementares de uma variável no início de Cálculo.

**Exemplo:**

\[
-5,\quad 0,\quad \frac23,\quad \sqrt2,\quad \pi\in\mathbb R.
\]

**Relação com o conceito principal:**  
As restrições de domínio apresentadas nesta revisão serão, salvo indicação contrária, analisadas sobre \(\mathbb R\).

---

## 4.2 Variável, constante e expressão

**Definição formal:**  
Uma variável é um símbolo que pode representar elementos de um conjunto. Uma constante possui valor fixado dentro do contexto considerado. Uma expressão algébrica combina números, variáveis e operações matemáticas.

**Explicação intuitiva:**  
Em

\[
3x^2-5x+7,
\]

\(x\) é variável, enquanto \(3,-5,7\) são constantes.

**Exemplo:**

\[
2x+3
\]

é uma expressão; não é uma equação, pois não contém uma igualdade.

**Relação com o conceito principal:**  
Todos os tópicos algébricos desta revisão envolvem transformação ou interpretação de expressões.

---

## 4.3 Igualdade e identidade

**Definição formal:**  
Uma igualdade afirma que duas expressões possuem o mesmo valor sob determinadas condições. Uma identidade é uma igualdade válida para todos os valores admissíveis das variáveis.

**Explicação intuitiva:**  

\[
x+2=5
\]

é verdadeira somente quando \(x=3\).

Já

\[
(a+b)^2=a^2+2ab+b^2
\]

é uma identidade algébrica.

**Exemplo:**

\[
2(x+1)=2x+2
\]

para todo \(x\in\mathbb R\).

**Relação com o conceito principal:**  
Produtos notáveis são identidades; resolver uma equação consiste em encontrar os valores para os quais determinada igualdade é verdadeira.

---

## 4.4 Plano cartesiano

**Definição formal:**  
O plano cartesiano associa cada ponto a um par ordenado

\[
(x,y)\in\mathbb R^2.
\]

**Explicação intuitiva:**  
O primeiro número indica a posição horizontal; o segundo, a vertical.

**Exemplo:**

\[
(2,3)
\]

representa o ponto de coordenada horizontal \(2\) e vertical \(3\).

**Relação com o conceito principal:**  
O gráfico de uma função real de variável real é constituído por pontos da forma

\[
(x,f(x)).
\]

---

# 5. Definição formal

Como esta KSL reúne nove conceitos interdependentes, cada um recebe uma definição específica.

### 5.1 Operações algébricas

São operações realizadas sobre expressões respeitando as propriedades das operações numéricas, como associatividade, comutatividade e distributividade. Essas propriedades são parte dos fundamentos utilizados para simplificação de expressões.

Exemplo da distributividade:

\[
a(b+c)=ab+ac.
\]

Termos semelhantes podem ser combinados:

\[
3x+5x=8x.
\]

---

### 5.2 Produtos notáveis

São identidades algébricas recorrentes envolvendo produtos de expressões.

Principais:

\[
(a+b)^2=a^2+2ab+b^2,
\]

\[
(a-b)^2=a^2-2ab+b^2,
\]

\[
(a+b)(a-b)=a^2-b^2.
\]

Também são úteis:

\[
(a+b)^3=a^3+3a^2b+3ab^2+b^3,
\]

\[
(a-b)^3=a^3-3a^2b+3ab^2-b^3.
\]

---

### 5.3 Fatoração

Fatorar uma expressão significa representá-la como um produto de fatores.

Por exemplo,

\[
x^2-9=(x-3)(x+3).
\]

Casos centrais desta revisão:

\[
ax+ay=a(x+y),
\]

\[
a^2-b^2=(a-b)(a+b),
\]

\[
a^2+2ab+b^2=(a+b)^2.
\]

Também aparecem fatoração de trinômios e agrupamento.

---

### 5.4 Frações algébricas

Uma expressão racional possui a forma

\[
\frac{P(x)}{Q(x)},
\]

em que \(P\) e \(Q\) são polinômios e

\[
Q(x)\neq0.
\]



As operações seguem as propriedades das frações numéricas:

\[
\frac ab\cdot\frac cd=\frac{ac}{bd},
\]

e

\[
\frac ab+\frac cd=\frac{ad+bc}{bd},
\]

respeitando sempre denominadores diferentes de zero.

---

### 5.5 Potenciação e radiciação

Para uma base \(a\) e expoentes apropriados:

\[
a^m a^n=a^{m+n},
\]

\[
\frac{a^m}{a^n}=a^{m-n}, \qquad a\neq0,
\]

\[
(a^m)^n=a^{mn},
\]

\[
a^{-n}=\frac1{a^n},
\]

\[
a^0=1,\qquad a\neq0.
\]

Essas propriedades são apresentadas sistematicamente na revisão algébrica da OpenStax.

A relação entre radicais e expoentes racionais é

\[
\sqrt[n]{a^m}=a^{m/n},
\]

consideradas as condições necessárias para que a expressão esteja definida nos reais.

---

### 5.6 Equações

Uma equação é uma igualdade que contém uma ou mais incógnitas.

Resolver uma equação significa determinar seu **conjunto solução**.

Por exemplo,

\[
2x+4=10
\]

possui solução

\[
x=3.
\]

Equações lineares podem ser resolvidas por propriedades algébricas; equações quadráticas também podem ser tratadas por fatoração, completar quadrados ou fórmula quadrática.

---

### 5.7 Funções

Formalmente, uma função

\[
f:A\to B
\]

associa **cada elemento** \(x\in A\) a **exatamente um elemento** \(f(x)\in B\).

A notação

\[
y=f(x)
\]

indica que \(y\) é a saída correspondente à entrada \(x\).

Funções podem ser representadas por fórmulas, tabelas, pares ordenados ou gráficos.

---

### 5.8 Domínio e imagem

Se

\[
f:A\to B,
\]

o conjunto \(A\) é o **domínio**.

A imagem é

\[
\operatorname{Im}(f)=
\{f(x)\mid x\in A\}.
\]

Portanto,

\[
\operatorname{Im}(f)\subseteq B.
\]

No contexto de funções reais definidas por fórmulas, valores que provocam divisão por zero ou raízes pares de números negativos devem ser excluídos do domínio.

---

### 5.9 Gráfico de uma função

Para

\[
f:D\to\mathbb R,
\]

o gráfico é o conjunto

\[
G_f=\{(x,f(x)):x\in D\}.
\]

Cada entrada \(x\) produz o ponto

\[
(x,f(x)).
\]

O gráfico permite observar crescimento, decrescimento, interceptos, máximos, mínimos e outras características da função.

---

### Interpretação da definição

Esses nove conteúdos não são independentes.

Considere

\[
f(x)=\frac{x^2-4}{x-2}.
\]

Para compreendê-la é necessário:

1. reconhecer uma expressão algébrica;
2. identificar o produto notável

\[
x^2-4=(x-2)(x+2);
\]

3. fatorar;
4. simplificar a fração;
5. preservar a restrição

\[
x\neq2;
\]

6. reconhecer a expressão como regra de uma função;
7. encontrar seu domínio;
8. compreender sua imagem;
9. representar seu gráfico.

A simplificação fornece

\[
f(x)=x+2,\qquad x\neq2.
\]

Portanto, o gráfico se parece com a reta \(y=x+2\), mas possui um ponto ausente em

\[
(2,4).
\]

Isso mostra por que uma simplificação algébrica não pode apagar silenciosamente as restrições do domínio original.

---

# 6. Estrutura ou funcionamento

Uma estratégia geral para problemas dessa revisão é:

```text
Expressão ou função recebida
        │
        ├── 1. Identificar operações
        │
        ├── 2. Procurar produtos notáveis
        │
        ├── 3. Fatorar quando útil
        │
        ├── 4. Registrar restrições
        │      ├── denominador ≠ 0
        │      └── radicando de raiz par ≥ 0
        │
        ├── 5. Simplificar
        │
        ├── 6. Se houver igualdade, resolver
        │
        ├── 7. Se houver função:
        │      ├── determinar domínio
        │      ├── determinar imagem
        │      └── calcular pontos importantes
        │
        └── 8. Interpretar ou construir o gráfico
```

### Ordem operacional

Para simplificar uma expressão:

1. parênteses;
2. potências e raízes;
3. multiplicações e divisões;
4. somas e subtrações.

Dentro de uma mesma prioridade, procede-se conforme a estrutura da expressão.

### Regra central

Uma transformação algébrica só pode ser utilizada se respeitar suas condições.

Por exemplo,

\[
\frac{(x-2)(x+3)}{x-2}=x+3
\]

somente quando

\[
x\neq2.
\]

---

# 7. Propriedades principais

## 7.1 Distributividade

**Descrição:**

\[
a(b+c)=ab+ac.
\]

**Condições:**  
Para números reais \(a,b,c\).

**Consequência:**  
Permite desenvolver produtos e realizar fatorações no sentido inverso.

**Fundamentação ou fonte:**  
Propriedade básica das operações reais utilizada na álgebra elementar.

---

## 7.2 Produto nulo

**Descrição:**

\[
ab=0
\quad\Longrightarrow\quad
a=0\;\text{ou}\;b=0.
\]

**Condições:**  
Nos números reais.

**Consequência:**  
Se

\[
(x-2)(x+5)=0,
\]

então

\[
x=2
\]

ou

\[
x=-5.
\]

**Fundamentação ou fonte:**  
Base do método de resolução de diversas equações quadráticas por fatoração.

---

## 7.3 Cancelamento de fatores

**Descrição:**

\[
\frac{ab}{ac}=\frac bc.
\]

**Condições:**

\[
a\neq0,\qquad c\neq0.
\]

**Consequência:**  
Somente **fatores** podem ser cancelados.

**Fundamentação ou fonte:**  
A simplificação de expressões racionais é feita após fatorar numeradores e denominadores.

---

## 7.4 Restrições permanecem após simplificação

**Descrição:**

\[
\frac{x^2-1}{x-1}
=
x+1
\]

para

\[
x\neq1.
\]

**Condições:**  
A expressão original precisa estar definida.

**Consequência:**  
A expressão simplificada e a original podem possuir fórmulas equivalentes em seu domínio comum, mas não necessariamente o mesmo domínio.

**Fundamentação ou fonte:**  
Expressões racionais devem excluir zeros do denominador.

---

## 7.5 Expoente negativo representa inverso

**Descrição:**

\[
a^{-n}=\frac1{a^n}.
\]

**Condições:**

\[
a\neq0.
\]

**Consequência:**

\[
x^{-2}=\frac1{x^2}.
\]

**Fundamentação ou fonte:**

---

## 7.6 Expoente racional e radical

**Descrição:**

\[
a^{m/n}=\sqrt[n]{a^m}.
\]

**Condições:**  
Dependem de \(a\), \(m\), \(n\) e do conjunto numérico considerado; para raízes pares nos reais, o radicando deve ser não negativo.

**Consequência:**

\[
x^{1/2}=\sqrt{x}.
\]

**Fundamentação ou fonte:**

---

## 7.7 Uma entrada não pode possuir duas saídas em uma função

**Descrição:**  
Se \(f\) é função e \(x\) pertence ao domínio, existe exatamente um valor \(f(x)\).

**Condições:**  
Definição de função.

**Consequência:**  
Uma relação que associa um mesmo \(x\) a dois valores diferentes de \(y\) não é função de \(x\).

**Fundamentação ou fonte:** A teoria elementar de funções da OpenStax organiza função, domínio, imagem e representação gráfica a partir dessa associação entrada-saída.

---

## 7.8 Domínio depende da expressão e do contexto

**Descrição:**  
O domínio deve incluir somente entradas matematicamente permitidas e, em modelos, entradas que façam sentido no problema.

**Condições:**  
Dependem da função.

**Consequência:**  

\[
f(x)=\frac1{x-3}
\]

exclui \(x=3\), enquanto

\[
g(x)=\sqrt{x-3}
\]

exige

\[
x\ge3.
\]

**Fundamentação ou fonte:**

---

## 7.9 O gráfico registra pares entrada-saída

**Descrição:**

\[
(x,y)\in G_f
\iff
y=f(x).
\]

**Condições:**

\[
x\in\operatorname{Dom}(f).
\]

**Consequência:**  
Zeros de uma função aparecem onde o gráfico encontra o eixo \(x\).

**Fundamentação ou fonte:**

---

# 8. Exemplos válidos

## Exemplo 1 — Simplificação de uma função racional

**Construção ou descrição:**

Considere

\[
f(x)=\frac{x^2-9}{x^2+x-6}.
\]

**Representação:**

Fatorando:

\[
x^2-9=(x-3)(x+3),
\]

\[
x^2+x-6=(x+3)(x-2).
\]

Logo,

\[
f(x)=
\frac{(x-3)(x+3)}
{(x+3)(x-2)}.
\]

**Verificação passo a passo:**

Primeiro encontramos as restrições do denominador original:

\[
(x+3)(x-2)\neq0.
\]

Assim,

\[
x\neq-3,
\qquad
x\neq2.
\]

Para \(x\neq-3\),

\[
f(x)=\frac{x-3}{x-2}.
\]

Mas a restrição original continua valendo:

\[
\operatorname{Dom}(f)
=
\mathbb R\setminus\{-3,2\}.
\]

No gráfico:

- \(x=2\) está associado a uma assíntota vertical;
- em \(x=-3\), o fator foi cancelado, mas o ponto continua excluído.

O valor que a expressão simplificada teria em \(x=-3\) seria

\[
\frac{-3-3}{-3-2}
=
\frac65.
\]

Logo existe um ponto removido em

\[
\left(-3,\frac65\right).
\]

**Conclusão:**  
Fatoração, frações algébricas, domínio e gráfico trabalham conjuntamente. A simplificação não autoriza reinserir \(x=-3\) no domínio original.

---

## Exemplo 2 — Função quadrática

**Construção ou descrição:**

Considere

\[
f(x)=x^2-4x+3.
\]

**Representação:**

Completando o quadrado:

\[
f(x)
=
x^2-4x+4-1
=
(x-2)^2-1.
\]

Também podemos fatorar:

\[
f(x)
=
(x-1)(x-3).
\]

**Verificação passo a passo:**

### Domínio

Polinômios reais estão definidos para todos os reais:

\[
D_f=\mathbb R.
\]

### Zeros

\[
(x-1)(x-3)=0.
\]

Portanto,

\[
x=1
\quad\text{ou}\quad
x=3.
\]

### Vértice

Pela forma

\[
(x-2)^2-1,
\]

o menor valor possível de \((x-2)^2\) é \(0\).

Portanto,

\[
f(2)=-1.
\]

O vértice é

\[
(2,-1).
\]

### Imagem

Como

\[
(x-2)^2\ge0,
\]

temos

\[
f(x)\ge-1.
\]

Portanto,

\[
\operatorname{Im}(f)=[-1,\infty).
\]

Funções quadráticas têm domínio real completo, enquanto sua imagem depende da direção da parábola e do valor do vértice.

**Conclusão:**  
A mesma função pode ser escrita em formas diferentes, e cada forma facilita uma análise: a fatorada revela os zeros; a forma de vértice revela mínimo e imagem.

---

# 9. Contraexemplos

## Contraexemplo 1 — Cancelamento de termos

**Descrição:**

Considere a tentativa

\[
\frac{x+2}{x}
\overset{\text{errado}}{=}2.
\]

**Condição violada:**  
O cancelamento é permitido entre **fatores**, não entre termos ligados por soma.

**Explicação:**

\[
x+2
\]

não significa

\[
x\cdot2.
\]

Podemos separar corretamente:

\[
\frac{x+2}{x}
=
\frac{x}{x}+\frac2x
=
1+\frac2x,
\qquad x\neq0.
\]

Por exemplo, em \(x=2\):

\[
\frac{2+2}{2}=2,
\]

mas em \(x=4\):

\[
\frac{4+2}{4}=\frac32,
\]

demonstrando que a expressão não é constantemente igual a \(2\).

**Conclusão:**  
Não se cancelam parcelas de uma soma.

---

## Contraexemplo 2 — Quadrado de uma soma

**Descrição:**

\[
(a+b)^2
\overset{\text{errado}}{=}
a^2+b^2.
\]

**Condição violada:**  
A potência atua sobre todo o produto

\[
(a+b)(a+b).
\]

**Explicação:**

\[
(a+b)^2
=
(a+b)(a+b)
=
a^2+ab+ab+b^2
\]

e portanto

\[
(a+b)^2=a^2+2ab+b^2.
\]

**Conclusão:**  
O termo \(2ab\) não pode ser omitido.

---

# 10. Relações com outros conceitos

## 10.1 Limites

**Relação:**  
Limites frequentemente exigem simplificação algébrica antes da análise.

**Semelhanças:**  
Utilizam funções, domínio e manipulação de expressões.

**Diferenças:**  
O limite investiga o comportamento da função quando a variável se aproxima de determinado valor, não apenas o valor da função naquele ponto.

**Possível confusão:**  
Achar que uma expressão inicialmente produzindo \(0/0\) significa que o limite é automaticamente zero.

---

## 10.2 Derivadas

**Relação:**  
A definição de derivada utiliza o quociente

\[
\frac{f(x+h)-f(x)}{h}.
\]

**Semelhanças:**  
Exige funções, substituição, produtos notáveis, fatoração e frações.

**Diferenças:**  
A derivada estuda taxa instantânea de variação; nesta revisão trabalha-se principalmente com álgebra e taxas médias.

**Possível confusão:**  
Tentar aprender regras de derivação sem dominar as simplificações que surgem durante os cálculos.

---

## 10.3 Taxa média de variação

**Relação:**

\[
\frac{f(b)-f(a)}{b-a}.
\]

Essa expressão prepara a interpretação de derivadas.

**Semelhanças:**  
Utiliza pares de valores de uma função e uma divisão entre variações.

**Diferenças:**  
A taxa média considera um intervalo; a derivada considera um processo limite.

**Possível confusão:**  
Usar

\[
\frac{f(b)}{b}
\]

em vez da diferença entre saídas dividida pela diferença entre entradas. A fórmula correta da taxa média é documentada em Pré-Cálculo.

---

## 10.4 Polinômios

**Relação:**  
Produtos notáveis e fatoração operam frequentemente sobre polinômios.

**Semelhanças:**  
São expressões algébricas formadas por somas de termos.

**Diferenças:**  
Nem toda expressão algébrica é polinomial; por exemplo,

\[
\frac1x
\]

e

\[
\sqrt{x}
\]

não são polinômios.

**Possível confusão:**  
Achar que qualquer expressão contendo \(x\) é um polinômio.

---

## 10.5 Relação e função

**Relação:**  
Toda função estabelece uma relação entre entradas e saídas.

**Semelhanças:**  
Ambas podem ser descritas por pares ordenados.

**Diferenças:**  
Uma função exige uma única saída para cada entrada.

**Possível confusão:**  
Uma circunferência como

\[
x^2+y^2=1
\]

define uma relação entre \(x\) e \(y\), mas não define \(y\) como uma única função de \(x\) sobre todo o círculo.

---

# 11. Aplicações

## 11.1 Simplificação antes do cálculo de limites

**Contexto:**  
Primeiros conteúdos de Cálculo.

**Como o conceito é utilizado:**  
Fatoração, produtos notáveis e frações algébricas permitem transformar expressões que apresentam formas indeterminadas após substituição direta.

**Problema atendido:**  
Reescrever uma função em uma forma mais apropriada para analisar seu comportamento próximo a determinado ponto.

**Limitações:**  
A simplificação deve preservar as restrições da expressão original.

**Evidência ou fonte:**  
Os materiais universitários de preparação para Cálculo tratam álgebra e funções como conteúdo preparatório essencial; cursos como MATH 115 da University of Illinois são explicitamente destinados à preparação para Cálculo.

---

## 11.2 Modelagem por funções

**Contexto:**  
Problemas de Matemática, Física, Computação e outras áreas quantitativas.

**Como o conceito é utilizado:**  
Uma grandeza é representada como função de outra:

\[
y=f(x).
\]

**Problema atendido:**  
Representar dependências de forma precisa e permitir avaliação, comparação e análise de comportamento.

**Limitações:**  
O modelo só representa adequadamente o fenômeno dentro das hipóteses e do domínio assumidos.

**Evidência ou fonte:**  
Textos de Pré-Cálculo introduzem funções por meio de relações entre grandezas e utilizam exemplos reais com população, distância, tempo e outras variáveis.

---

## 11.3 Taxas de variação

**Contexto:**  
Análise de mudanças.

**Como o conceito é utilizado:**

\[
\text{taxa média}
=
\frac{\Delta y}{\Delta x}
=
\frac{f(x_2)-f(x_1)}{x_2-x_1}.
\]

**Problema atendido:**  
Quantificar quanto uma saída muda, em média, em relação à mudança da entrada.

**Limitações:**  
Uma taxa média não informa necessariamente o comportamento em cada instante interno ao intervalo.

**Evidência ou fonte:**

---

## 11.4 Análise visual de funções

**Contexto:**  
Interpretação de gráficos.

**Como o conceito é utilizado:**  
O gráfico permite localizar:

- zeros;
- intervalos de crescimento;
- intervalos de decrescimento;
- máximos;
- mínimos;
- descontinuidades aparentes;
- comportamento global.

**Problema atendido:**  
Transformar uma expressão simbólica em informação geométrica.

**Limitações:**  
Um gráfico produzido numericamente pode ocultar detalhes se a escala ou janela de visualização for inadequada.

**Evidência ou fonte:**  
A análise de gráficos para identificar crescimento, decrescimento e extremos é conteúdo explícito de Pré-Cálculo.

---

## 11.5 Preparação para problemas computacionais

**Contexto:**  
Cursos de Computação que utilizam modelos matemáticos.

**Como o conceito é utilizado:**  
Funções descrevem relações entrada-saída, e expressões algébricas permitem transformar e avaliar modelos.

Por exemplo, um custo pode ser modelado por

\[
C(n)=2n^2+5n+10,
\]

em que \(n\) representa uma entrada.

**Problema atendido:**  
Formalizar como determinada quantidade depende de outra.

**Limitações:**  
A existência de uma fórmula matemática não significa que ela seja automaticamente um bom modelo computacional ou empírico.

**Evidência ou fonte:**  
Cursos universitários de Pré-Cálculo incluem modelos lineares e funções como preparação matemática, e a University of Washington organiza sua revisão de Pré-Cálculo em torno de álgebra, funções, domínio, imagem e gráficos.

---

# 12. Limitações

### Limitações do conteúdo

Esta revisão não cobre profundamente:

- trigonometria;
- exponenciais e logaritmos;
- números complexos;
- sistemas de equações;
- inequações;
- composição e inversão de funções;
- limites;
- derivadas;
- integrais.

Alguns desses tópicos normalmente também aparecem em cursos completos de Pré-Cálculo.

### Restrições teóricas

As regras algébricas dependem de suas hipóteses. Por exemplo:

\[
\frac ab
\]

só é definida quando

\[
b\neq0.
\]

Em \(\mathbb R\),

\[
\sqrt{x}
\]

só é real quando

\[
x\ge0.
\]

### Limitações computacionais

Uma calculadora ou software pode produzir aproximações gráficas ou numéricas, mas isso não substitui a análise do domínio nem justifica transformações algébricas.

### Limitações da pesquisa realizada

O material privilegia livros-texto universitários abertos da OpenStax e páginas institucionais de universidades. Não foi necessária literatura de pesquisa original, pois os conceitos abordados são conteúdos elementares e amplamente estabelecidos de Álgebra e Pré-Cálculo.

---

# 13. Erros comuns

## 13.1 Distribuir potência sobre soma

**Afirmação incorreta:**

\[
(a+b)^2=a^2+b^2.
\]

**Por que está incorreta:**  
O produto cruzado é omitido.

**Forma correta:**

\[
(a+b)^2=a^2+2ab+b^2.
\]

---

## 13.2 Cancelar parcelas

**Afirmação incorreta:**

\[
\frac{x+3}{x}=3.
\]

**Por que está incorreta:**  
\(x\) não é fator de todo o numerador.

**Forma correta:**

\[
\frac{x+3}{x}
=
1+\frac3x,
\qquad x\neq0.
\]

---

## 13.3 Esquecer restrições após simplificar

**Afirmação incorreta:**

\[
\frac{x^2-1}{x-1}=x+1
\]

para todo \(x\).

**Por que está incorreta:**  
A expressão original não existe em \(x=1\).

**Forma correta:**

\[
\frac{x^2-1}{x-1}=x+1,
\qquad x\neq1.
\]

---

## 13.4 Somar expoentes em uma soma de potências

**Afirmação incorreta:**

\[
x^2+x^3=x^5.
\]

**Por que está incorreta:**  
A regra

\[
x^m x^n=x^{m+n}
\]

vale para **produto**, não para soma.

**Forma correta:**

\[
x^2+x^3=x^2(1+x).
\]

---

## 13.5 Interpretar raiz quadrada incorretamente

**Afirmação incorreta:**

\[
\sqrt{9}=\pm3.
\]

**Por que está incorreta:**  
O símbolo \(\sqrt{\phantom{x}}\) representa a raiz quadrada principal, não negativa.

**Forma correta:**

\[
\sqrt9=3.
\]

Entretanto, ao resolver

\[
x^2=9,
\]

temos

\[
x=\pm3.
\]

---

## 13.6 Dividir uma equação por expressão que pode ser zero

**Afirmação incorreta:**

De

\[
x(x-2)=0,
\]

dividir imediatamente por \(x\) e concluir

\[
x=2.
\]

**Por que está incorreta:**  
Essa divisão elimina a possibilidade \(x=0\).

**Forma correta:**

\[
x=0
\quad\text{ou}\quad
x-2=0,
\]

logo

\[
x\in\{0,2\}.
\]

---

## 13.7 Confundir domínio com imagem

**Afirmação incorreta:**  
Para

\[
f(x)=x^2,
\]

o domínio é \([0,\infty)\).

**Por que está incorreta:**  
Entradas negativas são permitidas.

**Forma correta:**

\[
D_f=\mathbb R,
\]

\[
\operatorname{Im}(f)=[0,\infty).
\]

---

## 13.8 Achar que toda equação em \(x\) e \(y\) define \(y\) como função de \(x\)

**Afirmação incorreta:**  
A circunferência

\[
x^2+y^2=1
\]

é o gráfico de uma única função \(y=f(x)\).

**Por que está incorreta:**  
Por exemplo, para \(x=0\),

\[
y=1
\quad\text{ou}\quad
y=-1.
\]

**Forma correta:**  
A circunferência é uma relação; suas metades podem ser descritas pelas funções

\[
y=\sqrt{1-x^2}
\]

e

\[
y=-\sqrt{1-x^2}.
\]

---

# 14. Síntese estrutural

```text
REVISÃO DE BASE PARA CÁLCULO
│
├── Motivação
│   └── dominar manipulações usadas em Cálculo
│
├── Dependências
│   ├── números reais
│   ├── variáveis
│   ├── igualdade
│   └── plano cartesiano
│
├── Álgebra
│   ├── operações
│   │   ├── distributividade
│   │   └── termos semelhantes
│   ├── produtos notáveis
│   ├── fatoração
│   ├── frações algébricas
│   └── potências e raízes
│
├── Equações
│   ├── conjunto solução
│   ├── equivalência
│   └── verificação
│
├── Funções
│   ├── entrada
│   ├── saída
│   ├── domínio
│   └── imagem
│
├── Gráficos
│   ├── pontos (x,f(x))
│   ├── zeros
│   ├── crescimento
│   ├── decrescimento
│   └── extremos
│
├── Exemplos
│   ├── função racional
│   └── função quadrática
│
├── Relações
│   ├── limites
│   ├── derivadas
│   └── taxa de variação
│
├── Aplicações
│   ├── simplificação
│   ├── modelagem
│   └── análise gráfica
│
└── Limitações
    ├── restrições de domínio
    └── tópicos posteriores não cobertos
```

---

# 15. Mapa mental textual

```text
Revisão para Cálculo
├── Álgebra
│   ├── operações
│   ├── produtos notáveis
│   ├── fatoração
│   ├── frações
│   └── potências e raízes
├── Equações
│   ├── transformações equivalentes
│   └── conjunto solução
└── Funções
    ├── regra entrada → saída
    ├── domínio e imagem
    └── gráficos
```

---

# 16. Revisão ativa

## Perguntas conceituais

1. Qual é a diferença entre expressão algébrica e equação?

2. O que significa fatorar uma expressão?

3. Por que

\[
(a+b)^2
\]

não é igual a

\[
a^2+b^2?
\]

4. Em quais condições podemos cancelar um fator em uma fração algébrica?

5. O que significa resolver uma equação?

6. Qual propriedade fundamental diferencia uma função de uma relação qualquer?

7. Qual é a diferença entre domínio e imagem?

8. Por que valores que zeram o denominador precisam ser retirados do domínio?

9. Qual é a relação entre o gráfico de \(f\) e os pares \((x,f(x))\)?

10. Qual é a função da fatoração no estudo posterior de limites?

### Perguntas de comparação

11. Compare desenvolver um produto e fatorar uma expressão.

12. Compare

\[
\sqrt9
\]

com as soluções de

\[
x^2=9.
\]

13. Compare domínio e imagem de

\[
f(x)=x^2.
\]

14. Compare

\[
\frac{x^2-4}{x-2}
\]

e

\[
x+2.
\]

Elas representam exatamente a mesma função?

### Exercícios de aplicação

15. Simplifique:

\[
3(x-2)+2(x+5).
\]

16. Fatore:

\[
x^2-10x+25.
\]

17. Simplifique e informe as restrições:

\[
\frac{x^2-4}{x^2-x-6}.
\]

18. Resolva:

\[
x^2-7x+12=0.
\]

19. Determine domínio e imagem de:

\[
f(x)=\sqrt{x-2}.
\]

### Classifique como válido ou inválido

20.

\[
(x-4)^2=x^2-8x+16.
\]

21.

\[
\frac{x+4}{x}=4.
\]

22.

\[
x^2x^3=x^5.
\]

23.

\[
\sqrt{x^2}=x
\]

para todo \(x\in\mathbb R\).

24. A relação

\[
\{(1,2),(2,3),(1,5)\}
\]

define uma função da primeira coordenada para a segunda?

---

# 17. Respostas da revisão

### 1.

Uma expressão combina números, variáveis e operações, como

\[
2x+3.
\]

Uma equação contém uma igualdade, por exemplo

\[
2x+3=7.
\]

---

### 2.

Fatorar significa transformar uma expressão em produto.

Exemplo:

\[
x^2-9=(x-3)(x+3).
\]

---

### 3.

Porque

\[
(a+b)^2=(a+b)(a+b),
\]

e aplicando a distributividade:

\[
a^2+ab+ab+b^2
=
a^2+2ab+b^2.
\]

---

### 4.

Quando o elemento cancelado aparece como fator completo no numerador e no denominador e esse fator é diferente de zero.

---

### 5.

Encontrar todos os valores da incógnita que tornam a igualdade verdadeira.

---

### 6.

Cada entrada pertencente ao domínio deve possuir exatamente uma saída.

---

### 7.

O domínio é o conjunto de entradas permitidas. A imagem é o conjunto dos valores efetivamente produzidos pela função.

---

### 8.

Porque divisão por zero não está definida.

---

### 9.

Cada valor admissível de \(x\) gera exatamente o ponto

\[
(x,f(x))
\]

no gráfico.

---

### 10.

Fatorar pode revelar fatores comuns que permitem simplificar expressões, especialmente quocientes que aparecem em limites.

---

### 11.

Desenvolver:

\[
(a+b)(a-b)\to a^2-b^2.
\]

Fatorar realiza o processo inverso:

\[
a^2-b^2\to(a-b)(a+b).
\]

---

### 12.

\[
\sqrt9=3
\]

porque o radical representa a raiz principal.

Já

\[
x^2=9
\]

possui duas soluções:

\[
x=3
\quad\text{e}\quad
x=-3.
\]

---

### 13.

Para

\[
f(x)=x^2,
\]

qualquer real pode ser entrada:

\[
D_f=\mathbb R.
\]

Mas quadrados não são negativos:

\[
\operatorname{Im}(f)=[0,\infty).
\]

---

### 14.

A expressão

\[
\frac{x^2-4}{x-2}
\]

possui domínio

\[
\mathbb R\setminus\{2\}.
\]

Como

\[
x^2-4=(x-2)(x+2),
\]

ela equivale a

\[
x+2
\]

quando \(x\neq2\).

Porém a função

\[
g(x)=x+2
\]

definida em todos os reais contém \(x=2\). Portanto, se os domínios forem considerados, não são exatamente a mesma função.

---

### 15.

\[
3(x-2)+2(x+5)
\]

\[
=3x-6+2x+10
\]

\[
=5x+4.
\]

---

### 16.

\[
x^2-10x+25
\]

é um trinômio quadrado perfeito:

\[
x^2-2(5)x+5^2.
\]

Assim,

\[
(x-5)^2.
\]

---

### 17.

\[
\frac{x^2-4}{x^2-x-6}.
\]

Fatorando:

\[
x^2-4=(x-2)(x+2),
\]

\[
x^2-x-6=(x-3)(x+2).
\]

Portanto,

\[
\frac{(x-2)(x+2)}
{(x-3)(x+2)}
=
\frac{x-2}{x-3}.
\]

Restrições originais:

\[
x\neq-2,
\qquad
x\neq3.
\]

---

### 18.

\[
x^2-7x+12=0.
\]

Fatorando:

\[
(x-3)(x-4)=0.
\]

Pelo produto nulo:

\[
x=3
\quad\text{ou}\quad
x=4.
\]

---

### 19.

\[
f(x)=\sqrt{x-2}.
\]

Para existir nos reais:

\[
x-2\ge0,
\]

portanto

\[
x\ge2.
\]

Domínio:

\[
[2,\infty).
\]

Como a raiz quadrada principal nunca é negativa:

\[
\operatorname{Im}(f)=[0,\infty).
\]

---

### 20. Válido.

\[
(x-4)^2
=
x^2-8x+16.
\]

---

### 21. Inválido.

\[
\frac{x+4}{x}
=
1+\frac4x,
\qquad x\neq0.
\]

Não se pode cancelar \(x\) em uma soma.

---

### 22. Válido.

Para mesma base:

\[
x^2x^3=x^{2+3}=x^5.
\]

---

### 23. Inválido.

Na realidade,

\[
\sqrt{x^2}=|x|.
\]

Por exemplo, se \(x=-3\),

\[
\sqrt{(-3)^2}=3\neq-3.
\]

---

### 24. Inválido.

A entrada \(1\) possui duas saídas:

\[
1\mapsto2
\]

e

\[
1\mapsto5.
\]

Portanto, a relação não define uma função da primeira coordenada para a segunda.

---

# 18. Resumo para revisão rápida

### Definição

A revisão de base para Cálculo reúne técnicas algébricas e conhecimentos de funções necessários para manipular e interpretar expressões matemáticas.

### Ideia central

```text
Manipular → Resolver → Representar → Interpretar
```

### Dependências essenciais

- números reais;
- variáveis;
- operações;
- igualdade;
- coordenadas cartesianas.

### Duas propriedades essenciais

\[
a(b+c)=ab+ac
\]

e

\[
ab=0\Rightarrow a=0\text{ ou }b=0.
\]

### Produtos notáveis essenciais

\[
(a+b)^2=a^2+2ab+b^2
\]

\[
(a-b)^2=a^2-2ab+b^2
\]

\[
(a+b)(a-b)=a^2-b^2.
\]

### Potências essenciais

\[
a^ma^n=a^{m+n},
\]

\[
a^{-n}=\frac1{a^n},
\]

\[
a^{m/n}=\sqrt[n]{a^m}.
\]

### Um exemplo

\[
x^2-9=(x-3)(x+3).
\]

### Um contraexemplo

É falso que

\[
(a+b)^2=a^2+b^2.
\]

### Duas aplicações

1. simplificação de expressões em limites;
2. interpretação de funções e taxas de variação.

### Principal erro comum

**Cancelar termos em vez de fatores.**

Nunca:

\[
\frac{x+2}{x}\cancel{=}2.
\]

Mas:

\[
\frac{x(x+2)}x=x+2,
\qquad x\neq0.
\]

### Regra de domínio

Verifique sempre:

\[
\boxed{\text{denominador}\neq0}
\]

e, para raízes pares em \(\mathbb R\),

\[
\boxed{\text{radicando}\ge0}.
\]

---

# 19. Termos-chave

| Termo | Definição curta | Relação com o tema |
|---|---|---|
| Variável | Símbolo que pode representar diferentes valores | Base das expressões e funções |
| Expressão algébrica | Combinação de números, variáveis e operações | Objeto manipulado pela Álgebra |
| Identidade | Igualdade válida para todos os valores admissíveis | Produtos notáveis são identidades |
| Produto notável | Produto com expansão algébrica recorrente | Facilita desenvolvimento e fatoração |
| Fator | Elemento de uma multiplicação | Essencial para fatoração e simplificação |
| Fatoração | Escrita de uma expressão como produto | Fundamental em equações e limites |
| Fração algébrica | Quociente envolvendo expressões algébricas | Exige atenção ao domínio |
| Expoente | Indica uma operação de potência | Aparece em polinômios e funções |
| Radical | Notação envolvendo raízes | Relaciona-se a expoentes racionais |
| Equação | Igualdade contendo incógnitas | Permite determinar valores desconhecidos |
| Solução | Valor que torna uma equação verdadeira | Resultado da resolução |
| Função | Associação que atribui uma saída única a cada entrada | Conceito central do Cálculo |
| Domínio | Conjunto de entradas permitidas | Determina onde a função existe |
| Imagem | Conjunto de saídas produzidas | Descreve os valores atingidos |
| Zero de função | Entrada \(x\) tal que \(f(x)=0\) | Corresponde a interceptos no eixo \(x\) |
| Gráfico | Conjunto dos pontos \((x,f(x))\) | Representação geométrica da função |
| Taxa de variação | Razão entre mudança da saída e mudança da entrada | Antecede o conceito de derivada |

---

# 20. Fontes e referências

## Fontes primárias

Não se aplica diretamente a este conceito.

Não foram utilizados trabalhos científicos originais para definir os conteúdos, pois operações algébricas, fatoração, equações e funções são conhecimentos matemáticos elementares e consolidados, para os quais livros-texto universitários são fontes mais apropriadas.

## Fontes acadêmicas secundárias

**ABRAMSON, Jay. _Algebra and Trigonometry 2e_. OpenStax, Rice University, 2021.**  
Conteúdo utilizado: propriedades dos números reais, operações algébricas, expoentes, radicais, polinômios e fatoração.

**ABRAMSON, Jay. _College Algebra 2e_. OpenStax, Rice University, 2021.**  
Conteúdo utilizado: expressões racionais, fatoração, equações lineares e quadráticas e restrições em equações racionais. Os dados bibliográficos da obra indicam Jay Abramson, OpenStax e publicação em 21 de dezembro de 2021.

**ABRAMSON, Jay. _Precalculus 2e_. OpenStax, Rice University, 2021.**  
Conteúdo utilizado: funções, notação funcional, domínio, imagem, gráficos e taxa de variação. A própria página bibliográfica da obra identifica Jay Abramson como autor e 21 de dezembro de 2021 como data de publicação.

## Fontes complementares

**University of Washington — Department of Mathematics. _Math 120 — Precalculus Review Materials_.**  
Conteúdo utilizado: confirmação independente de que álgebra, funções, domínio, imagem e gráficos integram materiais universitários de Pré-Cálculo.

**University of California, Los Angeles — Department of Mathematics. _Undergraduate Courses_.**  
Conteúdo utilizado: confirmação de que preparação em funções e Pré-Cálculo é considerada conhecimento prévio relevante para sequências de Cálculo.

**University of Illinois Urbana-Champaign — Department of Mathematics. _MATH 115: Preparation for Calculus_.**  
Conteúdo utilizado: relação entre revisão de funções e preparação formal para cursos universitários de Cálculo.

**University of Texas at Austin — Department of Mathematics. _Undergraduate Courses_.**  
Conteúdo utilizado: confirmação complementar da presença de álgebra elementar e funções lineares e quadráticas em preparação matemática universitária.

---

# 21. Qualidade e confiabilidade

**Pontos amplamente estabelecidos:**  
As propriedades algébricas, produtos notáveis, técnicas elementares de fatoração, regras de expoentes, definição de função, domínio, imagem e representação gráfica apresentadas aqui são conteúdos matemáticos padronizados e amplamente estabelecidos. As fontes consultadas são consistentes nesses pontos.

**Divergências entre fontes:**  
Não foram encontradas divergências matemáticas relevantes para o escopo adotado. Pode haver diferenças pedagógicas de terminologia — especialmente entre “imagem”, “range” e “codomínio” em diferentes materiais. Nesta KSL, **imagem** significa precisamente o conjunto

\[
\{f(x):x\in D_f\},
\]

enquanto o contradomínio é o conjunto de chegada especificado na definição de \(f\).

**Inferências realizadas:**  
A ordem

\[
\text{álgebra}\rightarrow\text{equações}\rightarrow\text{funções}\rightarrow
\text{domínio}\rightarrow\text{gráficos}
\]

foi adotada como organização didática desta KSL. Ela é coerente com a estrutura dos materiais consultados, mas não representa uma única ordem obrigatória universal.

Também é uma inferência pedagógica que dominar esses tópicos reduz dificuldades posteriores de manipulação em limites e derivadas; o vínculo matemático é demonstrado pelos quocientes e simplificações utilizados nesses conteúdos.

**Limitações da pesquisa:**  
O escopo solicitado não incluiu trigonometria, exponenciais e logaritmos, que também costumam fazer parte de uma preparação completa para Cálculo. A pesquisa concentrou-se nos nove assuntos fornecidos.

**Nível de confiança:** **alto.**

Justificativa: as definições e propriedades são matematicamente consolidadas e foram verificadas em livros universitários da OpenStax/Rice University e comparadas com materiais institucionais de diferentes departamentos universitários.

---

## Fluxo de aprendizagem KSL

\[
\boxed{
\text{Compreender}
\rightarrow
\text{Organizar}
\rightarrow
\text{Aplicar}
\rightarrow
\text{Recuperar sem consultar}
}
\]

Para esta revisão, a sequência prática recomendada é:

\[
\boxed{
1\rightarrow2\rightarrow3\rightarrow4\rightarrow5
\rightarrow6\rightarrow7\rightarrow8\rightarrow9
}
\]

ou seja:

**Operações algébricas → Produtos notáveis → Fatoração → Frações algébricas → Potenciação e radiciação → Equações → Funções → Domínio e imagem → Gráficos.**