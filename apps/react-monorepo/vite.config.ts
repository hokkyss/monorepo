/// <reference types="./rollup" />

import type { Plugin, UserConfig } from 'vite';
import type { InlineConfig } from 'vitest';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import resolve from '@rollup/plugin-node-resolve';
import react from '@vitejs/plugin-react-swc';
import { readFileSync } from 'fs';
import { defineConfig, loadEnv, transformWithEsbuild } from 'vite';
import svgr from 'vite-plugin-svgr';

const mainFields = ['browser', 'module', 'main', 'jsnext:main', 'jsnext'];
const extensions = ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'];

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

export default defineConfig(
  (configEnv) =>
    ({
      build: {
        rollupOptions: {
          plugins: [
            resolve({
              browser: true,
              exportConditions: ['require', 'default', 'module', 'import'],
              extensions,
              mainFields,
            }) as Plugin,
            jsxInJs([]),
          ],
        },
      },
      cacheDir: '../../node_modules/.vite/react-monorepo',
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
          jsx: 'automatic',
          loader: { '.js': 'jsx' },
          resolveExtensions: extensions,
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
        }),
      ],
      resolve: {
        conditions: [configEnv.mode, 'browser', 'import', 'module', 'default'],
        extensions,
        mainFields,
      },
      // Uncomment this if you are using workers.
      // worker: {
      //  plugins: [ nxViteTsPaths() ],
      // },
      test: {
        cache: {
          dir: '../../node_modules/.vitest',
        },
        environment: 'happy-dom',
        globals: true,
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      },
    }) satisfies UserConfig & { test: InlineConfig },
);
