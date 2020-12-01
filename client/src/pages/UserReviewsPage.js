import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserReviews from '../components/UserReviews';
import IconLeftArrow from '../svgs/IconLeftArrow';

class UserReviewsPage extends Component {
  handleRouteRedirect = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="user-reviews-page">
        <div className="watch__left-arrow-icon-container">
          <div>
            <div onClick={this.handleRouteRedirect} className="watch__link">
              <IconLeftArrow />
            </div>
          </div>
        </div>
        <div className="user-reviews-page__reviews-container-main">
          <h1 className="heading-one heading-one--form">User Reviews</h1>
          <UserReviews />
        </div>
      </div>
    );
  }
}

export default UserReviewsPage;
