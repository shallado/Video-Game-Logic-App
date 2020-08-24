import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import { startSignOut } from '../actions/auth';

class AccountModal extends Component {
  handleSignOut = () => {
    this.props.startSignOut();
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
          <li>Upload</li>
          <ion-icon name="chatbubbles"></ion-icon>
          <li>Game Reviews</li>
          <ion-icon name="log-out"></ion-icon>
          <li onClick={this.handleSignOut}>Sign Out</li>
        </ul>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startSignOut: () => dispatch(startSignOut()),
});

export default withRouter(connect(null, mapDispatchToProps)(AccountModal));
