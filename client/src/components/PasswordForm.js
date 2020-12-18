import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class PasswordForm extends Component {
  handleSubmit = ({ password, newPassword }, actions) => {
    this.props.handleSubmit({
      password,
      newPassword,
    });
    actions.resetForm({
      password: '',
      newPassword: '',
    });
  };

  render() {
    const formInitialValues = {
      password: '',
      newPassword: '',
    };
    const passwordCriteria =
      '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{8,15}$';
    const regex = new RegExp(passwordCriteria);
    const formSchema = Yup.object({
      password: Yup.string().required('Required'),
      newPassword: Yup.string()
        .matches(
          regex,
          'Field is required to be 8 to 15 characters long, contain one lowercase letter, one uppercase letter, one numeric digit and one special character'
        )
        .required('Required'),
    });

    return (
      <div className="password-form">
        <h1 className="heading-one heading-one--form">Password</h1>
        <Formik
          initialValues={formInitialValues}
          validationSchema={formSchema}
          onSubmit={this.handleSubmit}
        >
          <Form className="form">
            <div className="form__field-container">
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                type="password"
                className="form__field"
                id="password"
              />
              <ErrorMessage
                component="div"
                name="password"
                className="form__error-message form__error-message--position-order"
              />
            </div>
            <div className="form__field-container">
              <label htmlFor="new-password">New Password</label>
              <Field
                name="newPassword"
                type="password"
                className="form__field"
                id="new-password"
              />
              <ErrorMessage
                component="div"
                name="newPassword"
                className="form__error-message form__error-message--position-order"
              />
            </div>
            <button className="btn">Update</button>
          </Form>
        </Formik>
      </div>
    );
  }
}

export default PasswordForm;
