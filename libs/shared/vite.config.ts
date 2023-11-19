/// <reference types='vitest' />

import type { InlineConfig } from 'vitest';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import * as path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(() => ({
  build: {
    lib: {
      entry: {
        index: 'src/index.ts',
        react: 'src/react/index.ts',
      },
      formats: ['es', 'cjs'],
      name: 'shared',
    },
    rollupOptions: {
      external: ['react'],
    },
  },
  cacheDir: '../../node_modules/.vite/shared',

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  // Configuration for building your library.
  plugins: [
    nxViteTsPaths(),
    dts({ entryRoot: 'src', skipDiagnostics: true, tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json') }),
  ],
  test: {
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'node',
    globals: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  } satisfies InlineConfig,
}));
