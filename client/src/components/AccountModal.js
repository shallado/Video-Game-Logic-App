import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import UserReviewsModal from './UserReviewsModal';
import IconLogOut from '../svgs/IconLogOut';
import IconAccount from '../svgs/IconAccount';
import IconUpload from '../svgs/IconUpload';
import { signOut } from '../actions/auth';

class AccountModal extends Component {
  handleSignOut = () => {
    this.props.signOut();
    this.props.history.push('/');
  };

  componentDidMount() {
    Modal.setAppElement('body');
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.props.closeModal}
        className="account-modal"
        overlayClassName="account-modal__overlay"
      >
        <p>User Name</p>
        <ul className="account-modal__links">
          <li className="account-modal__link-container">
            <IconAccount />
            <Link to="/account" className="account-modal__link-one">
              Account
            </Link>
          </li>
          <li className="account-modal__link-container">
            <IconUpload />
            <Link to="/upload" className="account-modal__link-two">
              Upload
            </Link>
          </li>
          <UserReviewsModal />
          <li
            onClick={this.handleSignOut}
            className="account-modal__link-container"
          >
            <IconLogOut />
            <span className="account-modal__link-three">Sign Out</span>
          </li>
        </ul>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
});

export default withRouter(connect(null, mapDispatchToProps)(AccountModal));
