/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

type EnvironmentVariable = {
  NODE_ENV: 'development' | 'production' | 'test';
};

declare namespace NodeJS {
  declare interface ProcessEnv extends EnvironmentVariable {}
}

declare interface ImportMetaEnv extends EnvironmentVariable {}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
