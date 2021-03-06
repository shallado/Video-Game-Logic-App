import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReviewForm from '../components/ReviewForm';
import IconLeftArrow from '../svgs/IconLeftArrow';
import { startEditVideoGameReview } from '../actions/review';

class UpdateReviewPage extends Component {
  handleSubmit = (review) => {
    const videoGameId = !!this.props.videoGameReviewsUserReview.reviews
      ? this.props.videoGameReviewsUserReview.videoGameId
      : this.props.userReviewsUserReview.videoGameId;

    this.props.startEditVideoGameReview({
      videoGameId,
      username: this.props.username,
      review,
    });
    this.props.history.goBack();
  };

  handleRouteRedirect = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    document.body.setAttribute('style', '');
  }

  render() {
    return (
      <div className="review-page">
        <div className="review-page__close-icon-container">
          <div>
            <div
              onClick={this.handleRouteRedirect}
              className="review-page__link"
            >
              <IconLeftArrow />
            </div>
          </div>
        </div>
        <div className="review-page__form-container-main">
          <div className="review-page__form-container">
            <h4 className="heading-four">Update Review</h4>
            <div>
              <ReviewForm
                videoGameReviewsUserReview={
                  this.props.videoGameReviewsUserReview
                }
                userReviewsUserReview={this.props.userReviewsUserReview}
                videoGameId={this.props.videoGameId}
                handleSubmit={this.handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  username: state.user.username,
  videoGameReviewsUserReview: {
    ...state.review.videoGameReviews,
    reviews: state.review.videoGameReviews.reviews.find(
      (review) => review.username === state.user.username
    ),
  },
  userReviewsUserReview: state.review.userReviews.find(
    (userReview) => userReview.reviewInfo._id === props.match.params.id
  ),
});

const mapDispatchToProps = (dispatch) => ({
  startEditVideoGameReview: (userReview) =>
    dispatch(startEditVideoGameReview(userReview)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateReviewPage);
