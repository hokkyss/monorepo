// NOTE: this file provides the main interfaces an HttpClient must have.
/* eslint-disable @typescript-eslint/no-unused-vars */
export default abstract class HttpClient {
  public static readonly token = Symbol.for(this.name);

  public delete<T>(url: string, config?: object): Promise<T>;
  public delete<T>(): Promise<T> {
    throw new Error(`No implementation of HttpClient.${this.delete.name} available`);
  }

  public get<T>(url: string, config?: object): Promise<T>;
  public get<T>(): Promise<T> {
    throw new Error(`No implementation of HttpClient.${this.get.name} available`);
  }

  public patch<T>(url: string, data?: object, config?: object): Promise<T>;
  public patch<T>(): Promise<T> {
    throw new Error(`No implementation of HttpClient.${this.patch.name} available`);
  }

  public post<T>(url: string, data?: object, config?: object): Promise<T>;
  public post<T>(): Promise<T> {
    throw new Error(`No implementation of HttpClient.${this.post.name} available`);
  }

  public put<T>(url: string, data?: object, config?: object): Promise<T>;
  public put<T>(): Promise<T> {
    throw new Error(`No implementation of HttpClient.${this.put.name} available`);
  }
}