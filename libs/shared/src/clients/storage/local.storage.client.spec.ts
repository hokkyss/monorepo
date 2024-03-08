import mockLocalStorage from '../../../tests/mocks/local-storage.mock';

import LocalStorageClient from './local.storage.client';

describe('LocalStorageClient', () => {
  const client = new LocalStorageClient();

  it('should call `localStorage` getItem', () => {
    const mockGetItem = vi.spyOn(mockLocalStorage, 'getItem');

    client.getItem({ key: 'key' });

    expect(mockGetItem).toBeCalledWith('key');
  });
});
