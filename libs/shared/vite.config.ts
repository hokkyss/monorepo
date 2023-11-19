/// <reference types='vitest' />

import type { InlineConfig } from 'vitest';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import * as path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import pkg from './package.json';

export default defineConfig(() => ({
  build: {
    lib: {
      entry: {
        'http/axios': 'src/http/axios.http-client.ts',
        'http/fetch': 'src/http/fetch.http-client.ts',
        'main/index': 'src/main/index.ts',
        'react/hooks': 'src/react/hooks/index.ts',
      },
      formats: ['es', 'cjs'],
      name: 'shared',
    },
    rollupOptions: {
      external: Object.keys(pkg.peerDependencies),
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
