import type { ErrorInfo } from 'react';

import type { ErrorBoundaryProps } from './error-boundary.template.props';

import { Component } from 'react';

type ErrorBoundaryState = {
  error?: Error;
};

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public static getDerivedStateFromError(error: Error) {
    return { error };
  }

  public constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {};
    this.reset.bind(this);
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError(error, errorInfo);
  }

  public reset() {
    this.setState({ error: undefined });
  }

  public render() {
    const { error } = this.state;
    const { children } = this.props;

    if (!error) {
      return children;
    }

    if ('Fallback' in this.props) {
      const { Fallback } = this.props;

      return <Fallback error={error} reset={this.reset} />;
    }

    const { fallback } = this.props;

    return fallback;
  }
}
