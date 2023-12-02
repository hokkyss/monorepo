// NOTE: this is abstract, no implementation should be provided
import type { ListTodoReq, ListTodoRes } from '../models/list.model';

export default abstract class TodoRepository {
  public static readonly token = Symbol.for('TodoRepository');

  public list(params: ListTodoReq): Promise<ListTodoRes>;
  public list(): Promise<ListTodoRes> {
    throw new Error('No implementation for "TodoRepository.list" is found!');
  }
}
