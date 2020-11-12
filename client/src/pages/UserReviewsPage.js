import React from 'react';
import { Link } from 'react-router-dom';
import UserReviews from '../components/UserReviews';
import IconLeftArrow from '../svgs/IconLeftArrow';

const UserReviewsPage = () => (
  <div className="user-reviews-page">
    <div className="watch__left-arrow-icon-container">
      <div>
        <Link to="/dashboard" className="watch__link">
          <IconLeftArrow />
        </Link>
      </div>
    </div>
    <h1 className="heading-one">User Reviews</h1>
    <UserReviews />
  </div>
);

export default UserReviewsPage;
