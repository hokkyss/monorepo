import type { IHttpClient, IRequestOptions } from '@monorepo/shared';
import type { AxiosInstance, CreateAxiosDefaults } from 'axios';

import axiosStatic from 'axios';
import urlcat from 'urlcat';

export default class AxiosHttpClient implements IHttpClient {
  private axios: AxiosInstance;

  public constructor(config?: CreateAxiosDefaults) {
    this.axios = axiosStatic.create(config);
  }

  public async delete<T>(url: string, config: IRequestOptions = {}): Promise<T> {
    const { headers = {}, searchParams = {}, signal } = config;

    headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    return this.axios
      .delete<T>(urlcat(url, searchParams), {
        headers,
        ...(signal ? { signal } : {}),
      })
      .then((resp) => resp.data);
  }

  public async get<T>(url: string, config: IRequestOptions = {}): Promise<T> {
    const { headers = {}, searchParams = {}, signal } = config;

    headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    return this.axios
      .get<T>(urlcat(url, searchParams), {
        headers,
        ...(signal ? { signal } : {}),
      })
      .then((resp) => resp.data);
  }

  public async patch<T>(url: string, config: IRequestOptions = {}): Promise<T> {
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

  public async post<T>(url: string, config: IRequestOptions = {}): Promise<T> {
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

  public async put<T>(url: string, config: IRequestOptions = {}): Promise<T> {
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
