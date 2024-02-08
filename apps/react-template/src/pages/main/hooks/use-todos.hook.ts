import { TodoService } from '@monorepo/todo';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { container } from 'tsyringe';

export default function useTodos() {
  const queryClient = useQueryClient();
  const [todoService] = useState(() => container.resolve<TodoService>(TodoService.token));

  return useSuspenseQuery(
    {
      queryFn: ({ signal }) => todoService.list(signal),
      queryKey: [useTodos.queryKey],
    },
    queryClient,
  );
}

useTodos.queryKey = 'todo';
