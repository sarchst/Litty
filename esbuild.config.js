const esbuild = require('esbuild');
const path = require('path');

const buildConfig = {
  entryPoints: ['app/javascript/application.js'],
  bundle: true,
  outfile: 'app/assets/builds/application.js',
  format: 'esm',
  target: 'es2017',
  jsx: 'automatic',
  loader: {
    '.js': 'jsx',
    '.jsx': 'jsx'
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  minify: true,
  sourcemap: true
};

const devConfig = {
  ...buildConfig,
  minify: false,
  sourcemap: true,
  define: {
    'process.env.NODE_ENV': '"development"'
  }
};

if (process.argv.includes('--watch')) {
  esbuild.build(devConfig).then(() => {
    console.log('Watching for changes...');
    esbuild.context(devConfig).then(ctx => {
      ctx.watch();
    });
  });
} else {
  const config = process.env.NODE_ENV === 'production' ? buildConfig : devConfig;
  esbuild.build(config).catch(() => process.exit(1));
}
