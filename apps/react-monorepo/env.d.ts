/// <reference types="vite/client" />

type EnvironmentVariable = {
  NODE_ENV: 'development' | 'production' | 'test';
};

declare namespace NodeJS {
  declare interface ProcessEnv extends EnvironmentVariable {}
}

declare interface ImportMetaEnv extends EnvironmentVariable {
  MODE: EnvironmentVariable['NODE_ENV'];
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
