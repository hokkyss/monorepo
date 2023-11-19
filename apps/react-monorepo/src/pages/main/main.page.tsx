import { useBoolean } from '@monorepo/shared/react';
import { todoService } from '@monorepo/todo/react';

import queryClient from '../../configs/react-query/react-query.config';

export default function MainPage() {
  const [val, { toggle }] = useBoolean();
  const todos = todoService.useListTodo({}, queryClient);

  return (
    <div>
      <h1>Welcome. Toggled: {val.toString()}</h1>
      <button onClick={toggle}>Toggle</button>
      <ol>
        {todos.data.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ol>
    </div>
  );
}
