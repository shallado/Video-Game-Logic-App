import React from 'react';
import { connect } from 'react-redux';
import VideoGameCard from './VideoGameCard';
import IconLoading from '../svgs/IconLoading';

const VideoGameList = (props) => {
  let videoGames = !!props.currentGames
    ? props.currentGames
    : props.user.videoGames;

  return (
    <>
      <h1 className="heading-one heading-one--results">
        {props.urlPath === '/category' ? props.genre : 'My List'}
      </h1>
      <div className="video-game-list__results-container">
        {videoGames.length === 0 ? (
          <div className="video-game-list__loading-container">
            <IconLoading />
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  genre: state.game.genre,
});

export default connect(mapStateToProps)(VideoGameList);
