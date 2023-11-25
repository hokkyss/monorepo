import { container } from 'tsyringe';

import BaseTodoRepository from './repositories/todo.base-repository';
import TodoRepository from './repositories/todo.repository';
import BaseTodoService from './services/todo.base-service';
import TodoService from './services/todo.service';

container.register(TodoRepository.token, BaseTodoRepository);
container.register(TodoService.token, BaseTodoService);
