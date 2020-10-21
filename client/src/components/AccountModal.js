import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import UserReviewsModal from './UserReviewsModal';
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
      >
        <p>User Name</p>
        <ul>
          <ion-icon name="person"></ion-icon>
          <li>
            <Link to="/account">Account</Link>
          </li>
          <ion-icon name="cloud-upload"></ion-icon>
          <li>
            <Link to="/upload">Upload</Link>
          </li>
          <UserReviewsModal />
          <ion-icon name="log-out"></ion-icon>
          <li onClick={this.handleSignOut}>Sign Out</li>
        </ul>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
});

export default withRouter(connect(null, mapDispatchToProps)(AccountModal));
