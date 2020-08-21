import React, { Component } from 'react';
import Modal from 'react-modal';

export default class AccountModal extends Component {
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
          <li>Account</li>
          <ion-icon name="cloud-upload"></ion-icon>
          <li>Upload</li>
          <ion-icon name="chatbubbles"></ion-icon>
          <li>Game Reviews</li>
          <ion-icon name="log-out"></ion-icon>
          <li>Sign Out</li>
        </ul>
      </Modal>
    );
  }
}
