import type { IStorageClient } from '@monorepo/shared';

import { IndexedDBClient } from '@monorepo/shared';

const storageClient: IStorageClient = new IndexedDBClient('react-template');

export default storageClient;
