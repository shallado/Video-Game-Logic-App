import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import IconAccount from '../svgs/IconAccount';
import IconLogOut from '../svgs/IconLogOut';
import IconReview from '../svgs/IconReview';
import IconUpload from '../svgs/IconUpload';
import { signOut } from '../actions/auth';

class Account extends Component {
  handleSignOut = () => {
    this.props.signOut();
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="navbar__account">
        <p>{this.props.username}</p>
        <ul className="navbar__account-links">
          <li className="navbar__account-link-container">
            <span className="navbar__icon-container">
              <IconAccount />
            </span>
            <Link to="/account" className="navbar__account-link-one">
              Account
            </Link>
          </li>
          <li className="navbar__account-link-container">
            <span className="navbar__icon-container">
              <IconUpload />
            </span>
            <Link to="/upload" className="navbar__account-link-two">
              Upload
            </Link>
          </li>
          <li
            onClick={this.handleOpenModal}
            className="navbar__account-link-container"
          >
            <span className="navbar__icon-container">
              <IconReview />
            </span>
            <Link to="/user-reviews" className="navbar__account-link-three">
              Game Reviews
            </Link>
          </li>
          <li
            onClick={this.handleSignOut}
            className="navbar__account-link-container"
          >
            <span className="navbar__icon-container">
              <IconLogOut />
            </span>
            <span className="navbar__account-link-four">Sign Out</span>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.user.username,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Account)
);
