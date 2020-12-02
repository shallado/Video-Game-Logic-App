import React from 'react';
import { connect } from 'react-redux';
import VideoGameCard from '../components/VideoGameCard';

const SearchResults = (props) => (
  <>
    <h1 className="heading-one heading-one--results">Results</h1>
    <div className="search-page__results-container">
      {props.searchResults.length === 0 ? (
        <div>
          <p>Start Search</p>
        </div>
      ) : props.searchResults[0].length === 0 ? (
        <div>
          <p>No Results</p>
        </div>
      ) : (
        <ul className="search-page__results">
          {props.searchResults[0].map((videoGame) => (
            <li
              className="search-page__video-game-card-container"
              key={videoGame.id}
            >
              <VideoGameCard videoGameList={videoGame} />
            </li>
          ))}
        </ul>
      )}
    </div>
  </>
);

const mapStateToProps = (state) => ({
  searchResults: state.game.searchResults,
});

export default connect(mapStateToProps)(SearchResults);
