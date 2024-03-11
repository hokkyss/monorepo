import type { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function ReactQueryWrapper(props: PropsWithChildren) {
  const { children } = props;

  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            mutations: {
              retry: 0,
            },
            queries: {
              retry: 0,
            },
          },
        })
      }
    >
      {children}
    </QueryClientProvider>
  );
}
