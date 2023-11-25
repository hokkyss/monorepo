/// <reference types='vitest' />

import type { Plugin } from 'vite';
import type { InlineConfig } from 'vitest';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import resolve from '@rollup/plugin-node-resolve';
import * as path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import pkg from './package.json';

export default defineConfig((configEnv) => ({
  build: {
    lib: {
      entry: {
        'clients/abstract': 'src/clients/abstract/index.ts',
        'clients/http/axios': 'src/clients/implementation/http/axios.http-client.ts',
        'clients/http/fetch': 'src/clients/implementation/http/fetch.http-client.ts',
        'clients/storage/indexed-db': 'src/clients/implementation/storage/indexed-db.storage-client.ts',
        'clients/storage/local': 'src/clients/implementation/storage/local.storage-client.ts',
        'clients/storage/session': 'src/clients/implementation/storage/session.storage-client.ts',
        'react/hooks': 'src/react/hooks/index.ts',
        types: 'src/types/shared.type.ts',
      },
      formats: ['es', 'cjs'],
      name: 'shared',
    },
    rollupOptions: {
      // match @tanstack/react-query and @tanstack/react-query/anything, but not @tanstack/react-query-devtools
      external: Object.keys(pkg.peerDependencies).map((key) => new RegExp(`^${key}(/.+)*`)),
      plugins: [resolve() as Plugin],
    },
  },
  cacheDir: '../../node_modules/.vite/shared',

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  // Configuration for building your library.
  plugins: [
    nxViteTsPaths({
      debug: configEnv.mode === 'development',
    }),
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
