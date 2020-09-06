import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { startSignIn } from '../actions/auth';
import { hideError } from '../actions/error';
import ErrorNotification from '../components/ErrorNotification';

class SignInPage extends Component {
  handleSubmit = (userCredentials) => {
    this.props.startSignIn(userCredentials);
    this.props.hideError();
  };

  render() {
    const signInSchema = Yup.object({
      email: Yup.string()
        .trim()
        .email('Must be a valid email format')
        .required('Required'),
      password: Yup.string().trim().required('Required'),
    });

    const formikInitialVal = {
      email: '',
      password: '',
    };

    return (
      <div>
        <Formik
          initialValues={formikInitialVal}
          validationSchema={signInSchema}
          onSubmit={this.handleSubmit}
        >
          <Form>
            <label htmlFor="email">Email</label>
            <Field type="text" name="email" />
            <ErrorMessage name="email" />
            <label htmlFor="password">password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" />
            <button type="submit">Sign In</button>
          </Form>
        </Formik>
        <ErrorNotification
          signInSuccessRedirect={() => this.props.history.push('/dashboard')}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startSignIn: (userCredentials) => dispatch(startSignIn(userCredentials)),
  hideError: () => dispatch(hideError()),
});

export default connect(null, mapDispatchToProps)(SignInPage);
