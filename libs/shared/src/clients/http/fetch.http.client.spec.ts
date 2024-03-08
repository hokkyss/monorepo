import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';

import FetchHttpClient from './fetch.http.client';

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

describe('FetchHttpClient', () => {
  const fetchClient = new FetchHttpClient();

  it('should call fetch with GET method', async () => {
    const response = await fetchClient.get('https://example.com');

    expect(response).toEqual({ method: 'GET' });
  });

  it('should call fetch with POST method', async () => {
    const response = await fetchClient.post('https://example.com');

    expect(response).toEqual({ method: 'POST' });
  });

  it('should call fetch with PATCH method', async () => {
    const response = await fetchClient.patch('https://example.com');

    expect(response).toEqual({ method: 'PATCH' });
  });

  it('should call fetch with PUT method', async () => {
    const response = await fetchClient.put('https://example.com');

    expect(response).toEqual({ method: 'PUT' });
  });

  it('should call fetch with DELETE method', async () => {
    const response = await fetchClient.delete('https://example.com');

    expect(response).toEqual({ method: 'DELETE' });
  });
});
