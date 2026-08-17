'use strict';

/**
 * Exportação estática: gera `dist/` com a página, os assets e as bibliotecas.
 * Útil para abrir sem servidor ou publicar em hospedagem estática.
 */

const fs = require('fs');
const path = require('path');

const { build, SOURCE_FILE } = require('../src/document');
const layout = require('../src/layout');
const { VENDOR_MOUNTS, VENDOR_FILES } = require('../src/vendor');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

function copy(from, to) {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.cpSync(from, to, { recursive: true });
}

function main() {
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  const doc = build();
  fs.writeFileSync(path.join(DIST, 'index.html'), layout.page(doc, { assetPrefix: './' }));
  copy(path.join(ROOT, 'public'), DIST);
  copy(SOURCE_FILE, path.join(DIST, 'fonte.md'));

  let files = 0;
  for (const [mount, dir] of Object.entries(VENDOR_MOUNTS)) {
    const target = path.join(DIST, mount.replace(/^\//, ''));
    for (const file of VENDOR_FILES[mount] || []) {
      const from = path.join(ROOT, dir, file);
      if (!fs.existsSync(from)) {
        console.warn('  aviso: não encontrado', path.relative(ROOT, from));
        continue;
      }
      copy(from, path.join(target, file));
      files += 1;
    }
  }

  const sections = doc.chapters.length;
  const widgets = doc.clientData.widgets.length;
  const diagrams = Object.keys(doc.clientData.diagrams).length;

  console.log('dist/ gerado');
  console.log(`  ${sections} seções · ${widgets} widgets · ${diagrams} diagramas · ${files} arquivos de bibliotecas`);
  console.log('  abra dist/index.html ou sirva a pasta: npx serve dist');
}

main();
