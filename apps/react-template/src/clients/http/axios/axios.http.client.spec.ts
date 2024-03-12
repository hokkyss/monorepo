import type { IHttpClient } from '@monorepo/shared';

import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';

import AxiosHttpClient from './axios.http.client';

const server = setupServer(
  http.get('*', () => HttpResponse.json({ method: 'GET' }, { status: 200 })),
  http.post('*', () => HttpResponse.json({ method: 'POST' }, { status: 200 })),
  http.put('*', () => HttpResponse.json({ method: 'PUT' }, { status: 200 })),
  http.patch('*', () => HttpResponse.json({ method: 'PATCH' }, { status: 200 })),
  http.delete('*', () => HttpResponse.json({ method: 'DELETE' }, { status: 200 })),
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

// NOTE: all tests are skipped due to happy-dom problems with msw and vitest
describe('AxiosHttpClient', () => {
  const axiosClient = new AxiosHttpClient();

  it('should implement `IHttpClient`', () => {
    expectTypeOf(axiosClient).toMatchTypeOf<IHttpClient>();
  });

  it.skip('should call axios with correct response', async () => {
    const response = await axiosClient.get('https://example.com');

    expect(response).toEqual({ method: 'GET' });
  });

  it.skip('should call axios with correct response', async () => {
    const response = await axiosClient.post('https://example.com');

    expect(response).toEqual({ method: 'POST' });
  });

  it.skip('should call axios with correct response', async () => {
    const response = await axiosClient.patch('https://example.com');

    expect(response).toEqual({ method: 'PATCH' });
  });

  it.skip('should call axios with correct response', async () => {
    const response = await axiosClient.put('https://example.com');

    expect(response).toEqual({ method: 'PUT' });
  });

  it.skip('should call axios with correct response', async () => {
    const response = await axiosClient.delete('https://example.com');

    expect(response).toEqual({ method: 'DELETE' });
  });
});
