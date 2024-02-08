import 'reflect-metadata/lite';

import { HttpClient } from '@monorepo/shared/clients/abstract/http';
import { StorageClient } from '@monorepo/shared/clients/abstract/storage';
import AxiosHttpClient from '@monorepo/shared/clients/implementation/http/axios';
import IndexedDBClient from '@monorepo/shared/clients/implementation/storage/indexed-db';
import { AbstractTodoRepository, AbstractTodoService, TodoRepository, TodoService } from '@monorepo/todo';
import { container } from 'tsyringe';

container.register(HttpClient.token, { useFactory: () => new AxiosHttpClient() });
container.register(StorageClient.token, { useFactory: () => new IndexedDBClient('indexedDB') });
container.register(AbstractTodoRepository.token, { useClass: TodoRepository });
container.register(AbstractTodoService.token, { useClass: TodoService });
