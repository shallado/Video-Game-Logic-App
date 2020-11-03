import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import ReviewForm from '../components/ReviewForm';
import IconClose from '../svgs/IconClose';
import { startAddReview } from '../actions/review';
import { hideModal } from '../actions/modal';

Modal.setAppElement('#root');

class AddReviewModal extends Component {
  handleSubmit = (reviewInfo) => {
    this.props.startAddReview(reviewInfo);
  };

  handleCloseModal = () => {
    this.props.hideModal();
  };

  render() {
    return (
      <Modal
        isOpen={this.props.modals.includes('addReviewModal')}
        onRequestClose={this.handleCloseModal}
      >
        <div>
          <div className="more-info-modal__close-icon-container">
            <div onClick={this.handleCloseModal}>
              <IconClose />
            </div>
          </div>
          <h4>Add Review</h4>
          <ReviewForm
            handleSubmit={this.handleSubmit}
            handleCloseModal={this.handleCloseModal}
          />
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  modals: state.modals,
});

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(hideModal('addReviewModal')),
  startAddReview: (reviewInfo) => dispatch(startAddReview(reviewInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddReviewModal);