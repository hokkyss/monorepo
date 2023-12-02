import StorageClient from './storage.client';

describe('StorageClient', () => {
  it('should include injection token', () => {
    expect(StorageClient.token).toBeTruthy();
  });
});
