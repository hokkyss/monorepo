import { useBoolean } from '@monorepo/shared/hooks';
import { useSuspenseTodos } from '@monorepo/todo/react';

import queryClient from '../../configs/react-query/react-query.config';

export default function MainPage() {
  const [val, { toggle }] = useBoolean();
  const todos = useSuspenseTodos({ queryClient: queryClient });

  return (
    <div>
      <h1>Show TODOs: {val.toString()}</h1>
      <button onClick={toggle}>Toggle</button>
      {val && (
        <ol>
          {todos.data.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ol>
      )}
    </div>
  );
}
