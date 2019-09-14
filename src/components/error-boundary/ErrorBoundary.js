import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
      }

    componentDidCatch(error, errorInfo) {
        console.log(error);
        console.log(errorInfo);
        this.setState({ error });
    }

    render() {
        if (this.state.error) {
          return (
            <div>
              <div>
                <p>We're sorry - something's gone wrong.</p>
                <p>Our team has been notified, but click <button>here</button> to fill out a report.</p>
              </div>
            </div>
          );
        } else {
          return this.props.children;
        }
    }
}