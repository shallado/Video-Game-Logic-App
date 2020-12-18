import React, { Component } from 'react';
import { connect } from 'react-redux';
import DeleteProfile from '../components/DeleteProfile';
import PasswordForm from '../components/PasswordForm';
import UserForm from '../components/UserForm';
import ConfirmModal from '../modals/ConfirmModal';
import ErrorNotification from '../modals/ErrorNotification';
import IconLeftArrow from '../svgs/IconLeftArrow';
import { startUserUpdate, startUserUpdatePassword } from '../actions/user';

export class AccountPage extends Component {
  handleSubmit = (updates) => {
    if (updates.password) {
      this.props.startUserUpdatePassword({
        ...updates,
        userId: this.props.userId,
        email: this.props.email,
      });
    } else {
      this.props.startUserUpdate(this.props.userId, updates);
    }
  };

  handleRouteRedirect = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="account">
        <div className="account__close-icon-container">
          <div>
            <div onClick={this.handleRouteRedirect} className="account__link">
              <IconLeftArrow />
            </div>
          </div>
        </div>
        <div className="account__form-container">
          <div>
            <UserForm
              user={this.props.user}
              handleSubmit={this.handleSubmit}
              match={this.props.match}
            />
          </div>
          <div>
            <PasswordForm handleSubmit={this.handleSubmit} />
            <DeleteProfile />
          </div>
        </div>
        <ErrorNotification />
        <ConfirmModal />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  userId: state.user.id,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  startUserUpdate: (id, updates) => dispatch(startUserUpdate(id, updates)),
  startUserUpdatePassword: (userPasswords) =>
    dispatch(startUserUpdatePassword(userPasswords)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
