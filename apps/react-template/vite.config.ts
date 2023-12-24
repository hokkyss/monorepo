import type { Plugin } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import resolve from '@rollup/plugin-node-resolve';
import react from '@vitejs/plugin-react-swc';
import { readFileSync } from 'fs';
import path from 'path';
import { defineConfig, loadEnv, transformWithEsbuild } from 'vite';
import svgr from 'vite-plugin-svgr';

const jsxInJs = (matchers: RegExp[]): Plugin => ({
  load(id: string) {
    if (matchers.some((matcher) => matcher.test(id)) && id.endsWith('.js')) {
      const file = readFileSync(id, { encoding: 'utf-8' });
      return transformWithEsbuild(file, id, {
        jsx: 'automatic',
        loader: 'jsx',
      });
    }
    return null;
  },
  name: 'jsx-in-js',
});

export default defineConfig((configEnv) => {
  const exportsConditions = [configEnv.mode, 'browser', 'module', 'import', 'default', 'require'];
  const mainFields = ['exports', 'import', 'browser', 'module', 'main', 'jsnext:main', 'jsnext'];
  const extensions = ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.cjs', '.cts'];

  return {
    build: {
      // commonjsOptions: {
      //   transformMixedEsModules: true,
      // },
      emptyOutDir: true,
      outDir: '../../dist/apps/react-template',
      reportCompressedSize: true,
      rollupOptions: {
        plugins: [
          resolve({
            exportConditions: exportsConditions,
            extensions,
            mainFields,
          }),
          jsxInJs([]),
        ],
      },
    },
    cacheDir: '../../node_modules/.vite/react-template',
    define: {
      __DEV__: configEnv.mode === 'development',
      global: 'window',
      'process.env': `${JSON.stringify({
        ...loadEnv(configEnv.mode, __dirname, 'VITE_'),
        NODE_ENV: configEnv.mode,
      })}`,
    },
    optimizeDeps: {
      esbuildOptions: {
        conditions: exportsConditions,
        jsx: 'automatic',
        loader: { '.js': 'jsx' },
        mainFields,
        resolveExtensions: extensions,
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      },
    },
    plugins: [
      svgr({
        esbuildOptions: {
          jsx: 'automatic',
        },
        include: '**/*.svg?react',
        svgrOptions: {
          dimensions: false,
          expandProps: true,
          exportType: 'default',
          svgProps: {
            className: '{props.className ?? props.class ?? undefined}',
            color: "{props.color ?? 'currentColor'}",
            fill: "{props.fill ?? 'currentColor'}",
            role: 'img',
          },
        },
      }),
      react({
        tsDecorators: true,
      }),
      nxViteTsPaths({
        debug: configEnv.mode === 'development',
        extensions,
        mainFields,
      }),
    ],
    resolve: {
      conditions: exportsConditions,
      extensions,
      mainFields,
    },
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
        reportsDirectory: '../../coverage/libs/shared',
      },
      environment: 'happy-dom',
      globals: true,
      include: [`src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`],
      mockReset: true,
      reporters: ['default'],
    },
  };
});
