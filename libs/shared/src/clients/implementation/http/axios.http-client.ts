import type { AxiosInstance, CreateAxiosDefaults } from 'axios';

import type { RequestOptions } from '../../abstract/http/http.client';

import axiosStatic from 'axios';
import { injectable, singleton } from 'tsyringe';
import urlcat from 'urlcat';

import BaseHttpClient from '../../abstract/http/http.client';

@singleton()
@injectable()
export default class AxiosHttpClient extends BaseHttpClient {
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
        signal,
      })
      .then((resp) => resp.data);
  }

  public override async get<T>(url: string, config: RequestOptions = {}): Promise<T> {
    const { headers = {}, searchParams = {}, signal } = config;

    headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    return this.axios
      .get<T>(urlcat(url, searchParams), {
        headers,
        signal,
      })
      .then((resp) => resp.data);
  }

  public override async patch<T>(url: string, config: RequestOptions = {}): Promise<T> {
    const { headers = {}, searchParams = {}, signal } = config;

    if ('body' in config && config.body) {
      headers['Content-Type'] = headers['Content-Type'] || 'multipart/form-data';

      return (
        await this.axios.patchForm(urlcat(url, searchParams), config.body, {
          headers,
          signal,
        })
      ).data;
    }

    headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    return (
      await this.axios.patch(urlcat(url, searchParams), 'json' in config && config.json ? config.json : undefined, {
        // NOTE: if 'Content-Type' header is provided, use it. If not, use default application/json
        headers,
        signal,
      })
    ).data;
  }

  public override async post<T>(url: string, config: RequestOptions = {}): Promise<T> {
    const { headers = {}, searchParams = {}, signal } = config;

    if ('body' in config && config.body) {
      headers['Content-Type'] = headers['Content-Type'] || 'multipart/form-data';

      return await this.axios.postForm(urlcat(url, searchParams), config.body, {
        headers,
        signal,
      });
    }

    headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    return (
      await this.axios.post(urlcat(url, searchParams), 'json' in config && config.json ? config.json : undefined, {
        headers,
        signal,
      })
    ).data;
  }

  public override async put<T>(url: string, config: RequestOptions = {}): Promise<T> {
    const { headers = {}, searchParams = {}, signal } = config;

    if ('body' in config && config.body) {
      headers['Content-Type'] = headers['Content-Type'] || 'multipart/form-data';

      return await this.axios.putForm(urlcat(url, searchParams), config.body, {
        headers,
        signal,
      });
    }

    headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    return (
      await this.axios.put(urlcat(url, searchParams), 'json' in config && config.json ? config.json : undefined, {
        headers,
        signal,
      })
    ).data;
  }
}
