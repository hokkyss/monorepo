import type { Plugin } from 'vite';
import type { InlineConfig } from 'vitest';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
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
  return {
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      emptyOutDir: true,
      outDir: '../../dist/apps/react-template',
      reportCompressedSize: true,
      rollupOptions: {
        plugins: [jsxInJs([])],
      },
    },
    cacheDir: '../../node_modules/.vite/react-template',
    define: {
      'process.env': `${JSON.stringify({
        ...loadEnv(configEnv.mode, __dirname, 'VITE_'),
        NODE_ENV: configEnv.mode,
      })}`,
    },
    optimizeDeps: {
      esbuildOptions: {
        jsx: 'automatic',
        loader: { '.js': 'jsx' },
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
      TanStackRouterVite({
        generatedRouteTree: path.join(__dirname, 'src', 'configs', 'route', 'route.config.ts'),
        routesDirectory: path.join(__dirname, 'src', 'routes'),
      }),
      react({
        tsDecorators: true,
      }),
      nxViteTsPaths({
        debug: configEnv.mode === 'development',
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
        reportsDirectory: '../../coverage/apps/react-template',
      },
      environment: 'happy-dom',
      globals: true,
      include: [`src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`],
      mockReset: true,
      reporters: ['default'],
      setupFiles: [path.join(__dirname, 'tests/setup/inject-dependencies.setup.ts')],
    } satisfies InlineConfig,
  };
});
