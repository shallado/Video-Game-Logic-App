import React, { Component } from 'react';
import Modal from 'react-modal';
import UserReviews from './UserReviews';
import IconReview from '../svgs/IconReview';

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
      <li
        onClick={this.handleOpenModal}
        className="account-modal__link-container"
      >
        <IconReview />
        <span className="account-modal__link-four">Game Reviews</span>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.handleCloseModal}
        >
          <h4>User Reviews</h4>
          <UserReviews />
        </Modal>
      </li>
    );
  }
}
