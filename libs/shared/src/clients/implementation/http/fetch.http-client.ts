import type { Observable } from 'rxjs';

import type { RequestOptions } from '../../abstract/http/http.client';

import { fromFetch } from 'rxjs/fetch';
import { injectable, singleton } from 'tsyringe';
import urlcat from 'urlcat';

import BaseHttpClient from '../../abstract/http/http.client';

export default class FetchHttpClient extends BaseHttpClient {
  public override delete<T>(url: string, config: RequestOptions = {}): Observable<T> {
    const { headers = {}, searchParams = {}, signal } = config;

    return fromFetch(urlcat(url, searchParams), {
      headers,
      method: 'DELETE',
      selector: (resp) => resp.json(),
      signal,
    });
  }

  public override get<T>(url: string, config: RequestOptions = {}): Observable<T> {
    const { headers = {}, searchParams = {}, signal } = config;

    return fromFetch(urlcat(url, searchParams), {
      headers,
      method: 'GET',
      selector: (resp) => resp.json(),
      signal,
    });
  }

  public override patch<T>(url: string, config: RequestOptions = {}): Observable<T> {
    const { body, headers = {}, json, searchParams = {}, signal } = config;

    if (body) {
      headers['Content-Type'] = headers['Content-Type'] || 'multipart/form-data';

      return fromFetch(urlcat(url, searchParams), {
        body,
        headers,
        method: 'PATCH',
        selector: (resp) => resp.json(),
        signal,
      });
    }

    headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    return fromFetch(urlcat(url, searchParams), {
      body: JSON.stringify(json),
      headers,
      method: 'PATCH',
      selector: (resp) => resp.json(),
      signal,
    });
  }

  public override post<T>(url: string, config: RequestOptions = {}): Observable<T> {
    const { body, headers = {}, json, searchParams = {}, signal } = config;

    if (body) {
      headers['Content-Type'] = headers['Content-Type'] || 'multipart/form-data';

      return fromFetch(urlcat(url, searchParams), {
        body,
        headers,
        method: 'POST',
        selector: (resp) => resp.json(),
        signal,
      });
    }

    headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    return fromFetch(urlcat(url, searchParams), {
      body: JSON.stringify(json),
      headers,
      method: 'POST',
      selector: (resp) => resp.json(),
      signal,
    });
  }

  public override put<T>(url: string, config: RequestOptions = {}): Observable<T> {
    const { body, headers = {}, json, searchParams = {}, signal } = config;

    if (body) {
      headers['Content-Type'] = headers['Content-Type'] || 'multipart/form-data';

      return fromFetch(urlcat(url, searchParams), {
        body,
        headers,
        method: 'PUT',
        selector: (resp) => resp.json(),
        signal,
      });
    }

    headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    return fromFetch(urlcat(url, searchParams), {
      body: JSON.stringify(json),
      headers,
      method: 'PUT',
      selector: (resp) => resp.json(),
      signal,
    });
  }
}

// FIXME: temporary workaround to fix rollup errors
singleton()(FetchHttpClient);
injectable()(FetchHttpClient);
