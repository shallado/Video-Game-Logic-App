import React from 'react';

const VideoGameReview = (props) => (
  <li className="more-info-modal__review">
    <span className="more-info-modal__review-username">
      {props.review.username} :
    </span>
    <span>{props.review.review}</span>
  </li>
);

export default VideoGameReview;
