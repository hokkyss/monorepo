/// <reference types='vitest' />

import type { Plugin } from 'vite';
import type { InlineConfig } from 'vitest';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import resolve from '@rollup/plugin-node-resolve';
import * as path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import pkg from './package.json';
import { getSetupFiles } from './tests/utils/get-setup-files.util';

export default defineConfig(async (configEnv) => ({
  build: {
    lib: {
      entry: {
        'clients/abstract/index': 'src/clients/abstract/index.ts',
        'clients/implementation/http/axios': 'src/clients/implementation/http/axios.http-client.ts',
        'clients/implementation/http/fetch': 'src/clients/implementation/http/fetch.http-client.ts',
        'clients/implementation/storage/indexed-db': 'src/clients/implementation/storage/indexed-db.storage-client.ts',
        'clients/implementation/storage/local': 'src/clients/implementation/storage/local.storage-client.ts',
        'clients/implementation/storage/session': 'src/clients/implementation/storage/session.storage-client.ts',
        'react/hooks/index': 'src/react/hooks/index.ts',
        'react/hooks/use-boolean': 'src/react/hooks/use-boolean.hook.ts',
        'react/hooks/use-merge-ref': 'src/react/hooks/use-merge-ref.hook.ts',
        'react/hooks/use-previous': 'src/react/hooks/use-previous.hook.ts',
        'react/index': 'src/react/index.ts',
        'types/shared': 'src/types/shared.type.ts',
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
    dts({
      entryRoot: 'src',
      skipDiagnostics: true,
      tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],
  test: {
    cache: {
      dir: '../../node_modules/.vitest',
    },
    clearMocks: true,
    coverage: {
      provider: 'v8',
    },
    environment: 'happy-dom',
    globals: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    mockReset: true,
    setupFiles: await getSetupFiles(),
  } satisfies InlineConfig,
}));
