import type { InlineConfig } from 'vitest';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import resolve from '@rollup/plugin-node-resolve';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import pkg from './package.json';
import { createEntries } from './tests/utils/create-entries.util';
import { getSetupFiles } from './tests/utils/get-setup-files.util';

export default defineConfig(async (configEnv) => ({
  build: {
    lib: {
      entry: await createEntries(),
      formats: ['es', 'cjs'],
      name: 'shared',
    },
    rollupOptions: {
      // match @tanstack/react-query and @tanstack/react-query/anything, but not @tanstack/react-query-devtools
      external: Object.keys(pkg.peerDependencies).map((key) => new RegExp(`^${key}(/.+)*`)),
      plugins: [resolve() as Plugin],
    },
  },
  cacheDir: '../../node_modules/.vite/ui',
  plugins: [
    react({ tsDecorators: true }),
    nxViteTsPaths({ debug: configEnv.mode === 'development' }),
    dts({ entryRoot: 'src', skipDiagnostics: true, tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json') }),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  test: {
    cache: { dir: '../../node_modules/.vitest' },
    environment: 'happy-dom',
    globals: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: await getSetupFiles(),
  } satisfies InlineConfig,
}));
