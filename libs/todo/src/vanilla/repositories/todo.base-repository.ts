import type { ListTodoReq, ListTodoRes } from '../models/list.model';

import { HttpClient } from '@monorepo/shared/clients/abstract';
import { inject, injectable } from 'tsyringe';

import AbstractTodoRepository from './todo.repository';

@injectable()
export default class TodoRepository extends AbstractTodoRepository {
  public constructor(@inject(HttpClient.token) private readonly httpClient: HttpClient) {
    super();
  }

  public override list(params: ListTodoReq, signal?: AbortSignal): Promise<ListTodoRes> {
    return this.httpClient.get<ListTodoRes>('https://jsonplaceholder.typicode.com/todos', {
      searchParams: params,
      signal,
    });
  }
}
