import React from 'react';
import { connect } from 'react-redux';
import VideoGameCard from './VideoGameCard';

const VideoGameList = (props) => {
  const videoGames =
    props.moreCategoryGames.length !== 0
      ? props.moreCategoryGames
      : props.user.videoGames;

  return (
    <>
      <h1 className="heading-one heading-one--results">
        {props.urlPath === '/category' ? props.genre : 'My List'}
      </h1>
      <div className="video-game-list__results-container">
        <ul className="video-game-list__results">
          {videoGames.map((videoGame) => (
            <li
              className="video-game-list__video-game-card-container"
              key={videoGame.id}
            >
              <VideoGameCard videoGameList={videoGame} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  moreCategoryGames: state.game.moreCategoryGames,
  genre: state.game.genre,
});

export default connect(mapStateToProps)(VideoGameList);
