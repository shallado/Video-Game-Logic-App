import React, { Component } from 'react';

class SearchForm extends Component {
  state = {
    title: '',
  };

  handleTitleChange = (e) => {
    const title = e.target.value;

    this.setState(() => ({ title }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.handleSubmit(this.state.title);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={this.state.title}
          placeholder="title"
          onChange={this.handleTitleChange}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchForm;
