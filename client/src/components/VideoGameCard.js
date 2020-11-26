import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconRightArrowTwo from '../svgs/IconRightArrowTwo';
import { setCurrentGame } from '../actions/game';
import IconLoading from '../svgs/IconLoading';
import { showModal } from '../actions/modal';

class VideoGameCard extends Component {
  state = {
    gameInfo: {},
  };

  handleShowModal = () => {
    if (this.state.gameInfo.id !== this.props.currentGame.id) {
      this.props.setCurrentGame(this.state.gameInfo);
    }

    this.props.showModal();
  };

  componentDidMount() {
    let gameInfo;

    if (!!this.props.videoGameList) {
      gameInfo = this.props.videoGameList;
    } else {
      if (!!this.props.videoGameCategory) {
        gameInfo = this.props.videoGameCategory;
      } else {
        gameInfo = {};
      }
    }

    this.setState(() => ({
      gameInfo,
    }));
  }

  render() {
    return (
      <>
        {Object.keys(this.state.gameInfo).length !== 0 ? (
          <div className="video-game-card">
            {this.state.gameInfo.cover ? (
              <img
                src={this.state.gameInfo.cover.url.replace(
                  'thumb',
                  'cover_big'
                )}
                className="video-game-card__img"
              />
            ) : (
              <div className="video-game-card__img-unavailable">
                <p>{this.state.gameInfo.name}</p>
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
        ) : (
          <div className="video-game-card">
            <IconLoading />
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentGame: state.game.currentGame,
  videoGameCategory: !!state.game.categoryGames[ownProps.categoryIndex]
    ? state.game.categoryGames[ownProps.categoryIndex][ownProps.positionIndex]
    : {},
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentGame: (currentGame) => dispatch(setCurrentGame(currentGame)),
  showModal: () => dispatch(showModal('moreInfoModal')),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoGameCard);
