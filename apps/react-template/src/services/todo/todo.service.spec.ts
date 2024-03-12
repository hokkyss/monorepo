import type { ITodoService } from '@monorepo/todo';

import todoService from './todo.service';

describe('TodoService', () => {
  it('should implement `ITodoService`', () => {
    expectTypeOf(todoService).toEqualTypeOf<ITodoService>();
  });
});
