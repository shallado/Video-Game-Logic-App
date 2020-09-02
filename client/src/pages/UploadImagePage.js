import React, { Component } from 'react';
import { connect } from 'react-redux';
import ErrorNotification from '../components/ErrorNotification';
import { startUploadProfilePhoto } from '../actions/user';

class UploadImagePage extends Component {
  state = {
    fileUpload: '',
  };

  handleFileChange = (e) => {
    const fileUpload = e.target.files[0];

    this.setState(() => ({ fileUpload }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('profile', this.state.fileUpload);
    this.props.startUploadProfilePhoto(this.props.user.id, formData);
  };

  render() {
    return (
      <div>
        <h1>Upload Profile Photo</h1>
        <form onSubmit={this.handleSubmit}>
          <input name="profile" type="file" onChange={this.handleFileChange} />
          <button type="submit">Upload</button>
        </form>
        <ErrorNotification />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  startUploadProfilePhoto: (id, formData) =>
    dispatch(startUploadProfilePhoto(id, formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadImagePage);
