import type { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';

import type { Except } from '../types/shared.type';

import axiosStatic from 'axios';
import { injectable } from 'tsyringe';

import BaseHttpClient from '../clients/http/http.client';

@injectable()
export default class AxiosHttpClient extends BaseHttpClient {
  private axios: AxiosInstance;

  public constructor(config?: CreateAxiosDefaults) {
    super();
    this.axios = axiosStatic.create(config);
  }

  public override async delete<T>(
    url: string,
    config?: Except<AxiosRequestConfig<never>, 'data' | 'method' | 'url'>,
  ): Promise<T> {
    return this.axios
      .delete<T>(url, {
        ...config,
        headers: {
          ...config?.headers,
          'Content-Type': 'application/json',
        },
      })
      .then((resp) => resp.data);
  }

  public override async get<T>(
    url: string,
    config?: Except<AxiosRequestConfig<never>, 'data' | 'method' | 'url'>,
  ): Promise<T> {
    return this.axios
      .get<T>(url, {
        ...config,
        headers: {
          ...config?.headers,
          'Content-Type': 'application/json',
        },
      })
      .then((resp) => resp.data);
  }

  public override async patch<T>(
    url: string,
    data?: unknown,
    config?: Except<AxiosRequestConfig<never>, 'data' | 'method' | 'url'>,
  ): Promise<T> {
    if (data instanceof FormData) {
      delete config?.headers?.['Content-Type'];

      return (await this.axios.patchForm(url, data, config)).data;
    }

    return (
      await this.axios.patch(url, data, {
        ...config,
        // NOTE: if 'Content-Type' header is provided, use it. If not, use default application/json
        headers: {
          'Content-Type': 'application/json',
          ...config?.headers,
        },
      })
    ).data;
  }

  public override async post<T>(
    url: string,
    data?: unknown,
    config?: Except<AxiosRequestConfig<never>, 'data' | 'method' | 'url'>,
  ): Promise<T> {
    if (data instanceof FormData) {
      delete config?.headers?.['Content-Type'];

      return (await this.axios.postForm(url, data, config)).data;
    }

    return (
      await this.axios.post(url, data, {
        ...config,
        // NOTE: if 'Content-Type' header is provided, use it. If not, use default application/json
        headers: {
          'Content-Type': 'application/json',
          ...config?.headers,
        },
      })
    ).data;
  }

  public override async put<T>(
    url: string,
    data?: unknown,
    config?: Except<AxiosRequestConfig<never>, 'data' | 'method' | 'url'>,
  ): Promise<T> {
    if (data instanceof FormData) {
      delete config?.headers?.['Content-Type'];

      return (await this.axios.putForm(url, data, config)).data;
    }

    return (
      await this.axios.put(url, data, {
        ...config,
        // NOTE: if 'Content-Type' header is provided, use it. If not, use default application/json
        headers: {
          'Content-Type': 'application/json',
          ...config?.headers,
        },
      })
    ).data;
  }
}
