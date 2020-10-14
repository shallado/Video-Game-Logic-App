import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  startAddVideoGameToWatchList,
  startRemoveVideoGameToWatchList,
} from '../actions/user';

class AddRemoveVideoGame extends Component {
  handleAddRemove = () => {
    const { id } = this.props.user;
    let addGame;

    const videoGame = this.props.user.videoGames.find(
      (videoGame) => videoGame.name === this.props.currentGame.name
    );

    if (videoGame || (videoGame && videoGame.addToWatchList)) {
      this.props.startRemoveVideoGameToWatchList(id, this.props.currentGame);
    } else {
      this.props.startAddVideoGameToWatchList(id, this.props.currentGame);
    }
  };

  render() {
    const videoGame = this.props.user.videoGames.find(
      (videoGame) => videoGame.name === this.props.currentGame.name
    );

    return (
      <div onClick={this.handleAddRemove}>
        <div>
          {videoGame || (videoGame && videoGame.addToWatchList) ? (
            <div>
              <ion-icon name="remove-circle"></ion-icon>
              <p>Remove</p>
            </div>
          ) : (
            <div>
              <ion-icon name="add-circle"></ion-icon>
              <p>Add</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentGame: state.game.currentGame,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  startAddVideoGameToWatchList: (userId, title) =>
    dispatch(startAddVideoGameToWatchList(userId, title)),
  startRemoveVideoGameToWatchList: (userId, title) =>
    dispatch(startRemoveVideoGameToWatchList(userId, title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRemoveVideoGame);
