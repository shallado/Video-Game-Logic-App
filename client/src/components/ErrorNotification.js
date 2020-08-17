import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { hideError } from '../actions/error';

class ErrorNotification extends Component {
  handleClose = () => {
    this.props.hideError();
  };

  componentDidMount() {
    Modal.setAppElement('body');
  }

  render() {
    const { isOpen, errorInfo } = this.props.error;

    return (
      <Modal isOpen={isOpen} onRequestClose={this.handleClose}>
        {errorInfo && <p>{errorInfo.message}</p>}
        <button onClick={this.handleClose}>X</button>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  hideError: () => dispatch(hideError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorNotification);
