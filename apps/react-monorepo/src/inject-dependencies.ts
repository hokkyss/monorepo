import { HttpClient, StorageClient } from '@monorepo/shared/clients';
import AxiosHttpClient from '@monorepo/shared/clients/http/axios';
import LocalStorageClient from '@monorepo/shared/clients/storage/local';
import { container } from 'tsyringe';

container.register(HttpClient.token, { useFactory: () => new AxiosHttpClient() });
container.register(StorageClient.token, LocalStorageClient);
