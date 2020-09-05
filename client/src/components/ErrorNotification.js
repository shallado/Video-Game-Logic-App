import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { hideError } from '../actions/error';

class ErrorNotification extends Component {
  handleClose = () => {
    this.props.history.push('/');
    this.props.hideError();
  };

  componentDidMount() {
    Modal.setAppElement('body');
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} onRequestClose={this.handleClose}>
        {this.props.errorInfo ? (
          <p>{this.props.errorInfo.message}</p>
        ) : (
          this.props.data && <p>{this.props.data.message}</p>
        )}
        <button onClick={this.handleClose}>X</button>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  errorInfo: state.error.errorInfo,
  isOpen: state.error.isOpen,
  data: state.error.data,
});

const mapDispatchToProps = (dispatch) => ({
  hideError: () => dispatch(hideError()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ErrorNotification)
);
