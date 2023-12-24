import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import resolve from '@rollup/plugin-node-resolve';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import pkg from './package.json';
import { createEntries } from './tests/utils/create-entries.util';
import { getSetupFiles } from './tests/utils/get-setup-files.util';

export default defineConfig(async (configEnv) => {
  const exportsConditions = [configEnv.mode, 'browser', 'module', 'import', 'default', 'require'];
  const mainFields = ['exports', 'import', 'browser', 'module', 'main', 'jsnext:main', 'jsnext'];
  const extensions = ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.cjs', '.cts'];
  const tsconfig = path.join(__dirname, 'tsconfig.lib.json');

  return {
    build: {
      commonjsOptions: { transformMixedEsModules: true },
      emptyOutDir: true,
      lib: {
        entry: await createEntries(),
        formats: ['es', 'cjs'],
        name: 'shared',
      },
      outDir: '../../libs/ui/dist',
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
    cacheDir: '../../node_modules/.vite/ui',
    optimizeDeps: {
      esbuildOptions: {
        conditions: exportsConditions,
        jsx: 'automatic',
        loader: { '.js': 'jsx' },
        mainFields,
        resolveExtensions: extensions,
        tsconfig,
      },
      extensions,
    },
    plugins: [
      react({ tsDecorators: true }),
      nxViteTsPaths({ debug: configEnv.mode === 'development' }),
      dts({
        entryRoot: 'src',
        skipDiagnostics: true,
        tsConfigFilePath: tsconfig,
      }),
    ],
    root: __dirname,
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    test: {
      cache: { dir: '../../node_modules/.vitest' },
      clearMocks: true,
      coverage: {
        provider: 'v8',
        reportsDirectory: '../../coverage/libs/ui',
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
