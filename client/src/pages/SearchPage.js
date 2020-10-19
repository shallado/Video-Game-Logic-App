import React, { Component } from 'react';
import { connect } from 'react-redux';
import VideoGameCard from '../components/VideoGameCard';
import SearchForm from '../components/SearchForm';
import { startVideoGameSearchResults } from '../actions/game';

class SearchPage extends Component {
  handleSubmit = (title) => {
    this.props.startVideoGameSearchResults([
      {
        title,
      },
    ]);
  };

  render() {
    return (
      <div>
        <SearchForm handleSubmit={this.handleSubmit} />
        <h1>Results</h1>
        {this.props.errorMessage ? (
          <p>{this.props.errorMessage}</p>
        ) : this.props.searchResults.length === 0 ? (
          <p>Start Search</p>
        ) : (
          <div>
            {this.props.searchResults[0].map((videoGame) => (
              <VideoGameCard gameInfo={videoGame} key={videoGame.id} />
            ))}
          </div>
        )}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
