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
    this.setState(() => ({
      title: '',
    }));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="search-page__search-form">
        <input
          type="text"
          value={this.state.title}
          placeholder="title"
          onChange={this.handleTitleChange}
          className="search-page__search-form-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
    );
  }
}

export default SearchForm;
