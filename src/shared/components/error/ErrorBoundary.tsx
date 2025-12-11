import { Component, type ReactNode } from 'react';
import { Button } from '../ui';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  // eslint-disable-next-line sonarjs/function-return-type
  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <>
          {this.props.fallback ?? (
            <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Something went wrong
              </h2>
              <p className="text-gray-600 mb-6 max-w-md">
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
              <Button onClick={this.handleReset}>Try again</Button>
            </div>
          )}
        </>
      );
    }

    return <>{this.props.children}</>;
  }
}
