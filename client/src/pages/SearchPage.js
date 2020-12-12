import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import { startVideoGameSearchResults, reset } from '../actions/game';

class SearchPage extends Component {
  handleSubmit = (title) => {
    this.props.startVideoGameSearchResults([
      {
        title,
      },
    ]);
  };

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    return (
      <div className="search-page">
        <div className="search-page__search-form-container">
          <SearchForm handleSubmit={this.handleSubmit} />
        </div>
        <SearchResults />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchResults: state.game.searchResults,
  errorMessage: state.error.errorInfo ? state.error.errorInfo.message : false,
});

const mapDispatchToProps = (dispatch) => ({
  startVideoGameSearchResults: (title) =>
    dispatch(startVideoGameSearchResults(title)),
  reset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
