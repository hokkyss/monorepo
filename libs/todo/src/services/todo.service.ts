import type { ListTodoRes } from '../models/list.model';
import type TodoRepository from '../repositories/todo.repository.interface';

import type ITodoService from './todo.service.interface';

export default class TodoService implements ITodoService {
  public constructor(private readonly todoRepository: TodoRepository) {}

  public list(signal?: AbortSignal): Promise<ListTodoRes> {
    return this.todoRepository.list({}, signal);
  }
}
