import type { ListTodoRes } from './models/list.model';

type ITodoService = {
  list: () => Promise<ListTodoRes>;
};

const vanillaTodoService: ITodoService = {
  list: () => fetch('https://jsonplaceholder.typicode.com/todos').then((resp) => resp.json() as unknown as ListTodoRes),
} as const;

export default vanillaTodoService;
