import type { ListTodoRes } from '../models/list.model';

export default abstract class TodoService {
  public static readonly token = Symbol.for('TodoService');

  public list(signal?: AbortSignal): Promise<ListTodoRes> {
    throw new Error(`No implementation for "TodoService.list" is found!`);
  }
}
