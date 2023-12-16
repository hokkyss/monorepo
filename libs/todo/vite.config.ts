import type { Plugin } from 'vite';
import type { InlineConfig } from 'vitest';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import pkg from './package.json';

export default defineConfig((configEnv) => ({
  build: {
    lib: {
      entry: {
        index: 'src/vanilla/index.ts',
        'react/index': 'src/react/index.ts',
      },
      formats: ['es', 'cjs'],
      name: 'todo',
    },
    rollupOptions: {
      // match @tanstack/react-query and @tanstack/react-query/anything, but not @tanstack/react-query-devtools
      external: Object.keys(pkg.peerDependencies).map((key) => new RegExp(`^${key}(/.+)*`)),
      plugins: [resolve() as Plugin],
    },
  },
  cacheDir: '../../node_modules/.vite/todo',
  plugins: [
    nxViteTsPaths({
      debug: configEnv.mode === 'development',
    }),
    dts({ entryRoot: 'src', skipDiagnostics: true, tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json') }),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  test: {
    cache: { dir: '../../node_modules/.vitest' },
    environment: 'node',
    globals: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  } satisfies InlineConfig,
}));
