import React from 'react';
import { connect } from 'react-redux';
import VideoGameCard from './VideoGameCard';

const VideoGameList = (props) => (
  <div>
    {props.user.videoGames.map((videoGame) => (
      <VideoGameCard gameInfo={videoGame} key={videoGame.id} />
    ))}
  </div>
);

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(VideoGameList);
