import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { hideError } from '../actions/error';

class ErrorNotification extends Component {
  handleClose = () => {
    if (!this.props.errorInfo && this.props.match.path === '/signup') {
      this.props.signUpSuccessRedirect();
    } else if (!this.props.errorInfo && this.props.match.path === '/account') {
      this.props.updateSuccessRedirect();
    }

    this.props.hideError();
  };

  componentDidMount() {
    Modal.setAppElement('body');
  }

  render() {
    let successMessage;

    if (this.props.match.path === '/signup') {
      successMessage = 'Successfully completed user signup';
    } else {
      successMessage = 'Successfully updated user account';
    }

    return (
      <Modal isOpen={this.props.isOpen} onRequestClose={this.handleClose}>
        {this.props.errorInfo ? (
          <p>{this.props.errorInfo.message}</p>
        ) : (
          <p>{successMessage}</p>
        )}
        <button onClick={this.handleClose}>X</button>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  errorInfo: state.error.errorInfo,
  isOpen: state.error.isOpen,
});

const mapDispatchToProps = (dispatch) => ({
  hideError: () => dispatch(hideError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorNotification);
