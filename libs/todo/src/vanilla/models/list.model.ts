export type Todo = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};

export type ListTodoReq = {};

export type ListTodoRes = Todo[];
