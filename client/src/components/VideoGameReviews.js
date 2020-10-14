import React, { Component } from 'react';
import { connect } from 'react-redux';
import VideoGameReview from './VideoGameReview';
import { startSetVideoGameReviews } from '../actions/review';

class VideoGameReviews extends Component {
  componentDidMount() {
    this.props.startSetVideoGameReviews(this.props.currentGame.name);
  }

  render() {
    return (
      <div>
        {this.props.videoGameReviews.length > 0 ? (
          this.props.videoGameReviews.videoGameReviews.map(({ reviews }) =>
            reviews.map((review) => (
              <VideoGameReview key={review._id} review={review} />
            ))
          )
        ) : (
          <p>Currently no reviews for this game</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  videoGameReviews: state.review.videoGameReviews
    ? state.review.videoGameReviews[0]
    : [],
  currentGame: state.game.currentGame,
});

const mapDispatchToProps = (dispatch) => ({
  startSetVideoGameReviews: (title) =>
    dispatch(startSetVideoGameReviews(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoGameReviews);
