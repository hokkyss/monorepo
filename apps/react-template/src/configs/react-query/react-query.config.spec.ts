import { QueryClient } from '@tanstack/react-query';

import queryClient from './react-query.config';

describe('queryClient', () => {
  it('should be instanceof `QueryClient`', () => {
    expect(queryClient).toBeInstanceOf(QueryClient);
  });
});
