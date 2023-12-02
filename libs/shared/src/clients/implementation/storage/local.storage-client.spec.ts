import mockLocalStorage from '../../../../tests/mocks/local-storage.mock';

import LocalStorageClient from './local.storage-client';

describe('LocalStorageClient', () => {
  const client = new LocalStorageClient();

  it('should call `localStorage` getItem', () => {
    client.getItem({ key: 'key' });

    expect(mockLocalStorage.getItem).toBeCalledWith('key');
  });
});
