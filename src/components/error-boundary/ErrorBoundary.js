import React from 'react';

import '../home/Home.css';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      info: null,
    };
  }

  componentDidCatch(error, info) {
    console.log("did catch error");
    this.setState({
      error: error,
      info: info,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <header className="App-header">
          <div className="container">
            <div className="row mt-3">
              <div className="col-5 logo-text">
                <h1><b>An error occurred</b></h1>
                <h6><i>Try again in a few minutes</i></h6>
              </div>
            </div>
          </div>
        </header>
      );
    }
    return this.props.children;
  }
}