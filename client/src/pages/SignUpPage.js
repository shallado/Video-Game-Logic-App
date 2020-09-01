import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserForm from '../components/UserForm';
import ErrorNotification from '../components/ErrorNotification';
import { startSignUp } from '../actions/auth';

class SignUpPage extends Component {
  handleSubmit = (userInfo) => {
    this.props.startSignUp(userInfo);
  };

  render() {
    return (
      <div>
        <UserForm handleSubmit={this.handleSubmit} match={this.props.match} />
        <ErrorNotification
          signUpSuccessRedirect={() => this.props.history.push('/')}
          match={this.props.match}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startSignUp: (userInfo) => dispatch(startSignUp(userInfo)),
});

export default connect(null, mapDispatchToProps)(SignUpPage);
