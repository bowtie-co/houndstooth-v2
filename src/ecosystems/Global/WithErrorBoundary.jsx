import React from 'react';
import { airbrake, storage } from '../../lib';

export class WithErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.warn(error);

    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Send error to Airbrake
    airbrake.notify({
      error: error,
      params: { info }
    });

    storage.clear();
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>Please reload your browser and try again.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
