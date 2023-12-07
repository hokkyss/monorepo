import type { Except } from '@monorepo/shared/types';
import type { QueryClient, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

import type { ListTodoRes } from '../../vanilla/models/list.model';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { container } from 'tsyringe';

import TodoService from '../../vanilla/services/todo.service';

type UseTodosProps = Except<UseQueryOptions<ListTodoRes, Error, ListTodoRes, string[]>, 'queryFn' | 'queryKey'> & {
  queryClient?: QueryClient;
};

export default function useTodos(props: UseTodosProps): UseQueryResult<ListTodoRes, Error> {
  const { queryClient, ...options } = props;

  const [todoService] = useState(() => container.resolve<TodoService>(TodoService.token));

  return useQuery(
    {
      queryFn: ({ signal }) => todoService.list(signal),
      queryKey: [useTodos.queryKey],
      ...options,
    },
    queryClient,
  );
}

useTodos.queryKey = 'todos';
