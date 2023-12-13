import 'reflect-metadata';

import { HttpClient, StorageClient } from '@monorepo/shared/clients';
import AxiosHttpClient from '@monorepo/shared/clients/http/axios';
import IndexedDBClient from '@monorepo/shared/clients/storage/indexed-db';
import { AbstractTodoRepository, AbstractTodoService, TodoRepository, TodoService } from '@monorepo/todo/vanilla';
import { container } from 'tsyringe';

container.register(HttpClient.token, { useFactory: () => new AxiosHttpClient() });
container.register(StorageClient.token, { useFactory: () => new IndexedDBClient('indexedDB') });
container.register(AbstractTodoRepository.token, { useClass: TodoRepository });
container.register(AbstractTodoService.token, { useClass: TodoService });
