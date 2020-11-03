import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import IconAccount from '../svgs/IconAccount';
import IconLogOut from '../svgs/IconLogOut';
import IconReview from '../svgs/IconReview';
import IconUpload from '../svgs/IconUpload';
import { signOut } from '../actions/auth';

class AccountModal extends Component {
  handleSignOut = () => {
    this.props.signOut();
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="navbar__account">
        <p>User Name</p>
        <ul className="navbar__account-links">
          <li className="navbar__account-link-container">
            <IconAccount />
            <Link to="/account" className="navbar__account-link-one">
              Account
            </Link>
          </li>
          <li className="navbar__account-link-container">
            <IconUpload />
            <Link to="/upload" className="navbar__account-link-two">
              Upload
            </Link>
          </li>
          <li
            onClick={this.handleOpenModal}
            className="navbar__account-link-container"
          >
            <IconReview />
            <Link to="/user-reviews" className="navbar__account-link-three">
              Game Reviews
            </Link>
          </li>
          <li
            onClick={this.handleSignOut}
            className="navbar__account-link-container"
          >
            <IconLogOut />
            <span className="navbar__account-link-four">Sign Out</span>
          </li>
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
});

export default withRouter(connect(null, mapDispatchToProps)(AccountModal));
