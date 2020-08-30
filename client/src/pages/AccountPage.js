import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserForm from '../components/UserForm';
import ErrorNotification from '../components/ErrorNotification';
import { startUserUpdate } from '../actions/user';

export class AccountPage extends Component {
  handleSubmit = (updates) => {
    console.log('test');
    console.log(updates);
    this.props.startUserUpdate(this.props.user.id, updates);
  };

  render() {
    return (
      <div>
        <h1>Update Account</h1>
        <UserForm
          user={this.props.user}
          handleSubmit={this.handleSubmit}
          match={this.props.match}
        />
        <ErrorNotification
          match={this.props.match}
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
