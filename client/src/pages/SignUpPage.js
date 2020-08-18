import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserForm from '../components/UserForm';
import { startUserSignUp } from '../actions/user';

class SignUpPage extends Component {
  handleSubmit = (userInfo) => {
    this.props.startUserSignUp(userInfo);
    this.props.history.push('/dashboard');
  };

  render() {
    return (
      <div>
        <UserForm handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startUserSignUp: (userInfo) => dispatch(startUserSignUp(userInfo)),
});

export default connect(null, mapDispatchToProps)(SignUpPage);
