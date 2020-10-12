import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import ReviewForm from './ReviewForm';
import { startAddReview } from '../actions/review';

class AddReviewModal extends Component {
  state = {
    modalIsOpen: false,
  };

  handleSubmit = (reviewInfo) => {
    this.props.startAddReview(reviewInfo);
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
        <button onClick={this.handleOpenModal}>Add Review</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.handleCloseModal}
        >
          <ion-icon name="close" onClick={this.handleCloseModal}></ion-icon>
          <h4>Add Review</h4>
          <ReviewForm
            handleSubmit={this.handleSubmit}
            handleCloseModal={this.handleCloseModal}
          />
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddReview: (reviewInfo) => dispatch(startAddReview(reviewInfo)),
});

export default connect(null, mapDispatchToProps)(AddReviewModal);
