import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  startAddVideoGameToWatchList,
  startRemoveVideoGameToWatchList,
} from '../actions/user';
import IconAddBtn from '../svgs/IconAddBtn';
import IconRemoveBtn from '../svgs/IconRemoveBtn';

class AddRemoveVideoGame extends Component {
  handleAddVideoGame = () => {
    this.props.startAddVideoGameToWatchList(
      this.props.user.id,
      this.props.currentGame
    );
  };

  handleRemoveVideoGame = () => {
    this.props.startRemoveVideoGameToWatchList(
      this.props.user.id,
      this.props.currentGame
    );
  };

  render() {
    const videoGame = this.props.user.videoGames.find(
      (videoGame) => videoGame.name === this.props.currentGame.name
    );

    return (
      <>
        {videoGame ? (
          <button
            onClick={this.handleRemoveVideoGame}
            className="btn add-remove-btn"
          >
            <span>Remove</span>
            <span className="icon__container">
              <IconRemoveBtn />
            </span>
          </button>
        ) : (
          <button
            onClick={this.handleAddVideoGame}
            className="btn add-remove-btn"
          >
            <span>Add</span>
            <span className="icon__container">
              <IconAddBtn />
            </span>
          </button>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentGame: state.game.currentGame,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  startAddVideoGameToWatchList: (userId, videoGame) =>
    dispatch(startAddVideoGameToWatchList(userId, videoGame)),
  startRemoveVideoGameToWatchList: (userId, videoGame) =>
    dispatch(startRemoveVideoGameToWatchList(userId, videoGame)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRemoveVideoGame);
