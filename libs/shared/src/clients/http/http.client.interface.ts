export type RequestOptions = {
  headers?: Record<string, string>;
  searchParams?: Record<string, string | string[]> | URLSearchParams;
  signal?: AbortSignal;
} & (
  | {
      body?: FormData;
      json?: never;
    }
  | {
      body?: never;
      /**
       * Any value accepted by `JSON.stringify`
       */
      json?: unknown;
    }
);

export default interface IHttpClient {
  delete: <T>(url: string, config?: RequestOptions) => Promise<T>;
  get: <T>(url: string, config?: RequestOptions) => Promise<T>;
  patch: <T>(url: string, config?: RequestOptions) => Promise<T>;
  post: <T>(url: string, config?: RequestOptions) => Promise<T>;
  put: <T>(url: string, config?: RequestOptions) => Promise<T>;
}
