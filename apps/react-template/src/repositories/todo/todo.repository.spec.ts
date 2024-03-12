import type { ITodoRepository } from '@monorepo/todo';

import todoRepository from './todo.repository';

describe('TodoRepository', () => {
  it('should implement `ITodoRepository`', () => {
    expectTypeOf(todoRepository).toEqualTypeOf<ITodoRepository>();
  });
});
