import type IHttpClient from './http.client.interface';
import type { RequestOptions } from './http.client.interface';

import urlcat from 'urlcat';

export default class FetchHttpClient implements IHttpClient {
  public async delete<T>(url: string, config: RequestOptions = {}): Promise<T> {
    const { headers = {}, searchParams = {}, signal } = config;

    return fetch(urlcat(url, searchParams), {
      headers,
      method: 'DELETE',
      ...(signal ? { signal } : {}),
    }).then((resp) => resp.json());
  }

  public async get<T>(url: string, config: RequestOptions = {}): Promise<T> {
    const { headers = {}, searchParams = {}, signal } = config;

    return fetch(urlcat(url, searchParams), {
      headers,
      method: 'GET',
      ...(signal ? { signal } : {}),
    }).then((resp) => resp.json());
  }

  public async patch<T>(url: string, config: RequestOptions = {}): Promise<T> {
    const { body, headers = {}, json, searchParams = {}, signal } = config;

    if (body) {
      headers['Content-Type'] = headers['Content-Type'] || 'multipart/form-data';

      return fetch(urlcat(url, searchParams), {
        body,
        headers,
        method: 'PATCH',

        ...(signal ? { signal } : {}),
      }).then((resp) => resp.json());
    }

    headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    return fetch(urlcat(url, searchParams), {
      body: JSON.stringify(json),
      headers,
      method: 'PATCH',
      ...(signal ? { signal } : {}),
    }).then((resp) => resp.json());
  }

  public async post<T>(url: string, config: RequestOptions = {}): Promise<T> {
    const { body, headers = {}, json, searchParams = {}, signal } = config;

    if (body) {
      headers['Content-Type'] = headers['Content-Type'] || 'multipart/form-data';

      return fetch(urlcat(url, searchParams), {
        body,
        headers,
        method: 'POST',

        ...(signal ? { signal } : {}),
      }).then((resp) => resp.json());
    }

    headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    return fetch(urlcat(url, searchParams), {
      body: JSON.stringify(json),
      headers,
      method: 'POST',
      ...(signal ? { signal } : {}),
    }).then((resp) => resp.json());
  }

  public async put<T>(url: string, config: RequestOptions = {}): Promise<T> {
    const { body, headers = {}, json, searchParams = {}, signal } = config;

    if (body) {
      headers['Content-Type'] = headers['Content-Type'] || 'multipart/form-data';

      return fetch(urlcat(url, searchParams), {
        body,
        headers,
        method: 'PUT',

        ...(signal ? { signal } : {}),
      }).then((resp) => resp.json());
    }

    headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    return fetch(urlcat(url, searchParams), {
      body: JSON.stringify(json),
      headers,
      method: 'PUT',
      ...(signal ? { signal } : {}),
    }).then((resp) => resp.json());
  }
}
