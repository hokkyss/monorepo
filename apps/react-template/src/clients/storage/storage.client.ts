import type { IStorageClient } from '@monorepo/shared';

import { IndexedDBClient } from '@monorepo/shared';

export const storageClient: IStorageClient = new IndexedDBClient('react-template');
