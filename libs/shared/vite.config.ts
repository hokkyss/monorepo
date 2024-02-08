/// <reference types='vitest' />

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import resolve from '@rollup/plugin-node-resolve';
import * as path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import pkg from './package.json';
import { getSetupFiles } from './tests/utils/get-setup-files.util';

export default defineConfig(async (configEnv) => {
  const exportsConditions = [configEnv.mode, 'browser', 'module', 'import', 'default', 'require'];
  const mainFields = ['exports', 'import', 'browser', 'module', 'main', 'jsnext:main', 'jsnext'];
  const extensions = ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.cjs', '.cts'];
  const tsconfig = path.join(__dirname, 'tsconfig.lib.json');

  return {
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      emptyOutDir: true,
      lib: {
        entry: {
          'clients/abstract/http/index': 'src/clients/abstract/http/index.ts',
          'clients/abstract/storage/index': 'src/clients/abstract/storage/index.ts',
          'clients/implementation/http/axios': 'src/clients/implementation/http/axios.http-client.ts',
          'clients/implementation/http/fetch': 'src/clients/implementation/http/fetch.http-client.ts',
          'clients/implementation/storage/indexed-db':
            'src/clients/implementation/storage/indexed-db.storage-client.ts',
          'clients/implementation/storage/local': 'src/clients/implementation/storage/local.storage-client.ts',
          'clients/implementation/storage/session': 'src/clients/implementation/storage/session.storage-client.ts',
          index: 'src/index.ts',
          'types/shared': 'src/types/shared.type.ts',
        },
        formats: ['es', 'cjs'],
        name: 'shared',
      },
      outDir: '../../libs/shared/dist',
      reportCompressedSize: true,
      rollupOptions: {
        // match @tanstack/react-query and @tanstack/react-query/anything, but not @tanstack/react-query-devtools
        external: Object.keys(pkg.peerDependencies).map((key) => new RegExp(`^${key}(/.+)*`)),
        plugins: [
          resolve({
            exportConditions: exportsConditions,
            extensions,
            mainFields,
          }),
        ],
      },
    },
    cacheDir: '../../node_modules/.vite/shared',
    optimizeDeps: {
      esbuildOptions: {
        conditions: exportsConditions,
        mainFields,
        resolveExtensions: extensions,
        tsconfig,
      },
      extensions,
    },
    // Configuration for building your library.
    plugins: [
      nxViteTsPaths({
        debug: configEnv.mode === 'development',
        extensions,
        mainFields,
      }),
      dts({
        entryRoot: 'src',
        skipDiagnostics: true,
        tsConfigFilePath: tsconfig,
      }),
    ],

    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    root: __dirname,
    test: {
      cache: {
        dir: '../../node_modules/.vitest',
      },
      clearMocks: true,
      coverage: {
        provider: 'v8',
        reportsDirectory: '../../coverage/libs/shared',
      },
      environment: 'happy-dom',
      globals: true,
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      mockReset: true,
      reporters: ['default'],
      setupFiles: await getSetupFiles(),
    },
  };
});
