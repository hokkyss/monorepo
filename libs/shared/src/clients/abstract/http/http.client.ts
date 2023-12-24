import type { Observable } from 'rxjs';

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

// NOTE: this file provides the main interfaces an HttpClient must have.
/* eslint-disable @typescript-eslint/no-unused-vars */
export default abstract class HttpClient {
  public static readonly token = Symbol.for(this.name);

  public abstract delete<T>(url: string, config?: RequestOptions): Observable<T>;
  public abstract get<T>(url: string, config?: RequestOptions): Observable<T>;
  public abstract patch<T>(url: string, config?: RequestOptions): Observable<T>;
  public abstract post<T>(url: string, config?: RequestOptions): Observable<T>;
  public abstract put<T>(url: string, config?: RequestOptions): Observable<T>;
}
