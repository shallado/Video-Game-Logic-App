import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import IconClose from '../svgs/IconClose';
import { hideError } from '../actions/error';

class ErrorNotification extends Component {
  handleCloseModal = () => {
    this.props.hideError();
  };

  componentDidMount() {
    Modal.setAppElement('body');
  }

  render() {
    return (
      <Modal
        isOpen={!!this.props.errorInfo}
        onRequestClose={this.handleClose}
        className="error-notification"
        overlayClassName="error-notification__overlay"
      >
        <div className="error-notification__close-icon-container">
          <div onClick={this.handleCloseModal}>
            <IconClose />
          </div>
        </div>
        <div className="error-notification__content">
          {this.props.errorInfo && <p>{this.props.errorInfo.message}</p>}
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  errorInfo: state.error.errorInfo,
});

const mapDispatchToProps = (dispatch) => ({
  hideError: () => dispatch(hideError()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ErrorNotification)
);
