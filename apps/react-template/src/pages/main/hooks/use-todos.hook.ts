import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import todoService from '../../../services/todo/todo.service';

export default function useTodos() {
  const queryClient = useQueryClient();

  return useSuspenseQuery(
    {
      queryFn: ({ signal }) => todoService.list(signal),
      queryKey: [useTodos.queryKey],
    },
    queryClient,
  );
}

useTodos.queryKey = 'todo';
