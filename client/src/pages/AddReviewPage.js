import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReviewForm from '../components/ReviewForm';
import IconLeftArrow from '../svgs/IconLeftArrow';
import { startAddVideoGameReview } from '../actions/review';

class AddReviewPage extends Component {
  handleSubmit = (review) => {
    const userReview = {
      title: this.props.title,
      username: this.props.username,
      review,
    };

    this.props.startAddVideoGameReview(userReview);
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
          <h4 className="heading-four">Add Review</h4>
          <ReviewForm handleSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.user.username,
  title: state.game.currentGame.name,
});

const mapDispatchToProps = (dispatch) => ({
  startAddVideoGameReview: (userReview) =>
    dispatch(startAddVideoGameReview(userReview)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddReviewPage);
