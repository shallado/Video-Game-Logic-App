import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import * as Yup from 'yup';
import ErrorNotification from './ErrorNotification';

export default class UserForm extends Component {
  state = {
    birthday: moment(),
    focused: false,
    error: undefined,
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
    this.props.handleSubmit({
      ...userInfo,
      birthday: this.state.birthday.format('YYYY-MM-DD'),
    });
  };

  render() {
    const formInitialValues = {
      username: '',
      password: '',
      email: '',
      city: '',
      zipcode: '',
      gender: 'select',
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
      <div>
        <Formik
          initialValues={formInitialValues}
          validationSchema={formSchema}
          onSubmit={this.handleSubmit}
        >
          <Form>
            <label htmlFor="username">Username</label>
            <Field name="username" type="text" id="username" />
            <ErrorMessage name="username" />
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" id="password" />
            <ErrorMessage name="password" />
            <label htmlFor="email">Email</label>
            <Field name="email" type="text" id="email" />
            <ErrorMessage name="email" />
            <label htmlFor="city">City</label>
            <Field name="city" type="text" id="city" />
            <ErrorMessage name="city" />
            <label htmlFor="zipcode">Zipcode</label>
            <Field name="zipcode" type="text" id="zipcode" />
            <ErrorMessage name="zipcode" />
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
              id="user-birthday"
            />
            <br></br>
            <label htmlFor="gender">Gender</label>
            <Field as="select" name="gender" id="gender">
              <option value="select">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Field>
            <ErrorMessage name="gender" />
            {this.state.error && <p>{this.state.error}</p>}
            <button type="submit">Sign Up</button>
          </Form>
        </Formik>
        <ErrorNotification />
      </div>
    );
  }
}
