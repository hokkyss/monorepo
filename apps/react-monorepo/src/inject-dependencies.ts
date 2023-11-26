import 'reflect-metadata';

import { HttpClient, StorageClient } from '@monorepo/shared/clients';
import AxiosHttpClient from '@monorepo/shared/clients/http/axios';
import IndexedDBClient from '@monorepo/shared/clients/storage/indexed-db';
import { container } from 'tsyringe';

container.register(HttpClient.token, { useFactory: () => new AxiosHttpClient() });
container.register(StorageClient.token, { useFactory: () => new IndexedDBClient('indexedDB') });
