import type { IHttpClient } from '@monorepo/shared';

import TodoRepository from './todo.repository';

describe('TodoRepository', () => {
  const mockHttpClient: IHttpClient = {
    delete: vi.fn(),
    get: vi.fn(),
    patch: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  };

  it('should call `httpClient.get`', async () => {
    // #region ARRANGE
    const todoRepository = new TodoRepository(mockHttpClient);
    // #endregion

    // #region ACT
    await todoRepository.list({});
    // #endregion

    // #region ASSERT
    expect(mockHttpClient.get).toBeCalled();
    // #endregion
  });
});
