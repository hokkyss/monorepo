import TodoRepository from './todo.repository';

describe('TodoRepository', () => {
  it('should define token', () => {
    expect(TodoRepository.token).toBeDefined();
  });
});
