import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconRightArrowTwo from '../svgs/IconRightArrowTwo';
import { setCurrentGame } from '../actions/game';
import { showModal } from '../actions/modal';

class VideoGameCard extends Component {
  handleShowModal = () => {
    const gameInfo =
      this.props.gameInfo !== undefined
        ? this.props.gameInfo
        : this.props.videoGameList;

    if (gameInfo.id !== this.props.currentGame.id) {
      this.props.setCurrentGame(gameInfo);
    }

    this.props.showModal();
  };

  render() {
    const gameInfo =
      this.props.gameInfo !== undefined
        ? this.props.gameInfo
        : this.props.videoGameList;

    return (
      <div className="video-game-card">
        {gameInfo.cover ? (
          <img
            alt="video game cover"
            src={gameInfo.cover.url.replace('thumb', 'cover_big')}
            className="video-game-card__img"
          />
        ) : (
          <div className="video-game-card__img-unavailable">
            <p>{gameInfo.name}</p>
          </div>
        )}
        <div
          className="video-game-card__overlay"
          onClick={this.handleShowModal}
        >
          <div className="video-game-card__icon-container">
            <IconRightArrowTwo />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentGame: state.game.currentGame,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentGame: (currentGame) => dispatch(setCurrentGame(currentGame)),
  showModal: () => dispatch(showModal('moreInfoModal')),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoGameCard);
