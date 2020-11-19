import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconRightArrowTwo from '../svgs/IconRightArrowTwo';
import { setCurrentGame } from '../actions/game';
import { showModal } from '../actions/modal';

class VideoGameCard extends Component {
  handleShowModal = () => {
    if (this.props.gameInfo.id !== this.props.currentGame.id) {
      this.props.setCurrentGame(this.props.gameInfo);
    }

    this.props.showModal();
  };

  render() {
    return (
      <div className="video-game-card video-game-card--search-page">
        {this.props.gameInfo.cover ? (
          <img
            src={this.props.gameInfo.cover.url.replace('thumb', 'cover_big')}
            className="video-game-card__img"
          />
        ) : (
          <div className="video-game-card__img-unavailable">
            <p>{this.props.gameInfo.name}</p>
          </div>
        )}
        <div className="video-game-card__overlay">
          <div
            className="video-game-card__icon-container"
            onClick={this.handleShowModal}
          >
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
