import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import IconClose from '../svgs/IconClose';
import { hideModal } from '../actions/modal';
import { signOut } from '../actions/auth';
import { startUserDelete } from '../actions/user';

Modal.setAppElement('#root');

class ConfirmModal extends Component {
  handleCloseModal = () => {
    this.props.hideModal();
  };

  handleDeleteProfile = () => {
    this.props.hideModal();

    this.props.startUserDelete(this.props.id);

    if (this.props.errorInfo === null) {
      this.props.signOut();
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.openModals.includes('confirmModal')}
        onRequestClose={this.handleCloseModal}
        className="confirm-modal"
        overlayClassName="confirm-modal__overlay"
      >
        <div className="confirm-modal__close-icon-container">
          <div onClick={this.handleCloseModal}>
            <IconClose />
          </div>
        </div>
        <div className="confirm-modal__content">
          <p>
            <span>Are you sure you want to</span>
            <span>delete your profile?</span>
          </p>
          <button className="btn" onClick={this.handleDeleteProfile}>
            Confirm
          </button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  openModals: state.modals.openModals,
  id: state.user.id,
  errorInfo: state.error.errorInfo,
});

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(hideModal('confirmModal')),
  signOut: () => dispatch(signOut()),
  startUserDelete: (userId) => dispatch(startUserDelete(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);
