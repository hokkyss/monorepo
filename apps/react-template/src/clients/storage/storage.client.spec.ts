import type { IStorageClient } from '@monorepo/shared';

import storageClient from './storage.client';

describe('storageClient', () => {
  it('should implements `IStorageClient`', () => {
    expectTypeOf(storageClient).toEqualTypeOf<IStorageClient>();
  });
});
