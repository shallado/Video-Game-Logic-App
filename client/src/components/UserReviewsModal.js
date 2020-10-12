import React, { Component } from 'react';
import Modal from 'react-modal';

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
          <h4>Username Reviews</h4>
          <div>
            <h5>Game Title</h5>
            <h6>Review Title</h6>
            <p>Review</p>
          </div>
        </Modal>
      </div>
    );
  }
}
