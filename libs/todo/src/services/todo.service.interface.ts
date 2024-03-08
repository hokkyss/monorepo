import type { ListTodoRes } from '../models/list.model';

export default interface ITodoService {
  list: (signal?: AbortSignal) => Promise<ListTodoRes>;
}
