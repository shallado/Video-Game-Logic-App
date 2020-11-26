import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ErrorNotification from '../modals/ErrorNotification';
import IconLeftArrow from '../svgs/IconLeftArrow';
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
    this.props.history.push('/dashboard');
  };

  render() {
    return (
      <div className="upload-page">
        <div className="upload-page__close-icon-container">
          <div>
            <Link to="/dashboard" className="upload-page__link">
              <IconLeftArrow />
            </Link>
          </div>
        </div>
        <div className="upload-page__form-container">
          <h1 className="heading-one heading-one--form">Profile Photo</h1>
          <form onSubmit={this.handleSubmit} className="upload-page__form">
            <div className="upload-page__input-container">
              <input
                name="profile"
                type="file"
                id="file"
                onChange={this.handleFileChange}
                className="upload-page__form-input"
              />
              <label htmlFor="file" className="upload-page__form-input-label">
                <span>
                  {this.state.fileUpload && this.state.fileUpload.name}
                </span>
                <span>Choose an image</span>
              </label>
            </div>
            <button type="submit" className="btn">
              Upload
            </button>
          </form>
          <ErrorNotification />
        </div>
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
