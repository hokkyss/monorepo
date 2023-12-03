import 'vitest';

interface CustomMatchers<R = unknown> {
  toBeCalledWithNArguments: (n: number) => R;
  toBeCalledWithNthArgument: (arg: any, n: number) => R;
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
