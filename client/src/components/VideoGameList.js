import React from 'react';
import { connect } from 'react-redux';
import VideoGameCard from './VideoGameCard';

const VideoGameList = (props) => (
  <>
    <h1 className="heading-one heading-one--results">My List</h1>
    <div className="my-list-page__results-container">
      <ul className="my-list-page__results">
        {props.user.videoGames.map((videoGame) => (
          <li
            className="my-list-page__video-game-card-container"
            key={videoGame.id}
          >
            <VideoGameCard videoGameList={videoGame} />
          </li>
        ))}
      </ul>
    </div>
  </>
);

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(VideoGameList);
