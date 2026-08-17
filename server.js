'use strict';

const path = require('path');
const express = require('express');

const { build, SOURCE_FILE } = require('./src/document');
const layout = require('./src/layout');
const { VENDOR_MOUNTS } = require('./src/vendor');

const app = express();
const PORT = process.env.PORT || 3000;
const DEV = process.env.NODE_ENV !== 'production';

let cache = null;

function getPage() {
  if (!cache || DEV) {
    cache = layout.page(build());
  }
  return cache;
}

app.get('/', (req, res) => {
  res.type('html').send(getPage());
});

// Markdown original, para consulta/download.
app.get('/fonte.md', (req, res) => {
  res.type('text/markdown; charset=utf-8').sendFile(SOURCE_FILE);
});

app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

for (const [mount, dir] of Object.entries(VENDOR_MOUNTS)) {
  app.use(mount, express.static(path.join(__dirname, dir), { maxAge: DEV ? 0 : '30d' }));
}

app.use((req, res) => {
  res.status(404).type('txt').send('Não encontrado');
});

app.listen(PORT, () => {
  console.log(`KSL no ar: http://localhost:${PORT}`);
  console.log(`Fonte: ${path.basename(SOURCE_FILE)}${DEV ? ' (re-render a cada requisição)' : ''}`);
});
