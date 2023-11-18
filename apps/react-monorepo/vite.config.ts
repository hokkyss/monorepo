import type { Plugin } from 'vite';
import type { InlineConfig } from 'vitest';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react-swc';
import { readFileSync } from 'fs';
import { defineConfig, loadEnv, transformWithEsbuild } from 'vite';

const jsxInJs = (matchers: RegExp[]): Plugin => ({
  load(id: string) {
    if (matchers.some((matcher) => matcher.test(id)) && id.endsWith('.js')) {
      const file = readFileSync(id, { encoding: 'utf-8' });
      return transformWithEsbuild(file, id, {
        jsx: 'automatic',
        loader: 'jsx',
      });
    }
    return null;
  },
  name: 'jsx-in-js',
});

export default defineConfig((configEnv) => ({
  build: {
    rollupOptions: {
      plugins: [jsxInJs([])],
    },
  },

  cacheDir: '../../node_modules/.vite/react-monorepo',

  define: {
    __DEV__: configEnv.mode === 'development',
    global: 'window',
    'process.env': `${JSON.stringify({
      ...loadEnv(configEnv.mode, __dirname, 'VITE_'),
      NODE_ENV: configEnv.mode,
    })}`,
  },

  plugins: [react(), nxViteTsPaths()],

  resolve: {
    mainFields: ['browser', 'module', 'jsnext:main', 'jsnext'],
  },

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  test: {
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'happy-dom',
    globals: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  } satisfies InlineConfig,
}));
