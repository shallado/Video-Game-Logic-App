import React from 'react';

const UserReview = (props) => (
  <div>
    <h5>{props.userReview.videoGame.title}</h5>
    <h5>{props.userReview.reviews.username}</h5>
    <p>{props.userReview.reviews.review}</p>
  </div>
);

export default UserReview;
