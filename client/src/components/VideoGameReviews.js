import React from 'react';
import { connect } from 'react-redux';
import VideoGameReview from './VideoGameReview';

const VideoGameReviews = (props) => {
  return (
    <>
      {props.videoGameReviews.length ? (
        <div className="more-info-modal__reviews-container">
          <ul className="more-info-modal__reviews">
            {props.videoGameReviews.map((videoGameReview) => (
              <VideoGameReview
                key={videoGameReview._id}
                videoGameReview={videoGameReview}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <p>Currently no reviews for this game</p>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  videoGameReviews: state.review.videoGameReviews.reviews,
  currentGame: state.game.currentGame,
});

export default connect(mapStateToProps)(VideoGameReviews);
