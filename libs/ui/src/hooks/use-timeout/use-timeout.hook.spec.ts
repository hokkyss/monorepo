import { renderHook } from '@testing-library/react';

import useTimeout from './use-timeout.hook';

const globalSetTimeout = vi.spyOn(global, 'setTimeout');

describe('useTimeout', () => {
  it('should call setTimeout without arguments to callback', () => {
    const mockFunction = vi.fn();
    const milliseconds = 500;

    renderHook(() => useTimeout(mockFunction, milliseconds));

    expect(globalSetTimeout).toHaveBeenCalledWith(mockFunction, milliseconds);
  });

  it('should call setTimeout with arguments to callback', () => {
    const mockFunction = vi.fn();
    const milliseconds = 500;
    const args = [5, 10, '15'];

    renderHook(() => useTimeout(mockFunction, milliseconds, ...args));

    expect(globalSetTimeout).toHaveBeenCalledWith(mockFunction, milliseconds, ...args);
  });
});
