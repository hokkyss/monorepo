import 'reflect-metadata/lite';

import { HttpClient, IndexedDBClient, StorageClient } from '@monorepo/shared';
import { AbstractTodoRepository, AbstractTodoService, TodoRepository, TodoService } from '@monorepo/todo';
import { container } from 'tsyringe';

import AxiosHttpClient from './clients/http/axios.http-client';

container.register(HttpClient.token, { useFactory: () => new AxiosHttpClient() });
container.register(StorageClient.token, { useFactory: () => new IndexedDBClient('indexedDB') });
container.register(AbstractTodoRepository.token, { useClass: TodoRepository });
container.register(AbstractTodoService.token, { useClass: TodoService });
