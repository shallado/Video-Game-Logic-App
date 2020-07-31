import React, { Component } from 'react';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

export default class UserForm extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    city: '',
    zipcode: '',
    birthday: moment(),
    gender: '',
    focused: false,
    error: undefined,
  };

  handleUsernameChange = (e) => {
    const username = e.target.value;

    this.setState(() => ({ username }));
  };

  handlePasswordChange = (e) => {
    const password = e.target.value;

    this.setState(() => ({ password }));
  };

  handleEmailChange = (e) => {
    const email = e.target.value;

    this.setState(() => ({ email }));
  };

  handleCityChange = (e) => {
    const city = e.target.value;

    this.setState(() => ({ city }));
  };

  handleZipcodeChange = (e) => {
    const zipcode = e.target.value;

    if (!zipcode || zipcode.match(/^\d{1,5}$/)) {
      this.setState(() => ({ zipcode }));
    }
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

  handleGenderChange = (e) => {
    const gender = e.target.value;

    this.setState(() => ({ gender }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const passwordCriteria =
      '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{8,15}$';
    const regex = new RegExp(passwordCriteria);
    let error, user;

    for (let field in this.state) {
      if (field === 'focused' || field === 'error') {
        continue;
      } else if (!this.state[field]) {
        this.setState(() => ({
          error: `${field} field is required`,
        }));
        return;
      }
    }

    if (this.state.zipcode.length !== 5) {
      error = 'zipcode field requires 5 digits';
    } else if (!this.state.password.match(regex)) {
      error =
        'field is required to be 8 to 15 characters long, contain one lowercase letter, one uppercase letter, one numeric digit and one special character';
    } else {
      error = undefined;
      user = {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        city: this.state.city,
        zipcode: this.state.zipcode,
        birthday: this.state.birthday,
        gender: this.state.gender,
      };

      this.props.handleSubmit(user);
    }

    this.setState(() => ({ error }));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={this.state.username}
          onChange={this.handleUsernameChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={this.state.city}
          onChange={this.handleCityChange}
        />
        <label htmlFor="zipcode">Zipcode</label>
        <input
          type="text"
          id="zipcode"
          value={this.state.zipcode}
          onChange={this.handleZipcodeChange}
        />
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
        <select
          id="gender"
          value={this.state.gender}
          onChange={this.handleGenderChange}
        >
          <option value="select">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {this.state.error && <p>{this.state.error}</p>}
        <button>Sign Up</button>
      </form>
    );
  }
}
