import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';

class PasswordForm extends Component {
  state = {
    password: '',
    newPassword: '',
  };

  handleChangePassword = (e) => {
    const password = e.target.value;

    this.setState(() => ({
      password,
    }));
  };

  handleChangeNewPassword = (e) => {
    const newPassword = e.target.value;

    this.setState(() => ({
      newPassword,
    }));
  };

  render() {
    return (
      <div className="password-form">
        <div>
          <h1 className="heading-one heading-one--form">Password</h1>
          <form className="form">
            <div className="form__field-container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={this.state.password}
                onChange={this.handleChangePassword}
                className="form__field"
                id="password"
              />
            </div>
            <div className="form__field-container">
              <label htmlFor="new-password">New Password</label>
              <input
                type="password"
                value={this.state.newPassword}
                onChange={this.handleChangeNewPassword}
                className="form__field"
                id="new-password"
              />
            </div>
            <button className="btn">Update</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(PasswordForm);
