'use strict';

/**
 * Bibliotecas de representação servidas a partir de node_modules — a página
 * funciona offline, sem depender de CDN.
 *
 * mount público -> diretório do pacote
 */
const VENDOR_MOUNTS = {
  '/vendor/katex': 'node_modules/katex/dist',
  '/vendor/jsxgraph': 'node_modules/jsxgraph/distrib',
  '/vendor/function-plot': 'node_modules/function-plot/dist',
  '/vendor/plotly': 'node_modules/plotly.js-dist-min',
  '/vendor/cytoscape': 'node_modules/cytoscape/dist',
  '/vendor/dagre': 'node_modules/dagre/dist',
  '/vendor/cytoscape-dagre': 'node_modules/cytoscape-dagre'
};

/** Arquivos realmente usados pela página (usado pelo build estático). */
const VENDOR_FILES = {
  '/vendor/katex': ['katex.min.js', 'katex.min.css', 'fonts'],
  '/vendor/jsxgraph': ['jsxgraphcore.js', 'jsxgraph.css'],
  '/vendor/function-plot': ['function-plot.js'],
  '/vendor/plotly': ['plotly.min.js'],
  '/vendor/cytoscape': ['cytoscape.min.js'],
  '/vendor/dagre': ['dagre.min.js'],
  '/vendor/cytoscape-dagre': ['cytoscape-dagre.js']
};

module.exports = { VENDOR_MOUNTS, VENDOR_FILES };
