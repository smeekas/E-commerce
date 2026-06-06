import React, { ReactNode } from 'react';

type ErrorBoundaryProps = { children: ReactNode };
type ErrorBoundaryState = { error: string | null };
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(e: Error): ErrorBoundaryState {
    return { error: e.message };
  }
  componentDidCatch(e: Error): void {
    this.setState({ error: e.message });
  }
  render() {
    if (this.state.error) {
      return (
        <div className='error-boundary'>
          {this.state.error || 'Something went wrong!'}
          <button onClick={() => this.setState({ error: null })}>
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
