import type { Mock } from 'vitest';

interface CustomMatchers<R = unknown> {
  toHaveBeenCalledWithNArguments: (n: number) => R;
  toHaveBeenCalledWithNthArgument: (arg: any, n: number) => R;
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

expect.extend({
  toHaveBeenCalledWithNArguments(received: Mock, expected: number) {
    const isCalled = received.mock.calls.some((callArgs) => this.equals(callArgs.length, expected));

    return {
      message: () =>
        `${this.utils.printReceived(received)} is never called with ${this.utils.printExpected(expected)} arguments`,
      pass: isCalled,
    };
  },
  toHaveBeenCalledWithNthArgument(received: Mock, expected: unknown, n: number) {
    const isCalled = received.mock.calls.some((callArgs) => this.equals(expected, callArgs[n]));

    return {
      message: () => `${received} is never called with ${expected} as its ${n}th argument`,
      pass: isCalled,
    };
  },
});
