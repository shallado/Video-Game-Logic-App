import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReviewForm from '../components/ReviewForm';
import IconLeftArrow from '../svgs/IconLeftArrow';
import { startEditVideoGameReview } from '../actions/review';

class UpdateReviewPage extends Component {
  handleSubmit = (review) => {
    this.props.startEditVideoGameReview({
      videoGameId: this.props.videoGameId,
      username: this.props.userReview.username,
      review,
    });
    this.props.history.push('/dashboard');
  };

  render() {
    return (
      <div className="review">
        <div className="add-review-modal__close-icon-container">
          <div>
            <Link to="/dashboard" className="add-review-modal__link">
              <IconLeftArrow />
            </Link>
          </div>
        </div>
        <div className="add-review-modal">
          <h4 className="heading-four">Update Review</h4>
          <ReviewForm
            userReview={this.props.userReview}
            videoGameId={this.props.videoGameId}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  videoGameId: state.review.videoGameReviews.videoGameId,
  userReview: state.review.videoGameReviews.reviews.find(
    (review) => review.username === state.user.username
  ),
});

const mapDispatchToProps = (dispatch) => ({
  startEditVideoGameReview: (userReview) =>
    dispatch(startEditVideoGameReview(userReview)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateReviewPage);
