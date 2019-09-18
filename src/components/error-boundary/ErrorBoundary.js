import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  componentDidCatch(error) {
    this.setState({hasError: true});
  }

  render() {
    if(this.state.hasError) return <div>Error!</div>;
    return this.props.children;
  }
}