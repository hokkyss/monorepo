import type { Except } from '../types/shared.type';

import { injectable } from 'tsyringe';

import BaseHttpClient from '../clients/http/http.client';

@injectable()
export default class FetchHttpClient extends BaseHttpClient {
  public override async delete<T>(url: string, config: Except<RequestInit, 'body' | 'method'>): Promise<T> {
    return fetch(url, {
      ...config,
      method: 'DELETE',
    }).then((resp) => resp.json());
  }

  public override async get<T>(url: string, config: Except<RequestInit, 'body' | 'method'>): Promise<T> {
    return fetch(url, {
      method: 'GET',
      ...config,
    }).then((resp) => resp.json());
  }

  public override async patch<T>(
    url: string,
    data?: FormData | object | string,
    config?: Except<RequestInit, 'body' | 'method'>,
  ): Promise<T> {
    return fetch(url, {
      body: typeof data === 'string' || data instanceof FormData ? data : JSON.stringify(data),
      method: 'PATCH',
      ...config,
    }).then((resp) => resp.json());
  }

  public override async post<T>(
    url: string,
    data?: FormData | object | string,
    config?: Except<RequestInit, 'body' | 'method'>,
  ): Promise<T> {
    return fetch(url, {
      body: typeof data === 'string' || data instanceof FormData ? data : JSON.stringify(data),
      method: 'POST',
      ...config,
    }).then((resp) => resp.json());
  }

  public override async put<T>(
    url: string,
    data?: FormData | object | string,
    config?: Except<RequestInit, 'body' | 'method'>,
  ): Promise<T> {
    return fetch(url, {
      body: typeof data === 'string' || data instanceof FormData ? data : JSON.stringify(data),
      method: 'POST',
      ...config,
    }).then((resp) => resp.json());
  }
}
