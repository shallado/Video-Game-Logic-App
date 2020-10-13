import React from 'react';

const VideoGameReview = (props) => (
  <div>
    <h5>{props.review.username}</h5>
    <p>{props.review.review}</p>
  </div>
);

export default VideoGameReview;
