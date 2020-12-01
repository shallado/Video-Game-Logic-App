import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import UserForm from '../components/UserForm';
import ErrorNotification from '../modals/ErrorNotification';
import IconLeftArrow from '../svgs/IconLeftArrow';
import { startUserUpdate } from '../actions/user';

export class AccountPage extends Component {
  handleSubmit = (updates) => {
    this.props.startUserUpdate(this.props.user.id, updates);
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
        <UserForm
          user={this.props.user}
          handleSubmit={this.handleSubmit}
          match={this.props.match}
        />
        <ErrorNotification
          updateSuccessRedirect={() => this.props.history.push('/')}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  startUserUpdate: (id, updates) => dispatch(startUserUpdate(id, updates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
