import React, { Component } from 'react';

class NotFoundPage extends Component {
  handleRouteRedirect = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="not-found-page">
        <h1 className="heading-one">
          <span className="heading-one__primary">404</span>
          <span className="heading-one__secondary">Page Not Found</span>
        </h1>
        <button onClick={this.handleRouteRedirect} className="btn">
          Go Back
        </button>
      </div>
    );
  }
}

export default NotFoundPage;
