import type { ListTodoReq, ListTodoRes } from '../models/list.model';

import { HttpClient } from '@monorepo/shared/clients';
import { inject, injectable } from 'tsyringe';
import urlcat from 'urlcat';

import AbstractTodoRepository from './todo.repository';

@injectable()
export default class TodoRepository extends AbstractTodoRepository {
  public constructor(@inject(HttpClient.token) private readonly httpClient: HttpClient) {
    super();
  }

  public override list(params: ListTodoReq): Promise<ListTodoRes> {
    return this.httpClient.get<ListTodoRes>(urlcat('https://jsonplaceholder.typicode.com/todos', params));
  }
}
