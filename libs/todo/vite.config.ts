import type { InlineConfig } from 'vitest';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import pkg from './package.json';

export default defineConfig((configEnv) => ({
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    emptyOutDir: true,
    lib: {
      entry: {
        index: 'src/index.ts',
      },
      formats: ['es', 'cjs'],
      name: 'todo',
    },
    outDir: '../../dist/libs/todo',
    reportCompressedSize: true,
    rollupOptions: {
      // match @tanstack/react-query and @tanstack/react-query/anything, but not @tanstack/react-query-devtools
      external: Object.keys(pkg.peerDependencies).map((key) => new RegExp(`^${key}(/.+)*`)),
    },
  },
  cacheDir: '../../node_modules/.vite/libs/todo',
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
  root: __dirname,
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  test: {
    cache: {
      dir: '../../node_modules/.vitest',
    },
    clearMocks: true,
    coverage: {
      enabled: true,
      provider: 'v8',
      reportsDirectory: '../../coverage/libs/todo',
    },
    environment: 'node',
    globals: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    mockReset: true,
    reporters: ['default'],
  } satisfies InlineConfig,
}));
