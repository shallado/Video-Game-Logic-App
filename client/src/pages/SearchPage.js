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
      <div className="search-page">
        <div className="search-page__search-form-container">
          <SearchForm handleSubmit={this.handleSubmit} />
        </div>
        <h1 className="heading-one heading-one--search-results">Results</h1>
        <div className="search-page__results-container">
          {this.props.errorMessage ? (
            <p>{this.props.errorMessage}</p>
          ) : this.props.searchResults.length === 0 ? (
            <div>
              <p>Start Search</p>
            </div>
          ) : (
            <ul className="search-page__results">
              {this.props.searchResults[0].map((videoGame) => (
                <li className="search-page__video-game-card-container">
                  <VideoGameCard gameInfo={videoGame} key={videoGame.id} />
                </li>
              ))}
            </ul>
          )}
        </div>
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
