import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import * as Yup from 'yup';

export default class UserForm extends Component {
  state = {
    birthday: this.props.user ? moment(this.props.user.birthday) : moment(),
    focused: false,
  };

  handleDateChange = (date) => {
    let birthday;

    if (!date) {
      birthday = undefined;
    } else {
      birthday = moment(date);
    }

    this.setState(() => ({ birthday }));
  };

  handleFocusChange = ({ focused }) => {
    this.setState(() => ({ focused }));
  };

  returnYears = () => {
    let years = [];

    for (let i = moment().year() - 100; i <= moment().year(); i++) {
      years.push(
        <option value={i} key={`${i}-cp`}>
          {i}
        </option>
      );
    }

    return years;
  };

  renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <select
          value={month.month()}
          onChange={(e) => onMonthSelect(month, e.target.value)}
        >
          {moment.months().map((label, value, index) => (
            <option value={value} key={label}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          value={month.year()}
          onChange={(e) => onYearSelect(month, e.target.value)}
        >
          {this.returnYears()}
        </select>
      </div>
    </div>
  );

  handleSubmit = (userInfo) => {
    const user = {
      ...userInfo,
      birthday: this.state.birthday.format('YYYY-MM-DD'),
    };

    if (this.props.user) {
      const userKeys = Object.keys(user);

      for (let key of userKeys) {
        if (user[key] !== this.props.user[key]) {
          return this.props.handleSubmit(user);
        }
      }
    }

    this.props.handleSubmit(user);
  };

  render() {
    const formInitialValues = {
      username: this.props.user ? this.props.user.username : '',
      password: this.props.user ? this.props.user.password : '',
      email: this.props.user ? this.props.user.email : '',
      city: this.props.user ? this.props.user.city : '',
      zipcode: this.props.user ? this.props.user.zipcode : '',
      gender: this.props.user ? this.props.user.gender : 'select',
    };

    const passwordCriteria =
      '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{8,15}$';
    const regex = new RegExp(passwordCriteria);

    let formSchema = Yup.object({
      username: Yup.string()
        .trim()
        .max(26, 'Must be 26 characters or less')
        .required('Required'),
      password: Yup.string()
        .matches(
          regex,
          'Field is required to be 8 to 15 characters long, contain one lowercase letter, one uppercase letter, one numeric digit and one special character'
        )
        .required('Required'),
      email: Yup.string()
        .trim()
        .email('Must be a valid email format')
        .required('Required'),
      city: Yup.string().trim().required('Required'),
      zipcode: Yup.string().length(5, 'Must be 5 digits').required('Required'),
      gender: Yup.string().matches(/(male|female)/, 'Please select an option'),
    });

    return (
      <div className="user-form">
        {this.props.match.path === 'signup' ? (
          <h1 className="heading-one heading-one--form">Sign Up</h1>
        ) : (
          <h1 className="heading-one heading-one--form">Update</h1>
        )}
        <Formik
          initialValues={formInitialValues}
          validationSchema={formSchema}
          onSubmit={this.handleSubmit}
        >
          <Form className="form">
            <div className="form__field-container">
              <label htmlFor="username">Username</label>
              <Field
                name="username"
                type="text"
                id="username"
                className="form__field"
              />
              <ErrorMessage
                component="div"
                name="username"
                className="form__error-message"
              />
            </div>
            <div className="form__field-container">
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                type="password"
                id="password"
                className="form__field"
              />
              <ErrorMessage
                component="div"
                name="password"
                className="form__error-message"
              />
            </div>
            <div className="form__field-container">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                type="text"
                id="email"
                className="form__field"
              />
              <ErrorMessage
                component="div"
                name="email"
                className="form__error-message"
              />
            </div>
            <div className="form__field-container">
              <label htmlFor="city">City</label>
              <Field
                name="city"
                type="text"
                id="city"
                className="form__field"
              />
              <ErrorMessage
                component="div"
                name="city"
                className="form__error-message"
              />
            </div>
            <div className="form__field-container">
              <label htmlFor="zipcode">Zipcode</label>
              <Field
                name="zipcode"
                type="text"
                id="zipcode"
                className="form__field"
              />
              <ErrorMessage
                component="div"
                name="zipcode"
                className="form__error-message"
              />
            </div>
            <div className="form__field-selects-container">
              <div className="form__field-select-container">
                <p>Birthday</p>
                <SingleDatePicker
                  date={this.state.birthday}
                  onDateChange={this.handleDateChange}
                  focused={this.state.focused}
                  onFocusChange={this.handleFocusChange}
                  readOnly={true}
                  numberOfMonths={1}
                  small={true}
                  isOutsideRange={() => false}
                  renderMonthElement={this.renderMonthElement}
                  openDirection="up"
                  id="user-birthday"
                />
              </div>
              <div className="form__field-select-container">
                <label htmlFor="gender">Gender</label>
                <Field
                  as="select"
                  name="gender"
                  id="gender"
                  className="form__field form__field--select"
                >
                  <option value="select">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Field>
                <ErrorMessage name="gender" className="form__error-message" />
              </div>
            </div>
            <button type="submit" className="btn">
              {this.props.match.path === '/signup' ? 'Sign Up' : 'Update'}
            </button>
          </Form>
        </Formik>
      </div>
    );
  }
}
