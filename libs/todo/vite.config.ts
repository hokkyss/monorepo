import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import pkg from './package.json';

export default defineConfig((configEnv) => {
  const exportsConditions = [configEnv.mode, 'browser', 'module', 'import', 'default', 'require'];
  const mainFields = ['exports', 'import', 'browser', 'module', 'main', 'jsnext:main', 'jsnext'];
  const extensions = ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.cjs', '.cts'];
  const tsconfig = path.join(__dirname, 'tsconfig.lib.json');

  return {
    build: {
      commonjsOptions: { transformMixedEsModules: true },
      emptyOutDir: true,
      lib: {
        entry: {
          index: 'src/index.ts',
        },
        formats: ['es', 'cjs'],
        name: 'todo',
      },
      outDir: '../../libs/todo/dist',
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
    cacheDir: '../../node_modules/.vite/todo',
    optimizeDeps: {
      esbuildOptions: {
        conditions: exportsConditions,
        mainFields,
        resolveExtensions: extensions,
        tsconfig,
      },
      extensions,
    },
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
        provider: 'v8',
        reportsDirectory: '../../coverage/libs/todo',
      },
      environment: 'node',
      globals: true,
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      mockReset: true,
      reporters: ['default'],
    },
  };
});
