import type { Except } from '@monorepo/shared/types';
import type { QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query';

import type { ListTodoRes } from '../../vanilla/models/list.model';

import { useMergeRef } from '@monorepo/shared/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { container } from 'tsyringe';

import TodoService from '../../vanilla/services/todo.service';

import useTodos from './use-todos.hook';

type UseSuspenseTodosProps = Except<
  UseSuspenseQueryOptions<ListTodoRes, Error, ListTodoRes, string[]>,
  'queryFn' | 'queryKey'
> & {
  queryClient?: QueryClient;
};

export default function useSuspenseTodos(props: UseSuspenseTodosProps): UseSuspenseQueryResult<ListTodoRes, Error> {
  const { queryClient, ...options } = props;

  useMergeRef();
  const [todoService] = useState(() => container.resolve<TodoService>(TodoService.token));

  return useSuspenseQuery(
    {
      queryFn: ({ signal }) => todoService.list(signal),
      queryKey: [useTodos.queryKey],
      ...options,
    },
    queryClient,
  );
}

useSuspenseTodos.queryKey = useTodos.queryKey;
