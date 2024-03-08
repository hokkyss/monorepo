import type { ITodoService } from '@monorepo/todo';

import { TodoService } from '@monorepo/todo';

import todoRepository from '../../repositories/todo/todo.repository';

const todoService: ITodoService = new TodoService(todoRepository);

export default todoService;
