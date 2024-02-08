import type { AxiosInstance, CreateAxiosDefaults } from 'axios';
import type { Observable } from 'rxjs';

import type { RequestOptions } from '../../abstract/http/http.client';

import axiosStatic from 'axios';
import { defer, map } from 'rxjs';
import { injectable, singleton } from 'tsyringe';
import urlcat from 'urlcat';

import BaseHttpClient from '../../abstract/http/http.client';

export default class AxiosHttpClient extends BaseHttpClient {
  private axios: AxiosInstance;

  public constructor(config?: CreateAxiosDefaults) {
    super();
    this.axios = axiosStatic.create(config);
  }

  public override delete<T>(url: string, config: RequestOptions = {}): Observable<T> {
    const { headers = {}, searchParams = {}, signal } = config;

    headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    return defer(() =>
      this.axios.delete<T>(urlcat(url, searchParams), {
        headers,
        ...(signal ? { signal } : {}),
      }),
    ).pipe(map((resp) => resp.data));
  }

  public override get<T>(url: string, config: RequestOptions = {}): Observable<T> {
    const { headers = {}, searchParams = {}, signal } = config;

    headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    return defer(() =>
      this.axios.get<T>(urlcat(url, searchParams), {
        headers,
        ...(signal ? { signal } : {}),
      }),
    ).pipe(map((resp) => resp.data));
  }

  public override patch<T>(url: string, config: RequestOptions = {}): Observable<T> {
    const { body, headers = {}, json, searchParams = {}, signal } = config;

    if (body) {
      headers['Content-Type'] = headers['Content-Type'] || 'multipart/form-data';

      return defer(() =>
        this.axios.patchForm<T>(urlcat(url, searchParams), body, {
          headers,
          ...(signal ? { signal } : {}),
        }),
      ).pipe(map((resp) => resp.data));
    }

    headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    return defer(() =>
      this.axios.patch<T>(urlcat(url, searchParams), json, {
        // NOTE: if 'Content-Type' header is provided, use it. If not, use default application/json
        headers,
        ...(signal ? { signal } : {}),
      }),
    ).pipe(map((resp) => resp.data));
  }

  public override post<T>(url: string, config: RequestOptions = {}): Observable<T> {
    const { body, headers = {}, json, searchParams = {}, signal } = config;

    if (body) {
      headers['Content-Type'] = headers['Content-Type'] || 'multipart/form-data';

      return defer(() =>
        this.axios.postForm<T>(urlcat(url, searchParams), body, {
          headers,
          ...(signal ? { signal } : {}),
        }),
      ).pipe(map((resp) => resp.data));
    }

    headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    return defer(() =>
      this.axios.post<T>(urlcat(url, searchParams), json, {
        headers,
        ...(signal ? { signal } : {}),
      }),
    ).pipe(map((resp) => resp.data));
  }

  public override put<T>(url: string, config: RequestOptions = {}): Observable<T> {
    const { body, headers = {}, json, searchParams = {}, signal } = config;

    if (body) {
      headers['Content-Type'] = headers['Content-Type'] || 'multipart/form-data';

      return defer(() =>
        this.axios.putForm<T>(urlcat(url, searchParams), body, {
          headers,
          ...(signal ? { signal } : {}),
        }),
      ).pipe(map((resp) => resp.data));
    }

    headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    return defer(() =>
      this.axios.put<T>(urlcat(url, searchParams), json, {
        headers,
        ...(signal ? { signal } : {}),
      }),
    ).pipe(map((resp) => resp.data));
  }
}

// FIXME: temporary workaround to fix rollup errors
singleton()(AxiosHttpClient);
injectable()(AxiosHttpClient);
