import type { Except } from '@monorepo/shared';
import type { QueryClient, UseSuspenseQueryOptions } from '@tanstack/react-query';

import type { ListTodoRes } from '../vanilla/models/list.model';

import { useSuspenseQuery } from '@tanstack/react-query';

import vanillaTodoService from '../vanilla/todo.service';

const queryKeys = {
  useListTodo: 'todo',
};

const todoService = {
  useListTodo: Object.assign(
    (
      options: Except<UseSuspenseQueryOptions<ListTodoRes, Error, ListTodoRes, string[]>, 'queryFn' | 'queryKey'> = {},
      queryClient?: QueryClient,
    ) =>
      useSuspenseQuery(
        {
          queryFn: () => vanillaTodoService.list(),
          queryKey: [queryKeys.useListTodo],
          ...options,
        },
        queryClient,
      ),
    { queryKey: queryKeys.useListTodo },
  ),
};

export default todoService;
