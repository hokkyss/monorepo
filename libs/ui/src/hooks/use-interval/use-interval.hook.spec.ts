import { renderHook } from '@testing-library/react';

import useInterval from './use-interval.hook';

const globalSetInterval = vi.spyOn(global, 'setInterval');

describe('useInterval', () => {
  it('should call setInterval without arguments to callback', () => {
    // arrange
    const mockFunction = vi.fn();
    const milliseconds = 500;

    renderHook(() => useInterval(mockFunction, milliseconds));

    // assert
    expect(globalSetInterval).toHaveBeenCalledWith(mockFunction, milliseconds);
  });

  it('should call setInterval with arguments to callback', () => {
    // arrange
    const mockFunction = vi.fn();
    const milliseconds = 500;
    const args = [5, 10, '15'];

    renderHook(() => useInterval(mockFunction, milliseconds, ...args));

    // assert
    expect(globalSetInterval).toHaveBeenCalledWith(mockFunction, milliseconds, ...args);
  });
});
