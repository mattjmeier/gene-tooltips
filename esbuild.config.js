import esbuild from 'esbuild';

// Determine if we're in "watch" mode
const isWatching = process.argv.includes('--watch');

// Shared configuration for all builds
const sharedConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: !isWatching,
  sourcemap: isWatching,
  // You already had these, which is perfect. No plugin needed.
  external: ['d3', 'ideogram'],
  loader: {
    '.svg': 'text',
    '.png': 'dataurl',
  },
  logLevel: 'info',
};

// --- Build Tasks ---
const buildJS = () => Promise.all([
  // CJS
  esbuild.build({
    ...sharedConfig,
    platform: 'node',
    format: 'cjs',
    outfile: 'dist/gene-tooltips.cjs.js',
  }),
  // ESM
  esbuild.build({
    ...sharedConfig,
    platform: 'browser',
    format: 'esm',
    outfile: 'dist/gene-tooltips.esm.js',
  }),
  // UMD/IIFE
  esbuild.build({
    ...sharedConfig,
    platform: 'browser',
    format: 'iife',
    globalName: 'GeneTooltip',
    outfile: 'dist/gene-tooltips.global.js',
    footer: {
      js: 'window.GeneTooltip = window.GeneTooltip.default;',
    },
  }),
]);

const buildCSS = () => esbuild.build({
    entryPoints: ['src/css/main.css'],
    bundle: true,
    minify: !isWatching,
    outfile: 'dist/gene-tooltips.css',
});

// --- Main Execution ---
if (isWatching) {
    // This part is more complex without a plugin, so for now let's focus on build.
    // We can add watch back later if needed.
    console.log('Watch mode needs to be reconfigured. Running a single build instead.');
    Promise.all([buildJS(), buildCSS()]).catch(() => process.exit(1));

} else {
  // Run all production builds
  Promise.all([buildJS(), buildCSS()])
    .then(() => console.log('JS and CSS builds successful!'))
    .catch(() => process.exit(1));
}