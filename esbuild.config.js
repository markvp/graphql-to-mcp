const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

const sharedConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  treeShaking: true,
  target: 'node20',
  platform: 'node',
  plugins: [nodeExternalsPlugin()],
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