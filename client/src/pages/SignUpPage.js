import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserForm from '../components/UserForm';
import { userSignUp } from '../actions/user';

class SignUpPage extends Component {
  handleSubmit = (user) => {
    this.props.userSignUp(user);
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
  userSignUp: (userInfo) => dispatch(userSignUp(userInfo)),
});

export default connect(null, mapDispatchToProps)(SignUpPage);
