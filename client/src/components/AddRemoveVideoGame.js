import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  startAddVideoGameToWatchList,
  startRemoveVideoGameToWatchList,
} from '../actions/user';
import IconAddBtn from '../svgs/IconAddBtn';
import IconRemoveBtn from '../svgs/IconRemoveBtn';

class AddRemoveVideoGame extends Component {
  handleAddRemove = () => {
    const { id } = this.props.user;

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
      <div onClick={this.handleAddRemove} className="header__add-remove-btns">
        {videoGame || (videoGame && videoGame.addToWatchList) ? (
          <button className="header__add-remove-btn">
            <span className="header__btn-text">Remove</span>
            <IconRemoveBtn />
          </button>
        ) : (
          <button className="btn header__add-remove-btn">
            <span className="header__btn-text">Add</span>
            <IconAddBtn />
          </button>
        )}
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
