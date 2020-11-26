import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { startSignIn } from '../actions/auth';
import ErrorNotification from '../modals/ErrorNotification';

class SignInPage extends Component {
  handleSubmit = (userCredentials) => {
    this.props.startSignIn(userCredentials);
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
      <div className="sign-in">
        <div className="sign-in__container">
          <h1 className="heading-one heading-one--form">Sign In</h1>
          <Formik
            initialValues={formikInitialVal}
            validationSchema={signInSchema}
            onSubmit={this.handleSubmit}
          >
            <Form className="form">
              <div className="form__field-container">
                <label htmlFor="email">Email</label>
                <Field type="text" name="email" className="form__field" />
                <ErrorMessage
                  component="div"
                  name="email"
                  className="form__error-message"
                />
              </div>
              <div className="form__field-container">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="form__field"
                />
                <ErrorMessage
                  component="div"
                  name="password"
                  className="form__error-message"
                />
              </div>
              <button type="submit" className="btn">
                Sign In
              </button>
            </Form>
          </Formik>
          <ErrorNotification />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startSignIn: (userCredentials) => dispatch(startSignIn(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignInPage);
