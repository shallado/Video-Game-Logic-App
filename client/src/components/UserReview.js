import React from 'react';
import { Link } from 'react-router-dom';

const UserReview = (props) => (
  <li className="user-reviews-page__review">
    <span className="user-reviews-page__review-content-container">
      <span className="user-reviews-page__review-title">
        {props.userReview.videoGame.title}:
      </span>
      {
        <Link
          to={`/review/${props.userReview.reviewInfo._id}`}
          className="btn-link user-review-btn"
        >
          Update
        </Link>
      }
    </span>
    <span>{props.userReview.reviewInfo.review}</span>
  </li>
);

export default UserReview;
