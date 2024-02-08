import { renderHook } from '@testing-library/react';

import usePrevious from './use-previous.hook';

describe('usePrevious', () => {
  it('should start with initial value', () => {
    // arrange
    const value = 5;
    const { result } = renderHook((initialProps) => usePrevious(initialProps), {
      initialProps: value,
    });

    // assert
    expect(result.current).toBe(value);
  });

  it('should return its previous value', () => {
    // arrange
    const { rerender, result } = renderHook((initialProps) => usePrevious(initialProps), {
      initialProps: 5,
    });

    // act
    rerender(10);

    // assert
    expect(result.current).toBe(5);
  });

  it('should change its value', () => {
    // arrange
    const { rerender, result } = renderHook((initialProps) => usePrevious(initialProps), {
      initialProps: 5,
    });

    // act
    rerender(10);
    rerender(15);

    // assert
    expect(result.current).toBe(10);
  });
});
