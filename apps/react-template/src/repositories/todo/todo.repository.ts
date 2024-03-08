import type { ITodoRepository } from '@monorepo/todo';

import { TodoRepository } from '@monorepo/todo';

import httpClient from '../../clients/http/http.client';

const todoRepository: ITodoRepository = new TodoRepository(httpClient);

export default todoRepository;
