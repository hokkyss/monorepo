import type { IHttpClient } from '@monorepo/shared';

import AxiosHttpClient from './axios/axios.http-client';

const httpClient: IHttpClient = new AxiosHttpClient({});

export default httpClient;
