// NOTE: this is abstract, no implementation should be provided
import type { ListTodoReq, ListTodoRes } from '../models/list.model';

export default interface ITodoRepository {
  list: (params: ListTodoReq, signal?: AbortSignal) => Promise<ListTodoRes>;
}
