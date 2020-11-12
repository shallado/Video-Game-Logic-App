import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserReview from './UserReview';
import { startSetUserVideoGameReviews } from '../actions/review';

class UserReviews extends Component {
  componentDidMount() {
    this.props.startSetUserVideoGameReviews(this.props.username);
  }

  render() {
    return (
      <div className="user-reviews-page__reviews-container">
        {this.props.userReviews.length === 0 ? (
          <p>No user reviews</p>
        ) : (
          <ul className="user-reviews-page__reviews">
            {this.props.userReviews.map((userReview) => (
              <UserReview
                key={userReview.videoGameId}
                userReview={userReview}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userReviews: state.review.userReviews,
  username: state.user.username,
});

const mapDispatchToProps = (dispatch) => ({
  startSetUserVideoGameReviews: (username) =>
    dispatch(startSetUserVideoGameReviews(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserReviews);
