import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserReview from './UserReview';
import { startSetUserReviews } from '../actions/review';

class UserReviews extends Component {
  componentDidMount() {
    this.props.startSetUserReviews(this.props.user.username);
  }

  render() {
    return (
      <div>
        {this.props.userReviews.map((userReview) => (
          <UserReview key={userReview.videoGameId} userReview={userReview} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userReviews: state.review.userReviews,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  startSetUserReviews: (username) => dispatch(startSetUserReviews(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserReviews);
