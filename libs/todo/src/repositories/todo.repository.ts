import type { IHttpClient } from '@monorepo/shared';

import type { ListTodoReq, ListTodoRes } from '../models/list.model';

import type ITodoRepository from './todo.repository.interface';

export default class TodoRepository implements ITodoRepository {
  public constructor(private readonly httpClient: IHttpClient) {}

  public list(params: ListTodoReq, signal?: AbortSignal): Promise<ListTodoRes> {
    return this.httpClient.get<ListTodoRes>('https://jsonplaceholder.typicode.com/todos', {
      searchParams: params,
      ...(signal ? { signal } : {}),
    });
  }
}
