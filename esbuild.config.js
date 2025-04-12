const esbuild = require('esbuild');

const sharedConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: 'node20',
  platform: 'node',
};

esbuild.build({
  ...sharedConfig,
  format: 'esm',
  outfile: 'dist/index.esm.js',
}).catch(() => process.exit(1));

esbuild.build({
  ...sharedConfig,
  format: 'cjs',
  outfile: 'dist/index.cjs.js',
}).catch(() => process.exit(1));