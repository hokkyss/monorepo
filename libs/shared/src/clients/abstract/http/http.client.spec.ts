import HttpClient from './http.client';

describe('HttpClient', () => {
  it('should include injection token', () => {
    expect(HttpClient.token).toBeTruthy();
  });
});
