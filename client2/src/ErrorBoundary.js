import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.errorMsg = "";
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Here we can add logger services
  componentDidCatch(error, errorInfo) {
    // logErrorToMyService(error, errorInfo);
    this.errorMsg = error;
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <h1>There is an unexpected{this.error && `, error:${this.error}`}</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
