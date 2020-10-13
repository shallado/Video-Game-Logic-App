import React, { Component } from 'react';
import Modal from 'react-modal';
import UserReviews from './UserReviews';

export default class UserReviewsModal extends Component {
  state = {
    modalIsOpen: false,
  };

  handleOpenModal = () => {
    this.setState(() => ({ modalIsOpen: true }));
  };

  handleCloseModal = () => {
    this.setState(() => ({ modalIsOpen: false }));
  };

  render() {
    return (
      <div>
        <div onClick={this.handleOpenModal}>
          <ion-icon name="chatbubbles"></ion-icon>
          <li>Game Reviews</li>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.handleCloseModal}
        >
          <h4>User Reviews</h4>
          <UserReviews />
        </Modal>
      </div>
    );
  }
}
