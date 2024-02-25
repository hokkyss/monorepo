import type { RequestOptions } from '@monorepo/shared';
import type { AxiosInstance, CreateAxiosDefaults } from 'axios';

import { HttpClient } from '@monorepo/shared';
import axiosStatic from 'axios';
import { injectable, singleton } from 'tsyringe';
import urlcat from 'urlcat';

export default class AxiosHttpClient extends HttpClient {
  private axios: AxiosInstance;

  public constructor(config?: CreateAxiosDefaults) {
    super();
    this.axios = axiosStatic.create(config);
  }

  public override async delete<T>(url: string, config: RequestOptions = {}): Promise<T> {
    const { headers = {}, searchParams = {}, signal } = config;

    headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    return this.axios
      .delete<T>(urlcat(url, searchParams), {
        headers,
        ...(signal ? { signal } : {}),
      })
      .then((resp) => resp.data);
  }

  public override async get<T>(url: string, config: RequestOptions = {}): Promise<T> {
    const { headers = {}, searchParams = {}, signal } = config;

    headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    return this.axios
      .get<T>(urlcat(url, searchParams), {
        headers,
        ...(signal ? { signal } : {}),
      })
      .then((resp) => resp.data);
  }

  public override async patch<T>(url: string, config: RequestOptions = {}): Promise<T> {
    const { body, headers = {}, json, searchParams = {}, signal } = config;

    if (body) {
      headers['Content-Type'] = headers['Content-Type'] || 'multipart/form-data';

      return this.axios
        .patchForm<T>(urlcat(url, searchParams), body, {
          headers,
          ...(signal ? { signal } : {}),
        })
        .then((resp) => resp.data);
    }

    headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    return this.axios
      .patch<T>(urlcat(url, searchParams), json, {
        // NOTE: if 'Content-Type' header is provided, use it. If not, use default application/json
        headers,
        ...(signal ? { signal } : {}),
      })
      .then((resp) => resp.data);
  }

  public override async post<T>(url: string, config: RequestOptions = {}): Promise<T> {
    const { body, headers = {}, json, searchParams = {}, signal } = config;

    if (body) {
      headers['Content-Type'] = headers['Content-Type'] || 'multipart/form-data';

      return this.axios
        .postForm<T>(urlcat(url, searchParams), body, {
          headers,
          ...(signal ? { signal } : {}),
        })
        .then((resp) => resp.data);
    }

    headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    return this.axios
      .post<T>(urlcat(url, searchParams), json, {
        headers,
        ...(signal ? { signal } : {}),
      })
      .then((resp) => resp.data);
  }

  public override async put<T>(url: string, config: RequestOptions = {}): Promise<T> {
    const { body, headers = {}, json, searchParams = {}, signal } = config;

    if (body) {
      headers['Content-Type'] = headers['Content-Type'] || 'multipart/form-data';

      return this.axios
        .putForm<T>(urlcat(url, searchParams), body, {
          headers,
          ...(signal ? { signal } : {}),
        })
        .then((resp) => resp.data);
    }

    headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    return this.axios
      .put<T>(urlcat(url, searchParams), json, {
        headers,
        ...(signal ? { signal } : {}),
      })
      .then((resp) => resp.data);
  }
}

// FIXME: temporary workaround to fix rollup errors
singleton()(AxiosHttpClient);
injectable()(AxiosHttpClient);
