/* eslint-disable */

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
    API: string;
    SENTRY_DSN: string;
    SENTRY_ORIGIN: string;
  }
}
