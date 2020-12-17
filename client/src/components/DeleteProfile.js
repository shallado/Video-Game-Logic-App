import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal } from '../actions/modal';

class DeleteProfile extends Component {
  handleDeleteProfile = () => {
    this.props.showModal();
  };

  render() {
    return (
      <div className="delete-profile">
        <h1 className="heading-one heading-one--form">Profile</h1>
        <button className="btn delete-btn" onClick={this.handleDeleteProfile}>
          Delete
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  showModal: () => dispatch(showModal('confirmModal')),
});

export default connect(null, mapDispatchToProps)(DeleteProfile);
