# KSL — Revisão de Base para Cálculo em Computação (página web)

Aplicação Node.js que publica o documento
`KSL — Revisão de Base para Cálculo em Computação.md` como página web de estudo,
com matemática renderizada e representações interativas.

**O markdown é a fonte única e não é modificado.** O servidor lê o arquivo, divide
por seções numeradas e renderiza. Grafos, gráficos e o baralho de revisão são
camadas de apresentação em volta do texto — cada bloco acrescentado aparece
marcado como `Complemento`.

## Como rodar

```bash
npm install
npm start          # http://localhost:3000
npm run dev        # o mesmo, recarregando o servidor a cada alteração
npm run build      # exporta dist/ estático (abre sem servidor)
```

Em desenvolvimento (`NODE_ENV` diferente de `production`) o markdown é
re-renderizado a cada requisição: basta editar o `.md` e recarregar a página.

## O que a página faz

- **Navegação por seções** — as 21 seções do documento, mais o fluxo de
  aprendizagem e um apêndice interativo, agrupadas na barra lateral.
- **Índice interno** por seção, links diretos para qualquer subtítulo
  (`/#c5-5-8-dominio-e-imagem`).
- **Leitura contínua** — botão que exibe todas as seções em sequência (também
  usado pela impressão).
- **Tema claro/escuro** — botão na barra superior ou `?tema=claro` / `?tema=escuro`.
- **Atalhos** — `←` / `→` entre seções, `/` para filtrar a lista.
- **Markdown original** disponível em `/fonte.md`.

## Bibliotecas de representação

Servidas de `node_modules` (sem CDN, funciona offline):

| Biblioteca | Uso na página |
|---|---|
| **KaTeX** | Toda a matemática `\[ … \]` e `\( … \)` do documento, renderizada no servidor; no cliente, os rótulos que mudam ao interagir |
| **Cytoscape.js** + dagre | Versão navegável dos 5 diagramas ASCII (cadeia dos assuntos, estratégia geral, síntese estrutural, mapa mental, ideia central) |
| **Function Plot** | Curvas `y = f(x)`: o furo em `(2,4)`, restrições de domínio, os dois exemplos da seção 8 e o plotter do apêndice |
| **JSXGraph** | Construções arrastáveis: pontos `(x, f(x))`, decomposição de `(a+b)²`, secante → tangente |
| **Plotly.js** | Modelo de custo `C(n) = 2n² + 5n + 10` comparado a `n²` e `n·log₂n` |

## Estrutura

```
server.js                 Express: página, /fonte.md, assets e bibliotecas
scripts/build.js          exportação estática para dist/
src/
  document.js             lê o .md, divide em seções, insere os widgets
  markdown.js             markdown-it + texmath/KaTeX, ids, diagramas ASCII
  layout.js               HTML da página (barra lateral, seções, paginação)
  widgets.js              catálogo de widgets e onde cada um é ancorado
  vendor.js               mapeamento das bibliotecas em node_modules
  data/diagrams.js        diagramas do documento como grafos
  data/flashcards.js      questões da seção 16 com as respostas da seção 17
public/
  css/styles.css
  js/app.js               navegação, tema, ciclo de vida dos widgets
  js/widgets/*.js         um arquivo por tipo de representação
```

### Acrescentar um widget

1. Descreva-o em `src/widgets.js` (`chapter`, `anchor`, `type`, `title`,
   `caption`, `config`). A âncora é um regex sobre o texto de um título da seção;
   o bloco entra no fim daquela subseção.
2. Se o tipo for novo, registre `KSL.registry.<tipo> = function (host, config)`
   em um arquivo de `public/js/widgets/` e inclua o arquivo em
   `APP_SCRIPTS` (`src/layout.js`).
