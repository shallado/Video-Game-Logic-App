import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import IconClose from '../svgs/IconClose';
import { hideError } from '../actions/error';

class ErrorNotification extends Component {
  handleCloseModal = () => {
    if (
      this.props.match.path === '/signup' &&
      this.props.successInfo !== null
    ) {
      this.props.history.push('/signin');
    }

    this.props.hideError();
  };

  componentDidMount() {
    Modal.setAppElement('body');
  }

  render() {
    let errorInfoContent;

    if (!!this.props.errorInfo) {
      errorInfoContent = this.props.errorInfo.message;
    } else if (!!this.props.successInfo) {
      errorInfoContent = this.props.successInfo;
    } else {
      errorInfoContent = null;
    }

    return (
      <Modal
        isOpen={!!this.props.errorInfo || !!this.props.successInfo}
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
          <p>{errorInfoContent}</p>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  errorInfo: state.error.errorInfo,
  successInfo: state.error.successInfo,
});

const mapDispatchToProps = (dispatch) => ({
  hideError: () => dispatch(hideError()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ErrorNotification)
);
