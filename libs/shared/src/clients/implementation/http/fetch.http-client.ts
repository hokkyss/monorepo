import type { RequestOptions } from '../../abstract/http/http.client';

import { injectable, singleton } from 'tsyringe';
import urlcat from 'urlcat';

import BaseHttpClient from '../../abstract/http/http.client';

@injectable()
@singleton()
export default class FetchHttpClient extends BaseHttpClient {
  public override async delete<T>(url: string, config: RequestOptions = {}): Promise<T> {
    const { headers = {}, searchParams = {}, signal } = config;

    return fetch(urlcat(url, searchParams), {
      headers,
      method: 'DELETE',
      ...(signal ? { signal } : {}),
    }).then((resp) => resp.json());
  }

  public override async get<T>(url: string, config: RequestOptions = {}): Promise<T> {
    const { headers = {}, searchParams = {}, signal } = config;

    return fetch(urlcat(url, searchParams), {
      headers,
      method: 'GET',
      ...(signal ? { signal } : {}),
    }).then((resp) => resp.json());
  }

  public override async patch<T>(url: string, config: RequestOptions = {}): Promise<T> {
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

  public override async post<T>(url: string, config: RequestOptions = {}): Promise<T> {
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

  public override async put<T>(url: string, config: RequestOptions = {}): Promise<T> {
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
