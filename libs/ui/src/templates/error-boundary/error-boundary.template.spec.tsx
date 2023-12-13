import type { FunctionComponent } from 'react';

import { render } from '@testing-library/react';

import ErrorBoundary from './error-boundary.template';

describe('ErrorBoundary', () => {
  it('should not render fallback element', () => {
    const onError = vi.fn();

    const screen = render(
      <ErrorBoundary fallback={<div data-testid="fallback" />} onError={onError}>
        <div data-testid="children" />
      </ErrorBoundary>,
    );

    expect(screen.queryByTestId('children')).toBeTruthy();
    expect(screen.queryByTestId('fallback')).toBeNull();
  });

  it('should not call onError if no error was thrown', () => {
    const onError = vi.fn();

    render(
      <ErrorBoundary fallback={<div data-testid="fallback" />} onError={onError}>
        <div data-testid="children" />
      </ErrorBoundary>,
    );

    expect(onError).not.toBeCalled();
  });

  it('should render fallback element if an error was thrown', (ctx) => {
    const onError = vi.fn();
    const Component: FunctionComponent = () => {
      throw new Error(`error on ${ctx.task.name}`);
    };

    const screen = render(
      <ErrorBoundary fallback={<div data-testid="fallback" />} onError={onError}>
        <div data-testid="children">
          <Component />
        </div>
      </ErrorBoundary>,
    );

    expect(screen.queryByTestId('fallback')).toBeTruthy();
    expect(screen.queryByTestId('children')).toBeNull();
  });

  it('should call onError with the thrown error', (ctx) => {
    const onError = vi.fn();
    const thrownError = new Error(`error on ${ctx.task.name}`);
    const Component: FunctionComponent = () => {
      throw thrownError;
    };

    render(
      <ErrorBoundary fallback={<div data-testid="fallback" />} onError={onError}>
        <div data-testid="children">
          <Component />
        </div>
      </ErrorBoundary>,
    );

    expect(onError).toBeCalledWithNthArgument(thrownError, 0);
    expect(onError).toBeCalledWithNArguments(2);
  });

  it('should render fallback element with the thrown error', (ctx) => {
    const onError = vi.fn();
    const thrownError = new Error(`error on ${ctx.task.name}`);
    const Component: FunctionComponent = () => {
      throw thrownError;
    };
    const Fallback: ErrorBoundary['props']['Fallback'] = ({ error }) => (
      <div data-testid="fallback">{error.message}</div>
    );

    const screen = render(
      <ErrorBoundary Fallback={Fallback} onError={onError}>
        <div data-testid="children">
          <Component />
        </div>
      </ErrorBoundary>,
    );

    expect(screen.queryByTestId('fallback')?.innerText).toBe(thrownError.message);
  });
});
