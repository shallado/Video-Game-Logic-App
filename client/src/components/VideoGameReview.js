import React from 'react';

const VideoGameReview = (props) => (
  <li className="more-info-modal__review">
    <span className="more-info-modal__review-username">
      {props.videoGameReview.username} :
    </span>
    <span>{props.videoGameReview.review}</span>
  </li>
);

export default VideoGameReview;
