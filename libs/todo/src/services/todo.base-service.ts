import type { ListTodoRes } from '../models/list.model';

import { inject, injectable } from 'tsyringe';

import TodoRepository from '../repositories/todo.repository';

import AbstractTodoService from './todo.service';

@injectable()
export default class TodoService extends AbstractTodoService {
  public constructor(@inject(TodoRepository.token) private readonly todoRepository: TodoRepository) {
    super();
  }

  public override list(signal?: AbortSignal): Promise<ListTodoRes> {
    return this.todoRepository.list({}, signal);
  }
}
